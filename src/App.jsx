import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Layout/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeDetails from "./Components/RecipeDetails";
import GlobalState from "./API/GLobalContext";
import SearchResults from "./Components/SearchResults";
import Favorites from "./Components/Favorites";
import Footer from "./Components/Layout/Footer";

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipedetails/:label" element={<RecipeDetails />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/favorites" element={<Favorites/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
