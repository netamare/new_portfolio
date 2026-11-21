"use client";

import { Activity, ArrowDownRight, CalendarDays, CodeXml, ExternalLink, Plane, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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

function ProjectVisual({ kind }: { kind: ProjectKind }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-48 items-center justify-center overflow-hidden border-b border-white/[0.06] bg-[#0b0e19] sm:h-52"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgb(139_92_246_/_16%),transparent_65%)] transition-opacity duration-500 group-hover:opacity-75" />
      <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40 [background-image:linear-gradient(rgb(255_255_255_/_5%)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_5%)_1px,transparent_1px)] [background-size:28px_28px]" />

      {kind === "flight" ? (
        <div className="relative w-[82%] max-w-sm -rotate-2 rounded-2xl border border-white/10 bg-[#111827]/90 p-4 shadow-[0_18px_60px_rgb(0_0_0_/_45%)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.03] sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <span className="flex size-7 items-center justify-center rounded-lg bg-blue/10 text-blue">
                <Plane size={14} aria-hidden="true" />
              </span>
              Find your next journey
            </div>
            <span className="size-2 rounded-full bg-blue shadow-[0_0_12px_rgb(56_189_248_/_75%)]" />
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-xl border border-white/[0.07] bg-background/70 p-3">
            <div>
              <div className="mb-2 h-1.5 w-8 rounded-full bg-secondary/30" />
              <div className="h-2 w-14 rounded-full bg-slate-200/80" />
            </div>
            <div className="flex items-center gap-1.5 text-blue/80">
              <span className="h-px w-6 border-t border-dashed border-blue/50" />
              <Plane size={15} aria-hidden="true" />
              <span className="h-px w-6 border-t border-dashed border-blue/50" />
            </div>
            <div className="justify-self-end">
              <div className="mb-2 ml-auto h-1.5 w-8 rounded-full bg-secondary/30" />
              <div className="ml-auto h-2 w-14 rounded-full bg-slate-200/80" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-1.5 w-[38%] rounded-full bg-purple/60" />
            <span className="h-1.5 w-[24%] rounded-full bg-blue/50" />
            <span className="ml-auto h-1.5 w-10 rounded-full bg-white/10" />
          </div>
        </div>
      ) : null}

      {kind === "student" ? (
        <div className="relative grid w-[82%] max-w-sm grid-cols-[1.05fr_0.95fr] gap-3 -rotate-1 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.03]">
          <div className="rounded-2xl border border-white/10 bg-[#111827]/95 p-4 shadow-[0_18px_60px_rgb(0_0_0_/_45%)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="h-2 w-20 rounded-full bg-slate-200/75" />
              <CalendarDays size={15} className="text-purple" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, index) => (
                <span
                  key={index}
                  className={`aspect-square rounded-md border border-white/[0.04] ${index === 5 ? "bg-purple/70 shadow-[0_0_14px_rgb(139_92_246_/_28%)]" : "bg-white/[0.04]"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-2xl border border-white/10 bg-[#111827]/90 p-4 shadow-[0_18px_60px_rgb(0_0_0_/_35%)]">
              <div className="mb-4 h-2 w-16 rounded-full bg-slate-200/70" />
              <div className="space-y-2.5">
                <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-blue/80" /><span className="h-1.5 w-16 rounded-full bg-white/15" /></span>
                <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-purple/80" /><span className="h-1.5 w-12 rounded-full bg-white/15" /></span>
                <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-400/80" /><span className="h-1.5 w-14 rounded-full bg-white/15" /></span>
              </div>
            </div>
            <div className="rounded-xl border border-purple/20 bg-purple/10 p-3">
              <div className="h-1.5 w-12 rounded-full bg-purple/55" />
              <div className="mt-2 h-1.5 w-20 rounded-full bg-purple/20" />
            </div>
          </div>
        </div>
      ) : null}

      {kind === "monitoring" ? (
        <div className="relative w-[82%] max-w-sm rotate-1 rounded-2xl border border-white/10 bg-[#111827]/95 p-4 shadow-[0_18px_60px_rgb(0_0_0_/_45%)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.03] sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-blue/10 text-blue">
                <Activity size={15} aria-hidden="true" />
              </span>
              <span className="h-2 w-28 rounded-full bg-slate-200/75" />
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] font-medium text-emerald-300">LIVE</span>
          </div>
          <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
            <div className="space-y-2 rounded-xl border border-white/[0.06] bg-background/65 p-3">
              <span className="block h-1.5 w-14 rounded-full bg-white/15" />
              <span className="block h-1.5 w-10 rounded-full bg-white/10" />
              <span className="block h-1.5 w-12 rounded-full bg-white/10" />
            </div>
            <div className="flex h-20 items-end justify-around gap-2 rounded-xl border border-white/[0.06] bg-background/65 px-3 pb-3 pt-2">
              {[34, 58, 42, 76, 52, 68, 45].map((height, index) => (
                <span
                  key={index}
                  className={`w-full rounded-t-sm ${index % 2 === 0 ? "bg-blue/55" : "bg-purple/60"}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="h-1.5 w-1/3 rounded-full bg-blue/35" />
            <span className="h-1.5 w-1/4 rounded-full bg-purple/35" />
            <span className="h-1.5 w-1/5 rounded-full bg-white/10" />
          </div>
        </div>
      ) : null}

      <span className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full border border-white/10 bg-background/65 text-slate-300 backdrop-blur-sm">
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

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateLayout = () => {
      setHorizontal(media.matches);
      if (!viewportRef.current || !railRef.current || !media.matches) {
        setTravel(0);
        return;
      }
      setTravel(Math.max(0, railRef.current.scrollWidth - viewportRef.current.clientWidth));
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
      className={`relative scroll-mt-20 ${horizontal && !reduceMotion ? "projects-scroll-track" : "py-24 sm:py-32"}`}
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
          {projects.map(({ title, description, technologies, kind, Icon, accent }, index) => (
            <AnimatedReveal key={title} delay={0.08 + index * 0.1} className={horizontal && !reduceMotion ? "project-rail-card" : "h-full"} tilt>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface/65 shadow-[0_16px_50px_rgb(0_0_0_/_14%)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-purple/55 hover:shadow-[0_24px_65px_rgb(0_0_0_/_28%),0_0_38px_rgb(139_92_246_/_16%)]">
                <ProjectVisual kind={kind} />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
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
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-5">
                    <button type="button" onClick={() => setSelectedProject(kind)} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-purple to-blue px-4 text-sm font-semibold text-white shadow-[0_0_24px_rgb(139_92_246_/_18%)] transition hover:shadow-[0_0_30px_rgb(139_92_246_/_32%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">
                      Explore project <ArrowDownRight size={15} aria-hidden="true" />
                    </button>
                    {projects[index].githubUrl ? <a href={projects[index].githubUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-slate-300 transition hover:border-purple/60 hover:text-white"><CodeXml size={15} aria-hidden="true" /> GitHub</a> : null}
                    {projects[index].liveUrl ? <a href={projects[index].liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-slate-300 transition hover:border-blue/60 hover:text-white"><ExternalLink size={15} aria-hidden="true" /> Live demo</a> : null}
                  </div>
                </div>
              </article>
            </AnimatedReveal>
          ))}
         </motion.div>
        </div>
        {horizontal && !reduceMotion ? <div className="projects-scroll-indicator" aria-hidden="true"><span>Keep scrolling</span><span className="projects-scroll-icon">↓</span></div> : null}
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
                <ProjectVisual kind={selected.kind} />
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
              {(selected.githubUrl || selected.liveUrl) ? <div className="mt-8 flex flex-wrap gap-3">{selected.githubUrl ? <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold hover:border-purple/60"><CodeXml size={16} /> GitHub</a> : null}{selected.liveUrl ? <a href={selected.liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-purple px-5 text-sm font-semibold text-white"><ExternalLink size={16} /> Live demo</a> : null}</div> : null}
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
