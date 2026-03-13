"use client";

import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GatedFallback } from "@/components/courses/GatedFallback";
import { useUserTier, hasTierAccess } from "@/lib/hooks/use-user-tier";
import { MuxVideoPlayer } from "./MuxVideoPlayer";
import { LessonContent } from "./LessonContent";
import { LessonCompleteButton } from "./LessonCompleteButton";
import { LessonSidebar } from "./LessonSidebar";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";

interface LessonPageContentProps {
  lesson: NonNullable<LESSON_BY_ID_QUERYResult>;
  userId: string | null;
}

export function LessonPageContent({ lesson, userId }: LessonPageContentProps) {
  const userTier = useUserTier();

  const courses = lesson.courses ?? [];
  const accessibleCourse = courses.find((course) =>
    hasTierAccess(userTier, course.tier),
  );
  const hasAccess = !!accessibleCourse;
  const activeCourse = accessibleCourse ?? courses[0];

  const isCompleted = userId
    ? (lesson.completedBy?.includes(userId) ?? false)
    : false;

  const modules = activeCourse?.modules;
  let prevLesson: { id: string; slug: string; title: string } | null = null;
  let nextLesson: { id: string; slug: string; title: string } | null = null;
  const completedLessonIds: string[] = [];

  if (modules) {
    const allLessons: Array<{ id: string; slug: string; title: string }> = [];

    for (const module of modules) {
      if (module.lessons) {
        for (const l of module.lessons) {
          allLessons.push({
            id: l._id,
            slug: l.slug!.current!,
            title: l.title ?? "Untitled Lesson",
          });
          if (userId && l.completedBy?.includes(userId)) {
            completedLessonIds.push(l._id);
          }
        }
      }
    }

    const currentIndex = allLessons.findIndex((l) => l.id === lesson._id);
    prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    nextLesson =
      currentIndex < allLessons.length - 1
        ? allLessons[currentIndex + 1]
        : null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">

      {/* ── Sidebar ── */}
      {activeCourse && hasAccess && (
        <LessonSidebar
          courseSlug={activeCourse.slug!.current!}
          courseTitle={activeCourse.title}
          modules={activeCourse.modules ?? null}
          currentLessonId={lesson._id}
          completedLessonIds={completedLessonIds}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">
        {hasAccess ? (
          <div className="space-y-6">

            {/* Video player */}
            {lesson.video?.asset?.playbackId && (
              <MuxVideoPlayer
                playbackId={lesson.video?.asset?.playbackId}
                title={lesson.title ?? undefined}
              />
            )}

            {/* Lesson header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl font-semibold text-zinc-900 leading-snug mb-1.5">
                  {lesson.title ?? "Untitled Lesson"}
                </h1>
                {lesson.description && (
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {lesson.description}
                  </p>
                )}
              </div>

              {userId && (
                <LessonCompleteButton
                  lessonId={lesson._id}
                  lessonSlug={lesson.slug!.current!}
                  isCompleted={isCompleted}
                />
              )}
            </div>

            {/* Lesson notes */}
            {lesson.content && (
              <div className=" border border-zinc-200 bg-white overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-100 bg-zinc-50">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.75} />
                  <h2 className="text-xs font-medium text-black tracking-wide">
                    Lesson Notes
                  </h2>
                </div>
                <div className="px-6 py-6">
                  <LessonContent content={lesson.content} />
                </div>
              </div>
            )}

            {/* Prev / Next navigation */}
            <div>
              <Separator className="mb-5" />
              <div className="flex items-center justify-between">
                {prevLesson ? (
                  <Link href={`/lessons/${prevLesson.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-sm border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 shadow-none text-xs gap-1.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
                      <span className="hidden sm:inline max-w-[12rem] truncate">
                        {prevLesson.title}
                      </span>
                      <span className="sm:hidden">Previous</span>
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Link href={`/lessons/${nextLesson.slug}`}>
                    <Button
                      size="sm"
                      className="rounded-sm bg-zinc-900 text-white hover:bg-zinc-800 shadow-none text-xs gap-1.5"
                    >
                      <span className="hidden sm:inline max-w-[12rem] truncate">
                        {nextLesson.title}
                      </span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>

          </div>
        ) : (
          <GatedFallback requiredTier={activeCourse?.tier} />
        )}
      </div>

    </div>
  );
}