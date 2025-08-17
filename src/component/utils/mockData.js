export const mockData = {
  categories: {
    engineering: {
      id: "engineering",
      name: "Engineering",
      slug: "engineering",
      description: "Technical and engineering exams",
      subcategories: {
        "computer-science": {
          id: "computer-science",
          name: "Computer Science",
          slug: "computer-science",
          description: "Programming and CS fundamentals",
          tests: [
            {
              id: "ds-algo",
              name: "Data Structures & Algorithms",
              difficulty: "Hard",
            },
            {
              id: "system-design",
              name: "System Design",
              difficulty: "Expert",
            },
          ],
          subsubcategories: {
            programming: {
              id: "programming",
              name: "Programming Languages",
              slug: "programming",
              tests: [
                {
                  id: "javascript-basics",
                  name: "JavaScript Fundamentals",
                  difficulty: "Medium",
                },
                {
                  id: "react-advanced",
                  name: "Advanced React",
                  difficulty: "Hard",
                },
              ],
            },
          },
        },
        mechanical: {
          id: "mechanical",
          name: "Mechanical Engineering",
          slug: "mechanical",
          description: "Mechanical engineering concepts",
          tests: [
            {
              id: "thermodynamics",
              name: "Thermodynamics",
              difficulty: "Medium",
            },
            {
              id: "fluid-mechanics",
              name: "Fluid Mechanics",
              difficulty: "Hard",
            },
          ],
        },
      },
    },
    medical: {
      id: "medical",
      name: "Medical",
      slug: "medical",
      description: "Medical and healthcare exams",
      subcategories: {
        neet: {
          id: "neet",
          name: "NEET Preparation",
          slug: "neet",
          description: "National Eligibility Entrance Test",
          tests: [
            {
              id: "biology-neet",
              name: "Biology for NEET",
              difficulty: "Hard",
            },
            {
              id: "chemistry-neet",
              name: "Chemistry for NEET",
              difficulty: "Hard",
            },
          ],
        },
      },
    },
  },
};
