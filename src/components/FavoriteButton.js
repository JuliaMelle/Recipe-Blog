// FavoriteButton.js
import React from "react";

const FavoriteButton = ({ recipeId, isFavorite, onToggleFavorite }) => {
  const handleClick = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    onToggleFavorite(recipeId);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full ${
        isFavorite ? "bg-red-500" : "bg-gray-300"
      }`}
    >
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  );
};

export default FavoriteButton;
