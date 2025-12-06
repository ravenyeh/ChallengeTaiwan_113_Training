// Workout Notes - Detailed training descriptions with zones, RPE, and training purpose
// 訓練說明 - 包含區間、體感強度(RPE)和訓練目的的詳細描述

import { getUserFTP, getUserRunPace, getUserSwimCSS } from './settings.js';
import { parsePaceToSeconds, formatSecondsToPace } from './utils.js';

// ============================================
// Zone Descriptions (區間說明)
// ============================================

// Bike Power Zones with full descriptions
export function getBikeZoneDescriptions() {
    const ftp = getUserFTP() || 200;
    return {
        Z1: {
            name: '恢復區 (Recovery)',
            powerRange: `${Math.round(ftp * 0.45)}-${Math.round(ftp * 0.55)}W`,
            ftpPercent: '45-55%',
            hrPercent: '60-70%',
            rpe: '1-3',
            feel: '非常輕鬆，可以輕鬆聊天'
        },
        Z2: {
            name: '耐力區 (Endurance)',
            powerRange: `${Math.round(ftp * 0.55)}-${Math.round(ftp * 0.75)}W`,
            ftpPercent: '55-75%',
            hrPercent: '65-80%',
            rpe: '3-4',
            feel: '舒適的有氧運動，可以說話但不能唱歌'
        },
        highZ1lowZ2: {
            name: '高Z1/低Z2',
            powerRange: `${Math.round(ftp * 0.50)}-${Math.round(ftp * 0.60)}W`,
            ftpPercent: '50-60%',
            hrPercent: '65-75%',
            rpe: '~3',
            feel: '輕鬆有氧，可以持續交談'
        },
        Z3: {
            name: '節奏區 (Tempo)',
            powerRange: `${Math.round(ftp * 0.75)}-${Math.round(ftp * 0.90)}W`,
            ftpPercent: '75-90%',
            hrPercent: '80-90%',
            rpe: '5-6',
            feel: '中等強度，說話開始有點困難'
        },
        highZ3: {
            name: '高Z3區',
            powerRange: `${Math.round(ftp * 0.85)}-${Math.round(ftp * 0.90)}W`,
            ftpPercent: '85-90%',
            hrPercent: '80-85%',
            rpe: '~6',
            feel: '有明顯的運動感，呼吸加快'
        },
        SS: {
            name: 'Sweet Spot',
            powerRange: `${Math.round(ftp * 0.88)}-${Math.round(ftp * 0.94)}W`,
            ftpPercent: '88-94%',
            hrPercent: '85-92%',
            rpe: '6-7',
            feel: '舒適的困難，可持續但需要專注'
        },
        Z4: {
            name: '閾值區 (Threshold)',
            powerRange: `${Math.round(ftp * 0.90)}-${Math.round(ftp * 1.05)}W`,
            ftpPercent: '90-105%',
            hrPercent: '88-95%',
            rpe: '7-8',
            feel: '困難，只能說簡短的句子'
        },
        Z5: {
            name: 'VO2max區',
            powerRange: `${Math.round(ftp * 1.05)}-${Math.round(ftp * 1.20)}W`,
            ftpPercent: '105-120%',
            hrPercent: '95-100%',
            rpe: '8-9',
            feel: '非常困難，無法說話，心率接近最大'
        },
        midHighZ5: {
            name: '中高Z5區',
            powerRange: `${Math.round(ftp * 1.10)}-${Math.round(ftp * 1.20)}W`,
            ftpPercent: '110-120%',
            hrPercent: '無關',
            rpe: '8-9',
            feel: '接近全力，非常困難'
        },
        Z6: {
            name: '無氧區 (Anaerobic)',
            powerRange: `${Math.round(ftp * 1.20)}-${Math.round(ftp * 1.50)}W`,
            ftpPercent: '120-150%',
            hrPercent: '無關',
            rpe: '9-10',
            feel: '全力衝刺，無法持續超過2分鐘'
        }
    };
}

