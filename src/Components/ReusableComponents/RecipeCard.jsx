import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../API/GLobalContext";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const RecipeCard = ({
  recipeImg,
  recipeName,
  cuisineType,
  mealType,
  recipe,
}) => {
  const navigate = useNavigate();
  const { loading } = useContext(GlobalContext);
  const [favoriteClick, setFavoriteClick] = useState(false);
  const { favorites, setFavorites } = useContext(GlobalContext);

  const handleNavigate = () => {
    navigate(`/recipedetails/${encodeURIComponent(recipe.label)}`, {
      state: { recipe },
    });
  };

  useEffect(() => {
    const isFavorite = favorites.some(
      (favRecipe) => favRecipe.uri === recipe.uri
    );
    setFavoriteClick(isFavorite);
  }, [favorites, recipe.uri]);

  const handleAddToFavClick = () => {
    if (favoriteClick) {
      setFavorites(
        favorites.filter((favRecipe) => favRecipe.uri !== recipe.uri)
      );
    } else {
      setFavorites([...favorites, recipe]);
    }
    setFavoriteClick(!favoriteClick);
  };

  console.log("favorites", favorites);

  return (
    <>
      {!loading ? (
        <div className="mx-5 my-5 bg-white shadow-lg rounded-lg overflow-hidden hover:cursor-pointer">
          <div className="relative h-64 overflow-hidden ">
            <img
              src={recipeImg}
              alt={recipeName}
              className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-500"
            />
            <div className="absolute bottom-2 right-2 bg-slate-200 w-10 h-10 rounded-full flex items-center justify-center">
              <button onClick={handleAddToFavClick} className="text-2xl text-red-700">
                {favoriteClick ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
            </div>
          </div>
          <div className="py-6 px-3">
            <h2 className="text-md font-light mb-4 text-slate-900 text-center">{recipeName}</h2>
            <div className="flex space-x-2 justify-center mb-6">
              <p className="text-slate-700 text-xs text-center rounded bg-slate-100 py-1 px-2">
                {cuisineType}
              </p>
              <p className="text-slate-700 text-xs text-center rounded bg-slate-100 py-1 px-2">
                {mealType}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="w-7/12 px-5 rounded-3xl outline outline-1 outline-amber-950 bg-white text-gray-700 hover:bg-amber-950 hover:text-white py-3 text-sm font-semibold transition duration-300"
                onClick={handleNavigate}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mx-5 my-5 gap-4 mw-68">
          <div className="skeleton h-72 w-full"></div>
          <div className="skeleton h-4 w-36"></div>
          <div className="flex gap-x-3">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;
