import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='home'  className="min-h-screen flex items-center justify-center px-4 md:px-10 bg-tra text-white">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Text Side */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build. Launch. Empower with Code.
          </h1>
          <p className="text-lg text-gray-300">
            MERN Stack Developer focused on creating responsive,
            cloud-ready web apps with seamless user experiences.
          </p>

          <div className="flex gap-4">
            {/* Get In Touch Button */}
            <button
              onClick={scrollToContact}
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Get In Touch
            </button>

            {/* Download CV Button */}
            <a
              href="/resume.pdf" // make sure this matches your public folder file name
              download="resume.pdf"
              className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full flex justify-center"
        >
          <img
            src="/your-image.png" // replace with your actual image
            alt="Hero"
            className="w-full max-w-md object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
