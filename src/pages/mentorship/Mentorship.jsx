import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
// import mentorImg from "@/assets/mentor.jpg";
import React from 'react';
import './styles.css'

export const YoutubeIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);





const NAV = [
  { label: "Overview", href: "#mission" },
  { label: "What You Get", href: "#program" },
  { label: "How It Works", href: "#process" },
  { label: "FAQs", href: "#faqs" },
  { label: "Youtube", href: "https://www.youtube.com/@ExamRojgaar", icon: <YoutubeIcon size={18} />, target: "_blank" },
];

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

const MISSION = [
  {
    title: "Target-Based Preparation",
    body: "Complete the RRB NTPC 2026 syllabus with clear targets and a structured preparation plan.",
  },
  {
    title: "PYQ Focused",
    body: "Understand the actual exam pattern through live discussion and practice of Previous Year Questions.",
  },
  {
    title: "Personal Guidance",
    body: "Get regular doubt sessions and target-based guidance to identify mistakes, improve weak areas and stay on track.",
  },
];

const PLANS = [
  {
    name: "RRB NTPC 2026 Paid Batch",
    price: "₹200",
    unit: "one time",
    tag: "Complete Preparation Program",
    blurb:
      "A focused preparation batch designed for the RRB NTPC 2026 exam with syllabus completion, PYQs, mock tests, doubt sessions and target-based guidance.",
    features: [
      "Target-based completion of syllabus for 2026",
      "Live discussion of PYQs",
      "Weekly doubt sessions",
      "Practice sectional mock tests based on PYQs",
      "Five full mock test paper series",
      "Target Series guidance by Gopal Sir",
      "Subjects: GS / GK + Maths + Reasoning",
    ],
    cta: <RazorpayButton id="pl_TS4AN7R2A24QKQ" />,
    featured: true,
  },
];

const STEPS = [
  {
    title: "Join the Batch",
    body: "Enroll in the RRB NTPC 2026 paid batch for just ₹200.",
  },
  {
    title: "Follow the Targets",
    body: "Complete the syllabus according to the planned targets and stay consistent with your preparation.",
  },
  {
    title: "Practice & Analyse",
    body: "Solve PYQs, sectional mocks and full-length mock tests to understand your preparation level.",
  },
  {
    title: "Improve with Target Series",
    body: "Get weekly doubt sessions and guidance from Gopal Sir to identify and improve your weak areas.",
  },
];

const WHY = [
  {
    title: "Target-Based Syllabus Completion",
    body: "Follow a structured preparation approach designed to help you complete the RRB NTPC 2026 syllabus on time.",
    wide: true,
  },
  {
    title: "Live PYQ Discussion",
    body: "Discuss Previous Year Questions live and understand the concepts and patterns behind them.",
  },
  {
    title: "Weekly Doubt Sessions",
    body: "Get your doubts resolved regularly instead of letting difficult topics accumulate.",
  },
  {
    title: "Sectional Mock Tests",
    body: "Practice topic-wise and sectional tests based on PYQs prepared by the Exam Rojgaar team.",
  },
  {
    title: "Five Full Mock Tests",
    body: "Five full mock test papers based on the latest pattern and PYQs, available two months before the exam.",
    wide: true,
  },
  {
    title: "Target Series Guidance by Gopal Sir",
    body: "Get guidance based on your test performance and work on your weak areas before the actual examination.",
    wide: true,
  },
];

