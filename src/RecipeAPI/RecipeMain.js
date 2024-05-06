import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeDetails from "./RecipeDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const RecipeMain = ({ isDialogOpen, setIsDialogOpen }) => {
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
      if (Array.isArray(data.hits)) {
        setfood_recipes(data.hits);
        console.log(data);
      } else {
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
  return (
    <div className="bg-blue-50 min-h-screen font-sans">
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
        </Routes>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  
                lg:grid-cols-4 gap-4"
        >
          {food_recipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipe.label}
              recipe={recipe.recipe}
              setOpen={setIsDialogOpen}
            />
          ))}
        </div>
      </div>
      {isLoading && (
        <div class="flex items-center justify-center min-h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {error && <p>Error: {error}</p>}{" "}
    </div>
  );
};

export default RecipeMain;
