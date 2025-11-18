// import { useState } from "react";
// import { Document, Page } from "react-pdf";
// import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// export default function PDF_Page() {
//   const [numPages, setNumPages] = useState();
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document
//         file="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test/second-cdn.pdf"
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
import "../App.css";

import { Download, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";

const pdfCategories = [
  {
    subject: "Important Notifications",
    papers: [
      {
        year: "",
        paper: "Final-CEN-06-2025-21-10-2025-Publish-1-1",
        link: "https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test/second-cdn.pdf",
      },
    ],
  },
  {
    subject: "Aptitude",
    papers: [
      {
        year: "",
        paper: "Quantitative Aptitude for Competitive Exam by R.S Aggrawal.pdf",
        link: "https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test/Quantitative-Aptitude-for-Competitive-Exam-by-rs-Aggrawal-compressed.pdf",
      },
    ],
  },
];
export default function PDF_Page() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>PDF Page - Exam Rojgaar</title>
        <meta
          name="description"
          content="Access comprehensive study materials by subject"
        />

        {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Exam Rojgaar PDF Page" />
        <meta
          property="og:description"
          content="Access comprehensive study materials for competitive exams."
        />
        <meta
          property="og:image"
          content="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.0/logo.png" // <-- Put your actual logo URL
        />
        <meta
          property="og:url"
          content="https://examrojgaar.netlify.app/pdf-category"
        />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exam Rojgaar PDF Page" />
        <meta
          name="twitter:description"
          content="Access comprehensive study materials for competitive exams."
        />
        <meta
          name="twitter:image"
          content="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.0/logo.png" // <-- Same or another image
        />
      </Helmet>

      <section className="bg-gradient-to-br from-[#0ad0f4] to-blue-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
              Important PDF'S
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto text-balance">
              Access comprehensive study materials by subject
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 ">
            {pdfCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleExpand(categoryIndex)}
                  className="w-full p-6 flex items-center justify-between  transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-[#0ad0f4]" size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-left">
                      {category.subject}
                    </h3>
                  </div>
                  <span
                    className={`text-slate-400 transition-transform ${
                      expanded[categoryIndex] ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {expanded[categoryIndex] && (
                  <div className="border-t border-slate-200 p-4 space-y-2">
                    {category.papers.map((paper, paperIndex) => (
                      <a
                        target="_blank"
                        key={paperIndex}
                        href={paper.link}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg  transition-colors group"
                      >
                        <span className="text-sm text-slate-700 group-hover:text-[#0ad0f4] transition-colors">
                          {paper.year} {paper.paper}
                        </span>
                        <Download
                          size={16}
                          className="text-slate-400 group-hover:text-[#0ad0f4] transition-colors"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600">
              Total: {pdfCategories.length} subjects |{" "}
              {pdfCategories.reduce((sum, cat) => sum + cat.papers.length, 0)}{" "}
              papers available
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
