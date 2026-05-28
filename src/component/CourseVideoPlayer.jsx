import React from "react";

function CourseVideoPlayer({ youtubeId, title }) {
  return (
    <div className="aspect-video w-full overflow-hidden md:rounded-2xl bg-black shadow-2xl">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

export default CourseVideoPlayer;

// Made with Bob
