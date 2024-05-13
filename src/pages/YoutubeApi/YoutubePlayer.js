import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YoutubePlayer = ({ videoId }) => {
  const [loading, setLoading] = useState(true);
  const [opts, setOpts] = useState({
    height: "315",
    width: "660",
    playerVars: {
      autoplay: 0,
      startAt: 0,
      controls: 1,
    },
  });

  useEffect(() => {
    setLoading(false);
    // Function to update dimensions based on window size
    const updateDimensions = () => {
      const newHeight = window.innerHeight * 0.5; // Example calculation
      const newWidth = window.innerWidth * 0.9; // Example calculation
      setOpts({ ...opts, height: `${newHeight}px`, width: `${newWidth}px` });
    };

    // Update dimensions on mount and window resize
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};

export default YoutubePlayer;
