import React, { useState, useEffect } from "react";
import { auth, database } from "./FirebaseConfig";
import { ref, set, remove } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        setProfileData((prevData) => ({
          ...prevData,
          name: user.email,
          username: user.email,
        }));
      } else {
        setUserEmail(""); // Reset user email if not authenticated
        // Handle the case where the user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Set initial editedProfileData based on profileData only when profileData is loaded
    if (profileData.name !== "") {
      setEditedProfileData(profileData);
      setIsLoading(false); // Profile data is loaded, no longer in loading state
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveChanges = async () => {
    setProfileData(editedProfileData);
    setEditMode(false);

    // Check if the user is signed in
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is currently signed in.");
      // Handle case where no user is signed in
      return;
    }

    // Reference to the database node where the profile data will be stored
    const profileRef = ref(database, `profiles/${user.uid}`);

    try {
      await set(profileRef, editedProfileData);
      console.log("Profile data saved successfully.");
    } catch (error) {
      console.error("Error saving profile data:", error);
      // Handle error saving profile data
    }

    // Upload new profile picture if an image file is selected
    if (imageFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      try {
        await uploadString(storageRef, imageFile, "data_url");
        const imageUrl = await getDownloadURL(storageRef);
        setEditedProfileData((prevState) => ({
          ...prevState,
          profilePicture: imageUrl,
        }));
        console.log("Profile picture uploaded successfully.");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        // Handle error uploading profile picture
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
    // Check if the user is signed in
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is currently signed in.");
      // Handle case where no user is signed in
      return;
    }

    // Reference to the database node where the profile data is stored
    const profileRef = ref(database, `profiles/${user.uid}`);

    try {
      await remove(profileRef);
      console.log("Profile deleted successfully.");
      // Optionally, sign out the user after deleting the profile
      auth.signOut();
    } catch (error) {
      console.error("Error deleting profile:", error);
      // Handle error deleting profile
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div>
            <div className="relative">
              <img
                src={editedProfileData.profilePicture}
                alt={profileData.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 cursor-pointer"
              />
              {editMode && (
                <input
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
                    className="text-xl font-semibold border-b-2 px-2 py-1 focus:outline-none focus:border-blue-500 mb-4"
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
              {editMode ? (
                <>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditProfile}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDeleteProfile}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete Profile
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Post History</h3>
            <div className="grid grid-cols-1 gap-4">
              {profileData.postHistory.map((post) => (
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
