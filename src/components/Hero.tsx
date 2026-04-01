export default function Hero() {
  return (
    <section
      id="about"
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24 text-center"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Hi, I&apos;m{" "}
        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Pranav Elavarthi
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        I&apos;m a developer who loves building things for the web. Welcome to
        my corner of the internet — check out some of my work below.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          LinkedIn
        </a>
        <a
          href="mailto:your@email.com"
          className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Email
        </a>
      </div>
    </section>
  );
}
