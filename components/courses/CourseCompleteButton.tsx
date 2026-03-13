"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Circle, Loader2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toggleCourseCompletion } from "@/lib/actions";

interface CourseCompleteButtonProps {
  courseId: string;
  courseSlug: string;
  isCompleted: boolean;
  completedLessons: number;
  totalLessons: number;
}

export function CourseCompleteButton({
  courseId,
  courseSlug,
  isCompleted: initialCompleted,
  completedLessons,
  totalLessons,
}: CourseCompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();

  const allLessonsCompleted =
    completedLessons === totalLessons && totalLessons > 0;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleCourseCompletion(
        courseId,
        courseSlug,
        !isCompleted,
      );
      if (result.success) {
        setIsCompleted(result.isCompleted);
      }
    });
  };

  // ── Completed state ──
  if (isCompleted) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-sm border border-emerald-200 bg-emerald-50">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-sm border border-emerald-200 bg-white flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Course completed
            </p>
            <p className="text-xs text-emerald-600/70">
              {completedLessons} of {totalLessons} lessons done
            </p>
          </div>
        </div>
        <Button
          onClick={handleToggle}
          disabled={isPending}
          variant="outline"
          size="sm"
          className="rounded-sm border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 text-xs shadow-none sm:ml-auto"
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Circle className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} />
          )}
          Mark incomplete
        </Button>
      </div>
    );
  }

  // ── In-progress state ──
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-sm border border-zinc-200 bg-zinc-50">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-zinc-700">Your progress</p>
          <span className="text-xs text-zinc-400">
            {completedLessons} / {totalLessons} lessons
          </span>
        </div>
        <Progress
          value={progressPercent}
          className="h-1 bg-zinc-200 rounded-none [&>div]:bg-zinc-800"
        />
      </div>

      <Button
        onClick={handleToggle}
        disabled={isPending || !allLessonsCompleted}
        size="sm"
        className={
          allLessonsCompleted
            ? "bg-zinc-900 text-white hover:bg-zinc-800 rounded-sm text-xs font-medium shadow-none shrink-0"
            : "bg-zinc-100 text-zinc-400 cursor-not-allowed rounded-sm text-xs font-normal shadow-none shrink-0 border border-zinc-200"
        }
      >
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
        ) : (
          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} />
        )}
        {allLessonsCompleted ? "Mark complete" : "Complete all lessons first"}
      </Button>
    </div>
  );
}