import snapshot from "@/data/pages-snapshot.json";

const WORDPRESS_URL = process.env.WORDPRESS_URL;

const isGitHubPages =
  process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

const GITHUB_PAGES_BASE_PATH = "/thea-gnosi";


/* =========================================================
   GITHUB PAGES HELPERS
   ========================================================= */

/**
 * Στο GitHub Pages το project βρίσκεται στο:
 *
 * /thea-gnosi/
 *
 * Επομένως:
 *
 * /demo-media/image.jpg
 *
 * πρέπει να γίνει:
 *
 * /thea-gnosi/demo-media/image.jpg
 */
function withPagesBasePath<T>(data: T): T {
  if (!isGitHubPages) {
    return data;
  }

  const json = JSON.stringify(data);

  return JSON.parse(
    json.replaceAll(
      '"/demo-media/',
      `"${GITHUB_PAGES_BASE_PATH}/demo-media/`
    )
  ) as T;
}


/* =========================================================
   TYPES
   ========================================================= */

export type LessonDetails = {
  classes: string;
  duration: string;
  type: string;
  preparation: string;
  syllabus: string[];
};

export type Lesson = {
  id: number;
  slug: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  featured_media: number;

  lesson_details: LessonDetails;

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
};

export type Review = {
  id: number;
  name: string;
  content: string;
  rating: number;
  image?: string;
};


/* =========================================================
   HOMEPAGE
   ========================================================= */

export async function getHomePage() {
  /*
   * GitHub Pages:
   * χρησιμοποιούμε το αποθηκευμένο snapshot.
   */
  if (isGitHubPages) {
    return withPagesBasePath(
      snapshot.home
    );
  }

  /*
   * Local / κανονικό site:
   * χρησιμοποιούμε WordPress REST API.
   */
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/home`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch homepage data"
    );
  }

  return response.json();
}


/* =========================================================
   REVIEWS
   ========================================================= */

export async function getReviews(): Promise<Review[]> {
  /*
   * GitHub Pages.
   */
  if (isGitHubPages) {
    return withPagesBasePath(
      snapshot.reviews as Review[]
    );
  }

  /*
   * Local WordPress.
   */
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/reviews`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch reviews"
    );
  }

  return response.json();
}


/* =========================================================
   LESSONS
   ========================================================= */

export async function getLessons(): Promise<Lesson[]> {
  /*
   * GitHub Pages.
   */
  if (isGitHubPages) {
    return withPagesBasePath(
      snapshot.lessons as Lesson[]
    );
  }

  /*
   * Local WordPress.
   */
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/lessons?per_page=100&_embed`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch lessons"
    );
  }

  return response.json();
}


/* =========================================================
   SITE SETTINGS
   ========================================================= */

export async function getSiteSettings() {
  /*
   * GitHub Pages.
   */
  if (isGitHubPages) {
    return withPagesBasePath(
      snapshot.settings
    );
  }

  /*
   * Local WordPress.
   */
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/settings`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch site settings from WordPress"
    );
  }

  return response.json();
}


/* =========================================================
   SINGLE LESSON
   ========================================================= */

export async function getLessonBySlug(
  slug: string
): Promise<Lesson | null> {
  /*
   * GitHub Pages:
   * βρίσκουμε το μάθημα μέσα στο snapshot.
   */
  if (isGitHubPages) {
    const lesson =
      (snapshot.lessons as Lesson[]).find(
        (item) => item.slug === slug
      );

    return lesson
      ? withPagesBasePath(lesson)
      : null;
  }

  /*
   * Local WordPress.
   */
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/lessons?slug=${encodeURIComponent(
      slug
    )}&_embed`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch lesson"
    );
  }

  const lessons: Lesson[] =
    await response.json();

  return lessons.length > 0
    ? lessons[0]
    : null;
}


/* =========================================================
   OUR PLACE
   ========================================================= */

export async function getOurPlace() {
  /*
   * GitHub Pages.
   */
  if (isGitHubPages) {
    return withPagesBasePath(
      snapshot.home.our_place
    );
  }

  /*
   * Local WordPress.
   */
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/home`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch Our Place"
    );
  }

  const data = await response.json();

  return data.our_place;
}


/* =========================================================
   MY NOTES
   ========================================================= */

/**
 * Χρησιμοποιείται από την κανονική/local εφαρμογή.
 *
 * Στο GitHub Pages το Dashboard χρησιμοποιεί
 * τα demo notes και δεν κάνει WordPress request.
 */
export async function getMyNotes(
  token: string
) {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/my-notes`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Failed to fetch my notes"
    );
  }

  return data;
}