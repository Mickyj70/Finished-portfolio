import { useState } from "react";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import { data } from "../../components/project-data/data";
import { AiOutlineEye } from "react-icons/ai";
import PropTypes from 'prop-types';

export const Works = () => {
  const [filter, setFilter] = useState("all");
  
  // Get unique categories from data
  const categories = ["all", ...new Set(data.map(item => item.type.toLowerCase()))];
  
  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? data 
    : data.filter(project => project.type.toLowerCase() === filter);

  return (
    <section id="works" className="section-container py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="section-title mb-4 md:mb-0">Selected Works</h2>
            <p className="text-lg font-medium">(2021-2025)</p>
          </div>
          <div className="w-20 h-1 bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary mb-8"></div>
        </motion.div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-md transition-all ${
                filter === category 
                  ? "bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary text-white" 
                  : "bg-dark-accent text-white dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent hover:bg-opacity-80"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <WorkBox key={project.id} work={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkBox = ({ work }) => {


const [hover, setHover] = useState(false);

WorkBox.propTypes = {
  work: PropTypes.shape({
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired
};

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
      className="group"
    >
      <div 
        className="relative overflow-hidden rounded-lg aspect-video mb-4"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img 
          src={work.img} 
          alt={work.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
          hover ? "opacity-100" : "opacity-0"
        }`}>
          <a
            href={work.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary text-white rounded-full transform transition-transform duration-300 hover:scale-105"
          >
            <AiOutlineEye className="text-xl" />
            <span>VIEW PROJECT</span>
          </a>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{work.title}</h3>
        <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">{work.type}</p>
      </div>
    </motion.div>
  );
};

export default Works;
