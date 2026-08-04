import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";
import NowPlaying from "../../components/NowPlaying";

/**
 * Add your Hashnode posts here manually.
 * Get post URLs from: https://mikesnrdev.hashnode.dev
 * 
 * Fields:
 *   title       - Post title
 *   brief       - Short description / subtitle
 *   publishedAt - ISO date string e.g. "2025-12-01T00:00:00.000Z"
 *   url         - Full URL to the post on Hashnode
 *   coverImage  - URL of the post cover image (optional)
 */
const POSTS = [
  {
    title: "Level Up or Get Left Behind: Mastering DSA, System Design, and Docker",
    brief:
      "There comes a point in every developer's career where \"making it work\" is no longer enough.",
    publishedAt: "2025-12-01T00:00:00.000Z",
    url: "https://mikesnrdev.hashnode.dev/level-up-or-get-left-behind-mastering-dsa-system-design-and-docker",
    coverImage: null,
  },
  {
    title: "Escaping Tutorial Hell: A Practical Roadmap",
    brief:
      "We've all been there. You just finished a 12-hour course on Udemy, built a fully functional e-commerce site… in a guided environment.",
    publishedAt: "2025-12-01T00:00:00.000Z",
    url: "https://mikesnrdev.hashnode.dev/escaping-tutorial-hell-a-practical-roadmap",
    coverImage: null,
  },
];

const HASHNODE_BLOG_URL = "https://mikesnrdev.hashnode.dev";

const Blog = () => {
  return (
    <section className="section-container pt-28 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Blog
              </h1>
              <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
                Writing about software engineering, products, and my journey in tech.
              </p>
            </div>

            <NowPlaying apiUrl={import.meta.env.VITE_NOW_PLAYING_API_URL ?? "/api/now-playing"} />
          </div>

          {/* Posts */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {POSTS.map((post, index) => (
              <motion.article
                key={post.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col space-y-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
              >
                {/* Cover image */}
                {post.coverImage && (
                  <div className="aspect-video w-full overflow-hidden rounded-xl">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col space-y-3">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                    <FaCalendarAlt className="h-3 w-3" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold leading-snug text-neutral-900 dark:text-white transition-colors group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                    {post.title}
                  </h2>

                  {/* Brief */}
                  <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
                    {post.brief}
                  </p>

                  {/* Read link */}
                  <div className="pt-2">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
                    >
                      Read article <FaExternalLinkAlt className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Link to full Hashnode blog */}
          <div className="flex items-center gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <a
              href={HASHNODE_BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              View all posts on Hashnode <FaExternalLinkAlt className="h-3 w-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
