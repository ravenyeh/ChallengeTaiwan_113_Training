// Main application entry point
// Imports and coordinates all modules for the Challenge Taiwan 113 Training Plan

// Import training data
import { trainingData } from './modules/trainingData.js';

// Import utility functions
import { formatDate, parsePaceToSeconds, formatSecondsToPace } from './modules/utils.js';

// Import settings management
import {
    getUserFTP,
    getUserRunPace,
    getUserSwimCSS,
    saveUserSettings as saveSettings,
    updateSettingsDisplay,
    toggleAdvancedSettings,
    openSettingsModal,
    closeSettingsModal,
    initSettingsSummaryBanner,
    showSettingsSavedMessage
} from './modules/settings.js';

// Import workout builder
import { convertToGarminWorkout } from './modules/workoutBuilder.js';

// Import workout export functions
import {
    downloadWorkoutJson,
    downloadWorkoutZwo,
    downloadWorkoutErg
} from './modules/workoutExport.js';

// Import Garmin Connect integration
import {
    directImportToGarmin as garminDirectImport,
    getGarminSession,
    updateGarminStatus
} from './modules/garminConnect.js';

// Import UI functions
import {
    showWorkoutModal as displayWorkoutModal,
    closeWorkoutModal,
    initModalEventListeners,
    initWeeklyMileageChart
} from './modules/ui.js';

// ============================================
// Application State
// ============================================

let currentWorkoutDayIndex = undefined;
let currentWorkoutOverrideDate = null;

// ============================================
// Schedule Table
// ============================================

function populateSchedule(filter = 'all') {
    const tbody = document.getElementById('scheduleBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const filteredData = filter === 'all'
        ? trainingData
        : trainingData.filter(item => item.phase === filter);

    filteredData.forEach(item => {
        const row = document.createElement('tr');

        // Find the original index in trainingData
        const originalIndex = trainingData.findIndex(d => d.date === item.date);

        // Add classes for styling
        if (item.intensity === '休息') {
            row.classList.add('rest-day');
        }
        if (item.type === '比賽日') {
            row.classList.add('race-day');
        }
        if (item.holiday) {
            row.classList.add('holiday-row');
        }

        // Determine if there are workouts (not a rest day)
        const hasWorkout = item.swim || item.bike || item.run;

        row.innerHTML = `
            <td>${item.week}</td>
            <td>${formatDate(item.date)}</td>
            <td><span class="phase-badge phase-${item.phase}">${item.phase}</span></td>
            <td><span class="intensity-badge intensity-${item.intensity}">${item.intensity}</span></td>
            <td>${item.content}</td>
            <td>${item.swim ? item.swim + 'km' : '-'}</td>
            <td>${item.bike ? item.bike + 'km' : '-'}</td>
            <td>${item.run ? item.run + 'km' : '-'}</td>
            <td>${item.hours}h</td>
            <td>
                ${hasWorkout ? `<button class="btn-view-workout" onclick="showWorkoutModal(${originalIndex})">查看訓練</button>` : '-'}
            </td>
        `;

        tbody.appendChild(row);
    });
}

// ============================================
// Weekly Mileage Chart (local implementation)
// ============================================

function initLocalWeeklyMileageChart() {
    const ctx = document.getElementById('weeklyMileageChart');
    if (!ctx) return;

    // Calculate weekly totals
    const weeklyData = {};
    trainingData.forEach(day => {
        const week = day.week;
        if (!weeklyData[week]) {
            weeklyData[week] = { swim: 0, bike: 0, run: 0 };
        }
        weeklyData[week].swim += parseFloat(day.swim) || 0;
        weeklyData[week].bike += parseFloat(day.bike) || 0;
        weeklyData[week].run += parseFloat(day.run) || 0;
    });

    // Convert to arrays
    const weeks = Object.keys(weeklyData).sort((a, b) => {
        const numA = parseInt(a.replace('Week ', ''));
        const numB = parseInt(b.replace('Week ', ''));
        return numA - numB;
    });

    const swimData = weeks.map(w => weeklyData[w].swim.toFixed(1));
    const bikeData = weeks.map(w => weeklyData[w].bike.toFixed(0));
    const runData = weeks.map(w => weeklyData[w].run.toFixed(1));
    const labels = weeks.map(w => w.replace('Week ', 'W'));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '游泳 (km)',
                    data: swimData,
                    borderColor: '#0077be',
                    backgroundColor: 'rgba(0, 119, 190, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y1',
                    pointBackgroundColor: '#0077be',
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: '自行車 (km)',
                    data: bikeData,
                    borderColor: '#f5a623',
                    backgroundColor: 'rgba(245, 166, 35, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y',
                    pointBackgroundColor: '#f5a623',
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: '跑步 (km)',
                    data: runData,
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y',
                    pointBackgroundColor: '#4caf50',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 14,
                            family: "'Noto Sans TC', sans-serif"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    titleFont: {
                        size: 14,
                        family: "'Noto Sans TC', sans-serif"
                    },
                    bodyFont: {
                        size: 13,
                        family: "'Noto Sans TC', sans-serif"
                    },
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' km';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: "'Noto Sans TC', sans-serif"
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '自行車 / 跑步 (km)',
                        font: {
                            size: 13,
                            family: "'Noto Sans TC', sans-serif"
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    },
                    min: 0
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '游泳 (km)',
                        color: '#0077be',
                        font: {
                            size: 13,
                            family: "'Noto Sans TC', sans-serif"
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#0077be',
                        font: {
                            size: 12
                        }
                    },
                    min: 0
                }
            }
        }
    });
}

