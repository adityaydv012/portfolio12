import React, { useState, useEffect, useRef } from 'react';

const FlipLetter = ({ children, className = "", delay = 0, axis = "X" }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [randomFlip, setRandomFlip] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipping(true);
  };

  const handleMouseLeave = () => {
    setIsFlipping(false);
  };

  useEffect(() => {
    const randomInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setRandomFlip(true);
        setTimeout(() => setRandomFlip(false), 600);
      }
    }, 2000);

    return () => clearInterval(randomInterval);
  }, []);

  const getRotationClass = () => {
    if (isFlipping || randomFlip) {
      switch(axis) {
        case 'Y': return 'rotate-y-360';
        case 'Z': return 'rotate-z-360';
        case '-Y': return '-rotate-y-360';
        case '-Z': return '-rotate-z-360';
        default: return 'rotate-x-360';
      }
    }
    return '';
  };

  return (
    <span
      className={`
        inline-block transition-all duration-600 ease-out cursor-pointer
        transform-gpu preserve-3d
        ${getRotationClass()}
        ${className}
      `}
      style={{ 
        transitionDelay: `${delay}ms`,
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
};

const FlipWord = ({ word, className = "", axis = "X", rotation = "0deg" }) => {
  const [isWaving, setIsWaving] = useState(false);

  const handleMouseEnter = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000);
  };

  return (
    <div
      className={`absolute font-thin tracking-tight opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer ${className}`}
      style={{ transform: `rotate(${rotation})` }}
      onMouseEnter={handleMouseEnter}
    >
      {word.split('').map((letter, index) => (
        <FlipLetter 
          key={index} 
          delay={isWaving ? index * 80 : 0}
          axis={axis}
          className="hover:brightness-110"
        >
          {letter}
        </FlipLetter>
      ))}
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', updatePosition);
    
    // Add hover listeners to flip elements
    const flipElements = document.querySelectorAll('[data-flip]');
    flipElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      flipElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className={`
        fixed pointer-events-none z-50 border border-white/50 rounded-full
        transition-all duration-100 ease-out mix-blend-difference
        ${isHovering ? 'w-15 h-15 bg-white/10' : 'w-5 h-5'}
      `}
      style={{
        left: position.x - (isHovering ? 30 : 10),
        top: position.y - (isHovering ? 30 : 10),
      }}
    />
  );
};

