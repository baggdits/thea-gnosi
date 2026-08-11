const WORDPRESS_URL = process.env.WORDPRESS_URL;

export async function getLessons() {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/lessons`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch lessons from WordPress");
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