import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function Loading() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <Skeleton className="w-8 h-8 rounded-sm" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-14 h-3 rounded-sm" />
              <Skeleton className="w-10 h-2 rounded-sm" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <Skeleton className="w-24 h-8 rounded-sm" />
            <Skeleton className="w-24 h-8 rounded-sm" />
            <Skeleton className="w-20 h-8 rounded-sm" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Skeleton className="w-20 h-8 rounded-sm hidden md:block" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-10">

        {/* Page header */}
        <div className="mb-6 space-y-1.5">
          <Skeleton className="h-5 w-28 rounded-sm" />
          <Skeleton className="h-3.5 w-64 rounded-sm" />
        </div>

        <Separator className="mb-8" />

        {/* Course count label */}
        <Skeleton className="h-3 w-36 rounded-sm mb-5" />

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {["a", "b", "c", "d", "e", "f"].map((id) => (
            <div
              key={id}
              className="rounded-sm border border-zinc-200 bg-white overflow-hidden"
            >
              {/* Thumbnail */}
              <Skeleton className="w-full h-40 rounded-none" />
              {/* Card body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-12 rounded-sm" />
                  <Skeleton className="h-4 w-20 rounded-sm" />
                </div>
                <Skeleton className="h-4 w-4/5 rounded-sm" />
                <Skeleton className="h-3 w-3/5 rounded-sm" />
                <div className="flex items-center gap-3 pt-1">
                  <Skeleton className="h-2.5 w-16 rounded-sm" />
                  <Skeleton className="h-2.5 w-14 rounded-sm" />
                </div>
                {/* Progress bar */}
                <Skeleton className="h-1 w-full rounded-none" />
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default Loading;