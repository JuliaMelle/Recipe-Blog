import axios from "axios";

const API_KEY = "AIzaSyCa8z__92Y-cXay2uS1cr-GUtdLns4Kefo";
const PLAYLIST_ID = "PLe2Zq7EovWR2rmAMdYVd71pIETAxuqVM4";

const getPlaylistItems = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: "snippet",
          maxResults: 25,
          playlistId: PLAYLIST_ID,
          key: API_KEY,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    return [];
  }
};

export default getPlaylistItems;
