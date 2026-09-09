import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useUser } from "@clerk/clerk-react";
import TestCard2 from "../component/TestCard2";
import { QuizCard } from "../component/QuizCard";
import { freeTestsData, countFreeTests } from "../data/freeTestsMockData";

const FreeTestsPage = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse path: /free-tests[/slug1[/slug2...]]
  const pathSegments = location.pathname
    .replace("/free-tests", "")
    .split("/")
    .filter(Boolean);

  // Drill down into the data tree
  let current = freeTestsData.categories;
  for (const slug of pathSegments) {
    if (current[slug]) {
      current = current[slug];
    } else if (current.subcategories?.[slug]) {
      current = current.subcategories[slug];
    }
  }

  const isRoot = pathSegments.length === 0;
  const pageTitle = isRoot
    ? "Free Tests"
    : current?.title ?? "Free Tests";

  const handleTestClick = (test) => {
    if (test.isSpecialMock && test.route) {
      navigate(test.route);
    } else {
      navigate(`/all-test/${test.id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {isRoot
            ? "Free Mock Tests – History, Polity, Maths, GK | Exam Rojgaar"
            : `${pageTitle} Free Tests | Exam Rojgaar`}
        </title>
        <meta
          name="description"
          content="Attempt free topic-wise mock tests for RRB NTPC and Railway exams. Covers History, Polity, Maths, Geography and Current Affairs. Login required, no subscription needed."
        />
        <link
          rel="canonical"
          href={`https://examrojgaar.com/free-tests${pathSegments.length ? `/${pathSegments.join("/")}` : ""}`}
        />
      </Helmet>

      {/* Page header
      <div className="px-5 pt-6 pb-2 flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {isRoot ? "Free Tests & Quizzes" : pageTitle}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-green-100 text-green-700 border border-green-300 uppercase">
              Free
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {isRoot
              ? "Login required · No subscription needed · Attempt anytime"
              : current?.description ?? ""}
          </p>
        </div>
      </div> */}

      {/* Breadcrumb (non-root) */}
      {/* {!isRoot && (
        <nav className="px-5 mb-2 flex items-center gap-1 text-xs text-gray-400">
          <button
            onClick={() => navigate("/free-tests")}
            className="hover:text-[#1272ba] transition-colors cursor-pointer"
          >
            Free Tests
          </button>
          {pathSegments.map((seg, idx) => {
            const href = `/free-tests/${pathSegments.slice(0, idx + 1).join("/")}`;
            return (
              <React.Fragment key={seg}>
                <span>/</span>
                <button
                  onClick={() => navigate(href)}
                  className="hover:text-[#1272ba] transition-colors capitalize cursor-pointer"
                >
                  {seg.replace(/-/g, " ")}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      )} */}

      {/* Category / Subcategory cards */}
      {(isRoot || current?.subcategories) && (
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.values(
            isRoot ? freeTestsData.categories : current.subcategories ?? {}
          ).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
            >
              <TestCard2
                key={cat.id}
                icon={cat.image}
                studentCount={100}
                title={cat.title}
                progress={0}
                total={countFreeTests(cat)}
                percentage={1}
                onGoToTest={() => {
                  const nextPath = isRoot
                    ? `/free-tests/${cat.slug}`
                    : `/free-tests/${[...pathSegments, cat.slug].join("/")}`;
                  navigate(nextPath);
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Test list */}
      {!isRoot && current?.tests && (
        <div className="mx-4 mb-28 flex flex-col gap-4">
          {current.tests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center"
            >
              <h2 className="text-4xl font-extrabold text-foreground mb-4">
                Coming <span className="text-primary">Soon</span>
              </h2>
              <p className="max-w-md text-base text-muted-foreground mb-8">
                Tests for this section are being crafted carefully. Check back soon!
              </p>
            </motion.div>
          ) : (
            current.tests.map((test) => (
              <QuizCard
                key={test.id}
                title={test.title}
                questions={test.questions}
                marks={test.marks}
                duration={test.duration}
                languages={test.languages ?? []}
                isFree={true}
                isNewInterface={true}
                isPaid={true}
                onStartClick={() => handleTestClick(test)}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default FreeTestsPage;
