import { useEffect, useState } from "react";
import { Wifi, WifiOff, X } from "lucide-react";

export function ConnectivityBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const [dismissOffline, setDismissOffline] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true);
      setDismissOffline(false);
      const timer = setTimeout(() => setShowOnlineMessage(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineMessage(false);
      setDismissOffline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!mounted) return null;

  // Show offline banner
  if (!isOnline && !dismissOffline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[999] bg-neutral-900 text-neutral-100 px-6 py-3 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-0 duration-300 border-b border-neutral-800">
        <WifiOff className="w-4 h-4 flex-shrink-0" />
        <span className="text-xs font-medium tracking-wide">
          No internet connection
        </span>
        <button
          onClick={() => setDismissOffline(true)}
          className="ml-auto flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Show online banner
  if (showOnlineMessage) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-600 text-white px-6 py-3 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-0 duration-300">
        <Wifi className="w-4 h-4" />
        <span className="text-xs font-medium tracking-wide">Connected</span>
      </div>
    );
  }

  return null;
}
