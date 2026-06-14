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

export default function About({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-32">
      {/* Intro Header */}
      <div className="mb-24">
        <h2 className="text-6xl font-bold tracking-tighter text-stone-900 sm:text-8xl">
          Hey there!
        </h2>
        <div className="mt-8 max-w-3xl space-y-6 text-2xl leading-snug text-stone-600 sm:text-3xl">
          <p>
            My name is <span className="text-stone-900 font-semibold">Pranav Elavarthi</span>, and I&apos;m from Northern Virginia. 
          </p>
          <div className="h-px w-24 bg-blue-600"></div>
        </div>
      </div>

      {/* Brief History Section */}
      <div className="mb-24">
        <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.3em] text-stone-400">
          Brief History
        </h3>
        <div className="grid gap-12 text-lg leading-relaxed text-stone-600 lg:grid-cols-2">
          <div className="space-y-6">
            <p>
              I grew up in Northern Virginia and graduated from Thomas Jefferson High School for Science and Technology. Being around people who were constantly building things, competing, and exploring new ideas got me interested in tech pretty early on. Now I&apos;m studying Computer Science at the University of Virginia in the school of Engineering and Applied Science. I&apos;m still figuring out exactly where I want to end up, but I&apos;m enjoying the process of building and learning along the way.
            </p>
          </div>
          <div className="space-y-6">
            <p>
              Outside of school, I love playing basketball (huge Wizards fan!) and pickleball. I&apos;m also always down for a good poker game. In my free time, you can usually find me binging a new show, watching movies, listening to music, or exploring a new playlist. Definitely check out some of my favorite <a href="#movies" onClick={(e) => { e.preventDefault(); onNavigate('movies'); }} className="text-blue-600 hover:underline">watches</a> and <a href="#listening" onClick={(e) => { e.preventDefault(); onNavigate('listening'); }} className="text-blue-600 hover:underline">listens</a>.
            </p>
            <p>
              Feel free to take a look around, check out some of my <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate('projects'); }} className="text-blue-600 hover:underline">projects</a>, and reach out if you&apos;d like to connect.
            </p>
          </div>
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

      {/* Contact Section */}
      <div className="mb-16">
        <h3 className="mb-12 text-sm font-bold uppercase tracking-[0.3em] text-stone-400">
          Connect
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href="https://github.com/pelavarthi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-6 py-6 font-semibold text-stone-900 transition-all hover:bg-stone-100 hover:shadow-sm"
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="h-6 w-6" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pelavarthi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-6 py-6 font-semibold text-stone-900 transition-all hover:bg-stone-100 hover:shadow-sm"
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="h-6 w-6" />
            LinkedIn
          </a>
          <a
            href="mailto:rzg8qh@virginia.edu"
            className="flex items-center justify-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-6 py-6 font-semibold text-stone-900 transition-all hover:bg-stone-100 hover:shadow-sm"
          >
            <span className="text-xl">✉️</span>
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
