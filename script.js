// Training Schedule Data - 2026 Challenge Taiwan 113 (16週訓練計劃)
// 比賽日期：2026/4/25 (星期六)
// 訓練開始：2026/1/5 (星期一)
// 目標時間：Sub 5:30
const trainingData = [
    // Week 1 - 基礎期 (1/5-1/11)
    { day: "Week 1 - Day 1 (週一)", status: "No", intensity: "休息", date: "January 5, 2026", swim: "", bike: "", content: "完全休息日，開始16週訓練計劃", hours: 0, type: "完全休息", run: "", week: "Week 1", phase: "基礎期" },
    { day: "Week 1 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "January 6, 2026", swim: "1.5", bike: "", content: "游泳：技術課 1.5km (熱身400m + 技術練習800m + 緩和300m)", hours: 1, type: "技術課", run: "", week: "Week 1", phase: "基礎期" },
    { day: "Week 1 - Day 3 (週三)", status: "No", intensity: "輕鬆", date: "January 7, 2026", swim: "", bike: "30", content: "自行車：輕鬆騎 30km @ Z2 (65-75% FTP)", hours: 1, type: "輕鬆恢復", run: "", week: "Week 1", phase: "基礎期" },
    { day: "Week 1 - Day 4 (週四)", status: "No", intensity: "輕鬆", date: "January 8, 2026", swim: "", bike: "", content: "跑步：輕鬆跑 5km @ 6:30/km", hours: 0.5, type: "輕鬆恢復", run: "5", week: "Week 1", phase: "基礎期" },
    { day: "Week 1 - Day 5 (週五)", status: "No", intensity: "休息", date: "January 9, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 1", phase: "基礎期" },
    { day: "Week 1 - Day 6 (週六)", status: "No", intensity: "中等", date: "January 10, 2026", swim: "", bike: "50", content: "自行車：長距離 50km @ Z2", hours: 2, type: "長距離", run: "", week: "Week 1", phase: "基礎期" },
    { day: "Week 1 - Day 7 (週日)", status: "No", intensity: "中等", date: "January 11, 2026", swim: "1", bike: "", content: "跑步：長跑 10km @ 6:20/km | 游泳：恢復游 1km", hours: 1.5, type: "輕鬆恢復, 長距離", run: "10", week: "Week 1", phase: "基礎期" },

    // Week 2 - 基礎期 (1/12-1/18)
    { day: "Week 2 - Day 1 (週一)", status: "No", intensity: "休息", date: "January 12, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 2", phase: "基礎期" },
    { day: "Week 2 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "January 13, 2026", swim: "1.5", bike: "", content: "游泳：技術課 1.5km (划頻練習) | 跑步：輕鬆跑 5km", hours: 1.5, type: "技術課", run: "5", week: "Week 2", phase: "基礎期" },
    { day: "Week 2 - Day 3 (週三)", status: "No", intensity: "輕鬆", date: "January 14, 2026", swim: "", bike: "35", content: "自行車：35km @ Z2", hours: 1.5, type: "輕鬆恢復", run: "", week: "Week 2", phase: "基礎期" },
    { day: "Week 2 - Day 4 (週四)", status: "No", intensity: "中等", date: "January 15, 2026", swim: "1.5", bike: "", content: "游泳：配速訓練 1.5km (6x150m @ 2:10/100m, 休30秒)", hours: 1, type: "配速訓練", run: "", week: "Week 2", phase: "基礎期" },
    { day: "Week 2 - Day 5 (週五)", status: "No", intensity: "休息", date: "January 16, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 2", phase: "基礎期" },
    { day: "Week 2 - Day 6 (週六)", status: "No", intensity: "中等", date: "January 17, 2026", swim: "", bike: "55", content: "自行車：長距離 55km @ Z2", hours: 2, type: "長距離", run: "", week: "Week 2", phase: "基礎期" },
    { day: "Week 2 - Day 7 (週日)", status: "No", intensity: "中等", date: "January 18, 2026", swim: "1", bike: "", content: "跑步：長跑 12km @ 6:15/km | 游泳：恢復游 1km", hours: 2, type: "輕鬆恢復, 長距離", run: "12", week: "Week 2", phase: "基礎期" },

    // Week 3 - 基礎期 (1/19-1/25)
    { day: "Week 3 - Day 1 (週一)", status: "No", intensity: "休息", date: "January 19, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 3", phase: "基礎期" },
    { day: "Week 3 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "January 20, 2026", swim: "1.5", bike: "", content: "游泳：技術課 1.5km | 跑步：輕鬆跑 6km", hours: 1.5, type: "技術課", run: "6", week: "Week 3", phase: "基礎期" },
    { day: "Week 3 - Day 3 (週三)", status: "No", intensity: "中等", date: "January 21, 2026", swim: "", bike: "40", content: "自行車：40km (含 2x10分鐘 @ Sweet Spot)", hours: 1.5, type: "配速訓練", run: "", week: "Week 3", phase: "基礎期" },
    { day: "Week 3 - Day 4 (週四)", status: "No", intensity: "中等", date: "January 22, 2026", swim: "2", bike: "", content: "游泳：間歇 2km (8x150m @ 2:05/100m, 休30秒)", hours: 1, type: "間歇訓練", run: "", week: "Week 3", phase: "基礎期" },
    { day: "Week 3 - Day 5 (週五)", status: "No", intensity: "休息", date: "January 23, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 3", phase: "基礎期" },
    { day: "Week 3 - Day 6 (週六)", status: "No", intensity: "中等", date: "January 24, 2026", swim: "", bike: "60", content: "自行車：長距離 60km @ Z2", hours: 2.5, type: "長距離", run: "", week: "Week 3", phase: "基礎期" },
    { day: "Week 3 - Day 7 (週日)", status: "No", intensity: "中等", date: "January 25, 2026", swim: "1", bike: "", content: "跑步：長跑 13km @ 6:10/km | 游泳：恢復游 1km", hours: 2, type: "輕鬆恢復, 長距離", run: "13", week: "Week 3", phase: "基礎期" },

    // Week 4 - 基礎期 恢復週 (1/26-2/1)
    { day: "Week 4 - Day 1 (週一)", status: "No", intensity: "休息", date: "January 26, 2026", swim: "", bike: "", content: "完全休息日 - 恢復週", hours: 0, type: "完全休息", run: "", week: "Week 4", phase: "基礎期" },
    { day: "Week 4 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "January 27, 2026", swim: "1.5", bike: "", content: "游泳：技術課 1.5km | 跑步：輕鬆跑 5km", hours: 1.5, type: "技術課", run: "5", week: "Week 4", phase: "基礎期" },
    { day: "Week 4 - Day 3 (週三)", status: "No", intensity: "輕鬆", date: "January 28, 2026", swim: "", bike: "30", content: "自行車：輕鬆騎 30km @ Z2", hours: 1, type: "輕鬆恢復", run: "", week: "Week 4", phase: "基礎期" },
    { day: "Week 4 - Day 4 (週四)", status: "No", intensity: "輕鬆", date: "January 29, 2026", swim: "1.5", bike: "", content: "游泳：恢復游 1.5km | 跑步：輕鬆跑 4km", hours: 1, type: "輕鬆恢復", run: "4", week: "Week 4", phase: "基礎期" },
    { day: "Week 4 - Day 5 (週五)", status: "No", intensity: "休息", date: "January 30, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 4", phase: "基礎期" },
    { day: "Week 4 - Day 6 (週六)", status: "No", intensity: "輕鬆", date: "January 31, 2026", swim: "", bike: "40", content: "自行車：輕鬆騎 40km @ Z2", hours: 1.5, type: "輕鬆恢復", run: "", week: "Week 4", phase: "基礎期" },
    { day: "Week 4 - Day 7 (週日)", status: "No", intensity: "輕鬆", date: "February 1, 2026", swim: "1", bike: "", content: "跑步：長跑 10km @ 輕鬆配速 | 游泳：恢復游 1km", hours: 1.5, type: "輕鬆恢復", run: "10", week: "Week 4", phase: "基礎期" },

    // Week 5 - 建構期 (2/2-2/8)
    { day: "Week 5 - Day 1 (週一)", status: "No", intensity: "休息", date: "February 2, 2026", swim: "", bike: "", content: "完全休息日 - 建構期開始", hours: 0, type: "完全休息", run: "", week: "Week 5", phase: "建構期" },
    { day: "Week 5 - Day 2 (週二)", status: "No", intensity: "中等", date: "February 3, 2026", swim: "2", bike: "", content: "游泳：配速訓練 2km (6x200m @ 2:05/100m, 休30秒) | 跑步：輕鬆跑 6km", hours: 1.5, type: "配速訓練", run: "6", week: "Week 5", phase: "建構期" },
    { day: "Week 5 - Day 3 (週三)", status: "No", intensity: "中等", date: "February 4, 2026", swim: "", bike: "50", content: "自行車：50km (含 3x10分鐘 @ Sweet Spot, 休5分鐘)", hours: 2, type: "配速訓練", run: "", week: "Week 5", phase: "建構期" },
    { day: "Week 5 - Day 4 (週四)", status: "No", intensity: "中等", date: "February 5, 2026", swim: "2", bike: "", content: "游泳：間歇 2km (8x200m @ 2:03/100m, 休30秒) | 跑步：節奏跑 7km", hours: 1.5, type: "間歇訓練", run: "7", week: "Week 5", phase: "建構期" },
    { day: "Week 5 - Day 5 (週五)", status: "No", intensity: "休息", date: "February 6, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 5", phase: "建構期" },
    { day: "Week 5 - Day 6 (週六)", status: "No", intensity: "中等", date: "February 7, 2026", swim: "", bike: "70", content: "自行車：長距離 70km @ Z2 | 磚式訓練：接續跑 5km @ 6:00/km", hours: 3.5, type: "磚式訓練, 長距離", run: "5", week: "Week 5", phase: "建構期" },
    { day: "Week 5 - Day 7 (週日)", status: "No", intensity: "中等", date: "February 8, 2026", swim: "1.5", bike: "", content: "跑步：長跑 14km @ 6:00/km | 游泳：恢復游 1.5km", hours: 2.5, type: "輕鬆恢復, 長距離", run: "14", week: "Week 5", phase: "建構期" },

    // Week 6 - 建構期 (2/9-2/15)
    { day: "Week 6 - Day 1 (週一)", status: "No", intensity: "休息", date: "February 9, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 6", phase: "建構期" },
    { day: "Week 6 - Day 2 (週二)", status: "No", intensity: "中等", date: "February 10, 2026", swim: "2", bike: "", content: "游泳：技術+配速 2km | 跑步：輕鬆跑 6km", hours: 1.5, type: "技術課, 配速訓練", run: "6", week: "Week 6", phase: "建構期" },
    { day: "Week 6 - Day 3 (週三)", status: "No", intensity: "中等", date: "February 11, 2026", swim: "", bike: "55", content: "自行車：55km (含 3x12分鐘 @ Sweet Spot)", hours: 2, type: "配速訓練", run: "", week: "Week 6", phase: "建構期" },
    { day: "Week 6 - Day 4 (週四)", status: "No", intensity: "高強度", date: "February 12, 2026", swim: "2.5", bike: "", content: "游泳：間歇 2.5km (10x150m @ 2:00/100m, 休30秒) | 跑步：間歇 8km", hours: 2, type: "間歇訓練", run: "8", week: "Week 6", phase: "建構期" },
    { day: "Week 6 - Day 5 (週五)", status: "No", intensity: "休息", date: "February 13, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 6", phase: "建構期" },
    { day: "Week 6 - Day 6 (週六)", status: "No", intensity: "中等", date: "February 14, 2026", swim: "", bike: "75", content: "自行車：長距離 75km @ Z2 | 磚式訓練：接續跑 6km", hours: 4, type: "磚式訓練, 長距離", run: "6", week: "Week 6", phase: "建構期" },
    { day: "Week 6 - Day 7 (週日)", status: "No", intensity: "中等", date: "February 15, 2026", swim: "1.5", bike: "", content: "跑步：長跑 15km @ 5:55/km | 游泳：恢復游 1.5km", hours: 2.5, type: "輕鬆恢復, 長距離", run: "15", week: "Week 6", phase: "建構期" },

    // Week 7 - 建構期 農曆新年 (2/16-2/22)
    { day: "Week 7 - Day 1 (週一)", status: "No", intensity: "休息", date: "February 16, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 7", phase: "建構期" },
    { day: "Week 7 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "February 17, 2026", swim: "2", bike: "", content: "🧧 除夕 | 游泳：輕鬆游 2km", hours: 1, type: "輕鬆恢復", run: "", week: "Week 7", phase: "建構期", holiday: "除夕" },
    { day: "Week 7 - Day 3 (週三)", status: "No", intensity: "輕鬆", date: "February 18, 2026", swim: "", bike: "40", content: "🧧 初一 | 自行車：輕鬆騎 40km", hours: 1.5, type: "輕鬆恢復", run: "", week: "Week 7", phase: "建構期", holiday: "初一" },
    { day: "Week 7 - Day 4 (週四)", status: "No", intensity: "輕鬆", date: "February 19, 2026", swim: "", bike: "", content: "🧧 初二 | 跑步：輕鬆跑 8km", hours: 1, type: "輕鬆恢復", run: "8", week: "Week 7", phase: "建構期", holiday: "初二" },
    { day: "Week 7 - Day 5 (週五)", status: "No", intensity: "輕鬆", date: "February 20, 2026", swim: "1.5", bike: "", content: "🧧 初三 | 游泳：恢復游 1.5km", hours: 1, type: "輕鬆恢復", run: "", week: "Week 7", phase: "建構期", holiday: "初三" },
    { day: "Week 7 - Day 6 (週六)", status: "No", intensity: "中等", date: "February 21, 2026", swim: "", bike: "60", content: "🧧 初四 | 自行車：60km @ Z2 | 磚式訓練：接續跑 5km", hours: 3, type: "磚式訓練", run: "5", week: "Week 7", phase: "建構期", holiday: "初四" },
    { day: "Week 7 - Day 7 (週日)", status: "No", intensity: "中等", date: "February 22, 2026", swim: "1.5", bike: "", content: "🧧 初五 | 跑步：長跑 12km | 游泳：恢復游 1.5km", hours: 2, type: "輕鬆恢復, 長距離", run: "12", week: "Week 7", phase: "建構期", holiday: "初五" },

    // Week 8 - 建構期 恢復週 (2/23-3/1)
    { day: "Week 8 - Day 1 (週一)", status: "No", intensity: "休息", date: "February 23, 2026", swim: "", bike: "", content: "完全休息日 - 恢復週", hours: 0, type: "完全休息", run: "", week: "Week 8", phase: "建構期" },
    { day: "Week 8 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "February 24, 2026", swim: "2", bike: "", content: "游泳：技術課 2km | 跑步：輕鬆跑 5km", hours: 1.5, type: "技術課", run: "5", week: "Week 8", phase: "建構期" },
    { day: "Week 8 - Day 3 (週三)", status: "No", intensity: "輕鬆", date: "February 25, 2026", swim: "", bike: "40", content: "自行車：輕鬆騎 40km", hours: 1.5, type: "輕鬆恢復", run: "", week: "Week 8", phase: "建構期" },
    { day: "Week 8 - Day 4 (週四)", status: "No", intensity: "輕鬆", date: "February 26, 2026", swim: "1.5", bike: "", content: "游泳：恢復游 1.5km | 跑步：輕鬆跑 5km", hours: 1.5, type: "輕鬆恢復", run: "5", week: "Week 8", phase: "建構期" },
    { day: "Week 8 - Day 5 (週五)", status: "No", intensity: "休息", date: "February 27, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 8", phase: "建構期" },
    { day: "Week 8 - Day 6 (週六)", status: "No", intensity: "輕鬆", date: "February 28, 2026", swim: "", bike: "50", content: "自行車：輕鬆騎 50km", hours: 2, type: "輕鬆恢復", run: "", week: "Week 8", phase: "建構期" },
    { day: "Week 8 - Day 7 (週日)", status: "No", intensity: "輕鬆", date: "March 1, 2026", swim: "1.5", bike: "", content: "跑步：長跑 10km @ 輕鬆配速 | 游泳：恢復游 1.5km", hours: 2, type: "輕鬆恢復", run: "10", week: "Week 8", phase: "建構期" },

    // Week 9 - 建構期 (3/2-3/8)
    { day: "Week 9 - Day 1 (週一)", status: "No", intensity: "休息", date: "March 2, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 9", phase: "建構期" },
    { day: "Week 9 - Day 2 (週二)", status: "No", intensity: "中等", date: "March 3, 2026", swim: "2.5", bike: "", content: "游泳：配速 2.5km (5x300m @ 2:00/100m, 休45秒) | 跑步：輕鬆跑 6km", hours: 2, type: "配速訓練", run: "6", week: "Week 9", phase: "建構期" },
    { day: "Week 9 - Day 3 (週三)", status: "No", intensity: "高強度", date: "March 4, 2026", swim: "", bike: "60", content: "自行車：60km (含 4x12分鐘 @ Sweet Spot)", hours: 2.5, type: "配速訓練", run: "", week: "Week 9", phase: "建構期" },
    { day: "Week 9 - Day 4 (週四)", status: "No", intensity: "高強度", date: "March 5, 2026", swim: "2.5", bike: "", content: "游泳：間歇 2.5km (10x200m @ 2:00/100m) | 跑步：節奏跑 9km", hours: 2, type: "間歇訓練", run: "9", week: "Week 9", phase: "建構期" },
    { day: "Week 9 - Day 5 (週五)", status: "No", intensity: "休息", date: "March 6, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 9", phase: "建構期" },
    { day: "Week 9 - Day 6 (週六)", status: "No", intensity: "高強度", date: "March 7, 2026", swim: "", bike: "85", content: "自行車：長距離 85km @ Z2 | 磚式訓練：接續跑 7km @ 5:45/km", hours: 4, type: "磚式訓練, 長距離", run: "7", week: "Week 9", phase: "建構期" },
    { day: "Week 9 - Day 7 (週日)", status: "No", intensity: "中等", date: "March 8, 2026", swim: "2", bike: "", content: "跑步：長跑 16km @ 5:50/km | 游泳：恢復游 2km", hours: 3, type: "配速訓練, 長距離", run: "16", week: "Week 9", phase: "建構期" },

    // Week 10 - 建構期 (3/9-3/15)
    { day: "Week 10 - Day 1 (週一)", status: "No", intensity: "休息", date: "March 9, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 10", phase: "建構期" },
    { day: "Week 10 - Day 2 (週二)", status: "No", intensity: "中等", date: "March 10, 2026", swim: "2.5", bike: "", content: "游泳：技術+配速 2.5km | 跑步：輕鬆跑 7km", hours: 2, type: "技術課, 配速訓練", run: "7", week: "Week 10", phase: "建構期" },
    { day: "Week 10 - Day 3 (週三)", status: "No", intensity: "高強度", date: "March 11, 2026", swim: "", bike: "65", content: "自行車：65km (含 4x15分鐘 @ Sweet Spot)", hours: 2.5, type: "配速訓練", run: "", week: "Week 10", phase: "建構期" },
    { day: "Week 10 - Day 4 (週四)", status: "No", intensity: "高強度", date: "March 12, 2026", swim: "2.5", bike: "", content: "游泳：間歇 2.5km (12x150m @ 1:58/100m) | 跑步：節奏跑 10km", hours: 2, type: "間歇訓練", run: "10", week: "Week 10", phase: "建構期" },
    { day: "Week 10 - Day 5 (週五)", status: "No", intensity: "休息", date: "March 13, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 10", phase: "建構期" },
    { day: "Week 10 - Day 6 (週六)", status: "No", intensity: "高強度", date: "March 14, 2026", swim: "", bike: "90", content: "自行車：長距離 90km @ Z2 | 磚式訓練：接續跑 8km @ 5:40/km", hours: 4.5, type: "磚式訓練, 長距離", run: "8", week: "Week 10", phase: "建構期" },
    { day: "Week 10 - Day 7 (週日)", status: "No", intensity: "中等", date: "March 15, 2026", swim: "2", bike: "", content: "跑步：長跑 17km @ 5:45/km | 游泳：恢復游 2km", hours: 3, type: "配速訓練, 長距離", run: "17", week: "Week 10", phase: "建構期" },

    // Week 11 - 巔峰期 (3/16-3/22)
    { day: "Week 11 - Day 1 (週一)", status: "No", intensity: "休息", date: "March 16, 2026", swim: "", bike: "", content: "完全休息日 - 巔峰期開始", hours: 0, type: "完全休息", run: "", week: "Week 11", phase: "巔峰期" },
    { day: "Week 11 - Day 2 (週二)", status: "No", intensity: "高強度", date: "March 17, 2026", swim: "2.5", bike: "", content: "游泳：配速 2.5km (4x400m @ 2:00/100m, 休1分) | 跑步：輕鬆跑 6km", hours: 2, type: "配速訓練", run: "6", week: "Week 11", phase: "巔峰期" },
    { day: "Week 11 - Day 3 (週三)", status: "No", intensity: "高強度", date: "March 18, 2026", swim: "", bike: "70", content: "自行車：70km (含 3x20分鐘 @ Sweet Spot)", hours: 3, type: "配速訓練", run: "", week: "Week 11", phase: "巔峰期" },
    { day: "Week 11 - Day 4 (週四)", status: "No", intensity: "高強度", date: "March 19, 2026", swim: "2.5", bike: "", content: "游泳：間歇 2.5km (5x300m @ 1:58/100m) | 跑步：間歇 10km (4x1.5km @ 5:00/km)", hours: 2.5, type: "間歇訓練", run: "10", week: "Week 11", phase: "巔峰期" },
    { day: "Week 11 - Day 5 (週五)", status: "No", intensity: "休息", date: "March 20, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 11", phase: "巔峰期" },
    { day: "Week 11 - Day 6 (週六)", status: "No", intensity: "最大", date: "March 21, 2026", swim: "", bike: "95", content: "自行車：長距離 95km @ Z2 | 磚式訓練：接續跑 10km @ 比賽配速", hours: 5, type: "磚式訓練, 長距離", run: "10", week: "Week 11", phase: "巔峰期" },
    { day: "Week 11 - Day 7 (週日)", status: "No", intensity: "高強度", date: "March 22, 2026", swim: "2", bike: "", content: "跑步：長跑 18km (含 12km @ 比賽配速) | 游泳：恢復游 2km", hours: 3, type: "配速訓練, 長距離", run: "18", week: "Week 11", phase: "巔峰期" },

    // Week 12 - 巔峰期 (3/23-3/29)
    { day: "Week 12 - Day 1 (週一)", status: "No", intensity: "休息", date: "March 23, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 12", phase: "巔峰期" },
    { day: "Week 12 - Day 2 (週二)", status: "No", intensity: "中等", date: "March 24, 2026", swim: "2", bike: "", content: "游泳：技術課 2km | 跑步：輕鬆跑 6km", hours: 1.5, type: "技術課", run: "6", week: "Week 12", phase: "巔峰期" },
    { day: "Week 12 - Day 3 (週三)", status: "No", intensity: "中等", date: "March 25, 2026", swim: "", bike: "55", content: "自行車：55km (含 3x15分鐘 @ Sweet Spot)", hours: 2, type: "配速訓練", run: "", week: "Week 12", phase: "巔峰期" },
    { day: "Week 12 - Day 4 (週四)", status: "No", intensity: "中等", date: "March 26, 2026", swim: "2", bike: "", content: "游泳：配速 2km (4x400m @ 2:00/100m) | 跑步：節奏跑 8km", hours: 2, type: "配速訓練", run: "8", week: "Week 12", phase: "巔峰期" },
    { day: "Week 12 - Day 5 (週五)", status: "No", intensity: "休息", date: "March 27, 2026", swim: "", bike: "", content: "完全休息日，準備週末模擬賽", hours: 0, type: "完全休息", run: "", week: "Week 12", phase: "巔峰期" },
    { day: "Week 12 - Day 6 (週六)", status: "No", intensity: "輕鬆", date: "March 28, 2026", swim: "", bike: "40", content: "自行車：輕鬆騎 40km @ Z2 | 輕鬆跑 4km", hours: 2, type: "輕鬆恢復", run: "4", week: "Week 12", phase: "巔峰期" },
    { day: "Week 12 - Day 7 (週日)", status: "No", intensity: "最大", date: "March 29, 2026", swim: "2", bike: "90", content: "半程模擬賽：游泳 2km + 自行車 90km + 跑步 21km | 目標：驗證配速與補給策略", hours: 5.5, type: "模擬賽", run: "21", week: "Week 12", phase: "巔峰期" },

    // Week 13 - 巔峰期 恢復週 (3/30-4/5)
    { day: "Week 13 - Day 1 (週一)", status: "No", intensity: "休息", date: "March 30, 2026", swim: "", bike: "", content: "完全休息日 - 從模擬賽恢復", hours: 0, type: "完全休息", run: "", week: "Week 13", phase: "巔峰期" },
    { day: "Week 13 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "March 31, 2026", swim: "1.5", bike: "", content: "游泳：恢復游 1.5km | 跑步：輕鬆跑 5km", hours: 1.5, type: "輕鬆恢復", run: "5", week: "Week 13", phase: "巔峰期" },
    { day: "Week 13 - Day 3 (週三)", status: "No", intensity: "輕鬆", date: "April 1, 2026", swim: "", bike: "40", content: "自行車：輕鬆騎 40km @ Z2", hours: 1.5, type: "輕鬆恢復", run: "", week: "Week 13", phase: "巔峰期" },
    { day: "Week 13 - Day 4 (週四)", status: "No", intensity: "輕鬆", date: "April 2, 2026", swim: "1.5", bike: "", content: "游泳：技術課 1.5km | 跑步：輕鬆跑 5km", hours: 1.5, type: "技術課", run: "5", week: "Week 13", phase: "巔峰期" },
    { day: "Week 13 - Day 5 (週五)", status: "No", intensity: "休息", date: "April 3, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 13", phase: "巔峰期" },
    { day: "Week 13 - Day 6 (週六)", status: "No", intensity: "輕鬆", date: "April 4, 2026", swim: "", bike: "45", content: "自行車：輕鬆騎 45km | 磚式訓練：接續跑 4km", hours: 2, type: "輕鬆恢復", run: "4", week: "Week 13", phase: "巔峰期" },
    { day: "Week 13 - Day 7 (週日)", status: "No", intensity: "輕鬆", date: "April 5, 2026", swim: "1.5", bike: "", content: "跑步：長跑 10km @ 輕鬆配速 | 游泳：恢復游 1.5km", hours: 2, type: "輕鬆恢復", run: "10", week: "Week 13", phase: "巔峰期" },

    // Week 14 - 減量期 (4/6-4/12)
    { day: "Week 14 - Day 1 (週一)", status: "No", intensity: "休息", date: "April 6, 2026", swim: "", bike: "", content: "完全休息日 - 減量期開始", hours: 0, type: "完全休息", run: "", week: "Week 14", phase: "減量期" },
    { day: "Week 14 - Day 2 (週二)", status: "No", intensity: "中等", date: "April 7, 2026", swim: "2", bike: "", content: "游泳：配速 2km (4x300m @ 2:00/100m) | 跑步：輕鬆跑 6km", hours: 1.5, type: "配速訓練", run: "6", week: "Week 14", phase: "減量期" },
    { day: "Week 14 - Day 3 (週三)", status: "No", intensity: "中等", date: "April 8, 2026", swim: "", bike: "45", content: "自行車：45km (含 3x8分鐘 @ Sweet Spot)", hours: 2, type: "配速訓練", run: "", week: "Week 14", phase: "減量期" },
    { day: "Week 14 - Day 4 (週四)", status: "No", intensity: "中等", date: "April 9, 2026", swim: "1.5", bike: "", content: "游泳：配速 1.5km | 跑步：節奏跑 7km", hours: 1.5, type: "配速訓練", run: "7", week: "Week 14", phase: "減量期" },
    { day: "Week 14 - Day 5 (週五)", status: "No", intensity: "休息", date: "April 10, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 14", phase: "減量期" },
    { day: "Week 14 - Day 6 (週六)", status: "No", intensity: "中等", date: "April 11, 2026", swim: "", bike: "60", content: "自行車：60km @ Z2 | 磚式訓練：接續跑 5km @ 比賽配速", hours: 3, type: "磚式訓練", run: "5", week: "Week 14", phase: "減量期" },
    { day: "Week 14 - Day 7 (週日)", status: "No", intensity: "輕鬆", date: "April 12, 2026", swim: "1.5", bike: "", content: "跑步：長跑 10km @ 輕鬆配速 | 游泳：恢復游 1.5km", hours: 2, type: "輕鬆恢復", run: "10", week: "Week 14", phase: "減量期" },

    // Week 15 - 減量期 (4/13-4/19)
    { day: "Week 15 - Day 1 (週一)", status: "No", intensity: "休息", date: "April 13, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 15", phase: "減量期" },
    { day: "Week 15 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "April 14, 2026", swim: "1.5", bike: "", content: "游泳：技術課 1.5km | 跑步：輕鬆跑 5km", hours: 1.5, type: "技術課", run: "5", week: "Week 15", phase: "減量期" },
    { day: "Week 15 - Day 3 (週三)", status: "No", intensity: "中等", date: "April 15, 2026", swim: "", bike: "40", content: "自行車：40km (含 3x5分鐘 @ 比賽配速)", hours: 1.5, type: "配速訓練", run: "", week: "Week 15", phase: "減量期" },
    { day: "Week 15 - Day 4 (週四)", status: "No", intensity: "輕鬆", date: "April 16, 2026", swim: "1.5", bike: "", content: "游泳：配速 1.5km (3x300m @ 2:00/100m) | 跑步：輕鬆跑 5km", hours: 1.5, type: "配速訓練", run: "5", week: "Week 15", phase: "減量期" },
    { day: "Week 15 - Day 5 (週五)", status: "No", intensity: "休息", date: "April 17, 2026", swim: "", bike: "", content: "完全休息日", hours: 0, type: "完全休息", run: "", week: "Week 15", phase: "減量期" },
    { day: "Week 15 - Day 6 (週六)", status: "No", intensity: "輕鬆", date: "April 18, 2026", swim: "", bike: "35", content: "自行車：35km @ Z2 | 磚式訓練：接續跑 3km @ 比賽配速", hours: 1.5, type: "輕鬆恢復", run: "3", week: "Week 15", phase: "減量期" },
    { day: "Week 15 - Day 7 (週日)", status: "No", intensity: "輕鬆", date: "April 19, 2026", swim: "1", bike: "", content: "跑步：輕鬆跑 6km | 游泳：恢復游 1km", hours: 1.5, type: "輕鬆恢復", run: "6", week: "Week 15", phase: "減量期" },

    // Week 16 - 賽前週 (4/20-4/25)
    { day: "Week 16 - Day 1 (週一)", status: "No", intensity: "輕鬆", date: "April 20, 2026", swim: "1", bike: "", content: "游泳：技術課 1km | 跑步：輕鬆跑 4km", hours: 1, type: "技術課", run: "4", week: "Week 16", phase: "賽前週" },
    { day: "Week 16 - Day 2 (週二)", status: "No", intensity: "輕鬆", date: "April 21, 2026", swim: "", bike: "25", content: "自行車：輕鬆騎 25km (檢查裝備)", hours: 1, type: "輕鬆恢復", run: "", week: "Week 16", phase: "賽前週" },
    { day: "Week 16 - Day 3 (週三)", status: "No", intensity: "輕鬆", date: "April 22, 2026", swim: "1", bike: "", content: "游泳：開放水域 1km (熟悉活水湖環境) | 跑步：輕鬆跑 3km", hours: 1, type: "技術課", run: "3", week: "Week 16", phase: "賽前週" },
    { day: "Week 16 - Day 4 (週四)", status: "No", intensity: "輕鬆", date: "April 23, 2026", swim: "", bike: "20", content: "賽前活化：自行車 20km (含 3x3分鐘 @ 比賽配速) + 跑步 3km (含 3x1分鐘 @ 比賽配速)", hours: 1, type: "配速訓練", run: "3", week: "Week 16", phase: "賽前週" },
    { day: "Week 16 - Day 5 (週五)", status: "No", intensity: "休息", date: "April 24, 2026", swim: "", bike: "", content: "完全休息日 - 營養調整，檢查裝備，早睡", hours: 0, type: "完全休息", run: "", week: "Week 16", phase: "賽前週" },
    { day: "Week 16 - Day 6 (週六) - 比賽日", status: "No", intensity: "最大", date: "April 25, 2026", swim: "1.9", bike: "90", content: "🏆 Challenge Taiwan 113 🏆 | 目標時間：Sub-5:30 | 游泳 1.9km：38:00 | 自行車 90km：2:50:00 | 跑步 21.1km：1:55:00", hours: 5.5, type: "比賽日", run: "21.1", week: "Week 16", phase: "賽前週" }
];

// Sort by date
trainingData.sort((a, b) => new Date(a.date) - new Date(b.date));

// Populate schedule table
function populateSchedule(filter = 'all') {
    const tbody = document.getElementById('scheduleBody');
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

// Format date for display
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
    return `${month}/${day} (${weekday})`;
}

// Filter buttons
document.addEventListener('DOMContentLoaded', () => {
    populateSchedule();

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

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });

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

    // Weekly Mileage Chart
    initWeeklyMileageChart();

    // Today's Training
    displayTodayTraining();
});

// Initialize Weekly Mileage Chart
function initWeeklyMileageChart() {
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

// Countdown to race day
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

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Convert training data to Garmin Workout JSON format
function convertToGarminWorkout(training, index, overrideDate = null) {
    const workouts = [];

    // Sport type mappings: 1=running, 2=cycling, 4=swimming (pool), 5=swimming (open water)
    const sportTypes = {
        swim: { sportTypeId: 4, sportTypeKey: 'swimming_pool' },
        bike: { sportTypeId: 2, sportTypeKey: 'cycling' },
        run: { sportTypeId: 1, sportTypeKey: 'running' }
    };

    // Parse workout content to extract details
    const content = training.content;
    // Use override date if provided, otherwise use training's original date
    const dateObj = overrideDate ? new Date(overrideDate) : new Date(training.date);
    const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

    // Create swim workout if exists
    if (training.swim && parseFloat(training.swim) > 0) {
        resetStepIdCounter();
        const swimDistance = parseFloat(training.swim) * 1000; // Convert to meters
        const rawSteps = generateSwimSteps(swimDistance, content);
        const swimWorkout = {
            workoutId: null,
            ownerId: null,
            workoutName: `Day ${index + 1} 游泳 - ${training.phase}`,
            description: extractWorkoutPart(content, '游泳'),
            sportType: sportTypes.swim,
            workoutSegments: [{
                segmentOrder: 1,
                sportType: sportTypes.swim,
                workoutSteps: rawSteps.map(step => formatStep(step))
            }],
            estimatedDurationInSecs: Math.round(swimDistance * 2.5 / 100 * 60), // Estimate based on 2:30/100m
            estimatedDistanceInMeters: swimDistance,
            poolLength: 25,
            poolLengthUnit: { unitId: 1, unitKey: 'meter' },
            scheduledDate: dateStr
        };
        workouts.push({ type: 'swim', data: swimWorkout });
    }

    // Create bike workout if exists
    if (training.bike && parseFloat(training.bike) > 0) {
        resetStepIdCounter();
        const bikeDistance = parseFloat(training.bike) * 1000; // Convert to meters
        const rawSteps = generateBikeSteps(bikeDistance, content);
        const bikeWorkout = {
            workoutId: null,
            ownerId: null,
            workoutName: `Day ${index + 1} 自行車 - ${training.phase}`,
            description: extractWorkoutPart(content, '自行車'),
            sportType: sportTypes.bike,
            workoutSegments: [{
                segmentOrder: 1,
                sportType: sportTypes.bike,
                workoutSteps: rawSteps.map(step => formatStep(step))
            }],
            estimatedDurationInSecs: Math.round(bikeDistance / 1000 / 30 * 3600), // Estimate based on 30km/h
            estimatedDistanceInMeters: bikeDistance,
            scheduledDate: dateStr
        };
        workouts.push({ type: 'bike', data: bikeWorkout });
    }

    // Create run workout if exists
    if (training.run && parseFloat(training.run) > 0) {
        resetStepIdCounter();
        const runDistance = parseFloat(training.run) * 1000; // Convert to meters
        const rawSteps = generateRunSteps(runDistance, content);
        const runWorkout = {
            workoutId: null,
            ownerId: null,
            workoutName: `Day ${index + 1} 跑步 - ${training.phase}`,
            description: extractWorkoutPart(content, '跑步'),
            sportType: sportTypes.run,
            workoutSegments: [{
                segmentOrder: 1,
                sportType: sportTypes.run,
                workoutSteps: rawSteps.map(step => formatStep(step))
            }],
            estimatedDurationInSecs: Math.round(runDistance / 1000 * 6 * 60), // Estimate based on 6:00/km
            estimatedDistanceInMeters: runDistance,
            scheduledDate: dateStr
        };
        workouts.push({ type: 'run', data: runWorkout });
    }

    return workouts;
}

// Extract workout description for specific sport
function extractWorkoutPart(content, sport) {
    const parts = content.split('|').map(p => p.trim());
    for (const part of parts) {
        if (part.includes(sport)) {
            return part;
        }
    }
    return content;
}

// Format a workout step with required Garmin API fields
let stepIdCounter = 0;
function formatStep(step) {
    const stepId = ++stepIdCounter;
    const formattedStep = {
        type: step.stepType.stepTypeKey === 'repeat' ? 'RepeatGroupDTO' : 'ExecutableStepDTO',
        stepId: stepId,
        stepOrder: step.stepOrder,
        childStepId: null,
        stepType: step.stepType,
        targetType: step.targetType || { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
        targetValueOne: null,
        targetValueTwo: null
    };

    // Add endCondition for non-repeat steps
    if (step.endCondition) {
        formattedStep.endCondition = step.endCondition;
        formattedStep.endConditionValue = step.endConditionValue;
    }

    // Handle repeat steps with nested workoutSteps
    if (step.workoutSteps) {
        formattedStep.numberOfIterations = step.numberOfIterations;
        formattedStep.workoutSteps = step.workoutSteps.map(childStep => formatStep(childStep));
    }

    return formattedStep;
}

// Reset step ID counter for each workout
function resetStepIdCounter() {
    stepIdCounter = 0;
}

// Generate swim workout steps
function generateSwimSteps(totalDistance, content) {
    const steps = [];
    let stepOrder = 1;

    // Check for intervals pattern like "6x400m" or "10x200m"
    const intervalMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)m/);

    if (intervalMatch) {
        const reps = parseInt(intervalMatch[1]);
        const distance = parseInt(intervalMatch[2]);
        const warmupDistance = Math.round((totalDistance - reps * distance) / 2);

        // Warmup
        if (warmupDistance > 0) {
            steps.push({
                stepOrder: stepOrder++,
                stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
                endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                endConditionValue: warmupDistance,
                targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
            });
        }

        // Interval repeat
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
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 4, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 30,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ]
        });

        // Cooldown
        if (warmupDistance > 0) {
            steps.push({
                stepOrder: stepOrder++,
                stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
                endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
                endConditionValue: warmupDistance,
                targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
            });
        }
    } else {
        // Simple distance swim
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.2),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.6),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.2),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
    }

    return steps;
}

