import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [messageEffect, setMessageEffect] = useState('');
  const [typingAnimation, setTypingAnimation] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [celebrationParticles, setCelebrationParticles] = useState([]);
  const canvasRef = useRef(null);
 
  // Unique success messages based on query content
  const getUniqueResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('job') || lowerMessage.includes('hire') || lowerMessage.includes('work')) {
      return {
        title: "🚀 Career Opportunity Detected!",
        message: "I'm excited to discuss potential collaborations!",
        gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
      };
    } else if (lowerMessage.includes('project') || lowerMessage.includes('collaborate')) {
      return {
        title: "💡 Project Collaboration Incoming!",
        message: "Let's build something amazing together!",
        gif: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif"
      };
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return {
        title: "👋 Hello There, Amazing Human!",
        message: "Thanks for reaching out! I'll respond soon.",
        gif: "https://media.giphy.com/media/bcKmIWkUMCjVm/giphy.gif"
      };
    } else if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
      return {
        title: "🌐 Web Development Query!",
        message: "I love web projects! Let's discuss your vision.",
        gif: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
      };
    } else {
      return {
        title: "✨ Message Received Successfully!",
        message: "I'll get back to you with something special!",
        gif: "https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
      };
    }
  };

  // Enhanced celebration effect
  const triggerCelebration = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Math.random(),
      emoji: ['🎉', '✨', '🎊', '💫', '🌟'][Math.floor(Math.random() * 5)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      rotation: Math.random() * 360,
      life: 1,
      delay: i * 100
    }));
    
    setCelebrationParticles(newParticles);
    
    // Clear celebration particles after animation
    setTimeout(() => {
      setCelebrationParticles([]);
    }, 3000);
  };

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Create particle trail
      const newParticle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        life: 1
      };
      
      setParticles(prev => [...prev.slice(-10), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({ ...p, life: p.life - 0.05 })).filter(p => p.life > 0));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  // Dynamic background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const backgroundParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      backgroundParticles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Typing animation effect
    setTypingAnimation(true);
    setTimeout(() => setTypingAnimation(false), 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Add timeout of 5 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 5000);
    });
    
    try {
      const fetchPromise = fetch('http://localhost:5001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);
      const result = await response.json();
  
      if (result.success) {
        // Set the unique response message
        setMessageEffect(getUniqueResponse(formData.message));
        setSent(true);
        setShowMsg(true);
        
        // Trigger celebration animation
        triggerCelebration();
        
        // Clear form after successful submission
        setFormData({ name: '', email: '', message: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowMsg(false);
          setSent(false);
        }, 5000);
        
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.message === 'Request timeout') {
        alert('Request timed out. Please check your connection and try again.');
      } else {
        alert('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes celebrate {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes textShine {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0.3) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotate(180deg);
            opacity: 1;
          }
          70% {
            transform: scale(0.9) rotate(270deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          0% {
            transform: translate(-50%, -100px);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        
        @keyframes particleFloat {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-textShine {
          background: linear-gradient(90deg, #fff 0%, #3b82f6 50%, #fff 100%);
          background-size: 200px 100%;
          animation: textShine 2s infinite;
        }
        
        .typing-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        
        .floating-particle {
          position: fixed;
          pointer-events: none;
          z-index: 10;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%);
        }
        
        .celebration-particle {
          position: fixed;
          pointer-events: none;
          z-index: 1000;
          font-size: 24px;
          animation: particleFloat 3s ease-out forwards;
        }

        .loading-spinner {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .success-message-enter {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>

      <div id='contact' className="bg-[#0b0f29] text-white px-4 py-20 min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        {/* Background Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />
        
        {/* Mouse trail particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="floating-particle"
            style={{
              left: particle.x - 5,
              top: particle.y - 5,
              width: 10,
              height: 10,
              opacity: particle.life
            }}
          />
        ))}

        {/* Celebration particles */}
        {celebrationParticles.map(particle => (
          <div
            key={particle.id}
            className="celebration-particle"
            style={{
              left: particle.x,
              top: particle.y,
              animationDelay: `${particle.delay}ms`
            }}
          >
            {particle.emoji}
          </div>
        ))}

        {/* Enhanced Success Message with improved animation */}
        {showMsg && (
          <div
            className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-white to-blue-50 text-[#0b0f29] px-8 py-6 rounded-2xl shadow-2xl flex items-center gap-6 max-w-lg w-full z-50 border border-blue-200 success-message-enter"
          >
            <div className="relative">
              <img
                src={messageEffect.gif}
                alt="Success animation"
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                ✓
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {messageEffect.title}
              </h4>
              <p className="text-gray-700 leading-relaxed text-sm">
                {messageEffect.message}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
                </div>
                <span className="text-xs text-green-600 font-medium">Message delivered successfully!</span>
              </div>
            </div>
            <button 
              onClick={() => setShowMsg(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
            >
              ×
            </button>
          </div>
        )}

        {/* Header with Enhanced Animation */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extralight flex items-center justify-center gap-4 group">
            <div className="relative">
              <div className="text-5xl group-hover:animate-bounce transition-all duration-300">✉️</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="mt-4 text-gray-400 text-sm animate-pulse">
            ✨ Your message will get a personalized response ✨
          </div>
        </div>

        {/* Enhanced Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div className="relative group">
              <label className="block text-sm mb-1 text-blue-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                className={`w-full bg-transparent border-b border-gray-400 py-3 px-1 focus:outline-none focus:border-blue-400 transition-all placeholder-gray-400 ${typingAnimation ? 'typing-glow' : ''}`}
                required
                disabled={loading}
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
            </div>
            
            <div className="relative group">
              <label className="block text-sm mb-1 text-blue-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email"
                className={`w-full bg-transparent border-b border-gray-400 py-3 px-1 focus:outline-none focus:border-blue-400 transition-all placeholder-gray-400 ${typingAnimation ? 'typing-glow' : ''}`}
                required
                disabled={loading}
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>

          <div className="mb-8 relative group">
            <label className="block text-sm mb-6 text-blue-300">Message</label>
            <textarea
              rows="3"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Don't Be Shy, Write A Sweet Message And Send It Now"
              className={`w-full bg-transparent border-b border-gray-400 py-3 px-1 focus:outline-none focus:border-blue-400 transition-all placeholder-gray-400 resize-none ${typingAnimation ? 'typing-glow' : ''}`}
              required
              disabled={loading}
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
            <div className="mt-2 text-xs text-gray-500">
              💡 Tip: Mention "project", "job", or "collaboration" for a special response!
            </div>
          </div>

          {/* Super Enhanced Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={!formData.name || !formData.email || !formData.message || loading}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold px-12 py-4 rounded-full shadow-2xl focus:outline-none transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className={`relative z-10 flex items-center gap-3 justify-center transition-all duration-500 ${
                sent ? "animate-textShine" : ""
              }`}>
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <span className="animate-spin">🎉</span>
                    Message Delivered Successfully!
                  </>
                ) : (
                  <>
                    <span className="group-hover:animate-bounce">🚀</span>
                    Send It Now
                  </>
                )}
              </span>
              
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>

        {/* Enhanced Footer */}
        <div className="text-center mt-16 max-w-xl relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl rounded-2xl"></div>
          <div className="relative bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Aditya Pratap<br />Singh
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="inline-block animate-bounce mr-2">☕</span>
              1+ year of turning coffee into scalable code — both frontend flair and backend brains.
              <br />
              <br />
              <span className="text-blue-400 font-medium">Code with structure, style, and a splash of sass</span>
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;