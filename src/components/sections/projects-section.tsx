"use client";

import { Activity, ArrowDown, ArrowDownRight, CalendarDays, ExternalLink, Plane, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GithubMark } from "@/components/ui/social-icons";
import { projects as portfolioProjects } from "@/data/portfolio";

const projectVisuals = {
  flight: { Icon: Plane, accent: "text-blue" },
  student: { Icon: CalendarDays, accent: "text-purple" },
  monitoring: { Icon: Activity, accent: "text-blue" },
} as const;


const projects = portfolioProjects.map((project) => ({
  ...project,
  ...projectVisuals[project.kind],
}));

type ProjectKind = (typeof projects)[number]["kind"];

function ProjectVisual({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative h-44 overflow-hidden border-b border-white/[0.06] bg-[#080b14] p-2 sm:p-3">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgb(139_92_246_/_18%),transparent_68%)]" />
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080b14] shadow-[0_18px_55px_rgb(0_0_0_/_45%)]">
        <Image
          src={image}
          alt={`${title} project screenshot`}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1023px) 46vw, 31vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </div>
      <span className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full border border-white/10 bg-background/75 text-slate-300 backdrop-blur-sm">
        <ArrowDownRight size={15} aria-hidden="true" />
      </span>
    </div>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectKind | null>(null);
  const trackRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [horizontal, setHorizontal] = useState(false);
  const [travel, setTravel] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const railX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const selected = projects.find((project) => project.kind === selectedProject);
  const selectedLiveUrl: string = selected?.liveUrl ?? "";

  useEffect(() => {
    // Keep the animated horizontal rail for roomy desktop viewports. On shorter
    // screens the normal grid gives each full-height card enough vertical space.
    const media = window.matchMedia("(min-width: 1280px) and (min-height: 820px)");
    const updateLayout = () => {
      setHorizontal(media.matches);
      if (!viewportRef.current || !railRef.current || !media.matches) {
        setTravel(0);
        return;
      }
      // Keep a small rail movement while leaving enough inset for all three
      // cards to remain inside the clipping viewport at either endpoint.
      setTravel(Math.max(8, railRef.current.scrollWidth - viewportRef.current.clientWidth + 8));
    };
    const observer = new ResizeObserver(updateLayout);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (railRef.current) observer.observe(railRef.current);
    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateLayout);
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      ref={trackRef}
      id="projects"
      aria-labelledby="projects-heading"
      className={`relative scroll-mt-20 ${horizontal && !reduceMotion ? "projects-scroll-track" : "pt-10 pb-24 sm:py-32"}`}
      style={horizontal && !reduceMotion ? { height: `calc(100svh + ${travel}px)` } : undefined}
    >
      <div className={horizontal && !reduceMotion ? "projects-sticky" : "relative"}>
       <Container className="relative w-full">
        <div className={horizontal && !reduceMotion ? "projects-heading" : ""}>
         <AnimatedReveal>
          <SectionHeading
            id="projects-heading"
            eyebrow="Selected work"
            title="Featured Projects"
            description="Some things I've been building."
          />
         </AnimatedReveal>
        </div>

        <div ref={viewportRef} className={horizontal && !reduceMotion ? "projects-rail-viewport" : "mt-12"}>
         <motion.div ref={railRef} style={horizontal && !reduceMotion ? { x: railX } : undefined} className={horizontal && !reduceMotion ? "projects-rail" : "grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-7"}>
          {projects.map(({ title, description, technologies, kind, image, Icon, accent }, index) => (
            <AnimatedReveal key={title} delay={0.08 + index * 0.1} className={horizontal && !reduceMotion ? "project-rail-card" : "h-full"} tilt>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface/65 shadow-[0_16px_50px_rgb(0_0_0_/_14%)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-purple/55 hover:shadow-[0_24px_65px_rgb(0_0_0_/_28%),0_0_38px_rgb(139_92_246_/_16%)]">
                <ProjectVisual image={image} title={title} />
                <div className="flex flex-1 flex-col p-5 sm:p-3.5">
                  <div className="mb-3 flex items-start gap-3">
                    <span className={`mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] ${accent}`}>
                      <Icon size={17} strokeWidth={1.8} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110" />
                    </span>
                    <h3 className="mb-0 pt-1 text-lg leading-snug tracking-tight transition-colors duration-200 group-hover:text-white">{title}</h3>
                  </div>
                  <p className="mb-6 text-sm leading-6 text-slate-400 transition-colors duration-200 group-hover:text-slate-300">{description}</p>
                  <ul className="mt-auto flex list-none flex-wrap gap-2 p-0" aria-label={`${title} technologies`}>
                    {technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-border/80 bg-background/60 px-2.5 py-1 text-xs font-medium text-slate-300"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-3">
                    <button type="button" onClick={() => setSelectedProject(kind)} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-purple to-blue px-3 text-sm font-semibold text-white shadow-[0_0_24px_rgb(139_92_246_/_18%)] transition hover:shadow-[0_0_30px_rgb(139_92_246_/_32%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">
                      Explore project <ArrowDownRight size={15} aria-hidden="true" />
                    </button>
                    {projects[index].githubUrl ? <a href={projects[index].githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} on GitHub (opens in a new tab)`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-purple/30 bg-purple/5 px-3 text-sm font-semibold text-slate-200 transition-[border-color,background-color,color] duration-200 hover:border-purple/65 hover:bg-purple/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"><GithubMark size={16} /> View on GitHub</a> : null}
                    {projects[index].liveUrl ? <a href={projects[index].liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-slate-300 transition hover:border-blue/60 hover:text-white"><ExternalLink size={15} aria-hidden="true" /> Live demo</a> : null}
                  </div>
                </div>
              </article>
            </AnimatedReveal>
          ))}
         </motion.div>
        </div>
        {horizontal && !reduceMotion ? <div className="projects-scroll-indicator" aria-hidden="true"><span>Keep scrolling</span><span className="projects-scroll-icon"><ArrowDown size={14} strokeWidth={1.8} /></span></div> : null}
      </Container>
      </div>
      {selected ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" className="max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0c0e18] shadow-[0_30px_100px_rgb(0_0_0_/_65%)] sm:rounded-3xl">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.07] bg-[#0c0e18]/90 px-5 py-4 backdrop-blur sm:px-8">
              <p className="mb-0 text-xs font-semibold uppercase tracking-[0.2em] text-blue">Project details</p>
              <button autoFocus onClick={() => setSelectedProject(null)} aria-label="Close project details" className="flex size-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-purple/60 hover:text-white"><X size={18} /></button>
            </header>
            <div className="p-5 sm:p-8">
              <h2 id="project-dialog-title" className="mb-3 text-2xl sm:text-4xl">{selected.title}</h2>
              <p className="mb-7 max-w-2xl text-base leading-7">{selected.overview}</p>
              <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e19] [&>div]:h-64 [&>div]:border-b-0 sm:[&>div]:h-80">
                <ProjectVisual image={selected.image} title={selected.title} />
              </div>
                <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg">Key features</h3>
                  <ul className="space-y-2 text-sm text-slate-300">{selected.features.map((feature) => <li key={feature} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-purple" />{feature}</li>)}</ul>
                </div>
                <div>
                  <h3 className="mb-3 text-lg">Technologies</h3>
                  <ul className="flex flex-wrap gap-2">{selected.technologies.map((technology) => <li key={technology} className="rounded-full border border-purple/20 bg-purple/[0.08] px-3 py-1.5 text-xs font-medium text-slate-200">{technology}</li>)}</ul>
                </div>
              </div>
              {(selected.githubUrl || selectedLiveUrl) ? <div className="mt-8 flex flex-wrap gap-3">{selected.githubUrl ? <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${selected.title} on GitHub (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-purple/30 bg-purple/5 px-5 text-sm font-semibold text-slate-200 transition hover:border-purple/65 hover:bg-purple/10 hover:text-white"><GithubMark size={16} /> View on GitHub</a> : null}{selectedLiveUrl ? <a href={selectedLiveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-purple px-5 text-sm font-semibold text-white"><ExternalLink size={16} /> Live demo</a> : null}</div> : null}
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
