import React from "react";
import { Helmet } from "react-helmet-async";
import TestCard from "../component/TestCard";
import { useLocation, useNavigate } from "react-router-dom";
import { mockData } from "./mockData";
import { motion } from "motion/react";
import TestCard2 from "../component/TestCard2";
import { QuizCard } from "../component/QuizCard";
import { useUser } from "@clerk/clerk-react";

// SEO metadata map: keyed by the joined path after /online-test-series/
const PAGE_SEO = {
  "": {
    title: "Online Mock Test Series for RRB NTPC, SSC, RRC Group D | Exam Rojgaar",
    description:
      "Free & premium online mock test series for RRB NTPC, RRC Group D and SSC exams. Practise topic-wise tests, full-length mocks and PYQs on Exam Rojgaar.",
    keywords:
      "rrb ntpc mock test, rrb ntpc test series, online test series railway, rrc group d mock test, ssc mock test, exam rojgaar test series",
    h1: "Online Test Series",
  },
  "rrb": {
    title: "RRB Mock Test Series – NTPC, JE, ALP & Group D | Exam Rojgaar",
    description:
      "Attempt RRB mock tests for NTPC, JE, ALP and Group D on Exam Rojgaar. Free topic-wise and full-length tests with detailed analysis.",
    keywords:
      "rrb mock test, rrb ntpc test series, railway mock test, rrb je mock test, rrb alp mock test",
    h1: "RRB Mock Test Series",
  },
  "rrb/rrb-ntpc": {
    title: "RRB NTPC Mock Test Series 2025 – Free Online Tests | Exam Rojgaar",
    description:
      "Prepare for RRB NTPC 2025 with free online mock tests. Topic-wise tests covering History, Polity, Geography, Maths, Science and Current Affairs on Exam Rojgaar.",
    keywords:
      "rrb ntpc mock test 2025, rrb ntpc test series, rrb ntpc online test, rrb ntpc free mock test, railway ntpc mock test, rrb ntpc practice test",
    h1: "RRB NTPC Mock Test Series 2025",
  },
  "rrb/rrb-ntpc/history": {
    title: "RRB NTPC History Mock Tests – Ancient, Medieval & Modern | Exam Rojgaar",
    description:
      "Practice RRB NTPC History mock tests covering Ancient, Medieval and Modern Indian History. Topic-wise tests with detailed explanations.",
    keywords:
      "rrb ntpc history mock test, railway ntpc history test, ancient history mock test rrb, medieval history rrb ntpc",
    h1: "RRB NTPC History Mock Tests",
  },
  "rrb/rrb-ntpc/history/ancient-history": {
    title: "RRB NTPC Ancient History Mock Tests – Harappa, Mauryan, Gupta | Exam Rojgaar",
    description:
      "Free Ancient History mock tests for RRB NTPC. Covers Harappa, Vedic Age, Mahajanapadas, Buddhism, Jainism, Mauryan Empire, Gupta Empire and Sangam Period.",
    keywords:
      "rrb ntpc ancient history mock test, harappa mock test, mauryan empire test, gupta empire mock test, buddhism jainism mock test rrb",
    h1: "RRB NTPC Ancient History Mock Tests",
  },
  "rrb/rrb-ntpc/history/medieval-history": {
    title: "RRB NTPC Medieval History Mock Tests – Delhi Sultanate, Mughal, Maratha | Exam Rojgaar",
    description:
      "Practice Medieval History mock tests for RRB NTPC. Covers Delhi Sultanate, Vijayanagar, Mughal Empire, Bhakti & Sufi movements and Maratha Empire.",
    keywords:
      "rrb ntpc medieval history mock test, delhi sultanate mock test, mughal empire test rrb, maratha mock test railway ntpc",
    h1: "RRB NTPC Medieval History Mock Tests",
  },
  "rrb/rrb-ntpc/history/modern-history": {
    title: "RRB NTPC Modern History Mock Tests – Advent of Europeans, 1857 Revolt | Exam Rojgaar",
    description:
      "Free Modern History mock tests for RRB NTPC. Covers advent of Europeans, 1857 Revolt, economic impact, peasant movements and the extremist phase.",
    keywords:
      "rrb ntpc modern history mock test, 1857 revolt mock test, modern history railway exam, extremist phase test rrb ntpc",
    h1: "RRB NTPC Modern History Mock Tests",
  },
  "rrb/rrb-ntpc/polity": {
    title: "RRB NTPC Polity Mock Tests – Constitution, Parliament, Fundamental Rights | Exam Rojgaar",
    description:
      "Topic-wise Polity mock tests for RRB NTPC. Covers Indian Constitution, Preamble, Fundamental Rights, DPSP, Parliament, Schedules and Citizenship.",
    keywords:
      "rrb ntpc polity mock test, indian constitution test rrb, fundamental rights mock test, parliament mock test railway",
    h1: "RRB NTPC Polity Mock Tests",
  },
  "rrb/rrb-ntpc/polity/constitution": {
    title: "RRB NTPC Constitution Mock Tests – Preamble, FR, DPSP, Amendments | Exam Rojgaar",
    description:
      "Practice Indian Constitution mock tests for RRB NTPC. Covers Preamble, Sources, Fundamental Rights, DPSP, Schedules, Citizenship and Constitutional Amendments.",
    keywords:
      "constitution mock test rrb ntpc, preamble test railway, fundamental rights dpsp test, amendments mock test rrb",
    h1: "RRB NTPC Constitution Mock Tests",
  },
  "rrb/rrb-ntpc/polity/centre": {
    title: "RRB NTPC Parliament Mock Tests – Centre Government | Exam Rojgaar",
    description:
      "Practice Parliament and Central Government mock tests for RRB NTPC preparation on Exam Rojgaar.",
    keywords:
      "parliament mock test rrb ntpc, central government test railway, lok sabha rajya sabha test rrb",
    h1: "RRB NTPC Parliament & Centre Mock Tests",
  },
  "rrb/rrb-ntpc/geography": {
    title: "RRB NTPC Geography Mock Tests – Indian & World Geography | Exam Rojgaar",
    description:
      "Free Geography mock tests for RRB NTPC. Covers basic concepts, Indian Geography, physical features and Environment & Ecology.",
    keywords:
      "rrb ntpc geography mock test, indian geography test railway, environment ecology mock test rrb ntpc",
    h1: "RRB NTPC Geography Mock Tests",
  },
  "rrb/rrb-ntpc/geography/basic-concepts": {
    title: "RRB NTPC Geography Basics Mock Test | Exam Rojgaar",
    description:
      "Attempt Geography Basics mock tests for RRB NTPC preparation. Covers fundamental geography concepts with detailed explanations.",
    keywords:
      "geography basics mock test rrb ntpc, basic geography test railway exam",
    h1: "RRB NTPC Geography Basics Mock Tests",
  },
  "rrb/rrb-ntpc/geography/environment": {
    title: "RRB NTPC Environment & Ecology Mock Tests | Exam Rojgaar",
    description:
      "Free Environment and Ecology mock tests for RRB NTPC. Practice GS questions on environment, biodiversity and ecology.",
    keywords:
      "environment ecology mock test rrb ntpc, environment quiz railway exam, ecology test rrb",
    h1: "RRB NTPC Environment & Ecology Mock Tests",
  },
  "rrb/rrb-ntpc/science": {
    title: "RRB NTPC Science Mock Tests – Physics, Chemistry, Biology | Exam Rojgaar",
    description:
      "Topic-wise Science mock tests for RRB NTPC. Covers Physics, Chemistry and Biology concepts and previous year questions.",
    keywords:
      "rrb ntpc science mock test, physics chemistry biology test railway, general science rrb ntpc",
    h1: "RRB NTPC Science Mock Tests",
  },
  "rrb/rrb-ntpc/maths": {
    title: "RRB NTPC Maths Mock Tests – Arithmetic, Quantitative Aptitude | Exam Rojgaar",
    description:
      "Free Maths mock tests for RRB NTPC. Covers Profit & Loss, Percentage, Ratio, Average, HCF LCM, Time & Work, Pipe & Cistern and Speed Distance.",
    keywords:
      "rrb ntpc maths mock test, quantitative aptitude test railway, arithmetic mock test rrb ntpc, percentage ratio mock test railway",
    h1: "RRB NTPC Maths Mock Tests",
  },
  "rrb/rrb-ntpc/maths/arithmetic": {
    title: "RRB NTPC Arithmetic Mock Tests – Profit Loss, Percentage, Ratio, Average | Exam Rojgaar",
    description:
      "Practice Arithmetic mock tests for RRB NTPC. Covers Profit & Loss, Discount, Percentage, Ratio, Average, Mixture, HCF LCM, Time & Work, Pipe & Cistern.",
    keywords:
      "arithmetic mock test rrb ntpc, profit loss test railway, percentage mock test rrb, ratio proportion test, hcf lcm mock test, time and work test rrb",
    h1: "RRB NTPC Arithmetic Mock Tests",
  },
  "rrb/rrb-ntpc/economy": {
    title: "RRB NTPC Economy Mock Tests – Banking, Taxation, World Economy | Exam Rojgaar",
    description:
      "Economy mock tests for RRB NTPC covering basic economic concepts, banking & taxation and world economy questions.",
    keywords:
      "rrb ntpc economy mock test, banking taxation test railway, world economy test rrb ntpc",
    h1: "RRB NTPC Economy Mock Tests",
  },
  "rrb/rrb-ntpc/computer": {
    title: "RRB NTPC Computer Mock Tests | Exam Rojgaar",
    description:
      "Computer awareness mock tests for RRB NTPC preparation. Practice basic computer concepts and IT questions on Exam Rojgaar.",
    keywords:
      "rrb ntpc computer mock test, computer awareness test railway, basic computer test rrb ntpc",
    h1: "RRB NTPC Computer Mock Tests",
  },
  "rrb/rrb-ntpc/current-affairs": {
    title: "RRB NTPC Current Affairs Mock Tests – Military Exercises & GK | Exam Rojgaar",
    description:
      "Current Affairs and GK mock tests for RRB NTPC. Covers military exercises, national and international events for railway exam preparation.",
    keywords:
      "rrb ntpc current affairs mock test, gk test railway exam, military exercises test rrb ntpc, current affairs railway 2025",
    h1: "RRB NTPC Current Affairs Mock Tests",
  },
  "rrc": {
    title: "RRC Mock Test Series – Group D | Exam Rojgaar",
    description:
      "Attempt RRC Group D mock tests on Exam Rojgaar. Practice with previous year questions and topic-wise tests for Railway Group D preparation.",
    keywords:
      "rrc group d mock test, railway group d test series, rrc mock test online, group d railway exam practice",
    h1: "RRC Mock Test Series",
  },
  "rrc/rrc-group-d": {
    title: "RRC Group D Mock Tests 2025 – Free Online Tests | Exam Rojgaar",
    description:
      "Free RRC Group D mock tests and previous year question papers on Exam Rojgaar. Covers General Science, Physics and all Group D exam topics.",
    keywords:
      "rrc group d mock test 2025, railway group d test series, rrc group d online test, group d free mock test",
    h1: "RRC Group D Mock Tests",
  },
};

