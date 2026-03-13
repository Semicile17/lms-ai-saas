import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { CourseCard } from "@/components/courses";
import { Separator } from "@/components/ui/separator";
import { sanityFetch } from "@/sanity/lib/live";
import { DASHBOARD_COURSES_QUERY } from "@/sanity/lib/queries";

export default async function MyCoursesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const { data: courses } = await sanityFetch({
    query: DASHBOARD_COURSES_QUERY,
    params: { userId: user.id },
  });

  type Course = (typeof courses)[number];
  type CourseWithProgress = Course & {
    totalLessons: number;
    completedLessons: number;
  };

  const startedCourses = courses.reduce((acc: CourseWithProgress[], course: any) => {
    const { total, completed } = (course.modules ?? []).reduce(
      (stats: { total: number; completed: number }, m: any) =>
        (m.lessons ?? []).reduce(
          (s: { total: number; completed: number }, l: any) => ({
            total: s.total + 1,
            completed: s.completed + (l.completedBy?.includes(user.id) ? 1 : 0),
          }),
          stats,
        ),
      { total: 0, completed: 0 },
    );

    if (completed > 0) {
      acc.push({ ...course, totalLessons: total, completedLessons: completed });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-10">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900 mb-1">My Courses</h1>
          <p className="text-sm text-zinc-400 font-light">
            Courses you&apos;ve started learning. Pick up where you left off.
          </p>
        </div>

        <Separator className="mb-8" />

        {startedCourses.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs text-zinc-400">
                {startedCourses.length} {startedCourses.length === 1 ? "course" : "courses"} in progress
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {startedCourses.map((course: { slug: any; title: string | null; description: string | null; tier: string | null; thumbnail: { asset: { _id: string; url: string | null; } | null; } | null; moduleCount: number | null; totalLessons: number | null; completedLessons: number | null | undefined; completedBy: string | string[]; }) => (
                <CourseCard
                  key={course.slug!.current!}
                  slug={{ current: course.slug!.current! }}
                  title={course.title}
                  description={course.description}
                  tier={course.tier as "free" | "pro" | "ultra" | null}
                  thumbnail={course.thumbnail}
                  moduleCount={course.moduleCount}
                  lessonCount={course.totalLessons}
                  completedLessonCount={course.completedLessons}
                  isCompleted={course.completedBy?.includes(user.id) ?? false}
                  showProgress
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-zinc-100 rounded-sm bg-zinc-50">
            <div className="w-9 h-9 rounded-sm border border-zinc-200 bg-white flex items-center justify-center mb-4">
              <BookOpen className="w-4 h-4 text-zinc-400" strokeWidth={1.75} />
            </div>
            <h3 className="text-sm font-medium text-zinc-800 mb-1.5">
              No courses started yet
            </h3>
            <p className="text-xs text-zinc-400 font-light max-w-xs leading-relaxed">
              Browse the course catalog and start learning. Your progress will
              appear here once you complete your first lesson.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}