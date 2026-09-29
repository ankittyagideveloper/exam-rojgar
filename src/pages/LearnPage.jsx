import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { courseMockData } from "./mockData";

function LearnPage() {
  return (
    <>
      <Helmet>
        <title>Learn Courses | Exam Rojgaar</title>
        <meta
          name="description"
          content="Explore Exam Rojgaar courses with structured learning content, thumbnails, and short descriptions."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-6 md:px-6 lg:px-8 transition-colors duration-200">
        <div className="mx-auto max-w-7xl">
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courseMockData.map((course) => (
              <Link
                key={course.id}
                to={`/learn/${course.slug}`}
                className="group block"
              >
                <article className="mb-15 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[#1272ba]/10 cursor-pointer">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img
                      src={course.thumbnail}
                      alt={course.thumbnailAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-50 dark:bg-[#1272ba]/15 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-[#5aaef0]">
                        {course.category}
                      </span>
                      {course.level && (
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {course.level}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-[#1272ba] dark:group-hover:text-[#5aaef0] transition-colors">
                      {course.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {course.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default LearnPage;

// Made with Bob
