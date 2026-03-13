"use client";

import Link from "next/link";
import { Play, CheckCircle2, Circle, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { COURSE_WITH_MODULES_QUERYResult } from "@/sanity.types";

type Module = NonNullable<
  NonNullable<COURSE_WITH_MODULES_QUERYResult>["modules"]
>[number];
type Lesson = NonNullable<Module["lessons"]>[number];

interface ModuleAccordionProps {
  modules: Module[] | null;
  userId?: string | null;
}

export function ModuleAccordion({ modules, userId }: ModuleAccordionProps) {
  if (!modules || modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-zinc-100 rounded-sm bg-zinc-50">
        <div className="w-9 h-9 rounded-sm border border-zinc-200 bg-white flex items-center justify-center mb-3">
          <BookOpen className="w-4 h-4 text-zinc-400" strokeWidth={1.75} />
        </div>
        <p className="text-sm text-zinc-400">No modules available yet.</p>
      </div>
    );
  }

  const isLessonCompleted = (lesson: Lesson): boolean => {
    if (!userId || !lesson.completedBy) return false;
    return lesson.completedBy.includes(userId);
  };

  const getModuleProgress = (module: Module): { completed: number; total: number } => {
    const lessons = module.lessons ?? [];
    const total = lessons.length;
    const completed = lessons.filter((lesson) => isLessonCompleted(lesson)).length;
    return { completed, total };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-zinc-900">Course Content</h2>
        <span className="text-xs text-zinc-400">{modules.length} modules</span>
      </div>

      <Accordion type="multiple" className="space-y-px border border-zinc-200 rounded-sm overflow-hidden">
        {modules.map((module, index) => {
          const { completed, total } = getModuleProgress(module);
          const isModuleComplete = total > 0 && completed === total;
          const progressPercent = total > 0 ? (completed / total) * 100 : 0;

          return (
            <AccordionItem
              key={module._id}
              value={module._id}
              className="border-none bg-white data-[state=open]:bg-zinc-50 transition-colors"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-zinc-50 transition-colors group">
                <div className="flex items-center gap-4 flex-1 min-w-0">

                  {/* Index */}
                  <span className="text-xs font-medium text-zinc-300 tabular-nums shrink-0 w-5 text-right">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <Separator orientation="vertical" className="h-4 shrink-0" />

                  {/* Title + meta */}
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-sm font-medium text-zinc-800 truncate">
                      {module.title ?? "Untitled Module"}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {total} {total === 1 ? "lesson" : "lessons"}
                      {userId && total > 0 && (
                        <span className="ml-2 text-zinc-400">
                          · {completed}/{total} done
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Progress */}
                  {userId && total > 0 && (
                    <div className="hidden sm:flex items-center gap-2 shrink-0 w-32">
                      {isModuleComplete ? (
                        <div className="flex items-center gap-1.5 text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                          <span className="text-[11px] font-medium">Complete</span>
                        </div>
                      ) : (
                        <Progress
                          value={progressPercent}
                          className="flex-1 h-1 bg-zinc-200 rounded-none [&>div]:bg-zinc-800"
                        />
                      )}
                    </div>
                  )}

                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-0">
                <div className="border-t border-zinc-100">
                  {module.lessons?.map((lesson, lessonIndex) => {
                    const done = isLessonCompleted(lesson);
                    const hasVideo = !!lesson.video?.asset?.playbackId;
                    const isLast = lessonIndex === (module.lessons?.length ?? 0) - 1;

                    return (
                      <div key={lesson._id}>
                        <Link
                          href={`/lessons/${lesson.slug!.current!}`}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-zinc-50 transition-colors group"
                        >
                          {/* Completion icon */}
                          {done ? (
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-emerald-500 shrink-0"
                              strokeWidth={2}
                            />
                          ) : (
                            <Circle
                              className="w-3.5 h-3.5 text-zinc-300 shrink-0 group-hover:text-zinc-400 transition-colors"
                              strokeWidth={1.75}
                            />
                          )}

                          {/* Lesson number */}
                          <span className="text-[11px] text-zinc-300 tabular-nums shrink-0 w-4">
                            {lessonIndex + 1}
                          </span>

                          {/* Title */}
                          <span className={`flex-1 text-sm transition-colors ${
                            done
                              ? "text-zinc-400"
                              : "text-zinc-600 group-hover:text-zinc-900"
                          }`}>
                            {lesson.title ?? "Untitled Lesson"}
                          </span>

                          {/* Video pill */}
                          {hasVideo && (
                            <span className="flex items-center gap-1 text-[10px] text-zinc-400 group-hover:text-zinc-600 transition-colors">
                              <Play className="w-3 h-3" strokeWidth={1.75} />
                              Video
                            </span>
                          )}
                        </Link>
                        {!isLast && <Separator />}
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}