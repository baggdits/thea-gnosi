import Link from "next/link";
import FooterShell from "@/components/FooterShell";
import AboutLink from "@/components/AboutLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterShell>

      <footer className="site-footer">

        <div className="site-footer__inner">

          {/* BRAND */}

          <div className="site-footer__brand">

            <Link
              href="/"
              className="site-footer__logo"
            >
              ΘΕΑ ΓΝΩΣΗ
            </Link>

            <p className="site-footer__tagline">
              Μάθε, Μεγάλωσε, Ανακάλυψε τις δυνατότητές σου.
            </p>

          </div>


          {/* EXPLORE */}

          <div className="site-footer__column">

            <h3 className="site-footer__heading">
              Εξερεύνησε
            </h3>

            <nav className="site-footer__nav">

              <Link href="/lessons">
                Μαθήματα
              </Link>

              <AboutLink>
                Σχετικά με εμάς
              </AboutLink>

              <Link href="/our-place">
                Εγκαταστάσεις
              </Link>

              <Link href="/reviews">
                Αξιολογήσεις
              </Link>

            </nav>

          </div>


          {/* CONTACT */}

          <div className="site-footer__column">

            <h3 className="site-footer__heading">
              Επικοινωνία
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
              Έτοιμος να μάθεις;
            </span>

            <h3>
              Δες τις δυνατότητές σου.
            </h3>

            <AboutLink className="site-footer__button">

              Μάθε περισσότερα

              <span aria-hidden="true">
                →
              </span>

            </AboutLink>

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

    </FooterShell>
  );
}