const WORDPRESS_URL = process.env.WORDPRESS_URL;

async function getLesson(slug: string) {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/lessons?slug=${slug}`,
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

  return lessons[0] ?? null;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = await getLesson(slug);

  if (!lesson) {
    return (
      <main>
        <h1>Lesson not found</h1>
        <a href="/">Back to home</a>
      </main>
    );
  }

  return (
    <main>
      <article>
        <h1
          dangerouslySetInnerHTML={{
            __html: lesson.title.rendered,
          }}
        />

        <div
          dangerouslySetInnerHTML={{
            __html: lesson.content.rendered,
          }}
        />
      </article>

      <a href="/#lessons">Back to Lessons</a>
    </main>
  );
}