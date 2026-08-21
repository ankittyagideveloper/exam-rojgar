import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
// import mentorImg from "@/assets/mentor.jpg";


// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "Engineer Chirag — 1:1 Frontend & System Design Mentorship" },
//       {
//         name: "description",
//         content:
//           "Small-cohort 1:1 mentorship in frontend architecture, system design and interview strategy, led by an engineering manager with 10+ years in big tech.",
//       },
//       {
//         property: "og:title",
//         content: "Engineer Chirag — 1:1 Frontend & System Design Mentorship",
//       },
//       {
//         property: "og:description",
//         content:
//           "Master frontend architecture, system design and career growth with focused 1:1 mentorship. Limited seats each cohort.",
//       },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//   }),
//   component: Landing,
// });

const NAV = [
  { label: "Mission", href: "#mission" },
  { label: "Program", href: "#program" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
];

const MARQUEE = [
  "Frontend Architecture",
  "System Design",
  "Node.js",
  "Interview Strategy",
  "Career Branding",
  "Scale & Performance",
  "React Mastery",
];

const MISSION = [
  {
    title: "Knowledge Sharing",
    body: "My day job already pays the bills. This mentorship is how I hand back a decade of hard-won engineering judgement to people hungry for it.",
  },
  {
    title: "Hinglish Friendly",
    body: "Language should never be the bottleneck. Complex ideas, explained in a way that actually lands for Indian engineers.",
  },
  {
    title: "Engineering Mindset",
    body: "Not just syntax fluency — structural clarity, problem-solving frameworks and a clear map of how careers actually compound.",
  },
];

const PLANS = [
  {
    name: "1 Month Mentorship",
    price: "₹200",
    unit: "",
    tag: "Interview Preparation",
    blurb:
      "Built for engineers with an interview loop on the calendar. Pattern recognition, structured prep and relentless feedback.",
    features: [
      "Problem-solving approach (not just DSA)",
      "Resume review & positioning",
      "Communication & leadership framing",
      "Real interview-style mock sessions",
      "Actionable improvement plans",
      "Structured weekly assignments",
    ],
    cta: <RazorpayButton id ={"pl_TS4RRuEjL9l1et"}/>,
    featured: false,
  },
  {
    name: "3 Months Mentorship",
    price: "500",
    unit: "/ month",
    tag: "Skill Building + Career Growth",
    blurb:
      "A deeper, transformative arc: long-term engineering growth, practical AI integration and genuinely scalable architecture.",
    features: [
      "Everything in the 1 Month plan",
      "Practical AI skills & integrations",
      "System design deep dives",
      "Full-stack engineering mindset",
      "End-to-end product ownership",
      "Additional mock interviews",
    ],
    cta:  <RazorpayButton id ="pl_TSE7yBFpvy4BLA"/>,
    featured: true,
  },
];

const STEPS = [
  { title: "Apply", body: "Share your background, current stack and the specific outcome you want." },
  { title: "Review", body: "I personally read every application and resume before shortlisting." },
  { title: "Discussion", body: "Shortlisted candidates get a short 1:1 call to align on expectations." },
  { title: "Selection", body: "Final picks come down to commitment and seriousness about growth." },
];

const WHY = [
  {
    title: "Advanced Architecture",
    body: "High-scale frontend systems and state management the way product companies actually run them in production — components, state machines, micro-frontends.",
    wide: true,
  },
  { title: "Hinglish Support", body: "Hard concepts, simple and relatable delivery." },
  { title: "Career Branding", body: "Sharper LinkedIn, resume and recruiter visibility." },
  { title: "Execution Ability", body: "Learn to pick up any stack on your own, fast." },
  {
    title: "Growth Mindset",
    body: "The mental models senior roles demand. Move from shipping features to owning architecture and technical direction.",
    wide: true,
  },
  {
    title: "Interview Readiness",
    body: "Mocks that mirror top-tier loops, with blunt feedback well before the real day.",
    wide: true,
  },
];

const REVIEWS = [
  {
    quote:
      "The sessions reframed how I approach system design entirely. It's less about memorising patterns and more about reasoning through tradeoffs out loud.",
    name: "Ankit Sharma",
    role: "SDE @ Microsoft",
    initials: "AS",
  },
  {
    quote:
      "The mock interviews were brutal in the best way. The feedback on performance optimisation is what got me through my senior loop.",
    name: "Priya Patel",
    role: "Frontend Engineer @ Amazon",
    initials: "PP",
  },
  {
    quote:
      "I went from a feature developer to someone people ask for architecture reviews. That shift happened inside three months.",
    name: "Rahul Verma",
    role: "Senior SDE @ Flipkart",
    initials: "RV",
  },
];

const FAQS = [
  {
    q: "Why is the price relatively affordable for this quality?",
    a: "Because mentoring isn't my income — it's the part of the week I look forward to. The fee exists to filter for seriousness and to keep cohorts small enough that everyone gets real attention.",
  },
  {
    q: "What is the 'negative habit' clause?",
    a: "If you consistently skip sessions, ignore assignments or treat the mentorship as passive content, we part ways early and the remaining amount isn't charged. The seat goes to someone who will use it.",
  },
  {
    q: "Is this a job-guarantee program?",
    a: "No. Nobody can honestly guarantee a job. What is guaranteed is preparation: architecture depth, interview reps and a clear plan. The outcome still depends on your execution.",
  },
  {
    q: "Do I need any prerequisites?",
    a: "Comfort with JavaScript and at least one framework, plus roughly a year of building real software. Absolute beginners will get more from fundamentals first.",
  },
  {
    q: "How much time should I set aside each week?",
    a: "Plan for 3–4 focused hours on the weekend plus a few hours across weekdays for assignments and follow-ups.",
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
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 aurora" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 grid-canvas opacity-60" aria-hidden="true" />
      <CursorShadow />
      
      <Header />

      <main className="relative">
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
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-accent font-mono text-sm font-bold text-accent-foreground shadow-glow">
            CG
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Engineer Chirag
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={APPLY_URL}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Apply Now
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 md:pt-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald animate-pulse-dot" />
            July 2026 Cohort
            <span className="text-border">•</span>
            <span className="text-rose">Limited Seats</span>
          </div>
          

          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Engineering
            <br />
            <span className="text-gradient">Excellence</span>
            <br />& Scaling
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Master frontend architecture, system design and the career strategy
            around them. Learn the engineering mindset directly from someone who
            hires and grows engineers for a living.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#program"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              View Mentorship Tracks
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

        <CodeCard />
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
            System Status
          </p>
          <p className="font-mono text-sm font-semibold">Highly Scalable</p>
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
      <p className="mt-4 max-w-xl text-muted-foreground">
        I'm not building a course factory. I'm building a tight-knit network of
        engineers who raise each other's bar.
      </p>

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
  debugger
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

  return <form ref={containerRef}  />;
}




function Program() {
  return (
    <section id="program" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>Mentorship Tracks</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Pick your depth
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Engineered for people serious about their careers. No bulk batches —
          only 1:1 attention and deep structural growth.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`relative rounded-3xl p-8 ${
              plan.featured
                ? "glass-card ring-1 ring-accent/60 shadow-glow"
                : "glass-card"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 right-8 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground">
                Most Selected
              </span>
            )}
            <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
            <p className="mt-1 text-sm text-violet">{plan.tag}</p>

            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-extrabold tracking-tight">
                {plan.price}
              </span>
              <span className="text-sm text-muted-foreground">{plan.unit}</span>
            </p>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {plan.blurb}
            </p>

            <ul className="mt-7 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <span className="mt-0.5 text-emerald">✓</span>
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            {/* <a
              href={APPLY_URL}
              className={`mt-8 block rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ${
                plan.featured
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
            </a> */}
            {plan.cta} 
    
          </article>
        ))}
      </div>

      <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
        * ₹50k upfront for the 3-month track, remaining ₹25k at the start of month two.
      </p>
    </section>
  );
}

