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
      });
    });
    return () => unsubscribe?.();
  }, []);

  /**
   * Request notification permission, obtain the FCM token, and persist it
   * to Firestore under `fcmTokens/<userId>`.
   */
  const subscribe = useCallback(async () => {
    const messaging = await getMessagingInstance();
    if (!messaging) return { success: false, reason: "unsupported" };

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result !== "granted") {
      return { success: false, reason: "denied" };
    }

    try {
      if (!("serviceWorker" in navigator)) {
        return { success: false, reason: "service_worker_unsupported" };
      }

      // Ensure firebase-messaging-sw.js is explicitly registered
      const swRegistration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: swRegistration,
      });

      if (!token) return { success: false, reason: "no_token" };

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
