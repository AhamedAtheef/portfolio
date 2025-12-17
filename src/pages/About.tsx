import { Code2, Palette, Rocket } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Full Stack Development",
      description: "Expert in building scalable web applications using the MERN stack",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces that users love",
    },
    {
      icon: Rocket,
      title: "Problem Solver",
      description: "Passionate about turning complex problems into elegant solutions",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">About Me</h1>
          <p className="text-[16px] md:text-lg text-muted-foreground">
            Get to know more about my journey and expertise
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <div className="flex justify-center animate-scale-in">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden border-4 border-accent/30 shadow-lg bg-black/50">
              <img
                src="/about.png"
                alt="Ahamed Atheef - Full Stack Developer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-[20px] md:text-3xl text-center lg:text-left tracking-wider font-bold text-accent lobster-two-regular">
              Ahamed Atheef
            </h2>
            <p className="text-base sm:text-lg text-center lg:text-left text-foreground/90 leading-relaxed">
              Hi, I'm <span className="font-semibold">Ahamed Atheef</span>, a passionate
              <span className="font-semibold"> Full Stack Developer</span> specializing in the
              MERN stack (MongoDB, Express.js, React, Node.js,TypeScript). I love crafting applications
              that are not only functional but also provide exceptional user experiences.
            </p>

            <p className="text-base sm:text-lg text-center lg:text-left text-foreground/90 leading-relaxed">
              With strong expertise in both frontend and backend development, I bridge the gap
              between <span className="font-semibold">design and functionality</span>, creating
              seamless digital experiences. My focus is on writing clean, scalable code and
              building products that make a real-world impact.
            </p>
          </div>
        </div>

        {/* What I Do & Defines Me */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* What I Do */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 text-center lg:text-center mb-4 tracking-wide">
              🔧 What I Do
            </h3>
            <ul className="space-y-3 text-sm sm:text-lg text-foreground/90 leading-relaxed">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✔</span>
                <span>Build modern full-stack web applications with seamless frontend–backend integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✔</span>
                <span>Create responsive and interactive UIs with React & Tailwind CSS</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✔</span>
                <span>Develop secure and scalable APIs using Node.js & Express.js</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✔</span>
                <span>Manage and optimize databases with MongoDB</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✔</span>
                <span>Explore advanced topics like authentication, cloud hosting, and performance optimization</span>
              </li>
            </ul>
          </div>

          {/* What Defines Me */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 text-center lg:text-center mb-4 tracking-wide">
              🌟 What Defines Me
            </h3>
            <ul className="space-y-3 text-sm sm:text-lg text-foreground/90 leading-relaxed">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">⚡</span>
                <span>Problem-solving mindset and curiosity for new technologies</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">⚡</span>
                <span>Continuous learning and exploring advanced development topics</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">⚡</span>
                <span>Balance between UI/UX design and technical architecture</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">⚡</span>
                <span>Passion for building impactful and user-friendly digital products</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="hidden md:block text-center text-yellow-200 font-thin tracking-wider leading-relaxed mt-4 mb-8">
          When I'm not coding, I enjoy exploring new technologies, contributing to
          open-source projects, and designing UI/UX concepts that delight users.
        </p>

        {/* Certificates Section */}
        <section id="certificates" className="py-16 bg-black text-white">
          <div className="container mx-auto px-4">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-accent mb-12">
              🎓 Certificates
            </h2>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Certificate Card */}
              <div className="bg-black/40 border border-accent/30 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform animate-fade-in">
                <img
                  src="/fullstack.jpg"
                  alt="MERN Stack Certificate"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-[15px] md:text-xl text-center lg:text-start font-semibold mb-2">Full Stack Development</h3>
                <p className="text-gray-400 text-sm mb-3">SkyRK Academy – 2025</p>
                <a
                  href="/full_stack.PDF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-medium hover:underline"
                >
                  View Certificate →
                </a>
              </div>
              {/* Example Certificate 4 */}
              <div className="bg-black/40 border border-accent/30 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform animate-fade-in">
                <img
                  src="/codecamp.jpg"
                  alt="JavaScript Certificate"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-[15px] md:text-xl text-center lg:text-start font-semibold mb-2">JavaScript Algorithms</h3>
                <p className="text-gray-400 text-sm mb-3">Free Code Camp</p>
                <a
                  href="/free code camp.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-medium hover:underline"
                >
                  View Certificate →
                </a>
              </div>
              
              {/* Example Certificate 3 */}
              <div className="bg-black/40 border border-accent/30 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform animate-fade-in">
                <img
                  src="/english.jpg"
                  alt="psycology & counseling Certificate"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-[15px] md:text-xl text-center lg:text-start font-semibold mb-2">Psychology & Counseling</h3>
                <p className="text-gray-400 text-sm mb-3">ICAS College</p>
                <a
                  href="/english.PDF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-medium hover:underline"
                >
                  View Certificate →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="text-center p-6 rounded-lg bg-card border border-border hover:border-accent transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-accent/10">
                    <Icon className="text-accent" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
};

export default About;
