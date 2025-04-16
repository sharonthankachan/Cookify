import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import GlobalState from "./API/GLobalContext";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Loader from "./Components/ReusableComponents/Loader";

const Home = lazy(() => import("./Components/Home/Home"));
const RecipeDetails = lazy(() => import("./Components/RecipeDetails"));
const SearchResults = lazy(() => import("./Components/SearchResults"));
const Favorites = lazy(() => import("./Components/Favorites"));

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipedetails/:label" element={<RecipeDetails />} />
            <Route path="/searchresults" element={<SearchResults />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
