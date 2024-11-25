import { motion } from "framer-motion";

const Hero = () => {
  // Framer Motion Variants for Animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonHover = {
    scale: 1.1,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const backgroundVariants = {
    default: { backgroundPosition: "50% 50%" },
    animate: { backgroundPosition: ["45% 45%", "55% 55%", "50% 50%"], transition: { duration: 10, repeat: Infinity, ease: "linear" } },
  };

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden text-center text-white bg-gradient-to-r from-black to-blue-900"
      variants={backgroundVariants}
      initial="default"
      animate="animate"
    >
      {/* Container Animation */}
      <motion.div
        className="flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Title */}
        <motion.h1
          className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl"
          variants={textVariants}
        >
          Welcome to <span className="text-blue-600">DevNexum</span>
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          className="max-w-3xl text-lg font-light md:text-2xl lg:text-3xl"
          variants={textVariants}
        >
          Empowering businesses with innovative software and cutting-edge
          technology. Our team is dedicated to creating solutions that drive
          success and growth.
        </motion.p>

        {/* Animated Button with Hover Effect */}
        <motion.button
          className="px-6 py-3 mt-6 text-lg font-medium text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600 sm:text-xl lg:text-2xl"
          whileHover={buttonHover}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth) * 100;
          const y = (clientY / window.innerHeight) * 100;
          e.currentTarget.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(29,78,216,0.5), transparent 80%)`;
        }}
      />
    </motion.section>
  );
};

export default Hero;
