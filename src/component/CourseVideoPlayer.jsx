import React from "react";

function CourseVideoPlayer({ youtubeId, title }) {
  return (
    <div className="aspect-video w-full overflow-hidden md:rounded-2xl bg-black shadow-2xl">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; screen-orientation-lock"
        allowFullScreen
        className="h-full w-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

export default CourseVideoPlayer;

// Made with Bob
