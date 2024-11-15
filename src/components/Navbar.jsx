import logo from "/logo.png";
import { FaHome, FaInfoCircle, FaCogs, FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");

  // Function to handle menu item clicks
  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex items-center justify-between h-24 overflow-hidden bg-gradient-to-r from-black to-blue-900">
      <div className="flex items-center ml-8 space-x-2">
        <img src={logo} alt="Logo" className="h-40 w-44" />
      </div>

      <nav className="flex justify-start w-full">
      <div className="items-center px-2 py-1 ml-56 bg-white border-2 border-gray-300 rounded-full shadow-xl">
        <ul className="flex space-x-4 text-sm font-semibold text-gray-800">
          {/* Home */}
          <motion.li
            onClick={() => handleClick('home')}
            className={`relative p-2 transition-all duration-300 border-2 rounded-full group ${
              activeItem === 'home'
                ? 'border-blue-600 text-white bg-blue-700'  // Active item style
                : 'border-transparent text-gray-800 hover:border-blue-600 hover:bg-blue-100 hover:text-blue-600'  // Default style
            }`}
            whileHover={{
              scale: 1.1,  // Enlarging the element on hover
              transition: { type: 'spring', stiffness: 500, damping: 25 }
            }}
            whileTap={{
              scale: 0.95,  // Slight shrink on tap
              transition: { type: 'spring', stiffness: 500, damping: 30 }
            }}
          >
            <a href="#home" className="flex items-center space-x-2">
              <FaHome className="text-xl" />
              <span>Home</span>
            </a>
          </motion.li>

          {/* About */}
          <motion.li
            onClick={() => handleClick('about')}
            className={`relative p-2 transition-all duration-300 border-2 rounded-full group ${
              activeItem === 'about'
                ? 'border-blue-600 text-white bg-blue-700'  // Active item style
                : 'border-transparent text-gray-800 hover:border-blue-600 hover:bg-blue-100 hover:text-blue-600'  // Default style
            }`}
            whileHover={{
              scale: 1.1,
              transition: { type: 'spring', stiffness: 500, damping: 25 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 500, damping: 30 }
            }}
          >
            <a href="#about" className="flex items-center space-x-2">
              <FaInfoCircle className="text-xl" />
              <span>About</span>
            </a>
          </motion.li>

          {/* Services */}
          <motion.li
            onClick={() => handleClick('services')}
            className={`relative p-2 transition-all duration-300 border-2 rounded-full group ${
              activeItem === 'services'
                ? 'border-blue-600 text-white bg-blue-700'  // Active item style
                : 'border-transparent text-gray-800 hover:border-blue-600 hover:bg-blue-100 hover:text-blue-600'  // Default style
            }`}
            whileHover={{
              scale: 1.1,
              transition: { type: 'spring', stiffness: 500, damping: 25 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 500, damping: 30 }
            }}
          >
            <a href="#services" className="flex items-center space-x-2">
              <FaCogs className="text-xl" />
              <span>Our Services</span>
            </a>
          </motion.li>

          {/* Contact */}
          <motion.li
            onClick={() => handleClick('contact')}
            className={`relative p-2 transition-all duration-300 border-2 rounded-full group ${
              activeItem === 'contact'
                ? 'border-blue-600 text-white bg-blue-700'  // Active item style
                : 'border-transparent text-gray-800 hover:border-blue-600 hover:bg-blue-100 hover:text-blue-600'  // Default style
            }`}
            whileHover={{
              scale: 1.1,
              transition: { type: 'spring', stiffness: 500, damping: 25 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 500, damping: 30 }
            }}
          >
            <a href="#contact" className="flex items-center space-x-2">
              <FaPhoneAlt className="text-xl" />
              <span>Contact</span>
            </a>
          </motion.li>
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
