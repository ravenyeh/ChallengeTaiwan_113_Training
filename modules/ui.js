// UI functions (modals, chart, rendering)

import { formatDate, formatPace } from './utils.js';
import { convertToGarminWorkout } from './workoutBuilder.js';
import { downloadWorkoutJson, downloadWorkoutZwo, downloadWorkoutErg } from './workoutExport.js';
import {
    directImportToGarmin,
    oneClickImportToGarmin,
    hasGarminCredentials,
    getGarminCredentials,
    clearGarminCredentials
} from './garminConnect.js';
import { generateWorkoutNotes, formatNotesForDisplay } from './workoutNotes.js';

// ============================================
// Global State
// ============================================

// Store current workout day index for modal refresh
let currentWorkoutDayIndex = undefined;
let currentWorkoutOverrideDate = null;

export function setCurrentWorkoutDayIndex(index) {
    currentWorkoutDayIndex = index;
}

export function getCurrentWorkoutDayIndex() {
    return currentWorkoutDayIndex;
}

export function setCurrentWorkoutOverrideDate(date) {
    currentWorkoutOverrideDate = date;
}

export function getCurrentWorkoutOverrideDate() {
    return currentWorkoutOverrideDate;
}

// ============================================
// Settings Modal
// ============================================

// Open settings modal
export function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Close settings modal
export function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Toggle advanced settings panel
export function toggleAdvancedSettings() {
    const panel = document.getElementById('advancedSettingsPanel');
    const icon = document.getElementById('advancedToggleIcon');
    if (panel && icon) {
        panel.classList.toggle('expanded');
        icon.classList.toggle('expanded');
    }
}

// ============================================
// Workout Modal
// ============================================

// Render Garmin-style workout steps preview
export function renderWorkoutStepsPreview(workoutData, sportType) {
    if (!workoutData.workoutSegments || workoutData.workoutSegments.length === 0) {
        return '';
    }

    let html = '<div class="steps-preview"><div class="steps-header">Steps</div>';

    workoutData.workoutSegments.forEach(segment => {
        if (segment.workoutSteps) {
            segment.workoutSteps.forEach(step => {
                html += renderStepItem(step, sportType);
            });
        }
    });

    html += '</div>';
    return html;
}

// Render a single step item (handles both regular steps and repeat groups)
function renderStepItem(step, sportType) {
    const stepType = step.stepType?.stepTypeKey || step.stepType?.workoutStepTypeKey || 'interval';

    // Handle repeat groups
    if (stepType === 'repeat' && step.workoutSteps) {
        const repeatDescription = step.description || '';
        let html = `<div class="step-repeat-group">
            <div class="repeat-header">
                <span class="repeat-times">${step.numberOfIterations || 2}x</span>
                ${repeatDescription ? `<span class="repeat-description">${repeatDescription}</span>` : ''}
            </div>
            <div class="repeat-steps">`;

        step.workoutSteps.forEach(subStep => {
            html += renderSingleStep(subStep, sportType);
        });

        html += '</div></div>';
        return html;
    }

    return renderSingleStep(step, sportType);
}

