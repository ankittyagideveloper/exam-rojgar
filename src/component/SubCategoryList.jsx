// SubCategoryList.tsx
import { useSearchParams } from "react-router-dom";
import { subcategories } from "../data";

export default function SubCategoryList() {
  const [searchParams] = useSearchParams();
  const catId = Number(searchParams.get("catid"));
  const subcats = subcategories[catId] || [];

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {subcats.length > 0 ? (
        subcats.map((sub) => (
          <div
            key={sub.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <img src={sub.image} alt={sub.title} style={{ width: "150px" }} />
            <h3>{sub.title}</h3>
          </div>
        ))
      ) : (
        <p>No tests found for this category.</p>
      )}
    </div>
  );
}