const LetudFooter = () => {
  const [waveActive, setWaveActive] = useState({ main: false, secondary: false });
  const footerRef = useRef(null);

  const triggerWave = (target) => {
    setWaveActive(prev => ({ ...prev, [target]: true }));
    setTimeout(() => {
      setWaveActive(prev => ({ ...prev, [target]: false }));
    }, 1000);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        triggerWave('main');
        triggerWave('secondary');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scatteredWords = [
    { word: "DESIGN", position: "top-[15%] left-[10%]", size: "text-4xl md:text-6xl lg:text-8xl", rotation: "-15deg", axis: "Y" },
    { word: "INNOVATION", position: "top-[25%] right-[8%]", size: "text-2xl md:text-4xl lg:text-6xl", rotation: "12deg", axis: "Z" },
    { word: "STRATEGY", position: "bottom-[35%] left-[15%]", size: "text-3xl md:text-5xl lg:text-7xl", rotation: "-8deg", axis: "X" },
    { word: "CREATIVE", position: "top-[60%] right-[12%]", size: "text-4xl md:text-6xl lg:text-9xl", rotation: "18deg", axis: "-Y" },
    { word: "DIGITAL", position: "bottom-[15%] right-[25%]", size: "text-3xl md:text-5xl lg:text-6xl", rotation: "-12deg", axis: "-Z" }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes rotate-x-360 {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(360deg); }
        }
        @keyframes rotate-y-360 {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes rotate-z-360 {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }
        @keyframes -rotate-y-360 {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }
        @keyframes -rotate-z-360 {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(-360deg); }
        }
        
        .rotate-x-360 { animation: rotate-x-360 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .rotate-y-360 { animation: rotate-y-360 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .rotate-z-360 { animation: rotate-z-360 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .-rotate-y-360 { animation: -rotate-y-360 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .-rotate-z-360 { animation: -rotate-z-360 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        
        .preserve-3d { transform-style: preserve-3d; }
        .duration-600 { transition-duration: 600ms; }
        
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        .bg-pulse { animation: bg-pulse 8s ease-in-out infinite; }
        
        body { cursor: none; }

        /* Custom font for perfect L'Étude styling */
        .letude-main {
          font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 100;
          letter-spacing: -0.02em;
          line-height: 0.85;
        }

        .letude-secondary {
          font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 100;
          letter-spacing: 0.02em;
          line-height: 0.85;
        }
      `}</style>

      <CustomCursor />

     

      {/* Main Footer */}
      <footer 
        ref={footerRef}
        className="relative bg-black min-h-screen flex items-center w-full justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-pulse">
          <div className="absolute inset-0 bg-gradient-radial from-white/3 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/2 to-transparent"></div>
        </div>

        {/* Main Container - Perfectly Centered */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          
          {/* Massive Main Text - Perfectly Aligned */}
          <div className="text-center font-extrabold relative">
            <div 
              className="letude-main text-white font-extrabold select-none"
              style={{ fontSize: 'clamp(4rem, 20vw, 30rem)' }}
              onMouseEnter={() => triggerWave('main')}
              data-flip
            >
              {"Aditya".split('').map((letter, index) => (
                <FlipLetter 
                  key={index} 
                  delay={waveActive.main ? index * 100 : 0}
                  className="hover:text-white/70 font-medium"
                >
                  {letter}
                </FlipLetter>
              ))}
            </div>
            
            <div 
              className="letude-secondary text-white/60 select-none mt-4"
              style={{ fontSize: 'clamp(2rem, 8vw, 12rem)' }}
              onMouseEnter={() => triggerWave('secondary')}
              data-flip
            >
              {"STUDIO".split('').map((letter, index) => (
                <FlipLetter 
                  key={index} 
                  delay={waveActive.secondary ? index * 100 : 0}
                >
                  {letter}
                </FlipLetter>
              ))}
            </div>
          </div>

          {/* Scattered Words - Perfectly Positioned */}
          <div className="absolute inset-0 pointer-events-none">
            {scatteredWords.map((item, index) => (
              <div key={index} className="pointer-events-auto">
                <FlipWord 
                  word={item.word}
                  className={`${item.position} ${item.size}`}
                  rotation={item.rotation}
                  axis={item.axis}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Information - Clean Bottom Layout */}
        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 flex flex-col md:flex-row justify-between items-end z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent">
          
          {/* Contact Info */}
          <div className="flex flex-col gap-2 mb-8 md:mb-0">
            <a 
              href="adityaydv012@gmail.com" 
              className="text-white/70 hover:text-white text-sm font-light transition-all duration-300"
              data-flip
            >
             adityaydv012@gmail.com
            </a>
            <a 
              href="7905818220" 
              className="text-white/70 hover:text-white text-sm font-light transition-all duration-300"
              data-flip
            >
             7905818220
            </a>
            <span className="text-white/70 text-sm font-light">India,Uttar Pradesh</span>
            <span className="text-white/70 text-sm font-light">© 2025 Aditya</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-5">
            {['instagram', 'twitter', 'linkedin', 'dribbble'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-500 hover:rotate-z-360 hover:scale-110"
                aria-label={social}
                data-flip
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  {social === 'instagram' && (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  )}
                  {social === 'twitter' && (
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  )}
                  {social === 'linkedin' && (
                    <>
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </>
                  )}
                  {social === 'dribbble' && (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"/>
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default LetudFooter;