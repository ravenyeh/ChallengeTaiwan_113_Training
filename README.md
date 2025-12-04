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
- **個人化設定** - 設定 FTP、跑步配速、游泳 CSS，產生客製化訓練強度
- **比賽倒數計時** - 即時顯示距離比賽剩餘時間
- **每日訓練顯示** - 自動顯示當天訓練內容
- **訓練週期圖表** - Chart.js 視覺化呈現訓練量
- **Garmin Connect 整合** - 直接匯入訓練至 Garmin 手錶，含功率/配速強度目標
- **一鍵匯入功能** - 登入後帳號儲存於瀏覽器，之後可直接匯入訓練
- **響應式設計** - 完整支援桌面與行動裝置

---

## Garmin Connect 匯入

本訓練計劃支援直接匯入訓練到 Garmin Connect，方便在手錶上執行結構化訓練。

### 一鍵匯入流程

1. **首次使用**：點擊「查看訓練」後，輸入 Garmin 帳號密碼並點擊「登入並匯入訓練」
2. **帳號儲存**：登入成功後，帳號資訊會儲存在瀏覽器的 localStorage 中
3. **直接匯入**：之後只需點擊「直接匯入訓練」即可一鍵匯入

### 匯入日期邏輯

| 來源 | 匯入日期 |
|------|---------|
| 今日訓練 / 今日訓練預覽 | 今天的日期 |
| 每日訓練計劃表格 | 原本的計劃日期 |

### 支援的訓練類型

- **游泳** - 含配速區間目標（依據 CSS 計算）
- **自行車** - 含功率區間目標（依據 FTP 計算）
- **跑步** - 含配速區間目標（依據馬拉松配速計算）

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
│       ├── workout.js
│       └── workout_api.md  # Garmin Workout API 規格文件
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

## 授權

本專案採用 [MIT License](LICENSE.md) 授權。

### 商標聲明

- Challenge Family® 及相關商標為 Challenge Family 所有
- Garmin® 及 Garmin Connect™ 為 Garmin Ltd. 所有

本專案與 Challenge Family 或 Garmin Ltd. 無任何官方關聯。

---

Made with ❤️ for triathlon
