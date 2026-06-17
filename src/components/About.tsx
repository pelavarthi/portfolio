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

      {/* Experience Section */}
      <div className="mb-24">
        <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.3em] text-stone-400">
          Experience
        </h3>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Education Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <h4 className="text-xl font-bold text-stone-900">Education</h4>
            </div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6 transition-all hover:bg-stone-50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-stone-100 bg-white p-2">
                    <img src="https://brand.virginia.edu/sites/uva_brand/files/2023-07/73_UVALogo_800x800.jpg" alt="UVA" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-2 mb-1">
                      <h5 className="font-bold text-stone-900">University of Virginia</h5>
                      <span className="text-sm font-medium text-stone-400 italic whitespace-nowrap shrink-0">2024 — 2027</span>
                    </div>
                    <p className="text-stone-600">B.S. Computer Science</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6 transition-all hover:bg-stone-50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-stone-100 bg-white p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tjlogo.png" alt="TJHSST" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-2 mb-1">
                      <h5 className="font-bold text-stone-900">Thomas Jefferson High School for Science and Technology</h5>
                      <span className="text-sm font-medium text-stone-400 italic whitespace-nowrap shrink-0">2020 — 2024</span>
                    </div>
                    <p className="text-stone-600">High School Diploma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Work Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💼</span>
              <h4 className="text-xl font-bold text-stone-900">Work</h4>
            </div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6 transition-all hover:bg-stone-50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-stone-100 bg-white p-2">
                    <img src="https://appexchange.salesforce.com/partners/servlet/servlet.FileDownload?file=00P4V000012BTLRUA4" alt="Cvent" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-2 mb-1">
                      <h5 className="font-bold text-stone-900">Cvent</h5>
                      <span className="text-sm font-medium text-stone-400 italic whitespace-nowrap shrink-0">Jun 2026 — Aug 2026</span>
                    </div>
                    <p className="text-stone-600">Software Engineer Intern</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6 transition-all hover:bg-stone-50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-stone-100 bg-white p-2 text-xl">
                    <img src="https://media.licdn.com/dms/image/v2/D4E0BAQE64gZyO30dbg/company-logo_200_200/company-logo_200_200/0/1722981804518/amprecover_logo?e=1783555200&v=beta&t=MgWbaCgbRmkdyT3m7m0vLGZgsST3idzePBaCdBvj5LQ" alt="AMP Health" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-2 mb-1">
                      <h5 className="font-bold text-stone-900">AMP Health</h5>
                      <span className="text-sm font-medium text-stone-400 italic whitespace-nowrap shrink-0">Jun 2025 — Apr 2026</span>
                    </div>
                    <p className="text-stone-600">Software Engineer Intern</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6 transition-all hover:bg-stone-50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-stone-100 bg-white p-2">
                    <img src="https://www.cyberark.com/wp-content/uploads/2014/06/guidepoint-security-logo.jpeg" alt="Guidepoint Security" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-2 mb-1">
                      <h5 className="font-bold text-stone-900">Guidepoint Security</h5>
                      <span className="text-sm font-medium text-stone-400 italic whitespace-nowrap shrink-0">Sep 2025 — Dec 2025</span>
                    </div>
                    <p className="text-stone-600">Cybersecurity Engineer Intern</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6 transition-all hover:bg-stone-50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-stone-100 bg-white p-2 text-xl">
                    <img src="https://avatars.githubusercontent.com/u/36056630?s=200&v=4" alt="Obscurity Labs" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-2 mb-1">
                      <h5 className="font-bold text-stone-900">Obscurity Labs</h5>
                      <span className="text-sm font-medium text-stone-400 italic whitespace-nowrap shrink-0">Jun 2023 — Aug 2023</span>
                    </div>
                    <p className="text-stone-600">Software Engineer Intern</p>
                  </div>
                </div>
              </div>
            </div>
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
