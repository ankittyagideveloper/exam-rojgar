import { RefreshCw, X } from "lucide-react";
import { useRegisterSW } from 'virtual:pwa-register/react'

export function UpdateToast() {
    const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

    if (!needRefresh) return null
  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 bg-neutral-900 text-neutral-100 px-4 py-3 rounded-xl shadow-2xl border border-neutral-700 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-sm w-[calc(100%-2rem)]">
      <RefreshCw className="w-4 h-4 flex-shrink-0 text-blue-400" />
      <span className="text-xs font-medium flex-1 leading-snug">
        New update available
      </span>
      <button
        onClick={() => updateServiceWorker(true)}
        className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
      >
        <RefreshCw className="w-3 h-3" />
        Update now
      </button>
      <button
        onClick={() => setNeedRefresh(false)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity ml-1"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
