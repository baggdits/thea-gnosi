import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import DashboardPage from "@/app/dashboard/page";

/* ========================================
   NEXT.JS ROUTER MOCK
   ======================================== */

const replaceMock = vi.fn();

const routerMock = {
  replace: replaceMock,
};

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

/* ========================================
   FETCH HELPER
   ======================================== */

function mockFetchResponse({
  status,
  data,
}: {
  status: number;
  data: object;
}) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,

    text: vi.fn().mockResolvedValue(
      JSON.stringify(data)
    ),
  }) as unknown as typeof fetch;
}

/* ========================================
   TESTS
   ======================================== */

describe("DashboardPage", () => {
  beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();

  global.fetch = vi.fn() as unknown as typeof fetch;
});

  /* ----------------------------------------
     NO TOKEN
     ---------------------------------------- */

  it("redirects to login when there is no token", async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(
        "/login"
      );
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  /* ----------------------------------------
     LOAD NOTES
     ---------------------------------------- */

  it("loads and displays the student's notes", async () => {
    localStorage.setItem(
      "thea_gnosi_token",
      "test-token"
    );

    localStorage.setItem(
      "thea_gnosi_user",
      JSON.stringify({
        username: "student",
        displayName: "Βαγγέλης",
        email: "student@example.com",
      })
    );

    mockFetchResponse({
      status: 200,
      data: {
        user_id: 10,
        notes: [
          {
            id: 1,
            title: "Δίκτυα Υπολογιστών",
            content:
              "<p>Σημειώσεις για τα δίκτυα.</p>",
            date: "2026-09-21T10:00:00",
          },
          {
            id: 2,
            title: "Προγραμματισμός",
            content:
              "<p>Ασκήσεις προγραμματισμού.</p>",
            date: "2026-09-20T10:00:00",
          },
        ],
      },
    });

    render(<DashboardPage />);

    expect(
      await screen.findByText(
        "Δίκτυα Υπολογιστών"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Προγραμματισμός")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Σημειώσεις για τα δίκτυα."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Βαγγέλης/)
    ).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/my-notes",
      expect.objectContaining({
        method: "GET",

        headers: {
          Authorization: "Bearer test-token",
          Accept: "application/json",
        },

        cache: "no-store",
      })
    );
  });

  /* ----------------------------------------
     EMPTY NOTES
     ---------------------------------------- */

  it("shows the empty state when the student has no notes", async () => {
    localStorage.setItem(
      "thea_gnosi_token",
      "test-token"
    );

    mockFetchResponse({
      status: 200,
      data: {
        user_id: 10,
        notes: [],
      },
    });

    render(<DashboardPage />);

    expect(
      await screen.findByText(
        "Δεν υπάρχουν σημειώσεις ακόμη"
      )
    ).toBeInTheDocument();
  });

  /* ----------------------------------------
     EXPIRED / INVALID TOKEN
     ---------------------------------------- */

  it("clears authentication and redirects when the token is invalid", async () => {
    localStorage.setItem(
      "thea_gnosi_token",
      "expired-token"
    );

    localStorage.setItem(
      "thea_gnosi_user",
      JSON.stringify({
        username: "student",
      })
    );

    mockFetchResponse({
      status: 401,
      data: {
        message: "Invalid token",
      },
    });

    render(<DashboardPage />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(
        "/login"
      );
    });

    expect(
      localStorage.getItem("thea_gnosi_token")
    ).toBeNull();

    expect(
      localStorage.getItem("thea_gnosi_user")
    ).toBeNull();
  });

  /* ----------------------------------------
     LOGOUT
     ---------------------------------------- */

  it("logs the student out", async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      "thea_gnosi_token",
      "test-token"
    );

    localStorage.setItem(
      "thea_gnosi_user",
      JSON.stringify({
        username: "student",
        displayName: "Βαγγέλης",
      })
    );

    mockFetchResponse({
      status: 200,
      data: {
        user_id: 10,
        notes: [],
      },
    });

    render(<DashboardPage />);

    const logoutButton =
      await screen.findByRole("button", {
        name: /Αποσύνδεση/i,
      });

    await user.click(logoutButton);

    expect(
      localStorage.getItem("thea_gnosi_token")
    ).toBeNull();

    expect(
      localStorage.getItem("thea_gnosi_user")
    ).toBeNull();

    expect(replaceMock).toHaveBeenCalledWith(
      "/login"
    );
  });
});