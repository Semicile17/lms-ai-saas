import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl font-semibold text-zinc-900 mt-8 mb-3 leading-snug">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold text-zinc-900 mt-7 mb-3 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold text-zinc-800 mt-5 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-sm font-semibold text-zinc-800 mt-4 mb-1.5 uppercase tracking-wide">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-sm text-zinc-600 leading-relaxed mb-4 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-zinc-300 pl-4 my-5 text-sm text-zinc-500 font-light italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-1.5 mb-4 text-sm text-zinc-600 font-light list-none pl-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-1.5 mb-4 text-sm text-zinc-600 font-light list-none pl-0 counter-reset-[item]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 leading-relaxed">
        <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0 mt-2" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start gap-2.5 leading-relaxed">
        <span className="text-zinc-400 shrink-0 tabular-nums text-xs mt-0.5 font-medium">
          {/* counter handled by parent */}
        </span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-zinc-500">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded-sm text-xs text-zinc-700 font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-900 underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-600 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const imageUrl = urlFor(value).width(1200).auto("format").url();

      return (
        <figure className="my-6">
          <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-zinc-50 border border-zinc-200">
            <Image
              src={imageUrl}
              alt={value.alt || "Lesson image"}
              fill
              className="object-contain"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-zinc-400 mt-2 text-center font-light">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface LessonContentProps {
  content: TypedObject[] | null | undefined;
}

export function LessonContent({ content }: LessonContentProps) {
  if (!content || content.length === 0) return null;

  return (
    <div className="max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}