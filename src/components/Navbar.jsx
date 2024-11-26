import React, { useState } from "react";
import logo from "/logo.png";
import { FaHome, FaInfoCircle, FaCogs, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [isHovered, setIsHovered] = useState(false); // To track hover state for container

  const menuItems = [
    { name: "Home", icon: <FaHome />, link: "#home" },
    { name: "About", icon: <FaInfoCircle />, link: "#about" },
    { name: "Services", icon: <FaCogs />, link: "#services" },
    { name: "Contact", icon: <FaPhoneAlt />, link: "#contact" },
  ];

  const handleClick = (item, link) => {
    setActiveItem(item);

    // Smooth scroll to the section
    const element = document.querySelector(link);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle mouse hover and touch events for container expansion
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = () => setIsHovered(false);

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
      <nav className="absolute hidden transform -translate-x-1/2 sm:block sm:left-1/2">
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
                  transition: { type: "spring", stiffness: 300, damping: 30 },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <a
                  href={item.link}
                  className="flex items-center space-x-2"
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

      {/* Mobile Menu (Only visible on mobile screens) */}

      <div
      className="fixed left-0 z-50 flex flex-col items-center px-2 py-4 space-y-4 transform -translate-y-1/2 bg-gray-900 rounded-r-lg shadow-lg sm:hidden top-1/2"
      onMouseEnter={handleMouseEnter} // Trigger expansion on mouse enter
      onMouseLeave={handleMouseLeave} // Reset when mouse leaves
      onTouchStart={handleTouchStart} // Handle mobile touch
      onTouchEnd={handleTouchEnd} // Reset when touch ends
    >
      <motion.div
        className="flex flex-col items-center p-4 space-y-4"
        animate={{
          width: isHovered ? 200 : 48, // Expand width when hovered or touched
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(item.name.toLowerCase(), item.link)}
            className={`relative flex items-center justify-start w-12 h-12 p-2 text-gray-300 rounded-l-full cursor-pointer transition-all duration-300 ${
              activeItem === item.name.toLowerCase()
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-800"
            }`}
          >
            <div className="text-xl">{item.icon}</div>

            {/* Menu name visibility */}
            <motion.span
              className="ml-4 overflow-hidden text-sm whitespace-nowrap"
              animate={{
                opacity: isHovered ? 1 : 0, // Fade in when hovered/touched
                width: isHovered ? "auto" : 0, // Expand width to show the name
              }}
              transition={{
                opacity: { duration: 0.3 },
                width: { duration: 0.3 },
              }}
            >
              {item.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>

    </div>
  );
};

export default Navbar;
