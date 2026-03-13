"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Play, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";

type Course = NonNullable<LESSON_BY_ID_QUERYResult>["courses"][number];
type CourseModules = Course["modules"];
type Module = NonNullable<CourseModules>[number];
type Lesson = NonNullable<Module["lessons"]>[number];

interface LessonSidebarProps {
  courseSlug: string;
  courseTitle: string | null;
  modules: Module[] | null;
  currentLessonId: string;
  completedLessonIds?: string[];
}

export function LessonSidebar({
  courseSlug,
  courseTitle,
  modules,
  currentLessonId,
  completedLessonIds = [],
}: LessonSidebarProps) {
  if (!modules || modules.length === 0) return null;

  const currentModuleId = modules.find((m) =>
    m.lessons?.some((l) => l._id === currentLessonId),
  )?._id;

  return (
    <div className="w-full lg:w-72 shrink-0">
      <div className="sticky top-20  border border-zinc-200 bg-white overflow-hidden">

        {/* ── Course header ── */}
        <div className="px-4 py-4 border-b border-zinc-100">
          <Link
            href={`/courses/${courseSlug}`}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors mb-2.5 group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to course
          </Link>
          <h3 className="text-sm font-medium text-zinc-800 line-clamp-2 leading-snug">
            {courseTitle ?? "Course"}
          </h3>
        </div>

        {/* ── Modules ── */}
        <div className="max-h-[60vh] overflow-y-auto">
          <Accordion
            type="multiple"
            defaultValue={currentModuleId ? [currentModuleId] : []}
            className="w-full"
          >
            {modules.map((module, moduleIndex) => {
              const lessonCount = module.lessons?.length ?? 0;
              const completedCount =
                module.lessons?.filter((l) =>
                  completedLessonIds.includes(l._id),
                ).length ?? 0;

              return (
                <AccordionItem
                  key={module._id}
                  value={module._id}
                  className="border-none border-b border-zinc-100 last:border-b-0"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-zinc-50 transition-colors text-left">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Module number */}
                      <span className="text-[11px] font-medium text-zinc-300 tabular-nums shrink-0 w-4 text-right">
                        {String(moduleIndex + 1).padStart(2, "0")}
                      </span>

                      <Separator orientation="vertical" className="h-3.5 shrink-0" />

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-zinc-700 truncate">
                          {module.title ?? "Untitled Module"}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {completedCount}/{lessonCount} done
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-1 pt-0">
                    <div className="border-t border-zinc-100 divide-y divide-zinc-100">
                      {module.lessons?.map((lesson, lessonIndex) => {
                        const isActive = lesson._id === currentLessonId;
                        const isCompleted = completedLessonIds.includes(lesson._id);

                        return (
                          <Link
                            key={lesson._id}
                            href={`/lessons/${lesson.slug!.current!}`}
                            className={cn(
                              "flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors",
                              isActive
                                ? "bg-zinc-100 text-zinc-900 font-medium"
                                : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50",
                            )}
                          >
                            {/* Status icon */}
                            {isCompleted ? (
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-emerald-500 shrink-0"
                                strokeWidth={2}
                              />
                            ) : isActive ? (
                              <Play
                                className="w-3.5 h-3.5 text-zinc-700 shrink-0 fill-zinc-700"
                                strokeWidth={1.75}
                              />
                            ) : (
                              <Circle
                                className="w-3.5 h-3.5 text-zinc-300 shrink-0"
                                strokeWidth={1.75}
                              />
                            )}

                            {/* Lesson number */}
                            <span className="text-[11px] text-zinc-300 tabular-nums shrink-0">
                              {lessonIndex + 1}
                            </span>

                            <span className="truncate">
                              {lesson.title ?? "Untitled Lesson"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}