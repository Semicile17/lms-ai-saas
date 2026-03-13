import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { CourseList } from "@/components/courses";
import { sanityFetch } from "@/sanity/lib/live";
import { DASHBOARD_COURSES_QUERY } from "@/sanity/lib/queries";
import { getUserTier } from "@/lib/course-access";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const [{ data: courses }, userTier] = await Promise.all([
    sanityFetch({
      query: DASHBOARD_COURSES_QUERY,
      params: { userId: user.id },
    }),
    getUserTier(),
  ]);

  const firstName = user.firstName ?? user.username ?? "there";

  const tierLabel =
    userTier === "ultra"
      ? "Ultra"
      : userTier === "pro"
        ? "Pro"
        : "Free";

  const tierColor =
    userTier === "ultra"
      ? "border-cyan-200 bg-cyan-50 text-cyan-700"
      : userTier === "pro"
        ? "border-violet-200 bg-violet-50 text-violet-700"
        : "border-zinc-200 bg-zinc-50 text-zinc-600";

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-12">

        {/* ── Welcome ── */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
              Welcome back, {firstName}
            </h1>
            <Badge
              variant="outline"
              className={`${tierColor} rounded-sm text-xs font-medium tracking-wide px-3 py-1 h-fit shrink-0 gap-1.5 flex items-center`}
            >
              <Sparkles className="w-3 h-3" />
              {tierLabel} Member
            </Badge>
          </div>
          <p className="text-zinc-400 font-light text-base leading-relaxed max-w-xl">
            Pick up where you left off or discover something new.
          </p>
        </div>

        <Separator className="mb-10" />

        {/* ── Stats & Upgrade ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">

          {/* Available Courses */}
          <div className="p-5 rounded-sm border border-zinc-200 bg-zinc-50 flex items-center gap-4">
            <div className="w-9 h-9 rounded-sm bg-white border border-zinc-200 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-zinc-500" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-zinc-900 leading-none mb-0.5">
                {courses.length}
              </p>
              <p className="text-xs text-zinc-400 tracking-wide">Available Courses</p>
            </div>
          </div>

          {/* Current Plan */}
          <div className="p-5 rounded-sm border border-zinc-200 bg-zinc-50 flex items-center gap-4">
            <div className="w-9 h-9 rounded-sm bg-white border border-zinc-200 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-zinc-500" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-zinc-900 leading-none mb-0.5 capitalize">
                {tierLabel}
              </p>
              <p className="text-xs text-zinc-400 tracking-wide">Current Plan</p>
            </div>
          </div>

          {/* Upgrade CTA */}
          {userTier !== "ultra" && (
            <Link
              href="/pricing"
              className="p-5 rounded-sm border border-zinc-900 bg-zinc-900 hover:bg-zinc-800 transition-colors duration-150 flex items-center justify-between group"
            >
              <div>
                <p className="text-sm font-medium text-white mb-0.5">
                  Upgrade to {userTier === "free" ? "Pro" : "Ultra"}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {userTier === "pro"
                    ? "AI Assistant & exclusive content"
                    : "Unlock more courses & features"}
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-4"
              />
            </Link>
          )}
        </div>

        {/* ── Course List ── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-zinc-900">All Courses</h2>
            <span className="text-xs text-zinc-400">{courses.length} courses</span>
          </div>
          <CourseList
            courses={courses}
            showFilters
            showSearch
            emptyMessage="No courses available yet. Check back soon!"
          />
        </div>

      </main>
    </div>
  );
}