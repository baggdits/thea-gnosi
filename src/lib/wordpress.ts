const WORDPRESS_URL = process.env.WORDPRESS_URL;

/**
 * Homepage
 */
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


/**
 * Reviews
 */
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


/**
 * Lessons
 */
export async function getLessons() {
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


/**
 * Site Settings
 */
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


/**
 * Single Lesson
 */
export async function getLessonBySlug(
  slug: string
) {
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

  const lessons = await response.json();

  return lessons.length > 0
    ? lessons[0]
    : null;
}


/**
 * Our Place
 */
export async function getOurPlace() {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/our-place`,
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

  return response.json();
}


/**
 * My Notes
 *
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