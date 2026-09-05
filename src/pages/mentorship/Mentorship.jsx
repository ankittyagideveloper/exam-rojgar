import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
// import mentorImg from "@/assets/mentor.jpg";
import React from 'react';
import './styles.css'
import { useUser } from "@clerk/clerk-react";
import { testimonials } from "@/constants";
import BottomNavigation from "@/component/BottomNavigation";
import { Button } from "@/components/ui";

export const YoutubeIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TARGET_SERIES = "/online-test-series/rrb/rrb-ntpc";
const APPLY_URL = "#program";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const toggle = () => {
    i18n.changeLanguage(current === "en" ? "hi" : "en");
  };

  return (
    <Button
      onClick={toggle}
      aria-label="Switch language"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-surface-2 font-mono text-xs font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:h-9 sm:w-9"
      title={current === "en" ? "Switch to Hindi" : "English पर स्विच करें"}
    >
      {current === "en" ? "अ" : "A"}
    </Button>
  );
}

function CursorShadow() {
  const ref = useRef(null);

  useEffect(() => {
    const update = (e) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--cursor-x", `${e.clientX}px`);
      el.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 cursor-shadow"
      aria-hidden="true"
      style={{ opacity: 0.75 }}
    />
  );
}

function Landing() {
  const [dark, setDark] = useState(false);
  const { hash } = useLocation();
  const { user } = useUser();
  const isPaid = user?.publicMetadata?.roles?.includes("premium");
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    // Defer scroll until after the full render pass settles
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);
  return (
    <div className={`mentorship-page${dark ? " dark" : ""} relative min-h-screen overflow-x-hidden bg-background`}>
      <div className="pointer-events-none fixed inset-0 aurora" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 grid-canvas opacity-60" aria-hidden="true" />
      <CursorShadow />

      <Header dark={dark} onToggle={() => setDark((d) => !d)} isPaid={isPaid} />

      <main className="relative pt-24">
        <Hero />
        <Marquee />
        <Mission />
        <Program isPaid={isPaid} />
        <Process />
        <Structure />
        <Mentor />
        <Why />
        <Reviews />
        <Faqs />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}


function Header({ dark, onToggle, isPaid }) {
  const { t } = useTranslation();

  const NAV = [
    { label: t("mentorship.nav.overview"), href: "#mission" },
    { label: t("mentorship.nav.whatYouGet"), href: "#program" },
    { label: t("mentorship.nav.howItWorks"), href: "#process" },
    { label: t("mentorship.nav.faqs"), href: "#faqs" },
    { label: "Youtube", href: "https://www.youtube.com/@ExamRojgaar", icon: <YoutubeIcon size={18} />, target: "_blank" },
  ];

  return (
    <header className="fixed top-3 left-3 right-3 z-50 rounded-2xl border border-black/8 bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-2xl backdrop-saturate-200 ring-1 ring-black/5">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3 sm:h-16 sm:px-5">
        <Link className="flex items-center gap-2 sm:gap-3 min-w-0" to="/">
          <div className="w-9 h-9 shrink-0 bg-gray-100 border border-border rounded-full flex items-center justify-center sm:w-12 sm:h-12">
            <img src="/logo.png" alt="examrojgar-logo" className="grid size-8 place-items-center rounded-xl bg-accent font-mono text-sm font-bold text-accent-foreground shadow-glow sm:size-10" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight sm:text-lg">
            Exam Rojgaar
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.icon && <span className="text-[#FF0000]">{item.icon}</span>}
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Button
            onClick={onToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-surface-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:h-9 sm:w-9"
          >
            {dark ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </Button>
          {isPaid ?
            <Link
              to={TARGET_SERIES}
              className="rounded-full bg-primary/90 px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] backdrop-blur-sm shadow-md whitespace-nowrap sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {t("mentorship.header.targetSeries")}
            </Link>
            :
            <a
              href={APPLY_URL}
              className="rounded-full bg-primary/90 px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] backdrop-blur-sm shadow-md whitespace-nowrap sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {t("mentorship.header.applyNow")}
            </a>
          }
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 md:pt-18">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald animate-pulse-dot" />
            {t("mentorship.hero.batchLabel")}
            <span className="text-border">•</span>
            <span className="text-rose">{t("mentorship.hero.limitedSeats")}</span>
          </div>

          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            {t("mentorship.hero.title1")}
            <br />
            <span className="text-gradient">{t("mentorship.hero.title2")} </span>
            <br />{t("mentorship.hero.title3")}
          </h1>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#program"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              {t("mentorship.hero.ctaPrimary")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#faqs"
              className="inline-flex items-center rounded-full border border-border bg-surface-2 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              {t("mentorship.hero.ctaSecondary")}
            </a>
          </div>
        </div>

        <div className="relative mask-b-from-60% mask-radial-[60%_60%] mask-radial-from-70% scale-110">
          <img
            src="/profile-mentor.png"
            alt="Gopal Sir - Exam Rojgaar Mentor"
            loading="lazy"
            width={912}
            height={1104}
            className="h-full w-full object-cover"
          />
          {/* circular shadow at bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 h-10 w-3/4 rounded-full bg-black/20 blur-2xl" />
        </div>
      </div>
    </section>
  );
}

function CodeCard() {
  const lines = [
    [
      { t: "// Upgrading to a 10x engineer", c: "text-muted-foreground" },
    ],
    [
      { t: "const ", c: "text-violet" },
      { t: "mentee", c: "text-cyan" },
      { t: " = ", c: "text-muted-foreground" },
      { t: "new ", c: "text-violet" },
      { t: "Engineer();", c: "text-foreground" },
    ],
    [
      { t: "await ", c: "text-violet" },
      { t: "mentee", c: "text-cyan" },
      { t: ".unlearn(", c: "text-foreground" },
      { t: '"Tutorial Hell"', c: "text-emerald" },
      { t: ");", c: "text-foreground" },
    ],
    [
      { t: "mentee", c: "text-cyan" },
      { t: ".inject(", c: "text-foreground" },
      { t: '"System Design"', c: "text-emerald" },
      { t: ");", c: "text-foreground" },
    ],
  ];

  return (
    <div className="relative animate-float">
      <div className="overflow-hidden rounded-2xl glass-card">
        <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
          <span className="size-3 rounded-full bg-rose" />
          <span className="size-3 rounded-full bg-chart-5" />
          <span className="size-3 rounded-full bg-emerald" />
          <span className="flex-1 text-center font-mono text-xs text-muted-foreground">
            system-design.tsx
          </span>
        </div>
        <pre className="overflow-x-auto bg-code px-5 py-6 font-mono text-[13px] leading-7">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-4 shrink-0 select-none text-right text-muted-foreground/50">
                {i + 1}
              </span>
              <span>
                {line.map((tok, j) => (
                  <span key={j} className={tok.c}>
                    {tok.t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      </div>

      <div className="absolute -bottom-10 -left-4 flex items-center gap-3 rounded-xl glass-card px-4 py-3 sm:-left-8">
        <span className="size-2.5 rounded-full bg-emerald animate-pulse-dot" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Chalo Selection
          </p>
          <p className="font-mono text-sm font-semibold">Pakka Kartey hai</p>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const MARQUEE = [
    "RRB NTPC 2026",
    "GS / GK",
    "Mathematics",
    "Reasoning",
    "PYQs",
    "Mock Tests",
    "Doubt Sessions",
    "Target Series",
  ];
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-border/60 py-6">
      <div className="flex w-max animate-marquee gap-14 pr-14">
        {items.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-xl font-bold uppercase tracking-tight text-muted-foreground/45 sm:text-2xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet">
      {children}
    </p>
  );
}

function Mission() {
  const { t } = useTranslation();
  const cards = t("mentorship.mission.cards", { returnObjects: true });
  return (
    <section id="mission" className="mx-auto max-w-6xl px-5 py-24">
      <SectionLabel>{t("mentorship.mission.label")}</SectionLabel>
      <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {t("mentorship.mission.heading")}
      </h2>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((m, i) => (
          <article key={i} className="rounded-2xl glass-card p-7">
            <span className="font-mono text-xs text-violet">0{i + 1}</span>
            <h3 className="mt-4 font-display text-xl font-semibold">{m.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}


function RazorpayButton({ id }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", id);
    script.async = true;
    container.appendChild(script);

    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return <form ref={containerRef} />

}




function Program({ isPaid }) {
  const { t } = useTranslation();
  const features = t("mentorship.program.plan.features", { returnObjects: true });
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-24">
      <div className="text-center">
        <SectionLabel>{t("mentorship.program.label")}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("mentorship.program.heading")}
        </h2>
        <p id="program" className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          {t("mentorship.program.subheading")}
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-2">
        <article className="relative rounded-2xl p-5 sm:rounded-3xl sm:p-8 glass-card ring-1 ring-accent/60 shadow-glow">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground whitespace-nowrap sm:left-auto sm:right-8 sm:translate-x-0">
            {t("mentorship.program.mostSelected")}
          </span>
          <h3 className="font-display text-xl font-bold leading-snug sm:text-2xl">
            {t("mentorship.program.plan.name")}
          </h3>
          <p className="mt-1 text-sm text-violet">{t("mentorship.program.plan.tag")}</p>

          <p className="mt-5 flex items-baseline gap-1.5 sm:mt-6">
            <span className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              ₹399
            </span>
            <span className="text-sm text-muted-foreground">{t("mentorship.program.plan.unit")}</span>
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-5">
            {t("mentorship.program.plan.blurb")}
          </p>

          <ul className="mt-6 space-y-3 sm:mt-7">
            {features.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-0.5 shrink-0 text-emerald">✓</span>
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>

          {isPaid ? <Link
            to={TARGET_SERIES}
            className="mt-8 block w-full rounded-full bg-primary/90 px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] backdrop-blur-sm shadow-md sm:mt-10 sm:max-w-md"
          >
            {t("mentorship.header.targetSeries")}
          </Link> : <div className="mt-8 w-full sm:mt-10 sm:max-w-md"><RazorpayButton id="pl_TS4AN7R2A24QKQ" /></div>}
        </article>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useTranslation();
  const steps = t("mentorship.process.steps", { returnObjects: true });
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>{t("mentorship.process.label")}</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {t("mentorship.process.heading")}
        </h2>
      </div>

      <ol className="mt-14 grid gap-5 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={i} className="relative rounded-2xl glass-card p-6">
            <span className="grid size-10 place-items-center rounded-xl bg-secondary font-mono text-sm font-bold text-violet">
              {i + 1}
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Structure() {
  const { t } = useTranslation();
  const lc = t("mentorship.structure.learnComplete", { returnObjects: true });
  const pt = t("mentorship.structure.practiceTest", { returnObjects: true });
  const ds = t("mentorship.structure.doubtSolving", { returnObjects: true });
  const ai = t("mentorship.structure.analyseImprove", { returnObjects: true });
  const mh = t("mentorship.structure.mockHighlight", { returnObjects: true });

  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="rounded-3xl glass-card p-8 sm:p-12">
        <SectionLabel>{t("mentorship.structure.label")}</SectionLabel>

        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t("mentorship.structure.heading")}
        </h2>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t("mentorship.structure.subheading")}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Learn & Complete */}
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">{lc.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{lc.body}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {lc.items.map((item, i) => <li key={i}>• {item}</li>)}
            </ul>
          </div>

          {/* Practice & Test */}
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">{pt.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{pt.body}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {pt.items.map((item, i) => <li key={i}>• {item}</li>)}
            </ul>
          </div>

          {/* Doubt Solving */}
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">{ds.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{ds.body}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {ds.items.map((item, i) => <li key={i}>• {item}</li>)}
            </ul>
          </div>

          {/* Analyse & Improve */}
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">{ai.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{ai.body}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {ai.items.map((item, i) => <li key={i}>• {item}</li>)}
            </ul>
          </div>
        </div>

        {/* Mock Test Highlight */}
        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-semibold">{mh.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{mh.body}</p>
            </div>
            <span className="shrink-0 rounded-full bg-accent px-4 py-2 font-mono text-xs font-semibold text-accent-foreground">
              {mh.badge}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mentor() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">

        {/* Mentor Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl glass-card">
            <img
              src="/profile-mentor.png"
              alt="Gopal Sir - Exam Rojgaar Mentor"
              loading="lazy"
              width={912}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
          {/* circular shadow at bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 h-10 w-3/4 rounded-full bg-black/20 blur-2xl" />

          <div className="absolute -bottom-5 left-6 rounded-2xl glass-card px-5 py-4">
            <p className="font-display text-base font-semibold">
              Gopal Sir
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {t("mentorship.mentor.designation1")}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {t("mentorship.mentor.designation2")}
            </p>
          </div>
        </div>

        {/* Mentor Content */}
        <div>
          <SectionLabel>{t("mentorship.mentor.label")}</SectionLabel>

          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t("mentorship.mentor.heading1")}{" "}
            <span className="text-gradient">
              {t("mentorship.mentor.heading2")}
            </span>
            .
          </h2>

          <blockquote className="mt-8 border-l-2 border-accent pl-5 font-mono text-sm leading-7 text-muted-foreground">
            target === clear
            <br />
            preparation === consistent
            <br />
            result === possible
          </blockquote>

          <p className="mt-7 leading-relaxed text-muted-foreground">
            {t("mentorship.mentor.bio1")}
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            {t("mentorship.mentor.bio2")}
          </p>

          <div className="mt-9 flex gap-10">
            <div>
              <p className="font-display text-3xl font-extrabold text-gradient">
                {t("mentorship.mentor.stat1Value")}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {t("mentorship.mentor.stat1Label")}
              </p>
            </div>

            <div>
              <p className="font-display text-3xl font-extrabold text-gradient">
                {t("mentorship.mentor.stat2Value")}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {t("mentorship.mentor.stat2Label")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function Why() {
  const { t } = useTranslation();
  const cards = t("mentorship.why.cards", { returnObjects: true });
  // wide pattern: indices 0, 4, 5 are wide (matching original WHY array)
  const wideIndices = new Set([0, 4, 5]);
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>{t("mentorship.why.label")}</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {t("mentorship.why.heading1")} <span className="text-gradient">{t("mentorship.why.heading2")}</span> {t("mentorship.why.heading3")}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {cards.map((item, i) => (
          <article
            key={i}
            className={`rounded-2xl glass-card p-7 ${wideIndices.has(i) ? "md:col-span-2" : ""}`}
          >
            <h3 className="font-display text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}



function Reviews() {
  const { t } = useTranslation();
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>{t("mentorship.reviews.label")}</SectionLabel>

        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {t("mentorship.reviews.heading")}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {t("mentorship.reviews.subheading")}
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col rounded-2xl glass-card p-7"
          >
            <div className="mb-5 text-3xl text-violet">
              "
            </div>

            <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
              {testimonial.quote}
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-mono text-xs font-bold text-violet">
                {testimonial.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>

              <span>
                <span className="block text-sm font-semibold">
                  {testimonial.name}
                </span>

                <span className="block text-xs text-muted-foreground">
                  {testimonial.title}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faqs() {
  const { t } = useTranslation();
  const items = t("mentorship.faqs.items", { returnObjects: true });
  return (
    <section id="faqs" className="mx-auto max-w-3xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>{t("mentorship.faqs.label")}</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {t("mentorship.faqs.heading")}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {t("mentorship.faqs.subheading")}
        </p>
      </div>

      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {items.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-2xl glass-card border-b-0 px-6"
          >
            <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FinalCta() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28">
      <div className="relative overflow-hidden rounded-3xl glass-card px-8 py-16 text-center sm:px-16">
        <div
          className="pointer-events-none absolute inset-0 aurora opacity-80"
          aria-hidden="true"
        />

        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet">
            {t("mentorship.finalCta.batchStart")}
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t("mentorship.finalCta.heading1")}{" "}
            <span className="text-gradient">
              {t("mentorship.finalCta.heading2")}
            </span>{" "}
            {t("mentorship.finalCta.heading3")}
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            {t("mentorship.finalCta.body")}
          </p>

          <a
            href="#program"
            className="mt-9 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            {t("mentorship.finalCta.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useTranslation();

  const NAV = [
    { label: t("mentorship.nav.overview"), href: "#mission" },
    { label: t("mentorship.nav.whatYouGet"), href: "#program" },
    { label: t("mentorship.nav.howItWorks"), href: "#process" },
    { label: t("mentorship.nav.faqs"), href: "#faqs" },
    { label: "Youtube", href: "https://www.youtube.com/@ExamRojgaar", icon: <YoutubeIcon size={18} />, target: "_blank" },
  ];

  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div>
          <p className="font-display text-sm font-semibold">
            Exam Rojgaar
          </p>

          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {t("mentorship.footer.tagline")}
          </p>
        </div>

        <nav className="flex gap-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Exam Rojgaar
        </p>
      </div>
    </footer>
  );
}


const TargetSeriesPage = () => {
  return <>
    <Landing />
    <BottomNavigation />
  </>
}

export default TargetSeriesPage;
