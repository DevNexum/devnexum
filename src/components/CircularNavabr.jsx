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
      const navbarHeight = document.querySelector('.fixed').offsetHeight;
      
      // Calculate the target position accounting for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      // Smooth scroll to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => ({
        id: item.name.toLowerCase(),
        element: document.querySelector(item.link)
      }));

      const navbarHeight = document.querySelector('.fixed').offsetHeight;
      
      let currentSection = '';
      sections.forEach(({ id, element }) => {
        if (element) {
          const sectionTop = element.offsetTop - navbarHeight - 100; // Added offset for better trigger point
          const sectionBottom = sectionTop + element.offsetHeight;
          
          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = id;
          }
        }
      });

      if (currentSection !== '' && currentSection !== activeItem) {
        setActiveItem(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        <div className="flex items-center px-4 py-2 bg-white border-2 border-gray-300 rounded-full shadow-xl">
          <ul className="flex space-x-4 text-sm font-semibold text-gray-800">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                onClick={() => handleClick(item.name.toLowerCase(), item.link)}
                className={`relative p-2 transition-all duration-300 border-2 rounded-full group ${
                  activeItem === item.name.toLowerCase()
                    ? "border-blue-600 text-white bg-blue-700"
                    : "border-transparent text-gray-800 hover:border-blue-600 hover:bg-blue-100 hover:text-blue-600"
                }`}
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 500, damping: 25 },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 500, damping: 30 },
                }}
              >
                <a href={item.link} className="flex items-center space-x-2" onClick={(e) => e.preventDefault()}>
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
              <motion.div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />

              <motion.div
                className="fixed inset-0 flex items-center justify-center text-white z-[52]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div
                  className="relative flex items-center justify-center rounded-full shadow-lg bg-gradient-to-r from-blue-900 to-black"
                  style={{
                    width: "min(80vw, 400px)",
                    height: "min(80vw, 400px)",
                  }}
                >
                  <img
                    src={icon}
                    alt="icon"
                    className="absolute w-20 h-20 rounded-full shadow-lg mix-blend-lighten"
                  />

                  {menuItems.map((item, index) => {
                    const angle = (index * 2 * Math.PI) / menuItems.length;
                    const radius = "calc(min(80vw, 400px) / 2 - 50px)";
                    const x = `calc(50% + (${radius} * ${Math.cos(angle)}))`;
                    const y = `calc(50% - (${radius} * ${Math.sin(angle)}))`;
                    return (
                      <motion.a
                        key={index}
                        href={item.link}
                        className="absolute text-base font-semibold cursor-pointer hover:text-blue-600"
                        style={{
                          left: x,
                          top: y,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(item.name.toLowerCase(), item.link);
                        }}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                      </motion.a>
                    );
                  })}
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