const FAQS = [
  {
    q: "What is the price of the RRB NTPC 2026 paid batch?",
    a: "The batch fee is ₹200 only.",
  },
  {
    q: "When does the batch start?",
    a: "The RRB NTPC 2026 paid batch starts from 22nd August 2026.",
  },
  {
    q: "Which subjects are covered?",
    a: "The batch covers GS / GK, Mathematics and Reasoning.",
  },
  {
    q: "Will there be PYQ discussion?",
    a: "Yes. The batch includes live discussion of Previous Year Questions (PYQs).",
  },
  {
    q: "Will there be doubt sessions?",
    a: "Yes. Weekly doubt sessions will be conducted.",
  },
  {
    q: "Are mock tests included?",
    a: "Yes. The batch includes sectional mock tests based on PYQs and five full mock test papers based on the latest pattern and PYQs.",
  },
  {
    q: "When will the five full mock tests be available?",
    a: "The five full mock test paper series will be available two months before the examination.",
  },
  {
    q: "Who will provide the guidance?",
    a: "Guidance will be provided by Gopal Sir, with target-based feedback on your test performance and areas that need improvement.",
  },
  {
    q: "Is there a result-based refund?",
    a: "Yes. As mentioned in the batch announcement, the batch amount will be refunded to eligible students who achieve the final result.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Daily Target se History aur Polity ki preparation meri kaafi achhi hui hai. 😊 Maths mein bhi tests dene ki wajah se kaafi improvement feel hua hai. Overall, mujhe Daily Target se bahut fayda mila hai. Aur ek special mention aapke Polity ke YouTube lectures ka — they are just wow! ❤️ Maine Polity ko itna interesting aur easy kabhi nahi paya. Aapka padhane ka tareeka bahut hi simple aur effective hai. Thank you so much for guiding us and making our preparation easier. 😊🙏 Keep doing the amazing work!",
    name: "Susmita",
    title: "Exam Rojgar 2026 Batch-1",
  },
  {
    quote:
      "Negative attempts bhi ab kaafi kam ho rahe hain aur dheere-dheere attempts increase kar pa raha hoon. GK/GS aur Maths ko ek saath routine mein follow karne se preparation ka burden bhi kaafi kam lag raha hai aur consistency bani hui hai. Bas ab hope hai ki isi direction mein mehnat karte rahein aur result bhi positive aaye. Thank you for the guidance, Sir! 🙏😊",
    name: "Renu Pathak",
    title: "Exam Rojgar 2026 Batch-1",
  },
  {
    quote:
      "Saare resources ek hi jagah mil jaate hain, isliye preparation kaafi easy aur organised ho gayi hai. Pehle resources ke liye idhar-udhar bhagna padta tha, lekin ab sab kuch ek hi jagah mil jaata hai, jisse time bhi save hota hai aur preparation par focus karna bhi easy ho gaya hai. 😊🙏",
    name: "Abhishek",
    title: "Exam Rojgar 2026 Batch-1",
  },
  {
    quote:
      "Aapka guidance aur padhane ka tareeka bahut achha hai. Preparation ko kaafi easy aur organised bana diya hai. 🙏❤️",
    name: "Mantasha Khatoon",
    title: "Exam Rojgar 2026 Batch-1",
  },
  {
    quote:
      "Preparation mein kaafi improvement dekhne ko mil raha hai — attempts increase ho rahe hain, negative marking kam ho rahi hai, timely revision ho pa raha hai aur weak areas ka bhi proper analysis kar pa raha hoon. Overall preparation ab pehle se kaafi better aur structured lag rahi hai. 🙏😊",
    name: "Sujoy Basak",
    title: "Exam Rojgar 2026 Batch-1",
  },
];
const APPLY_URL = "#program";

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
  return (
    <div className="mentorship-page relative min-h-screen overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 aurora" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 grid-canvas opacity-60" aria-hidden="true" />
      <CursorShadow />
      
      <Header />

      <main className="relative pt-24">
        <Hero />
        <Marquee />
        <Mission />
        <Program />
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


function Header() {
 const { t } = useTranslation();
  return (
    <header className="fixed top-3 left-3 right-3 z-50 rounded-2xl border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-200 ring-1 ring-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link className="flex items-center gap-3" to="/">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <img src="/logo.png" alt="examrojgar-logo" className="grid size-10 place-items-center rounded-xl bg-accent font-mono text-sm font-bold text-accent-foreground shadow-glow" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
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

        <a
          href={APPLY_URL}
          className="rounded-full bg-primary/90 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] backdrop-blur-sm shadow-md"
        >
          Apply Now
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 md:pt-18">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald animate-pulse-dot" />
            August 2026 Batch
            <span className="text-border">•</span>
            <span className="text-rose">Limited Seats</span>
          </div>
          

          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            3 Months
            <br />
            <span className="text-gradient">RRB NTPC 2026 </span>
            <br />Target Series
          </h1>

          {/* <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Master frontend architecture, system design and the career strategy
            around them. Learn the engineering mindset directly from someone who
            hires and grows engineers for a living.
          </p> */}

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#program"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              View Target Series Tracks
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#faqs"
              className="inline-flex items-center rounded-full border border-border bg-surface-2 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              1:1 Personal Advice
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 h-10 w-3/4 rounded-full bg-black/60 blur-2xl" />
            </div>
        {/* <CodeCard /> */}
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
  return (
    <section id="mission" className="mx-auto max-w-6xl px-5 py-24">
      <SectionLabel>My Mission</SectionLabel>
      <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Why I mentor
      </h2>
      {/* <p className="mt-4 max-w-xl text-muted-foreground">
        I'm not building a course factory. I'm building a tight-knit network of
        engineers who raise each other's bar.
      </p> */}

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {MISSION.map((m, i) => (
          <article key={m.title} className="rounded-2xl glass-card p-7">
            <span className="font-mono text-xs text-violet">0{i + 1}</span>
            <h3 className="mt-4 font-display text-xl font-semibold">{m.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}


function RazorpayButton({id}) {
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

  return <form ref={containerRef}  />

}




function Program() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-24">
      <div className="text-center">
        <SectionLabel>Target Series Tracks</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Pick your depth
        </h2>
        <p id="program" className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          Target Batch is for people serious about their careers. No bulk batches —
          only 1:1 attention and deep structural growth.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-2">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`relative rounded-2xl p-5 sm:rounded-3xl sm:p-8 ${
              plan.featured
                ? "glass-card ring-1 ring-accent/60 shadow-glow"
                : "glass-card"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground whitespace-nowrap sm:left-auto sm:right-8 sm:translate-x-0">
                Most Selected
              </span>
            )}
            <h3 className="font-display text-xl font-bold leading-snug sm:text-2xl">{plan.name}</h3>
            <p className="mt-1 text-sm text-violet">{plan.tag}</p>

            <p className="mt-5 flex items-baseline gap-1.5 sm:mt-6">
              <span className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {plan.price}
              </span>
              <span className="text-sm text-muted-foreground">{plan.unit}</span>
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-5">
              {plan.blurb}
            </p>

            <ul className="mt-6 space-y-3 sm:mt-7">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <span className="mt-0.5 shrink-0 text-emerald">✓</span>
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            {/* <button
              onCLick={APPLY_URL}
              className={`mt-8 block rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ${
                plan.featured
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            > */}
            <div className="mt-8 w-full sm:mt-10 sm:max-w-md">{plan.cta}</div>

            {/* </button> */}

          </article>
        ))}
      </div>

      {/* <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
        * ₹50k upfront for the 3-month track, remaining ₹25k at the start of month two.
      </p> */}
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>Process</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Low seats. High quality.
        </h2>
      </div>

      <ol className="mt-14 grid gap-5 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative rounded-2xl glass-card p-6">
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

// function Structure() {
//   return (
//     <section className="mx-auto max-w-6xl px-5 py-24">
//       <div className="rounded-3xl glass-card p-8 sm:p-12">
//         <SectionLabel>Program Structure</SectionLabel>
//         <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
//           Deep-work weekends, continuous weekday momentum
//         </h2>

//         <div className="mt-10 grid gap-6 md:grid-cols-2">
//           <div className="rounded-2xl border border-border bg-surface-2 p-7">
//             <h3 className="font-display text-xl font-semibold">Weekend Deep Dives</h3>
//             <p className="mt-2 text-sm text-muted-foreground">
//               3–4 hours of intensive focus on core engineering principles.
//             </p>
//             <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
//               <li>• Saturday: individual connect sessions</li>
//               <li>• Sunday: group mentorship & system design</li>
//             </ul>
//           </div>
//           <div className="rounded-2xl border border-border bg-surface-2 p-7">
//             <h3 className="font-display text-xl font-semibold">Weekday Momentum</h3>
//             <p className="mt-2 text-sm text-muted-foreground">
//               Always connected. Never stuck on one problem for days.
//             </p>
//             <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
//               <li>• Direct 1:1 chat support</li>
//               <li>• Assignment discussion & doubt solving</li>
//               <li>• Continuous progress tracking</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Mentor() {
//   return (
//     <section className="mx-auto max-w-6xl px-5 py-24">
//       <div className="grid items-center gap-12 lg:grid-cols-2">
//         <div className="relative">
//           <div className="overflow-hidden rounded-3xl glass-card">
//             {/* <img
//               src={mentorImg}
//               alt="Chirag Goel, engineering manager and mentor"
//               loading="lazy"
//               width={912}
//               height={1104}
//               className="h-full w-full object-cover"
//             /> */}
//           </div>
//           <div className="absolute -bottom-5 left-6 rounded-2xl glass-card px-5 py-4">
//             <p className="font-display text-base font-semibold">Chirag Goel</p>
//             <p className="font-mono text-xs text-muted-foreground">
//               Engineering Manager
//             </p>
//           </div>
//         </div>

//         <div>
//           <SectionLabel>The Mentor</SectionLabel>
//           <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
//             Expertise meets a{" "}
//             <span className="text-gradient">passion for teaching</span>.
//           </h2>

//           <blockquote className="mt-8 border-l-2 border-accent pl-5 font-mono text-sm leading-7 text-muted-foreground">
//             profession === engineer
//             <br />
//             love === teaching
//             <br />
//             passion === mentoring
//           </blockquote>

//           <p className="mt-7 leading-relaxed text-muted-foreground">
//             I talk about frontend development, system design and interview
//             preparation — helping students start careers and helping working
//             engineers grow toward mastery. The more knowledge you pour out, the
//             more comes back.
//           </p>

//           <div className="mt-9 flex gap-10">
//             <div>
//               <p className="font-display text-3xl font-extrabold text-gradient">10+ Yrs</p>
//               <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
//                 Experience
//               </p>
//             </div>
//             <div>
//               <p className="font-display text-3xl font-extrabold text-gradient">100k+</p>
//               <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
//                 Developers Taught
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Mentor() {
//   return (
//     <section className="mx-auto max-w-6xl px-5 py-24">
//       <div className="grid items-center gap-12 lg:grid-cols-2">
//         <div>
//           <SectionLabel>The Mentor</SectionLabel>

//           <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
//             Guidance by{" "}
//             <span className="text-gradient">Gopal Sir</span>
//           </h2>

//           <p className="mt-7 leading-relaxed text-muted-foreground">
//             Get mentorship based on your test performance, identify your
//             weak areas and work on them before the actual RRB NTPC
//             examination.
//           </p>

//           <div className="mt-9 grid gap-4 sm:grid-cols-2">
//             <div className="rounded-2xl glass-card p-5">
//               <p className="font-display text-lg font-semibold">
//                 Test Analysis
//               </p>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 Identify mistakes and areas that need improvement.
//               </p>
//             </div>

//             <div className="rounded-2xl glass-card p-5">
//               <p className="font-display text-lg font-semibold">
//                 Personal Guidance
//               </p>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 Improve your preparation strategy before the exam.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function Structure() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="rounded-3xl glass-card p-8 sm:p-12">
        <SectionLabel>Program Structure</SectionLabel>

        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          A structured approach to crack RRB NTPC 2026
        </h2>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Learn, practice, analyse and improve with a preparation plan
          designed around the actual requirements of the RRB NTPC exam.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Preparation */}
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">
              📚 Learn & Complete
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Build your preparation with clear targets and complete the
              required syllabus systematically.
            </p>

            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li>• Target-based syllabus completion</li>
              <li>• GS / GK + Maths + Reasoning</li>
              <li>• Live discussion of PYQs</li>
            </ul>
          </div>

          {/* Practice */}
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">
              📝 Practice & Test
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Regular practice and mock tests to improve accuracy, speed
              and exam readiness.
            </p>

            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li>• Practice sectional mock tests</li>
              <li>• Tests based on PYQs</li>
              <li>• Five full mock test paper series</li>
            </ul>
          </div>

          {/* Doubt Solving */}
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">
              💡 Doubt Solving
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Don't let difficult topics slow down your preparation. Get
              your doubts resolved regularly.
            </p>

            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li>• Weekly doubt sessions</li>
              <li>• Concept clarification</li>
              <li>• Discussion of difficult questions</li>
            </ul>
          </div>

          {/* Target Series */}
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">
              🎯 Analyse & Improve
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Understand your mistakes and work on your weak areas with
              guidance from Gopal Sir.
            </p>

            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li>• Test performance analysis</li>
              <li>• Weak area identification</li>
              <li>• Target Series guidance by Gopal Sir</li>
            </ul>
          </div>
        </div>

        {/* Mock Test Highlight */}
        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-semibold">
                Five Full Mock Test Paper Series
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Full-length mock tests based on the latest exam pattern and
                PYQs, available two months before the examination.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-accent px-4 py-2 font-mono text-xs font-semibold text-accent-foreground">
            50+ MOCK TESTS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Mentor() {
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
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 h-10 w-3/4 rounded-full bg-black/60 blur-2xl" />

          <div className="absolute -bottom-5 left-6 rounded-2xl glass-card px-5 py-4">
            <p className="font-display text-base font-semibold">
              Gopal Sir
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              SSE (Ministry of Railways)
            </p>
              <p className="font-mono text-xs text-muted-foreground">
              Exam Rojgaar Mentor
            </p>
          </div>
        </div>

        {/* Mentor Content */}
        <div>
          <SectionLabel>The Mentor</SectionLabel>

          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Guidance that makes your{" "}
            <span className="text-gradient">
              preparation better
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
            Gopal Sir focuses on making exam preparation simple, structured
            and practical. Through regular guidance, test analysis and
            target-based guidance, students can identify their weak areas, reduce
            mistakes and improve their overall performance.
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            The goal is not just to study more, but to study with the right
            strategy, analyse your performance and continuously improve before
            the actual RRB NTPC examination.
          </p>

          <div className="mt-9 flex gap-10">
            <div>
              <p className="font-display text-3xl font-extrabold text-gradient">
                Weekly
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Doubt Sessions
              </p>
            </div>

            <div>
              <p className="font-display text-3xl font-extrabold text-gradient">
                1:1
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Test Guidance
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
function Why() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>The Difference</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Why <span className="text-gradient">this</span> Target Series?
        </h2>
        {/* <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Not another course. A rewrite of your engineering identity.
        </p> */}
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {WHY.map((item) => (
          <article
            key={item.title}
            className={`rounded-2xl glass-card p-7 ${item.wide ? "md:col-span-2" : ""}`}
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

// function Reviews() {
//   return (
//     <section id="reviews" className="mx-auto max-w-6xl px-5 py-24">
//       <div className="text-center">
//         <SectionLabel>Testimonials</SectionLabel>
//         <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
//           What mentees say
//         </h2>
//       </div>

//       <div className="mt-14 grid gap-5 md:grid-cols-3">
//         {REVIEWS.map((r) => (
//           <figure key={r.name} className="flex flex-col rounded-2xl glass-card p-7">
//             <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
//               “{r.quote}”
//             </blockquote>
//             <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
//               <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-mono text-xs font-bold text-violet">
//                 {r.initials}
//               </span>
//               <span>
//                 <span className="block text-sm font-semibold">{r.name}</span>
//                 <span className="block text-xs text-muted-foreground">{r.role}</span>
//               </span>
//             </figcaption>
//           </figure>
//         ))}
//       </div>
//     </section>
//   );
// }

function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>Student Reviews</SectionLabel>

        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          What our students say
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Real feedback from students preparing with Exam Rojgaar.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
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
  return (
    <section id="faqs" className="mx-auto max-w-3xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>FAQs</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-muted-foreground">
          Everything worth knowing before you apply.
        </p>
      </div>

      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={f.q}
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
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28">
      <div className="relative overflow-hidden rounded-3xl glass-card px-8 py-16 text-center sm:px-16">
        <div
          className="pointer-events-none absolute inset-0 aurora opacity-80"
          aria-hidden="true"
        />

        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet">
            Batch Starts 22nd August 2026
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Start your{" "}
            <span className="text-gradient">
              RRB NTPC 2026
            </span>{" "}
            preparation today.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Join the Exam Rojgaar paid batch for just ₹200 and prepare with
            structured targets, PYQs, mock tests, doubt sessions and
            target-based guidance.
          </p>

          <a
            href="#program"
            className="mt-9 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Join Batch for ₹200
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div>
          <p className="font-display text-sm font-semibold">
            Exam Rojgaar
          </p>

          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Your Success, Our Goal
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


const TargetSeriesPage =()=>{

    return <Landing/>
}

export default TargetSeriesPage;