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

      <div className="mt-12 w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-100">
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
    </section>
  );
}
