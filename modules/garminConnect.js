// Garmin Connect Integration

import { convertToGarminWorkout } from './workoutBuilder.js';
import { trackGarminImport } from './firebaseAnalytics.js';

// ============================================
// Session & Credentials Management
// ============================================

const GARMIN_SESSION_KEY = 'garmin_session_id';
const GARMIN_CREDENTIALS_KEY = 'garmin_credentials';

// Get Garmin session from localStorage
export function getGarminSession() {
    return localStorage.getItem(GARMIN_SESSION_KEY);
}

// Set Garmin session to localStorage
export function setGarminSession(sessionId) {
    localStorage.setItem(GARMIN_SESSION_KEY, sessionId);
}

// Clear Garmin session
export function clearGarminSession() {
    localStorage.removeItem(GARMIN_SESSION_KEY);
}

// Get saved Garmin credentials from localStorage
export function getGarminCredentials() {
    const stored = localStorage.getItem(GARMIN_CREDENTIALS_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Save Garmin credentials to localStorage
export function saveGarminCredentials(email, password) {
    localStorage.setItem(GARMIN_CREDENTIALS_KEY, JSON.stringify({ email, password }));
}

// Clear saved Garmin credentials
export function clearGarminCredentials() {
    localStorage.removeItem(GARMIN_CREDENTIALS_KEY);
    clearGarminSession();
}

// Check if credentials are saved
export function hasGarminCredentials() {
    const creds = getGarminCredentials();
    return creds && creds.email && creds.password;
}

// ============================================
// UI Status Updates
// ============================================

// Update Garmin status message
export function updateGarminStatus(message, isError = false) {
    const statusEl = document.getElementById('garminStatus');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = `garmin-status ${isError ? 'error' : 'success'}`;
        statusEl.style.display = message ? 'block' : 'none';
    }
}

// ============================================
// Login/Logout
// ============================================

// Login to Garmin Connect
export async function garminLogin(callbacks = {}) {
    const email = document.getElementById('garminEmail')?.value;
    const password = document.getElementById('garminPassword')?.value;

    if (!email || !password) {
        updateGarminStatus('請輸入 Email 和密碼', true);
        return;
    }

    updateGarminStatus('登入中...', false);

    try {
        const response = await fetch('/api/garmin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            setGarminSession(data.sessionId);
            updateGarminStatus(`登入成功！歡迎 ${data.user.displayName}`, false);

            // Execute callback to refresh modal
            if (callbacks.onLoginSuccess) {
                setTimeout(() => {
                    callbacks.onLoginSuccess();
                }, 1000);
            }
        } else {
            let errorMsg = data.error || '登入失敗';
            if (data.suggestion) {
                errorMsg += '\n' + data.suggestion;
            } else if (data.detail) {
                errorMsg += '\n' + data.detail;
            }
            updateGarminStatus(errorMsg, true);
        }
    } catch (error) {
        console.error('Garmin login error:', error);
        updateGarminStatus('連線錯誤\n請使用「複製 JSON」或「下載 .json」手動匯入至 Garmin Connect', true);
    }
}

// Logout from Garmin Connect
export async function garminLogout(callbacks = {}) {
    const sessionId = getGarminSession();

    try {
        await fetch('/api/garmin/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Session-Id': sessionId || ''
            }
        });
    } catch (error) {
        console.error('Logout error:', error);
    }

    clearGarminSession();
    updateGarminStatus('已登出', false);

    // Execute callback to refresh modal
    if (callbacks.onLogoutSuccess) {
        setTimeout(() => {
            callbacks.onLogoutSuccess();
        }, 500);
    }
}

// ============================================
// Workout Import
// ============================================

// Import single workout to Garmin
export async function importWorkoutToGarmin(workoutData, scheduledDate) {
    const sessionId = getGarminSession();

    if (!sessionId) {
        updateGarminStatus('請先登入 Garmin Connect', true);
        return false;
    }

    try {
        const response = await fetch('/api/garmin/workout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Session-Id': sessionId
            },
            body: JSON.stringify({
                workout: workoutData,
                scheduledDate: scheduledDate
            })
        });

        const data = await response.json();

        if (data.success) {
            return true;
        } else {
            if (data.error.includes('過期') || data.error.includes('登入')) {
                clearGarminSession();
            }
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Import workout error:', error);
        throw error;
    }
}

