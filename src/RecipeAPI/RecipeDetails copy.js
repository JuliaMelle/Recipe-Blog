import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); // Extract the id from the URL
  const [recipe, setRecipe] = useState(null);
  const APP_ID = "b5e8ffaa";
  const APP_KEY = "366c56854db11413d53540a02d074f37";
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${id}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch recipe details: ${response.statusText}`
          );
        }
        const data = await response.json();
        // Assuming the API returns the recipe details directly, adjust as necessary
        setRecipe(data.hits[0]); // Assuming the first hit is the desired recipe
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Depend on the id to refetch when it changes

  if (!recipe) {
    return <div>Loading recipe details...</div>;
  }

  return (
    <div>
      <h1>{recipe.recipe.label}</h1>
      <img src={recipe.recipe.image} alt={recipe.recipe.label} />
      <p>Ingredients:</p>
      <ul>
        {recipe.recipe.ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;
