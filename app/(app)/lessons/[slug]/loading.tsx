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
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="rounded-sm border border-zinc-200 bg-white overflow-hidden">
              {/* Header */}
              <div className="px-4 py-4 border-b border-zinc-100 space-y-2.5">
                <Skeleton className="h-3 w-28 rounded-sm" />
                <Skeleton className="h-4 w-full rounded-sm" />
              </div>

              {/* Modules */}
              <div className="divide-y divide-zinc-100">
                {/* Module 1 — expanded */}
                <div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Skeleton className="w-5 h-3 rounded-sm shrink-0" />
                    <Separator orientation="vertical" className="h-3.5 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-36 rounded-sm" />
                      <Skeleton className="h-2.5 w-16 rounded-sm" />
                    </div>
                    <Skeleton className="w-4 h-4 rounded-sm shrink-0" />
                  </div>
                  {/* Expanded lessons */}
                  <div className="border-t border-zinc-100 divide-y divide-zinc-100">
                    {["a", "b", "c"].map((id) => (
                      <div key={id} className={`flex items-center gap-2.5 px-4 py-2.5 ${id === "a" ? "bg-zinc-100" : ""}`}>
                        <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
                        <Skeleton className="w-3 h-2.5 rounded-sm shrink-0" />
                        <Skeleton className="h-3 rounded-sm" style={{ width: id === "a" ? "60%" : id === "b" ? "70%" : "55%" }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 2 — collapsed */}
                {["b", "c"].map((id) => (
                  <div key={id} className="flex items-center gap-3 px-4 py-3">
                    <Skeleton className="w-5 h-3 rounded-sm shrink-0" />
                    <Separator orientation="vertical" className="h-3.5 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 rounded-sm" style={{ width: id === "b" ? "55%" : "65%" }} />
                      <Skeleton className="h-2.5 w-16 rounded-sm" />
                    </div>
                    <Skeleton className="w-4 h-4 rounded-sm shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Video player */}
            <Skeleton className="w-full aspect-video rounded-sm" />

            {/* Lesson header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-3/4 rounded-sm" />
                <Skeleton className="h-3.5 w-1/2 rounded-sm" />
              </div>
              <Skeleton className="h-8 w-32 rounded-sm shrink-0" />
            </div>

            {/* Lesson notes */}
            <div className="rounded-sm border border-zinc-200 bg-white overflow-hidden">
              {/* Notes header */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-100 bg-zinc-50">
                <Skeleton className="w-3.5 h-3.5 rounded-sm" />
                <Skeleton className="h-3 w-24 rounded-sm" />
              </div>
              {/* Notes content */}
              <div className="px-6 py-6 space-y-4">
                <Skeleton className="h-5 w-48 rounded-sm" />
                <div className="space-y-2">
                  <Skeleton className="h-3.5 w-full rounded-sm" />
                  <Skeleton className="h-3.5 w-5/6 rounded-sm" />
                  <Skeleton className="h-3.5 w-3/4 rounded-sm" />
                </div>
                <Skeleton className="h-4 w-36 rounded-sm" />
                <div className="space-y-2 pl-4 border-l-2 border-zinc-100">
                  <Skeleton className="h-3.5 w-4/5 rounded-sm" />
                  <Skeleton className="h-3.5 w-3/5 rounded-sm" />
                  <Skeleton className="h-3.5 w-2/3 rounded-sm" />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <Separator className="mb-5" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-28 rounded-sm" />
                <Skeleton className="h-8 w-28 rounded-sm" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Loading;