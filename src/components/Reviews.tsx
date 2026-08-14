import { getReviews } from "@/lib/wordpress";

export default async function Reviews() {
  const reviews = await getReviews();

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-header">
        <h2>Reviews</h2>
        <p>What our students say about us.</p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review: any) => (
          <article key={review.id} className="review-card">

            {review.image && (
              <div className="review-image-wrapper">
                <img
                  src={review.image}
                  alt={review.name}
                  className="review-image"
                />
              </div>
            )}

            <div className="review-card-content">
              <h3>{review.name}</h3>

              <div
                className="review-rating"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <div
                className="review-text"
                dangerouslySetInnerHTML={{
                  __html: review.content,
                }}
              />
            </div>

          </article>
        ))}
      </div>
    </section>
  );
}