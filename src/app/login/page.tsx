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

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Login failed."
        );
      }

      if (!data.token) {
        throw new Error(
          "Login succeeded but no token was returned."
        );
      }

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

      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Student Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            autoComplete="username"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="current-password"
            required
            disabled={loading}
          />
        </div>

        {error && (
          <p
            role="alert"
            style={{
              color: "red",
              marginTop: "15px",
              whiteSpace: "pre-wrap",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </main>
  );
}