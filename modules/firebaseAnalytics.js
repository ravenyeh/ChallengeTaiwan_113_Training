// Firebase Analytics Module
// Track website and training schedule usage with Firebase Realtime Database

const FIREBASE_DB_URL = 'https://ironmantrainingtw-default-rtdb.asia-southeast1.firebasedatabase.app';

// Generate a unique session ID for this visit
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get or create session ID (persists for this browser session)
function getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
        sessionId = generateSessionId();
        sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
}

// Get user's anonymous ID (persists across sessions)
function getUserId() {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
}

// Get current timestamp in ISO format
function getTimestamp() {
    return new Date().toISOString();
}

// Get basic device/browser info
function getDeviceInfo() {
    const ua = navigator.userAgent;
    let deviceType = 'desktop';
    if (/mobile/i.test(ua)) deviceType = 'mobile';
    else if (/tablet|ipad/i.test(ua)) deviceType = 'tablet';

    return {
        deviceType,
        language: navigator.language || 'unknown',
        screenWidth: window.screen?.width || 0,
        screenHeight: window.screen?.height || 0,
        userAgent: ua.substring(0, 200) // Truncate for storage
    };
}

// Send event to Firebase Realtime Database
async function sendEvent(eventType, eventData = {}) {
    try {
        const payload = {
            eventType,
            timestamp: getTimestamp(),
            sessionId: getSessionId(),
            userId: getUserId(),
            page: window.location.pathname,
            ...eventData
        };

        // Use Firebase REST API to push data
        const response = await fetch(`${FIREBASE_DB_URL}/events.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.warn('Firebase analytics event failed:', response.status);
        }
    } catch (error) {
        // Silently fail - analytics should not break the app
        console.warn('Firebase analytics error:', error.message);
    }
}

// ============================================
// Public Analytics Functions
// ============================================

/**
 * Track page view
 * @param {string} pageName - Name of the page (e.g., 'home', 'comparison')
 */
export function trackPageView(pageName = 'home') {
    const deviceInfo = getDeviceInfo();
    sendEvent('page_view', {
        pageName,
        referrer: document.referrer || 'direct',
        ...deviceInfo
    });
}

/**
 * Track training plan selection
 * @param {string} planId - The selected plan ID ('ai' or 'garmin-tri')
 * @param {string} previousPlan - The previous plan ID (if switching)
 */
export function trackPlanSelection(planId, previousPlan = null) {
    sendEvent('plan_selection', {
        planId,
        previousPlan,
        action: previousPlan ? 'switch' : 'initial'
    });
}

/**
 * Track workout view (when user opens workout modal)
 * @param {object} workout - Workout details
 */
export function trackWorkoutView(workout) {
    sendEvent('workout_view', {
        date: workout.date,
        phase: workout.phase,
        intensity: workout.intensity,
        hasSwim: !!workout.swim,
        hasBike: !!workout.bike,
        hasRun: !!workout.run,
        totalHours: workout.hours,
        content: workout.content?.substring(0, 100) // Truncate for storage
    });
}

/**
 * Track Garmin import attempt
 * @param {object} details - Import details
 */
export function trackGarminImport(details) {
    sendEvent('garmin_import', {
        success: details.success,
        workoutCount: details.workoutCount || 0,
        workoutTypes: details.workoutTypes || [],
        date: details.date,
        phase: details.phase,
        errorMessage: details.error?.substring(0, 200) || null,
        method: details.method || 'direct' // 'direct' or 'one-click'
    });
}

/**
 * Track user settings update
 * @param {object} settings - Updated settings
 */
export function trackSettingsUpdate(settings) {
    sendEvent('settings_update', {
        hasFTP: !!settings.ftp,
        hasRunPace: !!settings.runPace,
        hasSwimCSS: !!settings.swimCSS,
        // Don't store actual values for privacy, just ranges
        ftpRange: settings.ftp ? getFTPRange(parseInt(settings.ftp)) : null,
        runPaceRange: settings.runPace ? getPaceRange(settings.runPace) : null
    });
}

/**
 * Track workout export (JSON, ZWO, ERG download)
 * @param {string} format - Export format ('json', 'zwo', 'erg')
 * @param {string} workoutType - Type of workout ('swim', 'bike', 'run')
 */
export function trackWorkoutExport(format, workoutType) {
    sendEvent('workout_export', {
        format,
        workoutType
    });
}

/**
 * Track phase filter usage
 * @param {string} phase - Selected phase filter
 */
export function trackPhaseFilter(phase) {
    sendEvent('phase_filter', {
        phase
    });
}

/**
 * Track scroll to section
 * @param {string} sectionId - The section scrolled to
 */
export function trackSectionView(sectionId) {
    sendEvent('section_view', {
        sectionId
    });
}

// ============================================
// Helper Functions for Privacy
// ============================================

// Get FTP range instead of exact value
function getFTPRange(ftp) {
    if (ftp < 150) return 'under_150';
    if (ftp < 200) return '150-199';
    if (ftp < 250) return '200-249';
    if (ftp < 300) return '250-299';
    return '300_plus';
}

// Get pace range instead of exact value
function getPaceRange(pace) {
    // Parse pace like "5:30" to seconds
    const parts = pace.split(':');
    if (parts.length !== 2) return 'unknown';
    const totalSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);

    if (totalSeconds < 300) return 'under_5min';
    if (totalSeconds < 360) return '5-6min';
    if (totalSeconds < 420) return '6-7min';
    if (totalSeconds < 480) return '7-8min';
    return 'over_8min';
}

// ============================================
// Daily/Session Summary
// ============================================

/**
 * Track session start with summary info
 */
export function trackSessionStart() {
    const deviceInfo = getDeviceInfo();
    const savedPlan = localStorage.getItem('userTrainingPlan') || 'ai';
    const hasSavedSettings = !!(localStorage.getItem('userFTP') || localStorage.getItem('userRunPace'));
    const hasGarminCredentials = !!localStorage.getItem('garmin_credentials');

    sendEvent('session_start', {
        savedPlan,
        hasSavedSettings,
        hasGarminCredentials,
        isReturningUser: !!localStorage.getItem('analytics_user_id'),
        ...deviceInfo
    });
}

/**
 * Update daily statistics (aggregated view)
 */
export async function updateDailyStats() {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const statsPath = `${FIREBASE_DB_URL}/daily_stats/${today}.json`;

        // Get current stats
        const response = await fetch(statsPath);
        let stats = response.ok ? await response.json() : null;

        if (!stats) {
            stats = {
                pageViews: 0,
                uniqueSessions: [],
                uniqueUsers: [],
                planViews: { ai: 0, 'garmin-tri': 0 },
                garminImports: { success: 0, failed: 0 },
                workoutViews: 0
            };
        }

        // Update page views
        stats.pageViews = (stats.pageViews || 0) + 1;

        // Track unique sessions
        const sessionId = getSessionId();
        if (!stats.uniqueSessions) stats.uniqueSessions = [];
        if (!stats.uniqueSessions.includes(sessionId)) {
            stats.uniqueSessions.push(sessionId);
        }

        // Track unique users
        const userId = getUserId();
        if (!stats.uniqueUsers) stats.uniqueUsers = [];
        if (!stats.uniqueUsers.includes(userId)) {
            stats.uniqueUsers.push(userId);
        }

        // Save updated stats
        await fetch(statsPath, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stats)
        });
    } catch (error) {
        console.warn('Failed to update daily stats:', error.message);
    }
}

// Export all tracking functions
export default {
    trackPageView,
    trackPlanSelection,
    trackWorkoutView,
    trackGarminImport,
    trackSettingsUpdate,
    trackWorkoutExport,
    trackPhaseFilter,
    trackSectionView,
    trackSessionStart,
    updateDailyStats
};
