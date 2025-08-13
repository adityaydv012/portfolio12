import React from 'react';
import './StatsGrid.css';
import { FaImage } from 'react-icons/fa';

const cardData = [
    {
      title: 'Graduation',
      description: `Bachelor of Science in Computer Science
  Integral University, Lucknow
  Duration: August 2021 – June 2024
  CGPA: 6.7`,
      image: '/graduation.jpg',
    },
    {
      title: 'Academic Qualifications',
      description: `Senior Secondary Education (Class XII)
  Seth M.R. Jaipuria School, Lucknow
  Stream: PCM • Year: 2021 • Score: 87%`,
      image: '/12th.JPG',
    },
    {
      title: 'Academic Qualifications',
      description: `Secondary Education (Class X)
  Delhi Public School, Lucknow
  Year: 2019 • Score: 81%`,
      image: '/10th.jpg',
    },
    {
      title: 'Certification Course',
      description: `Full Stack Web Development Program
  Make Career Academy • MERN Stack • 2024`,
      image: '/images/fullstack.png',
    },
    {
      title: 'Professional Experience',
      description: `Full Stack Developer at VirtuGrow Digital
  From Aug 2024 • Now Team Lead`,
      image: '/images/experience.png',
    },
  ];
  
  

const StatsGrid = () => {
  return (
    <div className="w-full bg-transparent py-20 px-4 text-white">
      <h2 className="text-4xl sm:text-5xl font-semibold text-center split-text">
        <span className="block">Path to Expertise</span>
        <span className="block text-blue-400">Built on Solid Foundations</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-[#13183c] p-6 rounded-xl shadow-lg border border-[#1e244d] hover:scale-105 transition-all duration-500"
          >
            <div className="flex items-center justify-center mb-4 text-blue-400 text-3xl">
              <FaImage />
            </div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-sm text-gray-300 whitespace-pre-line">{card.description}</p>

            {card.image && (
 <div className="mt-6 border-t border-[#2a3159] pt-4 text-sm text-blue-400 font-medium">
 {card.image && (
   <a
     href={card.image}
     target="_blank"
     rel="noopener noreferrer"
     className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
   >
     View Document
   </a>
 )}
</div>

)}

          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
