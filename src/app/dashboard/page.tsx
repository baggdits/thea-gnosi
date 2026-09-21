"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

type NotesResponse = {
  user_id: number;
  notes: Note[];
};

type StoredUser = {
  username?: string;
  displayName?: string;
  email?: string;
};

const isGitHubPages =
  process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

/* =============================================
   DEMO NOTES - ΜΟΝΟ ΓΙΑ GITHUB PAGES
   ============================================= */

const demoNotes: Note[] = [
  {
    id: 1,
    title: "Εισαγωγή στα Δίκτυα",
    content:
      "<p>Βασικές έννοιες δικτύων υπολογιστών, LAN, WAN και τρόποι επικοινωνίας μεταξύ συσκευών.</p>",
    date: "2026-09-15",
  },
  {
    id: 2,
    title: "Ασκήσεις Προγραμματισμού",
    content:
      "<p>Επαναληπτικές ασκήσεις προγραμματισμού με έμφαση στις δομές επιλογής και επανάληψης.</p>",
    date: "2026-09-18",
  },
  {
    id: 3,
    title: "Υλικό Επανάληψης",
    content:
      "<p>Συνοπτικό εκπαιδευτικό υλικό για την προετοιμασία και την επανάληψη της διδακτέας ύλης.</p>",
    date: "2026-09-20",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] =
    useState<StoredUser | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem(
        "thea_gnosi_token"
      );

      const storedUser = localStorage.getItem(
        "thea_gnosi_user"
      );

      /* =============================================
         ΔΕΝ ΥΠΑΡΧΕΙ LOGIN
         ============================================= */

      if (!token) {
        router.replace("/login");
        return;
      }

      /* =============================================
         USER DATA
         ============================================= */

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          console.error(
            "Could not parse stored user."
          );
        }
      }

      /* =============================================
         GITHUB PAGES DEMO
         Δεν γίνεται request στο /api/my-notes
         ============================================= */

      if (isGitHubPages) {
        setNotes(demoNotes);
        setLoading(false);

        return;
      }

      /* =============================================
         ΚΑΝΟΝΙΚΟ LOCAL DASHBOARD
         ============================================= */

      try {
        const response = await fetch(
          "/api/my-notes",
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },

            cache: "no-store",
          }
        );

        const responseText =
          await response.text();

        console.log(
          "MY NOTES STATUS:",
          response.status
        );

        console.log(
          "MY NOTES RESPONSE:",
          responseText
        );

        if (!responseText) {
          throw new Error(
            "Δεν ήταν δυνατή η φόρτωση των σημειώσεων."
          );
        }

        let data:
          | NotesResponse
          | { message?: string };

        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "Η απάντηση του server δεν ήταν έγκυρη."
          );
        }

        /* =============================================
           TOKEN EXPIRED / INVALID
           ============================================= */

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          localStorage.removeItem(
            "thea_gnosi_token"
          );

          localStorage.removeItem(
            "thea_gnosi_user"
          );

          router.replace("/login");

          return;
        }

        if (!response.ok) {
          throw new Error(
            "message" in data && data.message
              ? data.message
              : "Δεν ήταν δυνατή η φόρτωση των σημειώσεων."
          );
        }

        if (
          !("notes" in data) ||
          !Array.isArray(data.notes)
        ) {
          throw new Error(
            "Μη έγκυρη απάντηση σημειώσεων."
          );
        }

        setNotes(data.notes);
      } catch (error) {
        console.error(
          "Dashboard notes error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Παρουσιάστηκε κάποιο πρόβλημα."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  /* =============================================
     LOGOUT
     ============================================= */

  function handleLogout() {
    localStorage.removeItem(
      "thea_gnosi_token"
    );

    localStorage.removeItem(
      "thea_gnosi_user"
    );

    router.replace("/login");
  }

  /* =============================================
     LOADING
     ============================================= */

  if (loading) {
    return (
      <main className="student-dashboard">
        <section className="dashboard-loading">

          <div className="dashboard-loader" />

          <p>
            Φόρτωση προσωπικού χώρου...
          </p>

        </section>
      </main>
    );
  }

  return (
    <main className="student-dashboard">

      {/* ==============================
          HERO
          ============================== */}

      <section className="dashboard-hero">

        <div className="dashboard-hero-decoration" />

        <div className="dashboard-hero-inner">

          <div className="dashboard-welcome">

            <span className="dashboard-eyebrow">
              {isGitHubPages
                ? "DEMO ΠΡΟΣΩΠΙΚΟΥ ΧΩΡΟΥ"
                : "ΠΡΟΣΩΠΙΚΟΣ ΧΩΡΟΣ"}
            </span>

            <h1>
              Καλώς ήρθες
              {user?.displayName
                ? `, ${user.displayName}`
                : ""}
              .
            </h1>

            <p>
              Εδώ μπορείς να βρεις τις
              σημειώσεις και το εκπαιδευτικό
              υλικό που έχει ετοιμαστεί για
              εσένα.
            </p>

          </div>

          <button
            type="button"
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Αποσύνδεση
            <span>→</span>
          </button>

        </div>

      </section>


      {/* ==============================
          NOTES
          ============================== */}

      <section className="dashboard-notes">

        <div className="dashboard-container">

          <div className="dashboard-section-heading">

            <span>
              ΕΚΠΑΙΔΕΥΤΙΚΟ ΥΛΙΚΟ
            </span>

            <h2>
              Οι σημειώσεις μου
            </h2>

            <div className="dashboard-heading-line" />

          </div>


          {/* DEMO INFO */}

          {isGitHubPages && (
            <div className="dashboard-demo-notice">
              <strong>
                Portfolio Demo
              </strong>

              <p>
                Το περιεχόμενο αυτής της σελίδας
                είναι ενδεικτικό. Στην κανονική
                εφαρμογή οι σημειώσεις φορτώνονται
                από τον προσωπικό λογαριασμό του
                μαθητή.
              </p>
            </div>
          )}


          {/* ERROR */}

          {error && (
            <div
              className="dashboard-error"
              role="alert"
            >
              <strong>
                Παρουσιάστηκε κάποιο πρόβλημα
              </strong>

              <p>{error}</p>
            </div>
          )}


          {/* NO NOTES */}

          {!error &&
            notes.length === 0 && (
              <div className="dashboard-empty">

                <span className="dashboard-empty-icon">
                  ◇
                </span>

                <h3>
                  Δεν υπάρχουν σημειώσεις ακόμη
                </h3>

                <p>
                  Μόλις προστεθεί νέο
                  εκπαιδευτικό υλικό, θα
                  εμφανιστεί εδώ.
                </p>

              </div>
            )}


          {/* NOTES GRID */}

          {!error &&
            notes.length > 0 && (
              <div className="dashboard-notes-grid">

                {notes.map((note) => (
                  <article
                    className="dashboard-note-card"
                    key={note.id}
                  >

                    <div className="dashboard-note-top">

                      <span>
                        ΣΗΜΕΙΩΣΗ
                      </span>

                      <span className="dashboard-note-number">
                        {String(note.id).padStart(
                          2,
                          "0"
                        )}
                      </span>

                    </div>

                    <h3>
                      {note.title}
                    </h3>

                    <div
                      className="dashboard-note-content"
                      dangerouslySetInnerHTML={{
                        __html: note.content,
                      }}
                    />

                    <div className="dashboard-note-footer">

                      <span>
                        {new Date(
                          note.date
                        ).toLocaleDateString(
                          "el-GR",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>

                    </div>

                  </article>
                ))}

              </div>
            )}

        </div>

      </section>

    </main>
  );
}