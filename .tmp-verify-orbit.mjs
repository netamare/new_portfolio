const targets = await fetch("http://localhost:9223/json").then((response) => response.json());
const target = targets.find((item) => item.type === "page" && item.url === "http://localhost:3002/");
if (!target) throw new Error("Portfolio tab not found");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let nextId = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
};
const send = (method, params = {}) => new Promise((resolve) => {
  const id = ++nextId;
  pending.set(id, resolve);
  ws.send(JSON.stringify({ id, method, params }));
});
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await send("Runtime.evaluate", { expression: "document.querySelector('.intro-skip')?.click()" });
await new Promise((resolve) => setTimeout(resolve, 1200));
const metrics = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: "[...document.querySelectorAll('.fixed-orbit-background__ring')].map(e=>{const c=getComputedStyle(e);return {className:e.className,width:c.width,height:c.height,borderWidth:c.borderWidth,animation:c.animationName,duration:c.animationDuration}})",
});
console.log(JSON.stringify(metrics.result.result.value));
const screenshot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
const { writeFileSync } = await import("node:fs");
writeFileSync("orbit-verification.png", Buffer.from(screenshot.result.data, "base64"));
await send("Browser.close");
