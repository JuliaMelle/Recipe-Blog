import { useParams } from "react-router-dom";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
const GourmetDetails = ({ closeDialog, recipez }) => {
  //  const { id } = useParams(); // Extract the id from the URL
  //const [recipe, setRecipe] = useState(recipez);
  //   const APP_ID = "b5e8ffaa";
  //   const APP_KEY = "366c56854db11413d53540a02d074f37";
  //   const closeDialog = () => {
  //     setOpen(false);
  //   };
  // tailwind
  // const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  //   useEffect(() => {
  //     const fetchRecipeDetails = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://api.edamam.com/search?q=${id}&app_id=${APP_ID}&app_key=${APP_KEY}`
  //         );
  //         if (!response.ok) {
  //           throw new Error(
  //             `Failed to fetch recipe details: ${response.statusText}`
  //           );
  //         }
  //         const data = await response.json();
  //         // Assuming the API returns the recipe details directly, adjust as necessary
  //         setRecipe(data.hits[0]); // Assuming the first hit is the desired recipe
  //         console.log("Open state:", open);
  //       } catch (error) {
  //         console.error("Error fetching recipe details:", error);
  //       }
  //     };

  //     fetchRecipeDetails();
  //   }, [id]); // Depend on the id to refetch when it changes

  //   if (!recipe) {
  //     return (
  //       <div role="status">
  //         <svg
  //           aria-hidden="true"
  //           className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
  //           viewBox="0 0 100 101"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //             fill="currentColor"
  //           />
  //           <path
  //             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //             fill="currentFill"
  //           />
  //         </svg>
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     );
  //   }

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        overflow: "auto",
        display: "flex",
        justifyContent: "center", // Align children horizontally in the center
        alignItems: "flex-start",
        //position: "absolute",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "40px 0px 0px 0px",
          width: "540px",
          marginTop: "80px",

          //position: "absolute",
        }}
      >
        <p className="text-sm text-gray-500 mr-9 ml-9">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Ingredients:
          </h3>
          <h1 className="text-lg font-bold mb-2 mt-2 text-gray-500">
            {recipez.label}
          </h1>
          <img
            src={recipez.image}
            alt={recipez.label}
            className="w-full h-auto mb-4 rounded-lg shadow-md"
          />

          <ul className="list-disc list-inside">
            {recipez.ingredientLines.map((ingredientLine) => {
              return (
                <li className="mb-1">
                  {ingredientLine.quantity} {ingredientLine.ingredient}
                </li>
              );
            })}
          </ul>
          <h3 style={{ fontWeight: "bold", marginTop: "16px" }}>
            Recipe by {recipez.creator}
          </h3>
        </p>
        <div
          className="bg-gray-50 mt-5"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <button
            onClick={closeDialog}
            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            style={{ margin: "14px 28px" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
    // <>
    //   <div className="container" id="box">
    //     <h2>title</h2>
    //     children
    //   </div>
    //   <button onClick={closeDialog}>Close</button>
    // </>
  );
};

export default GourmetDetails;