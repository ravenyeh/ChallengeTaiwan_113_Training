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

// Pre-generated workouts cache
let generatedWorkouts = [];

// User settings (stored in localStorage)
let userFTP = localStorage.getItem('userFTP') ? parseInt(localStorage.getItem('userFTP')) : 200;
let userWeight = localStorage.getItem('userWeight') ? parseFloat(localStorage.getItem('userWeight')) : 70; // 體重 kg
let userRunPace = localStorage.getItem('userRunPace') || '6:00'; // 馬拉松配速 min/km
let userSwimCSS = localStorage.getItem('userSwimCSS') || '2:00'; // CSS 游泳配速 min/100m
// Advanced settings (optional)
let userRunVO2max = localStorage.getItem('userRunVO2max') ? parseFloat(localStorage.getItem('userRunVO2max')) : null; // 跑步 VO2max
let userBikeVO2max = localStorage.getItem('userBikeVO2max') ? parseFloat(localStorage.getItem('userBikeVO2max')) : null; // 自行車 VO2max

// Calculate power-to-weight ratio (W/kg)
function getPowerToWeightRatio() {
    if (userFTP > 0 && userWeight > 0) {
        return (userFTP / userWeight).toFixed(2);
    }
    return 0;
}

// Toggle advanced settings panel
function toggleAdvancedSettings() {
    const panel = document.getElementById('advancedSettingsPanel');
    const icon = document.getElementById('advancedToggleIcon');
    if (panel && icon) {
        panel.classList.toggle('expanded');
        icon.classList.toggle('expanded');
    }
}

// Generate all workouts at initialization
function generateAllWorkouts() {
    generatedWorkouts = trainingData.map((day, index) => {
        // Skip rest days
        if (day.intensity === '休息' || day.hours === 0) {
            return null;
        }

        const dateObj = new Date(day.date);
        const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

        return {
            dayIndex: index,
            workouts: buildWorkoutsForDay(day, index),
            scheduledDate: dateStr
        };
    });

    const validWorkouts = generatedWorkouts.filter(w => w !== null);
    console.log(`Generated ${validWorkouts.length} workout days with FTP: ${userFTP}W`);
}

// Build all workouts for a training day (swim, bike, run)
function buildWorkoutsForDay(day, dayIndex) {
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

// Parse pace string (mm:ss) to seconds
function parsePaceToSeconds(pace) {
    const parts = pace.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1] || 0);
}

