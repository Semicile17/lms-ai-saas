import Link from "next/link";
import { PricingTable } from "@clerk/nextjs";
import Image from "next/image";
import { CheckCircle2, Sparkles, Loader2, Code2 } from "lucide-react";
import { TIER_FEATURES, getTierColorClasses } from "@/lib/constants";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />

      <main className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Hero ── */}
        <div className="text-center py-16 border-b border-zinc-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-zinc-200 bg-zinc-50 text-xs text-zinc-500 mb-6">
            <Sparkles className="w-3 h-3" strokeWidth={1.75} />
            Simple, transparent pricing
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-4 leading-tight">
            Choose your learning path
          </h1>
          <p className="text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
            Start free, upgrade when you&apos;re ready. Unlock Pro for advanced
            content or go Ultra for AI-powered learning, exclusive masterclasses,
            and 1-on-1 access.
          </p>
        </div>

        {/* ── Tier feature overview ── */}
        <div className="py-12 border-b border-zinc-100">
          <p className="text-xs text-zinc-400 font-medium tracking-wide uppercase mb-6">
            What&apos;s included
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-200 rounded-sm overflow-hidden border border-zinc-200">
            {TIER_FEATURES.map((plan) => {
              const colorClasses = getTierColorClasses(plan.color);
              const accentClass =
                plan.color === "cyan"
                  ? "text-cyan-600"
                  : plan.color === "violet"
                    ? "text-violet-600"
                    : "text-emerald-600";
              const badgeClass =
                plan.color === "cyan"
                  ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                  : plan.color === "violet"
                    ? "border-violet-200 bg-violet-50 text-violet-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700";

              return (
                <div key={plan.tier} className="bg-white p-6">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-[11px] font-medium tracking-wide uppercase mb-4 ${badgeClass}`}>
                    <Sparkles className="w-2.5 h-2.5" strokeWidth={2} />
                    {plan.tier}
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-zinc-600 font-light"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accentClass}`}
                          strokeWidth={2}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Clerk Pricing Table ── */}
        <div className="py-12 border-b border-zinc-100">
          <p className="text-xs text-zinc-400 font-medium tracking-wide uppercase mb-6">
            Plans &amp; pricing
          </p>
          <div className="rounded-sm border border-zinc-200 overflow-hidden bg-zinc-50 p-6 md:p-10">
            <PricingTable
              appearance={{
                elements: {
                  pricingTable: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "1.25rem",
                  },
                  pricingTableCard: {
                    borderRadius: "2px",
                    border: "1px solid #e4e4e7",
                    boxShadow: "none",
                    transition: "border-color 0.2s ease",
                    overflow: "hidden",
                    background: "#ffffff",
                  },
                  pricingTableCardHeader: {
                    background: "#fafaf9",
                    borderBottom: "1px solid #e4e4e7",
                    padding: "1.5rem",
                  },
                  pricingTableCardTitle: {
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#18181b",
                    marginBottom: "0.25rem",
                  },
                  pricingTableCardDescription: {
                    fontSize: "0.8rem",
                    color: "#a1a1aa",
                    fontWeight: "400",
                  },
                  pricingTableCardFee: {
                    color: "#18181b",
                    fontWeight: "700",
                    fontSize: "2rem",
                  },
                  pricingTableCardFeePeriod: {
                    color: "#a1a1aa",
                    fontSize: "0.85rem",
                  },
                  pricingTableCardBody: {
                    padding: "1.5rem",
                    background: "#ffffff",
                  },
                  pricingTableCardFeatures: {
                    marginTop: "0.75rem",
                    gap: "0.5rem",
                  },
                  pricingTableCardFeature: {
                    fontSize: "0.85rem",
                    padding: "0.375rem 0",
                    fontWeight: "400",
                    color: "#52525b",
                  },
                  pricingTableCardButton: {
                    marginTop: "1.25rem",
                    borderRadius: "2px",
                    fontWeight: "500",
                    padding: "0.75rem 1.5rem",
                    transition: "background 0.15s ease",
                    fontSize: "0.875rem",
                    background: "#18181b",
                    border: "none",
                    boxShadow: "none",
                    color: "#ffffff",
                  },
                },
              }}
              fallback={
                <div className="flex items-center justify-center py-16">
                  <div className="text-center space-y-3">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-400 mx-auto" strokeWidth={1.75} />
                    <p className="text-xs text-zinc-400 font-light">
                      Loading pricing options...
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* ── Footer note ── */}
        <div className="py-8 text-center">
          <p className="text-xs text-zinc-400 font-light">
            Questions?{" "}
            <Link
              href="#"
              className="text-zinc-700 underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-600 transition-colors"
            >
              Contact us
            </Link>{" "}
            or check out our{" "}
            <Link
              href="#"
              className="text-zinc-700 underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-600 transition-colors"
            >
              FAQ
            </Link>
          </p>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0">
               <Image
                                src="/logo.svg"
                                alt="RE:EDU Logo"
                                width={32}
                                height={32}
                              />
            </div>
            <span className="text-sm font-medium text-zinc-800">
              RE:EDU&apos;s Academy
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <Link href="#" className="hover:text-zinc-700 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-zinc-700 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-zinc-700 transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-zinc-400 font-light">
            © 2024 RE:EDU&apos;s Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}