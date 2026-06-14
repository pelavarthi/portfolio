export default function Listening() {
  return (
    <section className="mx-auto flex min-h-full max-w-4xl flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-600">
        On Rotation
      </p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
        What I&apos;m listening to
      </h2>
      <p className="mt-4 text-lg text-stone-600">
        A glimpse into my current favorites and daily rotations.
      </p>

      <div className="mt-12 flex w-full max-w-2xl flex-col gap-8">
        <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-100">
          <iframe
            style={{ borderRadius: "0px" }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1EpfPHA9lR01BU?utm_source=generator&theme=0&si=41acc1982b52433a"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-100">
          <iframe
            style={{ borderRadius: "0px" }}
            src="https://open.spotify.com/embed/playlist/6JVFYOCPtvCQBpUbBMIx3e?utm_source=generator&theme=0&si=d45159d9421e4845"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-100">
          <iframe
            style={{ borderRadius: "0px" }}
            src="https://open.spotify.com/embed/playlist/7fYDQAYKcwFh9628U0Ccl2?utm_source=generator&theme=0&si=d6cdcc1e424a4ceb"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
