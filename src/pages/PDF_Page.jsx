import React from "react";
import { useState } from "react";

const PDF_Page = () => {
  return (
    <a
      target="_blank"
      href="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test/second-cdn.pdf"
      download="second-cdn.pdf"
    >
      <button className="w-full gap-2" size="lg">
        Final-CEN-06-2025-21-10-2025-Publish-1-1
      </button>
    </a>
  );
};

export default PDF_Page;
