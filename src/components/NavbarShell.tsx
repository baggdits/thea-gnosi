"use client";

import { useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

export default function NavbarShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] =
    useState(false);

  const [
    showScrollTop,
    setShowScrollTop,
  ] = useState(false);

  const isHome = pathname === "/";

  /* =========================================
     NAVBAR SCROLL STATE
     ========================================= */

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);

      setShowScrollTop(
        window.scrollY > 500
      );
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =========================================
     OUR PLACE - FORCE TOP
     ========================================= */

  useEffect(() => {
    if (pathname !== "/our-place") {
      return;
    }

    const shouldScroll =
      sessionStorage.getItem(
        "scroll_our_place_top"
      );

    if (shouldScroll === "true") {
      sessionStorage.removeItem(
        "scroll_our_place_top"
      );

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      });
    }
  }, [pathname]);

  /* =========================================
     SCROLL TO TOP
     ========================================= */

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================
     SCROLL TO ABOUT
     ========================================= */

  function scrollToAbout() {
    const aboutSection =
      document.getElementById("about");

    if (!aboutSection) {
      return;
    }

    aboutSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  /* =========================================
     NAVBAR LINKS
     ========================================= */

  function handleClick(
    event: React.MouseEvent<HTMLElement>
  ) {
    const target =
      event.target as HTMLElement;

    const link = target.closest("a");

    if (!link) {
      return;
    }

    const href =
      link.getAttribute("href");

    /* =====================================
       LOGO / ΑΡΧΙΚΗ
       ===================================== */

    if (href === "/") {
      /*
       * Είμαστε ήδη στην αρχική
       */
      if (isHome) {
        event.preventDefault();

        scrollToTop();

        return;
      }

      /*
       * Είμαστε σε άλλη σελίδα
       */
      event.preventDefault();

      router.push("/");

      return;
    }

    /* =====================================
       ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ
       ===================================== */

    if (href === "/#about") {
      event.preventDefault();

      /*
       * Είμαστε ήδη στην αρχική
       */
      if (isHome) {
        scrollToAbout();

        return;
      }

      /*
       * Είμαστε σε άλλη σελίδα
       */
      router.push("/#about");

      return;
    }

    /* =====================================
       ΕΓΚΑΤΑΣΤΑΣΕΙΣ
       ===================================== */

    if (href === "/our-place") {
      /*
       * Είμαστε ήδη στις εγκαταστάσεις
       */
      if (pathname === "/our-place") {
        event.preventDefault();

        scrollToTop();

        return;
      }

      /*
       * Ερχόμαστε από άλλη σελίδα.
       * Σημειώνουμε ότι μόλις ανοίξει
       * το /our-place πρέπει να πάει top.
       */
      sessionStorage.setItem(
        "scroll_our_place_top",
        "true"
      );

      return;
    }
  }

  /* =========================================
     RENDER
     ========================================= */

  return (
    <>
      <div
        className={`navbar-shell ${
          scrolled || !isHome
            ? "navbar-scrolled"
            : ""
        }`}
        onClick={handleClick}
      >
        {children}
      </div>

      {/* SCROLL TO TOP BUTTON */}

      <button
        type="button"
        className={`scroll-to-top ${
          showScrollTop
            ? "scroll-to-top-visible"
            : ""
        }`}
        onClick={scrollToTop}
        aria-label="Επιστροφή στην κορυφή"
      >
        <span>↑</span>
      </button>
    </>
  );
}