// Run Pace Zones with full descriptions
export function getRunZoneDescriptions() {
    const userRunPace = getUserRunPace();
    const marathonPaceSeconds = userRunPace ? parsePaceToSeconds(userRunPace) : 360;

    return {
        recovery: {
            name: '恢復跑 (Recovery)',
            pace: formatSecondsToPace(Math.round(marathonPaceSeconds * 1.25)),
            pacePercent: '+25%',
            hrPercent: '60-70%',
            rpe: '1-3',
            feel: '非常輕鬆，可以完整聊天'
        },
        easy: {
            name: '輕鬆跑 (Easy)',
            pace: formatSecondsToPace(Math.round(marathonPaceSeconds * 1.15)),
            pacePercent: '+15%',
            hrPercent: '65-75%',
            rpe: '3-4',
            feel: '舒適的步伐，可以說話'
        },
        long: {
            name: '長跑配速 (Long Run)',
            pace: formatSecondsToPace(Math.round(marathonPaceSeconds * 1.10)),
            pacePercent: '+10%',
            hrPercent: '70-80%',
            rpe: '4-5',
            feel: '可持續的配速，稍有運動感'
        },
        marathon: {
            name: '馬拉松配速 (Marathon Pace)',
            pace: formatSecondsToPace(marathonPaceSeconds),
            pacePercent: '100%',
            hrPercent: '80-88%',
            rpe: '5-6',
            feel: '比賽配速，專注但可持續'
        },
        tempo: {
            name: '節奏跑 (Tempo)',
            pace: formatSecondsToPace(Math.round(marathonPaceSeconds * 0.95)),
            pacePercent: '-5%',
            hrPercent: '85-90%',
            rpe: '6-7',
            feel: '舒適的困難，呼吸加快'
        },
        threshold: {
            name: '閾值跑 (Threshold)',
            pace: formatSecondsToPace(Math.round(marathonPaceSeconds * 0.90)),
            pacePercent: '-10%',
            hrPercent: '88-92%',
            rpe: '7-8',
            feel: '困難，只能說短句'
        },
        interval: {
            name: '間歇配速 (Interval)',
            pace: formatSecondsToPace(Math.round(marathonPaceSeconds * 0.85)),
            pacePercent: '-15%',
            hrPercent: '92-98%',
            rpe: '8-9',
            feel: '非常困難，專注於維持配速'
        },
        rep: {
            name: '重複跑 (Repetition)',
            pace: formatSecondsToPace(Math.round(marathonPaceSeconds * 0.80)),
            pacePercent: '-20%',
            hrPercent: '95-100%',
            rpe: '9-10',
            feel: '接近全力，無法持續'
        }
    };
}

// Swim Pace Zones with full descriptions
export function getSwimZoneDescriptions() {
    const userSwimCSS = getUserSwimCSS();
    const cssSeconds = userSwimCSS ? parsePaceToSeconds(userSwimCSS) : 120;

    return {
        recovery: {
            name: '恢復游 (Recovery)',
            pace: formatSecondsToPace(Math.round(cssSeconds * 1.20)) + '/100m',
            pacePercent: '+20%',
            rpe: '1-3',
            feel: '非常輕鬆，專注於姿勢'
        },
        technique: {
            name: '技術課 (Technique)',
            pace: formatSecondsToPace(Math.round(cssSeconds * 1.15)) + '/100m',
            pacePercent: '+15%',
            rpe: '3-4',
            feel: '輕鬆，專注於技術細節'
        },
        aerobic: {
            name: '有氧游 (Aerobic)',
            pace: formatSecondsToPace(Math.round(cssSeconds * 1.05)) + '/100m',
            pacePercent: '+5%',
            rpe: '4-5',
            feel: '舒適的有氧運動'
        },
        threshold: {
            name: 'CSS配速 (Threshold)',
            pace: formatSecondsToPace(cssSeconds) + '/100m',
            pacePercent: '100%',
            rpe: '6-7',
            feel: '臨界游速，需要專注維持'
        },
        interval: {
            name: '間歇配速 (Interval)',
            pace: formatSecondsToPace(Math.round(cssSeconds * 0.95)) + '/100m',
            pacePercent: '-5%',
            rpe: '7-8',
            feel: '困難，專注於維持配速'
        },
        sprint: {
            name: '衝刺 (Sprint)',
            pace: formatSecondsToPace(Math.round(cssSeconds * 0.90)) + '/100m',
            pacePercent: '-10%',
            rpe: '9-10',
            feel: '全力，無法持續長距離'
        }
    };
}

// ============================================
// Workout Notes Templates (訓練說明模板)
// ============================================

