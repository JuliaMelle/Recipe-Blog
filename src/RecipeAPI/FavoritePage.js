// import { useLocation } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// function FavoritePage(props) {
//   //   const { favorites } = props.location.state;
//   const [recipes, setRecipes] = useState([]);
//   const location = useLocation();
//   const favorites = location.state.favorites || []; // Default to empty array if not found

//   const APP_ID = "b5e8ffaa";
//   const APP_KEY = "366c56854db11413d53540a02d074f37";

//   // Example function to fetch recipe details by ID
//   const fetchRecipeById = async (id) => {
//     try {
//       const response = await fetch(`${APP_ID}/${id}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error status: ${response.status}`);
//       }
//       const data = await response.json();
//       return data; // Assuming the API returns the recipe details directly
//     } catch (error) {
//       console.error("Error fetching recipe:", error);
//       return null; // Or handle the error appropriately
//     }
//   };
//   useEffect(() => {
//     const fetchAllRecipes = async () => {
//       const fetchedRecipes = await Promise.all(favorites.map(fetchRecipeById));
//       setRecipes(fetchedRecipes);
//     };

//     fetchAllRecipes();
//   }, [favorites]);
//   // Map over the favorites array to display each favorite recipe
//   return (
//     <div>
//       {favorites.map((id) => {
//         const recipe = fetchRecipeById(id); // Fetch the recipe details
//         return (
//           <div key={id}>
//             <h2>{recipe.title}</h2>
//             <img src={recipe.image} alt={recipe.title} />
//             {/* Display other recipe details */}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// export default FavoritePage;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FavoritePage = () => {
  const location = useLocation();
  const favorites = location.state?.favorites || [];
  const [storedFavorites, setStoredFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setStoredFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <h1
        className="text-center text-xl font-semibold text-gray-800 bg-gradient-to-r from-purple-400 to-blue-500 
                                text-white py-1 px-2 rounded"
      >
        Your Favorites:
      </h1>
      <ul>
        {storedFavorites.map((favoriteId) => (
          <li
            key={favoriteId}
            className="text-center text-xl font-semibold text-gray-800"
          >
            {" "}
            {favoriteId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritePage;
