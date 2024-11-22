import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-24">
        <Hero />
      </div>
    </>
  );
}

export default App;
