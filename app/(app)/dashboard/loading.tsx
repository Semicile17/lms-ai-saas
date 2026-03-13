import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function Loading() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header Skeleton ── */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Skeleton className="w-8 h-8 rounded-sm" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-14 h-3 rounded-sm" />
              <Skeleton className="w-10 h-2 rounded-sm" />
            </div>
          </div>

          {/* Nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <Skeleton className="w-24 h-8 rounded-sm" />
            <Skeleton className="w-24 h-8 rounded-sm" />
            <Skeleton className="w-20 h-8 rounded-sm" />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <Skeleton className="w-20 h-8 rounded-sm hidden md:block" />
            <Skeleton className="w-24 h-8 rounded-sm hidden sm:block" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-12">

        {/* Welcome */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <Skeleton className="h-9 w-72 rounded-sm" />
            <Skeleton className="h-6 w-28 rounded-sm" />
          </div>
          <Skeleton className="h-4 w-80 rounded-sm" />
        </div>

        <Separator className="mb-10" />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {["a", "b", "c"].map((id) => (
            <div
              key={id}
              className="p-5 rounded-sm border border-zinc-100 bg-zinc-50 flex items-center gap-4"
            >
              <Skeleton className="w-9 h-9 rounded-sm shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-10 rounded-sm" />
                <Skeleton className="h-3 w-24 rounded-sm" />
              </div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-28 rounded-sm" />
          <Skeleton className="h-3 w-16 rounded-sm" />
        </div>

        {/* Filter tabs + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-0.5 p-1 rounded-sm border border-zinc-200 bg-zinc-100">
            {["a", "b", "c", "d"].map((id) => (
              <Skeleton key={id} className="w-14 h-7 rounded-sm" />
            ))}
          </div>
          <Skeleton className="w-64 h-9 rounded-sm" />
        </div>

        {/* Course grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {["a", "b", "c", "d", "e", "f"].map((id) => (
            <div
              key={id}
              className="rounded-sm border border-zinc-200 bg-white overflow-hidden"
            >
              {/* Thumbnail */}
              <Skeleton className="w-full h-40 rounded-none" />

              {/* Content */}
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-3/4 rounded-sm" />
                <Skeleton className="h-3 w-full rounded-sm" />
                <Skeleton className="h-3 w-2/3 rounded-sm" />
                <div className="flex items-center gap-4 pt-1">
                  <Skeleton className="h-3 w-20 rounded-sm" />
                  <Skeleton className="h-3 w-20 rounded-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default Loading;