import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">

      <div className="site-footer__inner">

        {/* BRAND */}
        <div className="site-footer__brand">

          <Link href="/" className="site-footer__logo">
            Thea Gnosi
          </Link>

          <p className="site-footer__tagline">
            Learn. Grow. Discover your potential.
          </p>

        </div>


        {/* EXPLORE */}
        <div className="site-footer__column">

          <h3 className="site-footer__heading">
            Explore
          </h3>

          <nav className="site-footer__nav">

            <Link href="/lessons">
              Lessons
            </Link>

            <Link href="/#about">
              About Us
            </Link>

            <Link href="/#our-place">
              Our Place
            </Link>

            <Link href="/reviews">
              Reviews
            </Link>

          </nav>

        </div>


        {/* CONTACT */}
        <div className="site-footer__column">

          <h3 className="site-footer__heading">
            Get in touch
          </h3>

          <div className="site-footer__contact">

            <a href="mailto:info@theagnosi.gr">
              info@theagnosi.gr
            </a>

            <a href="tel:+302462000000">
              +30 24620 00000
            </a>

          </div>

        </div>


        {/* CTA */}
        <div className="site-footer__cta">

          <span className="site-footer__eyebrow">
            Ready to learn?
          </span>

          <h3>
            Discover your potential.
          </h3>

          <Link
            href="/#about"
            className="site-footer__button"
          >
            Learn More
            <span aria-hidden="true">
              →
            </span>
          </Link>

        </div>

      </div>


      {/* BOTTOM */}
      <div className="site-footer__bottom">

        <p>
          © {year} Thea Gnosi. All rights reserved.
        </p>

        <div className="site-footer__legal">

          <Link href="/privacy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms
          </Link>

        </div>

      </div>

    </footer>
  );
}