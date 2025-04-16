// GlobalState.js
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Loader from "../Components/ReusableComponents/Loader";

export const GlobalContext = createContext(null);

const api_id = import.meta.env.VITE_APP_ID;
const api_key = import.meta.env.VITE_APP_KEY;

const GlobalState = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [favorites, setFavorites] = useState([]);
  const [fResponse, setFResponse] = useState(null);
  const [fLimit, setFLimit] = useState(12);

  const handleSearch = async (searchQuery, nextPageUrl) => {
    setLoading(true); 
    try {
      const res = await fetch(
        nextPageUrl ||
          `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${api_id}&app_key=${api_key}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("trending").then((data) => setFResponse(data));
  }, []);


  return (
    <div>
      {/* {loading && <Loader/>} */}
    <GlobalContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        handleSearch,
        response,
        setResponse,
        limit,
        setLimit,
        loading,
        setLoading,
        fResponse,
        setFResponse,
        fLimit,
        setFLimit,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
    </div>
  );
};

export default GlobalState;
