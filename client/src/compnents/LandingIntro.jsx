import React, { useEffect, useState, useRef } from 'react';

const LandingIntro = ({ onFinish }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create floating particles
    const particleArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.7 + 0.3,
      color: `hsl(${220 + Math.random() * 60}, 70%, 60%)`,
      pulse: Math.random() * Math.PI * 2
    }));

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particleArray.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.02;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;

        // Pulsing effect
        const pulsedSize = particle.size + Math.sin(particle.pulse) * 0.5;
        const pulsedOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulsedSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('60%)', `${pulsedOpacity * 60}%)`);
        ctx.fill();

        // Draw connections
        particleArray.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${(100 - distance) / 500})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Attract particles to mouse
      particleArray.forEach(particle => {
        const dx = e.clientX - particle.x;
        const dy = e.clientY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          particle.speedX += dx * 0.00005;
          particle.speedY += dy * 0.00005;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation timeline - Much slower and more dramatic
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setCurrentPhase(1), 800),   // Logo appears (was 500)
      setTimeout(() => setCurrentPhase(2), 2800),  // Subtitle appears (was 1500)
      setTimeout(() => setCurrentPhase(3), 4500),  // Skills appear (was 2500)
      setTimeout(() => setCurrentPhase(4), 6500),  // Floating icons (was 3500)
      setTimeout(() => setShowButton(true), 8000), // Show get started button (was 4000)
    ];

    // Auto-advance after 12 seconds if user doesn't interact
    const autoAdvance = setTimeout(() => {
      onFinish();
    }, 12000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(autoAdvance);
    };
  }, [onFinish]);

  const handleGetStarted = () => {
    setCurrentPhase(5); // Trigger exit animation
    setTimeout(onFinish, 1000);
  };

  const skipIntro = () => {
    setCurrentPhase(5);
    setTimeout(onFinish, 500);
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(100px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes typewriter {
          0% { width: 0; }
          100% { width: 100%; }
        }

        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: #3b82f6; }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3); }
          50% { text-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.5); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes slideInFromLeft {
          0% { opacity: 0; transform: translateX(-100px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInFromRight {
          0% { opacity: 0; transform: translateX(100px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes zoomOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }

        @keyframes buttonPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .logo-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 4s ease-in-out infinite, breathe 6s ease-in-out infinite;
        }

        .typewriter {
          overflow: hidden;
          border-right: 3px solid #3b82f6;
          white-space: nowrap;
          animation: typewriter 3s steps(30) 1s both, blink 1s step-end infinite 4s;
        }

        .floating-icon {
          animation: float 4s ease-in-out infinite;
        }

        .exit-animation {
          animation: zoomOut 1s ease-in-out forwards;
        }

        .button-entrance {
          animation: slideInUp 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .button-pulse {
          animation: buttonPulse 2s infinite;
        }
      `}</style>

      <div className={`fixed inset-0 bg-gradient-to-br from-[#0B0F29] via-[#1A1F3A] to-[#2D3748] text-white flex flex-col items-center justify-center z-50 overflow-hidden ${currentPhase === 5 ? 'exit-animation' : ''}`}>
        
        {/* Background Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
        
        {/* Skip Button */}
        <button 
          onClick={skipIntro}
          className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium z-10"
        >
          Skip Intro →
        </button>

        {/* Mouse Follower Effect */}
        <div 
          className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePos.x - 128,
            top: mousePos.y - 128,
          }}
        />

        {/* Main Content */}
        <div className="text-center z-10 max-w-4xl px-4">
          
          {/* Logo/Name */}
          {currentPhase >= 1 && (
            <div className="mb-8">
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 logo-text ${
                currentPhase >= 1 ? 'animate-[slideInUp_1.5s_cubic-bezier(0.68,-0.55,0.265,1.55)_forwards]' : 'opacity-0'
              }`}>
                Aditya Pratap Singh
              </h1>
              
              {/* Decorative line */}
              <div className={`w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full ${
                currentPhase >= 1 ? 'animate-[slideInFromLeft_1.2s_ease-out_1s_both]' : 'opacity-0'
              }`} />
            </div>
          )}

          {/* Role */}
          {currentPhase >= 2 && (
            <div className="mb-10">
              <p className={`text-xl md:text-2xl lg:text-3xl text-gray-300 font-light typewriter ${
                currentPhase >= 2 ? 'animate-[slideInFromRight_1.5s_ease-out_0.8s_both]' : 'opacity-0'
              }`}>
                Full Stack Web Developer
              </p>
            </div>
          )}

          {/* Skills/Tags */}
          {currentPhase >= 3 && (
            <div className={`flex flex-wrap justify-center gap-4 mb-16 ${
              currentPhase >= 3 ? 'animate-[slideInUp_1.2s_ease-out_0.8s_both]' : 'opacity-0'
            }`}>
              {['React', 'Node.js', 'AWS', 'SQl', 'MongoDB'].map((skill, index) => (
                <span 
                  key={skill}
                  className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-500 transform"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animation: `slideInUp 0.8s ease-out ${0.8 + (index * 0.15)}s both`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Floating Icons */}
          {currentPhase >= 4 && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="floating-icon absolute top-1/4 left-1/4 text-4xl opacity-20">💻</div>
              <div className="floating-icon absolute top-1/3 right-1/4 text-3xl opacity-20" style={{animationDelay: '1s'}}>🚀</div>
              <div className="floating-icon absolute bottom-1/3 left-1/3 text-3xl opacity-20" style={{animationDelay: '2s'}}>⚡</div>
              <div className="floating-icon absolute bottom-1/4 right-1/3 text-4xl opacity-20" style={{animationDelay: '1.5s'}}>🎯</div>
            </div>
          )}

          {/* Get Started Button */}
          {showButton && (
            <div className="button-entrance">
              <button
                onClick={handleGetStarted}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold py-4 px-8 rounded-full shadow-2xl transform transition-all duration-500 hover:scale-105 button-pulse"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>Enter Portfolio</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              
              {/* Auto-advance indicator */}
              <p className="mt-8 text-sm text-gray-400 animate-pulse">
                ✨ Experience will auto-advance in a few moments ✨
              </p>
            </div>
          )}
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/20 to-transparent" />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentPhase > i ? 'bg-blue-500' : 'bg-gray-600'
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingIntro;