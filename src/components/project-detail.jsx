import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { data } from "./project-data/data";
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./project-detail.css";

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
    <section className="section-container py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-0">{project.title}</h1>
            <div className="flex gap-4">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary transition-colors border-b border-dark-primary dark:border-dark-primary dim:border-dim-primary light:border-light-primary"
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
                  className="flex items-center gap-2 text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary hover:text-dark-primary dark:hover:text-dark-primary dim:hover:text-dim-primary light:hover:text-light-primary transition-colors border-b border-dark-primary dark:border-dark-primary dim:border-dim-primary light:border-light-primary"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-semibold mb-4 text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">
              Project Overview
            </h2>
            <p className="text-lg mb-6">
              {project.description || "This is a detailed description of the project, including its purpose, features, and technologies used."}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-dark-secondary dark:border-dark-secondary dim:border-dim-secondary light:border-light-secondary border-opacity-30">
                <span className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">Client</span>
                <span>{project.client || "Personal Project"}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-dark-secondary dark:border-dark-secondary dim:border-dim-secondary light:border-light-secondary border-opacity-30">
                <span className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">Year</span>
                <span>{project.year || "2023"}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">Type</span>
                <span>{project.type}</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="space-y-8">
            <img 
              src={project.img} 
              alt={project.title} 
              className="w-full rounded-lg shadow-lg"
            />
            
            {project.additionalImages && project.additionalImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${project.title} - Image ${index + 2}`} 
                className="w-full rounded-lg shadow-lg"
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <Link 
            to={`/projectdetail/${prevProject.id}`}
            className="flex items-center gap-2 group mb-4 md:mb-0"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-2" />
            <div>
              <p className="text-xl font-semibold">{prevProject.title}</p>
              <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">Previous Project</p>
            </div>
          </Link>
          
          <Link 
            to={`/projectdetail/${nextProject.id}`}
            className="flex items-center gap-2 group text-right"
          >
            <div>
              <p className="text-xl font-semibold">{nextProject.title}</p>
              <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">Next Project</p>
            </div>
            <FaArrowRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
