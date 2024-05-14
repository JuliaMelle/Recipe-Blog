import React, { useEffect, useState } from "react";
import app from "./FirebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";

function AddRecipe({ profileData }) {
  const [inputLabel, setInputLabel] = useState("");
  const [inputDishType, setInputDishType] = useState("");
  const [inputImage, setInputImage] = useState("");

  const [fields, setFields] = useState([{ ingredient: "", quantity: "" }]);
  const [tempRecipeData, setTempRecipeData] = useState([]);

  const saveData = async () => {
    //console.log(inputDishType);
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "communityRecipes"));
    set(newDocRef, {
      label: inputLabel,
      dishType: inputDishType,
      image: inputImage,
      ingredientLines: fields,
      creator: profileData.username,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show a confirmation dialog
    const userResponse = window.confirm(
      "Are you sure you want to save the recipe? You will never be able to change it after submission."
    );

    // If the user clicks "OK", save the recipe
    if (userResponse) {
      setTempRecipeData([...tempRecipeData, ...fields]);
      setFields([{ ingredient: "", quantity: "" }]);
      setInputLabel("");
      setInputDishType("");
      setInputImage("");
      saveData();
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...fields];
    if (event.target.name === "ingredient") {
      values[index].ingredient = event.target.value;
    } else {
      values[index].quantity = event.target.value;
    }
    setFields(values);
  };

  const handleAddFields = () => {
    setFields([...fields, { ingredient: "", quantity: "" }]);
  };

  return (
    <div className="p-6">
      <form className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="inputLbl"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Dish Name:
          </label>
          <input
            type="text"
            id="inputLbl"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="inputDT"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Dish Type:
          </label>
          <input
            type="text"
            id="inputDT"
            value={inputDishType}
            onChange={(e) => setInputDishType(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="inputImg"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Dish Image:
          </label>
          <input
            type="text"
            id="inputImg"
            value={inputImage}
            onChange={(e) => setInputImage(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {fields.map((field, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              name="ingredient"
              value={field.ingredient}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Ingredient"
              className="border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="quantity"
              value={field.quantity}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Quantity"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => handleAddFields()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add More Ingredients
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
