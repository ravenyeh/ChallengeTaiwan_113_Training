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

// Format step for Garmin API
export function formatStep(step) {
    const formatted = {
        stepId: getNextStepId(),
        stepOrder: step.stepOrder,
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

    // Handle repeat groups
    if (step.stepType?.stepTypeKey === 'repeat' && step.workoutSteps) {
        formatted.repeatGroupType = 'repeat';
        formatted.numberOfIterations = step.numberOfIterations || 2;
        formatted.workoutSteps = step.workoutSteps.map(s => formatStep(s));
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
    const hasTechnique = content.includes('技術') || content.includes('划手');
    const hasDrill = content.includes('踢水') || content.includes('分解');

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
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 15),
            description: `輕鬆游熱身 @ ${zones.recovery.name}`
        });

        // Drill set if technique day
        if (hasTechnique || hasDrill) {
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
                        ...createSwimPaceTarget(zones.technique.pace - 10, zones.technique.pace + 15),
                        description: `${zones.technique.name}練習 (划手/踢水)`
                    },
                    {
                        stepOrder: 2,
                        stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                        endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                        endConditionValue: 15,
                        targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                    }
                ],
                description: '4x50m 技術分解練習'
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
                    description: '漸速游 (由慢到快)'
                }
            ],
            description: '4x25m 漸速游'
        });

        // Main set: Interval repeat
        const restTime = distance >= 400 ? 45 : distance >= 200 ? 30 : 20;
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
                    ...createSwimPaceTarget(zones.threshold.pace - 5, zones.threshold.pace + 5),
                    description: `主課表 ${distance}m @ ${zones.threshold.name}`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: restTime,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: `${reps}x${distance}m 主課表 @ ${zones.threshold.name} (休息${restTime}秒)`
        });

        // Cooldown
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDistance,
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 20),
            description: `緩和游 @ ${zones.recovery.name}`
        });

    } else if (content.includes('技術課') || content.includes('技術訓練')) {
        // Technical/Drill focused session
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 300,
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 15),
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
                    ...createSwimPaceTarget(zones.technique.pace - 10, zones.technique.pace + 20),
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
                    ...createSwimPaceTarget(zones.technique.pace - 10, zones.technique.pace + 15),
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
                    ...createSwimPaceTarget(zones.aerobic.pace - 5, zones.aerobic.pace + 10),
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
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 20),
            description: `緩和游 @ ${zones.recovery.name}`
        });

    } else if (content.includes('恢復') || content.includes('輕鬆')) {
        // Recovery swim
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 200,
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 20),
            description: `輕鬆游熱身 @ ${zones.recovery.name}`
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: totalDistance - 400,
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 20),
            description: `${zones.recovery.name} - 保持輕鬆划頻`
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 200,
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 25),
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
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 15),
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
                    ...createSwimPaceTarget(zones.aerobic.pace - 5, zones.aerobic.pace + 10),
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
            ...createSwimPaceTarget(zones.recovery.pace - 10, zones.recovery.pace + 20),
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

    if (ssMatch || content.includes('Sweet Spot')) {
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

        // Main aerobic blocks
        const blockDistance = 20000;
        const blocks = Math.floor(mainDist / blockDistance);

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
        }

        // Remaining distance
        const remainingDist = mainDist - (blocks * blockDistance);
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
    const isBrick = content.includes('磚式') || content.includes('騎轉跑');

    if (intervalMatch) {
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
        swim: { sportTypeId: 4, sportTypeKey: 'swimming_pool' },
        bike: { sportTypeId: 2, sportTypeKey: 'cycling' },
        run: { sportTypeId: 1, sportTypeKey: 'running' }
    };

    // Swim workout
    if (day.swim && parseFloat(day.swim) > 0) {
        resetStepIdCounter();
        const swimDistance = parseFloat(day.swim) * 1000;
        const rawSteps = generateSwimSteps(swimDistance, day.content);
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
                estimatedDurationInSecs: Math.round(swimDistance * 2.5 / 100 * 60),
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
