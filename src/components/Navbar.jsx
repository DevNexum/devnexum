import React, { useState } from "react";
import logo from "/logo.png";
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

  const menuVariants = {
    closed: {
      clipPath: "circle(0% at 90% 5%)",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    open: {
      clipPath: "circle(60% at 90% 5%)",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const menuItems = [
    { name: "Home", icon: <FaHome />, link: "#home" },
    { name: "About", icon: <FaInfoCircle />, link: "#about" },
    { name: "Services", icon: <FaCogs />, link: "#services" },
    { name: "Contact", icon: <FaPhoneAlt />, link: "#contact" },
  ];

  const handleClick = (item) => {
    setActiveItem(item);
    setIsMenuOpen(false); // Close the menu after clicking
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center h-24 bg-gradient-to-r from-black to-blue-900">
      {/* Logo */}
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
                onClick={() => handleClick(item.name.toLowerCase())}
                className={`relative p-2 transition-all duration-300 border-2 rounded-full group ${
                  activeItem === item.name.toLowerCase()
                    ? "border-blue-600 text-white bg-blue-700" // Active item style
                    : "border-transparent text-gray-800 hover:border-blue-600 hover:bg-blue-100 hover:text-blue-600" // Default style
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
                <a href={item.link} className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hamburger Menu for Mobile */}
      <div className="ml-auto sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mr-4 text-3xl text-white focus:outline-none"
        >
          <FaBars />
        </button>

        {/* Animated Semi-Circle Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 bottom-0 right-0 w-full h-screen text-white bg-gradient-to-r from-blue-900 to-gray-300"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="relative flex flex-col items-center justify-start pt-20 space-y-8">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    onClick={() => handleClick(item.name.toLowerCase())}
                    className="flex items-center space-x-4 text-xl font-semibold transition-all duration-300 cursor-pointer hover:text-blue-600"
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      },
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </div>
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute text-2xl text-blue-700 top-6 right-6"
              >
                <ImCross />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
