import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./Signup";
import GourmetGatherings from "./GourmetGatherings";
import RecipeMain from "./RecipeAPI/RecipeMain";
import RecipeDetails from "./RecipeAPI/RecipeDetails";
import AddRecipe from "./AddRecipe";
import Login from "./Login";
import Profile from "./Profile";
import PlaylistComponent from "./pages/YoutubeApi/PlaylistComponent";
import { AuthProvider } from "./components/AuthContext";
import IndexPage from "./pages/Main/Home";
import FavoritePage from "./RecipeAPI/FavoritePage";
import { getDatabase, ref, set, remove, onValue, get } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import app from "./FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //for GourmetGatherings
  const [food_recipes, setfood_recipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const dbRef = ref(db, "communityRecipes");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const myData = snapshot.val();
        const tempArray = Object.keys(myData).map((recipeID) => {
          return { ...myData[recipeID], recipeID: recipeID };
        });
        setfood_recipes(tempArray);
      } else {
        alert("No data available");
      }
    };

    fetchData();
  }, []);

  const deleteRecipeItem = async (itemID) => {
    //console.log(itemID);
    const db = getDatabase(app);
    const dbRef = ref(db, "communityRecipes/" + itemID);
    await remove(dbRef);
    window.location.reload();
  };

  // end of GourmetGatherings functionality

  // for Profile
  const [userEmail, setUserEmail] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    biography: "",
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Seal_of_the_University_of_Santo_Tomas.svg/1200px-Seal_of_the_University_of_Santo_Tomas.svg.png",
    postHistory: [
      { id: 1, title: "Post 1", date: "2024-05-09" },
      { id: 2, title: "Post 2", date: "2024-05-08" },
    ],
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({
    name: "",
    username: "",
    biography: "",
    profilePicture: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const database = getDatabase(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        const profileRef = ref(database, `profiles/${user.uid}`);
        onValue(profileRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setProfileData(data);
            setEditedProfileData(data);
          } else {
            console.error("Profile data does not exist.");
            setProfileData({
              name: user.displayName || user.email,
              username: user.email,
              biography: "Student",
              profilePicture:
                "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Seal_of_the_University_of_Santo_Tomas.svg/1200px-Seal_of_the_University_of_Santo_Tomas.svg.png",
              postHistory: [],
            });
            setEditedProfileData({
              name: user.displayName || user.email,
              username: user.email,
              biography: "Student",
              profilePicture:
                "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Seal_of_the_University_of_Santo_Tomas.svg/1200px-Seal_of_the_University_of_Santo_Tomas.svg.png",
            });
          }
          setIsLoading(false);
        });
      } else {
        setUserEmail("");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setShowMenu(false);
  };

  const handleSaveChanges = async () => {
    setProfileData(editedProfileData);
    setEditMode(false);

    const database = getDatabase(app);
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is currently signed in.");
      return;
    }

    const profileRef = ref(database, `profiles/${user.uid}`);

    try {
      await set(profileRef, editedProfileData);
      console.log("Profile data saved successfully.");
    } catch (error) {
      console.error("Error saving profile data:", error);
    }

    if (imageFile) {
      const storage = getStorage();
      const storageReference = storageRef(
        storage,
        `profilePictures/${user.uid}`
      );
      try {
        await uploadString(storageReference, imageFile, "data_url");
        const imageUrl = await getDownloadURL(storageReference);
        setEditedProfileData((prevState) => ({
          ...prevState,
          profilePicture: imageUrl,
        }));
        console.log("Profile picture uploaded successfully.");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    console.log(userEmail);
    setEditedProfileData(profileData);
    setEditMode(false);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfileData((prevState) => ({
          ...prevState,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfile = async () => {
    const database = getDatabase(app);
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is currently signed in.");
      return;
    }

    const profileRef = ref(database, `profiles/${user.uid}`);

    try {
      await remove(profileRef);
      console.log("Profile deleted successfully.");
      auth.signOut();
      setRedirectToLogin(true);
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  // end of Profile functionality

  return (
    <div className="bg-custom-cream min-h-screen font-sans">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/gourmetgatherings"
            element={
              <GourmetGatherings
                userEmail={userEmail}
                profileData={profileData}
                food_recipes={food_recipes}
                setfood_recipes={setfood_recipes}
                deleteRecipeItem={deleteRecipeItem}
              />
            }
          />
          <Route
            path="/addrecipe"
            element={<AddRecipe profileData={profileData} />}
          />
          <Route path="/" element={<IndexPage />} />

          <Route
            path="/recipe"
            element={
              <RecipeMain open={isDialogOpen} setOpen={setIsDialogOpen} />
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetailsWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/favorite-page"
            element={<FavoritePage setOpen={setIsDialogOpen} />}
          />

          <Route
            path="/profile"
            element={
              <Profile
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                profileData={profileData}
                setProfileData={setProfileData}
                redirectToLogin={redirectToLogin}
                isLoading={isLoading}
                editedProfileData={editedProfileData}
                editMode={editMode}
                handlePictureChange={handlePictureChange}
                handleChange={handleChange}
                handleSaveChanges={handleSaveChanges}
                handleCancelEdit={handleCancelEdit}
                handleEditProfile={handleEditProfile}
                handleDeleteProfile={handleDeleteProfile}
                toggleMenu={toggleMenu}
                showMenu={showMenu}
                food_recipes={food_recipes}
                deleteRecipeItem={deleteRecipeItem}
              />
            }
          />
          {/* <Route path="/logout" element={<Profile />} /> */}
          <Route path="/ytRecipe" element={<PlaylistComponent />} />
        </Routes>
      </AuthProvider>
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
