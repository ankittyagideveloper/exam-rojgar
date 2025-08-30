import React from "react";
import { Outlet } from "react-router-dom";

const TestLayout = () => {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Outlet /> {/* No Header / No Footer */}
    </main>
  );
};

export default TestLayout;
