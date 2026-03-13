"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, Play, Layers, CheckCircle2 } from "lucide-react";
import { TIER_STYLES } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DASHBOARD_COURSES_QUERYResult } from "@/sanity.types";

type SanityCourse = DASHBOARD_COURSES_QUERYResult[number];

export interface CourseCardProps
  extends Pick<
    SanityCourse,
    | "title"
    | "description"
    | "tier"
    | "thumbnail"
    | "moduleCount"
    | "lessonCount"
  > {
  slug?: { current: string } | null;
  href?: string;
  completedLessonCount?: number | null;
  isCompleted?: boolean;
  isLocked?: boolean;
  showProgress?: boolean;
}

export function CourseCard({
  slug,
  href,
  title,
  description,
  tier,
  thumbnail,
  moduleCount,
  lessonCount,
  completedLessonCount = 0,
  isCompleted = false,
  isLocked = false,
  showProgress = false,
}: CourseCardProps) {
  const displayTier = tier ?? "free";
  const styles = TIER_STYLES[displayTier];
  const totalLessons = lessonCount ?? 0;
  const completed = completedLessonCount ?? 0;
  const progressPercent =
    totalLessons > 0 ? (completed / totalLessons) * 100 : 0;

  const linkHref = href ?? `/courses/${slug?.current ?? ""}`;

  const tierBadgeClass =
    displayTier === "ultra"
      ? "border-cyan-200 bg-cyan-50 text-cyan-700"
      : displayTier === "pro"
        ? "border-violet-200 bg-violet-50 text-violet-700"
        : "border-zinc-200 bg-white text-zinc-500";

  return (
    <Link href={linkHref} className="group block">
      <div className="rounded-sm border border-zinc-200 bg-white overflow-hidden hover:border-zinc-400 hover:shadow-sm transition-all duration-200">

        {/* ── Thumbnail ── */}
        <div className={`h-40 bg-linear-to-br ${styles.gradient} relative overflow-hidden`}>
          {thumbnail?.asset?.url ? (
            <Image
              src={thumbnail.asset.url}
              alt={title ?? "Course thumbnail"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">
              📚
            </div>
          )}

          {/* Subtle dark scrim */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Tier / Completed badge */}
          {isCompleted ? (
            <div className="absolute top-3 left-3">
              <Badge className="bg-emerald-500 text-white border-none rounded-sm text-[10px] font-medium tracking-wide gap-1 shadow-none">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </Badge>
            </div>
          ) : (
            <div className="absolute top-3 left-3">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-sm text-[10px] font-medium tracking-widest uppercase shadow-none",
                  tierBadgeClass
                )}
              >
                {displayTier}
              </Badge>
            </div>
          )}

          {/* Locked overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
              <div className="w-9 h-9 rounded-sm border border-zinc-200 bg-white flex items-center justify-center">
                <Lock className="w-4 h-4 text-zinc-400" strokeWidth={1.75} />
              </div>
              <span className="text-xs text-zinc-500 font-medium">
                Upgrade to unlock
              </span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="p-5">
          <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-2 mb-1.5 leading-snug">
            {title ?? "Untitled Course"}
          </h3>

          {description && (
            <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-4">
              {description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" strokeWidth={1.75} />
              {moduleCount ?? 0} modules
            </span>
            <span className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5" strokeWidth={1.75} />
              {lessonCount ?? 0} lessons
            </span>
          </div>

          {/* ── Progress ── */}
          {showProgress && totalLessons > 0 && (
            <div className="mt-4 pt-4 border-t border-zinc-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-400">
                  {completed} of {totalLessons} lessons
                </span>
                <span className="text-zinc-500 font-medium">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <Progress
                value={progressPercent}
                className="h-1 bg-zinc-100 [&>div]:bg-emerald-500 rounded-none"
              />
            </div>
          )}
        </div>

      </div>
    </Link>
  );
}