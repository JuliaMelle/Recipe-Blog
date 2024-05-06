import { useParams } from "react-router-dom";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
const RecipeDetails = ({ open, setOpen }) => {
  const { id } = useParams(); // Extract the id from the URL
  const [recipe, setRecipe] = useState(null);
  const APP_ID = "b5e8ffaa";
  const APP_KEY = "366c56854db11413d53540a02d074f37";

  // tailwind
  // const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${id}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch recipe details: ${response.statusText}`
          );
        }
        const data = await response.json();
        // Assuming the API returns the recipe details directly, adjust as necessary
        setRecipe(data.hits[0]); // Assuming the first hit is the desired recipe
        console.log("Open state:", open);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Depend on the id to refetch when it changes

  if (!recipe) {
    return <div>Loading recipe details...</div>;
  }

  return (
    // <div>
    //   <h1>{recipe.recipe.label}</h1>
    //   <img src={recipe.recipe.image} alt={recipe.recipe.label} />
    //   <p>Ingredients:</p>
    //   <ul>
    //     {recipe.recipe.ingredientLines.map((ingredient, index) => (
    //       <li key={index}>{ingredient}</li>
    //     ))}
    //   </ul>
    // </div>
    <>
      <Transition.Root show={open} as={Fragment} unmount={false}>
        <Dialog
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          <p>Ingredients:</p>
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            <h1 className="text-lg font-bold mb-2">
                              {recipe.recipe.label}
                            </h1>
                            <div className="flex justify-center items-center">
                              <img
                                src={recipe.recipe.image}
                                alt={recipe.recipe.label}
                                className="w-full h-auto mb-4 rounded-lg shadow-md"
                              />
                            </div>

                            <ul className="list-disc list-inside">
                              {recipe.recipe.ingredientLines.map(
                                (ingredient, index) => (
                                  <li key={index} className="mb-1">
                                    {ingredient}
                                  </li>
                                )
                              )}
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default RecipeDetails;