const TestPage = () => {

  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const isPaid = user?.publicMetadata?.roles?.includes("premium");

  const pathSegments = location.pathname
    .replace("/online-test-series", "")
    .replace("/quiz-category", "")
    .split("/")
    .filter(Boolean);

  let current = mockData.categories;

  // Drill down if pathSegments exist
  for (const slug of pathSegments) {
    if (current[slug]) {
      current = current[slug];
    } else if (current.subcategories && current.subcategories[slug]) {
      current = current.subcategories[slug];
    } else if (current.subsubcategories && current.subsubcategories[slug]) {
      current = current.subsubcategories[slug];
    }
  }

  const isRoot = pathSegments.length === 0;
  const pathKey = pathSegments.join("/");
  const seo = PAGE_SEO[pathKey] ?? {
    title: `${current?.title ?? "Test Series"} Mock Tests | Exam Rojgaar`,
    description: `Practice ${current?.title ?? ""} mock tests for RRB NTPC and Railway exams on Exam Rojgaar.`,
    keywords: `${current?.title?.toLowerCase() ?? ""} mock test, railway exam, rrb ntpc test series`,
    h1: current?.title ?? "Mock Test Series",
  };
  const canonicalPath = isRoot ? "/online-test-series" : `/online-test-series/${pathKey}`;
  // const categories = [
  //   {
  //     id: "test1",
  //     image:
  //       "https://snwallah.com/assets/categories/7bb60bd5d40c5422e282de3c440954ef.png",
  //     alt: "Accounts Department Test",
  //     title: "Rly Accounts Dept.2A, 3A, LDCE",
  //   },
  //   {
  //     id: "test2",
  //     image:
  //       "https://snwallah.com/assets/categories/0956768f1fd62a59c8a4d701e32f1365.png",
  //     alt: "Railway Group B Post Test",
  //     title: "RAILWAY GROUP B POST",
  //   },
  //   {
  //     id: "test3",
  //     image:
  //       "https://snwallah.com/assets/categories/ca9ef0193155e688cce675ac58c54f45.jpg",
  //     alt: "Railway LDCE GDCE Test",
  //     title: "RAILWAY LDCE, GDCE",
  //   },
  //   {
  //     id: "test4",
  //     image:
  //       "https://snwallah.com/assets/categories/7874d5a8adead5b478cb3b58122fe186.png",
  //     alt: "Practice Test",
  //     title: "PRACTICE TEST",
  //   },
  // ];
  const handleTest = (id) => {
    navigate(`/all-test/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={`https://examrojgaar.com${canonicalPath}`} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={`https://examrojgaar.com${canonicalPath}`} />
        <meta property="og:type" content="website" />
        {/* FAQ schema for the RRB NTPC hub — boosts rich results for "rrb ntpc tests" queries */}
        {pathKey === "rrb/rrb-ntpc" && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the RRB NTPC exam pattern 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RRB NTPC 2025 has two stages: CBT-1 (100 questions, 90 minutes) covering General Awareness, Mathematics and General Intelligence & Reasoning, and CBT-2 (120 questions, 90 minutes) covering the same sections with higher difficulty. ExamRojgaar provides free topic-wise mock tests for both stages."
                }
              },
              {
                "@type": "Question",
                "name": "Are the RRB NTPC mock tests on Exam Rojgaar free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Exam Rojgaar offers free topic-wise mock tests for RRB NTPC covering History, Polity, Geography, Maths, Science and Current Affairs. Premium full-length tests are also available."
                }
              },
              {
                "@type": "Question",
                "name": "Which subjects are covered in RRB NTPC mock tests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Exam Rojgaar covers all RRB NTPC subjects: General Awareness (History, Polity, Geography, Economy, Science, Current Affairs) and Mathematics (Arithmetic — Profit & Loss, Percentage, Ratio, Average, HCF LCM, Time & Work, Pipe & Cistern)."
                }
              },
              {
                "@type": "Question",
                "name": "How many mock tests are available for RRB NTPC on Exam Rojgaar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Exam Rojgaar has 40+ topic-wise mock tests and sectional tests for RRB NTPC, including tests for Ancient History, Medieval History, Modern History, Indian Polity, Geography, Arithmetic and Current Affairs."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a bilingual (Hindi + English) option for RRB NTPC tests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all RRB NTPC mock tests on Exam Rojgaar are available in both Hindi and English, matching the actual RRB NTPC exam pattern."
                }
              }
            ]
          })}</script>
        )}
      </Helmet>
      {/* Visible H1 for Google — visually styled but semantically present */}
      <h1 className="sr-only">{seo.h1}</h1>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ">
        {/* {categories.map((test, index) => (
        <TestCard
          onClick={() => handleTest(test.id)}
          key={index}
          image={test.image}
          alt={test.alt}
          title={test.title}
        />
      ))} */}
        {/* Root level → show Engineering, Medical, etc. */}
        {isRoot &&
          Object.values(mockData.categories).map((cat, i) => (
            // <Link
            //   key={cat.id}
            //   to={`/online-test-series/${cat.slug}`}
            //   style={{
            //     border: "1px solid #ddd",
            //     padding: "16px",
            //     borderRadius: "8px",
            //     textDecoration: "none",
            //     width: "200px",
            //   }}
            // >
            //   <h3>{cat.name}</h3>
            //   <p>{cat.description}</p>
            // </Link>
            <>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} // start faded & lower
                animate={{ opacity: 1, y: 0 }} // animate to normal
                transition={{
                  duration: 0.4, // slow upward movement
                  ease: "easeOut",
                }}
              >
                {/* <TestCard
                onClick={() => navigate(`/online-test-series/${cat.slug}`)}
                key={cat.id}
                image={cat.image}
                alt={cat.alt}
                title={cat.title}
              /> */}
                <TestCard2
                  key={cat.id}
                  icon={cat.image}
                  studentCount={100}
                  title={cat.title}
                  progress={0}
                  total={Object?.keys(cat?.subcategories ?? {})?.length}
                  percentage={1}
                  onGoToTest={() => {
                    navigate(`/online-test-series/${cat.slug}`);
                  }}
                />
              </motion.div>
            </>
          ))}
        {/* Subcategories */}
        {!isRoot &&
          current.subcategories &&
          Object.values(current.subcategories).map((sub, i) => (
            // <Link
            //   key={sub.id}
            //   to={`/online-test-series/${[...pathSegments, sub.slug].join("/")}`}
            //   style={{
            //     border: "1px solid #ddd",
            //     padding: "16px",
            //     borderRadius: "8px",
            //     textDecoration: "none",
            //     width: "200px",
            //   }}
            // >
            //   <h3>{sub.name}</h3>
            //   <p>{sub.description}</p>
            // </Link>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} // start faded & lower
              animate={{ opacity: 1, y: 0 }} // animate to normal
              transition={{
                duration: 0.8, // slow upward movement
                ease: "easeOut",
              }}
            >
              {/* <TestCard
                onClick={() =>
                  navigate(
                    `/online-test-series/${[...pathSegments, sub.slug].join("/")}`
                  )
                }
                key={sub.id}
                image={sub.image}
                alt={sub.alt}
                title={sub.title}
              /> */}
              <TestCard2
                key={sub.id}
                icon={sub.image}
                studentCount={100}
                title={sub.title}
                progress={0}
                total={Object?.keys(sub?.subcategories ?? sub?.tests ?? {})?.length}
                percentage={1}
                onGoToTest={() => {
                  navigate(
                    `/online-test-series/${[...pathSegments, sub.slug].join("/")}`,
                  );
                }}
              />
            </motion.div>
          ))}
      </div>
      <div className="mx-4 mb-28 flex flex-col gap-4">
        {/* Tests */}
        {!isRoot &&
          current.tests &&
          current.tests.map((test) => (
            <QuizCard
              key={test.id}
              title={test.title}
              date="08 Aug 2025"
              questions={test.questions}
              marks={test.marks}
              duration={test.duration}
              languages={test.languages ?? []}
              userCount="45.8k"
              isFree={true}
              isNewInterface={true}
              isPaid={isPaid}
              onStartClick={() => {
                if (test.isSpecialMock && test.route) {
                  navigate(test.route);
                } else {
                  handleTest(test.id);
                }
              }}
            />
          ))}
        {!isRoot && current?.tests?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
              Coming{" "}
              <span className="text-primary">Soon</span>
            </h1>

            <p className="max-w-md sm:max-w-lg text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
              Tests for this section are being crafted carefully. It may take some time — but they&apos;ll be worth the wait.
            </p>

            <div className="flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-3 h-3 rounded-full bg-primary"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default TestPage;
