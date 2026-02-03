import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import SocialLinks from "@/components/SocialLinks";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Hero />
      <main className="flex flex-col gap-10 px-10 pb-10">
        <Overview />
        <SocialLinks />
        <About />
        <Experience />
        <Projects />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
