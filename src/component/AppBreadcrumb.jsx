import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Human-readable labels for known path segments
const SEGMENT_LABELS = {
  home: "Home",
  learn: "Courses",
  "online-test-series": "Test Series",
  "rrb":"RRB",
  "rrb-ntpc":"RRB NTPC",
  "rrc":"RRC",
  "quiz-category": "Quiz",
  "pdf-category": "PDFs",
  "attempted-tests": "Attempted Tests",
  admin: "Admin",
  tests: "Tests",
  "question-bank": "Question Bank",
  questions: "Questions",
  settings: "Settings",
  preview: "Preview",
  "mock-test": "Mock Tests",
  "all-test": "All Tests",
  "all-quiz": "All Quiz",
  attempt: "Attempt",
  result: "Result",
  "target-series": "Target Series",
};

// Segments that look like IDs — skip labelling them with prettification
const SKIP_SEGMENTS = new Set(["attempt"]);

function prettify(segment) {
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getLabel(segment) {
  return SEGMENT_LABELS[segment] ?? prettify(segment);
}

// Pages where breadcrumb should not render
const HIDDEN_PATHS = ["/home", "/"];

export default function AppBreadcrumb() {
  const { pathname } = useLocation();

  if (HIDDEN_PATHS.includes(pathname)) return null;

  const segments = pathname.split("/").filter(Boolean);

  // Build crumb list: [ { label, path } ]
  const crumbs = [
    { label: "Home", path: "/home" },
    ...segments.map((seg, i) => ({
      label: getLabel(seg),
      path: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <div className="px-4 py-2 border-b border-[#DFE4E8] dark:border-[#262626] bg-white dark:bg-neutral-900">
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={crumb.path} className="inline-flex items-center gap-1.5">
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-[#1272ba]">{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className="text-gray-700" asChild>
                      <Link to={crumb.path}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
