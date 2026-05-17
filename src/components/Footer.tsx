export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-zinc-500 dark:text-zinc-500">
        <span>&copy; {new Date().getFullYear()} Pranav Elavarthi</span>
        <div className="flex gap-4">
          <a
            href="https://github.com/pelavarthi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pelavarthi/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
