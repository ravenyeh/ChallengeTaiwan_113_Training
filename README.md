# 2026 Challenge Taiwan 113 訓練計劃

> **Every Athlete, Every Challenge**
> 在台東的山海之間，完成屬於自己的挑戰

16 週鐵人三項訓練計劃網站，專為 2026 年 Challenge Taiwan 113 半程超級鐵人三項賽事設計。

---

## 賽事資訊

| 項目 | 內容 |
|------|------|
| 賽事名稱 | Challenge Taiwan 113 |
| 日期 | 2026 年 4 月 25 日 |
| 地點 | 台東 |
| 游泳 | 1.9 km |
| 自行車 | 90 km |
| 跑步 | 21.1 km |

---

## 功能特色

- **16 週訓練計劃** - 完整的週期化訓練安排
- **比賽倒數計時** - 即時顯示距離比賽剩餘時間
- **每日訓練顯示** - 自動顯示當天訓練內容
- **訓練週期圖表** - Chart.js 視覺化呈現訓練量
- **Garmin Connect 整合** - 直接匯入訓練至 Garmin 手錶
- **響應式設計** - 完整支援桌面與行動裝置

---

## Challenge Family 品牌配色

| 用途 | 顏色名稱 | HEX | 預覽 |
|------|----------|-----|------|
| 主色 | Challenge Red | `#E2001A` | ![#E2001A](https://via.placeholder.com/20/E2001A/E2001A) |
| 次要色 | Navy | `#0F193C` | ![#0F193C](https://via.placeholder.com/20/0F193C/0F193C) |
| 強調色 | Cyan | `#63D9ED` | ![#63D9ED](https://via.placeholder.com/20/63D9ED/63D9ED) |
| 橙色 | Orange | `#FF9405` | ![#FF9405](https://via.placeholder.com/20/FF9405/FF9405) |
| 綠色 | Green | `#05F06B` | ![#05F06B](https://via.placeholder.com/20/05F06B/05F06B) |

### 運動顏色對應

| 運動 | 顏色 | HEX |
|------|------|-----|
| 游泳 | Cyan | `#63D9ED` |
| 自行車 | Orange | `#FF9405` |
| 跑步 | Green | `#05F06B` |

---

## 技術架構

```
├── index.html          # 主頁面
├── styles.css          # 樣式表 (Challenge Family 品牌配色)
├── script.js           # 訓練計劃邏輯與互動
├── api/
│   └── garmin/         # Garmin Connect API (Vercel Functions)
│       ├── login.js
│       ├── logout.js
│       ├── import.js
│       └── workout.js
├── images/             # 運動圖示
└── vercel.json         # Vercel 部署配置
```

### 使用技術

- HTML5 / CSS3 / JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/) - 資料視覺化
- [Vercel Serverless Functions](https://vercel.com/docs/functions) - Garmin API 整合

---

## 本地開發

```bash
# 複製專案
git clone https://github.com/ravenyeh/ChallengeTaiwan_113_Training.git
cd ChallengeTaiwan_113_Training

# 安裝依賴
npm install

# 啟動開發伺服器
npx serve .
```

開啟瀏覽器訪問 `http://localhost:3000`

---

## 部署

本專案支援一鍵部署至 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ravenyeh/ChallengeTaiwan_113_Training)

---

## 授權聲明

本專案僅供個人訓練使用。

- Challenge Family® 及相關商標為 Challenge Family 所有
- Garmin® 及 Garmin Connect™ 為 Garmin Ltd. 所有

---

Made with ❤️ for triathlon
