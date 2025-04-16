import RecipeCard from "../ReusableComponents/RecipeCard";
import { useState } from "react";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../API/GLobalContext";
import Loader from "../ReusableComponents/Loader";

const FeaturedRecipies = () => {
  const { loading, setLoading, fResponse, setFResponse, handleSearch } = useContext(GlobalContext);


  const handleLoadMore = async () => {
    setLoading(true);
    await handleSearch("trending", fResponse._links.next.href).then(
      (data) =>
        setFResponse((prev) => ({
          ...data,
          hits: [...prev.hits, ...data.hits],
        }))
    );
    setLoading(false);
  };

  return (
    <div>
      {loading && <Loader/>}
      <div className="xl:mx-40 py-16 lg:mx-10 mx-3">
        <h1 className="text-center text-4xl font-bold text-gray-900">
          Featured Recipies
        </h1>
        <h2 className="text-center mt-3 text-md text-gray-700 ">Recommended</h2>
        <div className="mt-8 grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 2xl:grid-cols-4 justify-center flex-wrap">
          {fResponse?.hits?.map((item) => (
            <RecipeCard
              key={item.recipe.uri}
              recipeImg={item.recipe.image}
              recipeName={item.recipe.label}
              mealType={item.recipe.mealType}
              cuisineType={item.recipe.cuisineType}
              recipe={item.recipe}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          {loading ? (
            <div className="flex justify-center text-4xl">
              <span className="loading loading-dots text-amber-700 loading-lg"></span>
            </div>
          ) : (
            <button
              className="bg-amber-600 px-4 py-2 text-white rounded-xl text-sm w-52 h-10 hover:bg-amber-500 transition duration-300"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipies;
