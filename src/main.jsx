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

// Show an update toast when a new SW version is waiting
const toastContainer = document.createElement("div");
document.body.appendChild(toastContainer);
const toastRoot = createRoot(toastContainer);

registerSW({
  onNeedRefresh(updateSW) {
    const dismiss = () => toastRoot.render(null);
    toastRoot.render(
      <UpdateToast
        onUpdate={() => updateSW(true)}
        onDismiss={dismiss}
      />
    );
  },
  onOfflineReady() {},
});

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
