import React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";

import { PDFViewer } from "@react-pdf/renderer";

const PDF_Page = () => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages);
  }
  return (
    // <PDFViewer width="100%" height="600">
    //   <Document
    //     file="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test/second-cdn.pdf"
    //     onLoadSuccess={onDocumentLoadSuccess}
    //   >
    //     <Page pageNumber={pageNumber} />
    //   </Document>
    //   <p>
    //     Page {pageNumber} of {numPages}
    //   </p>
    //   <button
    //     onClick={() => setPageNumber((prevPage) => Math.max(prevPage - 1, 1))}
    //   >
    //     Prev
    //   </button>
    //   <button
    //     onClick={() =>
    //       setPageNumber((prevPage) => Math.min(prevPage + 1, numPages))
    //     }
    //   >
    //     Next
    //   </button>
    // </PDFViewer>
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
