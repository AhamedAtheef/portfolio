import { Database, Server, Laptop, Paintbrush, Code, Zap } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const Skills = () => {
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
    }

  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl tracking-wider md:text-3xl font-bold mb-4 text-accent">
             Technologies and tools I work with
          </h1>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card
                key={skill.name}
                className="bg-card border-border hover:border-accent transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Icon
                        className={`${skill.color} group-hover:text-accent transition-colors`}
                        size={40}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center animate-fade-in">
          <p className="text-muted-foreground">
            Always learning and exploring new technologies to stay ahead in the
            ever-evolving web development landscape.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;