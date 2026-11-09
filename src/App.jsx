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
      <footer className="px-4 pb-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
        If the build fails, try tapping my name three times.
      </footer>
    </>
  );
}

export default App;
