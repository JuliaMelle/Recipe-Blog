import React from "react";
import { Navigate } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import GourmetCard from "./GourmetCard";

const ProfilePicture = ({ editMode, profilePicture, handlePictureChange }) => (
  <div className="relative w-32 h-32 mx-auto mb-4">
    <label htmlFor="profilePictureInput">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-full h-full rounded-full cursor-pointer object-cover border-2 border-gray-300 shadow-lg"
      />
    </label>
    {editMode && (
      <input
        id="profilePictureInput"
        type="file"
        accept="image/*"
        onChange={handlePictureChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    )}
  </div>
);

const ProfileDetails = ({
  editMode,
  profileData,
  editedProfileData,
  handleChange,
}) => (
  <div className="text-center">
    {editMode ? (
      <div className="flex flex-col items-center">
        <input
          type="text"
          name="name"
          value={editedProfileData.name}
          onChange={handleChange}
          className="text-xl font-semibold border-b-2 px-2 py-1 focus:outline-none focus:border-blue-500 mb-4 w-full max-w-sm"
          placeholder="Name"
        />
        <input
          type="text"
          name="username"
          value={editedProfileData.username}
          onChange={handleChange}
          className="text-gray-600 border-b-2 px-2 py-1 focus:outline-none focus:border-blue-500 mb-4 w-full max-w-sm"
          placeholder="Username"
        />
        <textarea
          name="biography"
          value={editedProfileData.biography}
          onChange={handleChange}
          className="mt-2 border-b-2 px-2 py-1 focus:outline-none focus:border-blue-500 w-full max-w-sm"
          placeholder="Biography"
        ></textarea>
      </div>
    ) : (
      <>
        <h3 className="text-2xl font-semibold">{profileData.name}</h3>
        <p className="mt-2">{profileData.biography}</p>
      </>
    )}
  </div>
);

const ProfileActions = ({
  editMode,
  handleEditProfile,
  handleDeleteProfile,
  handleSaveChanges,
  handleCancelEdit,
}) => (
  <div className="mt-8 flex justify-center space-x-4">
    {!editMode && (
      <>
        <button
          onClick={handleEditProfile}
          className="bg-custom-purple hover:bg-custom-brown text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
        >
          Edit Profile
        </button>
        <button
          onClick={handleDeleteProfile}
          className="bg-red-500 hover:bg-custom-brown text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
        >
          Delete Profile
        </button>
      </>
    )}
    {editMode && (
      <>
        <button
          onClick={handleSaveChanges}
          className="bg-custom-purple hover:bg-custom-brown text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
        >
          Save Changes
        </button>
        <button
          onClick={handleCancelEdit}
          className="bg-custom-coffee hover:bg-custom-brown text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
        >
          Cancel
        </button>
      </>
    )}
  </div>
);

const Profile = ({
  userEmail,
  setUserEmail,
  profileData,
  setProfileData,
  redirectToLogin,
  isLoading,
  editedProfileData,
  editMode,
  handlePictureChange,
  handleChange,
  handleSaveChanges,
  handleCancelEdit,
  handleEditProfile,
  handleDeleteProfile,
  food_recipes,
  deleteRecipeItem,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {redirectToLogin && <Navigate to="/Login" />}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <ProfilePicture
              editMode={editMode}
              profilePicture={editedProfileData.profilePicture}
              handlePictureChange={handlePictureChange}
            />
            <ProfileDetails
              editMode={editMode}
              profileData={profileData}
              editedProfileData={editedProfileData}
              handleChange={handleChange}
            />
            <ProfileActions
              editMode={editMode}
              handleEditProfile={handleEditProfile}
              handleDeleteProfile={handleDeleteProfile}
              handleSaveChanges={handleSaveChanges}
              handleCancelEdit={handleCancelEdit}
            />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Post History</h3>
            <div className="grid grid-cols-1 gap-4">
              {food_recipes
                .filter((recipe) => recipe.creator === profileData.username)
                .map((recipe) => (
                  <GourmetCard
                    key={recipe.label}
                    recipe={recipe}
                    profileData={profileData}
                    deleteRecipeItem={deleteRecipeItem}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
