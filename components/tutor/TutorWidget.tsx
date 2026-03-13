"use client";

import { MessageCircle, Sparkles, X } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { TutorChat } from "./TutorChat";
import { TutorProvider, useTutor } from "./TutorContext";

function TutorPanel() {
  const { isOpen, closeChat, toggleChat } = useTutor();

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close chat"
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 cursor-default ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeChat}
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[600px] lg:w-[680px] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full w-full bg-white border-l border-zinc-200 shadow-xl flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 bg-zinc-50 shrink-0">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-sm bg-zinc-900 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" strokeWidth={1.75} />
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-50" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-900 leading-none mb-1">
                  Learning Assistant
                </h3>
                <p className="text-[11px] text-zinc-400 font-light">
                  Ultra exclusive · AI-powered
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeChat}
              aria-label="Close chat"
              className="w-7 h-7 rounded-sm flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-hidden">
            <TutorChat />
          </div>

        </div>
      </div>

      {/* FAB */}
      <button
        type="button"
        onClick={toggleChat}
        aria-label="Open AI tutor"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-zinc-900 hover:bg-zinc-800 rounded-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center group ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" strokeWidth={1.75} />
      </button>
    </>
  );
}

export function TutorWidget() {
  const { isLoaded, has } = useAuth();

  if (!isLoaded) return null;

  const isUltra = has?.({ plan: "ultra" });
  if (!isUltra) return null;

  return (
    <TutorProvider>
      <TutorPanel />
    </TutorProvider>
  );
}