import "./App.css";


import Home from "./pages/home/home";
import About from "./pages/about/about";
import { Works } from "./pages/portfolio/Portfolio";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  return (
    <>
      <ThemeSwitcher />
      <Home />
      <About />
      <Works />
    </>
  );
}

export default App;