// Import all workouts for a day to Garmin
export async function importAllToGarmin(dayIndex, trainingData, overrideDate = null) {
    const training = trainingData[dayIndex];
    const workouts = convertToGarminWorkout(training, dayIndex, overrideDate);

    if (workouts.length === 0) {
        updateGarminStatus('沒有訓練可匯入', true);
        return;
    }

    updateGarminStatus(`匯入中... (0/${workouts.length})`, false);

    let successCount = 0;
    let errors = [];

    for (let i = 0; i < workouts.length; i++) {
        const workout = workouts[i];
        updateGarminStatus(`匯入中... (${i + 1}/${workouts.length}) ${workout.data.workoutName}`, false);

        try {
            await importWorkoutToGarmin(workout.data, workout.data.scheduledDate);
            successCount++;
        } catch (error) {
            errors.push(`${workout.data.workoutName}: ${error.message}`);
        }
    }

    if (successCount === workouts.length) {
        updateGarminStatus(`成功匯入 ${successCount} 個訓練到 Garmin Connect！`, false);
    } else if (successCount > 0) {
        updateGarminStatus(`部分成功：${successCount}/${workouts.length} 個訓練已匯入`, true);
    } else {
        updateGarminStatus(`匯入失敗：${errors[0]}`, true);
    }
}

// Direct import to Garmin (login + import in one request)
// If useSavedCredentials is true, use stored credentials from localStorage
export async function directImportToGarmin(dayIndex, trainingData, overrideDate = null, useSavedCredentials = false) {
    let email, password;

    if (useSavedCredentials) {
        const creds = getGarminCredentials();
        if (!creds || !creds.email || !creds.password) {
            updateGarminStatus('找不到已儲存的帳號資訊，請重新登入', true);
            return;
        }
        email = creds.email;
        password = creds.password;
    } else {
        email = document.getElementById('garminEmail')?.value;
        password = document.getElementById('garminPassword')?.value;

        if (!email || !password) {
            updateGarminStatus('請輸入 Email 和密碼', true);
            return;
        }
    }

    const training = trainingData[dayIndex];
    const workouts = convertToGarminWorkout(training, dayIndex, overrideDate);

    if (workouts.length === 0) {
        updateGarminStatus('沒有訓練可匯入', true);
        return;
    }

    updateGarminStatus('登入並匯入中...', false);

    try {
        const workoutPayloads = workouts.map(w => ({
            workout: w.data,
            scheduledDate: w.data.scheduledDate
        }));

        const response = await fetch('/api/garmin/import', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                workouts: workoutPayloads
            })
        });

        const data = await response.json();

        if (data.success) {
            // Save credentials on successful import
            saveGarminCredentials(email, password);
            updateGarminStatus(data.message || '匯入成功！', false);

            // Track successful Garmin import
            trackGarminImport({
                success: true,
                workoutCount: workouts.length,
                workoutTypes: workouts.map(w => w.type),
                date: training.date,
                phase: training.phase,
                method: useSavedCredentials ? 'one-click' : 'direct'
            });

            // Trigger UI refresh to show one-click import button
            if (typeof window.refreshGarminUI === 'function') {
                setTimeout(() => window.refreshGarminUI(), 1500);
            }
        } else {
            let errorMsg = data.error || '匯入失敗';
            if (data.suggestion) {
                errorMsg += '\n' + data.suggestion;
            } else if (data.detail) {
                errorMsg += '\n' + data.detail;
            }

            // Track failed Garmin import
            trackGarminImport({
                success: false,
                workoutCount: workouts.length,
                workoutTypes: workouts.map(w => w.type),
                date: training.date,
                phase: training.phase,
                method: useSavedCredentials ? 'one-click' : 'direct',
                error: errorMsg
            });

            // If authentication failed, clear saved credentials
            if (errorMsg.includes('密碼錯誤') || errorMsg.includes('credentials')) {
                clearGarminCredentials();
            }

            updateGarminStatus(errorMsg, true);
        }
    } catch (error) {
        console.error('Direct import error:', error);

        // Track connection error
        trackGarminImport({
            success: false,
            workoutCount: workouts.length,
            workoutTypes: workouts.map(w => w.type),
            date: training.date,
            phase: training.phase,
            method: useSavedCredentials ? 'one-click' : 'direct',
            error: 'connection_error'
        });

        updateGarminStatus('連線錯誤\n請使用「複製 JSON」或「下載 .json」手動匯入至 Garmin Connect', true);
    }
}

// One-click import using saved credentials
export async function oneClickImportToGarmin(dayIndex, trainingData, overrideDate = null) {
    return directImportToGarmin(dayIndex, trainingData, overrideDate, true);
}
