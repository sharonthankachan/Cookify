import React, { useContext } from "react";
import { GlobalContext } from "../API/GLobalContext";
import RecipeCard from "./ReusableComponents/RecipeCard";

const Favorites = () => {
  const { favorites } = useContext(GlobalContext);

  return (
    <div className="xl:mx-40 py-16 lg:mx-10 mx-3">
      <h1 className="text-center text-4xl font-bold text-gray-900 mt-8">
        Your Favorites
      </h1>
      <h2 className="text-center mt-3 text-md text-gray-700">
        Items ({favorites.length})
      </h2>
      <div className="mt-8 grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 2xl:grid-cols-4 justify-center flex-wrap">
        {favorites.map((item) => (
          <RecipeCard
            key={item.uri}
            recipeImg={item.image}
            recipeName={item.label}
            mealType={item.mealType}
            cuisineType={item.cuisineType}
            recipe={item} // Pass the entire item object
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
