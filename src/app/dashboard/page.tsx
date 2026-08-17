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

export default function DashboardPage() {
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotes() {
      const token = localStorage.getItem(
        "thea_gnosi_token"
      );

      if (!token) {
        router.push("/login");
        return;
      }

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
          "MY NOTES CONTENT TYPE:",
          response.headers.get(
            "content-type"
          )
        );

        console.log(
          "MY NOTES RESPONSE:",
          responseText
        );

        if (!responseText) {
          throw new Error(
            `My Notes API returned an empty response. HTTP status: ${response.status}`
          );
        }

        let data:
          | NotesResponse
          | { message?: string };

        try {
          data = JSON.parse(
            responseText
          );
        } catch {
          throw new Error(
            `My Notes API returned invalid JSON: ${responseText.substring(
              0,
              300
            )}`
          );
        }

        if (!response.ok) {
          throw new Error(
            "message" in data &&
            data.message
              ? data.message
              : "Failed to load notes."
          );
        }

        if (
          !("notes" in data) ||
          !Array.isArray(data.notes)
        ) {
          throw new Error(
            "Invalid notes response."
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
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem(
      "thea_gnosi_token"
    );

    localStorage.removeItem(
      "thea_gnosi_user"
    );

    router.push("/login");
  }

  if (loading) {
    return (
      <main>
        <h1>Student Dashboard</h1>

        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Student Dashboard</h1>

      <button
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>

      {error && (
        <p
          role="alert"
          style={{
            color: "red",
            marginTop: "20px",
          }}
        >
          {error}
        </p>
      )}

      <section>
        <h2>My Notes</h2>

        {!error &&
          notes.length === 0 && (
            <p>
              You don't have any notes yet.
            </p>
          )}

        {!error &&
          notes.length > 0 && (
            <div>
              {notes.map((note) => (
                <article key={note.id}>
                  <h3>{note.title}</h3>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: note.content,
                    }}
                  />

                  <small>
                    {new Date(
                      note.date
                    ).toLocaleDateString()}
                  </small>
                </article>
              ))}
            </div>
          )}
      </section>
    </main>
  );
}