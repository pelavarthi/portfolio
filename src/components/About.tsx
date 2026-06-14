const skills = [
  { name: "Python", icon: "python/python-original.svg" },
  { name: "Java", icon: "java/java-original.svg" },
  { name: "JavaScript", icon: "javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "typescript/typescript-original.svg" },
  { name: "C", icon: "c/c-original.svg" },
  { name: "R", icon: "r/r-original.svg" },
  { name: "HTML5", icon: "html5/html5-original.svg" },
  { name: "CSS3", icon: "css3/css3-original.svg" },
  { name: "Docker", icon: "docker/docker-original.svg" },
  { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "mysql/mysql-original.svg" },
  { name: "Angular", icon: "angularjs/angularjs-original.svg" },
  { name: "Git", icon: "git/git-original.svg" },
  { name: "AWS", icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
  { name: "React", icon: "react/react-original.svg" },
];

export default function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-32">
      {/* Intro Header */}
      <div className="mb-24">
        <h2 className="text-6xl font-bold tracking-tighter text-stone-900 sm:text-8xl">
          Hey there!
        </h2>
        <div className="mt-8 max-w-3xl space-y-6 text-2xl leading-snug text-stone-600 sm:text-3xl">
          <p>
            My name is <span className="text-stone-900 font-semibold">Pranav Elavarthi</span>, from Northern Virginia. 
            Interested in helping engineer the future of software applications.
          </p>
          <div className="h-px w-24 bg-blue-600"></div>
        </div>
      </div>

      {/* Technical Skills Section */}
      <div className="mb-24">
        <h3 className="mb-12 text-sm font-bold uppercase tracking-[0.3em] text-stone-400">
          Technical Skills
        </h3>
        <div className="overflow-hidden border-y border-stone-100 py-12">
          <div className="animate-scroll">
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="mx-12 flex items-center space-x-4 transition-transform hover:scale-110"
              >
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}`}
                  alt={skill.name}
                  className="h-12 w-12 object-contain"
                />
                <span className="text-lg font-bold text-stone-700">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brief History Section */}
      <div className="mb-16">
        <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.3em] text-stone-400">
          Brief History
        </h3>
        <div className="grid gap-12 text-lg leading-relaxed text-stone-600 lg:grid-cols-2">
          <div className="space-y-6">
            <p>
              I&apos;m currently a Computer Science major at the University of Virginia&apos;s Engineering School, 
              paired with an Applied Math minor. I like building things and solving hard problems — 
              that&apos;s kind of why I&apos;m here.
            </p>
            <p>
              Grew up in Northern Virginia, which set the stage for my interest in technology. 
              Outside of school, I&apos;m into music, movies, and basketball. Always have been, 
              probably always will be.
            </p>
          </div>
          <div className="space-y-6">
            <p>
              Still figuring out where it all goes, but that&apos;s what makes it interesting. 
              I value efficiency and clarity—whether it&apos;s in code or a complex project, 
              the best solutions are usually the ones that are easy to understand.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="rounded-full bg-stone-100 px-6 py-2 text-sm font-semibold text-stone-900 ring-1 ring-stone-200">🏀 Basketball</span>
              <span className="rounded-full bg-stone-100 px-6 py-2 text-sm font-semibold text-stone-900 ring-1 ring-stone-200">🎬 Movies</span>
              <span className="rounded-full bg-stone-100 px-6 py-2 text-sm font-semibold text-stone-900 ring-1 ring-stone-200">🎵 Music</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
