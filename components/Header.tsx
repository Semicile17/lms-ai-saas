"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Show,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Menu,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const loggedOutLinks = [
  { href: "#courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "#testimonials", label: "Reviews" },
];

export function Header() {
  const pathname = usePathname();
  const { has } = useAuth();
  const isUltra = has?.({ plan: "ultra" });

  const loggedInLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
    ...(isUltra
      ? [{ href: "/pricing", label: "Account", icon: Sparkles }]
      : [{ href: "/pricing", label: "Upgrade", icon: Sparkles }]),
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Show when="signed-in">
          <Link href="/dashboard" className="shrink-0"><Logo /></Link>
        </Show>
        <Show when="signed-out">
          <Link href="/" className="shrink-0"><Logo /></Link>
        </Show>

        {/* ── Center Nav ── */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          <Show when="signed-out">
            {loggedOutLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 rounded-sm transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </Show>

          <Show when="signed-in">
            {loggedInLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-sm text-sm transition-colors duration-150",
                    isActive
                      ? "bg-zinc-100 text-zinc-900 font-medium"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5",
                      isActive ? "text-zinc-700" : "text-zinc-400"
                    )}
                    strokeWidth={1.75}
                  />
                  {link.label}
                </Link>
              );
            })}
          </Show>
        </nav>

        {/* ── Right ── */}
        <div className="flex items-center gap-2 shrink-0">
          <Show when="signed-out">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-sm border-zinc-200 shadow-sm">
                {loggedOutLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="text-zinc-600 text-sm cursor-pointer">{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-5 hidden md:block" />

            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm text-sm font-normal">
                Sign in
              </Button>
            </SignInButton>

            <Link href="/pricing" className="hidden sm:block">
              <Button size="sm" className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-sm text-sm font-medium shadow-none gap-1.5">
                Start Learning
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </Show>

          <Show when="signed-in">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-sm border-zinc-200 shadow-sm">
                {loggedInLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/dashboard" && pathname.startsWith(link.href));
                  return (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-2 text-sm cursor-pointer",
                          isActive ? "text-zinc-900 font-medium" : "text-zinc-600"
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-5 hidden md:block" />

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-1 ring-zinc-200 hover:ring-zinc-400 transition-all rounded-full",
                  userButtonPopoverCard: "rounded-sm shadow-sm border border-zinc-200",
                  userButtonPopoverActionButton: "text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm",
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          </Show>
        </div>

      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-zinc-700 transition-colors duration-150">
        <Image src="/logo.svg" alt="RE:EDU Logo" width={32} height={32} className="object-contain" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-tight text-zinc-900">RE:EDU</span>
        <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400 font-normal">Academy</span>
      </div>
    </div>
  );
}