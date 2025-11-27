const { GarminConnect } = require('@gooin/garmin-connect');

// Combined login + import endpoint for Vercel serverless
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
        const { email, password, workouts } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: '請提供 Email 和密碼'
            });
        }

        if (!workouts || !Array.isArray(workouts) || workouts.length === 0) {
            return res.status(400).json({
                success: false,
                error: '請提供訓練資料'
            });
        }

        // Initialize and login
        const GC = new GarminConnect({
            username: email,
            password: password
        });

        await GC.login();

        // Import each workout
        const results = [];
        for (const workoutData of workouts) {
            try {
                const { workout, scheduledDate } = workoutData;

                // Create workout using available methods
                let createdWorkout;

                // Try addWorkout method first
                if (typeof GC.addWorkout === 'function') {
                    try {
                        createdWorkout = await GC.addWorkout(workout);
                    } catch (e) {
                        console.log('addWorkout method failed:', e.message);
                    }
                }

                // Fallback: Try using internal client
                if (!createdWorkout && GC.client && typeof GC.client.post === 'function') {
                    try {
                        const response = await GC.client.post(
                            '/workout-service/workout',
                            { ...workout, workoutId: null, ownerId: null }
                        );
                        createdWorkout = response.data || response;
                    } catch (e) {
                        console.log('client.post method failed:', e.message);
                    }
                }

                // Fallback: Try createWorkout if available
                if (!createdWorkout && typeof GC.createWorkout === 'function') {
                    try {
                        createdWorkout = await GC.createWorkout(workout);
                    } catch (e) {
                        console.log('createWorkout method failed:', e.message);
                    }
                }

                if (!createdWorkout) {
                    throw new Error('無法建立訓練，API 方法不可用');
                }

                // Schedule if date provided - use correct scheduleWorkout format
                let scheduled = false;
                if (scheduledDate && createdWorkout && createdWorkout.workoutId) {
                    try {
                        console.log('Scheduling workout:', createdWorkout.workoutId, 'to date:', scheduledDate);

                        // Correct format: first param is object with workoutId, second is Date object
                        if (typeof GC.scheduleWorkout === 'function') {
                            await GC.scheduleWorkout(
                                { workoutId: createdWorkout.workoutId },
                                new Date(scheduledDate)
                            );
                            scheduled = true;
                            console.log('Workout scheduled successfully');
                        } else if (GC.client && typeof GC.client.post === 'function') {
                            await GC.client.post(
                                `/workout-service/schedule/${createdWorkout.workoutId}`,
                                { date: scheduledDate }
                            );
                            scheduled = true;
                        } else {
                            console.log('scheduleWorkout method not available');
                        }
                    } catch (e) {
                        console.log('Schedule failed (non-critical):', e.message);
                    }
                }

                results.push({
                    success: true,
                    workoutName: workout.workoutName,
                    workoutId: createdWorkout?.workoutId,
                    scheduledDate: scheduledDate || null,
                    scheduled: scheduled
                });
            } catch (e) {
                results.push({
                    success: false,
                    workoutName: workoutData.workout?.workoutName || 'Unknown',
                    error: e.message
                });
            }
        }

        const successCount = results.filter(r => r.success).length;
        const scheduledCount = results.filter(r => r.success && r.scheduled).length;

        let message = `成功匯入 ${successCount}/${workouts.length} 個訓練`;
        if (scheduledCount > 0) {
            message += `，${scheduledCount} 個已排程`;
        } else if (successCount > 0) {
            message += '（排程功能暫不可用）';
        }

        return res.status(200).json({
            success: successCount > 0,
            message: message,
            results: results,
            summary: {
                total: workouts.length,
                imported: successCount,
                scheduled: scheduledCount
            }
        });

    } catch (error) {
        console.error('Garmin import error:', error.message);

        let errorMessage = '匯入失敗';
        let suggestion = '請使用「複製 JSON」或「下載 .json」功能手動匯入';

        if (error.message) {
            const msg = error.message.toLowerCase();
            if (msg.includes('credentials') || msg.includes('password') || msg.includes('401') || msg.includes('invalid')) {
                errorMessage = 'Email 或密碼錯誤';
                suggestion = '請確認您的 Garmin Connect 帳號密碼是否正確';
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
            suggestion: suggestion
        });
    }
};
