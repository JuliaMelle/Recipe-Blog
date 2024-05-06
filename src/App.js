import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Navbar from "./component/Navbar";
import Signup from "./Signup";
import RecipeMain from "./RecipeAPI/RecipeMain";
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

// Wrapper component to pass props to RecipeDetails, Para ndii kunin ng RecipeMain sa taas
// yung const na dapat makuha ng RecipeDetails
const RecipeDetailsWrapper = () => {
  // const { id } = useParams(); // Access the id parameter from the route //Doesnt need nung tinry ko
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