// Generate bike workout notes based on workout type
export function generateBikeWorkoutNotes(content, type, intensity) {
    const zones = getBikeZoneDescriptions();
    const ftp = getUserFTP() || 200;

    let notes = {
        purpose: '',
        warmup: '',
        mainSet: '',
        cooldown: '',
        intensityGuidance: '',
        rpeGuidance: ''
    };

    // Default warmup for bike workouts
    notes.warmup = `**熱身 (Warm-up):**
- 5分鐘 @ Z1 (${zones.Z1.powerRange}, ${zones.Z1.hrPercent} HRmax, RPE ${zones.Z1.rpe})
- 5-10分鐘 @ 高Z1/低Z2 (${zones.highZ1lowZ2.powerRange}, ${zones.highZ1lowZ2.hrPercent} HRmax, RPE ${zones.highZ1lowZ2.rpe})
- 3分鐘 @ 高Z3 (${zones.highZ3.powerRange}, ${zones.highZ3.hrPercent} HRmax, RPE ${zones.highZ3.rpe})
- 3 × 30秒 @ 中高Z5 (${zones.midHighZ5.powerRange}, RPE ${zones.midHighZ5.rpe}) / 1.5分鐘恢復 @ ${Math.round(ftp * 0.30)}-${Math.round(ftp * 0.50)}W`;

    // Default cooldown
    notes.cooldown = `**緩和 (Cool-down):**
- 以 高Z1/低Z2 (${zones.highZ1lowZ2.powerRange}, RPE ${zones.highZ1lowZ2.rpe}) 結束剩餘的騎乘時間`;

    // Determine workout type and generate appropriate notes
    if (content.includes('Sweet Spot') || content.includes('sweet spot')) {
        notes.purpose = `**訓練目的：**
Sweet Spot 訓練是提升有氧閾值最有效的方式。在 FTP 的 88-94% 之間訓練，可以獲得接近閾值訓練的效益，但恢復時間更短。這種訓練能有效提升你的耐力和持續輸出功率的能力。`;

        notes.mainSet = `**主課表 (Main Set):**
Sweet Spot 間歇 @ ${zones.SS.powerRange} (${zones.SS.ftpPercent} FTP, RPE ${zones.SS.rpe})
- 體感：${zones.SS.feel}
- 心率會逐漸上升到 ${zones.SS.hrPercent} HRmax
- 組間休息以 Z2 (${zones.Z2.powerRange}) 進行恢復`;

        notes.intensityGuidance = `**強度指引：**
- 每組 Sweet Spot 應該感覺是「舒適的困難」
- 如果無法完成預定的組數，降低功率 5-10W
- 最後一組應該和第一組一樣穩定
- 踏頻維持在 85-95 RPM`;

    } else if (content.includes('間歇') || content.includes('interval') || type.includes('間歇')) {
        notes.purpose = `**訓練目的：**
間歇訓練是提升 VO2max 和無氧能力的關鍵。透過高強度的短時間努力配合恢復，能有效提升你的最大攝氧量和高強度耐受力。`;

        notes.mainSet = `**主課表 (Main Set):**
高強度間歇 @ ${zones.Z5.powerRange} (${zones.Z5.ftpPercent} FTP, RPE ${zones.Z5.rpe})
- 體感：${zones.Z5.feel}
- 恢復段 @ Z2 (${zones.Z2.powerRange}, RPE ${zones.Z2.rpe})`;

        notes.intensityGuidance = `**強度指引：**
- 每組間歇應該非常具有挑戰性，但不至於無法完成
- 配速策略：前幾組保守，後面可以稍微加速
- 如果功率明顯下滑（>10%），延長恢復時間
- 維持穩定的踏頻 90-100 RPM`;

    } else if (content.includes('長距離') || content.includes('Long') || type.includes('長距離')) {
        notes.purpose = `**訓練目的：**
長距離有氧騎乘是建立耐力基礎的核心訓練。在 Z2 區間進行長時間的穩定輸出，能提升脂肪代謝能力、心血管效率和肌肉耐力。`;

        notes.mainSet = `**主課表 (Main Set):**
長距離有氧騎乘 @ ${zones.Z2.powerRange} (${zones.Z2.ftpPercent} FTP, RPE ${zones.Z2.rpe})
- 體感：${zones.Z2.feel}
- 心率維持在 ${zones.Z2.hrPercent} HRmax
- 踏頻 80-90 RPM`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定的功率輸出，避免大幅波動
- 不要因為感覺良好而加速
- 專注於營養補給策略（每小時 60-90g 碳水化合物）
- 練習比賽日的補給計劃`;

    } else if (content.includes('輕鬆騎') || content.includes('輕鬆恢復') || type.includes('輕鬆恢復')) {
        notes.purpose = `**訓練目的：**
恢復騎乘能促進血液循環，加速乳酸代謝和肌肉修復。保持低強度是關鍵，這不是訓練日，而是幫助你為下一次高強度訓練做準備。`;

        notes.warmup = '';
        notes.mainSet = `**訓練內容：**
輕鬆有氧騎乘 @ ${zones.Z1.powerRange} 到 ${zones.Z2.powerRange}
- 體感：${zones.Z1.feel}
- 心率維持在 ${zones.Z1.hrPercent} HRmax
- RPE ${zones.Z1.rpe}-${zones.Z2.rpe}`;

        notes.intensityGuidance = `**強度指引：**
- 這是恢復日，不要追求表現
- 如果腿部感覺沉重，更應該降低強度
- 專注於放鬆和穩定的踏頻
- 可以利用這個時間練習騎乘姿勢`;
        notes.cooldown = '';

    } else if (content.includes('磚式訓練') || content.includes('Brick')) {
        notes.purpose = `**訓練目的：**
磚式訓練模擬比賽中從自行車轉換到跑步的過程。訓練你的身體適應「磚塊腿」的感覺，並學習在疲勞狀態下維持跑步配速。`;

        notes.mainSet = `**主課表 (Main Set):**
自行車段 @ ${zones.Z2.powerRange} (${zones.Z2.ftpPercent} FTP, RPE ${zones.Z2.rpe})
- 最後 10 分鐘可提升至 Z3 (${zones.Z3.powerRange}) 模擬比賽節奏
- 快速轉換到跑步（練習 T2 轉換）
- 跑步段以比賽配速開始`;

        notes.intensityGuidance = `**強度指引：**
- 轉換時間目標 < 2 分鐘
- 跑步前 1-2 公里會感覺不協調，這是正常的
- 專注於維持步頻，配速會自然跟上
- 練習營養補給和轉換流程`;

    } else if (content.includes('FTP') || content.includes('閾值')) {
        notes.purpose = `**訓練目的：**
閾值訓練提升你的功能性閾值功率 (FTP)。在接近閾值的強度下進行持續努力，能有效提升有氧能力和耐乳酸能力。`;

        notes.mainSet = `**主課表 (Main Set):**
閾值間歇 @ ${zones.Z4.powerRange} (${zones.Z4.ftpPercent} FTP, RPE ${zones.Z4.rpe})
- 體感：${zones.Z4.feel}
- 心率會上升到 ${zones.Z4.hrPercent} HRmax`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定的功率，避免起伏
- 呼吸應該困難但可控制
- 如果無法維持功率，這表示需要更多恢復`;

    } else {
        // Default bike workout notes
        notes.purpose = `**訓練目的：**
建立穩定的有氧基礎，提升心血管效率和脂肪代謝能力。`;

        notes.mainSet = `**主課表：**
有氧騎乘 @ ${zones.Z2.powerRange} (${zones.Z2.ftpPercent} FTP)
- 體感：${zones.Z2.feel}
- RPE ${zones.Z2.rpe}`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定輸出
- 踏頻 80-95 RPM`;
    }

    notes.rpeGuidance = `**RPE 體感對照：**
- RPE 1-3：非常輕鬆，可以輕鬆聊天
- RPE 4-5：舒適，可以說話但不能唱歌
- RPE 6-7：有點困難，呼吸加快
- RPE 8-9：非常困難，只能說簡短的詞
- RPE 10：全力以赴，無法說話`;

    return notes;
}

// Generate run workout notes based on workout type
export function generateRunWorkoutNotes(content, type, intensity) {
    const zones = getRunZoneDescriptions();

    let notes = {
        purpose: '',
        warmup: '',
        mainSet: '',
        cooldown: '',
        intensityGuidance: '',
        rpeGuidance: ''
    };

    // Default warmup for run workouts
    notes.warmup = `**熱身 (Warm-up):**
- 10分鐘 @ 恢復跑配速 (${zones.recovery.pace}, RPE ${zones.recovery.rpe})
- 動態伸展 5分鐘
- 4 × 100m 漸速跑 (從輕鬆跑加速到節奏跑)`;

    // Default cooldown
    notes.cooldown = `**緩和 (Cool-down):**
- 10分鐘 @ 輕鬆跑配速 (${zones.easy.pace}, RPE ${zones.easy.rpe})
- 靜態伸展 5-10分鐘`;

    if (content.includes('長跑') || content.includes('Long') || type.includes('長距離')) {
        notes.purpose = `**訓練目的：**
長跑是建立跑步耐力的基礎。在舒適的配速下進行長時間跑步，能提升脂肪代謝效率、肌肉耐力和心血管系統。這也是練習比賽日營養補給的好機會。`;

        notes.mainSet = `**主課表 (Main Set):**
長跑 @ 長跑配速 (${zones.long.pace}, RPE ${zones.long.rpe})
- 體感：${zones.long.feel}
- 心率維持在 ${zones.long.hrPercent} HRmax
- 步頻 170-180 步/分鐘`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定配速，不要在前半段跑太快
- 後半段可以稍微加速（負分配策略）
- 每 30-45 分鐘補充能量和水分
- 如果感覺太困難，放慢配速`;

    } else if (content.includes('輕鬆跑') || content.includes('Easy') || type.includes('輕鬆恢復')) {
        notes.purpose = `**訓練目的：**
輕鬆跑是恢復和維持跑量的基礎訓練。保持低強度能促進血液循環、加速恢復，同時維持跑步效率。`;

        notes.warmup = '';
        notes.mainSet = `**訓練內容：**
輕鬆跑 @ ${zones.easy.pace} (RPE ${zones.easy.rpe})
- 體感：${zones.easy.feel}
- 心率維持在 ${zones.easy.hrPercent} HRmax`;

        notes.intensityGuidance = `**強度指引：**
- 這是恢復日，不要追求配速
- 應該能夠輕鬆說完整的句子
- 專注於跑姿和步頻
- 如果感覺疲勞，放慢或縮短距離`;
        notes.cooldown = '';

    } else if (content.includes('節奏跑') || content.includes('Tempo')) {
        notes.purpose = `**訓練目的：**
節奏跑提升乳酸閾值和跑步經濟性。在「舒適的困難」強度下維持穩定配速，訓練身體更有效地清除乳酸。`;

        notes.mainSet = `**主課表 (Main Set):**
節奏跑 @ ${zones.tempo.pace} (RPE ${zones.tempo.rpe})
- 體感：${zones.tempo.feel}
- 心率會上升到 ${zones.tempo.hrPercent} HRmax`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定配速，不要忽快忽慢
- 呼吸應該有些困難但可控
- 專注於放鬆上半身
- 這個配速應該能維持 40-60 分鐘`;

    } else if (content.includes('間歇') || content.includes('interval') || type.includes('間歇')) {
        notes.purpose = `**訓練目的：**
間歇訓練提升 VO2max 和速度。透過高強度的短距離重複，能有效提升最大攝氧量和跑步效率。`;

        notes.mainSet = `**主課表 (Main Set):**
間歇跑 @ ${zones.interval.pace} (RPE ${zones.interval.rpe})
- 體感：${zones.interval.feel}
- 恢復段 @ 輕鬆跑 (${zones.easy.pace}, RPE ${zones.easy.rpe})`;

        notes.intensityGuidance = `**強度指引：**
- 每組間歇應該非常具有挑戰性
- 配速策略：前幾組保守，維持穩定
- 恢復段完全放鬆，不要急著開始下一組
- 維持高步頻 (180+ 步/分鐘)`;

    } else if (content.includes('比賽配速') || content.includes('Race Pace')) {
        notes.purpose = `**訓練目的：**
比賽配速訓練讓身體熟悉比賽當天的節奏。練習在這個配速下維持穩定輸出，建立配速感和信心。`;

        notes.mainSet = `**主課表 (Main Set):**
比賽配速跑 @ ${zones.marathon.pace} (RPE ${zones.marathon.rpe})
- 體感：${zones.marathon.feel}
- 心率維持在 ${zones.marathon.hrPercent} HRmax`;

        notes.intensityGuidance = `**強度指引：**
- 這是你的目標比賽配速
- 應該感覺有挑戰性但可持續
- 練習比賽日的營養補給策略
- 專注於維持穩定的步頻和姿勢`;

    } else {
        // Default run workout notes
        notes.purpose = `**訓練目的：**
建立跑步基礎，提升有氧能力和跑步效率。`;

        notes.mainSet = `**主課表：**
跑步訓練 @ ${zones.easy.pace} - ${zones.long.pace}
- 體感：舒適的有氧運動
- RPE ${zones.easy.rpe}-${zones.long.rpe}`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定配速
- 專注於跑姿`;
    }

    notes.rpeGuidance = `**RPE 體感對照：**
- RPE 1-3：非常輕鬆，可以完整聊天
- RPE 4-5：舒適，可以說話但稍有氣喘
- RPE 6-7：有點困難，只能說短句
- RPE 8-9：非常困難，專注於呼吸
- RPE 10：全力衝刺，無法說話`;

    return notes;
}

