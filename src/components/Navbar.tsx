import Image from "next/image";
import { getSiteSettings } from "@/lib/wordpress";

export default async function Navbar() {
  const settings = await getSiteSettings();

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">

        <a
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
        </a>

        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/#about">About Us</a>
          <a href="/#our-place">Our Place</a>
          <a href="/#lessons">Lessons</a>
        </div>

        <a className="navbar-login" href="/login">
          Login
        </a>

      </nav>
    </header>
  );
}