// Generate bike workout steps
function generateBikeSteps(totalDistance, content) {
    const steps = [];
    let stepOrder = 1;

    // Check for Sweet Spot intervals
    const ssMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)\s*分鐘.*Sweet\s*Spot/i);

    if (ssMatch) {
        const reps = parseInt(ssMatch[1]);
        const minutes = parseInt(ssMatch[2]);

        // Warmup - 20% of total
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.15),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });

        // Sweet Spot intervals
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
                    targetType: { workoutTargetTypeId: 6, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: 88,
                    targetValueTwo: 94,
                    zoneNumber: 4
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 4, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 300,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ]
        });

        // Cooldown
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 1, conditionTypeKey: 'lap.button' },
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
    } else {
        // Simple distance ride (Z2)
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.1),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.8),
            targetType: { workoutTargetTypeId: 4, workoutTargetTypeKey: 'heart.rate.zone' },
            zoneNumber: 2
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.1),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
    }

    return steps;
}

// Generate run workout steps
function generateRunSteps(totalDistance, content) {
    const steps = [];
    let stepOrder = 1;

    // Check for interval pattern like "8x1km" or "6x1.2km"
    const intervalMatch = content.match(/(\d+)\s*[xX×]\s*([\d.]+)\s*km/i);

    if (intervalMatch) {
        const reps = parseInt(intervalMatch[1]);
        const distanceKm = parseFloat(intervalMatch[2]);
        const intervalDistance = distanceKm * 1000;

        // Warmup
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 3000,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });

        // Intervals
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
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'pace.zone' },
                    zoneNumber: 4
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 4, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 90,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ]
        });

        // Cooldown
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
    } else if (content.includes('節奏跑') || content.includes('T配速')) {
        // Tempo run
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: totalDistance - 4000,
            targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'pace.zone' },
            zoneNumber: 3
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
    } else {
        // Easy/long run
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.1),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.8),
            targetType: { workoutTargetTypeId: 4, workoutTargetTypeKey: 'heart.rate.zone' },
            zoneNumber: 2
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(totalDistance * 0.1),
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
        });
    }

    return steps;
}

