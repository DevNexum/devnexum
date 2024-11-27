import React, { useState, useEffect } from "react";
import logo from "/logo.png";
import icon from "/icon.png";
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaPhoneAlt,
  FaBars,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  // Effect to disable scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: "Home", icon: <FaHome />, link: "#home" },
    { name: "About", icon: <FaInfoCircle />, link: "#about" },
    { name: "Services", icon: <FaCogs />, link: "#services" },
    { name: "Contact", icon: <FaPhoneAlt />, link: "#contact" },
  ];

  const handleClick = (item, link) => {
    setActiveItem(item);
    setIsMenuOpen(false);

    // Get the target section
    const element = document.querySelector(link);
    if (element) {
      // Get the navbar height
      const navbarHeight = document.querySelector(".fixed").offsetHeight;

      // Calculate the target position accounting for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      // Smooth scroll to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => ({
        id: item.name.toLowerCase(),
        element: document.querySelector(item.link),
      }));

      const navbarHeight = document.querySelector(".fixed").offsetHeight;

      let currentSection = "";
      sections.forEach(({ id, element }) => {
        if (element) {
          const sectionTop = element.offsetTop - navbarHeight - 100; // Added offset for better trigger point
          const sectionBottom = sectionTop + element.offsetHeight;

          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = id;
          }
        }
      });

      if (currentSection !== "" && currentSection !== activeItem) {
        setActiveItem(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeItem]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center h-24 bg-gradient-to-r from-black to-blue-900">
      {/* Logo in the Navbar */}
      <div className="flex items-center ml-4 sm:ml-6 md:ml-8 lg:ml-12 xl:ml-16">
        <img
          src={logo}
          alt="Logo"
          className="w-auto h-32 sm:h-36 md:h-40 lg:h-44"
        />
      </div>

      {/* Desktop Navbar */}
      <nav className="absolute hidden transform -translate-x-1/2 sm:block left-1/2">
        <div className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-full shadow-2xl">
          <ul className="flex space-x-6 text-base font-medium text-gray-800">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                onClick={() => handleClick(item.name.toLowerCase(), item.link)}
                className={`relative px-4 py-2 transition-all duration-500 ease-in-out border rounded-full group cursor-pointer ${
                  activeItem === item.name.toLowerCase()
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-transparent border-transparent text-gray-800 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600"
                }`}
                whileHover={{
                  scale: 1.15,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <a
                  href={item.link}
                  className="flex items-center space-x-3"
                  onClick={(e) => e.preventDefault()}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="relative ml-auto sm:hidden">
        {/* Hamburger/Cross Button at Top Right */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`fixed top-4 right-4 text-lg text-white z-[100] focus:outline-none p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300`}
        >
          {isMenuOpen ? (
            <ImCross className="w-4 h-4" />
          ) : (
            <FaBars className="w-5 h-5" />
          )}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Slide-in Menu */}
              <motion.div
                className="fixed top-60 right-0 transform -translate-y-[30%] w-50 h-auto max-h-[70vh] rounded-l-3xl bg-gradient-to-b from-blue-900 to-black shadow-2xl z-[60] flex flex-col py-6 overflow-hidden"
                initial={{ 
                  x: "100%",
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.5,
                  },
                }}
                exit={{
                  x: "100%",
                  opacity: 0,
                  scale: 0.8,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    duration: 0.3,
                  },
                }}
              >
                <div className="relative flex flex-col items-center px-4 space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      className={`w-full text-base font-semibold flex items-center justify-start space-x-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                        activeItem === item.name.toLowerCase()
                          ? "text-white bg-blue-700"
                          : "text-gray-300 hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(item.name.toLowerCase(), item.link);
                      }}
                      initial={{
                        opacity: 0,
                        x: 50,
                        backgroundColor: "transparent",
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 300,
                        },
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(59, 130, 246, 0.3)",
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      whileTap={{
                        scale: 0.95,
                        backgroundColor: "rgba(59, 130, 246, 0.5)",
                      }}
                    >
                      <span className="mr-3 opacity-70">{item.icon}</span>
                      <span className="relative z-10">{item.name}</span>

                      {/* Hover effect layer */}
                      <motion.span
                        className="absolute inset-0 bg-blue-600 opacity-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