// Generate swim workout notes based on workout type
export function generateSwimWorkoutNotes(content, type, intensity) {
    const zones = getSwimZoneDescriptions();

    let notes = {
        purpose: '',
        warmup: '',
        mainSet: '',
        cooldown: '',
        intensityGuidance: '',
        rpeGuidance: ''
    };

    // Default warmup for swim workouts
    notes.warmup = `**熱身 (Warm-up):**
- 200-400m @ 恢復游配速 (${zones.recovery.pace}, RPE ${zones.recovery.rpe})
- 4 × 50m 技術練習 (每趟專注一個技術點)
- 4 × 25m 漸速游 (從輕鬆到 CSS 配速)`;

    // Default cooldown
    notes.cooldown = `**緩和 (Cool-down):**
- 200-300m @ 恢復游配速 (${zones.recovery.pace}, RPE ${zones.recovery.rpe})
- 專注於放鬆和呼吸`;

    if (content.includes('技術課') || content.includes('Technique') || type.includes('技術課')) {
        notes.purpose = `**訓練目的：**
技術課專注於游泳姿勢和效率。在低強度下練習特定技術動作，建立正確的肌肉記憶，提升游泳經濟性。`;

        notes.mainSet = `**主課表 (Main Set):**
技術練習 @ ${zones.technique.pace} (RPE ${zones.technique.rpe})
- 體感：${zones.technique.feel}
- 專注於：
  - 高肘抓水
  - 身體轉動
  - 流線型蹬牆
  - 雙側換氣`;

        notes.intensityGuidance = `**強度指引：**
- 配速不重要，專注於技術
- 每組之間稍作休息，重新設定動作
- 可以使用划手板、浮板等輔助器材
- 感覺疲勞時降低強度維持技術`;

    } else if (content.includes('CSS配速') || content.includes('配速訓練') || type.includes('配速訓練')) {
        notes.purpose = `**訓練目的：**
CSS (Critical Swim Speed) 配速訓練提升有氧閾值。在臨界游速下進行持續或間歇訓練，能有效提升游泳耐力和配速維持能力。`;

        notes.mainSet = `**主課表 (Main Set):**
CSS 配速間歇 @ ${zones.threshold.pace} (RPE ${zones.threshold.rpe})
- 體感：${zones.threshold.feel}
- 組間休息 20-30 秒`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定的配速和划頻
- 每趟的分段時間應該一致
- 如果配速下滑，延長休息時間
- 專注於高效的水下動作`;

    } else if (content.includes('間歇') || content.includes('interval') || type.includes('間歇訓練')) {
        notes.purpose = `**訓練目的：**
游泳間歇訓練提升速度和無氧能力。透過高強度的短距離重複，提升划水效率和比賽速度。`;

        notes.mainSet = `**主課表 (Main Set):**
間歇游 @ ${zones.interval.pace} (RPE ${zones.interval.rpe})
- 體感：${zones.interval.feel}
- 組間休息 30-45 秒`;

        notes.intensityGuidance = `**強度指引：**
- 每趟應該有挑戰性但能維持姿勢
- 專注於強而有力的抓水
- 蹬牆後維持流線型
- 前幾組保守，逐漸提速`;

    } else if (content.includes('恢復游') || content.includes('Recovery') || type.includes('輕鬆恢復')) {
        notes.purpose = `**訓練目的：**
恢復游促進血液循環和肌肉放鬆。在低強度下游泳能加速恢復，同時維持水感。`;

        notes.warmup = '';
        notes.mainSet = `**訓練內容：**
輕鬆游 @ ${zones.recovery.pace} (RPE ${zones.recovery.rpe})
- 體感：${zones.recovery.feel}
- 可以混合不同泳姿`;

        notes.intensityGuidance = `**強度指引：**
- 這是恢復日，不追求速度
- 專注於放鬆和流暢的動作
- 可以練習不同的泳姿
- 感覺疲勞就休息`;
        notes.cooldown = '';

    } else if (content.includes('長距離') || content.includes('耐力') || type.includes('耐力')) {
        notes.purpose = `**訓練目的：**
長距離游泳建立游泳耐力基礎。在有氧區間進行持續游泳，提升脂肪代謝和游泳效率。`;

        notes.mainSet = `**主課表 (Main Set):**
長距離有氧游 @ ${zones.aerobic.pace} (RPE ${zones.aerobic.rpe})
- 體感：${zones.aerobic.feel}
- 維持穩定的划頻`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定的配速和划頻
- 專注於呼吸節奏
- 可以每 500m 檢查一次配速
- 練習雙側換氣`;

    } else {
        // Default swim workout notes
        notes.purpose = `**訓練目的：**
建立游泳基礎，提升水感和游泳效率。`;

        notes.mainSet = `**主課表：**
游泳訓練 @ ${zones.aerobic.pace} - ${zones.threshold.pace}
- 體感：舒適的有氧運動
- RPE ${zones.aerobic.rpe}-${zones.threshold.rpe}`;

        notes.intensityGuidance = `**強度指引：**
- 維持穩定配速
- 專注於技術`;
    }

    notes.rpeGuidance = `**RPE 體感對照：**
- RPE 1-3：非常輕鬆，專注於姿勢
- RPE 4-5：舒適的有氧游，可持續
- RPE 6-7：有點困難，需要專注
- RPE 8-9：非常困難，無法維持太久
- RPE 10：全力衝刺`;

    return notes;
}

