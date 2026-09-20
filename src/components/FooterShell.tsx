"use client";

import { usePathname } from "next/navigation";

export default function FooterShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isOurPlace =
    pathname === "/our-place";

  return (
    <div
      className={
        isOurPlace
          ? "footer-our-place"
          : ""
      }
    >
      {children}
    </div>
  );
}