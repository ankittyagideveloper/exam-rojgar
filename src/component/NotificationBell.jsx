import React, { useCallback, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Bell, BellOff } from "lucide-react";
import { usePushNotifications } from "../hooks/usePushNotifications";

export function NotificationBell({ className = "" }) {
  const { user } = useUser();
  const { permission, subscribe } = usePushNotifications(user?.id ?? null);
  const [loading, setLoading] = useState(false);
  const [showDeniedModal, setShowDeniedModal] = useState(false);

  const handleClick = useCallback(async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;

    if (permission === "granted") {
      // Already granted — show a confirmation notification
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification("Exam Rojgaar", {
        body: "Notifications are already enabled!",
        icon: "/logo.png",
        tag: "bell-test",
      });
      return;
    }

    setLoading(true);
    // subscribe() requests permission, gets the FCM token, and saves it to Firestore
    const result = await subscribe();
    setLoading(false);

    if (result.success) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification("Exam Rojgaar", {
        body: "You'll now receive updates and alerts.",
        icon: "/logo.png",
        vibrate: [200, 100, 200],
        tag: "welcome-notification",
      });
    } else if (result.reason === "denied") {
      setShowDeniedModal(true);
    }
  }, [permission, subscribe]);

  // Don't render if the browser has no Notification API
  if (permission === "unsupported") return null;

  const isDenied = permission === "denied";

  return (
    <>
      <div className={`relative group ${className}`}>
        <button
          onClick={handleClick}
          disabled={loading}
          title={
            isDenied
              ? "Notifications blocked — click to see how to enable"
              : permission === "granted"
                ? "Notifications enabled"
                : "Enable notifications"
          }
          className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors
            ${isDenied
              ? "border-orange-300 bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-400 hover:bg-orange-100 cursor-pointer"
              : permission === "granted"
                ? "border-blue-300 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer"
                : "border-border bg-surface-2 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
            } sm:h-9 sm:w-9`}
        >
          {isDenied ? (
            <BellOff size={16} />
          ) : (
            <Bell size={16} />
          )}
          {permission === "granted" && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500 ring-1 ring-white dark:ring-gray-900" />
          )}
        </button>
      </div>

      {/* Modal — shown when user clicks bell but notifications are blocked */}
      {showDeniedModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowDeniedModal(false)}
        >
          <div
            className="relative mx-4 w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
              <BellOff size={28} className="text-orange-500 dark:text-orange-400" />
            </div>

            <h2 className="mb-1 text-center text-base font-bold text-gray-900 dark:text-white">
              Notifications are blocked
            </h2>
            <p className="mb-5 text-center text-sm text-gray-500 dark:text-gray-400">
              Your browser has blocked notifications for this site. Follow these steps to enable them:
            </p>

            <ol className="mb-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-xs font-bold text-orange-600 dark:text-orange-400">1</span>
                Click the <strong>🔒 lock icon</strong> in the address bar at the top of your browser.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-xs font-bold text-orange-600 dark:text-orange-400">2</span>
                Find <strong>Notifications</strong> and change it from <strong>Block</strong> to <strong>Allow</strong>.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-xs font-bold text-orange-600 dark:text-orange-400">3</span>
                Reload the page and click the bell again.
              </li>
            </ol>

            <button
              onClick={() => setShowDeniedModal(false)}
              className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white py-2 text-sm font-semibold transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationBell;
