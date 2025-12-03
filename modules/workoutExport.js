// Workout export functionality for JSON/ZWO/ERG formats

import { escapeXml, getEnglishFilename, downloadFile } from './utils.js';
import { getUserFTP } from './settings.js';

// ============================================
// JSON Export
// ============================================

// Download workout as JSON file
export function downloadWorkoutJson(idx, filename) {
    const input = document.getElementById(`workout-json-${idx}`);
    const json = JSON.stringify(JSON.parse(input.value), null, 2);
    downloadFile(json, `${getEnglishFilename(filename)}.json`, 'application/json');
}

// ============================================
// ZWO Export (Zwift format)
// ============================================

// Convert Garmin step to ZWO format
function convertStepToZwo(step, ftp) {
    // Handle repeat steps
    if (step.repeatGroupType === 'repeat' && step.workoutSteps) {
        let repeatContent = `        <IntervalsT Repeat="${step.numberOfIterations || 2}">\n`;
        step.workoutSteps.forEach(subStep => {
            repeatContent += convertStepToZwoElement(subStep, ftp, '            ');
        });
        repeatContent += `        </IntervalsT>\n`;
        return repeatContent;
    }

    return convertStepToZwoElement(step, ftp, '        ');
}

// Convert single step to ZWO element
function convertStepToZwoElement(step, ftp, indent) {
    const duration = step.endConditionValue || 300; // seconds
    const powerLow = step.targetValueOne ? (step.targetValueOne / ftp) : 0.5;
    const powerHigh = step.targetValueTwo ? (step.targetValueTwo / ftp) : powerLow;

    const stepType = step.stepType?.workoutStepTypeKey || step.stepType?.stepTypeKey || 'interval';

    if (stepType === 'warmup') {
        return `${indent}<Warmup Duration="${duration}" PowerLow="${powerLow.toFixed(2)}" PowerHigh="${powerHigh.toFixed(2)}"/>\n`;
    } else if (stepType === 'cooldown') {
        return `${indent}<Cooldown Duration="${duration}" PowerLow="${powerHigh.toFixed(2)}" PowerHigh="${powerLow.toFixed(2)}"/>\n`;
    } else if (stepType === 'recovery' || stepType === 'rest') {
        return `${indent}<SteadyState Duration="${duration}" Power="${powerLow.toFixed(2)}"/>\n`;
    } else {
        // interval or other
        if (Math.abs(powerLow - powerHigh) < 0.01) {
            return `${indent}<SteadyState Duration="${duration}" Power="${powerLow.toFixed(2)}"/>\n`;
        } else {
            return `${indent}<SteadyState Duration="${duration}" Power="${((powerLow + powerHigh) / 2).toFixed(2)}"/>\n`;
        }
    }
}

// Download workout as ZWO file (Zwift format)
export function downloadWorkoutZwo(idx, filename) {
    const input = document.getElementById(`workout-json-${idx}`);
    const workout = JSON.parse(input.value);
    const ftp = getUserFTP() || 190;

    let zwoContent = `<workout_file>
    <author>Challenge Taiwan Training</author>
    <name>${escapeXml(workout.workoutName)}</name>
    <description>${escapeXml(workout.description || '')}</description>
    <sportType>bike</sportType>
    <workout>
`;

    // Process workout steps
    if (workout.workoutSegments) {
        workout.workoutSegments.forEach(segment => {
            if (segment.workoutSteps) {
                segment.workoutSteps.forEach(step => {
                    zwoContent += convertStepToZwo(step, ftp);
                });
            }
        });
    }

    zwoContent += `    </workout>
</workout_file>`;

    downloadFile(zwoContent, `${getEnglishFilename(filename)}.zwo`, 'application/xml');
}

// ============================================
// ERG Export (MRC/ERG format for trainers)
// ============================================

// Convert Garmin step to ERG format
function convertStepToErg(step, ftp, startTime) {
    let content = '';
    let currentTime = startTime;

    // Handle repeat steps
    if (step.repeatGroupType === 'repeat' && step.workoutSteps) {
        const iterations = step.numberOfIterations || 2;
        for (let i = 0; i < iterations; i++) {
            step.workoutSteps.forEach(subStep => {
                const result = convertStepToErgElement(subStep, ftp, currentTime);
                content += result.content;
                currentTime = result.endTime;
            });
        }
        return { content, endTime: currentTime };
    }

    return convertStepToErgElement(step, ftp, currentTime);
}

// Convert single step to ERG element
function convertStepToErgElement(step, ftp, startTime) {
    const durationSecs = step.endConditionValue || 300;
    const durationMins = durationSecs / 60;
    const endTime = startTime + durationMins;

    const powerLow = step.targetValueOne || (ftp * 0.5);
    const powerHigh = step.targetValueTwo || powerLow;
    const percentLow = Math.round((powerLow / ftp) * 100);
    const percentHigh = Math.round((powerHigh / ftp) * 100);

    const stepType = step.stepType?.workoutStepTypeKey || step.stepType?.stepTypeKey || 'interval';

    let content = '';
    if (stepType === 'warmup') {
        // Ramp up
        content = `${startTime.toFixed(2)}\t${percentLow}\n${endTime.toFixed(2)}\t${percentHigh}\n`;
    } else if (stepType === 'cooldown') {
        // Ramp down
        content = `${startTime.toFixed(2)}\t${percentHigh}\n${endTime.toFixed(2)}\t${percentLow}\n`;
    } else {
        // Steady state (use average if range)
        const avgPercent = Math.round((percentLow + percentHigh) / 2);
        content = `${startTime.toFixed(2)}\t${avgPercent}\n${endTime.toFixed(2)}\t${avgPercent}\n`;
    }

    return { content, endTime };
}

// Download workout as ERG file (MRC/ERG format for trainers)
export function downloadWorkoutErg(idx, filename) {
    const input = document.getElementById(`workout-json-${idx}`);
    const workout = JSON.parse(input.value);
    const ftp = getUserFTP() || 190;

    let ergContent = `[COURSE HEADER]
VERSION = 2
UNITS = ENGLISH
DESCRIPTION = ${workout.description || workout.workoutName}
FILE NAME = ${filename}
FTP = ${ftp}
MINUTES PERCENTAGE
[END COURSE HEADER]
[COURSE DATA]
`;

    let currentTime = 0; // in minutes

    // Process workout steps
    if (workout.workoutSegments) {
        workout.workoutSegments.forEach(segment => {
            if (segment.workoutSteps) {
                segment.workoutSteps.forEach(step => {
                    const result = convertStepToErg(step, ftp, currentTime);
                    ergContent += result.content;
                    currentTime = result.endTime;
                });
            }
        });
    }

    ergContent += `[END COURSE DATA]`;

    downloadFile(ergContent, `${getEnglishFilename(filename)}.erg`, 'text/plain');
}