// ============================================
// Countdown Timer
// ============================================

function updateCountdown() {
    const raceDay = new Date('2026-04-25T06:00:00+08:00');
    const now = new Date();
    const diff = raceDay - now;

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    } else {
        if (daysEl) daysEl.textContent = '0';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
    }
}

// ============================================
// Today's Training Display
// ============================================

function displayTodayTraining() {
    const now = new Date();
    const todayStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Find today's training
    const todayTraining = trainingData.find(day => {
        const dayDate = new Date(day.date);
        return dayDate.toDateString() === now.toDateString();
    });

    const todayContainer = document.getElementById('todayTraining');
    const todayLabel = document.getElementById('todayLabel');
    const todayPhase = document.getElementById('todayPhase');
    const todayIntensity = document.getElementById('todayIntensity');
    const todayDescription = document.getElementById('todayDescription');
    const todaySwim = document.getElementById('todaySwim');
    const todayBike = document.getElementById('todayBike');
    const todayRun = document.getElementById('todayRun');
    const todayHours = document.getElementById('todayHours');
    const todayNote = document.getElementById('todayNote');
    const todayActions = document.getElementById('todayActions');

    if (!todayContainer) return;

    if (todayTraining) {
        todayContainer.style.display = 'block';
        if (todayLabel) todayLabel.textContent = `今日訓練 - ${formatDate(todayTraining.date)}`;
        if (todayPhase) {
            todayPhase.textContent = todayTraining.phase;
            todayPhase.className = `today-phase phase-${todayTraining.phase}`;
        }
        if (todayIntensity) {
            todayIntensity.textContent = todayTraining.intensity;
            todayIntensity.className = `today-intensity intensity-${todayTraining.intensity}`;
        }
        if (todayDescription) todayDescription.textContent = todayTraining.content;

        // Stats
        if (todaySwim) todaySwim.innerHTML = todayTraining.swim ? `<img src="images/swim.png" class="stat-icon-small" alt="游泳"> ${todayTraining.swim}km` : '';
        if (todayBike) todayBike.innerHTML = todayTraining.bike ? `<img src="images/cycling.png" class="stat-icon-small" alt="自行車"> ${todayTraining.bike}km` : '';
        if (todayRun) todayRun.innerHTML = todayTraining.run ? `<img src="images/run.png" class="stat-icon-small" alt="跑步"> ${todayTraining.run}km` : '';
        if (todayHours) todayHours.textContent = todayTraining.hours > 0 ? `${todayTraining.hours}h` : '';

        // Note for holidays
        if (todayNote && todayTraining.holiday) {
            todayNote.textContent = `🧧 ${todayTraining.holiday}`;
            todayNote.style.display = 'block';
        } else if (todayNote) {
            todayNote.style.display = 'none';
        }

        // Action buttons
        if (todayActions) {
            const hasWorkout = todayTraining.swim || todayTraining.bike || todayTraining.run;
            if (hasWorkout) {
                const todayIndex = trainingData.findIndex(d => d.date === todayTraining.date);
                todayActions.innerHTML = `
                    <button class="btn-today-workout" onclick="showWorkoutModal(${todayIndex}, null)">
                        查看今日訓練
                    </button>
                `;
            } else {
                todayActions.innerHTML = '';
            }
        }
    } else {
        // Check if before or after training period
        const firstTrainingDate = new Date(trainingData[0].date);
        const lastTrainingDate = new Date(trainingData[trainingData.length - 1].date);

        if (now < firstTrainingDate) {
            todayContainer.style.display = 'block';
            if (todayLabel) todayLabel.textContent = '訓練尚未開始';
            if (todayPhase) todayPhase.textContent = '';
            if (todayIntensity) todayIntensity.textContent = '';
            if (todayDescription) todayDescription.textContent = `訓練計劃將於 ${formatDate(trainingData[0].date)} 開始`;
            if (todaySwim) todaySwim.textContent = '';
            if (todayBike) todayBike.textContent = '';
            if (todayRun) todayRun.textContent = '';
            if (todayHours) todayHours.textContent = '';
            if (todayNote) todayNote.style.display = 'none';
            if (todayActions) todayActions.innerHTML = '';
        } else if (now > lastTrainingDate) {
            todayContainer.style.display = 'block';
            if (todayLabel) todayLabel.textContent = '訓練計劃已完成';
            if (todayPhase) todayPhase.textContent = '';
            if (todayIntensity) todayIntensity.textContent = '';
            if (todayDescription) todayDescription.textContent = 'Challenge Taiwan 113 - 恭喜完賽！';
            if (todaySwim) todaySwim.textContent = '';
            if (todayBike) todayBike.textContent = '';
            if (todayRun) todayRun.textContent = '';
            if (todayHours) todayHours.textContent = '';
            if (todayNote) todayNote.style.display = 'none';
            if (todayActions) todayActions.innerHTML = '';
        } else {
            todayContainer.style.display = 'none';
        }
    }
}

