// Garmin Connect Integration

import { convertToGarminWorkout } from './workoutBuilder.js';

// ============================================
// Session Management
// ============================================

const GARMIN_SESSION_KEY = 'garmin_session_id';

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
export async function directImportToGarmin(dayIndex, trainingData, overrideDate = null) {
    const email = document.getElementById('garminEmail')?.value;
    const password = document.getElementById('garminPassword')?.value;

    if (!email || !password) {
        updateGarminStatus('請輸入 Email 和密碼', true);
        return;
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
            updateGarminStatus(data.message || '匯入成功！', false);
        } else {
            let errorMsg = data.error || '匯入失敗';
            if (data.suggestion) {
                errorMsg += '\n' + data.suggestion;
            } else if (data.detail) {
                errorMsg += '\n' + data.detail;
            }
            updateGarminStatus(errorMsg, true);
        }
    } catch (error) {
        console.error('Direct import error:', error);
        updateGarminStatus('連線錯誤\n請使用「複製 JSON」或「下載 .json」手動匯入至 Garmin Connect', true);
    }
}