// Show workout modal
// overrideDate: if provided, the workouts will be scheduled for this date instead of training's original date
function showWorkoutModal(dayIndex, overrideDate = null) {
    console.log('showWorkoutModal called with index:', dayIndex, 'overrideDate:', overrideDate);
    window.currentWorkoutDayIndex = dayIndex;
    window.currentWorkoutOverrideDate = overrideDate;
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
            ${isOverride ? `<div class="scheduled-date-notice">📅 匯入日期：<strong>${scheduledDateStr}</strong>（今日）</div>` : ''}
            <div class="training-description">${training.content}</div>
    `;

    if (workouts.length === 0) {
        html += `<div class="no-workout">此日無訓練內容</div>`;
    } else {
        workouts.forEach((workout, idx) => {
            const typeLabel = { swim: '游泳', bike: '自行車', run: '跑步' }[workout.type];
            const typeColor = { swim: 'var(--swim-color)', bike: 'var(--bike-color)', run: 'var(--run-color)' }[workout.type];

            const escapedName = workout.data.workoutName.replace(/'/g, "\\'").replace(/"/g, '\\"');
            html += `
                <div class="workout-section" style="border-left: 4px solid ${typeColor}">
                    <div class="workout-header">
                        <img src="images/${workout.type === 'swim' ? 'swim' : workout.type === 'bike' ? 'cycling' : 'run'}.png" class="workout-type-icon" alt="${typeLabel}">
                        <span class="workout-type-label">${typeLabel}</span>
                    </div>
                    <div class="workout-name">${workout.data.workoutName}</div>
                    <div class="workout-desc">${workout.data.description}</div>
                    <div class="workout-stats">
                        <span>距離: ${(workout.data.estimatedDistanceInMeters / 1000).toFixed(1)} km</span>
                        <span>預估時間: ${Math.round(workout.data.estimatedDurationInSecs / 60)} 分鐘</span>
                    </div>
                    <details class="workout-json-details">
                        <summary>查看 JSON</summary>
                        <textarea class="workout-json" id="workout-json-${idx}" rows="12">${JSON.stringify(workout.data, null, 2)}</textarea>
                        <div class="json-actions">
                            <button class="btn-copy" onclick="copyWorkoutJson(${idx}, this)">複製 JSON</button>
                            <button class="btn-download" onclick="downloadWorkoutJson(${idx}, '${escapedName}')">下載 .json</button>
                        </div>
                    </details>
                </div>
            `;
        });
    }

    // Garmin Connect section - Direct import (login + import in one step)
    html += `
            <div class="garmin-section">
                <h4>匯入 Garmin Connect</h4>
                <div class="garmin-manual-note">
                    <p><strong>💡 建議方式：</strong>使用上方「複製 JSON」或「下載 .json」，然後到 <a href="https://connect.garmin.com/modern/workouts" target="_blank">Garmin Connect 網站</a> 手動匯入</p>
                </div>
                ${workouts.length > 0 ? `
                    <details class="garmin-login-details">
                        <summary>自動匯入（實驗性功能）</summary>
                        <div class="garmin-login-form" id="garminLoginForm">
                            <p class="garmin-warning">⚠️ Garmin 可能會封鎖自動登入，如失敗請使用手動匯入</p>
                            <input type="email" id="garminEmail" placeholder="Garmin Email" class="garmin-input">
                            <input type="password" id="garminPassword" placeholder="密碼" class="garmin-input">
                            <button class="btn-garmin-import" onclick="directImportToGarmin(${dayIndex})">
                                登入並匯入訓練
                            </button>
                        </div>
                    </details>
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
function closeWorkoutModal() {
    const modal = document.getElementById('workoutModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Copy workout JSON to clipboard
function copyWorkoutJson(idx, btn) {
    const textarea = document.getElementById(`workout-json-${idx}`);
    textarea.select();
    document.execCommand('copy');

    const originalText = btn.textContent;
    btn.textContent = '已複製!';
    btn.classList.add('copied');
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('copied');
    }, 2000);
}

// Download workout JSON as file
function downloadWorkoutJson(idx, filename) {
    const textarea = document.getElementById(`workout-json-${idx}`);
    const json = textarea.value;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================
// Garmin Connect Integration
// ============================================

const GARMIN_SESSION_KEY = 'garmin_session_id';

// Get Garmin session from localStorage
function getGarminSession() {
    return localStorage.getItem(GARMIN_SESSION_KEY);
}

// Set Garmin session to localStorage
function setGarminSession(sessionId) {
    localStorage.setItem(GARMIN_SESSION_KEY, sessionId);
}

// Clear Garmin session
function clearGarminSession() {
    localStorage.removeItem(GARMIN_SESSION_KEY);
}

// Update Garmin status message
function updateGarminStatus(message, isError = false) {
    const statusEl = document.getElementById('garminStatus');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = `garmin-status ${isError ? 'error' : 'success'}`;
        statusEl.style.display = message ? 'block' : 'none';
    }
}

// Login to Garmin Connect
async function garminLogin() {
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

            // Refresh modal to show logged-in state
            setTimeout(() => {
                const currentIndex = window.currentWorkoutDayIndex;
                if (currentIndex !== undefined) {
                    showWorkoutModal(currentIndex);
                }
            }, 1000);
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
async function garminLogout() {
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

    // Refresh modal
    setTimeout(() => {
        const currentIndex = window.currentWorkoutDayIndex;
        if (currentIndex !== undefined) {
            showWorkoutModal(currentIndex);
        }
    }, 500);
}

// Import single workout to Garmin
async function importWorkoutToGarmin(workoutData, scheduledDate) {
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
async function importAllToGarmin(dayIndex) {
    const training = trainingData[dayIndex];
    // Use override date if set (from today's training section)
    const overrideDate = window.currentWorkoutOverrideDate;
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
async function directImportToGarmin(dayIndex) {
    const email = document.getElementById('garminEmail')?.value;
    const password = document.getElementById('garminPassword')?.value;

    if (!email || !password) {
        updateGarminStatus('請輸入 Email 和密碼', true);
        return;
    }

    const training = trainingData[dayIndex];
    const overrideDate = window.currentWorkoutOverrideDate;
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

// Store current workout day index for modal refresh
window.currentWorkoutDayIndex = undefined;

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
    }
});

// Display Today's Training
function displayTodayTraining() {
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

    if (!todayLabel) return;

    const today = new Date();
    const trainingStartDate = new Date('2026-01-12');
    const trainingEndDate = new Date('2026-04-12');

    let training = null;
    let trainingIndex = -1;
    let isRandom = false;

    // Check if today is within training period
    if (today >= trainingStartDate && today <= trainingEndDate) {
        // Find today's training
        const todayStr = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        trainingIndex = trainingData.findIndex(d => {
            const trainingDate = new Date(d.date);
            return trainingDate.toDateString() === today.toDateString();
        });

        if (trainingIndex >= 0) {
            training = trainingData[trainingIndex];
            todayLabel.textContent = '今日訓練';
        }
    }

    // If not in training period or no training found, show random from 建構期
    if (!training) {
        isRandom = true;
        // Filter to 建構期 only, exclude rest days
        const buildPhaseTrainings = trainingData.filter(d =>
            d.phase === '建構期' && d.intensity !== '休息' && (d.swim || d.bike || d.run)
        );
        const randomTraining = buildPhaseTrainings[Math.floor(Math.random() * buildPhaseTrainings.length)];
        training = randomTraining;
        // Find the index in the original array
        trainingIndex = trainingData.findIndex(d => d.date === randomTraining.date);
        todayLabel.textContent = '今日訓練預覽';
    }

    if (training) {
        // Display training info
        todayPhase.textContent = training.phase;
        todayPhase.className = 'today-phase phase-' + training.phase;

        todayIntensity.textContent = training.intensity;
        todayIntensity.className = 'today-intensity intensity-' + training.intensity;

        todayDescription.textContent = training.content;

        // Display stats
        if (training.swim) {
            todaySwim.innerHTML = '<span class="stat-icon">🏊</span> ' + training.swim + ' km';
            todaySwim.style.display = 'inline-flex';
        } else {
            todaySwim.style.display = 'none';
        }

        if (training.bike) {
            todayBike.innerHTML = '<span class="stat-icon">🚴</span> ' + training.bike + ' km';
            todayBike.style.display = 'inline-flex';
        } else {
            todayBike.style.display = 'none';
        }

        if (training.run) {
            todayRun.innerHTML = '<span class="stat-icon">🏃</span> ' + training.run + ' km';
            todayRun.style.display = 'inline-flex';
        } else {
            todayRun.style.display = 'none';
        }

        if (training.hours) {
            todayHours.innerHTML = '<span class="stat-icon">⏱</span> ' + training.hours + ' h';
            todayHours.style.display = 'inline-flex';
        } else {
            todayHours.style.display = 'none';
        }

        // Display note if random
        if (isRandom) {
            todayNote.textContent = '※ 未到訓練日，隨機顯示';
            todayNote.style.display = 'block';
        } else {
            todayNote.style.display = 'none';
        }

        // Add view/import button if training has workouts
        if (todayActions && trainingIndex >= 0 && (training.swim || training.bike || training.run)) {
            // Only override date for random preview (not actual today's training)
            if (isRandom) {
                const todayISO = today.toISOString().split('T')[0];
                todayActions.innerHTML = `
                    <button class="btn-today-workout" onclick="showWorkoutModal(${trainingIndex}, '${todayISO}')">
                        <span class="btn-icon">📋</span>
                        查看訓練 / 匯入 Garmin
                    </button>
                `;
            } else {
                todayActions.innerHTML = `
                    <button class="btn-today-workout" onclick="showWorkoutModal(${trainingIndex})">
                        <span class="btn-icon">📋</span>
                        查看訓練 / 匯入 Garmin
                    </button>
                `;
            }
            todayActions.style.display = 'block';
        } else if (todayActions) {
            todayActions.style.display = 'none';
        }
    }
}
