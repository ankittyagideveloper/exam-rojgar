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
    title: "RRB NTPC Foundation Course",
    description:
      "Build strong fundamentals for RRB NTPC with concept-focused lessons, practice support, and structured preparation guidance.",
    thumbnail: "/rrb-ntpc.webp",
    thumbnailAlt: "RRB NTPC Foundation Course thumbnail",
    category: "Railway Exams",
    level: "Beginner",
    slug: "rrb-ntpc-foundation",
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
  // },
];
