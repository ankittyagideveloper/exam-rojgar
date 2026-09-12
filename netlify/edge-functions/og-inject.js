/**
 * Netlify Edge Function — og-inject
 *
 * Runs only for known bot/crawler User-Agents (WhatsApp, Telegram, Facebook,
 * Twitter, LinkedIn, Slack, Discord, etc.).  For real users it passes through
 * immediately with zero overhead.
 *
 * For bots it:
 *  1. Fetches the normal index.html from the origin
 *  2. Replaces the generic og:title / og:description / og:url tags with
 *     per-test values derived from the URL slug
 *  3. Returns the patched HTML
 */

// ── Slug → { title, subject } map ────────────────────────────────────────────
const TEST_META = {
  // Ancient History
  "harappa":                                       { title: "Harappan Civilisation Mock Test",                   subject: "Ancient History" },
  "buddhism":                                      { title: "Buddhism Mock Test",                                subject: "Ancient History" },
  "jainism":                                       { title: "Jainism Mock Test",                                 subject: "Ancient History" },
  "mahajanpad":                                    { title: "Mahajanpad Mock Test",                              subject: "Ancient History" },
  "mauryan-empire":                                { title: "Mauryan Empire Mock Test",                          subject: "Ancient History" },
  "post-mauryan-empire":                           { title: "Post-Mauryan Empire Mock Test",                     subject: "Ancient History" },
  "gupta":                                         { title: "Gupta Empire Mock Test",                            subject: "Ancient History" },
  "sangam":                                        { title: "Sangam Age Mock Test",                              subject: "Ancient History" },
  "vedic-mock-2":                                  { title: "Vedic Period Mock Test 2",                          subject: "Ancient History" },
  // Medieval History
  "delhi-sultanate":                               { title: "Delhi Sultanate Mock Test",                         subject: "Medieval History" },
  "mughal":                                        { title: "Mughal Empire Mock Test",                           subject: "Medieval History" },
  "maratha":                                       { title: "Maratha Empire Mock Test",                          subject: "Medieval History" },
  "vijayanagar-bahmani":                           { title: "Vijayanagar & Bahmani Mock Test",                   subject: "Medieval History" },
  "vijay-nagar-and-bahmani":                       { title: "Vijayanagar & Bahmani Mock Test",                   subject: "Medieval History" },
  "bhakti-and-sufi":                               { title: "Bhakti & Sufi Movement Mock Test",                  subject: "Medieval History" },
  "MedievalHistoryRajputAndTriPartite":            { title: "Medieval History – Rajput & Tri-Partite Mock Test",  subject: "Medieval History" },
  // Modern History
  "advent":                                        { title: "Advent of Europeans & British Mock Test",           subject: "Modern History" },
  "modern-history-extremist-phase":                { title: "Modern History – Extremist Phase Mock Test",        subject: "Modern History" },
  "revolt-economic-impact-peasant":                { title: "Revolt, Economic Impact & Peasant Movement Test",   subject: "Modern History" },
  "Regulating":                                    { title: "Regulating Act Mock Test",                          subject: "Modern History" },
  // General History
  "history-full-revision-test":                    { title: "History Full Revision Test",                        subject: "History" },
  // Revision / GS
  "revision":                                      { title: "Revision Mock Test",                                subject: "General Studies" },
  "revision-test-1":                               { title: "Revision Mock Test 1",                              subject: "General Studies" },
  "revision-test-1-mock-test":                     { title: "Revision Mock Test 1",                              subject: "General Studies" },
  "revision-test-2":                               { title: "Revision Mock Test 2",                              subject: "General Studies" },
  "revision-test-3":                               { title: "Revision Mock Test 3",                              subject: "General Studies" },
  "cbt2-ug-test-1":                                { title: "CBT-2 UG Test 1",                                   subject: "General Studies" },
  "test-series-demo":                              { title: "Test Series Demo",                                   subject: "General Studies" },
  "dummy-test":                                    { title: "Railway Mock Test",                                  subject: "Railway GK" },
  // Polity
  "polity-constitution-and-preamble-and-sources":  { title: "Polity – Constitution, Preamble & Sources Mock Test", subject: "Polity" },
  "schedule-citizenship":                          { title: "Schedules & Citizenship Mock Test",                  subject: "Polity" },
  "fundamental-rights-and-dp-sp":                 { title: "Fundamental Rights & DPSP Mock Test",               subject: "Polity" },
  "parliament":                                    { title: "Parliament Mock Test",                               subject: "Polity" },
  "amendments":                                    { title: "Constitutional Amendments Mock Test",               subject: "Polity" },
  "ConstitutionalBodies":                          { title: "Constitutional Bodies Mock Test",                    subject: "Polity" },
  "gk-polity-test-1":                              { title: "GK & Polity Test 1",                                subject: "Polity" },
  "president-governor-pm-test-1":                  { title: "President, Governor & PM Test 1",                   subject: "Polity" },
  "state-legislature-panchayati-raj-test-1":       { title: "State Legislature & Panchayati Raj Test 1",         subject: "Polity" },
  // Geography
  "geography-basics-test-1":                       { title: "Geography Basics Test 1",                           subject: "Geography" },
  "environment-quiz":                              { title: "Environment Quiz Mock Test",                         subject: "Geography" },
  "TransportationSystem":                          { title: "Transportation System Mock Test",                    subject: "Geography" },
  // Mathematics
  "hcf-lcm":                                       { title: "HCF & LCM Mock Test",                              subject: "Mathematics" },
  "average":                                       { title: "Average Mock Test",                                  subject: "Mathematics" },
  "percentage":                                    { title: "Percentage Mock Test",                               subject: "Mathematics" },
  "ratio":                                         { title: "Ratio & Proportion Mock Test",                       subject: "Mathematics" },
  "profit":                                        { title: "Profit & Loss Mock Test",                            subject: "Mathematics" },
  "profit-loss-discount":                          { title: "Profit, Loss & Discount Mock Test",                  subject: "Mathematics" },
  "compound-interest":                             { title: "Compound Interest Mock Test",                        subject: "Mathematics" },
  "pipe":                                          { title: "Pipes & Cisterns Mock Test",                         subject: "Mathematics" },
  "pipe-cistern":                                  { title: "Pipe & Cistern Mock Test",                          subject: "Mathematics" },
  "mixture-alligation":                            { title: "Mixture & Alligation Mock Test",                     subject: "Mathematics" },
  "mixture-alligation-test-2":                     { title: "Mixture & Alligation Test 2",                       subject: "Mathematics" },
  "time-and-work":                                 { title: "Time & Work Mock Test",                              subject: "Mathematics" },
  "time-speed-distance-boat":                      { title: "Time, Speed, Distance & Boat Mock Test",             subject: "Mathematics" },
  "time":                                          { title: "Time Mock Test",                                     subject: "Mathematics" },
  "Trigonometry":                                  { title: "Trigonometry Mock Test",                             subject: "Mathematics" },
  "Height":                                        { title: "Height & Distance Mock Test",                        subject: "Mathematics" },
  "maths":                                         { title: "Maths Mock Test",                                    subject: "Mathematics" },
  "arithmetic-sectional-test":                     { title: "Arithmetic Sectional Test",                          subject: "Mathematics" },
  "line-angles-test-1":                            { title: "Lines & Angles Test 1",                              subject: "Mathematics" },
  "triangles-test-1":                              { title: "Triangles Test 1",                                   subject: "Mathematics" },
  // Current Affairs / GK
  "military-exercise-test-1":                      { title: "Military Exercise Test 1",                           subject: "Current Affairs" },
  "current-affairs-pyq-2026-test-1":               { title: "Current Affairs PYQ 2026 Test 1",                    subject: "Current Affairs" },
  "important-days-test-1":                         { title: "Important Days Test 1",                              subject: "Current Affairs" },
  "Sports":                                        { title: "Sports Mock Test",                                   subject: "General Knowledge" },
};

