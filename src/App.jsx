import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-24">
        {/* Home Section */}
        <section id="home">
          <Hero />
        </section>
        {/* About Section */}
        <section id="about">
          <About />
        </section>
        {/* Services Section */}
        <section id="services">
          <Services />
        </section>
        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>
      </div>
    </>
  );
}

export default App;
