import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom"; // Import the Link component
import "../styles/index.css";
const RecipeCard = ({ recipe, setIsDialogOpen }) => {
  console.log(recipe);
  if (!recipe) {
    return <div>Loading...</div>; // Or return null, or some placeholder content
  }
  // Function to open the dialog

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      {" "}
      <Link
        to={`/recipe/${recipe.label}`} // Assuming recipe has an id property
        onClick={openDialog}
        className="font-semibold  
       "
      >
        <div class="bg-card-color shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform hover:scale-105 w-100 h-100">
          <div className="relative">
            <img
              className="w-full h-48 object-cover  
                               object-center rounded-t-lg"
              src={recipe.image}
              alt={recipe.label}
            />
            <div
              className="absolute top-2 left-2 bg-gradient-to-r from-purple-400 to-blue-500 
                                text-white py-1 px-2 rounded"
            >
              {recipe.dishType[0]}
            </div>
          </div>
          <div className="p-4">
            <h1
              className="text-2xl font-semibold text-gray-800  
                               mb-2 capitalize"
            >
              {recipe.label}
            </h1>
          </div>
        </div>
      </Link>{" "}
    </>
  );
  // console.log(data); // Log the entire data object to understand its structure
};

export default RecipeCard;