function Process() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>ment Process</SectionLabel>
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

function Structure() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="rounded-3xl glass-card p-8 sm:p-12">
        <SectionLabel>Program Structure</SectionLabel>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Deep-work weekends, continuous weekday momentum
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">Weekend Deep Dives</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              3–4 hours of intensive focus on core engineering principles.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li>• Saturday: individual connect sessions</li>
              <li>• Sunday: group mentorship & system design</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface-2 p-7">
            <h3 className="font-display text-xl font-semibold">Weekday Momentum</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Always connected. Never stuck on one problem for days.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li>• Direct 1:1 chat support</li>
              <li>• Assignment discussion & doubt solving</li>
              <li>• Continuous progress tracking</li>
            </ul>
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
        <div className="relative">
          <div className="overflow-hidden rounded-3xl glass-card">
            {/* <img
              src={mentorImg}
              alt="Chirag Goel, engineering manager and mentor"
              loading="lazy"
              width={912}
              height={1104}
              className="h-full w-full object-cover"
            /> */}
          </div>
          <div className="absolute -bottom-5 left-6 rounded-2xl glass-card px-5 py-4">
            <p className="font-display text-base font-semibold">Chirag Goel</p>
            <p className="font-mono text-xs text-muted-foreground">
              Engineering Manager
            </p>
          </div>
        </div>

        <div>
          <SectionLabel>The Mentor</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Expertise meets a{" "}
            <span className="text-gradient">passion for teaching</span>.
          </h2>

          <blockquote className="mt-8 border-l-2 border-accent pl-5 font-mono text-sm leading-7 text-muted-foreground">
            profession === engineer
            <br />
            love === teaching
            <br />
            passion === mentoring
          </blockquote>

          <p className="mt-7 leading-relaxed text-muted-foreground">
            I talk about frontend development, system design and interview
            preparation — helping students start careers and helping working
            engineers grow toward mastery. The more knowledge you pour out, the
            more comes back.
          </p>

          <div className="mt-9 flex gap-10">
            <div>
              <p className="font-display text-3xl font-extrabold text-gradient">10+ Yrs</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Experience
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-gradient">100k+</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Developers Taught
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
          Why <span className="text-gradient">this</span> mentorship?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Not another course. A rewrite of your engineering identity.
        </p>
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

function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <SectionLabel>Testimonials</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          What mentees say
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="flex flex-col rounded-2xl glass-card p-7">
            <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-mono text-xs font-bold text-violet">
                {r.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold">{r.name}</span>
                <span className="block text-xs text-muted-foreground">{r.role}</span>
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
        <div className="pointer-events-none absolute inset-0 aurora opacity-80" aria-hidden="true" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The next cohort is <span className="text-gradient">small on purpose</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            If you're ready to stop collecting tutorials and start engineering
            systems, apply and let's talk.
          </p>
          <a
            href={APPLY_URL}
            className="mt-9 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Apply for the July Cohort
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
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Engineer Chirag. Built for engineers.
        </p>
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
      </div>
    </footer>
  );
}


const MentorshipPage =()=>{

    return <Landing/>
}

export default MentorshipPage;