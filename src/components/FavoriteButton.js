// FavoriteButton.js
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const FavoriteButton = ({ recipeId, isFavorite, onToggleFavorite }) => {
  const handleClick = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    onToggleFavorite(recipeId);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full ${
        isFavorite ? "bg-transparent" : "bg-transparent"
      }`}
    >
      {isFavorite ? (
        <FaHeart className="text-red-500 text-2xl" />
      ) : (
        <FaRegHeart className="text-red-500 text-2xl" />
      )}
    </button>
  );
};

export default FavoriteButton;
