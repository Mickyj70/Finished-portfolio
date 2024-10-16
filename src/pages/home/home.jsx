import "./home.css";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Home = () => {
  return (
    //changes

    <div className="home" id="home">
      <div className="home-wrapper">
        <motion.div
          className="large-text"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p>Hey, I&apos;m Michael </p>
          <span>FullStack Developer</span>
        </motion.div>
        <motion.div
          className="home-middle"
          initial={{ y: 70 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <button className="home-button">
            <a href="https://github.com/Mickyj70">
              <FaGithub /> Github
            </a>
          </button>
          <button className="home-button">
            <a href="https://www.linkedin.com/in/michael-joseph-5458b5234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <FaLinkedinIn /> LinkedIn
            </a>
          </button>
          <button className="home-button">
            <a href="mailto:emrex1291@gmail.com">
              <HiOutlineMail /> Email
            </a>
          </button>
        </motion.div>
        <div className="small-text">
          <motion.p
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Hi, I&apos;m Michael an Experienced full-stack developer with over 3
            years of experience in React, Next, Node js, and express js. Ready
            to create innovative web solutions.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Home;
