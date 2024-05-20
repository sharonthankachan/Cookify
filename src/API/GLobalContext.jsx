// GlobalState.js
import React, { useState } from "react";
import { createContext } from "react";
export const GlobalContext = createContext(null);

const api_id = import.meta.env.VITE_APP_ID
const api_key = import.meta.env.VITE_APP_KEY

const GlobalState = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [favorites, setFavorites] = useState([]);

  const [searchFQuery, setSearchFQuery] = useState("featured");
  const [fResponse, setFResponse] = useState(null);
  const [fLimit, setFLimit] = useState(12);

  const handleSearch = async (e) => {
    try {
      const res = await fetch(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=${api_id}&app_key=${api_key}&from=0&to=${limit}`
      );
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFSearch = async () => {
    try {
      const res = await fetch(
        `https://api.edamam.com/search?q=${searchFQuery}&app_id=${api_id}&app_key=${api_key}&from=0&to=${fLimit}`
      );
      const data = await res.json();
      setFResponse(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("fff", fResponse);

  return (
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
        searchFQuery,
        setSearchFQuery,
        fResponse,
        setFResponse,
        fLimit,
        setFLimit,
        handleFSearch,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
