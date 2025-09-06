import { Link } from "react-router";
import LiveIndicator from "../utils/LiveIndecator";
import { useTranslation } from "react-i18next";

const icons = {
  play: (className = "h-7 w-7") => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        className="stroke-red-500"
        strokeWidth="1.8"
      />
      <path d="M10 9.5 16 12 10 14.5Z" className="fill-red-500" />
    </svg>
  ),
  clipboard: (className = "h-7 w-7") => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="7"
        y="5"
        width="10"
        height="14"
        rx="2"
        className="stroke-green-500"
        strokeWidth="1.8"
      />
      <path d="M9 5.5h6" className="stroke-green-500" strokeWidth="1.8" />
      <rect
        x="10"
        y="3"
        width="4"
        height="4"
        rx="1"
        className="stroke-green-500"
        strokeWidth="1.8"
      />
    </svg>
  ),
  quiz: (className = "h-7 w-7") => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        className="stroke-purple-500"
        strokeWidth="1.8"
      />
      <path
        d="M9.5 9.5a2.5 2.5 0 1 1 4.3 1.7c-.7.7-1.3 1.1-1.3 2.3"
        className="stroke-purple-500"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="17" r="1" className="fill-purple-500" />
    </svg>
  ),
  doc: (className = "h-7 w-7") => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 3h7l4 4v14H7z"
        className="stroke-yellow-500"
        strokeWidth="1.8"
      />
      <path d="M14 3v5h5" className="stroke-yellow-500" strokeWidth="1.8" />
      <path
        d="M9.5 12H15M9.5 15.5H15"
        className="stroke-yellow-600"
        strokeWidth="1.8"
      />
    </svg>
  ),
  refresh: (className = "h-7 w-7") => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 12a8 8 0 1 1-2.3-5.7"
        className="stroke-pink-500"
        strokeWidth="1.8"
      />
      <path d="M20 5v5h-5" className="stroke-pink-500" strokeWidth="1.8" />
    </svg>
  ),
  article: (className = "h-7 w-7") => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        className="stroke-blue-500"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 8.5H15.5M8.5 12H15.5M8.5 15.5h6"
        className="stroke-blue-500"
        strokeWidth="1.8"
      />
    </svg>
  ),
};

function Badge({ type, children }) {
  const styles =
    type === "free" ? "bg-green-600 text-white" : "bg-orange-600 text-white";
  const label = children || (type === "free" ? "FREE" : "NEW");
  return (
    <span
      className={
        "absolute -top-1.5 -right-1.5 rounded-md px-2 py-0.5 text-[10px] font-semibold leading-none shadow-sm " +
        styles
      }
      aria-label={typeof label === "string" ? label : "badge"}
    >
      {label}
    </span>
  );
}

function FeatureItem({
  href = "#",
  target,
  label,
  icon = "play",
  badge,
  isLive,
  bgColor,
}) {
  return (
    <li className="md:border-l border-slate-200 first:md:border-l-0">
      <Link
        to={href}
        target={target ?? "_self"}
        rel="noopener noreferrer"
        className="group flex h-full text-center flex-col items-center justify-center gap-3 px-3 py-4 md:px-6 md:py-6 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
      >
        <div className="relative">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full  ${bgColor} ring-1 ring-inset ring-blue-100 transition-transform duration-200 group-hover:scale-105`}
          >
            {icons[icon]?.() || icons.play()}
            <span className="sr-only ">{label} icon</span>
          </div>
          {badge ? (
            <Badge type={badge === "FREE" ? "free" : "new"}>{badge}</Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {isLive ? (
            <span>
              <LiveIndicator size="sm" />
            </span>
          ) : null}
          <span className="text-sm font-medium text-slate-600">{label}</span>
        </div>
      </Link>
    </li>
  );
}

export default function FeaturesRibbon() {
  const { t } = useTranslation();
  const items = [
    {
      label: t("liveClasses"),
      icon: "play",
      badge: t("free"),
      href: "https://www.youtube.com/@ExamRojgaar",
      target: "_blank",
      isLive: true,
      bgColor: "bg-red-100",
    },
    {
      label: t("liveTest"),
      icon: "clipboard",
      bgColor: "bg-green-100",
      badge: t("free"),
      href: "/test-category",
      isLive: true,
    },
    {
      label: t("freeQuizzes"),
      icon: "quiz",
      bgColor: "bg-purple-100",
      badge: t("new"),
      href: "/quiz-category",
    },
    {
      label: t("prevYearPapers"),
      icon: "doc",
      bgColor: "bg-yellow-100",
      href: "/test-category/rrb/rrb-ntpc",
    },
    {
      label: t("tests"),
      icon: "refresh",
      href: "/test-category/rrb/rrb-ntpc",
      bgColor: "bg-pink-100",
    },
    {
      label: t("gk_ca"),
      icon: "article",
      href: "/test-category/rrb/rrb-ntpc",
      bgColor: "bg-blue-100",
    },
  ];
  return (
    <section
      aria-label="Feature menu"
      //   className="mx-auto w-full max-w-6xl px-3 sm:px-4"
      className="py-4"
    >
      <div className="md:rounded-2xl bg-white shadow-none ring-1 ring-slate-200 ">
        <ul
          role="list"
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 "
        >
          {items.map((item, idx) => (
            <FeatureItem key={idx} {...item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
