import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectDetail } from "./components/project-detail.jsx";
import { Contact } from "./pages/contact/Contact";
import Scrolltotop from "./components/scrollup/Scrolltotop";
import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <section className="min-h-screen">
        <div className="relative">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/projectdetail/:id" element={<ProjectDetail />} />
          </Routes>
          <Contact />
          <Scrolltotop />
        </div>
      </section>
    </BrowserRouter>
  </ThemeProvider>
);
