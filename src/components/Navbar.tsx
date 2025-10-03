import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Chat", path: "/chat" },
  ];

  const isActive = (path: string) => location.pathname === path;


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex gap-6 justify-center items-center text-xl font-bold text-accent">
            <img
              src="/about.png"
              alt="profile"
              onError={(e) => {
                e.currentTarget.outerHTML = "AA";
              }}
              className="w-10 h-10 rounded-full"
            />
            <span className="hidden md:block">Ahamed Atheef</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-1xl lg:text-[22px] font-medium transition-colors hover:text-accent ${isActive(link.path) ? "text-accent" : "text-foreground"
                  } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${isActive(link.path) ? "after:scale-x-100" : ""
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-accent"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in ">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-[16px] font-medium text-center transition-colors hover:text-accent ${isActive(link.path) ? "text-accent" : "text-foreground"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;