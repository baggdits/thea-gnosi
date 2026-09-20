const WORDPRESS_URL = process.env.WORDPRESS_URL;


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


/* =========================================================
   HOMEPAGE
   ========================================================= */

export async function getHomePage() {
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

export async function getReviews() {
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

export async function getLessons(): Promise<
  Lesson[]
> {
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
 * Requires a valid WordPress JWT.
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