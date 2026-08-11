import { getLessons } from "@/lib/wordpress";

export default async function Lessons() {
  const lessons = await getLessons();

  return (
    <section id="lessons">
      <h2>Lessons</h2>

      {lessons.length === 0 ? (
        <p>No lessons available.</p>
      ) : (
        <div>
          {lessons.map((lesson: any) => (
            <article key={lesson.id}>
              <h3
                dangerouslySetInnerHTML={{
                  __html: lesson.title.rendered,
                }}
              />

              <div
                dangerouslySetInnerHTML={{
                  __html: lesson.excerpt.rendered,
                }}
              />

              <a href={`/lessons/${lesson.slug}`}>
                Read Lesson
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}