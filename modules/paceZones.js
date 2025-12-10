// Pace and power zone calculations

import { parsePaceToSeconds, formatSecondsToPace, extractWorkoutPart } from './utils.js';
import { getUserFTP, getUserRunPace, getUserSwimCSS } from './settings.js';

// ============================================
// Swim Pace Functions
// ============================================

// Get swim pace zones based on CSS (in seconds per 100m)
export function getSwimPaceZones() {
    const userSwimCSS = getUserSwimCSS();
    const cssSeconds = userSwimCSS ? parsePaceToSeconds(userSwimCSS) : 120; // default 2:00/100m
    return {
        recovery: { pace: Math.round(cssSeconds * 1.20), name: '恢復游' },      // +20%
        technique: { pace: Math.round(cssSeconds * 1.15), name: '技術課' },     // +15%
        aerobic: { pace: Math.round(cssSeconds * 1.05), name: '有氧游' },       // +5%
        threshold: { pace: cssSeconds, name: 'CSS配速' },                        // CSS
        interval: { pace: Math.round(cssSeconds * 0.95), name: '間歇' },        // -5%
        sprint: { pace: Math.round(cssSeconds * 0.90), name: '衝刺' }           // -10%
    };
}

// Calculate swim pace target in seconds per 100m
export function getSwimPaceTarget(zoneType) {
    const userSwimCSS = getUserSwimCSS();
    if (!userSwimCSS) return null;
    const cssSeconds = parsePaceToSeconds(userSwimCSS);
    const paceMultipliers = {
        'recovery': 1.20,
        'technique': 1.15,
        'aerobic': 1.05,
        'threshold': 1.00,
        'interval': 0.95,
        'sprint': 0.90
    };
    const multiplier = paceMultipliers[zoneType] || 1.0;
    return Math.round(cssSeconds * multiplier);
}

// Convert swim pace (seconds per 100m) to meters per second for Garmin API
export function swimPaceToMetersPerSecond(paceSecondsPer100m) {
    return 100 / paceSecondsPer100m;
}

// Create swim pace target object for Garmin workout steps
// Note: Swimming uses workoutTargetTypeId 5 (speed.zone) with speed in m/s
// This is different from running which uses pace.zone (workoutTargetTypeId: 6)
export function createSwimPaceTarget(fastPaceSeconds, slowPaceSeconds) {
    return {
        targetType: { workoutTargetTypeId: 5, workoutTargetTypeKey: 'speed.zone' },
        targetValueOne: swimPaceToMetersPerSecond(slowPaceSeconds),
        targetValueTwo: swimPaceToMetersPerSecond(fastPaceSeconds)
    };
}

// ============================================
// Bike Power Functions
// ============================================

// Get FTP-based power zones
export function getBikePowerZones() {
    const ftp = getUserFTP() || 200;
    return {
        Z1: { low: Math.round(ftp * 0.45), high: Math.round(ftp * 0.55), name: '恢復' },
        Z2: { low: Math.round(ftp * 0.55), high: Math.round(ftp * 0.75), name: '耐力' },
        Z3: { low: Math.round(ftp * 0.75), high: Math.round(ftp * 0.90), name: '節奏' },
        SS: { low: Math.round(ftp * 0.88), high: Math.round(ftp * 0.94), name: 'Sweet Spot' },
        Z4: { low: Math.round(ftp * 0.90), high: Math.round(ftp * 1.05), name: '閾值' },
        Z5: { low: Math.round(ftp * 1.05), high: Math.round(ftp * 1.20), name: 'VO2max' },
        Z6: { low: Math.round(ftp * 1.20), high: Math.round(ftp * 1.50), name: '無氧' }
    };
}

// ============================================
// Run Pace Functions
// ============================================

// Get marathon pace-based run zones (in seconds per km)
export function getRunPaceZones() {
    const userRunPace = getUserRunPace();
    const marathonPaceSeconds = userRunPace ? parsePaceToSeconds(userRunPace) : 360; // default 6:00/km
    return {
        recovery: { pace: Math.round(marathonPaceSeconds * 1.25), name: '恢復跑' },
        easy: { pace: Math.round(marathonPaceSeconds * 1.15), name: '輕鬆跑' },
        long: { pace: Math.round(marathonPaceSeconds * 1.10), name: '長跑配速' },
        marathon: { pace: marathonPaceSeconds, name: '馬拉松配速' },
        tempo: { pace: Math.round(marathonPaceSeconds * 0.95), name: '節奏跑' },
        threshold: { pace: Math.round(marathonPaceSeconds * 0.90), name: '閾值跑' },
        interval: { pace: Math.round(marathonPaceSeconds * 0.85), name: '間歇配速' },
        rep: { pace: Math.round(marathonPaceSeconds * 0.80), name: '重複跑' }
    };
}

