import Link from "next/link";
import { getLessons } from "@/lib/wordpress";

type Lesson = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      alt_text?: string;
    }[];
  };
};

const lessonStyles = [
  {
    icon: "⚱",
    subtitle: "Γλώσσα · Κείμενα · Πολιτισμός",
    color: "gold",
  },
  {
    icon: "✦",
    subtitle: "Σκέψη · Γνώση · Ανακάλυψη",
    color: "blue",
  },
  {
    icon: "⚱",
    subtitle: "Γλώσσα · Γραμματική · Κλασική Παιδεία",
    color: "rose",
  },
  {
    icon: "✎",
    subtitle: "Ιδέες · Δομή · Έκφραση",
    color: "purple",
  },
  {
    icon: "▤",
    subtitle: "Παρελθόν · Παρόν · Μέλλον",
    color: "green",
  },
  {
    icon: "</>",
    subtitle: "Κώδικας · Λογική · Δημιουργία",
    color: "blue",
  },
  {
    icon: "♧",
    subtitle: "Σύνδεση · Επικοινωνία · Τεχνολογία",
    color: "teal",
  },
];

export default async function Lessons() {
  const lessons: Lesson[] = await getLessons();

  return (
    <main className="lessons-page">
      <header className="lessons-header">
        <span className="lessons-eyebrow">
          THEA GNOSI
        </span>

        <h1>Τα μαθήματά μας</h1>

        <p>
          Γνώση, δημιουργία και εξέλιξη μέσα από
          μαθήματα που εμπνέουν.
        </p>
      </header>

      {lessons.length === 0 ? (
        <p className="lessons-empty">
          Δεν υπάρχουν διαθέσιμα μαθήματα αυτή τη στιγμή.
        </p>
      ) : (
        <div className="lessons-grid">
          {lessons.map((lesson, index) => {
            const style =
              lessonStyles[index % lessonStyles.length];

            const image =
              lesson._embedded?.["wp:featuredmedia"]?.[0]
                ?.source_url;

            const imageAlt =
              lesson._embedded?.["wp:featuredmedia"]?.[0]
                ?.alt_text ||
              lesson.title.rendered;

            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.slug}`}
                className={`lesson-card lesson-card-${style.color}`}
              >
                <div className="lesson-card-image-wrapper">
                  {image ? (
                    <img
                      src={image}
                      alt={imageAlt}
                      className="lesson-card-image"
                    />
                  ) : (
                    <div className="lesson-card-image-placeholder">
                      <span>{style.icon}</span>
                    </div>
                  )}
                </div>

                <div className="lesson-card-content">
                  <div className="lesson-card-heading">
                    <div className="lesson-card-icon">
                      {style.icon}
                    </div>

                    <div className="lesson-card-title-group">
                      <h2
                        dangerouslySetInnerHTML={{
                          __html: lesson.title.rendered,
                        }}
                      />

                      <span className="lesson-card-subtitle">
                        {style.subtitle}
                      </span>
                    </div>
                  </div>

                  <div
                    className="lesson-card-description"
                    dangerouslySetInnerHTML={{
                      __html:
                        lesson.excerpt?.rendered ||
                        "<p>Ανακάλυψε περισσότερα για το μάθημά μας.</p>",
                    }}
                  />

                  <span className="lesson-card-link">
                    Περισσότερα
                    <span aria-hidden="true"> ↗</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}