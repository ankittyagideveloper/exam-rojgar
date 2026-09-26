import { useState, useEffect, useCallback } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getMessagingInstance } from "../../firebase";
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import { app } from "../../firebase";

const db = getFirestore(app);

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

/**
 * Hook that handles FCM permission, token registration, and foreground messages.
 *
 * Usage:
 *   const { permission, supported, subscribe, foregroundMessage } = usePushNotifications(userId);
 *
 * @param {string|null} userId - Clerk user ID used to store the token in Firestore
 */
export function usePushNotifications(userId) {
  const [permission, setPermission] = useState(
    () => (typeof Notification !== "undefined" ? Notification.permission : "default")
  );
  const [foregroundMessage, setForegroundMessage] = useState(null);
  const [supported, setSupported] = useState(false);

  // Check FCM browser support once on mount and set up foreground listener
  useEffect(() => {
    let unsubscribe;
    getMessagingInstance().then((messaging) => {
      if (!messaging) return;
      setSupported(true);
      unsubscribe = onMessage(messaging, (payload) => {
        setForegroundMessage(payload);
        // FCM suppresses showNotification when the tab is in foreground.
        // Show it manually via the active SW so the user still sees it.
        const { title, body, icon } = payload.notification ?? {};
        const data = payload.data ?? {};
        const notifTitle = title ?? data.title ?? "Exam Rojgaar";
        const notifBody = body ?? data.body ?? "";
        const notifIcon = icon ?? data.icon ?? "/android-chrome-192x192.png";
        if (Notification.permission === "granted" && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(notifTitle, {
              body: notifBody,
              icon: notifIcon,
              badge: "/android-chrome-192x192.png",
              data: { url: data.link ?? "/" },
            });
          });
        }
      });
    });
    return () => unsubscribe?.();
  }, []);

  /**
   * Request notification permission, obtain the FCM token, and persist it
   * to Firestore under `fcmTokens/<userId>`.
   */
  const subscribe = useCallback(async () => {
    console.log("[FCM] subscribe() called");

    const messaging = await getMessagingInstance();
    console.log("[FCM] messaging instance:", messaging);
    if (!messaging) {
      console.error("[FCM] FCM not supported in this browser.");
      return { success: false, reason: "unsupported" };
    }

    console.log("[FCM] Requesting notification permission...");
    const result = await Notification.requestPermission();
    console.log("[FCM] Permission result:", result);
    setPermission(result);

    if (result !== "granted") {
      return { success: false, reason: "denied" };
    }

    try {
      if (!("serviceWorker" in navigator)) {
        console.error("[FCM] Service workers not supported.");
        return { success: false, reason: "service_worker_unsupported" };
      }

      console.log("[FCM] Waiting for SW ready...");
      // navigator.serviceWorker.ready only resolves once a SW is *activated*.
      // With registerType:"prompt" a new SW parks in "waiting", so ready can
      // hang forever. We give it 4 s; on timeout we nudge the waiting SW with
      // SKIP_WAITING and wait for the controllerchange event before continuing.
      const swRegistration = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((resolve) => setTimeout(() => resolve(null), 4000)),
      ]).then(async (reg) => {
        if (reg) return reg;
        // Timed out — find the stalled registration and force activation.
        const existing = await navigator.serviceWorker.getRegistration("/");
        if (!existing) return null;

        if (existing.active) return existing; // already active, just slow

        if (existing.waiting) {
          console.log("[FCM] SW is waiting — sending SKIP_WAITING");
          // Wait for the new SW to take control, then re-fetch the registration
          // so its .active field is guaranteed to be populated.
          await new Promise((resolve) => {
            navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true });
            existing.waiting.postMessage({ type: "SKIP_WAITING" });
            // Safety net: resolve after 3 s even if controllerchange never fires.
            setTimeout(resolve, 3000);
          });
          // Re-query after controllerchange — the registration now has .active set.
          return navigator.serviceWorker.getRegistration("/");
        }

        // SW is installing but not yet waiting — wait a bit then re-query.
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return navigator.serviceWorker.getRegistration("/");
      });
      console.log("[FCM] SW ready:", swRegistration?.active?.scriptURL);

      // After SKIP_WAITING the controller is the active SW; fall back to .active
      // if getRegistration() returns before the property is updated.
      const activeSW = swRegistration?.active ?? (navigator.serviceWorker.controller ? swRegistration : null);
      if (!activeSW?.active && !navigator.serviceWorker.controller) {
        console.error("[FCM] No active SW found — cannot get FCM token.");
        return { success: false, reason: "no_active_sw" };
      }

      console.log("[FCM] VAPID key present:", !!VAPID_KEY);
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: swRegistration,
      });
      console.log("[FCM] token:", token);
      if (!token) {
        console.error("[FCM] getToken returned empty — check VAPID key and SW scope.");
        return { success: false, reason: "no_token" };
      }

      if (userId) {
        await setDoc(
          doc(db, "fcmTokens", userId),
          {
            userId,
            token,
            updatedAt: serverTimestamp(),
            platform: "web",
          },
          { merge: true }
        );
      } else {
        console.warn("[FCM] Permission granted but no userId — token not saved to Firestore.");
      }

      return { success: true, token };
    } catch (err) {
      console.error("[FCM] Error getting token:", err);
      return { success: false, reason: err.message };
    }
  }, [userId]);

  return { permission, supported, foregroundMessage, subscribe };
}
