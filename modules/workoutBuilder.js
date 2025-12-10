// Workout step generation for swim/bike/run

import { getSwimPaceZones, createSwimPaceTarget, getBikePowerZones, getRunPaceZones, createPaceTarget, buildWorkoutDescription } from './paceZones.js';
import { getUserFTP, getUserRunPace } from './settings.js';

// Step ID counter for unique IDs
let stepIdCounter = 0;

export function resetStepIdCounter() {
    stepIdCounter = 0;
}

export function getNextStepId() {
    return ++stepIdCounter;
}

// Swim stroke types for Garmin (from API)
export const SWIM_STROKE_TYPES = {
    any_stroke: { strokeTypeId: 1, strokeTypeKey: 'any_stroke' },
    backstroke: { strokeTypeId: 2, strokeTypeKey: 'backstroke' },
    breaststroke: { strokeTypeId: 3, strokeTypeKey: 'breaststroke' },
    drill: { strokeTypeId: 4, strokeTypeKey: 'drill' },
    fly: { strokeTypeId: 5, strokeTypeKey: 'fly' },
    free: { strokeTypeId: 6, strokeTypeKey: 'free' },
    individual_medley: { strokeTypeId: 7, strokeTypeKey: 'individual_medley' },
    mixed: { strokeTypeId: 8, strokeTypeKey: 'mixed' }
};

// Swim drill types for Garmin (from API)
export const SWIM_DRILL_TYPES = {
    kick: { drillTypeId: 1, drillTypeKey: 'kick' },
    pull: { drillTypeId: 2, drillTypeKey: 'pull' },
    drill: { drillTypeId: 3, drillTypeKey: 'drill' }
};

// Swim equipment types for Garmin (from API)
export const SWIM_EQUIPMENT_TYPES = {
    fins: { equipmentTypeId: 1, equipmentTypeKey: 'fins' },
    kickboard: { equipmentTypeId: 2, equipmentTypeKey: 'kickboard' },
    paddles: { equipmentTypeId: 3, equipmentTypeKey: 'paddles' },
    pull_buoy: { equipmentTypeId: 4, equipmentTypeKey: 'pull_buoy' },
    snorkel: { equipmentTypeId: 5, equipmentTypeKey: 'snorkel' }
};

