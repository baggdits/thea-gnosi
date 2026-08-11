import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import OurPlace from "@/components/OurPlace";
import Lessons from "@/components/Lessons";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <OurPlace />
        <Lessons />
        <Reviews />
      </main>

      <Footer />
    </>
  );
}