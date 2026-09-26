import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";
import { registerSW } from "virtual:pwa-register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
const queryClient = new QueryClient();

// Register the SW immediately so navigator.serviceWorker.ready resolves before
// the user clicks the notification bell. On first install (or after a cache
// clear) the SW lands in "waiting" with registerType:"prompt", which keeps
// .ready pending forever. Sending SKIP_WAITING on updateFound forces it into
// "active" so FCM's getToken() gets a valid registration.
registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return;
    // If a SW is already waiting (e.g. after hard-refresh), activate it now.
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    // Activate any future waiting SW as soon as it's found.
    registration.addEventListener("updatefound", () => {
      const newSW = registration.installing;
      if (!newSW) return;
      newSW.addEventListener("statechange", () => {
        if (newSW.state === "installed" && navigator.serviceWorker.controller) {
          newSW.postMessage({ type: "SKIP_WAITING" });
        }
      });
    });
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
