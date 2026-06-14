"use client";

export default function DemoLayout({
  title,
  description,
  children,
  backHref = "/",
  onBack,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  backHref?: string;
  onBack?: () => void;
}) {
  const handleBack = () => {
    if (onBack) onBack();
    window.location.href = backHref;
  };

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to portfolio
        </button>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-stone-600">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
