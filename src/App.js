import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Navbar from "./Navbar";
import Signup from "./Signup";
import RecipeMain from "./RecipeAPI/RecipeMain"; // Assuming this is the correct component
import RecipeDetails from "./RecipeAPI/RecipeDetails";

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-blue-50 min-h-screen font-sans">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={<RecipeMain open={isDialogOpen} setOpen={setIsDialogOpen} />}
        />
        <Route path="/recipe/:id" element={<RecipeDetailsWrapper />} />
      </Routes>
    </div>
  );
};

// Wrapper component to pass props to RecipeDetails
const RecipeDetailsWrapper = () => {
  // const { id } = useParams(); // Access the id parameter from the route
  const [isDialogOpen, setIsDialogOpen] = useState(true); // State for dialog

  return (
    <>
      {" "}
      <RecipeMain open={isDialogOpen} setOpen={setIsDialogOpen} />
      <RecipeDetails open={isDialogOpen} setOpen={setIsDialogOpen} />
    </>
  );
};

export default App;
