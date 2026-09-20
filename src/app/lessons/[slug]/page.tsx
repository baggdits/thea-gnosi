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

  const featuredImage =
    lesson._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  /*
   * Lesson Details από WordPress
   */
  const details = lesson.lesson_details;

  const classes = details?.classes || "";
  const duration = details?.duration || "";
  const type = details?.type || "";
  const preparation = details?.preparation || "";
  const syllabus = details?.syllabus || [];

  const hasDetails =
    classes ||
    duration ||
    type ||
    preparation;

  return (
    <>
      <Navbar />

      <main className="lesson-page">

        {/* =============================================
            HERO
            ============================================= */}

        <section className="lesson-hero">

          {featuredImage && (
            <img
              src={featuredImage}
              alt={lesson.title.rendered}
              className="lesson-featured-image"
            />
          )}

          <div className="lesson-hero-overlay" />

          <div className="lesson-hero-content">

            <span className="lesson-eyebrow">
              ΘΕΑ ΓΝΩΣΗ
            </span>

            <h1
              dangerouslySetInnerHTML={{
                __html: lesson.title.rendered,
              }}
            />

            <span className="lesson-title-line" />

          </div>

        </section>


        {/* =============================================
            LESSON DETAILS
            ============================================= */}

        {hasDetails && (
          <section className="lesson-details">

            <div className="lesson-details-grid">

              {classes && (
                <div className="lesson-detail-card">

                  <span className="lesson-detail-icon">
                    🎓
                  </span>

                  <span className="lesson-detail-label">
                    ΤΑΞΕΙΣ
                  </span>

                  <strong>
                    {classes}
                  </strong>

                </div>
              )}


              {duration && (
                <div className="lesson-detail-card">

                  <span className="lesson-detail-icon">
                    ◷
                  </span>

                  <span className="lesson-detail-label">
                    ΔΙΑΡΚΕΙΑ
                  </span>

                  <strong>
                    {duration}
                  </strong>

                </div>
              )}


              {type && (
                <div className="lesson-detail-card">

                  <span className="lesson-detail-icon">
                    ♙
                  </span>

                  <span className="lesson-detail-label">
                    ΤΜΗΜΑΤΑ
                  </span>

                  <strong>
                    {type}
                  </strong>

                </div>
              )}


              {preparation && (
                <div className="lesson-detail-card">

                  <span className="lesson-detail-icon">
                    ◎
                  </span>

                  <span className="lesson-detail-label">
                    ΠΡΟΕΤΟΙΜΑΣΙΑ
                  </span>

                  <strong>
                    {preparation}
                  </strong>

                </div>
              )}

            </div>

          </section>
        )}


        {/* =============================================
            SYLLABUS
            ============================================= */}

        {syllabus.length > 0 && (
          <section className="lesson-syllabus">

            <div className="lesson-container">

              <div className="lesson-section-heading">

                <span>
                  ΤΟ ΜΑΘΗΜΑ
                </span>

                <h2>
                  Τι θα μάθεις
                </h2>

                <div className="lesson-heading-line" />

              </div>


              <div className="lesson-syllabus-grid">

                {syllabus.map(
                  (item: string, index: number) => (
                    <div
                      className="lesson-syllabus-item"
                      key={`${item}-${index}`}
                    >

                      <span className="lesson-check">
                        ✓
                      </span>

                      <span>
                        {item}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

          </section>
        )}


        {/* =============================================
            MAIN CONTENT
            ============================================= */}

        {lesson.content?.rendered && (
          <section className="lesson-main-content">

            <div className="lesson-container">

              <div className="lesson-section-heading">

                <span>
                  ΠΕΡΙΣΣΟΤΕΡΑ
                </span>

                <h2>
                  Αναλυτικά για το μάθημα
                </h2>

                <div className="lesson-heading-line" />

              </div>


              <article className="lesson-content">

                <div
                  dangerouslySetInnerHTML={{
                    __html: lesson.content.rendered,
                  }}
                />

              </article>

            </div>

          </section>
        )}

      </main>

      <Footer />
    </>
  );
}