import { Link, useLocation } from "react-router-dom";
import { mockData } from "./mockData";

const CategoryPage = () => {
  const location = useLocation();

  // Grab everything after `/test-category`
  const pathSegments = location.pathname
    .replace("/test-category", "")
    .split("/")
    .filter(Boolean);

  // Start at top-level categories
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

  // Root level (/test-category) → show all top-level categories
  const isRoot = pathSegments.length === 0;

  return (
    <div style={{ padding: "20px" }}>
      {/* Root level → show Engineering, Medical, etc. */}
      {isRoot && (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {Object.values(mockData.categories).map((cat) => (
            <Link
              key={cat.id}
              to={`/test-category/${cat.slug}`}
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                borderRadius: "8px",
                textDecoration: "none",
                width: "200px",
              }}
            >
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Subcategories */}
      {!isRoot && current.subcategories && (
        <div>
          <h2>Subcategories</h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {Object.values(current.subcategories).map((sub) => (
              <Link
                key={sub.id}
                to={`/test-category/${[...pathSegments, sub.slug].join("/")}`}
                style={{
                  border: "1px solid #ddd",
                  padding: "16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  width: "200px",
                }}
              >
                <h3>{sub.name}</h3>
                <p>{sub.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tests */}
      {!isRoot && current.tests && (
        <div>
          <h2>Tests</h2>
          <ul>
            {current.tests.map((test) => (
              <li key={test.id}>
                {test.name} ({test.difficulty})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
