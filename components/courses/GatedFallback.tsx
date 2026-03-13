import Link from "next/link";
import { Lock, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TIER_FEATURES, TIER_STYLES, type Tier } from "@/lib/constants";

interface GatedFallbackProps {
  requiredTier: Tier | null | undefined;
}

export function GatedFallback({ requiredTier }: GatedFallbackProps) {
  const displayTier = requiredTier ?? "pro";
  const styles = TIER_STYLES[displayTier];

  const tierFeatures = TIER_FEATURES.find(
    (t) => t.tier.toLowerCase() === displayTier,
  );

  const tierLabel = displayTier.charAt(0).toUpperCase() + displayTier.slice(1);

  const tierAccentClass =
    displayTier === "ultra"
      ? "border-cyan-200 bg-cyan-50 text-cyan-700"
      : displayTier === "pro"
        ? "border-violet-200 bg-violet-50 text-violet-700"
        : "border-emerald-200 bg-emerald-50 text-emerald-700";

  const tierIconClass =
    displayTier === "ultra"
      ? "text-cyan-600"
      : displayTier === "pro"
        ? "text-violet-600"
        : "text-emerald-600";

  return (
    <div className="rounded-sm border border-zinc-200 bg-zinc-50 overflow-hidden">
      <div className="max-w-lg mx-auto px-8 py-14 text-center">

        {/* Lock icon */}
        <div className="w-10 h-10 rounded-sm border border-zinc-200 bg-white flex items-center justify-center mx-auto mb-6">
          <Lock className="w-4 h-4 text-zinc-400" strokeWidth={1.75} />
        </div>

        {/* Tier badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border text-xs font-medium tracking-wide mb-5 ${tierAccentClass}`}>
          <Sparkles className="w-3 h-3" />
          {tierLabel} required
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-zinc-900 mb-3 leading-snug">
          Upgrade to {tierLabel} to unlock this course
        </h2>

        {/* Description */}
        <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
          This course requires a {tierLabel} subscription. Upgrade your plan to
          access this content and everything else included in {tierLabel}.
        </p>

        {/* Features list */}
        {tierFeatures && (
          <div className="rounded-sm border border-zinc-200 bg-white text-left mb-8 overflow-hidden">
            <div className="px-5 py-3 border-b border-zinc-100 flex items-center gap-2">
              <Sparkles className={`w-3.5 h-3.5 ${tierIconClass}`} strokeWidth={1.75} />
              <span className="text-xs font-medium text-zinc-600">
                {tierFeatures.tier} includes
              </span>
            </div>
            <ul className="divide-y divide-zinc-100">
              {tierFeatures.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-zinc-600"
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${tierIconClass}`}
                    strokeWidth={2}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <Link href="/pricing">
          <Button
            size="sm"
            className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-sm font-medium shadow-none px-6 gap-1.5"
          >
            View pricing plans
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>

      </div>
    </div>
  );
}