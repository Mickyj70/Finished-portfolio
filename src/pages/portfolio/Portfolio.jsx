import { useState } from "react";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import { data } from "../../components/project-data/data";
import { FaGithub } from "react-icons/fa";
import PropTypes from "prop-types";

export const Works = () => {
  const [filter, setFilter] = useState("all");
  
  // Get unique categories from data
  const categories = ["all", ...new Set(data.map(item => item.type.toLowerCase()))];
  
  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? data 
    : data.filter(project => project.type.toLowerCase() === filter);

  return (
    <section id="works" className="section-container">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="section-title">Projects</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">(2021–2026)</p>
          </div>
        </motion.div>
        
        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`rounded-md border px-3 py-1.5 text-sm transition ${
                filter === category
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Projects List */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {filteredProjects.map((project) => (
            <WorkBox key={project.id} work={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkBox = ({ work }) => {
  const urlHost = (() => {
    try {
      return new URL(work.path).host.replace(/^www\./, "");
    } catch {
      return work.path;
    }
  })();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
      className="py-6"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <a
              href={work.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold tracking-tight underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 dark:decoration-neutral-700 dark:hover:decoration-neutral-100"
            >
              {work.title}
            </a>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">{urlHost}</span>
          </div>

          {work.desc && (
            <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
              {work.desc}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            {work.year && <span>{work.year}</span>}
            {work.year && work.type && <span aria-hidden="true">·</span>}
            {work.type && <span>{work.type}</span>}
          </div>
        </div>

        {work.github ? (
          <a
            href={work.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            <FaGithub className="text-base" />
            <span>Code</span>
          </a>
        ) : null}
      </div>
    </motion.div>
  );
};

WorkBox.propTypes = {
  work: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    path: PropTypes.string.isRequired,
    desc: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    github: PropTypes.string,
  }).isRequired,
};

export default Works;
