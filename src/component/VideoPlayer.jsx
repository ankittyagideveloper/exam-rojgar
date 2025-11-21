import { VideoCard } from "./VideoCard";

const videos = [
  {
    id: 1,
    title: "RRB NTPC/JE की स्मार्ट तैयारी कैसे करें ।Topper's Best Strateg",
    embedUrl: "https://www.youtube.com/embed/PK9HRVN0we4?si=p-dvQbSk3OESSlOD",
  },
  {
    id: 2,
    title: "RRB NTPC Zone Selection।किस जोन से फॉर्म भरें??",
    embedUrl: "https://www.youtube.com/embed/v6d6ZIZtmQc?si=sCmmxkYcScASpiDw",
  },
  {
    id: 3,
    title: "RRB NTPC/JE PYQ 2025 Analysis Part -1",
    embedUrl: "https://www.youtube.com/embed/T5EGpS3ssyo?si=a2ngoyzNPedDEz30",
  },
  {
    id: 4,
    title: "RRB NTPC/JE PYQ 2025 Analysis Part-2|Exam Pattern Explained ",
    embedUrl: "https://www.youtube.com/embed/mxCzlHBSv5E?si=cLX9ONBWMSmKW6yp",
  },

  {
    id: 5,
    title: "RRB NTPC/JE 2025 Book List को follow करो",
    embedUrl: "https://www.youtube.com/embed/46QTiH_-1zs?si=tj_Bu85Fwi_5Pw5X",
  },
  {
    id: 6,
    title:
      "RRB NTPC Post Preference|RRB NTPC New Vacancy 2025|Railway NTPC Post Details",
    embedUrl: "https://www.youtube.com/embed/uiYrHbePLBY?si=6H2m2lx26KOxYZRo",
  },
];

export default function VideoPlayer() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 md:px-10 py-10 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Recent Classes
        </h1>
        <p className="text-gray-600 text-lg mt-3">
          Discover our curated collection of amazing videos
        </p>
      </div>

      {/* Video Grid */}
      <div className="px-4 md:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              embedUrl={video.embedUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