// Convert pace (seconds per km) to meters per second for Garmin API
export function paceToMetersPerSecond(paceSecondsPerKm) {
    return 1000 / paceSecondsPerKm;
}

// Create pace target object for Garmin workout steps
export function createPaceTarget(fastPaceSeconds, slowPaceSeconds) {
    return {
        targetType: { workoutTargetTypeId: 6, workoutTargetTypeKey: 'pace.zone' },
        targetValueOne: paceToMetersPerSecond(slowPaceSeconds),
        targetValueTwo: paceToMetersPerSecond(fastPaceSeconds)
    };
}

// ============================================
// Workout Description Builder
// ============================================

// Build workout description with user-specific paces
export function buildWorkoutDescription(day, sport) {
    const userFTP = getUserFTP();
    const userRunPace = getUserRunPace();
    const userSwimCSS = getUserSwimCSS();

    let description = extractWorkoutPart(day.content, sport === 'swim' ? '游泳' : sport === 'bike' ? '自行車' : '跑步');

    // Add FTP-based power zones for bike workouts
    if (sport === 'bike' && userFTP > 0) {
        const zones = {
            Z1: `< ${Math.round(userFTP * 0.55)}W`,
            Z2: `${Math.round(userFTP * 0.55)}-${Math.round(userFTP * 0.75)}W`,
            Z3: `${Math.round(userFTP * 0.75)}-${Math.round(userFTP * 0.90)}W`,
            'Sweet Spot': `${Math.round(userFTP * 0.88)}-${Math.round(userFTP * 0.94)}W`,
            Z4: `${Math.round(userFTP * 0.90)}-${Math.round(userFTP * 1.05)}W`,
            Z5: `${Math.round(userFTP * 1.05)}-${Math.round(userFTP * 1.20)}W`
        };

        if (day.content.includes('Z2')) {
            description += `\n\n功率區間 Z2: ${zones.Z2}`;
        }
        if (day.content.includes('Sweet Spot')) {
            description += `\n\nSweet Spot: ${zones['Sweet Spot']}`;
        }
        if (day.content.includes('FTP')) {
            description += `\n\nFTP: ${userFTP}W`;
        }
    }

    // Add run pace zones
    if (sport === 'run' && userRunPace) {
        const basePaceSeconds = parsePaceToSeconds(userRunPace);
        const zones = {
            '輕鬆跑': formatSecondsToPace(basePaceSeconds * 1.15),
            '長跑': formatSecondsToPace(basePaceSeconds * 1.10),
            '節奏跑': formatSecondsToPace(basePaceSeconds * 0.95),
            '間歇': formatSecondsToPace(basePaceSeconds * 0.85),
            '比賽配速': userRunPace
        };

        description += `\n\n配速參考 (基於馬拉松配速 ${userRunPace}/km):`;
        if (day.content.includes('輕鬆跑')) {
            description += `\n• 輕鬆跑: ${zones['輕鬆跑']}/km`;
        }
        if (day.content.includes('長跑')) {
            description += `\n• 長跑: ${zones['長跑']}/km`;
        }
        if (day.content.includes('節奏')) {
            description += `\n• 節奏跑: ${zones['節奏跑']}/km`;
        }
        if (day.content.includes('比賽配速')) {
            description += `\n• 比賽配速: ${zones['比賽配速']}/km`;
        }
    }

    // Add swim pace zones based on CSS
    if (sport === 'swim' && userSwimCSS) {
        const basePaceSeconds = parsePaceToSeconds(userSwimCSS);
        const zones = {
            '恢復游': formatSecondsToPace(basePaceSeconds * 1.20),
            '技術課': formatSecondsToPace(basePaceSeconds * 1.15),
            '有氧游': formatSecondsToPace(basePaceSeconds * 1.05),
            '配速訓練': userSwimCSS,
            '間歇': formatSecondsToPace(basePaceSeconds * 0.95)
        };

        description += `\n\n配速參考 (基於 CSS ${userSwimCSS}/100m):`;
        if (day.content.includes('恢復游')) {
            description += `\n• 恢復游: ${zones['恢復游']}/100m`;
        }
        if (day.content.includes('技術課')) {
            description += `\n• 技術課: ${zones['技術課']}/100m`;
        }
        if (day.content.includes('配速')) {
            description += `\n• 配速訓練: ${zones['配速訓練']}/100m`;
        }
        if (day.content.includes('間歇')) {
            description += `\n• 間歇: ${zones['間歇']}/100m`;
        }
    }

    return description;
}
