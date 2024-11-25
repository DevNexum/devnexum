import React, { useState, useEffect } from "react";
import logo from "/logo.png";
import icon from "/icon.png";
import { FaHome, FaInfoCircle, FaCogs, FaPhoneAlt, FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  // Effect to disable scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Clean up when component unmounts or menu closes
    };
  }, [isMenuOpen]);

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
      <div className="relative ml-auto sm:hidden">
        {/* Cross Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`fixed top-4 right-4 text-3xl text-white z-[100] focus:outline-none`}
        >
          {isMenuOpen ? <ImCross /> : <FaBars />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Background Blur */}
              <motion.div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />

              {/* Animated Full Circular Menu */}
              <motion.div
                className="fixed inset-0 flex items-center justify-center text-white z-[52]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Full Circular Container */}
                <div
                  className="relative flex items-center justify-center bg-blue-900 rounded-full shadow-lg"
                  style={{
                    width: "min(80vw, 400px)",
                    height: "min(80vw, 400px)",
                  }}
                >
                  {/* Center Logo */}
                  <img
                    src={icon}
                    alt="icon"
                    className="absolute w-20 h-20 bg-white rounded-full shadow-lg"
                  />

                  {/* Menu items in circular arrangement */}
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
                        onClick={() => handleClick(item.name.toLowerCase())}
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
