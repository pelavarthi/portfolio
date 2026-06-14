"use client";

import { useState } from "react";

type Slide = {
  id: string;
  label: string;
};

type NavbarProps = {
  slides: readonly Slide[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  theme: "paper" | "light";
};

export default function Navbar({
  slides,
  activeIndex,
  onNavigate,
  theme,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const isPaper = theme === "paper";

  const navClass = isPaper
    ? "border-stone-200/80 bg-paper/80"
    : "border-stone-200/80 bg-white/80";

  const logoClass = "text-stone-900 transition-opacity hover:opacity-70";

  const tabActiveClass = "text-stone-900";
  const tabInactiveClass = "text-stone-500 hover:text-stone-700";
  const tabIndicatorClass = "bg-stone-900";

  const mobileMenuClass = isPaper
    ? "border-stone-200 bg-paper"
    : "border-stone-200 bg-white";

  const mobileActiveClass = isPaper
    ? "bg-stone-100 text-stone-900"
    : "bg-stone-100 text-stone-900";

  const mobileInactiveClass = "text-stone-600 hover:bg-stone-50 hover:text-stone-900";

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-md ${navClass}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => onNavigate(0)}
          className={`text-lg font-semibold tracking-tight ${logoClass}`}
        >
          PE
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => onNavigate(index)}
              className={`relative px-4 py-2 text-sm transition-colors ${
                index === activeIndex ? tabActiveClass : tabInactiveClass
              }`}
            >
              {slide.label}
              {index === activeIndex && (
                <span
                  className={`absolute inset-x-4 -bottom-[17px] h-px ${tabIndicatorClass}`}
                />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="text-stone-600 sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className={`border-t px-6 py-4 sm:hidden ${mobileMenuClass}`}>
          <div className="flex flex-col gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  onNavigate(index);
                  setOpen(false);
                }}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  index === activeIndex
                    ? mobileActiveClass
                    : mobileInactiveClass
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
