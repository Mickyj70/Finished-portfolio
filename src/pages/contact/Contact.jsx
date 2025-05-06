import "./Contact.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 section-container">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="mb-8 w-20 h-1 bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary"></div>
          <p className="max-w-2xl text-lg">
            Have a project in mind or want to discuss a potential collaboration? 
            Feel free to reach out using the form below or through my contact details.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 text-white rounded-full bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Email</h3>
                  <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">
                    <a href="mailto:your.email@example.com" className="hover:underline">
                      michael.joseph77@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 text-white rounded-full bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Phone</h3>
                  <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">
                    <a href="tel:+2348063704557" className="hover:underline">
                      +234 806 370 4557	
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 text-white rounded-full bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Location</h3>
                  <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">
                    Abuja, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 w-full rounded-md border border-transparent transition-colors bg-dark-accent dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent focus:border-dark-primary dark:focus:border-dark-primary dim:focus:border-dim-primary light:focus:border-light-primary focus:outline-none text-dark-text dark:text-dark-text dim:text-dim-text light:text-light-text"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 w-full rounded-md border border-transparent transition-colors bg-dark-accent dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent focus:border-dark-primary dark:focus:border-dark-primary dim:focus:border-dim-primary light:focus:border-light-primary focus:outline-none text-dark-text dark:text-dark-text dim:text-dim-text light:text-light-text"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 w-full rounded-md border border-transparent transition-colors bg-dark-accent dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent focus:border-dark-primary dark:focus:border-dark-primary dim:focus:border-dim-primary light:focus:border-light-primary focus:outline-none text-dark-text dark:text-dark-text dim:text-dim-text light:text-light-text"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="px-4 py-3 w-full rounded-md border border-transparent transition-colors resize-none bg-dark-accent dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent focus:border-dark-primary dark:focus:border-dark-primary dim:focus:border-dim-primary light:focus:border-light-primary focus:outline-none text-dark-text dark:text-dark-text dim:text-dim-text light:text-light-text"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex justify-center items-center px-6 py-3 space-x-2 text-white rounded-md transition-opacity bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary hover:opacity-90 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane />
                  </>
                )}
              </button>
              
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 text-green-500 bg-green-500 bg-opacity-20 rounded-md"
                >
                  Your message has been sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
