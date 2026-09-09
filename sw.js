/* 我的小日記本 — Service Worker
   目的：離線也打得開（飛機上、沒訊號都能寫日記）。
   策略：網頁本身「先連網、失敗才用快取」，圖示等靜態檔「先用快取」。
   注意：只處理同網域的請求，GitHub API 一律直接放行，不進快取。 */

const CACHE = "diary-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }

  // 外部請求（例如 api.github.com 的同步）不攔截，直接走網路
  if (url.origin !== self.location.origin) return;

  const isPage = req.mode === "navigate" ||
                 url.pathname.endsWith("/") ||
                 url.pathname.endsWith(".html");

  if (isPage) {
    // 先連網，拿到新版就更新快取；沒網路才用舊的。
    // 一定要用 cache:"no-cache" 向伺服器重新驗證，否則會拿到瀏覽器 HTTP 快取裡
    // 的舊網頁（GitHub Pages 的 HTML 預設快取 10 分鐘），更新後看不到新版。
    const fresh = new Request(req.url, { cache: "no-cache", credentials: "same-origin" });
    e.respondWith(
      fetch(fresh)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
    );
    return;
  }

  // 靜態資源：先用快取，順便在背景抓新版
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
