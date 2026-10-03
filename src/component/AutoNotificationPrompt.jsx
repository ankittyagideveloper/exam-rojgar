import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { usePushNotifications } from "../hooks/usePushNotifications";

export function AutoNotificationPrompt() {
  const { user } = useUser();
  const { permission, subscribe } = usePushNotifications(user?.id ?? null);

  useEffect(() => {
    // Check if the browser supports notifications
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    // Only prompt if permission has not been requested/decided yet ("default")
    if (Notification.permission === "default") {
      subscribe();
    }
  }, [subscribe]);

  return null;
}

export default AutoNotificationPrompt;
