# gericares — 智慧助行防跌科技之照護應用手冊

本 repo 為靜態網站，可直接用 **GitHub Pages** 免費發佈，無需資料庫或伺服器端程式。

## 資料夾結構

```
/
├── index.html                  手冊首頁
├── assets/
│   ├── css/main.css            全站共用樣式表（含複製保護樣式）
│   └── js/
│       ├── search-data.js      全站搜尋索引資料
│       ├── search.js           搜尋功能（共用）
│       ├── protect.js          複製／右鍵保護腳本（共用）
│       ├── tool-library.js     工具庫頁篩選邏輯（僅此頁使用）
│       └── community-program.js 社區防跌運動計畫工具邏輯（僅此頁使用）
├── apps/
│   ├── environmental-sensing.html   應用類別 A：環境與非接觸式感測應用
│   ├── wearable-devices.html        應用類別 B：穿戴式跌倒偵測裝置應用
│   └── pedaling-device.html         應用類別 C：智慧下肢座式踩踏儀器
├── qa/
│   ├── general.html            居家行動照護 Q&A 衛教手冊（通用版）
│   └── smart-tech.html         居家行動照護 Q&A 衛教手冊（智慧科技版）
├── clinical/
│   └── guide.html              臨床衛教資源：高齡者跌倒預防與行動照護實務手冊
├── policy/
│   └── rental-scheme.html      政策資訊：長照 3.0 智慧科技輔具全租賃新制
├── videos/
│   └── resources.html          影音資源：專家介紹輔具影片（預備區塊）
└── tools/
    ├── library.html            工具庫
    └── community-program.html  社區防跌運動計畫管理工具
```

新增頁面時，請放入對應資料夾，並：
1. `<head>` 內加入 `<link rel="stylesheet" href="../assets/css/main.css">`（若在根目錄則不需 `../`）
2. 若該頁需要全站搜尋功能，在 `</body>` 前加入：
   ```html
   <script>var SITE_ROOT = "../";</script>
   <script src="../assets/js/search-data.js"></script>
   <script src="../assets/js/search.js"></script>
   <script src="../assets/js/protect.js"></script>
   ```
   （根目錄頁面 `SITE_ROOT` 設為 `""`）
3. 在 `assets/js/search-data.js` 的 `SEARCH_INDEX` 陣列中新增該頁對應項目（`url` 使用相對於網站根目錄、不含開頭斜線的路徑，例如 `"apps/environmental-sensing.html#sec1"`）。

## 部署到 GitHub Pages（免費）

1. 將本 repo 所有檔案 push 到 GitHub（分支通常為 `main`）。
2. 到 repo 的 **Settings → Pages**。
3. 「Build and deployment」→ Source 選擇 **Deploy from a branch**，Branch 選擇 `main` / `(root)`，按 **Save**。
4. 約 1–2 分鐘後，網站會發佈於：
   `https://<你的帳號>.github.io/gericares/`
   例如本例即為 `https://flkuo.github.io/gericares/`。
5. 之後每次 push 到 `main` 分支，網站會自動更新，無需手動部署。

`.nojekyll` 檔案已包含在 repo 根目錄，確保 GitHub Pages 以純靜態檔案處理，不套用 Jekyll 樣板轉換（避免底線開頭的檔案／資料夾被忽略）。

## 資安與內容保護說明

- 已加入基本安全性 Meta 標籤：Content-Security-Policy（僅允許同網域資源）、Referrer-Policy、X-Content-Type-Options。
- 已加入 `assets/js/protect.js`：停用右鍵選單、複製快捷鍵（Ctrl/Cmd+C）、拖曳另存圖片、部分開發者工具快捷鍵，並對表單欄位（如社區防跌運動計畫工具的輸入框）排除限制，不影響正常填寫資料。
- **請注意**：以上僅為降低一般使用者隨手複製內容的門檻，**無法防止透過檢視原始碼、開發者工具或關閉 JavaScript 取得內容**。若需要更嚴謹的內容保護（如浮水印、伺服器端授權存取），需另行規劃後端架構，靜態網站無法達成。
- 已修補「社區防跌運動計畫管理工具」中兩處將使用者輸入直接插入頁面而未跳脫特殊字元的程式碼（新增 `escapeHtml()` 處理），降低理論上的自我型 XSS 風險。此工具資料僅存於使用者自己瀏覽器的 localStorage，不會與其他使用者共享，原始風險本就極低。

## 授權與版權提醒

站內衛教與政策內容整理自公開文獻與政府公告，並保留原始出處；若有任何引用或轉載需求，請先確認原始文獻／官方公告之授權規範。