// Format step for Garmin API
export function formatStep(step) {
    // Determine if this is a repeat group or an executable step
    const isRepeatGroup = step.stepType?.stepTypeKey === 'repeat' && step.workoutSteps;

    const formatted = {
        type: isRepeatGroup ? 'RepeatGroupDTO' : 'ExecutableStepDTO',
        stepId: getNextStepId(),
        stepOrder: step.stepOrder,
        childStepId: null,
        stepType: step.stepType,
        endCondition: step.endCondition,
        targetType: step.targetType || { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
    };

    if (step.endConditionValue !== undefined) {
        formatted.endConditionValue = step.endConditionValue;
    }
    if (step.targetValueOne !== undefined) {
        formatted.targetValueOne = step.targetValueOne;
    }
    if (step.targetValueTwo !== undefined) {
        formatted.targetValueTwo = step.targetValueTwo;
    }
    if (step.secondaryTargetType) {
        formatted.secondaryTargetType = step.secondaryTargetType;
        formatted.secondaryTargetValueOne = step.secondaryTargetValueOne;
        formatted.secondaryTargetValueTwo = step.secondaryTargetValueTwo;
    }
    if (step.description) {
        formatted.description = step.description;
    }
    // Add exerciseType for swim workouts (legacy)
    if (step.exerciseType) {
        formatted.exerciseType = step.exerciseType;
    }
    // Add strokeType for swim workouts
    if (step.strokeType) {
        formatted.strokeType = step.strokeType;
    }
    // Add drillType for drill steps
    if (step.drillType) {
        formatted.drillType = step.drillType;
    }
    // Add equipmentType for swim steps with equipment
    if (step.equipmentType) {
        formatted.equipmentType = step.equipmentType;
    }

    // Handle repeat groups
    if (isRepeatGroup) {
        formatted.numberOfIterations = step.numberOfIterations || 2;
        formatted.workoutSteps = step.workoutSteps.map(s => formatStep(s));
        // Remove fields not needed for repeat groups
        delete formatted.endCondition;
        delete formatted.targetType;
    }

    return formatted;
}

// ============================================
// Swim Workout Generation
// ============================================

// Generate swim workout steps
export function generateSwimSteps(totalDistance, content) {
    const steps = [];
    let stepOrder = 1;
    const zones = getSwimPaceZones();

    // Check for intervals pattern like "6x400m" or "10x200m"
    const intervalMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)m/);
    // Check for drill/technique content
    const hasTechnique = content.includes('技術') || content.includes('划手') || content.includes('姿勢調整') || content.includes('姿勢');
    const hasDrill = content.includes('踢水') || content.includes('分解') || content.includes('腿');
    const hasBreathing = content.includes('呼吸') || content.includes('換氣');
    const hasPull = content.includes('臂划') || content.includes('臂/腿');
    const hasSprint = content.includes('全力游') || content.includes('衝刺');
    const hasMixedStroke = content.includes('蛙/自') || content.includes('蛙泳') || content.includes('混合');

    if (intervalMatch) {
        const reps = parseInt(intervalMatch[1]);
        const distance = parseInt(intervalMatch[2]);
        const mainSetDistance = reps * distance;
        const remainingDistance = totalDistance - mainSetDistance;
        const warmupDistance = Math.min(Math.round(remainingDistance * 0.6), 400);
        const cooldownDistance = Math.max(remainingDistance - warmupDistance, 200);

        // Warmup
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(warmupDistance * 0.5),
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 10),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `輕鬆游熱身 @ ${zones.recovery.name}`
        });

        // Drill set if technique day
        if (hasTechnique || hasDrill || hasBreathing || hasPull) {
            let drillDesc = '技術分解練習';
            if (hasBreathing) drillDesc = '呼吸/換氣練習';
            else if (hasPull) drillDesc = '臂划練習';
            else if (hasDrill) drillDesc = '踢水/腿部練習';
            else if (hasTechnique) drillDesc = '姿勢調整練習';

            steps.push({
                stepOrder: stepOrder++,
                stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
                numberOfIterations: 4,
                workoutSteps: [
                    {
                        stepOrder: 1,
                        stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                        endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                        endConditionValue: 50,
                        ...createSwimPaceTarget(zones.technique.pace - 5, zones.technique.pace + 10),
                        strokeType: SWIM_STROKE_TYPES.drill,
                        drillType: hasPull ? SWIM_DRILL_TYPES.pull : hasDrill ? SWIM_DRILL_TYPES.kick : SWIM_DRILL_TYPES.drill,
                        description: drillDesc
                    },
                    {
                        stepOrder: 2,
                        stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                        endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                        endConditionValue: 15,
                        targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                    }
                ],
                description: `4x50m ${drillDesc}`
            });
        }

        // Pre-set: Build-up
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 4,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 25,
                    ...createSwimPaceTarget(zones.sprint.pace, zones.recovery.pace),
                    strokeType: SWIM_STROKE_TYPES.free,
                    description: '漸速游 (由慢到快)'
                }
            ],
            description: '4x25m 漸速游'
        });

        // Main set: Interval repeat
        const restTime = distance >= 400 ? 45 : distance >= 200 ? 30 : 20;

        // Determine pace target based on workout type
        let targetPace, paceDesc;
        if (hasSprint) {
            targetPace = createSwimPaceTarget(zones.sprint.pace - 3, zones.sprint.pace + 5);
            paceDesc = zones.sprint.name;
        } else if (hasMixedStroke) {
            targetPace = createSwimPaceTarget(zones.aerobic.pace - 3, zones.aerobic.pace + 5);
            paceDesc = `${zones.aerobic.name} (蛙/自混合)`;
        } else {
            // CSS pace with ±3 seconds tolerance (was ±5)
            targetPace = createSwimPaceTarget(zones.threshold.pace - 3, zones.threshold.pace + 3);
            paceDesc = zones.threshold.name;
        }

        // Determine strokeType based on content
        const mainStrokeType = hasMixedStroke ? SWIM_STROKE_TYPES.mixed : SWIM_STROKE_TYPES.free;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: reps,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: distance,
                    ...targetPace,
                    strokeType: mainStrokeType,
                    description: `主課表 ${distance}m @ ${paceDesc}`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: restTime,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: `${reps}x${distance}m 主課表 @ ${paceDesc} (休息${restTime}秒)`
        });

        // Cooldown
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDistance,
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 10),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `緩和游 @ ${zones.recovery.name}`
        });

    } else if (content.includes('技術課') || content.includes('技術訓練')) {
        // Technical/Drill focused session
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 300,
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 10),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `輕鬆游熱身 @ ${zones.recovery.name}`
        });

        // Kick drills
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 4,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 50,
                    ...createSwimPaceTarget(zones.technique.pace - 5, zones.technique.pace + 15),
                    strokeType: SWIM_STROKE_TYPES.drill,
                    drillType: SWIM_DRILL_TYPES.kick,
                    equipmentType: SWIM_EQUIPMENT_TYPES.kickboard,
                    description: '踢水練習'
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 15,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: '4x50m 踢水'
        });

        // Pull drills
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 4,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 50,
                    ...createSwimPaceTarget(zones.technique.pace - 5, zones.technique.pace + 10),
                    strokeType: SWIM_STROKE_TYPES.drill,
                    drillType: SWIM_DRILL_TYPES.pull,
                    equipmentType: SWIM_EQUIPMENT_TYPES.pull_buoy,
                    description: '划手練習 (夾浮板)'
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 15,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: '4x50m 划手'
        });

        // Swim focus
        const remainingDistance = totalDistance - 700;
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: Math.max(Math.round(remainingDistance / 100), 4),
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 100,
                    ...createSwimPaceTarget(zones.aerobic.pace - 3, zones.aerobic.pace + 5),
                    strokeType: SWIM_STROKE_TYPES.free,
                    description: `專注划頻與流線型 @ ${zones.aerobic.name}`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 20,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: '100m 技術整合'
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 200,
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 10),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `緩和游 @ ${zones.recovery.name}`
        });

    } else if (content.includes('恢復') || content.includes('輕鬆')) {
        // Recovery swim
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 200,
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 10),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `輕鬆游熱身 @ ${zones.recovery.name}`
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: totalDistance - 400,
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 10),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `${zones.recovery.name} - 保持輕鬆划頻`
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 200,
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 15),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `緩和游 @ ${zones.recovery.name}`
        });

    } else {
        // Standard aerobic swim
        const warmupDist = Math.round(totalDistance * 0.15);
        const mainSetDist = Math.round(totalDistance * 0.70);
        const cooldownDist = totalDistance - warmupDist - mainSetDist;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: warmupDist,
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 10),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `混合式熱身 @ ${zones.recovery.name} (自由式為主)`
        });

        // Main set in 100m blocks
        const reps = Math.round(mainSetDist / 100);
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: reps,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 100,
                    ...createSwimPaceTarget(zones.aerobic.pace - 3, zones.aerobic.pace + 5),
                    strokeType: SWIM_STROKE_TYPES.free,
                    description: `有氧游 @ ${zones.aerobic.name}`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 15,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: `${reps}x100m 有氧游 @ ${zones.aerobic.name}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDist,
            ...createSwimPaceTarget(zones.recovery.pace - 5, zones.recovery.pace + 10),
            strokeType: SWIM_STROKE_TYPES.free,
            description: `緩和游 @ ${zones.recovery.name}`
        });
    }

    return steps;
}

// ============================================
// Bike Workout Generation
// ============================================

// Generate bike workout steps
export function generateBikeSteps(totalDistance, content) {
    const steps = [];
    let stepOrder = 1;
    const zones = getBikePowerZones();
    const ftp = getUserFTP() || 200;

    // Check for Sweet Spot intervals
    const ssMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)\s*分鐘.*Sweet\s*Spot/i);
    // Check for FTP intervals
    const ftpMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)\s*分鐘.*FTP/i);

    // Garmin TRI patterns - FTP percentage based workouts
    // Pattern: "50%-60% FTP" or "80% FTP" or "120% FTP"
    const ftpPercentMatch = content.match(/(\d+)%?\s*[-~]?\s*(\d+)?%?\s*FTP/i);
    // Pattern for short sprint intervals: "12x20sec 120% FTP"
    const sprintMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)\s*sec.*?(\d+)%?\s*FTP/i);
    // Pattern for time-based FTP intervals: "6x87% FTP" or "4x5min 90% FTP"
    const ftpIntervalMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)?%?\s*FTP/i);
    // Check for cadence target: "踏頻90+" or "踏頻85-95rpm"
    const cadenceMatch = content.match(/踏頻\s*(\d+)(?:\s*[-~]\s*(\d+))?/);

    if (sprintMatch) {
        // Short sprint intervals like "12x20sec 120% FTP"
        const reps = parseInt(sprintMatch[1]);
        const seconds = parseInt(sprintMatch[2]);
        const targetPercent = parseInt(sprintMatch[3]);
        const targetPower = Math.round(ftp * targetPercent / 100);

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
            endConditionValue: 600,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '熱身 10分鐘'
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: reps,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: seconds,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: Math.round(targetPower * 0.95),
                    targetValueTwo: Math.round(targetPower * 1.05),
                    description: `衝刺 ${seconds}秒 @ ${targetPercent}% FTP (${targetPower}W)`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 90,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z1.low,
                    targetValueTwo: zones.Z1.high,
                    description: '恢復 90秒'
                }
            ],
            description: `${reps}x${seconds}秒 @ ${targetPercent}% FTP`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
            endConditionValue: 600,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '緩和 10分鐘'
        });

    } else if (ssMatch || content.includes('Sweet Spot')) {
        // Sweet Spot workout
        const reps = ssMatch ? parseInt(ssMatch[1]) : 3;
        const minutes = ssMatch ? parseInt(ssMatch[2]) : 10;
        const restMinutes = minutes >= 15 ? 5 : minutes >= 10 ? 4 : 3;

        // Warmup with progressive build
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
            endConditionValue: 600,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: `熱身 10分鐘 - 漸進提升至 ${zones.Z2.name}區`
        });

        // Activation - high cadence spins
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 3,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 60,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z3.low,
                    targetValueTwo: zones.Z3.high,
                    secondaryTargetType: { workoutTargetTypeId: 3, workoutTargetTypeKey: 'cadence.zone' },
                    secondaryTargetValueOne: 100,
                    secondaryTargetValueTwo: 110,
                    description: `高迴轉激活 @ ${zones.Z3.name}區 @100-110rpm`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 60,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: '3x1分鐘 高迴轉激活'
        });

        // Main set: Sweet Spot intervals
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: reps,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: minutes * 60,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.SS.low,
                    targetValueTwo: zones.SS.high,
                    secondaryTargetType: { workoutTargetTypeId: 3, workoutTargetTypeKey: 'cadence.zone' },
                    secondaryTargetValueOne: 85,
                    secondaryTargetValueTwo: 95,
                    description: `${zones.SS.name} (88-94% FTP) @85-95rpm`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: restMinutes * 60,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z1.low,
                    targetValueTwo: zones.Z1.high,
                    description: `恢復 ${restMinutes}分鐘 @ ${zones.Z1.name}區`
                }
            ],
            description: `${reps}x${minutes}分鐘 ${zones.SS.name}`
        });

        // Cooldown
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
            endConditionValue: 600,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '緩和 10分鐘 - 漸進降低強度'
        });

    } else if (ftpMatch || content.includes('FTP') || content.includes('閾值')) {
        // FTP/Threshold workout
        const reps = ftpMatch ? parseInt(ftpMatch[1]) : 2;
        const minutes = ftpMatch ? parseInt(ftpMatch[2]) : 20;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
            endConditionValue: 900,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '熱身 15分鐘 - 漸進提升'
        });

        // Build-ups
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 3,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 30,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z4.low,
                    targetValueTwo: zones.Z4.high,
                    description: `漸速 30秒 @ ${zones.Z4.name}區`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 90,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: '3x30秒 漸速提升'
        });

        // Main set: FTP intervals
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: reps,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: minutes * 60,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z4.low,
                    targetValueTwo: ftp,
                    secondaryTargetType: { workoutTargetTypeId: 3, workoutTargetTypeKey: 'cadence.zone' },
                    secondaryTargetValueOne: 85,
                    secondaryTargetValueTwo: 95,
                    description: `FTP 間歇 @ ${zones.Z4.name}區 (90-100% FTP) @85-95rpm`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: Math.round(minutes * 60 * 0.5),
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z1.low,
                    targetValueTwo: zones.Z2.low,
                    description: `恢復 @ ${zones.Z1.name}區`
                }
            ],
            description: `${reps}x${minutes}分鐘 FTP @ ${zones.Z4.name}區`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
            endConditionValue: 600,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '緩和 10分鐘'
        });

    } else if (content.includes('長騎') || content.includes('長距離') || totalDistance >= 80000) {
        // Long endurance ride
        const warmupDist = 10000;
        const cooldownDist = 5000;
        const mainDist = totalDistance - warmupDist - cooldownDist;

        // Check if rest breaks are mentioned (e.g., "每1.5hrs休息")
        const hasRestBreaks = content.includes('休息');

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: warmupDist,
            targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
            targetValueOne: zones.Z1.low,
            targetValueTwo: zones.Z2.low,
            description: `熱身 10km @ ${zones.Z1.name}~${zones.Z2.name}區`
        });

        if (hasRestBreaks) {
            // Split into blocks with rest breaks
            const blockDistance = 25000; // ~45min at 33km/h, rest every ~1.5hrs means 2 blocks then rest
            const blocks = Math.floor(mainDist / blockDistance);
            const remainingDist = mainDist - (blocks * blockDistance);

            for (let i = 0; i < blocks; i++) {
                steps.push({
                    stepOrder: stepOrder++,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: blockDistance,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z2.low,
                    targetValueTwo: zones.Z2.high,
                    secondaryTargetType: { workoutTargetTypeId: 3, workoutTargetTypeKey: 'cadence.zone' },
                    secondaryTargetValueOne: 85,
                    secondaryTargetValueTwo: 95,
                    description: `${zones.Z2.name}區 (${i+1}/${blocks})`
                });

                // Add rest break after every 2 blocks (roughly 1.5hrs)
                if ((i + 1) % 2 === 0 && i < blocks - 1) {
                    steps.push({
                        stepOrder: stepOrder++,
                        stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                        endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                        endConditionValue: 300, // 5 minutes rest
                        targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
                        description: '休息補給 5分鐘'
                    });
                }
            }

            if (remainingDist > 0) {
                steps.push({
                    stepOrder: stepOrder++,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: remainingDist,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z2.low,
                    targetValueTwo: zones.Z2.high,
                    description: `${zones.Z2.name}區`
                });
            }
        } else {
            // Single continuous main block (no rest breaks mentioned)
            steps.push({
                stepOrder: stepOrder++,
                stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                endConditionValue: mainDist,
                targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                targetValueOne: zones.Z2.low,
                targetValueTwo: zones.Z2.high,
                secondaryTargetType: { workoutTargetTypeId: 3, workoutTargetTypeKey: 'cadence.zone' },
                secondaryTargetValueOne: 85,
                secondaryTargetValueTwo: 95,
                description: `${zones.Z2.name}區 有氧騎乘`
            });
        }

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDist,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '緩和 5km'
        });

    } else if (content.includes('恢復') || content.includes('輕鬆')) {
        // Recovery ride
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.1),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '輕鬆熱身'
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.8),
            targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
            targetValueOne: zones.Z1.low,
            targetValueTwo: zones.Z1.high,
            secondaryTargetType: { workoutTargetTypeId: 3, workoutTargetTypeKey: 'cadence.zone' },
            secondaryTargetValueOne: 85,
            secondaryTargetValueTwo: 100,
            description: `恢復騎 @ ${zones.Z1.name}區 - 保持高迴轉`
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.1),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '緩和'
        });

    } else if (ftpPercentMatch) {
        // FTP percentage based workout (Garmin TRI pattern)
        // Examples: "50%-60% FTP", "80% FTP", "70%-85% FTP"
        const lowPercent = parseInt(ftpPercentMatch[1]);
        const highPercent = ftpPercentMatch[2] ? parseInt(ftpPercentMatch[2]) : lowPercent + 10;
        const lowPower = Math.round(ftp * lowPercent / 100);
        const highPower = Math.round(ftp * highPercent / 100);

        // Extract cadence if specified
        const minCadence = cadenceMatch ? parseInt(cadenceMatch[1]) : 85;
        const maxCadence = cadenceMatch ? (cadenceMatch[2] ? parseInt(cadenceMatch[2]) : minCadence + 10) : 95;

        const warmupDist = Math.round(totalDistance * 0.1);
        const cooldownDist = Math.round(totalDistance * 0.1);
        const mainDist = totalDistance - warmupDist - cooldownDist;

        // Determine workout type based on intensity
        const avgPercent = (lowPercent + highPercent) / 2;
        let zoneDesc = '';
        if (avgPercent <= 60) zoneDesc = 'Z1-Z2 恢復/有氧';
        else if (avgPercent <= 75) zoneDesc = 'Z2 耐力';
        else if (avgPercent <= 90) zoneDesc = 'Z3 Tempo/Sweet Spot';
        else if (avgPercent <= 105) zoneDesc = 'Z4 閾值';
        else zoneDesc = 'Z5+ VO2max';

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: warmupDist,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '熱身 - 漸進提升至目標強度'
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: mainDist,
            targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
            targetValueOne: lowPower,
            targetValueTwo: highPower,
            secondaryTargetType: { workoutTargetTypeId: 3, workoutTargetTypeKey: 'cadence.zone' },
            secondaryTargetValueOne: minCadence,
            secondaryTargetValueTwo: maxCadence,
            description: `主課表 @ ${lowPercent}-${highPercent}% FTP (${lowPower}-${highPower}W) - ${zoneDesc}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDist,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '緩和'
        });

    } else {
        // Standard Z2 ride with some tempo
        const warmupDist = Math.round(totalDistance * 0.1);
        const cooldownDist = Math.round(totalDistance * 0.1);
        const mainDist = totalDistance - warmupDist - cooldownDist;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: warmupDist,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '熱身 - 漸進提升強度'
        });

        // Main Z2 with tempo surges
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(mainDist * 0.7),
            targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
            targetValueOne: zones.Z2.low,
            targetValueTwo: zones.Z2.high,
            secondaryTargetType: { workoutTargetTypeId: 3, workoutTargetTypeKey: 'cadence.zone' },
            secondaryTargetValueOne: 85,
            secondaryTargetValueTwo: 95,
            description: `${zones.Z2.name}區 有氧騎 @85-95rpm`
        });

        // Add some tempo work
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 3,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 180,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z3.low,
                    targetValueTwo: zones.Z3.high,
                    description: `${zones.Z3.name}區提升`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 120,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z2.low,
                    targetValueTwo: zones.Z2.high,
                    description: `恢復 @ Z2`
                }
            ],
            description: `3x3分鐘 ${zones.Z3.name}區`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDist,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: '緩和'
        });
    }

    return steps;
}

