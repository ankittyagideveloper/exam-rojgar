export const mockData = {
  categories: {
    rrb: {
      image: "/rrb-ntpc.webp",
      alt: "Accounts Department Test",
      title: "RRB",
      id: "rrb",
      slug: "rrb",
      description: "Technical and engineering exams",

      subcategories: {
        "rrb-ntpc": {
          id: "tests",
          image: "/rrb-ntpc.webp",
          alt: "Accounts Department Test",
          title: "RRB NTPC",
          name: "Appendix II",
          slug: "rrb-ntpc",
          description: "Mechanical engineering concepts",
          tests: [
            {
              id: "5062025-1",
              image:
                "https://snwallah.com/assets/categories/7bb60bd5d40c5422e282de3c440954ef.png",
              alt: "Accounts Department Test",
              title: "RRB NTPC (UG): Shift-1 (05 June 2025)",
              name: "5th June 1st Shift",
              difficulty: "Medium",
              languages: ["English"],
              questions: "100",
              marks: "100",
              duration: "90",
            },
            {
              id: "5062025-3",
              image:
                "https://snwallah.com/assets/categories/7bb60bd5d40c5422e282de3c440954ef.png",
              alt: "Accounts Department Test",
              title: "RRB NTPC (UG): Shift-3 (05 June 2025)",
              name: "5th June 3rd Shift",
              difficulty: "Medium",
              languages: ["English"],
              questions: "100",
              marks: "100",
              duration: "90",
            },
          ],
        },
      },
    },
    rrc: {
      image: "/rrb-ntpc.webp",
      alt: "Accounts Department Test",
      title: "RRC",
      id: "rrc",
      slug: "rrc",
      description: "Technical and engineering exams",
      subcategories: {
        "rrc-group-d": {
          id: "tests",
          image: "/rrb-ntpc.webp",
          alt: "Accounts Department Test",
          title: "RRC Group D",
          name: "Appendix II",
          slug: "rrc-group-d",
          description: "Mechanical engineering concepts",
          tests: [
            {
              id: "rrc-17082022-01",
              image:
                "https://snwallah.com/assets/categories/7bb60bd5d40c5422e282de3c440954ef.png",
              alt: "Accounts Department Test",
              title: "RRC Group-D Shift-1 (17 Auguest 2025)",
              name: "5th June 3rd Shift",
              languages: ["English"],
              difficulty: "Medium",
              questions: "50",
              marks: "50",
              duration: "25",
            },
            {
              id: "rca-gs-test-1",
              image:
                "https://snwallah.com/assets/categories/7bb60bd5d40c5422e282de3c440954ef.png",
              alt: "Accounts Department Test",
              title: "General Science-Miscellaneous PYQ",
              name: "5th June 1st Shift",
              difficulty: "Medium",
              questions: "50",
              languages: ["English"],
              marks: "50",
              duration: "25",
            },
            {
              id: "rcc-physics-msc-1",
              image:
                "https://snwallah.com/assets/categories/7bb60bd5d40c5422e282de3c440954ef.png",
              alt: "Accounts Department Test",
              title: "RRC Physics Miscellaneous",
              name: "5th June 3rd Shift",
              difficulty: "Medium",
              questions: "50",
              languages: ["English"],
              marks: "50",
              duration: "60",
            }, //rrc-17082022-01
          ],
        },
      },
    },
  },
};

