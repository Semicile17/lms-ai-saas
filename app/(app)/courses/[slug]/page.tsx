import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Header } from "@/components/Header";
import { CourseContent } from "@/components/courses";
import { sanityFetch } from "@/sanity/lib/live";
import { COURSE_WITH_MODULES_QUERY } from "@/sanity/lib/queries";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  const { data: course } = await sanityFetch({
    query: COURSE_WITH_MODULES_QUERY,
    params: { slug, userId: userId },
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <CourseContent course={course} userId={userId} />
      </main>
    </div>
  );
}