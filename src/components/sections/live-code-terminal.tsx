"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const examples = [
  { language: "Flutter / Dart", file: "lib/main.dart", color: "text-blue", lines: ["class PortfolioApp extends StatelessWidget {", "  const PortfolioApp({super.key});", "  Widget build(context) => MaterialApp(home: Home());", "}"] },
  { language: "Kotlin / Android", file: "MainActivity.kt", color: "text-purple", lines: ["class MainActivity : ComponentActivity() {", "  override fun onCreate(state: Bundle?) {", "    setContent { PortfolioScreen() }", "  }", "}"] },
  { language: "Web / React", file: "page.tsx", color: "text-cyan-300", lines: ["export default function Portfolio() {", "  return <Experience creative />", "}", "// ideas, brought to life."] },
] as const;

export function LiveCodeTerminal() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isWide, setIsWide] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const example = examples[exampleIndex];
  const source = example.lines.join("\n");
  const visibleCode = source.slice(0, visibleCharacters);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const update = () => setIsWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || !isWide) return;
    if (visibleCharacters < source.length) {
      const timer = window.setTimeout(() => setVisibleCharacters((count) => count + 2), 24);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      setVisibleCharacters(0);
      setExampleIndex((index) => (index + 1) % examples.length);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [isWide, reduceMotion, source.length, visibleCharacters]);

  return (
    <motion.aside
      aria-label="Animated code examples for Flutter, Kotlin, and web development"
      className="relative z-20 mt-5 hidden w-[min(18rem,78vw)] max-w-[18rem] self-center overflow-hidden rounded-2xl border border-white/10 bg-[#090b13]/90 shadow-[0_18px_55px_rgb(0_0_0_/_42%),0_0_30px_rgb(139_92_246_/_12%)] backdrop-blur-xl sm:block"
      initial={false}
      animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [-1, 0.2, -1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2.5">
        <span className="size-2 rounded-full bg-rose-400/80" />
        <span className="size-2 rounded-full bg-amber-300/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={example.file}
            className="ml-2 truncate font-mono text-[10px] text-slate-400"
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            {example.file}
          </motion.span>
        </AnimatePresence>
        <span className={`ml-auto shrink-0 font-mono text-[9px] ${example.color}`}>{example.language}</span>
      </div>
      <div className="grid grid-cols-[1.25rem_1fr] gap-x-2 p-3 font-mono text-[9px] leading-[1.8] sm:text-[10px]">
        <span aria-hidden="true" className="select-none text-right text-slate-600">{visibleCode.split("\n").map((_, index) => index + 1).join("\n")}</span>
        <pre aria-hidden="true" className="m-0 min-h-[5.2rem] whitespace-pre-wrap break-words text-slate-200"><code><span className="terminal-full-code">{source}</span><span className="terminal-animated-code">{visibleCode}</span><span className="terminal-caret">▍</span></code></pre>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.07] px-3 py-1.5">
        <span className="font-mono text-[9px] text-slate-500">Netsanet Amare</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-emerald-300/80"><span className="size-1.5 rounded-full bg-emerald-400" /> ready</span>
      </div>
    </motion.aside>
  );
}
