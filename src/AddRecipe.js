import React, { useEffect, useState } from "react";
import app from "./FirebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import backgroundImage from "./assets/bg.jpg"; // adjust the path to your image
import { CiWarning } from "react-icons/ci";

function AddRecipe({ profileData }) {
  const [inputLabel, setInputLabel] = useState("");
  const [inputDishType, setInputDishType] = useState("");
  const [inputImage, setInputImage] = useState("");

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      creator: profileData.username,
    });
  };
  // Regular expression to match URLs
  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  // Regular expression to match no special characters
  const noSpecialCharsRegex = /^[a-zA-Z0-9\s]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled out
    if (!inputLabel || !inputDishType || !inputImage) {
      setAlertMessage("Please fill out all required fields.");
      setAlertVisible(true);

      return; // Exit the function if any field is empty
    }
    // Check if the image link is a valid URL
    if (!urlRegex.test(inputImage)) {
      setAlertMessage("Please enter a valid URL for the dish image.");
      setAlertVisible(true);

      return; // Exit the function if the URL is invalid
    }
    // Check if all inputs match the no special characters regex
    if (
      !noSpecialCharsRegex.test(inputLabel) ||
      !noSpecialCharsRegex.test(inputDishType)
    ) {
      setAlertMessage(
        "Special characters are not allowed in dish name, dish type, and image link."
      );
      setAlertVisible(true);

      return;
    }
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
  const closeAlert = () => {
    setAlertVisible(false);
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
      {alertVisible && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="min-h-screen pt-32 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start ">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex justify-center flex-row	">
                    <CiWarning className="w-100 text-3xl bg-red-100 text-red-600 rounded-lg " />

                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 ml-5 mt-1"
                      id="modal-title"
                    >
                      {alertMessage}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeAlert}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
              maxLength={150}
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
              maxLength={150}
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
              maxLength={255}
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
                maxLength={250}
                value={field.ingredient}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Ingredient"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="quantity"
                value={field.quantity}
                maxLength={250}
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
