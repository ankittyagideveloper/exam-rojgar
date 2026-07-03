import React from "react";

const instructor = {
  name: "Ankit Tyagi",
  title: "Railway Exam Expert & Mentor",
  bio: "With years of dedicated experience in Railway exam coaching, I bring a practical, result-oriented approach to every class. My teaching is focused on smart strategies, PYQ analysis, and building exam confidence — so you walk in prepared and walk out successful. Let's crack the exam together.",
  photo: "/instructor-placeholder.png",
  socials: {
    youtube: "https://www.youtube.com/@ExamRojgaar/streams",
    linkedin: "#",
    twitter: "#",
    website: "https://www.examrojgaar.com",
  },
};

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function MeetInstructor() {
  return (
    <section className="py-10 px-4 md:px-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Meet Your{" "}
          <span className="text-teal-600">Mentor</span>
        </h2>
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Learn from an <strong className="text-gray-700 dark:text-gray-200">Industry Expert</strong> who brings real-world exam strategy and{" "}
          <strong className="text-gray-700 dark:text-gray-200">proven coaching experience</strong> to every session. Your success is the mission.
        </p>
      </div>

      {/* Card */}
      <div className="md:rounded-2xl bg-white dark:bg-[#121212] md:ring-1 ring-slate-200 dark:ring-white/10 overflow-hidden max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left — info */}
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
            {/* Avatar stack placeholder */}
            <div className="flex -space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 ring-2 ring-white dark:ring-[#121212] flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-lg">
                A
              </div>
              <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900 ring-2 ring-white dark:ring-[#121212] flex items-center justify-center text-orange-600 dark:text-orange-300 font-bold text-xl">
                AT
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {instructor.name}
            </h3>
            <p className="text-sm font-medium text-teal-600 mb-4">
              {instructor.title}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6">
              {instructor.bio}
            </p>

            {/* Social links */}
            <div className="flex gap-3 flex-wrap">
              <a
                href={instructor.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/40 dark:hover:text-red-400 transition-colors"
              >
                <YoutubeIcon />
              </a>
              <a
                href={instructor.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/40 dark:hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon />
              </a>
              <a
                href={instructor.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                <TwitterIcon />
              </a>
              <a
                href={instructor.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-teal-100 hover:text-teal-600 dark:hover:bg-teal-900/40 dark:hover:text-teal-400 transition-colors"
              >
                <WebsiteIcon />
              </a>
            </div>
          </div>

          {/* Right — photo card */}
          <div className="flex items-center justify-center p-6 md:p-10 bg-gray-50 dark:bg-white/5 md:min-w-[260px]">
            <div className="relative w-52 rounded-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 shadow-md bg-white dark:bg-[#1e1e1e]">
              <div className="w-full aspect-[3/4] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-6xl font-bold text-gray-300 dark:text-gray-500 select-none">AT</span>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5">
                  Railway Exam Expert
                </p>
                <p className="text-lg font-extrabold text-teal-600 tracking-wide uppercase">
                  Ankit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
