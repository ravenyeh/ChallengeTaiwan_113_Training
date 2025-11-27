const { GarminConnect } = require('@gooin/garmin-connect');

// Store sessions in memory (for demo - in production use Redis/DB)
const sessions = new Map();

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: '請提供 Email 和密碼' });
        }

        // Initialize GarminConnect
        const GC = new GarminConnect({
            username: email,
            password: password
        });

        // Login to Garmin Connect
        await GC.login();

        // Generate session ID
        const sessionId = `gc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Store the GarminConnect instance
        sessions.set(sessionId, {
            gc: GC,
            email: email,
            createdAt: Date.now()
        });

        // Clean up old sessions (older than 30 minutes)
        const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
        for (const [key, value] of sessions) {
            if (value.createdAt < thirtyMinutesAgo) {
                sessions.delete(key);
            }
        }

        // Get user profile for confirmation
        let displayName = email.split('@')[0];
        try {
            const userProfile = await GC.getUserProfile();
            if (userProfile && userProfile.displayName) {
                displayName = userProfile.displayName;
            }
        } catch (profileError) {
            console.log('Could not fetch profile:', profileError.message);
        }

        return res.status(200).json({
            success: true,
            sessionId: sessionId,
            user: {
                displayName: displayName,
                email: email
            }
        });

    } catch (error) {
        console.error('Garmin login error:', error.message);

        let errorMessage = '登入失敗';
        let suggestion = '請使用「複製 JSON」或「下載 .json」功能手動匯入至 Garmin Connect';

        if (error.message) {
            const msg = error.message.toLowerCase();
            if (msg.includes('credentials') || msg.includes('password') || msg.includes('401') || msg.includes('invalid')) {
                errorMessage = 'Email 或密碼錯誤';
                suggestion = '請確認您的 Garmin Connect 帳號密碼是否正確';
            } else if (msg.includes('network') || msg.includes('fetch') || msg.includes('enotfound') || msg.includes('timeout')) {
                errorMessage = '網路連線錯誤';
                suggestion = '請檢查網路連線後再試';
            } else if (msg.includes('captcha') || msg.includes('robot') || msg.includes('verification')) {
                errorMessage = 'Garmin 需要人機驗證';
                suggestion = '請先在瀏覽器登入 Garmin Connect 完成驗證，或使用手動匯入方式';
            } else if (msg.includes('blocked') || msg.includes('forbidden') || msg.includes('403') || msg.includes('rate')) {
                errorMessage = 'Garmin 暫時封鎖此連線';
                suggestion = '請稍後再試，或使用「複製 JSON」功能手動匯入';
            } else if (msg.includes('mfa') || msg.includes('two-factor') || msg.includes('2fa')) {
                errorMessage = '此帳號已啟用雙重驗證';
                suggestion = '啟用 MFA 的帳號無法自動登入，請使用手動匯入方式';
            }
        }

        return res.status(401).json({
            success: false,
            error: errorMessage,
            suggestion: suggestion,
            detail: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Export sessions for use by other modules
module.exports.sessions = sessions;
