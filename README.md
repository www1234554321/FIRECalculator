# 🔥 FIRE 財務自由計算機 (FIRE Calculator)

這是一個精美、強大且高度互動的網頁版 **FIRE (Financial Independence, Retire Early) 財務自由計算機**，採用 React、TypeScript、Tailwind CSS、Recharts 與 Lucide 圖表庫打造。

---

## 🌟 功能亮點

1. **多種 FIRE 模式試算與對比**
   - **Regular FIRE (標準)**: 維持既有生活品質的 4% 安全提款率目標。
   - **Lean FIRE (簡約)**: 精簡開銷 75% 預算，快速邁向自由。
   - **Fat FIRE (富足)**: 提升至 135% 品質生活預算。
   - **Barista FIRE (半退休)**: 配合退休後斜槓/兼職收入試算。
   - **Coast FIRE (躺平)**: 存夠本金靠複利滾動至目標年齡。

2. **蒙地卡羅壓力測試 (Monte Carlo Simulation)**
   - 進行 1,000 次市場波動模擬，計算資產在 30 年退休期間的續航與抗風險成功率。

3. **動態資產累積圖表**
   - 直觀展示總資產成長走勢線與 FIRE 目標線。
   - 切換檢視每年主動儲蓄 (Savings) 與投資複利 (Returns) 來源。

4. **快捷情境預設 & 專屬優化建議**
   - 提供「小資上班族」、「高薪科技族」、「斜槓自由工作者」一鍵載入。
   - 即時產出儲蓄率檢測與加速自由專屬建議。

---

## 🚀 部署至 GitHub Pages (GitHub Pages Deployment)

本專案已設定 GitHub Actions 自動化部署工作流（Workflow），推送程式碼後即可於 `github.io` 網址預覽！

### 設定步驟：
1. 將專案 Push 至您的 GitHub 儲存庫。
2. 前往 GitHub 專案頁面: **Settings** -> **Pages**。
3. 在 **Build and deployment** 下方的 **Source** 選擇 **GitHub Actions**。
4. 當 Actions 執行完畢後，即可於專案提供的 `https://<your-username>.github.io/<your-repo-name>/` 網址存取本計算機。

---

## 🛠 本地開發與構建

```bash
# 安裝依賴套件
npm install

# 啟動本地開發伺服器
npm run dev

# 執行單元測試
npx vitest run

# 打包靜態檔案
npm run build
```
