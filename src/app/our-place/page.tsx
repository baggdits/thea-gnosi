import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getOurPlace } from "@/lib/wordpress";

type GalleryItem = {
  id: number;
  image: string;
  title: string;
  description: string;
};

type OurPlaceData = {
  title: string;
  description: string;
  gallery: GalleryItem[];
};

export default async function OurPlacePage() {
  const data: OurPlaceData = await getOurPlace();

  return (
    <>
      <Navbar />

      <main className="our-place-page">

        <section className="our-place-header">

          <h1>{data.title}</h1>

          {data.description && (
            <p>{data.description}</p>
          )}

        </section>


        <section className="our-place-gallery">

          {data.gallery.map((item) => (
            <article
              key={item.id}
              className="our-place-gallery-item"
            >

              <div className="our-place-gallery-image">

                <img
                  src={item.image}
                  alt={item.title || data.title}
                />

              </div>


              <div className="our-place-gallery-content">

                {item.title && (
                  <h2>{item.title}</h2>
                )}

                {item.description && (
                  <p>{item.description}</p>
                )}

              </div>

            </article>
          ))}

        </section>

      </main>

      <Footer />
    </>
  );
}