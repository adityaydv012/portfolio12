import React from "react";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "React", icon: "/skills/react.png" },
  { name: "MySQL", icon: "/skills/sql.png" },
  { name: "PHP", icon: "/skills/php.png" },
  { name: "HTML 5", icon: "/skills/html.png" },
  { name: "Node.js", icon: "/skills/js.png" },
  { name: "AWS", icon: "/skills/aws.png" },
  { name: "MongoDB", icon: "/skills/mongodb.png" },
];

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
    id="skills"
      ref={ref}
      className="relative w-full py-16 b px-4 md:px-12 "
    >
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-0 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slower" />

      <div className="max-w-6xl mx-auto text-white relative z-10">
        <h2 className="text-4xl md:text-5xl font-light mb-12 text-left">
          Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 gap-11 place-items-center">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              className={`w-28 h-28 md:w-24 md:h-32 flex flex-col items-center justify-center bg-[#101a49]/60 rounded-2xl shadow-2xl transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[1deg] hover:shadow-[0_0_20px_5px_rgba(93,160,255,0.4)] ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 md:w-14 md:h-14 mb-2"
              />
              <span className="text-sm md:text-base font-medium">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
