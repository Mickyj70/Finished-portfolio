import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { data } from "./project-data/data";
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export const ProjectDetail = () => {
  const { id } = useParams();
  const project = data.find((item) => item.id === parseInt(id));
  
  if (!project) {
    return (
      <div className="section-container flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Find previous and next projects
  const currentIndex = data.findIndex((item) => item.id === parseInt(id));
  const prevProject = currentIndex > 0 ? data[currentIndex - 1] : data[data.length - 1];
  const nextProject = currentIndex < data.length - 1 ? data[currentIndex + 1] : data[0];

  return (
    <section className="section-container pt-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {project.year ? `${project.year}` : null}
                {project.year && project.type ? " · " : null}
                {project.type || null}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
              {project.path && (
                <a 
                  href={project.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FaExternalLinkAlt />
                  <span>Live</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Project Overview
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
              {project.desc ||
                "This is a detailed description of the project, including its purpose, features, and technologies used."}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center justify-between py-2">
                <span className="text-neutral-600 dark:text-neutral-400">Client</span>
                <span className="font-medium">{project.client || "Personal"}</span>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 py-2 dark:border-neutral-800">
                <span className="text-neutral-600 dark:text-neutral-400">Year</span>
                <span className="font-medium">{project.year || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 py-2 dark:border-neutral-800">
                <span className="text-neutral-600 dark:text-neutral-400">Type</span>
                <span className="font-medium">{project.type || "—"}</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <div className="space-y-6">
            <img 
              src={project.img} 
              alt={project.title} 
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            
            {project.detailImage && project.detailImage.map((img) => (
              <img 
                key={img.id}
                src={img.imgUrl} 
                alt={`${project.title} detail ${img.id}`} 
                className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col justify-between gap-6 border-t border-neutral-200 pt-8 dark:border-neutral-800 md:flex-row md:items-center"
        >
          <Link 
            to={`/projectdetail/${prevProject.id}`}
            className="group flex items-center gap-3"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-2" />
            <div>
              <p className="text-sm font-semibold">{prevProject.title}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Previous</p>
            </div>
          </Link>
          
          <Link 
            to={`/projectdetail/${nextProject.id}`}
            className="group flex items-center gap-3 text-right"
          >
            <div>
              <p className="text-sm font-semibold">{nextProject.title}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Next</p>
            </div>
            <FaArrowRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
