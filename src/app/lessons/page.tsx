import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLessons } from "@/lib/wordpress";

export default async function LessonsPage() {
  const lessons = await getLessons();

  return (
    <>
      <Navbar />

      <main className="lessons-page">
        <header className="lessons-header">
          <h1>Τα μαθήματά μας</h1>

          <p>
            Εξερεύνησε τα μαθήματά μας και μάθε περισσότερα.
          </p>
        </header>

        <section className="lessons-grid">
          {lessons.map((lesson) => {
            const image =
              lesson._embedded?.["wp:featuredmedia"]?.[0]
                ?.source_url;

            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.slug}/`}
                className="lesson-card"
              >
                {image && (
                  <div className="lesson-card-image-wrapper">
                    <img
                      src={image}
                      alt={lesson.title.rendered}
                      className="lesson-card-image"
                    />
                  </div>
                )}

                <div className="lesson-card-content">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: lesson.title.rendered,
                    }}
                  />

                  {lesson.excerpt?.rendered && (
                    <div
                      className="lesson-card-description"
                      dangerouslySetInnerHTML={{
                        __html: lesson.excerpt.rendered,
                      }}
                    />
                  )}

                  <span className="lesson-card-link">
                    Learn more →
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      </main>

      <Footer />
    </>
  );
}