// ============================================
// Main Function - Generate Complete Workout Notes
// ============================================

export function generateWorkoutNotes(training) {
    const notes = {
        swim: null,
        bike: null,
        run: null
    };

    const content = training.content || '';
    const type = training.type || '';
    const intensity = training.intensity || '';

    // Parse content for swim workout
    if (training.swim && parseFloat(training.swim) > 0) {
        notes.swim = generateSwimWorkoutNotes(content, type, intensity);
    }

    // Parse content for bike workout
    if (training.bike && parseFloat(training.bike) > 0) {
        notes.bike = generateBikeWorkoutNotes(content, type, intensity);
    }

    // Parse content for run workout
    if (training.run && parseFloat(training.run) > 0) {
        notes.run = generateRunWorkoutNotes(content, type, intensity);
    }

    return notes;
}

// Convert markdown-like text to HTML
function markdownToHtml(text) {
    if (!text) return '';

    return text
        // Convert **text** to <strong>text</strong>
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Convert list items (- item) to proper list styling
        .replace(/^- (.+)$/gm, '<span class="list-item">• $1</span>')
        // Convert sub-list items (  - item) with indentation
        .replace(/^  - (.+)$/gm, '<span class="list-item list-item-indent">  • $1</span>')
        // Convert newlines to <br>
        .replace(/\n/g, '<br>');
}

// Format notes for display
export function formatNotesForDisplay(notes) {
    if (!notes) return '';

    let html = '';

    if (notes.purpose) {
        html += `<div class="notes-section notes-purpose">${markdownToHtml(notes.purpose)}</div>`;
    }

    if (notes.warmup) {
        html += `<div class="notes-section notes-warmup">${markdownToHtml(notes.warmup)}</div>`;
    }

    if (notes.mainSet) {
        html += `<div class="notes-section notes-mainset">${markdownToHtml(notes.mainSet)}</div>`;
    }

    if (notes.cooldown) {
        html += `<div class="notes-section notes-cooldown">${markdownToHtml(notes.cooldown)}</div>`;
    }

    if (notes.intensityGuidance) {
        html += `<div class="notes-section notes-intensity">${markdownToHtml(notes.intensityGuidance)}</div>`;
    }

    if (notes.rpeGuidance) {
        html += `<div class="notes-section notes-rpe">${markdownToHtml(notes.rpeGuidance)}</div>`;
    }

    return html;
}
