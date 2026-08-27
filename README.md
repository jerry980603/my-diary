# 📔 我的小日記本

一個只屬於自己的日記網站。每天分成：代辦事項、讀書日記、投資日記、新點子開發、感恩的一句話、名言佳句、今日附件、心情筆記本。

- 打字就自動存，不用按儲存
- 可以拖檔案／照片進去，跟那一天一起存
- 可以用自己的私人 GitHub repo 同步，手機和電腦共用同一本
- 手機、電腦都能用，加到主畫面就像一個 App，沒網路也能寫

---

## 🖥️ 只在這台電腦用

直接雙擊 `index.html` 就好，什麼都不用裝。

資料存在這個瀏覽器裡，所以請固定用同一個瀏覽器開；偶爾按左邊「💾 備份全部（JSON）」存一份到雲端硬碟比較保險。

---

## 📱 想在手機也能用 → 上線到 GitHub Pages

### 第 1 步：建立網站的 repo（這個可以是公開的）

1. 到 GitHub 按 **New repository**
2. 名稱例如 `my-diary`，Public 或 Private 都可以
   （免費帳號的 Pages 需要 Public。**放心：這裡只有程式，沒有任何日記內容**）
3. 建好後把這個資料夾裡的檔案上傳（可以直接把檔案拖進網頁）：

   ```
   index.html
   manifest.webmanifest
   sw.js
   icon-192.png
   icon-512.png
   icon-maskable-512.png
   apple-touch-icon.png
   ```

   > `README.md` 和 `日記-*.md` 不需要上傳，上傳了也沒關係。

4. 進 repo 的 **Settings → Pages**
5. Source 選 **Deploy from a branch**，Branch 選 `main` + `/ (root)`，按 Save
6. 等一兩分鐘，網址會長這樣：

   ```
   https://你的帳號.github.io/my-diary/
   ```

### 第 2 步：加到手機主畫面

- **iPhone**：用 Safari 打開網址 → 分享鍵 → 「加入主畫面」
- **Android**：用 Chrome 打開網址 → 右上角選單 → 「安裝應用程式」／「加到主畫面」

之後從主畫面點開就是全螢幕，沒有網址列，跟一般 App 一樣，**離線也能寫**。

---

## ☁️ 讓手機和電腦同步同一本日記

日記內容**不會**放在上面那個網站 repo 裡，要另外開一個**私人** repo 當資料庫。

### 第 1 步：建立資料 repo

到 GitHub 按 **New repository**，名稱例如 `my-diary-data`，
**一定要選 Private**（這裡面才是你的日記內容），建好即可，可以是空的。

### 第 2 步：產生 Token

1. 右上角頭像 → **Settings**
2. 左邊最下面 **Developer settings**
3. **Personal access tokens → Fine-grained tokens → Generate new token**
4. 設定：
   - **Expiration**：選一個到期日（例如 1 年）
   - **Repository access**：選 `Only select repositories`，只勾 `my-diary-data`
   - **Permissions → Repository permissions → Contents**：設成 **Read and write**
     （其他權限都不用給）
5. 產生後把 token 複製起來（只會顯示一次）

### 第 3 步：在網站上設定

打開日記網站 → 左邊「雲端同步」→ **⚙️ 設定** → 填入：

| 欄位 | 填什麼 |
|---|---|
| 私人 Repo | `你的帳號/my-diary-data` |
| 檔案路徑 | `diary.json` |
| Token | 剛剛複製的那串 |

按「🔗 連線並儲存」。**手機上打開同一個網址，填一模一樣的三個欄位**，兩邊就會同步了。

---

## 🔒 安全與注意事項

- **Token 只存在你自己的瀏覽器裡**，不會傳給任何第三方。共用電腦上用完可以按「🗑 移除設定」。
- **資料 repo 一定要 Private**，不然日記會被全世界看到。（App 偵測到公開 repo 會跳警告）
- **附件（照片）不會同步**，只有文字會，因為檔案太大不適合放 GitHub。
  同步過來的日子若有其他裝置的附件，會顯示「☁️ 這台裝置沒有這個檔案」。
- 同一天在兩台裝置都改過的話，**比較新的那次會勝出**；不同天則各自保留，不會互相覆蓋。
- 想搬家或長期保存，用「💾 備份全部（JSON）」匯出（可選擇是否含附件），到另一台按「📥 匯入備份檔」。

---

## ⌨️ 快捷鍵

| 按鍵 | 功能 |
|---|---|
| `Ctrl` + `S` | 立刻儲存 |
| `Ctrl` + `K` | 搜尋以前的日記 |
| `Esc` | 關閉彈出視窗 |

---

## 🛠️ 修改網站

全部程式都在 `index.html` 這一個檔案裡（HTML + CSS + JavaScript），
用記事本或 VS Code 打開就能改。改完重新上傳到 repo 就會更新。

- 顏色：檔案最上面的 `:root { --bg: ... }` 那一段
- 名言佳句的靈感庫：搜尋 `const QUOTES`
- 心情表情：搜尋 `const MOODS`
