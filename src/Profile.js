import React, { useState, useEffect } from "react";

const Profile = () => {
  // Sample profile data (replace with your actual data fetching logic)
  const [profileData, setProfileData] = useState({
    name: "Richwin Kyle Reyes",
    username: "richwinmapagmahal",
    biography: "Bio ni Ninong Richwin",
    profilePicture: "https://example.com/profile.jpg",
    postHistory: [
      { id: 1, title: "Post 1", date: "2024-05-09" },
      { id: 2, title: "Post 2", date: "2024-05-08" },
      // Add more post data as needed
    ],
  });

  // Function to handle profile update
  const handleUpdateProfile = () => {
    // Implement logic to update profile data (e.g., make API call)
    console.log("Updating profile...");
  };

  // Function to handle profile deletion
  const handleDeleteProfile = () => {
    // Implement logic to delete profile data (e.g., make API call)
    console.log("Deleting profile...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div>
        <img
          src={profileData.profilePicture}
          alt={profileData.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <div className="text-center">
          <h3 className="text-xl font-semibold">{profileData.name}</h3>
          <p className="text-gray-600">@{profileData.username}</p>
          <p className="mt-2">{profileData.biography}</p>
        </div>
        <h3 className="text-lg font-semibold mt-4">Post History</h3>
        <ul className="mt-2">
          {profileData.postHistory.map((post) => (
            <li key={post.id} className="border-b py-2">
              <p className="font-semibold">{post.title}</p>
              <p className="text-gray-600">{post.date}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
        <button
          onClick={handleDeleteProfile}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