// ── Bot User-Agent detection ──────────────────────────────────────────────────
const BOT_UA = /whatsapp|facebookexternalhit|twitterbot|telegrambot|linkedinbot|slackbot|discordbot|vkshare|googlebot|bingbot|applebot|curl|wget|python-requests|ia_archiver/i;

export default async (request, context) => {
  const ua = request.headers.get("user-agent") ?? "";
  if (!BOT_UA.test(ua)) return context.next(); // real user — pass through untouched

  const url   = new URL(request.url);
  const parts = url.pathname.replace(/^\//, "").split("/");
  // Paths:  /mock-test/<slug>  or  /free-mock-test/<slug>
  const slug  = parts[parts.length - 1] ?? "";
  const meta  = TEST_META[slug];
  if (!meta) return context.next(); // unknown slug — serve default index.html as-is

  const siteUrl  = `${url.protocol}//${url.host}`;
  const ogTitle  = `${meta.title} | Exam Rojgaar`;
  const ogDesc   = `Attempt the ${meta.title} on Exam Rojgaar and test your ${meta.subject} preparation for RRB, SSC & Banking exams. Free mock test with instant score & analysis.`;
  const ogImage  = `${siteUrl}/og-banner.png`;
  const ogUrl    = `${siteUrl}${url.pathname}`;

  const res  = await context.next();
  const html = await res.text();

  const patched = html
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/,        `$1${ogTitle}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/,  `$1${ogDesc}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/,          `$1${ogUrl}$2`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/,        `$1${ogImage}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,       `$1${ogTitle}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,`$1${ogDesc}$2`)
    .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,       `$1${ogImage}$2`)
    .replace(/(<title>)[^<]*(<\/title>)/,                                 `$1${ogTitle}$2`);

  return new Response(patched, {
    status:  res.status,
    headers: {
      ...Object.fromEntries(res.headers),
      "content-type": "text/html; charset=utf-8",
    },
  });
};

export const config = { path: ["/mock-test/*", "/free-mock-test/*"] };
