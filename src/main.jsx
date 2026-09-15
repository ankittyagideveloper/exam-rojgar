import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { registerSW } from "virtual:pwa-register";
import { UpdateToast } from "./component/UpdateToast.jsx";

// Defer SW registration until the page is idle so it doesn't compete
// with the critical rendering path (LCP).
let toastRoot = null;

function setupSW() {
  const toastContainer = document.createElement("div");
  document.body.appendChild(toastContainer);
  toastRoot = createRoot(toastContainer);

  registerSW({
    immediate: true,
    onNeedRefresh(updateSW) {
      const dismiss = () => toastRoot.render(null);
      toastRoot.render(
        <UpdateToast
          onUpdate={() => {
            dismiss();
            updateSW(true).then(() => window.location.reload());
          }}
          onDismiss={dismiss}
        />
      );
    },
    onOfflineReady() {},
  });
}

if (typeof requestIdleCallback !== "undefined") {
  requestIdleCallback(setupSW, { timeout: 5000 });
} else {
  window.addEventListener("load", () => setTimeout(setupSW, 3000), {
    once: true,
  });
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
