import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { data } from "../../components/project-data/data";
import "./Portfolio.css";

export const Works = () => {
  return (
    <>
      <section id="works" className="workSection">
        <div className="workContainer">
          <div className="workHeader">
            <p>SELECTED WORKS</p>
            <p>{"(2021-2025)"}</p>
          </div>

          <div className="workListContainer">
            {data.map((work) => (
              <WorkBox
                key={work.id}
                work={work}
                id={work.id}
                img={work.img}
                title={work.title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const WorkBox = ({ work }) => {
  const [hover, setHover] = useState(false);

  const Mouseenter = () => {
    setHover(true);
  };

  const Mouseleave = () => {
    setHover(false);
  };

  return (
    <motion.div
      key={work.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
      className="workBoxContainer"
    >
      <div
        className="workBox"
        onMouseEnter={Mouseenter}
        onMouseLeave={Mouseleave}
      >
        <img src={work.img} alt={work.title} />
        {hover && (
          <a
            href={work.path}
            target="_blank"
            rel="noopener noreferrer"
            className="view"
          >
            <AiOutlineEye />
            <p>VIEW PROJECT</p>
          </a>
        )}
      </div>

      <div className="workText">
        <p>{work.title}</p>
        <p>{work.type}</p>
      </div>
    </motion.div>
  );
};
