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

      <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <div className="max-w-3xl">
              <span className="mb-3 inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
                Learn
              </span>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Explore Courses
              </h1>
              <p className="mt-3 text-base leading-7 text-gray-600 md:text-lg">
                Start learning with curated courses designed for exam
                preparation. Browse featured topics now, with room for future
                filters, categories, and API-powered course discovery.
              </p>
            </div>
          </section> */}

          {/* <section className="mb-6">
            <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium text-gray-700">Future-ready layout</p>
                <p>
                  This section is prepared for upcoming filters, categories, and
                  dynamic course feeds.
                </p>
              </div>
              <div className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
                {courseMockData.length} Courses
              </div>
            </div>
          </section> */}

          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courseMockData.map((course) => (
              <Link
                key={course.id}
                to={`/learn/${course.slug}`}
                className="group block"
              >
                <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-gray-200">
                    <img
                      src={course.thumbnail}
                      alt={course.thumbnailAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {course.category}
                      </span>
                      {course.level && (
                        <span className="text-xs font-medium text-gray-500">
                          {course.level}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
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
