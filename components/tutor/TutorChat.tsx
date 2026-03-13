"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState, type FormEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { TutorMessages } from "./TutorMessages";

export function TutorChat() {
  const [inputValue, setInputValue] = useState("");

  const { messages, sendMessage, status } = useChat({
    api: "/api/chat", 
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hey! 👋 I'm your personal learning assistant. Tell me what you'd like to learn, and I'll find the perfect courses for you.",
          },
        ],
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full bg-white">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        <TutorMessages messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 py-4 border-t border-zinc-100 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What would you like to learn?"
            disabled={isLoading}
            className="flex-1 h-9 px-3 text-sm bg-zinc-50 border border-zinc-200 rounded-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
            className="h-9 w-9 shrink-0 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:cursor-not-allowed rounded-sm transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 text-white animate-spin" strokeWidth={2} />
            ) : (
              <Send className="w-3.5 h-3.5 text-white disabled:text-zinc-400" strokeWidth={1.75} />
            )}
          </button>
        </form>
        <p className="mt-2.5 text-[11px] text-zinc-400 text-center font-light">
          Powered by AI · Ultra exclusive feature
        </p>
      </div>

    </div>
  );
}