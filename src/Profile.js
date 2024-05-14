import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { Navigate } from "react-router-dom";
import app from "./FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import the necessary functions
import { FaEllipsisH } from "react-icons/fa"; // Import the three-dot icon

const Profile = () => {
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
  const [showMenu, setShowMenu] = useState(false); // State to handle the visibility of the dropdown menu

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
    setShowMenu(false); // Close menu when edit is clicked
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

  return (
    <div className="container mx-auto px-4 py-8">
      {redirectToLogin && <Navigate to="/Login" />}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div>
            <div className="relative">
              <label htmlFor="profilePictureInput">
                <img
                  src={editedProfileData.profilePicture}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 cursor-pointer"
                />
              </label>
              {editMode && (
                <input
                  id="profilePictureInput"
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="absolute bottom-0 right-0 opacity-0 cursor-pointer"
                />
              )}
            </div>
            <div className="text-center">
              {editMode ? (
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    name="name"
                    value={editedProfileData.name}
                    onChange={handleChange}
                    className="text-xl font-semibold border-b-2 px-                 
                    2 py-1 focus:outline-none focus:border-blue-500 mb-4"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="username"
                    value={editedProfileData.username}
                    onChange={handleChange}
                    className="text-gray-600 border-b-2 px-2 py-1 focus:outline-none focus:border-blue-500 mb-4"
                    placeholder="Username"
                  />
                  <textarea
                    name="biography"
                    value={editedProfileData.biography}
                    onChange={handleChange}
                    className="mt-2 border-b-2 px-2 py-1 focus:outline-none focus:border-blue-500"
                    placeholder="Biography"
                  ></textarea>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-gray-600">@{profileData.username}</p>
                  <p className="mt-2">{profileData.biography}</p>
                </>
              )}
            </div>
            <div className="mt-8 flex justify-center">
              {!editMode && (
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    <FaEllipsisH size={24} />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md">
                      <button
                        onClick={handleEditProfile}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Edit Profile
                      </button>
                      <button
                        onClick={handleDeleteProfile}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Delete Profile
                      </button>
                    </div>
                  )}
                </div>
              )}
              {editMode && (
                <>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Post History</h3>
            <div className="grid grid-cols-1 gap-4">
              {profileData.postHistory &&
                profileData.postHistory.map((post) => (
                  <div key={post.id} className="bg-gray-100 p-4 rounded">
                    <h4 className="text-lg font-semibold">{post.title}</h4>
                    <p className="text-gray-600">Date: {post.date}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
