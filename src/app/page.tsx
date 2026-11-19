import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { EducationExperienceSection } from "@/components/sections/education-experience-section";
import { Navbar } from "@/components/layout/navbar";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { SiteEffects } from "@/components/layout/site-effects";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-surface px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <SiteEffects />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <EducationExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