// ============================================
// Wrapper Functions for Global Access
// ============================================

// Show workout modal wrapper
function showWorkoutModal(dayIndex, overrideDate = null) {
    currentWorkoutDayIndex = dayIndex;
    currentWorkoutOverrideDate = overrideDate;
    displayWorkoutModal(dayIndex, trainingData, overrideDate);
}

// Save user settings wrapper
function saveUserSettings(settings) {
    saveSettings(settings, {
        onSettingsSaved: () => {
            // Refresh schedule table to show updated pace/power values
            populateSchedule();
            // Update today's training display
            displayTodayTraining();
            // Show confirmation
            showSettingsSavedMessage();
        }
    });
}

// Direct import to Garmin wrapper
function directImportToGarmin(dayIndex) {
    garminDirectImport(dayIndex, trainingData, currentWorkoutOverrideDate);
}

// ============================================
// Initialize Application
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Challenge Taiwan 113 Training Plan...');

    // Update settings display
    updateSettingsDisplay();

    // Show settings summary banner if user has saved settings
    initSettingsSummaryBanner();

    // Populate schedule table
    populateSchedule();

    // Setup filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            populateSchedule(btn.dataset.filter);
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const scheduleSection = document.getElementById('schedule');
            if (scheduleSection) {
                scheduleSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        scrollIndicator.style.cursor = 'pointer';
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation to elements
    document.querySelectorAll('.phase, .strategy-card, .success-card, .race-segment').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize Weekly Mileage Chart
    initLocalWeeklyMileageChart();

    // Display Today's Training
    displayTodayTraining();

    // Initialize modal event listeners
    initModalEventListeners();

    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);

    console.log('Application initialized successfully.');
});

// ============================================
// Expose Functions to Window for HTML onclick handlers
// ============================================

window.showWorkoutModal = showWorkoutModal;
window.closeWorkoutModal = closeWorkoutModal;
window.openSettingsModal = openSettingsModal;
window.closeSettingsModal = closeSettingsModal;
window.saveUserSettings = saveUserSettings;
window.toggleAdvancedSettings = toggleAdvancedSettings;
window.directImportToGarmin = directImportToGarmin;
window.downloadWorkoutJson = downloadWorkoutJson;
window.downloadWorkoutZwo = downloadWorkoutZwo;
window.downloadWorkoutErg = downloadWorkoutErg;

// Export for potential external use
export {
    trainingData,
    showWorkoutModal,
    populateSchedule,
    displayTodayTraining
};
