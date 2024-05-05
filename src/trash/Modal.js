// Modal.js
import React from "react";
import RecipeDetails from "../RecipeDetails";

const Modal = ({ isOpen, onClose, recipeId }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <RecipeDetails id={recipeId} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
