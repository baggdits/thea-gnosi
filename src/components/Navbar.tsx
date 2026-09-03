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

        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/#about">About Us</Link>
          <Link href="/our-place">Our Place</Link>

          <div className="navbar-lessons">
            <a
              href="/lessons"
              className="navbar-lessons-button"
            >
              Lessons
              <span className="lessons-arrow">▼</span>
            </a>

            <div className="lessons-dropdown">
              {lessons.length > 0 ? (
                lessons.map((lesson: any) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.slug}`}
                  >
                    {lesson.title.rendered}
                  </Link>
                ))
              ) : (
                <span className="lessons-empty">
                  No lessons available
                </span>
              )}
            </div>
          </div>
        </div>

        <AuthNav />
      </nav>
    </header>
  </NavbarShell>
);
}