const Hero = () => {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden text-center text-white bg-gradient-to-r from-black to-blue-900">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Welcome to <span className="text-blue-600">DevNexum</span>
        </h1>
        <p className="max-w-3xl text-lg font-light md:text-2xl">
          Empowering businesses with innovative software and cutting-edge
          technology. Our team is dedicated to creating solutions that drive success and growth.
        </p>
        <button className="px-6 py-3 mt-6 text-lg font-medium text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600">
          Get Started
        </button>
      </section>
    );
  };
  
  export default Hero;