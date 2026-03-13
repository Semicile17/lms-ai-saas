import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Play, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TIER_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { COURSE_WITH_MODULES_QUERYResult } from "@/sanity.types";

type Course = NonNullable<COURSE_WITH_MODULES_QUERYResult>;

type CourseHeroProps = Pick<
  Course,
  "title" | "description" | "tier" | "thumbnail" | "category" | "moduleCount" | "lessonCount"
>;

export function CourseHero({
  title,
  description,
  tier,
  thumbnail,
  category,
  moduleCount,
  lessonCount,
}: CourseHeroProps) {
  const displayTier = tier ?? "free";
  const styles = TIER_STYLES[displayTier];

  const tierBadgeClass =
    displayTier === "ultra"
      ? "border-cyan-200 bg-cyan-50 text-cyan-700"
      : displayTier === "pro"
        ? "border-violet-200 bg-violet-50 text-violet-700"
        : "border-zinc-200 bg-zinc-50 text-zinc-500";

  return (
    <div>
      {/* ── Back link ── */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back to dashboard
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Thumbnail ── */}
        <div
          className={cn(
            "relative w-full lg:w-72 h-44 lg:h-48 rounded-sm bg-linear-to-br overflow-hidden shrink-0 border border-zinc-200",
            styles.gradient
          )}
        >
          {thumbnail?.asset?.url ? (
            <Image
              src={thumbnail.asset.url}
              alt={title ?? "Course thumbnail"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-25">
              📚
            </div>
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* ── Course Info ── */}
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className={cn(
                "rounded-sm text-[10px] font-medium tracking-widest uppercase shadow-none",
                tierBadgeClass
              )}
            >
              {displayTier}
            </Badge>
            {category?.title && (
              <Badge
                variant="outline"
                className="rounded-sm border-zinc-200 bg-zinc-50 text-zinc-500 text-[10px] tracking-wide shadow-none gap-1"
              >
                <Tag className="w-2.5 h-2.5" />
                {category.title}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-3 leading-snug">
            {title ?? "Untitled Course"}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-2xl mb-6">
              {description}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
              {moduleCount ?? 0} modules
            </span>
            <Separator orientation="vertical" className="h-3 mx-2" />
            <span className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5" strokeWidth={1.75} />
              {lessonCount ?? 0} lessons
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}