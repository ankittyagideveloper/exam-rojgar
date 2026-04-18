import React from "react";
import TestCard from "../component/TestCard";
import { useLocation, useNavigate } from "react-router-dom";
import { mockData } from "./mockData";
import { motion } from "motion/react";
import TestCard2 from "../component/TestCard2";
import { QuizCard } from "../component/QuizCard";
import { useUser } from "@clerk/clerk-react";
import TestSeriesCard from "../component/test-series-card/TestSeriesCard";

const TestPage = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .replace("/test-category", "")
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

  const navigate = useNavigate();
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
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const testSeriesData = {
    categoryModeId: "6969e40895cd1bc4bf9c3a37",
    modeSlug: "6969e40895cd1bc4bf9c3a37",
    modeType: "Online",
    name: "RRB Section Controller Mock Test Series 2025-26",
    label: [{ emphasis: "high", text: "NEW", variant: "warning" }],
    imageId: {
      _id: "6969e2152cce80198756b421",
      baseUrl:
        "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/5625b431-1ade-4380-9312-774de02fdc19.png",
    },
    discount: 50,
    price: 199,
    currency: "INR",
    postDiscountPrice: 99,
    meta: [
      {
        icon: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/11a66140-3621-4210-8367-1d0e562c406b.png",
        text: "<p>Exam-level mocks to boost RRB Section Controller preparation. Attempt First Test for Free!</p>",
      },
      {
        icon: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/82e74bc1-c93e-4286-a17a-ad158c50458e.png",
        text: "<p>Conducted in Hindi & English</p>",
      },
      {
        icon: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/63abff35-1acc-4158-8b2b-bf715fd80f42.png",
        text: "<p>Total Tests - 10 (Full Mock Tests)</p>",
      },
      {
        icon: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/bf17834f-8fa4-4f6e-86a1-11f855581a15.png",
        text: "<p>Valid till 31st Dec 2026</p>",
      },
      {
        icon: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/88606e02-7c00-40e8-9539-2a35d4e5b0d4.png",
        text: "<p>Detailed Text Solution after every test.</p>",
      },
    ],
    language: "BILINGUAL",
    buttonText: "Buy Now",
    parentSlug: "/railway/test-series",
  };

  // return isAdmin ? (
  //   <>
  //     <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ">
  //       {/* {categories.map((test, index) => (
  //       <TestCard
  //         onClick={() => handleTest(test.id)}
  //         key={index}
  //         image={test.image}
  //         alt={test.alt}
  //         title={test.title}
  //       />
  //     ))} */}
  //       {/* Root level → show Engineering, Medical, etc. */}
  //       {isRoot &&
  //         Object.values(mockData.categories).map((cat, i) => (
  //           // <Link
  //           //   key={cat.id}
  //           //   to={`/test-category/${cat.slug}`}
  //           //   style={{
  //           //     border: "1px solid #ddd",
  //           //     padding: "16px",
  //           //     borderRadius: "8px",
  //           //     textDecoration: "none",
  //           //     width: "200px",
  //           //   }}
  //           // >
  //           //   <h3>{cat.name}</h3>
  //           //   <p>{cat.description}</p>
  //           // </Link>
  //           <>
  //             <motion.div
  //               key={i}
  //               initial={{ opacity: 0, y: 20 }} // start faded & lower
  //               animate={{ opacity: 1, y: 0 }} // animate to normal
  //               transition={{
  //                 duration: 0.4, // slow upward movement
  //                 ease: "easeOut",
  //               }}
  //             >
  //               {/* <TestCard
  //               onClick={() => navigate(`/test-category/${cat.slug}`)}
  //               key={cat.id}
  //               image={cat.image}
  //               alt={cat.alt}
  //               title={cat.title}
  //             /> */}
  //               <TestCard2
  //                 key={cat.id}
  //                 icon={cat.image}
  //                 studentCount={100}
  //                 title={cat.title}
  //                 progress={0}
  //                 total={1}
  //                 percentage={1}
  //                 onGoToTest={() => {
  //                   navigate(`/test-category/${cat.slug}`);
  //                 }}
  //               />
  //             </motion.div>
  //           </>
  //         ))}
  //       {/* Subcategories */}
  //       {!isRoot &&
  //         current.subcategories &&
  //         Object.values(current.subcategories).map((sub, i) => (
  //           // <Link
  //           //   key={sub.id}
  //           //   to={`/test-category/${[...pathSegments, sub.slug].join("/")}`}
  //           //   style={{
  //           //     border: "1px solid #ddd",
  //           //     padding: "16px",
  //           //     borderRadius: "8px",
  //           //     textDecoration: "none",
  //           //     width: "200px",
  //           //   }}
  //           // >
  //           //   <h3>{sub.name}</h3>
  //           //   <p>{sub.description}</p>
  //           // </Link>
  //           <motion.div
  //             key={i}
  //             initial={{ opacity: 0, y: 20 }} // start faded & lower
  //             animate={{ opacity: 1, y: 0 }} // animate to normal
  //             transition={{
  //               duration: 0.8, // slow upward movement
  //               ease: "easeOut",
  //             }}
  //           >
  //             {/* <TestCard
  //               onClick={() =>
  //                 navigate(
  //                   `/test-category/${[...pathSegments, sub.slug].join("/")}`
  //                 )
  //               }
  //               key={sub.id}
  //               image={sub.image}
  //               alt={sub.alt}
  //               title={sub.title}
  //             /> */}
  //             <TestCard2
  //               key={sub.id}
  //               icon={sub.image}
  //               studentCount={100}
  //               title={sub.title}
  //               progress={0}
  //               total={1}
  //               percentage={1}
  //               onGoToTest={() => {
  //                 navigate(
  //                   `/test-category/${[...pathSegments, sub.slug].join("/")}`,
  //                 );
  //               }}
  //             />
  //           </motion.div>
  //         ))}
  //     </div>
  //     <div className="mx-4 flex flex-col gap-4">
  //       {/* Tests */}
  //       {!isRoot &&
  //         current.tests &&
  //         current.tests.map((test) => (
  //           // <button onClick={() => handleTest(test.id)} key={test.id}>
  //           //   {test.title} ({test.difficulty})
  //           // </button>
  //           <QuizCard
  //             title={test.title}
  //             date="08 Aug 2025"
  //             questions={test.questions}
  //             marks={test.marks}
  //             duration={test.duration}
  //             languages={test.languages ?? []}
  //             userCount="45.8k"
  //             isFree={true}
  //             isNewInterface={true}
  //             onStartClick={() => handleTest(test.id)}
  //           />
  //         ))}
  //     </div>
  //   </>
  // ) : (

  // );

  return <TestSeriesCard {...testSeriesData} />;
};

export default TestPage;
