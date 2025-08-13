import React from 'react';
import cubeImage from '/new.png';
import bgWave from '/bg.png';
import './Details.css';
import StatsGrid from './StatsGrid';

const Details = () => {
  return (
   <div>
     <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-10 py-20 bg-transparent ">
      {/* Background Image */}
      <img
        src={bgWave}
        alt="wave background"
        className="absolute top-0 right-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* Text Section */}
      <div className="relative z-10 max-w-[600px] text-center lg:text-left mb-12 lg:mb-0">
        <span className="bg-black text-white px-4 py-1 rounded-full text-sm inline-block mb-6 tracking-wide">
          MODERN WEB <span className="text-blue-400">DEVELOPMENT</span>
        </span>

        <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-4">
          "I thrive on building frontend wonders that scale smoothly,"
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          while sprinkling them with delightful user experiences!"
        </p>

        <div className="flex flex-col sm:flex-row gap-8 text-white text-sm">
          <div>
            <h3 className="font-semibold mb-2">Clean Component Architecture</h3>
            <p className="text-gray-400">
              Build and reuse scalable, responsive components to streamline frontend
              development and maintain consistency.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Optimized Performance Delivery</h3>
            <p className="text-gray-400">
              Deliver blazing-fast web experiences through efficient code, lazy loading,
              and optimized asset handling.
            </p>
          </div>
        </div>
      </div>

      {/* Rotating Cube */}
      <div className="relative z-10">
      <img
  src={cubeImage}
  alt="rotating cube"
  className="w-[250px] h-[250px] rotate-earth"
/>

      </div>
   
    </section>
    <StatsGrid/>
   </div>
    
  );
};

export default Details;
