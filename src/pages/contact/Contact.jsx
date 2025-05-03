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
    <section id="contact" className="section-container py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="w-20 h-1 bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary mb-8"></div>
          <p className="text-lg max-w-2xl">
            Have a project in mind or want to discuss a potential collaboration? 
            Feel free to reach out using the form below or through my contact details.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                <div className="bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary p-3 rounded-full text-white">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">
                    <a href="mailto:your.email@example.com" className="hover:underline">
                      your.email@example.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary p-3 rounded-full text-white">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">
                    <a href="tel:+1234567890" className="hover:underline">
                      +123 456 7890
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary p-3 rounded-full text-white">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Location</h3>
                  <p className="text-dark-secondary dark:text-dark-secondary dim:text-dim-secondary light:text-light-secondary">
                    Your City, Country
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 rounded-md bg-dark-accent dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent border border-transparent focus:border-dark-primary dark:focus:border-dark-primary dim:focus:border-dim-primary light:focus:border-light-primary focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-md bg-dark-accent dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent border border-transparent focus:border-dark-primary dark:focus:border-dark-primary dim:focus:border-dim-primary light:focus:border-light-primary focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 rounded-md bg-dark-accent dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent border border-transparent focus:border-dark-primary dark:focus:border-dark-primary dim:focus:border-dim-primary light:focus:border-light-primary focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 rounded-md bg-dark-accent dark:bg-dark-accent dim:bg-dim-accent light:bg-light-accent border border-transparent focus:border-dark-primary dark:focus:border-dark-primary dim:focus:border-dim-primary light:focus:border-light-primary focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-dark-primary dark:bg-dark-primary dim:bg-dim-primary light:bg-light-primary text-white rounded-md flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-70"
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
                  className="p-4 bg-green-500 bg-opacity-20 text-green-500 rounded-md"
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
