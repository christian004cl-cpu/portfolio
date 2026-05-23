import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Services />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
