import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectDetail } from "./components/project-detail.jsx";
import { Contact } from "./pages/contact/Contact";
import Scrolltotop from "./components/scrollup/Scrolltotop";
import Navbar from "./components/navbar/Navbar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <section className="mainSection">
      <div className="main">
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
);
