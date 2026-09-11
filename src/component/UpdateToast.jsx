import { RefreshCw, X } from "lucide-react";

export function UpdateToast({ onUpdate, onDismiss }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 bg-neutral-900 text-neutral-100 px-5 py-3 rounded-lg shadow-lg border border-neutral-700 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-sm w-[calc(100%-2rem)]">
      <RefreshCw className="w-4 h-4 flex-shrink-0 text-blue-400" />
      <span className="text-xs font-medium flex-1">
        A new version is available. Tap <strong>Reload</strong> to update now.
      </span>
      <button
        onClick={onUpdate}
        className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
      >
        Reload
      </button>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 hover:opacity-70 transition-opacity ml-1"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
