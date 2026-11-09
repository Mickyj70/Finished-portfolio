import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ProjectDetail } from "./components/project-detail.jsx";
import Blog from "./pages/blog/Blog";
import Scrolltotop from "./components/scrollup/Scrolltotop";
import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "./context/ThemeProvider";
import "./App.css";

function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <RouteScroll />
      <section className="min-h-screen">
        <div className="relative">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projectdetail/:id" element={<ProjectDetail />} />
          </Routes>
          <Scrolltotop />
        </div>
      </section>
    </BrowserRouter>
  </ThemeProvider>
);
