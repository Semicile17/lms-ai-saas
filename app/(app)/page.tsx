import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { CourseCard } from "@/components/courses";
import {
  ArrowRight,
  Play,
  BookOpen,
  Code2,
  Rocket,
  Crown,
  CheckCircle2,
  Star,
  Users,
  Trophy,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_COURSES_QUERY, STATS_QUERY } from "@/sanity/lib/queries";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const [{ data: courses }, { data: stats }, user] = await Promise.all([
    sanityFetch({ query: FEATURED_COURSES_QUERY }),
    sanityFetch({ query: STATS_QUERY }),
    currentUser(),
  ]);

  const isSignedIn = !!user;

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Newsreader', Georgia, serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .fu-1 { animation-delay: 0.05s; }
        .fu-2 { animation-delay: 0.15s; }
        .fu-3 { animation-delay: 0.25s; }
        .fu-4 { animation-delay: 0.35s; }
        .fu-5 { animation-delay: 0.45s; }
      `}</style>

      {/* Navigation */}
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-zinc-100 bg-[#fafaf9]">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="max-w-3xl">
              <Badge
                variant="outline"
                className="fu fu-1 border-amber-200 bg-amber-50 text-amber-700 text-xs tracking-wide rounded-sm mb-6 px-3 py-1 gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                Real-world projects · Pro & Ultra tiers
              </Badge>

              <h1 className="serif fu fu-2 text-[clamp(2.6rem,6vw,4.5rem)] font-light leading-[1.08] tracking-tight text-zinc-900 mb-6">
                Learn to code,{" "}
                <em className="not-italic text-zinc-400">build things</em>
                <br />
                that actually work
              </h1>

              <p className="fu fu-3 text-base text-zinc-500 font-light leading-relaxed max-w-xl mb-10">
                RE:EDU&apos;s Academy brings you expert-crafted courses — from
                free fundamentals to{" "}
                <span className="text-violet-600 font-medium">Pro exclusives</span> and{" "}
                <span className="text-cyan-600 font-medium">Ultra gems</span> with AI-powered learning.
              </p>

              <div className="fu fu-4 flex flex-wrap items-center gap-3">
                {isSignedIn ? (
                  <>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-sm h-11 px-7 text-sm font-medium shadow-none"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Go to Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/courses">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-zinc-300 text-zinc-700 rounded-sm h-11 px-7 text-sm hover:bg-zinc-50 hover:text-zinc-900 shadow-none"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        My Courses
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/pricing">
                      <Button
                        size="lg"
                        className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-sm h-11 px-7 text-sm font-medium shadow-none"
                      >
                        <Play className="w-3.5 h-3.5 mr-2 fill-white" />
                        Start Learning Free
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-zinc-300 text-zinc-700 rounded-sm h-11 px-7 text-sm hover:bg-zinc-50 hover:text-zinc-900 shadow-none"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Browse Courses
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Stats row */}
              <div className="fu fu-5 flex items-center gap-8 mt-12 pt-8 border-t border-zinc-200">
                {[
                  { value: stats?.courseCount ?? 0, label: "Courses", icon: BookOpen },
                  { value: stats?.lessonCount ?? 0, label: "Lessons", icon: Play },
                  { value: "10K+", label: "Students", icon: Users },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    {i > 0 && <Separator orientation="vertical" className="h-6 mr-6" />}
                    <stat.icon className="w-4 h-4 text-zinc-400" />
                    <span className="text-lg font-semibold text-zinc-900">{stat.value}</span>
                    <span className="text-sm text-zinc-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Tiers ── */}
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-widest uppercase text-zinc-400 mb-2">Membership tiers</p>
              <h2 className="serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-zinc-900">
                Pick your path
              </h2>
            </div>
            <Link href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-800 flex items-center gap-1 transition-colors">
              See pricing <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-zinc-200 rounded-sm overflow-hidden border border-zinc-200">
            {[
              {
                tier: "Free",
                icon: Rocket,
                accentColor: "text-emerald-600",
                accentBg: "bg-emerald-50",
                description: "Start your journey with foundational courses",
                features: ["Core fundamentals", "Community access", "Basic projects"],
              },
              {
                tier: "Pro",
                icon: Crown,
                accentColor: "text-violet-600",
                accentBg: "bg-violet-50",
                description: "Level up with advanced, production-ready content",
                features: ["All Free content", "Advanced courses", "Priority support", "Certificates"],
                popular: true,
              },
              {
                tier: "Ultra",
                icon: Trophy,
                accentColor: "text-cyan-600",
                accentBg: "bg-cyan-50",
                description: "Unlock AI tutor & exclusive expert content",
                features: ["Everything in Pro", "AI Learning Assistant", "Exclusive content", "1-on-1 sessions"],
              },
            ].map((plan) => (
              <div
                key={plan.tier}
                className={`relative p-8 bg-white hover:bg-zinc-50/80 transition-colors duration-200 ${plan.popular ? "ring-inset ring-1 ring-violet-200" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute top-6 right-6 bg-violet-100 text-violet-700 border-none text-[10px] tracking-wide rounded-sm">
                    Popular
                  </Badge>
                )}
                <div className={`w-9 h-9 rounded-sm ${plan.accentBg} flex items-center justify-center mb-5`}>
                  <plan.icon className={`w-4.5 h-4.5 ${plan.accentColor}`} strokeWidth={1.6} style={{width:'1.1rem', height:'1.1rem'}} />
                </div>
                <h3 className="serif text-xl font-light text-zinc-900 mb-1">{plan.tier}</h3>
                <p className="text-sm text-zinc-400 font-light mb-6 leading-relaxed">{plan.description}</p>
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-600">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${plan.accentColor}`} strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Courses ── */}
        <section id="courses" className="bg-[#fafaf9] border-y border-zinc-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-widest uppercase text-zinc-400 mb-2">Featured</p>
                <h2 className="serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-zinc-900">
                  Courses built for <em className="not-italic text-zinc-400">real results</em>
                </h2>
              </div>
              <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-800 flex items-center gap-1 transition-colors">
                All courses <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course: { slug: any; title: string | null; description: string | null; tier: string | null; thumbnail: { asset: { _id: string; url: string | null; } | null; } | null; moduleCount: number | null; lessonCount: number | null; }) => (
                <CourseCard
                  key={course.slug!.current!}
                  slug={{ current: course.slug!.current! }}
                  title={course.title}
                  description={course.description}
                  tier={(course.tier as "free" | "pro" | "ultra" | null)}
                  thumbnail={course.thumbnail}
                  moduleCount={course.moduleCount}
                  lessonCount={course.lessonCount}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonials" className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-widest uppercase text-zinc-400 mb-2">Reviews</p>
              <h2 className="serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-zinc-900">
                Students <em className="not-italic text-zinc-400">love it</em>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-zinc-200 rounded-sm overflow-hidden border border-zinc-200">
            {[
              {
                name: "Alex Chen",
                role: "Junior Developer",
                content: "Sonny's teaching style is incredible. I went from knowing nothing to landing my first dev job in 6 months!",
                avatar: "AC",
              },
              {
                name: "Sarah Miller",
                role: "Freelancer",
                content: "The Ultra tier is worth every penny. The exclusive content and 1-on-1 sessions transformed my career.",
                avatar: "SM",
              },
              {
                name: "James Wilson",
                role: "CS Student",
                content: "Best investment I've made. The Pro courses filled gaps my university courses never covered.",
                avatar: "JW",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="p-8 bg-white">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`star-${testimonial.name}-${i}`} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="serif text-zinc-600 font-light leading-relaxed mb-6 text-[0.95rem]">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-500">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-800">{testimonial.name}</p>
                    <p className="text-xs text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="bg-zinc-900">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-white mb-3">
                Ready to level up your skills?
              </h2>
              <p className="text-zinc-400 font-light text-base max-w-lg leading-relaxed">
                Start with free courses or unlock everything with Pro and Ultra. Your coding journey begins now.
              </p>
            </div>
            <Link href="/pricing" className="shrink-0">
              <Button
                size="lg"
                className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-sm h-12 px-8 text-sm font-medium shadow-none"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-zinc-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="RE:EDU Logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="font-semibold text-sm text-zinc-800">RE:EDU&apos;s Academy</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              {["Privacy", "Terms", "Contact"].map((link, i) => (
                <span key={link} className="flex items-center gap-6">
                  {i > 0 && <Separator orientation="vertical" className="h-3" />}
                  <Link href="#" className="hover:text-zinc-700 transition-colors">{link}</Link>
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-400">© 2024 RE:EDU&apos;s Academy</p>
          </div>
        </footer>
      </main>
    </div>
  );
}