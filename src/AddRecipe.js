import React, { useEffect, useState } from "react";
import app from "./FirebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import backgroundImage from "./assets/bg.jpg"; // adjust the path to your image

function AddRecipe() {
  const [inputLabel, setInputLabel] = useState("");
  const [inputDishType, setInputDishType] = useState("");
  const [inputImage, setInputImage] = useState("");

  const [fields, setFields] = useState([{ ingredient: "", quantity: "" }]);
  const [tempRecipeData, setTempRecipeData] = useState([]);

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "communityRecipes"));
    set(newDocRef, {
      label: inputLabel,
      dishType: inputDishType,
      image: inputImage,
      ingredientLines: fields,
      creator: "mah name chef",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTempRecipeData([...tempRecipeData, ...fields]);
    setFields([{ ingredient: "", quantity: "" }]);
    setInputLabel("");
    setInputDishType("");
    setInputImage("");
    saveData();
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
    <div
      className="relative p-6 flex justify-center items-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-md ">
        <h2 className="text-xl font-bold mb-4 text-center">Add a New Recipe</h2>
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
              Dish Image Link:
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
              <label
                htmlFor="inputImg"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Ingredient:
              </label>

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

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={handleAddFields}
              className="bg-custom-coffee text-white px-4 py-2 rounded-md hover:bg-custom-brown"
            >
              Add More Ingredients
            </button>
            <button
              onClick={handleSubmit}
              className="bg-custom-purple text-white px-4 py-2 rounded-md hover:bg-custom-brown"
            >
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
