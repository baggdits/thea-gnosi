import Link from "next/link";
import { getLessons, getSiteSettings } from "@/lib/wordpress";
import AuthNav from "@/components/AuthNav";
import NavbarShell from "@/components/NavbarShell";

export default async function Navbar() {
  const [settings, lessons] = await Promise.all([
    getSiteSettings(),
    getLessons(),
  ]);

  return (
    <NavbarShell>
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">

          {/* LOGO */}

          <Link
            className="navbar-logo"
            href="/"
            aria-label={`${settings.site_name} home`}
          >
            {settings.logo ? (
              <img
                src={settings.logo}
                alt={settings.site_name}
                className="navbar-logo-image"
              />
            ) : (
              settings.site_name
            )}
          </Link>

          {/* MOBILE HAMBURGER */}

          <button
            type="button"
            className="navbar-toggle"
            aria-label="Άνοιγμα μενού"
            aria-expanded="false"
          >
            <span />
            <span />
            <span />
          </button>

          {/* NAVIGATION */}

          <div className="navbar-mobile-content">

            <div className="navbar-links">

              <Link href="/">
                Αρχική
              </Link>

              <Link href="/#about">
                Σχετικά με εμάς
              </Link>

              <Link href="/our-place">
                Εγκαταστάσεις
              </Link>

              <div className="navbar-lessons">

                <Link href="/lessons" className="navbar-lessons-button">
  Μαθήματα
  <span className="lessons-arrow">▼</span>
</Link>

                <div className="lessons-dropdown">

                  {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.slug}`}
                      >
                        {lesson.title.rendered}
                      </Link>
                    ))
                  ) : (
                    <span className="lessons-empty">
                      Δεν υπάρχουν μαθήματα
                    </span>
                  )}

                </div>

              </div>

            </div>

            <div className="navbar-mobile-auth">
              <AuthNav />
            </div>

          </div>

        </nav>
      </header>
    </NavbarShell>
  );
}