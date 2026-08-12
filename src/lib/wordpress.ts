const WORDPRESS_URL = process.env.WORDPRESS_URL;

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
    throw new Error("Failed to fetch homepage data");
  }

  return response.json();
}

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
    throw new Error("Failed to fetch lessons");
  }

  return response.json();
}

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
    throw new Error("Failed to fetch site settings from WordPress");
  }

  return response.json();
}

export async function getLessonBySlug(slug: string) {
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
    throw new Error("Failed to fetch lesson");
  }

  const lessons = await response.json();

  return lessons.length > 0 ? lessons[0] : null;
}