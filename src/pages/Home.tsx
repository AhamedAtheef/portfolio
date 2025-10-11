import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Code2, Download, FileText, Palette } from "lucide-react";
import { Button } from "../components/ui/button";
import Typewriter from "../components/typingeffect";
import { Database, Server, Laptop, Paintbrush, Code, Zap } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const Home = () => {
  const skills = [
    {
      name: "MongoDB",
      icon: Database,
      description: "NoSQL database for scalable applications",
      color: "text-green-500",
    },
    {
      name: "Express.js",
      icon: Server,
      description: "Fast, unopinionated web framework",
      color: "text-gray-400",
    },
    {
      name: "React",
      icon: Laptop,
      description: "Building dynamic user interfaces",
      color: "text-blue-500",
    },
    {
      name: "Node.js",
      icon: Code,
      description: "JavaScript runtime for backend",
      color: "text-green-600",
    },
    {
      name: "UI/UX Design",
      icon: Paintbrush,
      description: "Creating beautiful user experiences",
      color: "text-accent",
    },
    {
      name: "Performance",
      icon: Zap,
      description: "Optimizing for speed and efficiency",
      color: "text-accent",
    },
    {
      name: "Tailwind CSS",
      icon: () => (
        <img
          src="/tailwindcss.png"
          alt="Tailwind CSS"
          className="rounded-full object-cover w-10 h-10 flex-shrink-0"
        />

      ),
      description: "Utility-first CSS framework",
      color: "text-sky-400",

    },
    {
      name: "Supabase",
      icon: () => (
        <img
          src="/supabase.png"
          alt="supabase"
          className="rounded-full object-cover w-10 h-10 flex-shrink-0"
        />

      ),
      description: "Open-source Firebase alternative with Postgres",

    },
    {
      name: "Figma",
      icon: () => (
        <img
          src="/figma.png"
          alt="Figma"
          className="rounded-full object-cover w-10 h-10 flex-shrink-0"
        />
      ),
      description: "Collaborative interface design and prototyping tool",
      color: "",
    },
    {
      name: "JavaScript",
      icon: () => (
        <img
          src="/javascripts.png"
          alt="js"
          className="rounded-full object-cover w-10 h-10 flex-shrink-0"
        />
      ),
      description: "A strongly typed superset of JavaScript for scalable applications",
      color: "",
    },
    {
      name: "TypeScript",
      icon: () => (
        <img
          src="/Typescript.png"
          alt="Ts"
          className="rounded-full object-cover w-10 h-10 flex-shrink-0"
        />
      ),
      description: "A strongly typed superset of JavaScript for scalable applications",
      color: "",
    }
  ];
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center px-4 bg-[url('/mobile.jpg')] md:bg-[url('/desktop.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Icon Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8 animate-scale-in">
              <Code2 className="text-accent" size={32} />
              <Palette className="text-accent" size={32} />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-accent animate-slide-up lobster-two-regular">
              Ahamed Atheef
            </h1>

            <Typewriter />

            {/* Description */}
            <p className="text-base md:text-lg text-foreground/80 mb-12 max-w-2xl mx-auto lg:mx-0 animate-fade-in">
              Building modern web applications with cutting-edge technologies and
              creating beautiful user experiences that make a difference.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-scale-in">
              <Link to="/projects">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg group"
                >
                  View My Projects
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about" className="hidden md:block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 font-semibold px-8 py-6 text-lg"
                >
                  Learn More About Me
                </Button>
              </Link>
            </div>

            {/* CV Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-scale-in mt-6">
              {/* Download Button */}
              <a href="/Ahamed_Atheef_CV.pdf" download>
                <Button
                  size="lg"
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-[4rem] py-3 rounded-lg flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download CV
                </Button>
              </a>

              {/* View Online Button */}
              <a
                href="/Ahamed_Atheef_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-black border-yellow-400 border text-yellow-500 hover:text-black hover:bg-transparent font-semibold px-[4rem] md:px-[4.5rem] py-3 rounded-lg flex items-center gap-2"
                >
                  <FileText className="h-5 w-5" />
                  View Online
                </Button>
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:flex justify-center lg:justify-end xl:ml-20 animate-scale-in">
            <div className="relative w-[30rem] h-[28rem] rounded-full overflow-hidden border-4 border-accent/30 shadow-lg bg-black/50">
              <img
                src="/portfolio1.jpg"
                alt="Ahamed Atheef"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section (separate, placed below hero) */}
      <div className="overflow-hidden w-full py-[10%] md:py-[3%] bg-black">
        <div className="skills-scroll">
          {[...skills, ...skills].map((skill, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-4 bg-black/40 border border-yellow-400 rounded-lg shadow-md mx-4 min-w-[220px] h-[120px] hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate('/skills')}
            >
              <skill.icon className={`w-6 h-6 ${skill.color}`} />
              <div>
                <h3 className="font-semibold">{skill.name}</h3>
                <p className="text-sm text-gray-400">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block fixed bottom-6 right-6 z-50 group animate-bounce">
        <a
          href="https://wa.me/94750943802"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M16 .667C7.64.667.667 7.64.667 16c0 2.827.747 5.578 2.16 7.987L.667 31.333l7.573-2.093A15.24 15.24 0 0 0 16 31.333c8.36 0 15.333-6.973 15.333-15.333S24.36.667 16 .667zm0 28a12.62 12.62 0 0 1-6.453-1.773l-.467-.28-4.493 1.24 1.213-4.36-.307-.467A12.58 12.58 0 0 1 3.333 16C3.333 9.013 9.013 3.333 16 3.333c6.987 0 12.667 5.68 12.667 12.667S22.987 28.667 16 28.667zm7.067-9.333c-.4-.2-2.373-1.173-2.747-1.307-.373-.133-.64-.2-.907.2-.267.4-1.04 1.307-1.28 1.573-.24.267-.48.3-.88.1-.4-.2-1.693-.627-3.227-2-1.2-1.067-2-2.373-2.24-2.773-.24-.4-.027-.613.173-.813.18-.18.4-.467.6-.707.2-.24.267-.4.4-.667.133-.267.067-.507-.033-.707-.1-.2-.88-2.12-1.2-2.907-.32-.773-.64-.667-.88-.667-.227 0-.493-.027-.76-.027s-.707.1-1.08.507c-.373.4-1.413 1.387-1.413 3.373 0 1.987 1.453 3.907 1.653 4.173.2.267 2.867 4.387 6.947 6.147.973.413 1.733.667 2.32.853.973.307 1.867.267 2.573.16.787-.12 2.373-.973 2.707-1.92.333-.947.333-1.76.233-1.92-.093-.16-.36-.267-.76-.467z" />
          </svg>
        </a>
        {/* Tooltip */}
        <span className="absolute bottom-16 right-1/2 translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          Chat on WhatsApp
        </span>
      </div>

    </div>

  );
};

export default Home;
