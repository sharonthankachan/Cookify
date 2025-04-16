import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "./ReusableComponents/RecipeCard";
import { GlobalContext } from "../API/GLobalContext";
import { IoSearchOutline } from "react-icons/io5";
import search_banner from "../assets/search_banner.jpg";
import { useLocation } from "react-router-dom";
import Loader from "./ReusableComponents/Loader";

const SearchResults = () => {
  const {
    response,
    handleSearch,
    setResponse,
    setLoading,
    loading,
    searchQuery, setSearchQuery
  } = useContext(GlobalContext);

  const location = useLocation()
  const query = location.state?.query
  // const [searchQuery, setSearchQuery] = useState(query)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

useEffect(()=>{
  if (query) {
    setSearchQuery(query)
  }
},[query])

  const handleLoadMore = async (e) => {
    e.preventDefault();
    setLoadMoreLoading(true);
    await handleSearch(searchQuery, response._links?.next?.href).then((data) =>
      setResponse((prev) => ({
        ...data,
        hits: [...prev.hits, ...data.hits],
      }))
    );
    setLoadMoreLoading(false);
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("enter something to search")
      return;
    }
    setLoadMoreLoading(true);
    await handleSearch(searchQuery).then((data) => setResponse(data));
    setLoadMoreLoading(false);
  };

  return (
    <div className="bg-white">
      {loading && <Loader/>}
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
            <div className="md:flex justify-center space-y-3 md:space-y-0 w-full mx-6  mt-9 items-center">
              <input
                type="text"
                placeholder="Search your dish / ingredients here"
                className="px-6 py-4 md:py-6 text-xs md:text-base text-gray-800 md:w-2/4 w-full bg-white outline-1 outline outline-none focus:outline-amber-400 focus:shadow-xl rounded-xl mr-3"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <button
                className="w-full md:w-20 md:h-full py-4 group flex justify-center rounded-xl bg-amber-500 text-white  hover:bg-amber-700 transition duration-300"
                type="submit"
              >
                <IoSearchOutline className="m-auto" />
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
          {response?.hits?.length > 0 && (
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
