import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "michael.o.joseph777@gmail.com";

function buildMailtoLink({ name, email, subject, message }) {
  const body = `From: ${name} <${email}>\n\n${message}`;
  const params = new URLSearchParams({
    subject: subject || "Portfolio contact",
    body,
  });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Portfolio] ${formData.subject}`,
          _replyto: formData.email,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Could not send message. Try email instead.");
      }

      if (typeof data.success !== "undefined") {
        const ok =
          data.success === "true" ||
          data.success === true ||
          data.success === "True";
        if (!ok) {
          throw new Error(data.message || "Could not send message. Try email instead.");
        }
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 8000);
    } catch (err) {
      setSubmitError(
        err.message ||
          "Network error. Opening your mail app — you can send the message manually.",
      );
      window.location.href = buildMailtoLink(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300">
            Have a project in mind or want to discuss a potential collaboration?
            Send a message below (delivered via email) or use the mail link in the sidebar.
          </p>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            First submission? FormSubmit may ask you to confirm{" "}
            <span className="font-mono">{CONTACT_EMAIL}</span> once in your inbox.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-md border border-neutral-200 bg-white p-3 text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold">Email</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-md border border-neutral-200 bg-white p-3 text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold">Phone</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    <a
                      href="tel:+2348063704557"
                      className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      +234 806 370 4557
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-md border border-neutral-200 bg-white p-3 text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold">Location</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Abuja, Nigeria
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Prefer your own client?{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="underline underline-offset-4 hover:text-neutral-800 dark:hover:text-neutral-200"
                >
                  Open email app
                </a>
              </p>
            </div>
          </motion.div>

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
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full resize-none rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 disabled:opacity-70 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send message</span>
                    <FaPaperPlane />
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-300"
                >
                  Thanks — your message was sent. Check your inbox if FormSubmit asks for a
                  one-time confirmation.
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
                >
                  {submitError}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
