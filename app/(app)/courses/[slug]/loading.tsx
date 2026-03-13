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
      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-10 space-y-8">

        {/* Back link */}
        <Skeleton className="h-3.5 w-32 rounded-sm" />

        {/* Course Hero */}
        <div className="flex flex-col lg:flex-row gap-8">
          <Skeleton className="w-full lg:w-72 h-44 rounded-sm shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-14 rounded-sm" />
              <Skeleton className="h-5 w-24 rounded-sm" />
            </div>
            <Skeleton className="h-8 w-3/4 rounded-sm" />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-full rounded-sm" />
              <Skeleton className="h-3.5 w-2/3 rounded-sm" />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-3 w-20 rounded-sm" />
              <Skeleton className="h-3 w-3 rounded-sm" />
              <Skeleton className="h-3 w-16 rounded-sm" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Progress bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-sm border border-zinc-100 bg-zinc-50">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-24 rounded-sm" />
              <Skeleton className="h-3 w-20 rounded-sm" />
            </div>
            <Skeleton className="h-1 w-full rounded-none" />
          </div>
          <Skeleton className="h-8 w-36 rounded-sm shrink-0" />
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 rounded-sm" />
          <Skeleton className="h-3 w-16 rounded-sm" />
        </div>

        {/* Module accordion */}
        <div className="border border-zinc-200 rounded-sm overflow-hidden divide-y divide-zinc-100">
          {["a", "b", "c"].map((id) => (
            <div key={id} className="flex items-center gap-4 px-5 py-4 bg-white">
              <Skeleton className="w-5 h-3 rounded-sm shrink-0" />
              <Separator orientation="vertical" className="h-4 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-48 rounded-sm" />
                <Skeleton className="h-3 w-28 rounded-sm" />
              </div>
              <Skeleton className="w-24 h-1 rounded-none hidden sm:block" />
              <Skeleton className="w-4 h-4 rounded-sm" />
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default Loading;