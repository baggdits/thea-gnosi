"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type LoginResponse = {
  token?: string;
  user_email?: string;
  user_nicename?: string;
  user_display_name?: string;
  message?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const isGitHubPages =
    process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      /* =============================================
         GITHUB PAGES DEMO LOGIN
         Δεν στέλνουμε username/password πουθενά.
         ============================================= */

      if (isGitHubPages) {
        localStorage.setItem(
          "thea_gnosi_token",
          "demo-token"
        );

        localStorage.setItem(
          "thea_gnosi_user",
          JSON.stringify({
            username: username.trim() || "demo",
            displayName: "Demo Μαθητής",
            email: "demo@theagnosi.gr",
          })
        );

        router.replace("/dashboard");
        router.refresh();

        return;
      }

      /* =============================================
         ΚΑΝΟΝΙΚΟ LOCAL LOGIN
         ============================================= */

      const response = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const responseText = await response.text();

      console.log(
        "LOGIN STATUS:",
        response.status
      );

      console.log(
        "LOGIN CONTENT TYPE:",
        response.headers.get("content-type")
      );

      console.log(
        "LOGIN RESPONSE:",
        responseText
      );

      let data: LoginResponse;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Login API returned non-JSON response: ${responseText.substring(
            0,
            300
          )}`
        );
      }

      /* =============================================
         ΛΑΘΟΣ LOGIN
         ============================================= */

      if (!response.ok) {
        setError(
          response.status === 401 ||
            response.status === 403
            ? "Λάθος username ή κωδικός πρόσβασης."
            : data.message ||
                "Η σύνδεση απέτυχε."
        );

        return;
      }

      /* =============================================
         ΕΛΕΓΧΟΣ TOKEN
         ============================================= */

      if (!data.token) {
        throw new Error(
          "Η σύνδεση ολοκληρώθηκε αλλά δεν επιστράφηκε token."
        );
      }

      /* =============================================
         ΑΠΟΘΗΚΕΥΣΗ LOGIN
         ============================================= */

      localStorage.setItem(
        "thea_gnosi_token",
        data.token
      );

      localStorage.setItem(
        "thea_gnosi_user",
        JSON.stringify({
          username:
            data.user_nicename ||
            username,

          displayName:
            data.user_display_name ||
            "",

          email:
            data.user_email ||
            "",
        })
      );

      /* =============================================
         DASHBOARD
         ============================================= */

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Η σύνδεση απέτυχε."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">

      <section className="login-section">

        {/* Decorative circles */}

        <div className="login-decoration login-decoration-one" />

        <div className="login-decoration login-decoration-two" />


        <div className="login-container">

          {/* ==========================
              LEFT SIDE
              ========================== */}

          <div className="login-intro">

            <span className="login-eyebrow">
              ΘΕΑ ΓΝΩΣΗ
            </span>

            <h1>
              Καλώς ήρθες
              <br />
              ξανά.
            </h1>

            <span className="login-title-line" />

            <p>
              Συνδέσου στον προσωπικό σου χώρο
              για να έχεις πρόσβαση στο
              εκπαιδευτικό σου υλικό και τις
              σημειώσεις σου.
            </p>

          </div>


          {/* ==========================
              LOGIN CARD
              ========================== */}

          <div className="login-card">

            <div className="login-card-heading">

              <span>
                ΠΡΟΣΩΠΙΚΟΣ ΧΩΡΟΣ
              </span>

              <h2>
                Σύνδεση μαθητή
              </h2>

              {isGitHubPages ? (
                <p>
                  Demo έκδοση για την παρουσίαση
                  του project. Χρησιμοποίησε
                  οποιαδήποτε στοιχεία για είσοδο.
                </p>
              ) : (
                <p>
                  Συμπλήρωσε τα στοιχεία του
                  λογαριασμού σου.
                </p>
              )}

            </div>


            {/* ==========================
                FORM
                ========================== */}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* USERNAME */}

              <div className="login-field">

                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(
                      event.target.value
                    )
                  }
                  autoComplete="username"
                  placeholder={
                    isGitHubPages
                      ? "demo"
                      : "Το username σου"
                  }
                  required
                  disabled={loading}
                />

              </div>


              {/* PASSWORD */}

              <div className="login-field">

                <label htmlFor="password">
                  Κωδικός πρόσβασης
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />

              </div>


              {/* ERROR */}

              {error && (
                <div
                  className="login-error"
                  role="alert"
                >
                  {error}
                </div>
              )}


              {/* LOGIN BUTTON */}

              <button
                className="login-submit"
                type="submit"
                disabled={loading}
              >

                {loading
                  ? "Σύνδεση..."
                  : isGitHubPages
                    ? "Είσοδος στο Demo"
                    : "Σύνδεση"}

              </button>

            </form>


            {/* ==========================
                BOTTOM INFO
                ========================== */}

            <div className="login-card-footer">

              <span className="login-lock">
                ◇
              </span>

              <p>
                {isGitHubPages
                  ? "Portfolio demo — δεν πραγματοποιείται πραγματικό authentication."
                  : "Η πρόσβαση παρέχεται μόνο σε εγγεγραμμένους μαθητές."}
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}