// App.js

import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeAPI/RecipeCard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeDetails from "./RecipeAPI/RecipeDetails";

import Navbar from "./component/Navbar"; // Import the Navbar component
import Signup from "./Signup";
const App = () => {
  const APP_ID = "b5e8ffaa";
  const APP_KEY = "366c56854db11413d53540a02d074f37";
  const [food_recipes, setfood_recipes] = useState([]);
  const [search_recipe, setSearch_recipe] = useState("");
  const [search_query, setSearch_Query] = useState("chicken");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecipesFunction();
  }, [search_query]);

  const getRecipesFunction = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${search_query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      // Check if data.hits is an array before setting the state
      if (Array.isArray(data.hits)) {
        setfood_recipes(data.hits);
        console.log(data);
      } else {
        // Handle the case where data.hits is not an array
        setError("Unexpected response structure");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSearchFunction = (e) => {
    setSearch_recipe(e.target.value);
  };

  const getSearchFunction = (e) => {
    e.preventDefault();
    setSearch_Query(search_recipe);
    setSearch_recipe("");
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="bg-blue-50 min-h-screen font-sans">
      {/* <header className="bg-blue-500 py-4 text-white">
        <div className="container mx-auto text-center">
          <h1
            className="text-3xl sm:text-4xl  
                                   md:text-5xl lg:text-6xl 
                                   font-extrabold tracking-tight"
          >
            <span className="block">RECIPES</span>
          </h1>
        </div>
      </header> */}
      <Navbar /> {/* Include the Navbar here */}
      <div
        className="container mx-auto mt-8 p-4  
                            sm:px-6 lg:px-8"
      >
        <form
          onSubmit={getSearchFunction}
          className="bg-white p-4 sm:p-6  
                               lg:p-8 rounded-lg shadow-md  
                               flex flex-col sm:flex-row items-center  
                               justify-center space-y-4 sm:space-y-0  
                               sm:space-x-4"
        >
          <div
            className="relative justify-center flex-grow 
                                    w-full sm:w-1/2"
          >
            <input
              type="text"
              name="search"
              value={search_recipe}
              onChange={updateSearchFunction}
              placeholder="Search for recipes..."
              className="w-full py-3 px-4 bg-gray-100  
                                       border border-blue-300 focus:ring-blue-500  
                                       focus:border-blue-500 rounded-full  
                                       text-gray-700 outline-none transition-colors  
                                       duration-200 ease-in-out focus:ring-2  
                                       focus:ring-blue-900 focus:bg-transparent  
                                       focus:shadow-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 focus:ring-2  
                        focus:ring-blue-900 text-white font-semibold py-3 px-6  
                        rounded-full transform hover:scale-105 transition-transform  
                        focus:outline-none focus:ring-offset-2  
                        focus:ring-offset-blue-700"
          >
            Search Recipe
          </button>
        </form>
      </div>
      <div className="container mx-auto mt-8 p-4 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetails open={isDialogOpen} setOpen={setIsDialogOpen} />
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  
                lg:grid-cols-4 gap-4"
        >
          {food_recipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipe.label}
              recipe={recipe.recipe}
              setIsDialogOpen={setIsDialogOpen}
            />
          ))}
        </div>
      </div>
      {isLoading && <p>Loading recipes...</p>}
      {error && <p>Error: {error}</p>}{" "}
    </div>
  );
};

//export default App;
