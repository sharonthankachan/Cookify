import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "./ReusableComponents/RecipeCard";
import { GlobalContext } from "../API/GLobalContext";
import { IoSearchOutline } from "react-icons/io5";
import search_banner from "../assets/search_banner.jpg";

const SearchResults = () => {
  const {
    response,
    searchQuery,
    setSearchQuery,
    limit,
    setLimit,
    handleSearch,
    setLoading,
    loading,
  } = useContext(GlobalContext);

  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  console.log("response", response);

  useEffect(
    (e) => {
      handleSearch();
    },
    [limit]
  );

  useEffect(() => {
    setLimit(12);
  }, [searchQuery]);

  const handleLoadMore = async (e) => {
    e.preventDefault();
    setLoadMoreLoading(true);
    setLimit(limit + 12);
    await handleSearch();
    setLoadMoreLoading(false);
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleSearch();
    setLoading(false);
  };

  return (
    <div className="bg-white">
      <div className="mt-16 relative">
        <div
          className="bg-cover bg-center relative py-36"
          style={{ backgroundImage: `url(${search_banner})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="text-center text-4xl font-bold text-white relative z-10 mb-7">
            Find Your Favorite Recipes Here !
          </h1>
          <form
            onSubmit={handleSearchClick}
            className="flex justify-center relative z-10"
          >
            <div className="flex mt-9 items-center">
              <input
                type="text"
                placeholder="Search your dish / ingredients here"
                className="px-6 py-5 text-xs w-60 md:w-80 focus:outline outline-gray-600 rounded-xl mr-3"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <button
                className="md:px-5 px-4 py-5  rounded-xl bg-amber-500 text-white  hover:bg-amber-700 transition duration-300"
                type="submit"
              >
                <IoSearchOutline />
              </button>
            </div>
          </form>
        </div>
        {loading && (
          <div className="flex justify-center mt-24 text-4xl">
            <span className="loading loading-dots text-amber-700 loading-lg"></span>
          </div>
        )}

        <div className="xl:mx-40 lg:mx-10 mx-3 relative z-10">
          {response?.hits.length > 0 && (
            <div className="mt-12">
              <h1 className="text-center text-4xl font-bold text-gray-900">
                Search Results
              </h1>
              <h2 className="text-center mt-3 text-md text-gray-700 ">
                Recipes based on "{searchQuery}"
              </h2>
            </div>
          )}
          <div className="mt-8 grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 2xl:grid-cols-4 justify-center flex-wrap">
            {response?.hits.map((item) => (
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
          <div className="flex justify-center">
            {loadMoreLoading ? (
              <div className="flex justify-center text-4xl">
                <span className="loading loading-dots text-amber-700 loading-lg"></span>
              </div>
            ) : (
              response?.hits.length > 0 && (
                <button
                  className="bg-amber-600 my-8 px-4 py-2 text-white rounded-xl text-sm w-52 h-10 hover:bg-amber-500 transition duration-300"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              )
            )}
          </div>
        </div>
        {!searchQuery && (
          <div className="text-center text-xl py-12 text-amber-800 px-6">
            Please Enter Something to Search..
          </div>
        )}
        {response?.hits.length <= 0 && searchQuery && !loading && (
          <div className="text-center text-3xl py-12 text-amber-800">
            No Results Found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
