"use client";

import type { UIMessage } from "ai";
import { Sparkles, User, Search, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import { useTutor } from "./TutorContext";

interface TutorMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

interface ToolCallPart {
  type: string;
  toolName?: string;
  toolCallId?: string;
  args?: Record<string, unknown>;
  result?: unknown;
  output?: unknown;
  state?: "partial-call" | "call" | "result";
}

function getMessageText(message: UIMessage): string {
  if (!message.parts || message.parts.length === 0) return "";
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { type: "text"; text: string }).text)
    .join("\n");
}

function getToolParts(message: UIMessage): ToolCallPart[] {
  if (!message.parts || message.parts.length === 0) return [];
  return message.parts
    .filter((part) => part.type.startsWith("tool-"))
    .map((part) => part as unknown as ToolCallPart);
}

function getToolDisplayName(toolName: string): string {
  const toolNames: Record<string, string> = {
    searchCourses: "Searching courses",
  };
  return toolNames[toolName] || toolName;
}

export function TutorMessages({ messages, isLoading }: TutorMessagesProps) {
  return (
    <>
      {messages.map((message) => {
        const content = getMessageText(message);
        const toolParts = getToolParts(message);
        const hasContent = content.length > 0;
        const hasTools = toolParts.length > 0;

        if (!hasContent && !hasTools) return null;

        return (
          <div key={message.id} className="space-y-2">

            {/* Tool indicators */}
            {hasTools &&
              toolParts.map((toolPart, idx) => (
                <ToolCallUI
                  key={`tool-${message.id}-${idx}`}
                  toolPart={toolPart}
                />
              ))}

            {/* Message bubble */}
            {hasContent && (
              <div className={`flex items-end gap-2.5 ${message.role === "user" ? "flex-row-reverse" : ""}`}>

                {/* Avatar */}
                <div className={`shrink-0 w-7 h-7 rounded-sm flex items-center justify-center ${
                  message.role === "assistant" ? "bg-zinc-900" : "bg-zinc-100 border border-zinc-200"
                }`}>
                  {message.role === "assistant" ? (
                    <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
                  ) : (
                    <User className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.75} />
                  )}
                </div>

                {/* Bubble */}
                <div className={`max-w-[82%] px-4 py-3 rounded-sm text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "bg-zinc-50 border border-zinc-200 text-zinc-700"
                    : "bg-zinc-900 text-white"
                }`}>
                  <MessageContent content={content} isAssistant={message.role === "assistant"} />
                </div>

              </div>
            )}
          </div>
        );
      })}

      {/* Typing indicator */}
      {isLoading && messages[messages.length - 1]?.role === "user" && (
        <div className="flex items-end gap-2.5">
          <div className="shrink-0 w-7 h-7 rounded-sm bg-zinc-900 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
          </div>
          <div className="bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-sm">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToolCallUI({ toolPart }: { toolPart: ToolCallPart }) {
  const toolName = toolPart.toolName || toolPart.type.replace("tool-", "");
  const displayName = getToolDisplayName(toolName);

  console.log("Tool part:", JSON.stringify(toolPart, null, 2));

  const isComplete =
    toolPart.state === "result" ||
    toolPart.result !== undefined ||
    toolPart.output !== undefined ||
    Object.keys(toolPart).some(
      (key) =>
        key.toLowerCase().includes("result") ||
        key.toLowerCase().includes("output"),
    );

  const searchQuery =
    toolName === "searchCourses" && toolPart.args?.query
      ? String(toolPart.args.query)
      : undefined;

  return (
    <div className="flex items-center gap-2.5 ml-9">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-sm border text-xs ${
        isComplete
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-zinc-50 border-zinc-200 text-zinc-500"
      }`}>
        {isComplete ? (
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
        ) : (
          <Loader2 className="w-3.5 h-3.5 shrink-0 text-zinc-400 animate-spin" strokeWidth={1.75} />
        )}
        <Search className="w-3 h-3 shrink-0 opacity-60" strokeWidth={1.75} />
        <span className="font-medium">
          {isComplete ? `${displayName} complete` : `${displayName}...`}
        </span>
        {searchQuery && (
          <span className="opacity-60 font-light">
            &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
}

function MessageContent({
  content,
  isAssistant,
}: {
  content: string;
  isAssistant: boolean;
}) {
  const { closeChat } = useTutor();

  const linkClass = isAssistant
    ? "text-zinc-900 underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-600 transition-colors"
    : "text-zinc-300 underline underline-offset-2 decoration-zinc-600 hover:decoration-zinc-400 transition-colors";

  return (
    <Markdown
      components={{
        a: ({ href, children }) => {
          if (!href) return <span>{children}</span>;
          if (href.startsWith("/")) {
            return (
              <Link href={href} onClick={closeChat} className={linkClass}>
                {children}
              </Link>
            );
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {children}
            </a>
          );
        },
        p: ({ children }) => <p className="mb-2.5 last:mb-0">{children}</p>,
        h1: ({ children }) => (
          <h1 className="text-base font-semibold text-zinc-900 mb-2 mt-4 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-sm font-semibold text-zinc-900 mb-1.5 mt-3 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-medium text-zinc-800 mb-1.5 mt-3 first:mt-0">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="mb-2.5 mt-1.5 space-y-1 pl-0 list-none">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-2.5 mt-1.5 space-y-1 pl-0 list-none counter-reset-[item]">{children}</ol>
        ),
        li: ({ children }) => {
          if (!children || (typeof children === "string" && !children.trim())) return null;
          return (
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0 mt-2" />
              <span>{children}</span>
            </li>
          );
        },
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="px-1.5 py-0.5 rounded-sm bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono">
                {children}
              </code>
            );
          }
          return <code className={className}>{children}</code>;
        },
        pre: ({ children }) => (
          <pre className="p-4 rounded-sm bg-zinc-100 border border-zinc-200 overflow-x-auto mb-2.5 text-xs">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-zinc-300 pl-3 text-zinc-500 font-light mb-2.5">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-inherit">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic opacity-80">{children}</em>
        ),
      }}
    >
      {content}
    </Markdown>
  );
}