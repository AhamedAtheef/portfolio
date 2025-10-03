import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/AhamedAtheef",
      ariaLabel: "Visit GitHub profile",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/ahamed-atheef-50b117385",
      ariaLabel: "Visit LinkedIn profile",
    },
    {
      name: "Email",
      icon: Mail,
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=ahamedatheef072@gmail.com",
      ariaLabel: "Send an email",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/94750943802",
      ariaLabel: "Chat on WhatsApp",
    },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Social Links with Tooltip */}
          <TooltipProvider>
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Tooltip key={link.name}>
                    <TooltipTrigger asChild>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.ariaLabel}
                        className="text-accent transition-all duration-300 hover:scale-110"
                      >
                        <Icon size={24} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Ahamed Atheef. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

