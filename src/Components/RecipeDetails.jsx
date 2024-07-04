import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import search_banner from "../assets/search_banner.jpg";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import { GlobalContext } from "../API/GLobalContext";

const RecipeDetails = () => {
  const location = useLocation();
  const { recipe } = location.state;
  const [favoriteClick, setFavoriteClick] = useState(false);
  const { favorites, setFavorites } = useContext(GlobalContext);

  useEffect(() => {
    const isFavorite = favorites.some((favRecipe) => favRecipe.uri === recipe.uri);
    setFavoriteClick(isFavorite);
  }, [favorites, recipe.uri]);

  const handleAddToFavClick = () => {
    if (favoriteClick) {
      setFavorites(favorites.filter((favRecipe) => favRecipe.uri !== recipe.uri));
    } else {
      setFavorites([...favorites, recipe]);
    }
    setFavoriteClick(!favoriteClick);
  };

  console.log("favorites", favorites);

  return (
    <div className="bg-white min-h-screen">
      <div
        className="relative mt-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black opacity-70"></div>
        <div className="relative z-10 text-center text-white py-20">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light capitalize leading-snug">
            {recipe.label}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-32 mt-12">
        <div className="sm:flex md:justify-center lg:justify-between mb-12 space-y-8 md:space-y-0">
          <div className="md:w-1/2 lg:w-5/12 md:mr-6">
            <img
              className="w-full rounded-xl shadow-lg"
              src={recipe.image}
              alt={recipe.label}
            />
          </div>
          <div className="md:w-1/2 lg:w-6/12 text-center md:text-left">
            <div className="space-y-6 text-gray-800">
              <div className="md:flex justify-center md:justify-start gap-x-16">
                <div>
                  <h2 className="text-lg capitalize font-light">
                    Preparation Time
                  </h2>
                  <p className="mt-1 text-4xl font-extralight">
                    {recipe.totalTime} mins
                  </p>
                </div>
                <div className="mt-5 md:mt-0">
                  <h2 className="text-lg capitalize font-light">
                    Total Calories
                  </h2>
                  <p className="mt-1 text-4xl font-extralight">
                    {parseFloat(recipe.calories).toFixed(2)} cal
                  </p>
                </div>
              </div>
              <div className="flex justify-center text-xs md:justify-start gap-1 flex-wrap mt-6">
                <span className="px-3 py-2 border rounded border-gray-400">
                  {recipe.cuisineType}
                </span>
                <span className="px-3 py-2 border rounded border-gray-400">
                  {recipe.dishType}
                </span>
                <span className="px-3 py-2 border rounded border-gray-400">
                  {recipe.mealType}
                </span>
              </div>
              {recipe.dietLabels.length > 0 && (
                <div className="mt-6 px-6 md:px-0 rounded-lg bg-opacity-60">
                  <h2 className="text-2xl capitalize text-gray-700 font-light">
                    Diet Labels
                  </h2>
                  <ul className="list-inside mt-3 font-light text-gray-700 space-y-1 md:list-disc text-md">
                    {recipe.dietLabels.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                <a
                  className="outline hover:cursor-pointer outline-1 outline-amber-600 bg-amber-600 justify-between hover:bg-amber-700 transition duration-500 text-white px-8 py-3 rounded-lg flex  items-center gap-3 "
                  href={recipe.url}
                  target="_blank"
                >
                  Show Recipe
                  <HiOutlineExternalLink />
                </a>
                <a
                  onClick={handleAddToFavClick}
                  className="outline outline-1 hover:cursor-pointer outline-amber-600 bg-amber-600 justify-between hover:bg-amber-700  transition duration-500 text-white px-8 py-3 rounded-lg flex  items-center gap-3"
                >
                  {favoriteClick?"Remove from Favorites":"Add to Favorites"}
                  {favoriteClick ? <MdFavorite /> : <MdFavoriteBorder />}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex justify-between gap-x-6 space-y-12 md:space-y-0">
          <div className="md:p-8 mb-8 rounded-xl md:w-6/12">
            <h2 className="text-amber-800 underline underline-offset-4 text-3xl font-semibold mb-6">
              Ingredients
            </h2>
            <ul className="space-y-4 list-disc list-inside text-gray-800">
              {recipe.ingredientLines.map((item, index) => (
                <li key={index} className="text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col md:pt-9 md:pb-12 md:w-7/12">
            <div className=" bg-stone-200 md:p-8 p-4 rounded border bg-opacity-60 mb-12">
              <h2 className="text-amber-950 md:text-xl text-2xl  sm:text-center font-medium mb-9">
                Health Labels
              </h2>
              <div className="sm:flex sm:justify-center">
                <ul className="grid lg:grid-cols-4 list-disc list-inside sm:list-none sm:grid-cols-3 grid-cols-1 gap-3 text-gray-950">
                  {recipe.healthLabels.map((item, index) => (
                    <li key={index} className="md:text-xs font-normal">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
