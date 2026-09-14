import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurPlaceGallery from "@/components/OurPlaceGallery";
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

        <OurPlaceGallery data={data} />

      </main>

      <Footer />
    </>
  );
}