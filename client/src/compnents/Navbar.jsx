import { Menu, X, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <header
      className={`w-full fixed top-0 justify-center items-center z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1F2A5A]/20 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      } text-white`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <div>
            <h1 className="text-lg md:text-2xl font-bold leading-tight">
              Aditya Pratap <br /> Singh
            </h1>
            <img src="/arrow.png" alt="Arrow" className="w-20 h-5 mt-1" />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          <button 
            onClick={() => scrollToSection('home')}
            className={`transition-all duration-300 hover:text-green-400 ${
              activeSection === 'home' ? 'text-green-400' : 'text-white'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className={`transition-all duration-300 hover:text-green-400 ${
              activeSection === 'about' ? 'text-green-400' : 'text-white'
            }`}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('skills')}
            className={`transition-all duration-300 hover:text-green-400 ${
              activeSection === 'skills' ? 'text-green-400' : 'text-white'
            }`}
          >
            Skills
          </button>
         
          <button 
            onClick={() => scrollToSection('projects')}
            className={`relative transition-all duration-300 hover:text-green-400 ${
              activeSection === 'projects' ? 'text-green-400' : 'text-white'
            }`}
          >
            Projects
            <span className="absolute -top-2 -right-5 bg-purple-700 text-white px-1 text-xs rounded">
              PRO
            </span>
          </button>
        </nav>

        {/* Right Buttons + Mobile Hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-green-400 px-5 py-2 rounded-full hover:bg-green-500 hover:text-black transition"
            >
              Get In Touch
            </button>
            <button className="bg-purple-700 p-3 rounded-full hover:bg-purple-600 transition">
              <Upload size={18} />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0D1237]/95 backdrop-blur-md px-6 py-6 space-y-4 text-center shadow-md rounded-b-lg">
          <button 
            onClick={() => scrollToSection('home')}
            className={`block transition-colors duration-300 ${
              activeSection === 'home' ? 'text-green-400' : 'text-white hover:text-green-400'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className={`block transition-colors duration-300 ${
              activeSection === 'about' ? 'text-green-400' : 'text-white hover:text-green-400'
            }`}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('skills')}
            className={`block transition-colors duration-300 ${
              activeSection === 'skills' ? 'text-green-400' : 'text-white hover:text-green-400'
            }`}
          >
            Skills
          </button>
       
          <button 
            onClick={() => scrollToSection('projects')}
            className={`block transition-colors duration-300 ${
              activeSection === 'projects' ? 'text-green-400' : 'text-white hover:text-green-400'
            }`}
          >
            Projects <span className="text-purple-500">PRO</span>
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-full border border-green-400 px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition mt-4"
          >
            Get In Touch
          </button>
        </div>
      )}
    </header>
  );
}