// ============================================
// Run Workout Generation
// ============================================

// Generate run workout steps
export function generateRunSteps(totalDistance, content) {
    const steps = [];
    let stepOrder = 1;
    const zones = getRunPaceZones();

    // Check for interval pattern like "8x1km" or "6x1.2km" or "10x400m"
    const intervalMatch = content.match(/(\d+)\s*[xX×]\s*([\d.]+)\s*(km|m)/i);
    // Check for brick workout (bike then run)
    const isBrick = content.includes('磚式') || content.includes('騎轉跑') || content.includes('轉換');
    // Garmin TRI patterns
    const isHillRepeat = content.includes('爬坡') || content.includes('上坡');
    const isLadder = content.match(/(\d+)\/(\d+)\/(\d+)/); // Pattern: 3/3/2/1km
    const isAerobic = content.includes('有氧跑') || content.includes('有氧');
    const isEasy = content.includes('慢跑') || content.includes('輕鬆跑');

    if (isLadder) {
        // Ladder intervals like "3/3/2/1km間歇"
        const distances = content.match(/[\d.]+/g).slice(0, 5).map(d => parseFloat(d) * 1000);

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `熱身慢跑 2km @ ${zones.easy.name}`
        });

        // Strides
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 3,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 100,
                    ...createPaceTarget(zones.rep.pace, zones.easy.pace),
                    description: '漸速跑激活'
                }
            ],
            description: '3x100m 漸速跑'
        });

        // Main ladder intervals - shorter distance = faster pace
        distances.forEach((dist, idx) => {
            if (dist > 0) {
                // Determine pace based on distance: shorter = faster
                let targetPace, paceDesc;
                if (dist >= 3000) {
                    // 3km+ → Threshold pace (T配速)
                    targetPace = createPaceTarget(zones.tempo.pace - 5, zones.tempo.pace + 10);
                    paceDesc = zones.tempo.name;
                } else if (dist >= 2000) {
                    // 2km → Interval pace (I配速)
                    targetPace = createPaceTarget(zones.interval.pace - 5, zones.interval.pace + 10);
                    paceDesc = zones.interval.name;
                } else if (dist >= 1000) {
                    // 1km → Fast interval pace
                    targetPace = createPaceTarget(zones.interval.pace - 15, zones.interval.pace);
                    paceDesc = `快速 ${zones.interval.name}`;
                } else {
                    // <1km → Rep pace (R配速)
                    targetPace = createPaceTarget(zones.rep.pace - 5, zones.rep.pace + 10);
                    paceDesc = zones.rep.name;
                }

                steps.push({
                    stepOrder: stepOrder++,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: dist,
                    ...targetPace,
                    description: `間歇 ${dist/1000}km @ ${paceDesc}`
                });
                // Recovery jog between intervals (except after last)
                if (idx < distances.length - 1) {
                    const restTime = dist >= 2000 ? 120 : dist >= 1000 ? 90 : 60;
                    steps.push({
                        stepOrder: stepOrder++,
                        stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                        endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                        endConditionValue: restTime,
                        ...createPaceTarget(zones.recovery.pace - 30, zones.recovery.pace + 60),
                        description: `恢復 ${restTime}秒`
                    });
                }
            }
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 1500,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `緩和慢跑 1.5km`
        });

    } else if (isHillRepeat) {
        // Hill repeat workout
        const reps = intervalMatch ? parseInt(intervalMatch[1]) : 6;
        const distance = intervalMatch ? parseFloat(intervalMatch[2]) * (intervalMatch[3] === 'km' ? 1000 : 1) : 400;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `熱身慢跑 2km @ ${zones.easy.name}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: reps,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: distance,
                    ...createPaceTarget(zones.interval.pace - 15, zones.interval.pace + 5),
                    description: `上坡衝刺 ${distance}m @ ${zones.interval.name}`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: distance,
                    ...createPaceTarget(zones.recovery.pace - 30, zones.recovery.pace + 60),
                    description: `下坡慢跑恢復 ${distance}m`
                }
            ],
            description: `${reps}x${distance}m 爬坡訓練`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `緩和慢跑 2km`
        });

    } else if (intervalMatch) {
        const reps = parseInt(intervalMatch[1]);
        const distanceValue = parseFloat(intervalMatch[2]);
        const unit = intervalMatch[3].toLowerCase();
        const intervalDistance = unit === 'km' ? distanceValue * 1000 : distanceValue;
        const restTime = intervalDistance >= 1000 ? 90 : intervalDistance >= 400 ? 60 : 45;

        // Warmup
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `熱身慢跑 2km @ ${zones.easy.name}`
        });

        // Strides/activation
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 4,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 100,
                    ...createPaceTarget(zones.rep.pace, zones.easy.pace),
                    description: '漸速跑 100m (由慢到快)'
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 100,
                    ...createPaceTarget(zones.recovery.pace - 30, zones.recovery.pace + 30),
                    description: '慢走恢復 100m'
                }
            ],
            description: '4x100m 漸速跑激活'
        });

        // Main intervals
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: reps,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: intervalDistance,
                    ...createPaceTarget(zones.interval.pace - 10, zones.interval.pace + 10),
                    description: `間歇 ${intervalDistance >= 1000 ? (intervalDistance/1000) + 'km' : intervalDistance + 'm'} @ ${zones.interval.name}`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: restTime,
                    ...createPaceTarget(zones.recovery.pace - 30, zones.recovery.pace + 60),
                    description: `休息 ${restTime}秒 (慢跑或站立)`
                }
            ],
            description: `${reps}x${intervalDistance >= 1000 ? (intervalDistance/1000) + 'km' : intervalDistance + 'm'} @ ${zones.interval.name}`
        });

        // Cooldown
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `緩和慢跑 2km @ ${zones.recovery.name}`
        });

    } else if (content.includes('節奏跑') || content.includes('T配速') || content.includes('閾值')) {
        // Tempo run
        const tempoDistance = totalDistance >= 10000 ? 6000 : Math.round((totalDistance - 4000) * 0.8);

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `熱身 2km @ ${zones.easy.name}`
        });

        // Drills
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 3,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 100,
                    ...createPaceTarget(zones.rep.pace, zones.easy.pace),
                    description: '漸速跑激活'
                }
            ],
            description: '3x100m 漸速跑'
        });

        // Tempo main set
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: tempoDistance,
            ...createPaceTarget(zones.tempo.pace - 5, zones.tempo.pace + 10),
            description: `節奏跑 ${tempoDistance/1000}km @ ${zones.tempo.name}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: totalDistance - tempoDistance - 2300,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `緩和跑 @ ${zones.recovery.name}`
        });

    } else if (content.includes('長跑') || totalDistance >= 15000) {
        // Long run
        const warmupDist = 2000;
        const cooldownDist = 1000;
        const mainDist = totalDistance - warmupDist - cooldownDist;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: warmupDist,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 30),
            description: `熱身 2km - 漸進提升至長跑配速`
        });

        // Progressive long run blocks
        const firstHalf = Math.round(mainDist * 0.6);
        const secondHalf = mainDist - firstHalf;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: firstHalf,
            ...createPaceTarget(zones.long.pace - 10, zones.long.pace + 15),
            description: `前半段 ${(firstHalf/1000).toFixed(1)}km @ ${zones.long.name}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: secondHalf,
            ...createPaceTarget(zones.marathon.pace - 10, zones.marathon.pace + 10),
            description: `後半段 ${(secondHalf/1000).toFixed(1)}km @ ${zones.marathon.name}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDist,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `緩和 1km`
        });

    } else if (isBrick) {
        // Brick run (off the bike)
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
            endConditionValue: 300,
            ...createPaceTarget(zones.long.pace, zones.long.pace + 30),
            description: `騎轉跑過渡期 5分鐘 - 適應腿部感覺`
        });

        // Main brick run
        const firstKm = 1000;
        const mainPart = totalDistance - firstKm - 1000;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: firstKm,
            ...createPaceTarget(zones.long.pace, zones.long.pace + 20),
            description: `第1km 保守起步 @ ${zones.long.name}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: mainPart,
            ...createPaceTarget(zones.marathon.pace - 10, zones.marathon.pace + 10),
            description: `主課表 @ ${zones.marathon.name}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 1000,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: '緩和跑 1km'
        });

    } else if (content.includes('恢復') || content.includes('輕鬆')) {
        // Recovery run
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 1000,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: '輕鬆熱身 1km'
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: totalDistance - 2000,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `恢復跑 @ ${zones.recovery.name} - 保持輕鬆對話配速`
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 1000,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 45),
            description: '緩和 1km'
        });

    } else {
        // Standard easy run with strides
        const warmupDist = Math.min(Math.round(totalDistance * 0.15), 1500);
        const cooldownDist = Math.min(Math.round(totalDistance * 0.1), 1000);
        const mainDist = totalDistance - warmupDist - cooldownDist - 400;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: warmupDist,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `熱身 ${(warmupDist/1000).toFixed(1)}km @ ${zones.easy.name}`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: mainDist,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `輕鬆跑 ${(mainDist/1000).toFixed(1)}km @ ${zones.easy.name}`
        });

        // Add strides at the end
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 6, stepTypeKey: 'repeat' },
            numberOfIterations: 4,
            workoutSteps: [
                {
                    stepOrder: 1,
                    stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
                    endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                    endConditionValue: 100,
                    ...createPaceTarget(zones.rep.pace, zones.easy.pace),
                    description: '漸速跑 100m (提升步頻)'
                }
            ],
            description: '4x100m 漸速跑 (保持跑姿)'
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDist,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `緩和 ${(cooldownDist/1000).toFixed(1)}km`
        });
    }

    return steps;
}

