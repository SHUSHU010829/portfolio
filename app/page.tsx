import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Overview from "@/components/overview";
import SocialLinks from "@/components/social-links";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
// import Certifications from "@/components/certifications";
import Footer from "@/components/footer";

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
        {/* <Certifications /> */}
      </main>
      <Footer />
    </div>
  );
}