// Format seconds to pace string (mm:ss)
function formatSecondsToPace(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

// Build workout description with user-specific paces
function buildWorkoutDescription(day, sport) {
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

        // Append power zones if content mentions them
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
            '輕鬆跑': formatSecondsToPace(basePaceSeconds * 1.15),  // +15%
            '長跑': formatSecondsToPace(basePaceSeconds * 1.10),    // +10%
            '節奏跑': formatSecondsToPace(basePaceSeconds * 0.95),  // -5%
            '間歇': formatSecondsToPace(basePaceSeconds * 0.85),    // -15%
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
            '恢復游': formatSecondsToPace(basePaceSeconds * 1.20),   // +20%
            '技術課': formatSecondsToPace(basePaceSeconds * 1.15),   // +15%
            '有氧游': formatSecondsToPace(basePaceSeconds * 1.05),   // +5%
            '配速訓練': userSwimCSS,                                  // CSS
            '間歇': formatSecondsToPace(basePaceSeconds * 0.95)      // -5%
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

// Save user settings and regenerate workouts
function saveUserSettings(settings) {
    if (settings.ftp !== undefined) {
        userFTP = parseInt(settings.ftp) || 200;
        localStorage.setItem('userFTP', userFTP);
    }
    if (settings.weight !== undefined) {
        userWeight = parseFloat(settings.weight) || 70;
        localStorage.setItem('userWeight', userWeight);
    }
    if (settings.runPace !== undefined) {
        userRunPace = settings.runPace || '6:00';
        localStorage.setItem('userRunPace', userRunPace);
    }
    if (settings.swimCSS !== undefined) {
        userSwimCSS = settings.swimCSS || '2:00';
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
    // Regenerate workouts with new settings
    generateAllWorkouts();
    updateSettingsDisplay();

    // Refresh schedule table to show updated pace/power values
    populateSchedule();

    // Update today's training display
    displayTodayTraining();

    const pwr = getPowerToWeightRatio();
    console.log(`Settings updated - FTP: ${userFTP}W, Weight: ${userWeight}kg, PWR: ${pwr}W/kg, Run: ${userRunPace}/km, Swim CSS: ${userSwimCSS}/100m, Run VO2max: ${userRunVO2max || 'N/A'}, Bike VO2max: ${userBikeVO2max || 'N/A'}`);

    // Show confirmation to user
    showSettingsSavedMessage();
}

// Close settings modal (defined early for use in showSettingsSavedMessage)
function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Show settings saved confirmation message and update summary banner
function showSettingsSavedMessage() {
    // Close settings modal
    closeSettingsModal();

    // Update and show settings summary banner
    const banner = document.getElementById('settingsSummaryBanner');
    const summaryValues = document.getElementById('summaryValues');

    if (banner && summaryValues) {
        const pwr = getPowerToWeightRatio();
        summaryValues.innerHTML = `
            <span class="value-item">
                <img src="images/cycling.png" alt="FTP">
                FTP: ${userFTP}W
            </span>
            <span class="value-item">
                <img src="images/cycling.png" alt="體重">
                體重: ${userWeight}kg (${pwr}W/kg)
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

        // Scroll to show the banner
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Show brief alert confirmation
    alert('課表更新完成！');
}

// Update settings display
function updateSettingsDisplay() {
    const ftpInput = document.getElementById('userFTP');
    const weightInput = document.getElementById('userWeight');
    const runPaceInput = document.getElementById('userRunPace');
    const swimCSSInput = document.getElementById('userSwimCSS');
    const pwrDisplay = document.getElementById('pwrDisplay');
    // Advanced settings
    const runVO2maxInput = document.getElementById('userRunVO2max');
    const bikeVO2maxInput = document.getElementById('userBikeVO2max');

    if (ftpInput) ftpInput.value = userFTP;
    if (weightInput) weightInput.value = userWeight;
    if (runPaceInput) runPaceInput.value = userRunPace;
    if (swimCSSInput) swimCSSInput.value = userSwimCSS;
    if (pwrDisplay) pwrDisplay.textContent = getPowerToWeightRatio();
    // Advanced settings
    if (runVO2maxInput && userRunVO2max) runVO2maxInput.value = userRunVO2max;
    if (bikeVO2maxInput && userBikeVO2max) bikeVO2maxInput.value = userBikeVO2max;
}

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
    // Generate all workouts with user settings
    generateAllWorkouts();
    updateSettingsDisplay();

    // Show settings summary banner if user has saved settings
    initSettingsSummaryBanner();

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
// Uses pre-generated workouts when available for better performance
function convertToGarminWorkout(training, index, overrideDate = null) {
    // Try to use pre-generated workout
    const preGenerated = generatedWorkouts[index];
    if (preGenerated && preGenerated.workouts && !overrideDate) {
        // Return deep copy of pre-generated workouts
        return JSON.parse(JSON.stringify(preGenerated.workouts));
    }

    // Fallback: Generate on demand (for override dates or if not pre-generated)
    return buildWorkoutsForDay(trainingData[index], index, overrideDate);
}

// Build workouts for a day with optional override date (for on-demand generation)
function buildWorkoutsForDayWithDate(day, dayIndex, overrideDate) {
    const workouts = [];
    const dateObj = overrideDate ? new Date(overrideDate) : new Date(day.date);
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
        targetValueOne: step.targetValueOne !== undefined ? step.targetValueOne : null,
        targetValueTwo: step.targetValueTwo !== undefined ? step.targetValueTwo : null
    };

    // Add secondary target if present (e.g., cadence for bike workouts)
    if (step.secondaryTargetType) {
        formattedStep.secondaryTargetType = step.secondaryTargetType;
        formattedStep.secondaryTargetValueOne = step.secondaryTargetValueOne;
        formattedStep.secondaryTargetValueTwo = step.secondaryTargetValueTwo;
    }

    // Add description if present
    if (step.description) {
        formattedStep.description = step.description;
    }

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

// Calculate swim pace target in seconds per 100m
function getSwimPaceTarget(zoneType) {
    if (!userSwimCSS) return null;
    const cssSeconds = parsePaceToSeconds(userSwimCSS);
    const paceMultipliers = {
        'recovery': 1.20,    // 恢復游 +20%
        'technique': 1.15,   // 技術 +15%
        'aerobic': 1.05,     // 有氧 +5%
        'threshold': 1.00,   // CSS配速
        'interval': 0.95,    // 間歇 -5%
        'sprint': 0.90       // 衝刺 -10%
    };
    const multiplier = paceMultipliers[zoneType] || 1.0;
    return Math.round(cssSeconds * multiplier);
}

// Convert swim pace (seconds per 100m) to meters per second for Garmin API
function swimPaceToMetersPerSecond(paceSecondsPer100m) {
    return 100 / paceSecondsPer100m;
}

// Create swim pace target object for Garmin workout steps
// fastPace and slowPace are in seconds per 100m
function createSwimPaceTarget(fastPaceSeconds, slowPaceSeconds) {
    return {
        targetType: { workoutTargetTypeId: 6, workoutTargetTypeKey: 'pace.zone' },
        targetValueOne: swimPaceToMetersPerSecond(slowPaceSeconds),  // slower pace (lower m/s)
        targetValueTwo: swimPaceToMetersPerSecond(fastPaceSeconds)   // faster pace (higher m/s)
    };
}

// Get swim pace zones based on CSS (in seconds per 100m)
function getSwimPaceZones() {
    const cssSeconds = userSwimCSS ? parsePaceToSeconds(userSwimCSS) : 120; // default 2:00/100m
    return {
        recovery: Math.round(cssSeconds * 1.20),    // +20%
        technique: Math.round(cssSeconds * 1.15),   // +15%
        aerobic: Math.round(cssSeconds * 1.05),     // +5%
        threshold: cssSeconds,                       // CSS
        interval: Math.round(cssSeconds * 0.95),    // -5%
        sprint: Math.round(cssSeconds * 0.90)       // -10%
    };
}

// Format swim pace from seconds to min:ss format
function formatSwimPace(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Generate swim workout steps
function generateSwimSteps(totalDistance, content) {
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

        // Warmup: 混合式熱身
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: Math.round(warmupDistance * 0.5),
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 15),
            description: `輕鬆游熱身 @ ${formatSwimPace(zones.recovery)}/100m`
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
                        ...createSwimPaceTarget(zones.technique - 10, zones.technique + 15),
                        description: '技術練習 (划手/踢水)'
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

        // Pre-set: 漸速游
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
                    ...createSwimPaceTarget(zones.sprint, zones.recovery),
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
                    ...createSwimPaceTarget(zones.threshold - 5, zones.threshold + 5),
                    description: `主課表 ${distance}m @ ${formatSwimPace(zones.threshold)}/100m (CSS)`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: restTime,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: `${reps}x${distance}m 主課表 @ ${formatSwimPace(zones.threshold)}/100m (休息${restTime}秒)`
        });

        // Cooldown
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDistance,
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 20),
            description: `緩和游 @ ${formatSwimPace(zones.recovery)}/100m`
        });

    } else if (content.includes('技術課') || content.includes('技術訓練')) {
        // Technical/Drill focused session
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 300,
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 15),
            description: `輕鬆游熱身 @ ${formatSwimPace(zones.recovery)}/100m`
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
                    ...createSwimPaceTarget(zones.technique - 10, zones.technique + 20),
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
                    ...createSwimPaceTarget(zones.technique - 10, zones.technique + 15),
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
                    ...createSwimPaceTarget(zones.aerobic - 5, zones.aerobic + 10),
                    description: `專注划頻與流線型 @ ${formatSwimPace(zones.aerobic)}/100m`
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
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 20),
            description: `緩和游 @ ${formatSwimPace(zones.recovery)}/100m`
        });

    } else if (content.includes('恢復') || content.includes('輕鬆')) {
        // Recovery swim
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 200,
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 20),
            description: `輕鬆游熱身 @ ${formatSwimPace(zones.recovery)}/100m`
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: totalDistance - 400,
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 20),
            description: `恢復游 @ ${formatSwimPace(zones.recovery)}/100m - 保持輕鬆划頻`
        });
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 200,
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 25),
            description: `緩和游 @ ${formatSwimPace(zones.recovery)}/100m`
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
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 15),
            description: `混合式熱身 @ ${formatSwimPace(zones.recovery)}/100m (自由式為主)`
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
                    ...createSwimPaceTarget(zones.aerobic - 5, zones.aerobic + 10),
                    description: `有氧游 @ ${formatSwimPace(zones.aerobic)}/100m`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: 15,
                    targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' }
                }
            ],
            description: `${reps}x100m 有氧游 @ ${formatSwimPace(zones.aerobic)}/100m`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: cooldownDist,
            ...createSwimPaceTarget(zones.recovery - 10, zones.recovery + 20),
            description: `緩和游 @ ${formatSwimPace(zones.recovery)}/100m`
        });
    }

    return steps;
}

// Get FTP-based power zones
function getBikePowerZones() {
    const ftp = userFTP || 200;
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

// Generate bike workout steps
function generateBikeSteps(totalDistance, content) {
    const steps = [];
    let stepOrder = 1;
    const zones = getBikePowerZones();
    const ftp = userFTP || 200;

    // Check for Sweet Spot intervals
    const ssMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)\s*分鐘.*Sweet\s*Spot/i);
    // Check for FTP intervals
    const ftpMatch = content.match(/(\d+)\s*[xX×]\s*(\d+)\s*分鐘.*FTP/i);
    // Check for VO2max intervals
    const vo2Match = content.match(/(\d+)\s*[xX×]\s*(\d+)\s*分鐘.*VO2/i);

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
            endConditionValue: 600, // 10 min
            targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: 'no.target' },
            description: `熱身 10分鐘 - 漸進提升至 ${zones.Z2.low}W`
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
                    description: `高迴轉激活 ${zones.Z3.low}-${zones.Z3.high}W @100-110rpm`
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
                    description: `Sweet Spot ${zones.SS.low}-${zones.SS.high}W (${Math.round(zones.SS.low/ftp*100)}-${Math.round(zones.SS.high/ftp*100)}% FTP) @85-95rpm`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: restMinutes * 60,
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z1.low,
                    targetValueTwo: zones.Z1.high,
                    description: `恢復 ${restMinutes}分鐘 @ ${zones.Z1.low}-${zones.Z1.high}W`
                }
            ],
            description: `${reps}x${minutes}分鐘 Sweet Spot ${zones.SS.low}-${zones.SS.high}W`
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
            endConditionValue: 900, // 15 min
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
                    description: `漸速 30秒 @ ${zones.Z4.low}-${zones.Z4.high}W`
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
                    description: `FTP 間歇 ${zones.Z4.low}-${ftp}W (90-100% FTP) @85-95rpm`
                },
                {
                    stepOrder: 2,
                    stepType: { stepTypeId: 5, stepTypeKey: 'rest' },
                    endCondition: { conditionTypeId: 2, conditionTypeKey: 'time' },
                    endConditionValue: Math.round(minutes * 60 * 0.5),
                    targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
                    targetValueOne: zones.Z1.low,
                    targetValueTwo: zones.Z2.low,
                    description: `恢復 @ ${zones.Z1.low}-${zones.Z2.low}W`
                }
            ],
            description: `${reps}x${minutes}分鐘 FTP ${zones.Z4.low}-${ftp}W`
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
        const warmupDist = 10000; // 10km
        const cooldownDist = 5000; // 5km
        const mainDist = totalDistance - warmupDist - cooldownDist;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: warmupDist,
            targetType: { workoutTargetTypeId: 2, workoutTargetTypeKey: 'power.zone' },
            targetValueOne: zones.Z1.low,
            targetValueTwo: zones.Z2.low,
            description: `熱身 10km @ ${zones.Z1.low}-${zones.Z2.low}W`
        });

        // Main aerobic blocks
        const blockDistance = 20000; // 20km blocks
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
                description: `Z2 耐力區 ${zones.Z2.low}-${zones.Z2.high}W (${i+1}/${blocks})`
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
                description: `Z2 耐力區 ${zones.Z2.low}-${zones.Z2.high}W`
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
            description: `恢復騎 ${zones.Z1.low}-${zones.Z1.high}W - 保持高迴轉`
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
            description: `Z2 有氧騎 ${zones.Z2.low}-${zones.Z2.high}W @85-95rpm`
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
                    description: `節奏提升 ${zones.Z3.low}-${zones.Z3.high}W`
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
            description: `3x3分鐘 節奏 ${zones.Z3.low}-${zones.Z3.high}W`
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

// Convert pace (seconds per km) to meters per second for Garmin API
function paceToMetersPerSecond(paceSecondsPerKm) {
    return 1000 / paceSecondsPerKm;
}

// Get marathon pace-based run zones (in seconds per km)
function getRunPaceZones() {
    const marathonPaceSeconds = userRunPace ? parsePaceToSeconds(userRunPace) : 360; // default 6:00/km
    return {
        recovery: { pace: Math.round(marathonPaceSeconds * 1.25), name: '恢復跑' },    // +25%
        easy: { pace: Math.round(marathonPaceSeconds * 1.15), name: '輕鬆跑' },        // +15%
        long: { pace: Math.round(marathonPaceSeconds * 1.10), name: '長跑配速' },      // +10%
        marathon: { pace: marathonPaceSeconds, name: '馬拉松配速' },                   // MP
        tempo: { pace: Math.round(marathonPaceSeconds * 0.95), name: '節奏跑' },       // -5%
        threshold: { pace: Math.round(marathonPaceSeconds * 0.90), name: '閾值跑' },   // -10%
        interval: { pace: Math.round(marathonPaceSeconds * 0.85), name: '間歇配速' },  // -15%
        rep: { pace: Math.round(marathonPaceSeconds * 0.80), name: '重複跑' }          // -20%
    };
}

// Create pace target object for Garmin workout steps
// fastPace and slowPace are in seconds per km
function createPaceTarget(fastPaceSeconds, slowPaceSeconds) {
    return {
        targetType: { workoutTargetTypeId: 6, workoutTargetTypeKey: 'pace.zone' },
        targetValueOne: paceToMetersPerSecond(slowPaceSeconds),  // slower pace (lower m/s)
        targetValueTwo: paceToMetersPerSecond(fastPaceSeconds)   // faster pace (higher m/s)
    };
}

// Generate run workout steps
function generateRunSteps(totalDistance, content) {
    const steps = [];
    let stepOrder = 1;
    const zones = getRunPaceZones();
    const mp = userRunPace || '6:00';

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

        // Warmup with dynamic stretching
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `熱身慢跑 2km @ ${formatSecondsToPace(zones.easy.pace)}/km`
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
                    description: `間歇 ${intervalDistance >= 1000 ? (intervalDistance/1000) + 'km' : intervalDistance + 'm'} @ ${formatSecondsToPace(zones.interval.pace)}/km`
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
            description: `${reps}x${intervalDistance >= 1000 ? (intervalDistance/1000) + 'km' : intervalDistance + 'm'} @ ${formatSecondsToPace(zones.interval.pace)}/km`
        });

        // Cooldown
        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: 2000,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `緩和慢跑 2km @ ${formatSecondsToPace(zones.recovery.pace)}/km`
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
            description: `熱身 2km @ ${formatSecondsToPace(zones.easy.pace)}/km`
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
            description: `節奏跑 ${tempoDistance/1000}km @ ${formatSecondsToPace(zones.tempo.pace)}/km (馬拉松配速-5%)`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 2, stepTypeKey: 'cooldown' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: totalDistance - tempoDistance - 2300,
            ...createPaceTarget(zones.recovery.pace - 15, zones.recovery.pace + 30),
            description: `緩和跑 @ ${formatSecondsToPace(zones.recovery.pace)}/km`
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
            description: `前半段 ${(firstHalf/1000).toFixed(1)}km @ ${formatSecondsToPace(zones.long.pace)}/km`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: secondHalf,
            ...createPaceTarget(zones.marathon.pace - 10, zones.marathon.pace + 10),
            description: `後半段 ${(secondHalf/1000).toFixed(1)}km @ ${formatSecondsToPace(zones.marathon.pace)}/km (馬拉松配速)`
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
            endConditionValue: 300, // 5 min
            ...createPaceTarget(zones.long.pace, zones.long.pace + 30),
            description: `騎轉跑過渡期 5分鐘 - 適應腿部感覺`
        });

        // Main brick run - start conservative then build
        const firstKm = 1000;
        const mainPart = totalDistance - firstKm - 1000;

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: firstKm,
            ...createPaceTarget(zones.long.pace, zones.long.pace + 20),
            description: `第1km 保守起步 @ ${formatSecondsToPace(zones.long.pace + 15)}/km`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: mainPart,
            ...createPaceTarget(zones.marathon.pace - 10, zones.marathon.pace + 10),
            description: `主課表 @ ${formatSecondsToPace(zones.marathon.pace)}/km 比賽配速`
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
            description: `恢復跑 @ ${formatSecondsToPace(zones.recovery.pace)}/km - 保持輕鬆對話配速`
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
        const mainDist = totalDistance - warmupDist - cooldownDist - 400; // -400 for strides

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 1, stepTypeKey: 'warmup' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: warmupDist,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `熱身 ${(warmupDist/1000).toFixed(1)}km @ ${formatSecondsToPace(zones.easy.pace)}/km`
        });

        steps.push({
            stepOrder: stepOrder++,
            stepType: { stepTypeId: 3, stepTypeKey: 'interval' },
            endCondition: { conditionTypeId: 3, conditionTypeKey: 'distance' },
            endConditionValue: mainDist,
            ...createPaceTarget(zones.easy.pace - 15, zones.easy.pace + 15),
            description: `輕鬆跑 ${(mainDist/1000).toFixed(1)}km @ ${formatSecondsToPace(zones.easy.pace)}/km`
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

// ===== Settings Modal Functions =====

// Initialize settings summary banner on page load
function initSettingsSummaryBanner() {
    // Check if user has saved settings (not default values)
    const savedFTP = localStorage.getItem('userFTP');
    const savedRunPace = localStorage.getItem('userRunPace');
    const savedSwimCSS = localStorage.getItem('userSwimCSS');

    // Show banner if any setting has been saved
    if (savedFTP || savedRunPace || savedSwimCSS) {
        const banner = document.getElementById('settingsSummaryBanner');
        const summaryValues = document.getElementById('summaryValues');

        if (banner && summaryValues) {
            const pwr = getPowerToWeightRatio();
            summaryValues.innerHTML = `
                <span class="value-item">
                    <img src="images/cycling.png" alt="FTP">
                    FTP: ${userFTP}W
                </span>
                <span class="value-item">
                    <img src="images/cycling.png" alt="體重">
                    體重: ${userWeight}kg (${pwr}W/kg)
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
}

// Open settings modal
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Close settings modal when clicking outside
document.addEventListener('click', (e) => {
    const settingsModal = document.getElementById('settingsModal');
    if (e.target === settingsModal) {
        closeSettingsModal();
    }
});

// Extend Escape key handler for settings modal
(function() {
    const originalKeyHandler = document.onkeydown;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const settingsModal = document.getElementById('settingsModal');
            if (settingsModal && settingsModal.classList.contains('show')) {
                closeSettingsModal();
            }
        }
    });
})();
