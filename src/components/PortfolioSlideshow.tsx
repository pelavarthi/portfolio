"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Listening from "@/components/Listening";

export const SLIDES = [
  { id: "home", label: "Home", theme: "paper" as const },
  { id: "about", label: "About", theme: "light" as const },
  { id: "projects", label: "Projects", theme: "light" as const },
  { id: "listening", label: "Listening", theme: "light" as const },
] as const;

function slideIndexFromHash(): number {
  if (typeof window === "undefined") return 0;
  const hash = window.location.hash.replace("#", "");
  const index = SLIDES.findIndex((slide) => slide.id === hash);
  return index >= 0 ? index : 0;
}

export default function PortfolioSlideshow() {
  const [activeIndex, setActiveIndex] = useState(slideIndexFromHash);
  const isPaperTheme = SLIDES[activeIndex].theme === "paper";

  const goToSlide = useCallback((index: number) => {
    const next = Math.max(0, Math.min(SLIDES.length - 1, index));
    setActiveIndex(next);
    window.history.replaceState(null, "", `#${SLIDES[next].id}`);
  }, []);

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const onHashChange = () => setActiveIndex(slideIndexFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const navButtonClass = isPaperTheme
    ? "border-stone-300 bg-paper/80 text-stone-600 hover:border-stone-400 hover:text-stone-900"
    : "border-stone-200 bg-white/80 text-stone-500 hover:border-stone-300 hover:text-stone-900";

  const hintClass = isPaperTheme ? "text-stone-400" : "text-stone-400";

  return (
    <div
      className={`relative h-screen overflow-hidden ${
        isPaperTheme ? "bg-paper text-stone-900" : "bg-white text-stone-900"
      }`}
    >
      <Navbar
        slides={SLIDES}
        activeIndex={activeIndex}
        onNavigate={goToSlide}
        theme={isPaperTheme ? "paper" : "light"}
      />

      <div
        className="flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            id={slide.id}
            className={`h-full w-full shrink-0 overflow-y-auto overscroll-y-contain ${
              slide.theme === "paper" ? "bg-paper" : "bg-white"
            }`}
            aria-hidden={index !== activeIndex}
          >
            {slide.id === "home" && <Hero />}
            {slide.id === "about" && <About />}
            {slide.id === "projects" && <Projects />}
            {slide.id === "listening" && <Listening />}
          </div>
        ))}
      </div>

      {activeIndex > 0 && (
        <button
          type="button"
          onClick={goPrev}
          className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full border p-3 backdrop-blur-sm transition-colors sm:flex ${navButtonClass}`}
          aria-label="Previous section"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}

      {activeIndex < SLIDES.length - 1 && (
        <button
          type="button"
          onClick={goNext}
          className={`fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full border p-3 backdrop-blur-sm transition-colors sm:flex ${navButtonClass}`}
          aria-label="Next section"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      <div
        className={`pointer-events-none fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 text-xs tracking-widest sm:block ${hintClass}`}
      >
        ← → to navigate
      </div>
    </div>
  );
}
