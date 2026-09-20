"use client";

import {
  useEffect,
  useState,
} from "react";

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

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
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
     CLOSE MOBILE MENU AFTER NAVIGATION
     ========================================= */

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  /* =========================================
     LOCK BODY WHEN MENU IS OPEN
     ========================================= */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
     NAVBAR CLICK HANDLER
     ========================================= */

  function handleClick(
    event: React.MouseEvent<HTMLElement>
  ) {
    const target =
      event.target as HTMLElement;

    /* =====================================
       HAMBURGER
       ===================================== */

    const toggle =
      target.closest(".navbar-toggle");

    if (toggle) {
      event.preventDefault();

      setMobileMenuOpen(
        (current) => !current
      );

      return;
    }

    /* =====================================
       LINKS
       ===================================== */

    const link = target.closest("a");

    if (!link) {
      return;
    }

    const href =
      link.getAttribute("href");

    /* Close mobile menu */

    setMobileMenuOpen(false);

    /* =====================================
       LOGO / HOME
       ===================================== */

    if (href === "/") {

      if (isHome) {
        event.preventDefault();

        scrollToTop();

        return;
      }

      event.preventDefault();

      router.push("/");

      return;
    }

    /* =====================================
       ABOUT
       ===================================== */

    if (href === "/#about") {
      event.preventDefault();

      if (isHome) {
        scrollToAbout();

        return;
      }

      router.push("/#about");

      return;
    }

    /* =====================================
       OUR PLACE
       ===================================== */

    if (href === "/our-place") {

      if (pathname === "/our-place") {
        event.preventDefault();

        scrollToTop();

        return;
      }

      sessionStorage.setItem(
        "scroll_our_place_top",
        "true"
      );

      return;
    }
  }

  return (
    <>
      <div
        className={`
          navbar-shell
          ${
            scrolled || !isHome
              ? "navbar-scrolled"
              : ""
          }
          ${
            mobileMenuOpen
              ? "navbar-menu-open"
              : ""
          }
        `}
        onClick={handleClick}
      >
        {children}
      </div>

      {/* SCROLL TO TOP */}

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