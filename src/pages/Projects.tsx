import { ExternalLink, GitBranch, Github } from "lucide-react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";


const Projects = () => {
  const projects = [
    {
      title: "Mobile Shop Website",
      description:
        "Full-stack MERN Mobile-Shop website with payment integration, user authentication, and admin dashboard.",
      image: "/mobileshop.png",
      github: "https://github.com/AhamedAtheef",
      live: "https://supercell-city.netlify.app/",
      tags: ["React", "Node.js", "MongoDB", "supabase", "google-login", "Stripe", "TypeScript"],
      github_frontend_repo: "https://github.com/AhamedAtheef/mobile-frontend.git",
      github_backend_repo: "https://github.com/AhamedAtheef/mobile-backend.git",
    },
    {
      title: "Cosmetic Shop Website",
      description:
        "Full-stack MERN e-commerce app with payment integration, user authentication, and admin dashboard.",
      image: "/cbc.png",
      github: "https://github.com/ahamed-atheef",
      live: "https://skyrek-cosmetic.vercel.app/",
      tags: ["React", "Node.js", "MongoDB", "supabase", "google-login", "Stripe", "TypeScript"],
      github_frontend_repo: "https://github.com/AhamedAtheef/skyrek-frontends.git",
      github_backend_repo: "https://github.com/AhamedAtheef/skyrek-backend.git",
    },
    /*  {
       title: "Task Management App",
       description:
         "Collaborative task manager with real-time updates, drag-and-drop functionality, and team features.",
       image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
       github: "https://github.com/ahamed-atheef",
       live: "https://example.com",
       tags: ["React", "Express", "Socket.io", "MongoDB"],
     },
     {
       title: "Weather Dashboard",
       description:
         "Beautiful weather app with location search, forecasts, and interactive charts using weather APIs.",
       image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
       github: "https://github.com/ahamed-atheef",
       live: "https://example.com",
       tags: ["React", "API Integration", "Charts", "UI/UX"],
     },
     {
       title: "Social Media Dashboard",
       description:
         "Analytics dashboard for social media metrics with data visualization and export features.",
       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
       github: "https://github.com/ahamed-atheef",
       live: "https://example.com",
       tags: ["React", "Node.js", "Charts", "MongoDB"],
     },
     {
       title: "Blog Platform",
       description:
         "Modern blogging platform with markdown support, categories, and SEO optimization.",
       image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
       github: "https://github.com/ahamed-atheef",
       live: "https://example.com",
       tags: ["React", "Express", "MongoDB", "SEO"],
     }, */
    {
      title: "Portfolio ",
      description:
        "Tool to help developers create stunning portfolio websites with customizable templates.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      github: "https://github.com/ahamed-atheef",
      github_frontend_repo: "https://github.com/AhamedAtheef/portfolio.git",
      github_backend_repo: "temporary Stoped",
      live: "https://ahamedatheef.netlify.app/",
      tags: ["React", "Templates", "UI/UX", "Tailwind", "TypeScript"],
    },
    {
      title: "PINGEME Chat App",
      description:
        "A real-time chat application built with the MERN stack, featuring multiple themes, Zustand state management with cookies, and Cloudinary image uploads.",
      image: "/pingme.jpg",
      github: "https://github.com/AhamedAtheef",
      github_frontend_repo: "https://github.com/AhamedAtheef/chatApp_frontend.git",
      github_backend_repo: "https://github.com/AhamedAtheef/chatApp_backend.git",
      live: "https://pingmeapp.vercel.app/",
      tags: ["MERN", "ChatApp", "Shadcn", "Tailwind", "Cloudinary", "Zustand"],
    },

  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-accent">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground">
            A showcase of my recent work and side projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="bg-card border-border overflow-hidden hover:border-accent transition-all duration-300 hover:scale-105 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:text-yellow-500 border-accent text-accent hover:bg-accent/10"
                  asChild
                >
                  <a
                    href={project.github_backend_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranch size={16} className="mr-2" />
                    Backend Repo
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:text-yellow-500 border-accent text-accent hover:bg-accent/10"
                  asChild
                >
                  <a
                    href={project.github_frontend_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranch size={16} className="mr-2" />
                    Frontend Repo
                  </a>
                </Button>
              </CardFooter>

              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:text-yellow-500 border-accent text-accent hover:bg-accent/10"
                  asChild
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  asChild
                >
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Live
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;