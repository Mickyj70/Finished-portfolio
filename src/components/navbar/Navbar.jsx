
import { useState, useEffect } from "react";
import { FaInstagram, FaGithub, FaWhatsapp, FaTimes, FaTwitter } from "react-icons/fa";
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
    <nav
      className={`fixed top-0 left-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-neutral-200 bg-white/80 py-2 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80"
          : "border-transparent bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-base font-semibold tracking-tight"
        >
          <a href="/#" className="hover:opacity-80">
            Mike Dev
          </a>
        </motion.div>
        
        {/* Desktop Menu */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="hidden items-center gap-6 md:flex"
        >
          {["Home", "About", "Works", "Contact"].map((item) => (
            <motion.li 
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm"
            >
              <a 
                href={item === "Home" ? "/#" : `#${item.toLowerCase()}`} 
                onClick={closeMenu}
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </motion.ul>
        
        {/* Social Icons */}
        <div className="hidden items-center gap-3 md:flex">
          <a 
            href="https://github.com/Mickyj70" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href="https://x.com/IAmMicky7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            aria-label="twitter"
          >
            <FaTwitter />
          </a>
          <a 
            href="https://wa.link/hzr6ow" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <ThemeSwitcher />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="rounded-md border border-neutral-200 bg-white p-2 text-xl text-neutral-900 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900 md:hidden"
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
          className="md:hidden border-t border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95"
        >
          <div className="mx-auto max-w-4xl px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {["Home", "About", "Works", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={item === "Home" ? "/#" : `#${item.toLowerCase()}`} 
                    onClick={closeMenu}
                    className="block py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <div className="flex items-center gap-5">
              <a 
                href="https://github.com/Mickyj70" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="http://instagram.com/mike_dev7?igshid=NGVhN2U2NjQ0Yg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://wa.link/hzr6ow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
