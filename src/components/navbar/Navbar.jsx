
import { useState, useEffect } from "react";
import { FaInstagram, FaGithub, FaWhatsapp, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { motion } from "framer-motion";
import ThemeSwitcher from "../ThemeSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-opacity-90 backdrop-blur-sm shadow-md py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          MIKE <span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">DEV</span>
        </motion.div>
        
        {/* Desktop Menu */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="hidden md:flex space-x-8"
        >
          {["Home", "About", "Works", "Contact"].map((item) => (
            <motion.li 
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <a 
                href={item === "Home" ? "/#" : `#${item.toLowerCase()}`} 
                onClick={closeMenu}
                className="font-medium transition-colors hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary"
              >
                {item}
              </a>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary transition-all group-hover:w-full"></span>
            </motion.li>
          ))}
        </motion.ul>
        
        {/* Social Icons */}
        <div className="hidden md:flex space-x-4">
          <a 
            href="https://github.com/Mickyj70" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href="http://instagram.com/mike_dev7?igshid=NGVhN2U2NjQ0Yg==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://wa.link/hzr6ow" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary transition-colors"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <HiOutlineMenuAlt1 />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-opacity-95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {["Home", "About", "Works", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={item === "Home" ? "/#" : `#${item.toLowerCase()}`} 
                    onClick={closeMenu}
                    className="block py-2 font-medium transition-colors hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex space-x-6 mt-6 pt-4 border-t border-gray-700">
              <a 
                href="https://github.com/Mickyj70" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="http://instagram.com/mike_dev7?igshid=NGVhN2U2NjQ0Yg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://wa.link/hzr6ow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Theme Switcher */}
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
