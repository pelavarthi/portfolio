export default function Hero() {
  return (
    <section
      id="about"
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24 text-center"
    >
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
        Computer Science &amp; Applied Math
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Hi, I&apos;m{" "}
        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Pranav Elavarthi
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        I&apos;m a CS student at the University of Virginia with experience in
        cybersecurity, full-stack development, and computer vision. I love
        building tools that make complex workflows simple.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="https://github.com/pelavarthi"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/pelavarthi/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          LinkedIn
        </a>
        <a
          href="mailto:rzg8qh@virginia.edu"
          className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Email
        </a>
      </div>
    </section>
  );
}
