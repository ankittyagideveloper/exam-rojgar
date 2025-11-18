import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";
import { registerSW } from "virtual:pwa-register";

import { ClerkProvider } from "@clerk/react-router";

const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to the user to reload when a new version is ready
    console.log("New content available, click to refresh.");
  },
  onOfflineReady() {
    // Notify the user that the application can now work offline
    console.log("App is ready to work offline");
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
