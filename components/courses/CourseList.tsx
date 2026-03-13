"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./CourseCard";
import { TierFilterTabs, type TierFilter } from "./TierFilterTabs";
import { useUserTier, hasTierAccess } from "@/lib/hooks/use-user-tier";
import type { DASHBOARD_COURSES_QUERYResult } from "@/sanity.types";

export type CourseListCourse = DASHBOARD_COURSES_QUERYResult[number];

interface CourseListProps {
  courses: CourseListCourse[];
  showFilters?: boolean;
  showSearch?: boolean;
  emptyMessage?: string;
}

export function CourseList({
  courses,
  showFilters = true,
  showSearch = true,
  emptyMessage = "No courses found",
}: CourseListProps) {
  const userTier = useUserTier();
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    if (tierFilter !== "all" && course.tier !== tierFilter) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const title = course.title?.toLowerCase() ?? "";
      const description = course.description?.toLowerCase() ?? "";
      if (!title.includes(query) && !description.includes(query)) return false;
    }
    return true;
  });

  const hasActiveFilters = tierFilter !== "all" || searchQuery.trim() !== "";

  return (
    <div className="space-y-6">

      {/* ── Filters & Search ── */}
      {(showFilters || showSearch) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {showFilters && (
            <TierFilterTabs
              activeFilter={tierFilter}
              onFilterChange={setTierFilter}
            />
          )}

          {showSearch && (
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400"
                strokeWidth={1.75}
              />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 h-9 rounded-sm border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 text-sm focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:ring-offset-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Results count ── */}
      {hasActiveFilters && (
        <p className="text-xs text-zinc-400">
          {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
        </p>
      )}

      {/* ── Course Grid ── */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.slug!.current!}
              slug={{ current: course.slug!.current! }}
              title={course.title}
              description={course.description}
              tier={course.tier}
              thumbnail={course.thumbnail}
              moduleCount={course.moduleCount}
              lessonCount={course.lessonCount}
              isLocked={!hasTierAccess(userTier, course.tier)}
            />
          ))}
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-20 text-center border border-zinc-100 rounded-sm bg-zinc-50">
          <div className="w-10 h-10 rounded-sm border border-zinc-200 bg-white flex items-center justify-center mb-4">
            <Search className="w-4 h-4 text-zinc-400" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-zinc-600 mb-1">
            {searchQuery ? `No results for "${searchQuery}"` : emptyMessage}
          </p>
          <p className="text-xs text-zinc-400 mb-4">
            {hasActiveFilters ? "Try adjusting your filters or search query." : "Check back soon for new content."}
          </p>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTierFilter("all");
                setSearchQuery("");
              }}
              className="rounded-sm border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 text-xs h-8 shadow-none"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}