// import "./home.css";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import NowPlaying from "../../components/NowPlaying";

const Home = () => {
  return (
    <section id="home" className="section-container pt-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Mike
          </h1>

          <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
            Software engineer building full‑stack products across web, mobile, and Web3.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              className="btn-primary"
              href="https://github.com/Mickyj70"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span className="ml-2">GitHub</span>
            </a>
            <a
              className="btn-primary"
              href="https://x.com/IAmMicky7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
              <span className="ml-2">Twitter</span>
            </a>
            <a className="btn-primary" href="mailto:michael.o.joseph777@gmail.com">
              <HiOutlineMail />
              <span className="ml-2">Email</span>
            </a>
          </div>

          {/* Now Playing – polls every 10 s; click to expand album modal */}
          <NowPlaying apiUrl={import.meta.env.VITE_NOW_PLAYING_API_URL ?? "/api/now-playing"} />

          <div className="pt-2">
            <a
              href="#works"
              className="text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              View projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
