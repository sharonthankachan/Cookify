import React from "react";
import Loader from "../ReusableComponents/Loader";
import Hero from "./Hero";
import FeaturedRecipies from "./FeaturedRecipies";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <FeaturedRecipies />
    </div>
  );
};

export default Home;