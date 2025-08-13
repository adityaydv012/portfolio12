import React, { useState, useEffect, useRef } from 'react';

const ProjectsSection = () => {
  // Add Google Fonts to match Framer site
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const projects = [
    {
      id: 1,
      name: "Healthism Website",
      domain: "healthism.in",
      description: `Healthism.in is a modern and responsive gym and fitness website designed to promote an active lifestyle and showcase gym services, memberships, and programs. The platform features an engaging user interface, fast performance, and seamless navigation, catering to fitness enthusiasts and potential members.

Tech Stack:
- Frontend: React.js, Tailwind CSS
- Backend: Node.js
- Server & APIs: AWS
- Hosting & Domains: Netlify (Frontend), GoDaddy (Domain)
`,
      side: "left",
      repo: "https://github.com/VirtuGrowDigital/healthism-aditya"
    },
    {
      id: 2,
      name: "VirtuGrow Digital Website",
      domain: "virtugrowdigital.in",
      description: `VirtuGrowDigital.com is the official website of a full-service digital marketing and technology agency. The site showcases the company’s services in SEO, social media, UI/UX design, website & app development, and creative branding — all wrapped in a sleek, modern, and business-focused design.

Tech Stack:
- Frontend: React.js, Tailwind CSS
- Backend: Node.js (if applicable)
- Hosting & Domain: Netlify, GoDaddy
`,
      side: "right",
      repo: "https://github.com/virtugrow001/main_site-virtugrow-"
    },
    {
      id: 3,
      name: "Ava Chikan",
      domain: "https://avachikan-test.netlify.app/",
      description: `AvaChikan is a modern e-commerce platform focused on premium Chikankari fashion for women. The site delivers a clean, elegant shopping experience with smooth navigation, responsive design, and beautiful product showcases — built to reflect the grace of traditional craftsmanship with a modern UI.


Tech Stack:
- Frontend: React.js, Tailwind CSS
- Backend: Node.js
- Hosting: Netlify`
,
      side: "left",
      repo: "https://github.com/VirtuGrowDigital/ava-chikankari"
    },
    {
      id: 4,
      name: "Aman Chikan",
      domain: "amanchikan.com",
      description: `AmanChikan.com is a stylish and user-friendly e-commerce website dedicated to selling premium Chikankari fashion apparel. The site offers a seamless shopping experience, product filtering, and responsive design optimized for both mobile and desktop users.

Tech Stack:
- Frontend: React.js, Tailwind CSS
- Backend: Node.js
- Server & APIs: AWS
- Hosting & Domain: Netlify (Frontend), GoDaddy (Domain)
`,
      side: "right",
      repo: "https://github.com/VirtuGrowDigital/aman-chikan"
    },
    {
      id: 5,
      name: "Shri Nilayam",
      domain: "https://shrinilayam.in/",
      description: `Shrinilayam.in is a peaceful and spiritually themed website offering detailed information about temple services, pooja rituals, and event bookings. Built with Angular, the site ensures a fast, structured, and responsive user experience tailored for devotees and visitors alike.

Tech Stack :
- Frontend: Angular
- Backend: Static / Angular-integrated
- Hosting & Domain: GoDaddy`,
      side: "left",
      repo: "https://github.com/VirtuGrowDigital/healthism-aditya"
    },
    {
      id: 6,
      name: "Oxyzone Fashion",
      domain: "oxyzonefashion.com",
      description: `OxyzonFashion.com is a modern Shopify-powered e-commerce website focused exclusively on stylish and affordable clothing. While the store is built on Shopify, I contributed by editing the theme, updating visual content, and refining the layout to ensure a smooth, responsive shopping experience for customers.

Platform & Tools:
- Platform: Shopify
- My Role: Storefront editing, theme customization, content & image updates
`,
      side: "right"
     
    },
    {
      id: 7,
      name: "Mawi Luxury",
      domain: "mawiluxury.com",
      description: `MawiLuxury.com is a luxury WordPress-based website built for showcasing and selling premium perfumes. I worked on customizing the theme, updating product visuals and content, improving layout responsiveness, and ensuring the overall design reflects the elegance of the brand.

Platform & Role:
- Platform: WordPress
- My Role: Theme customization, content updates, layout enhancements
`,
      side: "left"
    },

  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          } else {
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.2, // Lower threshold for mobile
        rootMargin: '0px 0px -50px 0px' // Less aggressive on mobile
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id='projects' className="min-h-screen bg-transparent py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{fontFamily: 'Inter, sans-serif', fontWeight: '800'}}>
            Project
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-cyan-400 mx-auto"></div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Central Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 h-full opacity-80"></div>
          
          {/* Mobile Timeline Line - Left side on mobile */}
          <div className="block md:hidden absolute left-4 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 h-full opacity-80"></div>

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => itemRefs.current[index] = el}
                data-index={index}
                className={`relative flex items-center ${
                  project.side === 'left' 
                    ? 'justify-start md:justify-start' 
                    : 'justify-start md:justify-end'
                }`}
              >
                {/* Timeline Dot - Desktop centered, Mobile left */}
                <div 
                  className={`absolute w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full border-2 md:border-4 border-slate-900 z-10 transition-all duration-700 ${
                    visibleItems.has(index) 
                      ? 'scale-100 shadow-lg shadow-cyan-400/50' 
                      : 'scale-0'
                  } left-3.5 md:left-1/2 md:transform md:-translate-x-1/2`}
                ></div>

                {/* Project Card */}
                <div 
                  className={`w-full transition-all duration-700 ease-out ${
                    // Mobile: always from left with margin, Desktop: alternating sides
                    'ml-12 md:ml-0'
                  } ${
                    project.side === 'left' 
                      ? 'md:mr-8 md:pr-8' 
                      : 'md:ml-8 md:pl-8'
                  } ${
                    // Mobile: max-width and left positioning, Desktop: alternating max-width
                    'max-w-sm md:max-w-md'
                  } ${
                    visibleItems.has(index)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-8 md:-translate-x-16'
                  }`}
                >
                  {/* Connection Line - Hidden on mobile, shown on desktop */}
                  <div 
                    className={`hidden md:block absolute top-1/2 w-6 md:w-8 h-0.5 bg-cyan-400 transform -translate-y-1/2 transition-all duration-700 ${
                      project.side === 'left' 
                        ? 'right-0' 
                        : 'left-0'
                    } ${
                      visibleItems.has(index) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  ></div>

                  {/* Card Content */}
                  <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg md:rounded-xl p-4 md:p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10">
                    <div className="mb-3">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1" style={{fontFamily: 'Inter, sans-serif', fontWeight: '700'}}>
                        {project.name}
                      </h3>
                      <a
  href={`https://${project.domain}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-cyan-400 font-semibold text-base md:text-lg underline hover:text-cyan-300 transition-all duration-200"
  style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}
>
  {project.domain}
</a>

                    </div>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed" style={{fontFamily: 'Inter, sans-serif', fontWeight: '400'}}>
                      {project.description}
                      {project.repo && (
  <div className="mt-4">
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded hover:bg-cyan-600 transition duration-300"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      View Repo
    </a>
  </div>
)}

                    </p>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;