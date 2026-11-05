const ERROR_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quazaar Sync — Tunnel Offline</title>
  <style>
    :root { --bg: #090a0f; --card: #12141f; --border: #232738; --text: #f3f4f6; --muted: #9ca3af; --accent: #f59e0b; --btn: #3b82f6; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); background-image: radial-gradient(circle at 50% 0%, #1e2238 0%, transparent 60%); color: var(--text); font-family: system-ui, -apple-system, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; max-width: 460px; width: 100%; padding: 2.25rem; box-shadow: 0 20px 50px rgba(0,0,0,0.5); text-align: center; }
    .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3); color: var(--accent); padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; margin-bottom: 1.5rem; }
    .dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
    p { color: var(--muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.75rem; }
    .host { font-family: monospace; color: #e5e7eb; background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; }
    .btn { background: var(--btn); color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .ray { margin-top: 1.75rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 0.75rem; color: #6b7280; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge"><span class="dot"></span>TUNNEL SLEEPING • 1033</div>
    <h1>Quazaar Sync is Offline</h1>
    <p>The local tunnel for <span class="host">quazaar-sync.codershubinc.com</span> is currently spun down. It will be back online shortly.</p>
    <button class="btn" onclick="window.location.reload()">Retry Connection</button>
    <div class="ray">Ray ID: {{RAY_ID}}</div>
  </div>
</body>
</html>`;

export default {
  async fetch(request) {
    try {
      const response = await fetch(request);
      if (response.status === 530 || response.status === 502 || response.status === 503) {
        const ray = request.headers.get("cf-ray") || "Offline";
        return new Response(ERROR_HTML.replace("{{RAY_ID}}", ray), {
          status: response.status,
          headers: { "content-type": "text/html;charset=UTF-8" }
        });
      }
      return response;
    } catch (e) {
      return new Response(ERROR_HTML.replace("{{RAY_ID}}", "Offline"), {
        status: 530,
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }
  }
};
