import { Link } from "react-router-dom";

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const QUICK_LINKS = [
  { label: "Home", to: "/home" },
  { label: "Test Series", to: "/online-test-series" },
  { label: "Free Tests", to: "/free-tests" },
  { label: "Quiz", to: "/quiz-category" },
  { label: "Study Material", to: "/pdf-category" },
  { label: "Courses", to: "/learn" },
];

const EXAMS = [
  { label: "RRB NTPC", to: "/online-test-series" },
  { label: "RRB JE", to: "/online-test-series" }
];

const COMMUNITY = [
  {
    label: "YouTube Channel",
    href: "https://www.youtube.com/@ExamRojgaar",
    icon: <YoutubeIcon />,
    color: "group-hover:text-[#FF0000]",
  },
  {
    label: "Telegram Group",
    href: "https://t.me/ExamRojgaar",
    icon: <TelegramIcon />,
    color: "group-hover:text-[#2AABEE]",
  },
  {
    label: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029VbAqJ1MHLHQV47i0lI3u",
    icon: <WhatsAppIcon />,
    color: "group-hover:text-[#25D366]",
  },
];

const SOCIALS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ExamRojgaar",
    icon: <YoutubeIcon />,
    hoverBg: "hover:bg-[#FF0000]",
  },
  {
    label: "Telegram",
    href: "https://t.me/ExamRojgaar",
    icon: <TelegramIcon />,
    hoverBg: "hover:bg-[#2AABEE]",
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VbAqJ1MHLHQV47i0lI3u",
    icon: <WhatsAppIcon />,
    hoverBg: "hover:bg-[#25D366]",
  },
];

const Footer = () => {
  return (
    // hidden on mobile & tablet, shown only on lg+
    // -mx-4 cancels the md:px-4 parent padding so footer is flush edge-to-edge
    // mt-8 adds top gap from testimonials section
    <footer className="hidden lg:block -mx-4 mt-8 bg-white/60 dark:bg-black/60 backdrop-blur-md text-slate-800 dark:text-neutral-200 border-t border-slate-200/80 dark:border-neutral-800/40">
      <div className="max-w-6xl mx-auto px-8 pt-12 pb-8">
        <div className="grid grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="space-y-5">
            <Link to="/home" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-white/5 flex items-center justify-center overflow-hidden border border-slate-200/80 dark:border-white/10 shrink-0 shadow-sm">
                <img
                  src="/examrojgar-logo-s.png"
                  alt="Exam Rojgaar logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-[15px] text-slate-900 dark:text-white leading-tight">Exam Rojgaar</p>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-none mt-0.5">Test Series</p>
              </div>
            </Link>

            <p className="text-[13px] text-slate-600 dark:text-neutral-400 leading-relaxed">
              India's Railway exam prep platform. RRB NTPC, JE, ALP & Group D mock tests, PYQs, and smart performance tracking — all in one place.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map(({ label, href, icon, hoverBg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-8 h-8 rounded-lg bg-slate-200/50 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-neutral-400 hover:text-white dark:hover:text-white ${hoverBg} transition-all duration-200 shadow-sm`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[13px] text-slate-600 hover:text-[#1272ba] dark:text-neutral-400 dark:hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exams */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-4">
              Exams We Cover
            </p>
            <ul className="space-y-2">
              {EXAMS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[13px] text-slate-600 hover:text-[#1272ba] dark:text-neutral-400 dark:hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-4">
              Join Community
            </p>
            <ul className="space-y-3">
              {COMMUNITY.map(({ label, href, icon, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-[13px] text-slate-600 dark:text-neutral-400 hover:text-[#1272ba] dark:hover:text-white transition-colors duration-150"
                  >
                    <span className={`transition-colors duration-150 ${color}`}>
                      {icon}
                    </span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200/80 dark:border-neutral-800/40 mt-10 pt-5 flex items-center justify-between">
          <p className="text-[12px] text-slate-400 dark:text-neutral-500">
            © {new Date().getFullYear()} Exam Rojgaar. All rights reserved.
          </p>
          <p className="text-[12px] text-slate-400 dark:text-neutral-500">
            Crack your Railway exam with confidence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
