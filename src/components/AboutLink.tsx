"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type AboutLinkProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AboutLink({
  children,
  className,
}: AboutLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    event.preventDefault();

    // Αν είμαστε ήδη στην αρχική
    if (pathname === "/") {
      const aboutSection =
        document.getElementById("about");

      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.replaceState(
          null,
          "",
          "/#about"
        );
      }

      return;
    }

    // Αν είμαστε σε άλλη σελίδα
    router.push("/#about");
  }

  return (
    <Link
      href="/#about"
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}