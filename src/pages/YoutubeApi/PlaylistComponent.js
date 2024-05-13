import React, { useEffect, useState } from "react";
import getPlaylistItems from "./YTapi";
import YoutubePlayer from "./YoutubePlayer";

function PlaylistComponent() {
  const [playlistItems, setPlaylistItems] = useState([]);

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      const items = await getPlaylistItems();
      setPlaylistItems(items);
    };

    fetchPlaylistItems();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-2 md:p-4 lg:w-100 bg-black">
      <h4 class="font-sans tracking-[.25em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-purple-500 mt-20 lg:text-5xl md:text-base sm:text-base text-center">
        Gourmetgathering:
        <br></br>Culinary Cinema
      </h4>

      {playlistItems.map((item, index) => (
        <div
          key={index}
          className="w-full lg:size-full md:w-100 rounded overflow-hidden shadow-lg bg-black"
        >
          <div className="flex justify-center gap-2 lg:gap-4 p-2 lg:p-4 flex-col items-center mt-20">
            <div className="font-sans font-light tracking-[.1em] text-xl mb-2 bg-custom-purple text-white size-full p-2 lg:p-4 rounded text-center">
              {item.snippet.title}
            </div>
            {/* <p className="text-gray-700 text-base">{item.snippet.description}</p> */}
            <YoutubePlayer
              videoId={item.snippet.resourceId.videoId}
              className="hover:aspect-square"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaylistComponent;
