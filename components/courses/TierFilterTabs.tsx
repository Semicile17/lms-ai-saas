"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Tier } from "@/lib/constants";

export type TierFilter = Tier | "all";

interface TierFilterTabsProps {
  activeFilter: TierFilter;
  onFilterChange: (filter: TierFilter) => void;
  className?: string;
}

const FILTER_OPTIONS: { value: TierFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "ultra", label: "Ultra" },
];

export function TierFilterTabs({
  activeFilter,
  onFilterChange,
  className,
}: TierFilterTabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 p-1 rounded-sm bg-zinc-100 border border-zinc-200",
        className,
      )}
    >
      {FILTER_OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange(option.value)}
          className={cn(
            "px-4 h-7 text-xs font-medium rounded-sm transition-all duration-150 shadow-none",
            activeFilter === option.value
              ? "bg-white text-zinc-900 border border-zinc-200 hover:bg-white hover:text-zinc-900"
              : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 border border-transparent"
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}