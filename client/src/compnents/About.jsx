// src/pages/about.jsx

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Skills from './Skills';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Animates again on scroll up/down
    threshold: 0.2,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);




  
  return (
<div id='about'>
<div className="relative mb-40 bg-transparent border-y border-black py-6 px-4 md:px-10 rounded-md shadow-md overflow-hidden">


{/* Highlight glow corners */}
<div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
<div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

{/* Tech Icons Row */}
<div className="flex flex-wrap justify-center items-center gap-10 relative z-10">
  <div className="flex items-center gap-2">
    <img src="/react.png" alt="React" className="w-6 h-6" />
    <span className="text-gray-300 font-medium">React</span>
  </div>
  <div className="flex items-center gap-2">
    <img src="/js.png" alt="JavaScript" className="w-6 h-6" />
   <span className="text-gray-300 font-medium">Javascript</span>
 </div>
<div className="flex items-center gap-2">
    <img src="/java.png" alt="Java" className="w-6 h-6" />
    <span className="text-gray-300 font-medium">Java</span>
  </div>
  <div className="flex items-center gap-2">
    <img src="/node.png" alt="Node.js" className="w-6 h-6" />
    <span className="text-gray-300 font-medium">Node.js</span>
  </div>
  <div className="flex items-center gap-2">
    <img src="/tailwind.png" alt="Tailwind" className="w-6 h-6" />
    <span className="text-gray-300 font-medium">Tailwind</span>
  </div>
</div> </div>  



<div
      ref={ref}
      className="relative max-w-4xl mx-auto bg-[#101a49]/60 p-8 md:p-12 rounded-xl shadow-xl transition-all duration-1000 ease-in overflow-hidden my-16"
    >
      {/* Glowing Highlights (Top Left and Bottom Right Corners) */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Profile Card */}
        <div
          className={`bg-[#0b1233] border border-purple-700 rounded-xl p-6 w-full md:w-1/2 shadow-md transform transition-all duration-1000 ease-in ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <img src="/code.png" alt="Code Sample" className="rounded-xl mb-4 w-full" />
          <div className="flex flex-col items-center text-white text-center">
            <img
              src="/your-profile-image.jpg"
              alt="Addity Pratap Singh"
              className="w-16 h-16 rounded-full mb-3"
            />
            <h3 className="text-lg font-bold">Addity Pratap Singh</h3>
            <p className="text-sm">I am a professional full stack developer</p>
            <div className="flex justify-around w-full mt-4 text-sm font-semibold">
              <div>
                <p>Project</p>
                <p className="text-lg">12+</p>
              </div>
              <div>
                <p>Experience</p>
                <p className="text-lg">1 Year</p>
              </div>
              <div>
                <p>Language</p>
                <p className="text-lg">4+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Text */}
        <div
          className={`w-full md:w-1/2 text-white transform transition-all duration-1000 ease-in ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Summary</h2>
          <p className="text-base leading-relaxed text-gray-300">
            A passionate Full Stack Web Developer with expertise in the MERN stack, cloud-based
            architecture (AWS Lambda & API Gateway), and modern UI frameworks like Tailwind CSS.
            Proven track record of building and deploying scalable web applications with secure
            authentication and RESTful APIs. Promoted to Team Lead at VirtuGrow Digital for
            exceptional leadership and delivery on high-impact projects. Strong focus on clean code,
            responsive design, and team collaboration.
          </p>
        </div>
      </div>
    </div>
    <Skills/>
</div>
  );
};

export default About;





  