import React, { useState, useEffect } from "react";
import "./App.css";
import Hero from "./compnents/Hero";
import Projects from "./compnents/Project";
import About from "./compnents/About";
import Contact from "./compnents/Contact";
import Navbar from "./compnents/Navbar";
import Details from "./compnents/Details";
import LandingIntro from "./compnents/LandingIntro";
import LetudFooter from "./compnents/LetudFooter";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Remove the auto-timer since LandingIntro handles its own timing
  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen w-full text-white">
      {showIntro ? (
        <LandingIntro onFinish={handleIntroFinish} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Details />
          <Contact />
          <LetudFooter/>
        </>
      )}
    </div>
  );
}

export default App;