// Render a single executable step
function renderSingleStep(step, sportType) {
    const stepType = step.stepType?.stepTypeKey || step.stepType?.workoutStepTypeKey || 'interval';
    const stepColors = {
        'warmup': '#E2001A',
        'interval': '#007AFF',
        'recovery': '#8E8E93',
        'rest': '#8E8E93',
        'cooldown': '#34C759'
    };
    const stepLabels = {
        'warmup': 'Warm Up',
        'interval': sportType === 'bike' ? 'Bike' : sportType === 'run' ? 'Run' : 'Swim',
        'recovery': 'Recover',
        'rest': 'Rest',
        'cooldown': 'Cool Down'
    };

    const color = stepColors[stepType] || '#007AFF';
    const label = stepLabels[stepType] || 'Interval';

    // Format duration or distance
    let durationText = '';
    const endCondition = step.endCondition?.conditionTypeKey;
    if (endCondition === 'time') {
        const secs = step.endConditionValue || 0;
        const mins = Math.floor(secs / 60);
        const remainingSecs = secs % 60;
        durationText = remainingSecs > 0 ? `${mins}:${String(remainingSecs).padStart(2, '0')}` : `${mins}:00`;
    } else if (endCondition === 'distance') {
        const meters = step.endConditionValue || 0;
        durationText = meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`;
    } else if (endCondition === 'lap.button') {
        durationText = 'Lap Button Press';
    }

    // Format target (power, pace, etc.)
    let targetText = '';
    const targetType = step.targetType?.workoutTargetTypeKey;
    if (targetType === 'power.zone' && step.targetValueOne && step.targetValueTwo) {
        targetText = `Custom Power · (${Math.round(step.targetValueOne)}-${Math.round(step.targetValueTwo)} W)`;
    } else if (targetType === 'pace.zone' && step.targetValueOne && step.targetValueTwo) {
        const p1 = formatPace(1000 / step.targetValueOne);
        const p2 = formatPace(1000 / step.targetValueTwo);
        targetText = `Pace · (${p2}-${p1} /km)`;
    } else if (targetType === 'swim.pace.zone' && step.targetValueOne && step.targetValueTwo) {
        const p1 = formatPace(100 / step.targetValueOne);
        const p2 = formatPace(100 / step.targetValueTwo);
        targetText = `Pace · (${p2}-${p1} /100m)`;
    }

    // Format secondary target (cadence)
    let cadenceText = '';
    if (step.secondaryTargetType?.workoutTargetTypeKey === 'cadence.zone') {
        cadenceText = `Cadence · ${Math.round(step.secondaryTargetValueOne || 0)}-${Math.round(step.secondaryTargetValueTwo || 0)} rpm`;
    }

    // Format description
    let descriptionText = step.description || '';

    // Build step HTML
    let html = `
        <div class="step-item step-type-${stepType}">
            <div class="step-color-bar" style="background-color: ${color}"></div>
            <div class="step-content">
                <div class="step-label">${label}</div>
                ${descriptionText ? `<div class="step-description">${descriptionText}</div>` : ''}
                <div class="step-duration">${durationText}</div>
                ${targetText ? `<div class="step-target">${targetText}</div>` : ''}
                ${cadenceText ? `<div class="step-cadence">${cadenceText}</div>` : ''}
            </div>
        </div>
    `;

    return html;
}

// Show workout modal
export function showWorkoutModal(dayIndex, trainingData, overrideDate = null) {
    console.log('showWorkoutModal called with index:', dayIndex, 'overrideDate:', overrideDate);
    currentWorkoutDayIndex = dayIndex;
    currentWorkoutOverrideDate = overrideDate;

    const training = trainingData[dayIndex];
    if (!training) {
        console.error('Training not found for index:', dayIndex);
        return;
    }
    const workouts = convertToGarminWorkout(training, dayIndex, overrideDate);

    const modal = document.getElementById('workoutModal');
    const modalContent = document.getElementById('workoutModalContent');

    if (!modal || !modalContent) {
        console.error('Modal elements not found');
        return;
    }

    // Show scheduled date info (if override date is used)
    const scheduledDateObj = overrideDate ? new Date(overrideDate) : new Date(training.date);
    const scheduledDateStr = `${scheduledDateObj.getFullYear()}/${scheduledDateObj.getMonth() + 1}/${scheduledDateObj.getDate()}`;
    const isOverride = overrideDate && overrideDate !== training.date;

    let html = `
        <div class="modal-header">
            <h3>Garmin 訓練計劃</h3>
            <button class="modal-close" onclick="closeWorkoutModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="training-info">
                <div class="training-date">${formatDate(training.date)}</div>
                <span class="phase-badge phase-${training.phase}">${training.phase}</span>
                <span class="intensity-badge intensity-${training.intensity}">${training.intensity}</span>
            </div>
            ${isOverride ? `<div class="scheduled-date-notice">匯入日期：<strong>${scheduledDateStr}</strong>（今日）</div>` : ''}
            <div class="training-description">${training.content}</div>
    `;

    // Generate workout notes for this training day
    const workoutNotes = generateWorkoutNotes(training);

    if (workouts.length === 0) {
        html += `<div class="no-workout">此日無訓練內容</div>`;
    } else {
        workouts.forEach((workout, idx) => {
            const typeLabel = { swim: '游泳', bike: '自行車', run: '跑步' }[workout.type];
            const typeColor = { swim: 'var(--swim-color)', bike: 'var(--bike-color)', run: 'var(--run-color)' }[workout.type];

            const escapedName = workout.data.workoutName.replace(/'/g, "\\'").replace(/"/g, '\\"');
            const stepsPreview = renderWorkoutStepsPreview(workout.data, workout.type);

            // Get notes for this workout type
            const notes = workoutNotes[workout.type];
            const notesHtml = notes ? formatNotesForDisplay(notes) : '';

            html += `
                <div class="workout-section" style="border-left: 4px solid ${typeColor}">
                    <div class="workout-header">
                        <img src="images/${workout.type === 'swim' ? 'swim' : workout.type === 'bike' ? 'cycling' : 'run'}.png" class="workout-type-icon" alt="${typeLabel}">
                        <span class="workout-type-label">${typeLabel}</span>
                    </div>
                    <div class="workout-name">${workout.data.workoutName}</div>
                    <div class="workout-stats">
                        <span>距離: ${(workout.data.estimatedDistanceInMeters / 1000).toFixed(1)} km</span>
                        <span>預估時間: ${Math.round(workout.data.estimatedDurationInSecs / 60)} 分鐘</span>
                    </div>
                    ${notesHtml ? `
                        <button class="btn-view-notes" onclick="toggleWorkoutNotes('workout-notes-${idx}')">
                            <span class="notes-icon">📋</span>
                            <span>查看訓練說明</span>
                            <span class="notes-toggle-icon">▼</span>
                        </button>
                        <div class="workout-notes" id="workout-notes-${idx}" style="display: none;">
                            ${notesHtml}
                        </div>
                    ` : ''}
                    ${stepsPreview}
                    <input type="hidden" id="workout-json-${idx}" value='${JSON.stringify(workout.data)}'>
                    <div class="workout-export-buttons">
                        <button class="btn-export" onclick="downloadWorkoutJson(${idx}, '${escapedName}')">下載 JSON</button>
                        ${workout.type === 'bike' ? `
                            <button class="btn-export btn-export-zwo" onclick="downloadWorkoutZwo(${idx}, '${escapedName}')">下載 ZWO</button>
                            <button class="btn-export btn-export-erg" onclick="downloadWorkoutErg(${idx}, '${escapedName}')">下載 ERG</button>
                        ` : ''}
                    </div>
                </div>
            `;
        });
    }

    // Garmin Connect section
    const hasCreds = hasGarminCredentials();
    const savedCreds = getGarminCredentials();

    html += `
            <div class="garmin-section">
                <h4>匯入 Garmin Connect</h4>
                ${workouts.length > 0 ? `
                    ${hasCreds ? `
                        <!-- One-click import UI when credentials are saved -->
                        <div class="garmin-saved-account" id="garminSavedAccount">
                            <div class="saved-account-info">
                                <span class="saved-account-label">已登入帳號</span>
                                <span class="saved-account-email">${savedCreds.email}</span>
                            </div>
                            <div class="garmin-quick-actions">
                                <button class="btn-garmin-import btn-one-click" onclick="oneClickImportToGarmin(${dayIndex})">
                                    直接匯入訓練
                                </button>
                                <button class="btn-garmin-logout" onclick="handleGarminLogout()">
                                    登出
                                </button>
                            </div>
                        </div>
                    ` : `
                        <!-- Login form when no credentials saved -->
                        <div class="garmin-login-form" id="garminLoginForm">
                            <input type="email" id="garminEmail" placeholder="Garmin Email" class="garmin-input">
                            <input type="password" id="garminPassword" placeholder="密碼" class="garmin-input">
                            <div class="garmin-login-hint">登入後帳號將儲存在瀏覽器中，下次可一鍵匯入</div>
                            <button class="btn-garmin-import" onclick="directImportToGarmin(${dayIndex})">
                                登入並匯入訓練
                            </button>
                        </div>
                    `}
                ` : ''}
                <div id="garminStatus" class="garmin-status"></div>
            </div>
            <div class="modal-footer">
                <button class="btn-close" onclick="closeWorkoutModal()">關閉</button>
            </div>
        </div>
    `;

    modalContent.innerHTML = html;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close workout modal
export function closeWorkoutModal() {
    const modal = document.getElementById('workoutModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// ============================================
// Weekly Mileage Chart
// ============================================

let weeklyMileageChart = null;

export function initWeeklyMileageChart(trainingData) {
    const ctx = document.getElementById('weeklyMileageChart');
    if (!ctx) return;

    // Calculate weekly mileage
    const weeklyData = {};
    trainingData.forEach(day => {
        if (!weeklyData[day.week]) {
            weeklyData[day.week] = { swim: 0, bike: 0, run: 0 };
        }
        if (day.swim) weeklyData[day.week].swim += parseFloat(day.swim) || 0;
        if (day.bike) weeklyData[day.week].bike += parseFloat(day.bike) || 0;
        if (day.run) weeklyData[day.week].run += parseFloat(day.run) || 0;
    });

    const weeks = Object.keys(weeklyData);
    const swimData = weeks.map(w => weeklyData[w].swim);
    const bikeData = weeks.map(w => weeklyData[w].bike);
    const runData = weeks.map(w => weeklyData[w].run);

    if (weeklyMileageChart) {
        weeklyMileageChart.destroy();
    }

    weeklyMileageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeks,
            datasets: [
                {
                    label: '游泳 (km)',
                    data: swimData,
                    backgroundColor: 'rgba(0, 150, 255, 0.7)',
                    borderColor: 'rgba(0, 150, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: '自行車 (km)',
                    data: bikeData,
                    backgroundColor: 'rgba(255, 165, 0, 0.7)',
                    borderColor: 'rgba(255, 165, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: '跑步 (km)',
                    data: runData,
                    backgroundColor: 'rgba(50, 205, 50, 0.7)',
                    borderColor: 'rgba(50, 205, 50, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '里程 (km)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: '週訓練量'
                }
            }
        }
    });
}

// ============================================
// Settings Summary Banner
// ============================================

export function showSettingsSummaryBanner(userFTP, userRunPace, userSwimCSS) {
    const banner = document.getElementById('settingsSummaryBanner');
    const summaryValues = document.getElementById('summaryValues');

    if (banner && summaryValues) {
        summaryValues.innerHTML = `
            <span class="value-item">
                <img src="images/cycling.png" alt="FTP">
                FTP: ${userFTP}W
            </span>
            <span class="value-item">
                <img src="images/run.png" alt="跑步">
                馬拉松配速: ${userRunPace}/km
            </span>
            <span class="value-item">
                <img src="images/swim.png" alt="游泳">
                CSS: ${userSwimCSS}/100m
            </span>
        `;
        banner.style.display = 'flex';
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ============================================
// Garmin Logout Handler
// ============================================

// Store reference to trainingData for refresh
let storedTrainingData = null;

export function setTrainingDataReference(data) {
    storedTrainingData = data;
}

// Handle Garmin logout - clear credentials and refresh UI
export function handleGarminLogout() {
    clearGarminCredentials();

    // Update status message
    const statusEl = document.getElementById('garminStatus');
    if (statusEl) {
        statusEl.textContent = '已登出，帳號資訊已清除';
        statusEl.className = 'garmin-status success';
        statusEl.style.display = 'block';
    }

    // Refresh the modal to show login form
    if (currentWorkoutDayIndex !== undefined && storedTrainingData) {
        setTimeout(() => {
            showWorkoutModal(currentWorkoutDayIndex, storedTrainingData, currentWorkoutOverrideDate);
        }, 800);
    }
}

// Refresh Garmin UI section (called after successful import)
export function refreshGarminUI() {
    if (currentWorkoutDayIndex !== undefined && storedTrainingData) {
        showWorkoutModal(currentWorkoutDayIndex, storedTrainingData, currentWorkoutOverrideDate);
    }
}

// ============================================
// Workout Notes Toggle
// ============================================

export function toggleWorkoutNotes(notesId) {
    const notesEl = document.getElementById(notesId);
    const btn = notesEl?.previousElementSibling;

    if (notesEl) {
        const isHidden = notesEl.style.display === 'none';
        notesEl.style.display = isHidden ? 'block' : 'none';

        // Update button text and icon
        if (btn && btn.classList.contains('btn-view-notes')) {
            const toggleIcon = btn.querySelector('.notes-toggle-icon');
            const textSpan = btn.querySelectorAll('span')[1];
            if (toggleIcon) {
                toggleIcon.textContent = isHidden ? '▲' : '▼';
            }
            if (textSpan) {
                textSpan.textContent = isHidden ? '隱藏訓練說明' : '查看訓練說明';
            }
            btn.classList.toggle('expanded', isHidden);
        }
    }
}

// ============================================
// Modal Event Listeners
// ============================================

export function initModalEventListeners() {
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('workoutModal');
        if (e.target === modal) {
            closeWorkoutModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeWorkoutModal();
            closeSettingsModal();
        }
    });
}
