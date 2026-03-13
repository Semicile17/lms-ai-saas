import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Header } from "@/components/Header";
import { LessonPageContent } from "@/components/lessons";
import { sanityFetch } from "@/sanity/lib/live";
import { LESSON_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  const { data: lesson } = await sanityFetch({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <LessonPageContent lesson={lesson} userId={userId} />
      </main>
    </div>
  );
}