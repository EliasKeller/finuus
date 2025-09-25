export function registerSW() {
  if (process.env.NODE_ENV !== "production") return; // in Dev KEIN SW
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js");
    });
  }
}