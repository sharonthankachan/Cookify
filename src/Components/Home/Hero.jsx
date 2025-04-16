import React, { useContext, useState } from "react";
import bg_img from "../../assets/bg_1.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { GlobalContext } from "../../API/GLobalContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const {
    searchQuery,
    setSearchQuery,
    setResponse,
    handleSearch,
    loading,
    setLoading,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const searchHandler = async (e) => {
    e.preventDefault();
    // setSearchQuery(query);
    if (query.trim() === "") {
      return;
    }
    setLoading(true);
    await handleSearch(query).then((data) => setResponse(data));
    navigate("/searchresults", { state: { query: query } });
    setLoading(false);
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg_img})` }}
        className="md:mt-16 mt-10 bg-cover bg-white bg-center w-full h-full py-8"
      >
        <div className="xl:mx-36 mx-6 lg:mx-10">
          <h1 className="mt-16 lg:text-6xl md:text-5xl text-4xl capitalize lg:leading-[5rem] md:leading-[3.5rem] leading-snug font-semibold text-amber-950 md:w-7/12">
            Learn Cooking in a Simple Way
          </h1>
          <h2 className="mt-9 text-lg leading-7 text-amber-950 md:w-6/12">
            Over 2 Million+ recipes around the world, search your required dish
            . Start cooking now !
          </h2>
          <form onSubmit={searchHandler}>
            <div className="flex mt-9 mb-9 items-center">
              <input
                type="text"
                placeholder="Search your dish/ingredients here"
                className="px-6 py-5 text-xs text-gray-800 md:w-80 w-52 bg-white outline-1 outline outline-none focus:outline-amber-400 focus:shadow-xl rounded-xl mr-3"
                // value={searchQuery}
                onChange={(e) => {
                  setQuery(e.target.value);
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
      </div>
    </>
  );
};

export default Hero;
