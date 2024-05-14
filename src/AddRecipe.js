import React, { useEffect, useState } from "react";
import app from "./FirebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";

function AddRecipe() {
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
    <div>
      <form>
        <label htmlFor="inputLbl">Dish Name:</label>
        <input
          type="text"
          id="inputLbl"
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
        />

        <label htmlFor="inputDT">Dish Type:</label>
        <input
          type="text"
          id="inputDT"
          value={inputDishType}
          onChange={(e) => setInputDishType(e.target.value)}
        />

        <label htmlFor="inputImg">Dish Image:</label>
        {/* <input
          type="file"
          alt="input image"
          id="inputImg"
          accept="image/*"
          value={inputImage}
          onChange={(e) => setInputImage(e.target.value)}
        /> */}
        <input
          type="text"
          id="inputImg"
          value={inputImage}
          onChange={(e) => setInputImage(e.target.value)}
        />
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              name="ingredient"
              value={field.ingredient}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Ingredient"
            />
            <input
              type="text"
              name="quantity"
              value={field.quantity}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Quantity"
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddFields()}>
          Add More Ingredients
        </button>
        <button onClick={handleSubmit}>Save Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
