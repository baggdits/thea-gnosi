"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserData = {
  username?: string;
  displayName?: string;
  email?: string;
};

export default function AuthNav() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    function loadUser() {
      const token = localStorage.getItem("thea_gnosi_token");
      const storedUser = localStorage.getItem("thea_gnosi_user");

      if (!token || !storedUser) {
        setUser(null);
        return;
      }

      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("thea_gnosi_token");
    localStorage.removeItem("thea_gnosi_user");

    setUser(null);
    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <Link className="navbar-login" href="/login">
        Σύνδεση
      </Link>
    );
  }

  return (
    <div className="navbar-auth">
      <Link href="/dashboard" className="navbar-username">
        {user.username || user.displayName || "Account"}
      </Link>

      <button
        type="button"
        className="navbar-logout"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}