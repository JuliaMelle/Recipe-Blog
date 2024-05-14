import React, { useState } from "react";
import { Link } from "react-router-dom";
import GourmetDetails from "./GourmetDetails";

const GourmetCard = ({ recipe, profileData, deleteRecipeItem }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State variable to manage dialog open/close

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  if (!recipe) {
    return <div>Loading...</div>; // Or return null, or some placeholder content
  }

  return (
    <div style={{ overflow: "hidden" }}>
      {" "}
      <div
        class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform hover:scale-105 w-100 h-100"
        onClick={openDialog} // Call openDialog function on click
      >
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
            style={{ fontWeight: "bolder" }}
          >
            {recipe.dishType}
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
      <div style={{ position: "absolute", zIndex: "9999" }}>
        {isDialogOpen && (
          <GourmetDetails
            closeDialog={closeDialog}
            recipez={recipe}
            profileData={profileData}
            deleteRecipeItem={deleteRecipeItem}
          />
        )}{" "}
        {/* Pass closeDialog function as prop to GourmetDetails */}
      </div>
    </div>
  );
  // console.log(data); // Log the entire data object to understand its structure
};

export default GourmetCard;
