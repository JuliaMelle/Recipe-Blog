import { useParams } from "react-router-dom";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
const GourmetDetails = ({
  closeDialog,
  recipez,
  profileData,
  deleteRecipeItem,
}) => {
  const cancelButtonRef = useRef(null);

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
          {profileData.username === recipez.creator && (
            <button
              onClick={() => deleteRecipeItem(recipez.recipeID)}
              className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              style={{ margin: "14px 0px" }}
            >
              Delete
            </button>
          )}
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
