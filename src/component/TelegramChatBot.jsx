import React, { useState } from "react";
import { Send, X, MessageSquare, ExternalLink, Bot, Sparkles } from "lucide-react";

const TELEGRAM_URL = "https://t.me/ExamRojgaar";

export default function TelegramChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartChat = () => {
    window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Chat Window Popup */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0088cc] to-[#0077b5] text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30">
                  <Bot className="w-6 h-6" />
                </div>
                {/* Online status indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0088cc] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">Exam Rojgaar Assistant</h4>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span>
                  Online on Telegram
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/50 min-h-[170px] flex flex-col justify-between gap-4">
            {/* Bot Message Bubble */}
            <div className="flex items-start gap-2.5 max-w-[88%]">
              <div className="w-7 h-7 rounded-full bg-[#0088cc] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                <Send className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-slate-700/60 text-slate-800 dark:text-slate-100">
                <p className="text-sm font-medium leading-relaxed">
                  👋 Hello! How can I help you today?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Have questions about test series, study material, or exam updates? Connect with us directly on Telegram.
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={handleStartChat}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Start Chat on Telegram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
              <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
                Typically replies within a day • Official ER-UPDATES Channel
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0088cc] hover:bg-[#0077b5] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 cursor-pointer"
        aria-label={isOpen ? "Close Telegram Chat" : "Open Telegram Chat"}
      >
        {/* Subtle ping animation on icon when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white items-center justify-center text-[10px] text-[#0088cc] font-bold">
              1
            </span>
          </span>
        )}
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <Send className="w-6 h-6 -translate-x-0.5 translate-y-0.5 transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
