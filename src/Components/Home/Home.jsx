import React from "react";
import Hero from "./Hero";
import FeaturedRecipies from "./FeaturedRecipies";

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedRecipies/>
    </div>
  );
};

export default Home;
