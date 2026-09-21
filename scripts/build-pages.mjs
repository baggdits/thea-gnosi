import {
  existsSync,
  renameSync,
  rmSync,
} from "node:fs";

import { execSync } from "node:child_process";

const apiPath = "src/app/api";

const temporaryApiPath =
  "src/app/_api-disabled-for-pages";

const nextPath = ".next";

let apiMoved = false;

try {
  /*
   * =============================================
   * 1. ΠΡΟΣΩΡΙΝΗ ΑΦΑΙΡΕΣΗ API ROUTES
   * =============================================
   */

  if (existsSync(apiPath)) {
    console.log(
      "Temporarily disabling API routes for GitHub Pages..."
    );

    renameSync(
      apiPath,
      temporaryApiPath
    );

    apiMoved = true;
  }

  /*
   * =============================================
   * 2. ΚΑΘΑΡΙΣΜΟΣ NEXT CACHE
   * =============================================
   *
   * Το .next μπορεί να περιέχει generated
   * TypeScript references προς τα API routes.
   */

  if (existsSync(nextPath)) {
    console.log(
      "Cleaning previous Next.js build..."
    );

    rmSync(nextPath, {
      recursive: true,
      force: true,
    });
  }

  /*
   * =============================================
   * 3. STATIC GITHUB PAGES BUILD
   * =============================================
   */

  console.log(
    "Building GitHub Pages version..."
  );

  execSync("npm run build", {
    stdio: "inherit",

    env: {
      ...process.env,
      GITHUB_PAGES: "true",
    },
  });

  console.log("");
  console.log(
    "GitHub Pages build completed successfully."
  );
} catch (error) {
  console.error("");
  console.error(
    "GitHub Pages build failed."
  );

  throw error;
} finally {
  /*
   * =============================================
   * 4. ΕΠΑΝΑΦΟΡΑ API ROUTES
   * =============================================
   *
   * Εκτελείται ακόμα και αν αποτύχει το build.
   */

  if (
    apiMoved &&
    existsSync(temporaryApiPath)
  ) {
    console.log(
      "Restoring API routes..."
    );

    renameSync(
      temporaryApiPath,
      apiPath
    );
  }
}