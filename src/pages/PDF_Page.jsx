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

import { Download, FileText, BookOpen, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

const pdfCategories = [
  {
    subject: "General Knowledge",
    papers: [
      {
        year: "2026",
        paper: "Lucent GK 2026 18th Edition Hindi Medium",
        link: "https://drive.google.com/file/d/1P3Lgt_iWcjG1c-KjlKVa7p2B4nT5PcIM/view?usp=sharing",
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
        <title>Free Study PDFs – Aptitude, GK & Exam Notes | Exam Rojgaar</title>
        <meta
          name="description"
          content="Download free study PDFs for RRB NTPC, SSC and Banking exams. Includes R.S. Aggarwal Quantitative Aptitude, official notifications and more."
        />
        <link rel="canonical" href="https://examrojgaar.com/pdf-category" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Study PDFs for Competitive Exams | Exam Rojgaar" />
        <meta property="og:description" content="Download free PDFs for RRB, SSC and Banking exam preparation – aptitude books, GK notes and official notifications." />
        <meta property="og:image" content="https://examrojgaar.com/apple-touch-icon.png" />
        <meta property="og:url" content="https://examrojgaar.com/pdf-category" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Study PDFs | Exam Rojgaar" />
        <meta name="twitter:description" content="Download free PDFs for RRB, SSC and Banking exams." />
        <meta name="twitter:image" content="https://examrojgaar.com/apple-touch-icon.png" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d5fa0] via-[#1272ba] to-[#1a4fd6] py-16 md:py-24">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#FF7D07]/10 blur-3xl" />
        {/* top accent bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1272ba] via-[#FF7D07] to-[#1272ba]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* pill badge */}
          <span className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-semibold text-white/90 backdrop-blur-sm">
            <BookOpen size={12} />
            Free Study Resources
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance leading-tight">
            Important{" "}
            <span className="relative inline-block">
              PDF's
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-[#FF7D07]/80" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-xl mx-auto text-balance mt-6">
            Download free study materials — available anytime, anywhere.
          </p>

          {/* stat pills */}
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-sm font-medium">
              <FileText size={14} className="text-[#FF7D07]" />
              {pdfCategories.length} Subjects
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-sm font-medium">
              <Download size={14} className="text-[#FF7D07]" />
              {pdfCategories.reduce((sum, cat) => sum + cat.papers.length, 0)} PDFs Available
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Cards ────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {pdfCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="group relative bg-card text-card-foreground rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:shadow-[#1272ba]/10 hover:border-[#1272ba]/30 transition-all duration-300"
              >
                {/* top accent line — visible on hover */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#1272ba] via-[#FF7D07] to-[#1272ba] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <button
                  onClick={() => toggleExpand(categoryIndex)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-[#1272ba]/10 to-[#FF7D07]/10 dark:from-[#1272ba]/20 dark:to-[#FF7D07]/20 border border-[#1272ba]/20 dark:border-[#1272ba]/30 flex items-center justify-center">
                      <FileText className="text-[#1272ba]" size={20} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-base text-foreground group-hover:text-[#1272ba] transition-colors duration-200">
                        {category.subject}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {category.papers.length}{" "}
                        {category.papers.length === 1 ? "file" : "files"} available
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
                      expanded[categoryIndex] ? "rotate-180 text-[#1272ba]" : ""
                    }`}
                  />
                </button>

                {expanded[categoryIndex] && (
                  <div className="border-t border-border px-5 py-3 space-y-2">
                    {category.papers.map((paper, paperIndex) => (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        key={paperIndex}
                        href={paper.link}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/60 hover:bg-[#1272ba]/5 dark:hover:bg-[#1272ba]/15 border border-transparent hover:border-[#1272ba]/20 transition-all duration-200 group/row"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 shrink-0 rounded-lg bg-[#FF7D07]/10 dark:bg-[#FF7D07]/20 flex items-center justify-center">
                            <FileText size={13} className="text-[#FF7D07]" />
                          </div>
                          <span className="text-sm text-foreground group-hover/row:text-[#1272ba] transition-colors truncate">
                            {paper.year && (
                              <span className="font-semibold text-[#1272ba] mr-1.5">
                                {paper.year}
                              </span>
                            )}
                            {paper.paper}
                          </span>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1272ba]/8 dark:bg-[#1272ba]/20 text-[#1272ba] text-xs font-medium opacity-0 group-hover/row:opacity-100 transition-opacity">
                          <Download size={12} />
                          <span>Open</span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
