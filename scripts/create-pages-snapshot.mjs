import {
  mkdirSync,
  writeFileSync,
  existsSync,
  rmSync,
} from "node:fs";

import path from "node:path";

const WORDPRESS_URL =
  process.env.WORDPRESS_URL ||
  "http://thea-gnosi.local";

const snapshotDirectory =
  "src/data";

const imageDirectory =
  "public/demo-media";

const snapshotFile =
  path.join(
    snapshotDirectory,
    "pages-snapshot.json"
  );

/* =============================================
   RESET DEMO MEDIA
   ============================================= */

if (existsSync(imageDirectory)) {
  rmSync(imageDirectory, {
    recursive: true,
    force: true,
  });
}

mkdirSync(snapshotDirectory, {
  recursive: true,
});

mkdirSync(imageDirectory, {
  recursive: true,
});

/* =============================================
   FETCH JSON
   ============================================= */

async function fetchJson(url) {
  console.log(`Fetching: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${url}`
    );
  }

  return response.json();
}

/* =============================================
   DOWNLOAD IMAGE
   ============================================= */

const downloadedImages = new Map();

async function downloadImage(url) {
  if (!url || typeof url !== "string") {
    return url;
  }

  if (!url.startsWith(WORDPRESS_URL)) {
    return url;
  }

  if (downloadedImages.has(url)) {
    return downloadedImages.get(url);
  }

  console.log(`Downloading image: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Image download failed: ${response.status} ${url}`
    );
  }

  const originalUrl = new URL(url);

  let filename =
    path.basename(originalUrl.pathname);

  /*
   * Αποφυγή σύγκρουσης ίδιων filenames.
   */

  const extension =
    path.extname(filename);

  const basename =
    path.basename(filename, extension);

  let finalFilename = filename;
  let counter = 1;

  while (
    existsSync(
      path.join(
        imageDirectory,
        finalFilename
      )
    )
  ) {
    finalFilename =
      `${basename}-${counter}${extension}`;

    counter++;
  }

  const buffer =
    Buffer.from(
      await response.arrayBuffer()
    );

  writeFileSync(
    path.join(
      imageDirectory,
      finalFilename
    ),
    buffer
  );

  const publicUrl =
    `/demo-media/${finalFilename}`;

  downloadedImages.set(
    url,
    publicUrl
  );

  return publicUrl;
}

/* =============================================
   REPLACE IMAGE URLS RECURSIVELY
   ============================================= */

async function localizeImages(value) {
  if (Array.isArray(value)) {
    return Promise.all(
      value.map(localizeImages)
    );
  }

  if (
    value &&
    typeof value === "object"
  ) {
    const result = {};

    for (
      const [key, childValue]
      of Object.entries(value)
    ) {
      result[key] =
        await localizeImages(
          childValue
        );
    }

    return result;
  }

  if (
    typeof value === "string" &&
    value.startsWith(
      `${WORDPRESS_URL}/wp-content/uploads/`
    )
  ) {
    return downloadImage(value);
  }

  return value;
}

/* =============================================
   CREATE SNAPSHOT
   ============================================= */

async function createSnapshot() {
  console.log("");
  console.log(
    "Creating GitHub Pages snapshot..."
  );

  const [
    home,
    settings,
    reviews,
    lessons,
  ] = await Promise.all([
    fetchJson(
      `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/home`
    ),

    fetchJson(
      `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/settings`
    ),

    fetchJson(
      `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/reviews`
    ),

    fetchJson(
      `${WORDPRESS_URL}/wp-json/wp/v2/lessons?per_page=100&_embed`
    ),
  ]);

  /*
   * Αντικαθιστούμε όλα τα URLs
   * των WordPress uploads με URLs
   * προς /public/demo-media.
   */

  const localizedHome =
    await localizeImages(home);

  const localizedSettings =
    await localizeImages(settings);

  const localizedReviews =
    await localizeImages(reviews);

  const localizedLessons =
    await localizeImages(lessons);

  const snapshot = {
    home: localizedHome,
    settings: localizedSettings,
    reviews: localizedReviews,
    lessons: localizedLessons,
  };

  writeFileSync(
    snapshotFile,
    JSON.stringify(
      snapshot,
      null,
      2
    ),
    "utf8"
  );

  console.log("");
  console.log(
    `Snapshot created: ${snapshotFile}`
  );

  console.log(
    `Images saved: ${imageDirectory}`
  );

  console.log(
    `Downloaded images: ${downloadedImages.size}`
  );
}

createSnapshot().catch(
  (error) => {
    console.error("");
    console.error(
      "Snapshot creation failed:"
    );

    console.error(error);

    process.exit(1);
  }
);