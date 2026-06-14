export default function Hero() {
  return (
    <section className="relative flex min-h-full flex-col items-center justify-center bg-[#f0f4f8] px-6 pb-24 pt-24 text-center text-stone-900">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-600">
        Computer Science &amp; Applied Math
      </p>
      <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
        Pranav Elavarthi
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone-600">
        <i>
          "Any sufficiently advanced technology is indistinguishable from magic"
        </i>
      </p>
      
      {/* Social Icons - Responsive positioning */}
      <div className="mt-12 flex items-center space-x-8 sm:absolute sm:bottom-8 sm:left-8 sm:mt-0">
        <a
          href="https://github.com/pelavarthi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 transition-colors hover:text-stone-900"
          aria-label="GitHub"
        >
          <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/pelavarthi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 transition-colors hover:text-[#0077b5]"
          aria-label="LinkedIn"
        >
          <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href="mailto:rzg8qh@virginia.edu"
          className="text-stone-400 transition-colors hover:text-blue-600"
          aria-label="Email"
        >
          <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.818h-18.738l5.472-8.813zm9.201-1.259l4.623-3.746v9.458l-4.623-5.712z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
