import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurPlace from "@/components/OurPlace";
import { getHomePage } from "@/lib/wordpress";

export default async function OurPlacePage() {
  const home = await getHomePage();

  return (
    <>
      <Navbar />

      <main>
        <OurPlace data={home.our_place} />
      </main>

      <Footer />
    </>
  );
}