import "./App.css";


import Home from "./pages/home/home";
import About from "./pages/about/about";
import { Works } from "./pages/portfolio/Portfolio";
import { Contact } from "./pages/contact/Contact";

function App() {
  return (
    <>
      <Home />
      <About />
      <Works />
      <Contact />
    </>
  );
}

export default App;
