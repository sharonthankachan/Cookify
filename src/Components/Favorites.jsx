import React, { useContext } from "react";
import { GlobalContext } from "../API/GLobalContext";
import RecipeCard from "./ReusableComponents/RecipeCard";
import emptycart from '../assets/emptycart2.png'

const Favorites = () => {
  const { favorites } = useContext(GlobalContext);

  return (
    <div className="xl:mx-40 pt-16 bg-white lg:mx-10 mx-3">
      <h1 className="text-center text-4xl font-bold text-gray-900 mt-8">
        Your Favorites
      </h1>
       <h2 className="text-center mt-3 text-md text-gray-700">
        Items ({favorites.length})
      </h2>
      {favorites.length > 0 ? (
        <div className="mt-8 grid lg:grid-cols-3 pb-8 sm:grid-cols-2 grid-col-1 2xl:grid-cols-4 justify-center flex-wrap">
          {favorites.map((item) => (
            <RecipeCard
              key={item.uri}
              recipeImg={item.image}
              recipeName={item.label}
              mealType={item.mealType}
              cuisineType={item.cuisineType}
              recipe={item}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-72 py-12 justify-center items-center">
          <div className="my-10">
          <div className="flex justify-center"><img className="w-32" src={emptycart} alt="Cart Empty Image" /></div>
          <p className="text-xl text-center mt-4 font-semibold text-gray-800">
            No Favorites Yet
          </p>
          <p className="font-light text-center text-sm text-gray-800 mt-1">Add your favorite dishes and they will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
