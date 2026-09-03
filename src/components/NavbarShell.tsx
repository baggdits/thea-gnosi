"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavbarShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = pathname === "/";

  return (
    <div
      className={`navbar-shell ${
        scrolled || !isHome ? "navbar-scrolled" : ""
      }`}
    >
      {children}
    </div>
  );
}