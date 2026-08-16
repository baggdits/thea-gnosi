import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { getHomePage } from "@/lib/wordpress";

export default async function Home() {
  const home = await getHomePage();

  return (
    <>
      <Navbar />

      <main>
        <Hero data={home.hero} />
        <About data={home.about} />
        <Reviews />
      </main>

      <Footer />
    </>
  );
}