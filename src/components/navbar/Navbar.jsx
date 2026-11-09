import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import BugGame from "../BugGame";
import ThemeSwitcher from "../ThemeSwitcher";

const menuItems = [
  { name: "Home", target: "#home" },
  { name: "About", target: "#about" },
  { name: "Works", target: "#works" },
  { name: "Blog", target: "/blog" },
  { name: "Contact", target: "#contact" },
];

function NavbarLink({ target, ...props }) {
  const { pathname } = useLocation();

  if (!target.startsWith("#")) return <Link to={target} {...props} />;
  if (pathname === "/") return <a href={target} {...props} />;
  return <Link to={`/${target}`} {...props} />;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const logoTaps = useRef([]);

  function handleLogoClick(event) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    closeMenu();
    const now = Date.now();
    logoTaps.current = [...logoTaps.current.filter((time) => now - time < 1800), now];
    if (logoTaps.current.length === 3) {
      event.preventDefault();
      logoTaps.current = [];
      setGameOpen(true);
    }
  }
  
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
          <NavbarLink target="#home" onClick={handleLogoClick} className="hover:opacity-80">
            Mike Dev
          </NavbarLink>
        </motion.div>
        
        {/* Desktop Menu */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="hidden items-center gap-6 md:flex"
        >
          {menuItems.map((item) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm"
            >
              <NavbarLink target={item.target} onClick={closeMenu} className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                {item.name}
              </NavbarLink>
            </motion.li>
          ))}
        </motion.ul>
        
        <div className="hidden md:block">
          <ThemeSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="rounded-md border border-neutral-200 bg-white p-2 text-xl text-neutral-900 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
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
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavbarLink target={item.target} onClick={closeMenu} className="block py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100">
                    {item.name}
                  </NavbarLink>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <ThemeSwitcher />
            </div>
          </div>
        </motion.div>
      )}
      {gameOpen && <BugGame onClose={() => setGameOpen(false)} />}
    </nav>
  );
};

export default Navbar;
