
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const About = () => {
  const frontendSkills = [
    "JavaScript",
    "React",
    "Vue.js",
    "Angular",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "React Native",

  ];

  const backendSkills = [
    "Node.js",
    "Nest.js",
    "Laravel",
    "Django",
    "Express",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "REST APIs",
  ];

  const blockchainSkills = [
    "Solidity",
    "Ethers.js",
    "Smart contracts",
    "Ethereum",
  ];

  return (
    <section id="about" className="section-container">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="section-title">About</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300">
            I build product-focused web apps end‑to‑end: clean UI, fast APIs, and reliable systems. I care about
            performance, clarity, and shipping.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Focus
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                Full‑stack web apps, marketplace/e‑commerce workflows, dashboards, and Web3 integrations when it makes
                sense.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <SkillGroup title="Frontend" skills={frontendSkills} />
              <SkillGroup title="Backend" skills={backendSkills} />
              <SkillGroup title="Web3" skills={blockchainSkills} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillGroup = ({ title, skills }) => {
  return (
    <div className="min-w-0">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {title}
      </h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

SkillGroup.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default About;
