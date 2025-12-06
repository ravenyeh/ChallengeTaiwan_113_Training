// User settings management

// Default values
const DEFAULT_FTP = 190;
const DEFAULT_RUN_PACE = '6:00';
const DEFAULT_SWIM_CSS = '2:30';
const DEFAULT_TRAINING_PLAN = 'ai'; // 'ai' or 'garmin-tri'

// Training plan options
export const TRAINING_PLANS = {
    'ai': {
        id: 'ai',
        name: 'AI 生成課表',
        description: '16 週訓練計劃 (1/5 - 4/25)',
        startDate: 'January 5, 2026',
        raceDate: 'April 25, 2026',
        logo: null,
        phases: ['基礎期', '建構期', '巔峰期', '減量期', '賽前週']
    },
    'garmin-tri': {
        id: 'garmin-tri',
        name: 'Garmin TRI 課表',
        description: '15 週訓練營課表 (1/12 - 4/25)',
        startDate: 'January 12, 2026',
        raceDate: 'April 25, 2026',
        logo: 'https://www.logo.wine/a/logo/Garmin/Garmin-Logo.wine.svg',
        source: 'https://www.garmin.com.tw/event/2024/garmin-tri/',
        phases: ['基礎強化期', '速度節奏強化期', '強化調整期', '減量期', '賽前週']
    }
};

// User settings state
let userFTP = localStorage.getItem('userFTP') ? parseInt(localStorage.getItem('userFTP')) : DEFAULT_FTP;
let userRunPace = localStorage.getItem('userRunPace') || DEFAULT_RUN_PACE;
let userSwimCSS = localStorage.getItem('userSwimCSS') || DEFAULT_SWIM_CSS;
let userRunVO2max = localStorage.getItem('userRunVO2max') ? parseFloat(localStorage.getItem('userRunVO2max')) : null;
let userBikeVO2max = localStorage.getItem('userBikeVO2max') ? parseFloat(localStorage.getItem('userBikeVO2max')) : null;
let userTrainingPlan = localStorage.getItem('userTrainingPlan') || DEFAULT_TRAINING_PLAN;

// Getters
export function getUserFTP() { return userFTP; }
export function getUserRunPace() { return userRunPace; }
export function getUserSwimCSS() { return userSwimCSS; }
export function getUserRunVO2max() { return userRunVO2max; }
export function getUserBikeVO2max() { return userBikeVO2max; }
export function getUserTrainingPlan() { return userTrainingPlan; }

// Set training plan
export function setUserTrainingPlan(planId) {
    if (TRAINING_PLANS[planId]) {
        userTrainingPlan = planId;
        localStorage.setItem('userTrainingPlan', planId);
        return true;
    }
    return false;
}

// Save user settings
export function saveUserSettings(settings, callbacks = {}) {
    if (settings.ftp !== undefined) {
        userFTP = parseInt(settings.ftp) || DEFAULT_FTP;
        localStorage.setItem('userFTP', userFTP);
    }
    if (settings.runPace !== undefined) {
        userRunPace = settings.runPace || DEFAULT_RUN_PACE;
        localStorage.setItem('userRunPace', userRunPace);
    }
    if (settings.swimCSS !== undefined) {
        userSwimCSS = settings.swimCSS || DEFAULT_SWIM_CSS;
        localStorage.setItem('userSwimCSS', userSwimCSS);
    }
    // Advanced settings (VO2max)
    if (settings.runVO2max !== undefined && settings.runVO2max !== '') {
        userRunVO2max = parseFloat(settings.runVO2max);
        localStorage.setItem('userRunVO2max', userRunVO2max);
    }
    if (settings.bikeVO2max !== undefined && settings.bikeVO2max !== '') {
        userBikeVO2max = parseFloat(settings.bikeVO2max);
        localStorage.setItem('userBikeVO2max', userBikeVO2max);
    }

    console.log(`Settings updated - FTP: ${userFTP}W, Run: ${userRunPace}/km, Swim CSS: ${userSwimCSS}/100m, Run VO2max: ${userRunVO2max || 'N/A'}, Bike VO2max: ${userBikeVO2max || 'N/A'}`);

    // Execute callbacks
    if (callbacks.onSettingsSaved) {
        callbacks.onSettingsSaved();
    }
}

// Update settings display in form
export function updateSettingsDisplay() {
    const ftpInput = document.getElementById('userFTP');
    const runPaceInput = document.getElementById('userRunPace');
    const swimCSSInput = document.getElementById('userSwimCSS');
    const runVO2maxInput = document.getElementById('userRunVO2max');
    const bikeVO2maxInput = document.getElementById('userBikeVO2max');

    if (ftpInput) ftpInput.value = userFTP;
    if (runPaceInput) runPaceInput.value = userRunPace;
    if (swimCSSInput) swimCSSInput.value = userSwimCSS;
    if (runVO2maxInput && userRunVO2max) runVO2maxInput.value = userRunVO2max;
    if (bikeVO2maxInput && userBikeVO2max) bikeVO2maxInput.value = userBikeVO2max;
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

// Initialize settings summary banner
export function initSettingsSummaryBanner() {
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
    }
}

// Update and show settings summary banner
export function showSettingsSummaryBanner() {
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

// Show settings saved confirmation
export function showSettingsSavedMessage() {
    closeSettingsModal();
    showSettingsSummaryBanner();
    alert('課表更新完成！');
}