export const courseMockData = [
  {
    id: "course-rrb-ntpc-foundation",
    title: "Computer|RRB NTPC|SSC|Railway",
    description:
      "Build strong fundamentals for RRB NTPC with concept-focused lessons, practice support, and structured preparation guidance.",
    thumbnail:
      "https://i.ytimg.com/vi/EaTwYxmEcJs/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDDu-d9NQziCPIpQF8xdvsPzUc3Lg",
    thumbnailAlt: "RRB NTPC Foundation Course thumbnail",
    category: "Railway Exams",
    level: "Beginner",
    slug: "rrb-ntpc-foundation",
    fullDescription:
      "After analysing PYQ of RRB NTPC for Graduate and Undergraduate these lectures are RAMBAN for beginners and Veterans.Aaplog bahot ache se padhiye inko and concepts ko acha kijiye apne.",
    seasons: [
      {
        id: "season-1",
        title: "Computer",
        videos: [
          {
            id: "Lesson-01",
            episodeNumber: "Lesson-01",
            title: "Computer|PYQ|MS Word",
            description:
              "Prepare for the RRB NTPC Foundation exam by learning about computer basics, including MS Word.",
            youtubeId: "EaTwYxmEcJs",
            duration: "14:35",
            completed: false,
          },
          {
            id: "Lesson-02",
            episodeNumber: "Lesson-02",
            title: "Computer|MS Office|MS Excel|",
            description:
              "Learn how to use MS Office effectively for your computer exams.",

            youtubeId: "oZ8TPlLGXEY",
            duration: "11:46",
            completed: false,
          },
          {
            id: "Lesson-03",
            episodeNumber: "Lesson-03",
            title: "Computer|MS Office||MS Powerpoint",
            description:
              "Learn how to use MS Excel and MS Powerpoint effectively for your computer exams.",

            youtubeId: "IwKuLAiifKw",
            duration: "12:10",
            completed: false,
          },
          {
            id: "Lesson-04",
            episodeNumber: "Lesson-04",
            title: "Reasoning Basics 🧠 & Logical Thinking",
            description:
              "Develop logical reasoning skills and learn problem-solving techniques for the reasoning section.",
            youtubeId: "M-VXlMlmRik",
            duration: "13:47",
            completed: false,
          },
          {
            id: "Lesson-05",
            episodeNumber: "Lesson-05",
            title:
              "Computer|MS Office||MS WordComputer|Operating System|Lecture -3",
            description:
              "Learn how to use MS Excel and MS Powerpoint effectively for your computer exams.",
            youtubeId: "1iApXL8iuko",
            duration: "13:27",
            completed: false,
          },
          {
            id: "Lesson-06",
            episodeNumber: "Lesson-06",
            title: "Computer for All Government Exams Lecture -2",
            description:
              "Learn how to use MS Excel and MS Powerpoint effectively for your computer exams.",

            youtubeId: "jpdDV_ZImXs",
            duration: "22:18",
            completed: false,
          },
          {
            id: "Lesson-07",
            episodeNumber: "Lesson-07",
            title: "Computer for All Government Exams Lecture -1",
            description:
              "Learn how to use MS Excel and MS Powerpoint effectively for your computer exams.",

            youtubeId: "UAoRvp7iU9s",
            duration: "17:48",
            completed: false,
          },
        ],
      },
      // {
      //   id: "season-2",
      //   title: "Season 2",
      //   videos: [
      //     {
      //       id: "ep-05",
      //       episodeNumber: "EP-05",
      //       title: "General Science - Physics 🔬 & Basic Concepts",
      //       description:
      //         "Explore fundamental physics concepts and their applications in the General Science section.",
      //       youtubeId: "ZvbzSrg0afE",
      //       duration: "30:10",
      //       completed: false,
      //     },
      //     {
      //       id: "ep-06",
      //       episodeNumber: "EP-06",
      //       title: "General Science - Chemistry ⚗️ & Reactions",
      //       description:
      //         "Learn essential chemistry topics including chemical reactions, periodic table, and compounds.",
      //       youtubeId: "iLWTnMzWtj4",
      //       duration: "27:35",
      //       completed: false,
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   id: "course-rrc-group-d-complete",
  //   title: "RRC Group D Complete Course",
  //   description:
  //     "Prepare for RRC Group D with topic-wise learning modules, revision support, and exam-oriented coverage.",
  //   thumbnail: "/rrc-group-D.png",
  //   thumbnailAlt: "RRC Group D Complete Course thumbnail",
  //   category: "Railway Exams",
  //   level: "Intermediate",
  //   slug: "rrc-group-d-complete",
  //   fullDescription:
  //     "Complete preparation course for RRC Group D examination covering all subjects with detailed explanations.",
  //   seasons: [
  //     {
  //       id: "season-1",
  //       title: "Season 1",
  //       videos: [
  //         {
  //           id: "ep-01",
  //           episodeNumber: "EP-01",
  //           title: "RRC Group D Overview 🚂 & Preparation Strategy",
  //           description: "Complete overview of RRC Group D exam and effective preparation strategies.",
  //           youtubeId: "W6NZfCO5SIk",
  //           duration: "18:45",
  //           completed: false,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: "course-general-science-masterclass",
  //   title: "General Science Masterclass",
  //   description:
  //     "Strengthen your General Science preparation through concise lessons, visual explanations, and targeted exam practice.",
  //   thumbnail: "/govt-exam.png",
  //   thumbnailAlt: "General Science Masterclass thumbnail",
  //   category: "Subject Course",
  //   level: "All Levels",
  //   slug: "general-science-masterclass",
  //   fullDescription:
  //     "Master General Science with this comprehensive course covering Physics, Chemistry, and Biology topics.",
  //   seasons: [
  //     {
  //       id: "season-1",
  //       title: "Season 1",
  //       videos: [
  //         {
  //           id: "ep-01",
  //           episodeNumber: "EP-01",
  //           title: "Introduction to General Science 📚 & Study Plan",
  //           description: "Learn how to approach General Science preparation systematically.",
  //           youtubeId: "uDwSnnhl-Ng",
  //           duration: "20:00",
  //           completed: false,
  //         },
  //       ],
  //     },
  //   ],
  // },
];
