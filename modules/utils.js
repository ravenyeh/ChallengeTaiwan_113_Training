// Utility functions

// Parse pace string (mm:ss) to seconds
export function parsePaceToSeconds(pace) {
    const parts = pace.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1] || 0);
}

// Format seconds to pace string (mm:ss)
export function formatSecondsToPace(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

// Format seconds to MM:SS pace (for rendering)
export function formatPace(totalSeconds) {
    const roundedTotal = Math.round(totalSeconds);
    const mins = Math.floor(roundedTotal / 60);
    const secs = roundedTotal % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

// Format date for display
export function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
    return `${month}/${day} (${weekday})`;
}

// Escape XML special characters
export function escapeXml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;');
}

// Convert workout name to English for export filename
export function getEnglishFilename(workoutName) {
    // Sport name translations
    const sportTranslations = {
        '游泳': 'Swim',
        '自行車': 'Bike',
        '跑步': 'Run'
    };

    // Phase translations
    const phaseTranslations = {
        '基礎期': 'Base',
        '建構期': 'Build',
        '巔峰期': 'Peak',
        '減量期': 'Taper',
        '賽前週': 'Race_Week'
    };

    let englishName = workoutName;

    // Replace sport names
    for (const [chinese, english] of Object.entries(sportTranslations)) {
        englishName = englishName.replace(chinese, english);
    }

    // Replace phase names
    for (const [chinese, english] of Object.entries(phaseTranslations)) {
        englishName = englishName.replace(chinese, english);
    }

    // Clean up: keep only alphanumeric and common characters, replace others with underscore
    return englishName.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
}

// Download file helper
export function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Extract workout description for specific sport
export function extractWorkoutPart(content, sport) {
    const parts = content.split('|').map(p => p.trim());
    for (const part of parts) {
        if (part.includes(sport)) {
            return part;
        }
    }
    return content;
}
