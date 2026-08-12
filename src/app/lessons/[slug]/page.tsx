import { getLessonBySlug } from "@/lib/wordpress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

type LessonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LessonPage({
  params,
}: LessonPageProps) {
  const { slug } = await params;

  const lesson = await getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="lesson-page">

        <section className="lesson-hero">

          {lesson._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={lesson._embedded["wp:featuredmedia"][0].source_url}
              alt={lesson.title.rendered}
              className="lesson-featured-image"
            />
          )}

          <div className="lesson-hero-content">

            <h1
              dangerouslySetInnerHTML={{
                __html: lesson.title.rendered,
              }}
            />

            {lesson.excerpt?.rendered && (
              <div
                className="lesson-description"
                dangerouslySetInnerHTML={{
                  __html: lesson.excerpt.rendered,
                }}
              />
            )}

          </div>

        </section>

        <article className="lesson-content">

          <div
            dangerouslySetInnerHTML={{
              __html: lesson.content.rendered,
            }}
          />

        </article>

      </main>

      <Footer />
    </>
  );
}