// ============================================
// Workout Builder - Main Entry Point
// ============================================

// Build all workouts for a training day (swim, bike, run)
export function buildWorkoutsForDay(day, dayIndex, trainingData) {
    const workouts = [];
    const dateObj = new Date(day.date);
    const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

    const sportTypes = {
        swim: { sportTypeId: 4, sportTypeKey: 'swimming' },  // was 5 (strength_training)
        bike: { sportTypeId: 2, sportTypeKey: 'cycling' },
        run: { sportTypeId: 1, sportTypeKey: 'running' }
    };

    // Swim workout
    if (day.swim && parseFloat(day.swim) > 0) {
        resetStepIdCounter();
        const swimDistance = parseFloat(day.swim) * 1000;
        const rawSteps = generateSwimSteps(swimDistance, day.content);
        // Estimate duration: base CSS pace (2:30/100m) + 10% for warmup/cooldown at recovery pace + rest intervals
        // Formula: (distance / 100) * 150 seconds * 1.1 = distance * 1.65
        const estimatedSwimDuration = Math.round(swimDistance * 2.5 / 100 * 60 * 1.1);
        workouts.push({
            type: 'swim',
            data: {
                workoutId: null,
                ownerId: null,
                workoutName: `Day ${dayIndex + 1} 游泳 - ${day.phase}`,
                description: buildWorkoutDescription(day, 'swim'),
                sportType: sportTypes.swim,
                workoutSegments: [{
                    segmentOrder: 1,
                    sportType: sportTypes.swim,
                    workoutSteps: rawSteps.map(step => formatStep(step))
                }],
                estimatedDurationInSecs: estimatedSwimDuration,
                estimatedDistanceInMeters: swimDistance,
                poolLength: 25,
                poolLengthUnit: { unitId: 1, unitKey: 'meter' },
                scheduledDate: dateStr
            }
        });
    }

    // Bike workout
    if (day.bike && parseFloat(day.bike) > 0) {
        resetStepIdCounter();
        const bikeDistance = parseFloat(day.bike) * 1000;
        const rawSteps = generateBikeSteps(bikeDistance, day.content);
        workouts.push({
            type: 'bike',
            data: {
                workoutId: null,
                ownerId: null,
                workoutName: `Day ${dayIndex + 1} 自行車 - ${day.phase}`,
                description: buildWorkoutDescription(day, 'bike'),
                sportType: sportTypes.bike,
                workoutSegments: [{
                    segmentOrder: 1,
                    sportType: sportTypes.bike,
                    workoutSteps: rawSteps.map(step => formatStep(step))
                }],
                estimatedDurationInSecs: Math.round(bikeDistance / 1000 / 30 * 3600),
                estimatedDistanceInMeters: bikeDistance,
                scheduledDate: dateStr
            }
        });
    }

    // Run workout
    if (day.run && parseFloat(day.run) > 0) {
        resetStepIdCounter();
        const runDistance = parseFloat(day.run) * 1000;
        const rawSteps = generateRunSteps(runDistance, day.content);
        workouts.push({
            type: 'run',
            data: {
                workoutId: null,
                ownerId: null,
                workoutName: `Day ${dayIndex + 1} 跑步 - ${day.phase}`,
                description: buildWorkoutDescription(day, 'run'),
                sportType: sportTypes.run,
                workoutSegments: [{
                    segmentOrder: 1,
                    sportType: sportTypes.run,
                    workoutSteps: rawSteps.map(step => formatStep(step))
                }],
                estimatedDurationInSecs: Math.round(runDistance / 1000 * 6 * 60),
                estimatedDistanceInMeters: runDistance,
                scheduledDate: dateStr
            }
        });
    }

    return workouts;
}

// Convert training day to Garmin workout format
export function convertToGarminWorkout(training, index, overrideDate = null) {
    if (!training || training.intensity === '休息' || training.hours === 0) {
        return [];
    }

    // Use override date if provided
    const dateToUse = overrideDate || training.date;
    const modifiedTraining = { ...training, date: dateToUse };

    return buildWorkoutsForDay(modifiedTraining, index, null);
}
