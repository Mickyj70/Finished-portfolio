// import "./home.css";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaArrowDown } from "react-icons/fa";
// import { FaGithub, FaLinkedinIn } from "react-icons/fa";
// import { HiOutlineMail } from "react-icons/hi";

const Home = () => {
  return (
    <section id="home" className="section-container flex items-center justify-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Hi, I&apos;m <span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">Mike</span>
          </h1>
          
          <div className="text-2xl md:text-4xl font-bold mb-8 h-16">
            <Typewriter
              options={{
                strings: [
                  "Fullstack Developer",
                  "Mobile App Developer",
                  "Web3 Developer",
                  "Blockchain Enthusiast",
                  "Smart Contract Engineer",
                  "DApp Creator",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto md:mx-0 font-medium">
            I build powerful <span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">end-to-end solutions</span> from 
            responsive frontends to scalable backends, and develop <span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">decentralized applications</span> on 
            blockchain technology.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <a href="#works" className="btn-primary text-lg font-bold px-8 py-4">
              View My Work
            </a>
            <a href="#contact" className="btn-primary text-lg font-bold px-8 py-4">
              Contact Me
            </a>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 text-xl"
          >
            <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary font-medium">
              Specializing in <span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">React</span>,<span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">React Native</span>,
               <span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">Node.js</span>, <span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">Solidity</span>, and <span className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">Web3.js</span>
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-3xl"
        >
          <FaArrowDown className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
