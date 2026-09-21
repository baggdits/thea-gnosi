import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LoginPage from "@/app/login/page";

/* ========================================
   NEXT.JS ROUTER MOCK
   ======================================== */

const replaceMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
    refresh: refreshMock,
  }),
}));

/* ========================================
   HELPERS
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

    headers: {
      get: vi.fn().mockReturnValue("application/json"),
    },

    text: vi.fn().mockResolvedValue(JSON.stringify(data)),
  }) as unknown as typeof fetch;
}

/* ========================================
   TESTS
   ======================================== */

describe("LoginPage", () => {
  beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  global.fetch = vi.fn();
});

  /* ----------------------------------------
     FORM RENDER
     ---------------------------------------- */

  it("renders the login form", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("heading", {
        name: "Σύνδεση μαθητή",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Username")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Κωδικός πρόσβασης")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Σύνδεση",
      })
    ).toBeInTheDocument();
  });

  /* ----------------------------------------
     WRONG CREDENTIALS
     ---------------------------------------- */

  it("shows an error when the credentials are wrong", async () => {
    const user = userEvent.setup();

    mockFetchResponse({
      status: 403,
      data: {
        message: "Invalid credentials",
      },
    });

    render(<LoginPage />);

    await user.type(
      screen.getByLabelText("Username"),
      "wrong-user"
    );

    await user.type(
      screen.getByLabelText("Κωδικός πρόσβασης"),
      "wrong-password"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Σύνδεση",
      })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      "Λάθος username ή κωδικός πρόσβασης."
    );

    expect(replaceMock).not.toHaveBeenCalled();

    expect(
      localStorage.getItem("thea_gnosi_token")
    ).toBeNull();
  });

  /* ----------------------------------------
     SUCCESSFUL LOGIN
     ---------------------------------------- */

  it("stores the user and redirects to the dashboard after successful login", async () => {
    const user = userEvent.setup();

    mockFetchResponse({
      status: 200,
      data: {
        token: "test-jwt-token",
        user_email: "student@example.com",
        user_nicename: "student",
        user_display_name: "Test Student",
      },
    });

    render(<LoginPage />);

    await user.type(
      screen.getByLabelText("Username"),
      "student"
    );

    await user.type(
      screen.getByLabelText("Κωδικός πρόσβασης"),
      "password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Σύνδεση",
      })
    );

    await waitFor(() => {
      expect(
        localStorage.getItem("thea_gnosi_token")
      ).toBe("test-jwt-token");
    });

    expect(
      JSON.parse(
        localStorage.getItem("thea_gnosi_user")!
      )
    ).toEqual({
      username: "student",
      displayName: "Test Student",
      email: "student@example.com",
    });

    expect(replaceMock).toHaveBeenCalledWith(
      "/dashboard"
    );

    expect(refreshMock).toHaveBeenCalled();
  });

  /* ----------------------------------------
     MISSING TOKEN
     ---------------------------------------- */

  it("shows an error when the API does not return a token", async () => {
    const user = userEvent.setup();

    mockFetchResponse({
      status: 200,
      data: {
        user_nicename: "student",
      },
    });

    render(<LoginPage />);

    await user.type(
      screen.getByLabelText("Username"),
      "student"
    );

    await user.type(
      screen.getByLabelText("Κωδικός πρόσβασης"),
      "password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Σύνδεση",
      })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      "Η σύνδεση ολοκληρώθηκε αλλά δεν επιστράφηκε token."
    );

    expect(replaceMock).not.toHaveBeenCalled();

    expect(
      localStorage.getItem("thea_gnosi_token")
    ).toBeNull();
  });
});