
import { motion } from "framer-motion";
import { FaCode, FaServer, FaEthereum, FaMobile } from "react-icons/fa";

const About = () => {
  const frontendSkills = [
    "HTML5", "CSS3", "JavaScript", "React.js", "Angular", 
    "Next.js", "Vue.js", "React Native", "Tailwind CSS", 
    "Chakra UI", "Material UI", "WordPress"
  ];

  const backendSkills = [
    "Node.js", "Python (Django)", "Express.js", "PHP", 
    "Laravel", "SQL", "NoSQL", "RESTful APIs"
  ];

  const blockchainSkills = [
    "Solidity", "Web3.js", "Ether.js", "Smart Contracts", 
    "DApps", "Ethereum", "BSC", "Polygon"
  ];

  return (
    <section id="about" className="section-container py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <div className="w-20 h-1 bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Who I Am</h3>
            <p className="text-lg mb-6">
              I&apos;m a versatile developer with expertise spanning web, mobile, and blockchain technologies. 
              My passion lies in creating comprehensive digital solutions that work seamlessly across platforms, 
              from responsive websites to native mobile apps and decentralized blockchain applications.
            </p>
            <p className="text-lg mb-6">
              With a strong foundation in both traditional and emerging technologies, I bridge the gap between 
              web, mobile, and Web3 ecosystems. I specialize in creating unified experiences that leverage the 
              strengths of each platform while maintaining a cohesive product vision. My goal is to build 
              innovative, user-centered applications that solve real-world problems across any device or platform.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            
            <div className="mb-6">
              <h4 className="text-xl font-medium mb-3 text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">
                Frontend Development
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {frontendSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="bg-dark-accent text-white dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent 
                               px-3 py-2 rounded-md text-center text-sm"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-xl font-medium mb-3 text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">
                Backend Development
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {backendSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="bg-dark-accent text-white dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent 
                               px-3 py-2 rounded-md text-center text-sm"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-medium mb-3 text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary">
                Blockchain Development
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {blockchainSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="bg-dark-accent text-white dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent 
                               px-3 py-2 rounded-md text-center text-sm"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">What I Do</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-dark-accent text-white dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent 
                          p-6 rounded-lg text-center">
              <div className="text-4xl mb-4 flex justify-center">
                <FaCode className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Frontend Development</h4>
              <p>
                I craft responsive, interactive user interfaces using modern frameworks like React, Angular, and Vue, 
                with a focus on performance and accessibility.
              </p>
            </div>
            
            <div className="bg-dark-accent text-white dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent 
                          p-6 rounded-lg text-center">
              <div className="text-4xl mb-4 flex justify-center">
                <FaServer className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Backend Development</h4>
              <p>
                I build robust server-side applications with Node.js, Python, and PHP, creating scalable APIs 
                and efficient database solutions.
              </p>
            </div>
            
            <div className="bg-dark-accent text-white dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent 
                          p-6 rounded-lg text-center">
              <div className="text-4xl mb-4 flex justify-center">
                <FaMobile className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Mobile App Development</h4>
              <p>
                I develop cross-platform mobile applications using React Native and Ionic React that deliver 
                native-like experiences on both iOS and Android devices.
              </p>
            </div>
            
            <div className="bg-dark-accent text-white dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent 
                          p-6 rounded-lg text-center">
              <div className="text-4xl mb-4 flex justify-center">
                <FaEthereum className="text-dark-primary dark:text-dark-primary dim:text-dim-primary light:text-light-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Blockchain Development</h4>
              <p>
                I develop smart contracts and decentralized applications on Ethereum, BSC, and Polygon, 
                connecting Web2 and Web3 technologies.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
