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

- **雙課表選擇** - AI 生成課表 (16週) 與 Garmin TRI 課表 (15週) 可自由切換
- **課表比較分析** - 詳細比較兩份課表的訓練量、強度分布、各項目差異
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

## 課表比較

本網站提供兩份不同風格的訓練課表：

| 項目 | AI 生成課表 | Garmin TRI 課表 |
|------|------------|----------------|
| 週數 | 16 週 (1/5 - 4/25) | 15 週 (1/12 - 4/25) |
| 總訓練時數 | ~165 小時 | ~235 小時 |
| 每週平均 | ~10.3 小時 | ~15.7 小時 |
| 訓練風格 | 極化訓練、充分恢復 | 持續性負荷、技術導向 |
| 適合對象 | 時間有限的上班族 | 時間充裕、有經驗的選手 |

詳細比較請點擊主頁「📊 課表比較分析」按鈕查看完整報告。

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
├── comparison.html     # 課表比較分析報告頁面
├── styles.css          # 樣式表 (Challenge Family 品牌配色)
├── script.js           # 訓練計劃邏輯與互動
├── modules/
│   ├── trainingData.js    # AI 生成課表資料 (16週)
│   ├── garminTriData.js   # Garmin TRI 課表資料 (15週)
│   ├── workoutBuilder.js  # Garmin 訓練結構產生器
│   └── settings.js        # 使用者設定與課表管理
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
