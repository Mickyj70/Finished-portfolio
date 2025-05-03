import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAnglesUp } from "react-icons/fa6";

export default function Scrolltotop() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {backToTopButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, 10, 0],
            transition: {
              y: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }
            }
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollUp}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary text-white shadow-lg hover:opacity-90 transition-opacity"
          aria-label="Scroll to top"
        >
          <FaAnglesUp className="text-2xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
