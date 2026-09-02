#!/usr/bin/env node
/**
 * HTML-to-React Mock Test Converter
 *
 * Usage:
 *   node scripts/html-to-mock.js <html-file-path> <route-name> [--category <dot.path>]
 *
 * Arguments:
 *   html-file-path   Path to the source HTML file
 *   route-name       URL slug, e.g. "geography-basics-test-1"
 *
 * Options:
 *   --category <dot.path>
 *       Dot-separated path into the mockData.js category tree where the test card
 *       should be inserted.  Examples:
 *         rrb.rrb-ntpc.geography.basic-concepts
 *         rrb.rrb-ntpc.history.ancient-history
 *         rrb.rrb-ntpc.polity.constitution
 *       If omitted the card is appended after the last existing route entry (legacy behaviour).
 *
 * Examples:
 *   node scripts/html-to-mock.js "src/component/files_html/Geography Basics Test 1.html" geography-basics-test-1 --category rrb.rrb-ntpc.geography.basic-concepts
 *   node scripts/html-to-mock.js "src/component/files_html/Delhi Sultanate.html" delhi-sultanate --category rrb.rrb-ntpc.history.medieval-history
 *
 * What this does:
 *   1. Parses rawData, timer, paper metadata from the HTML file
 *   2. Generates src/data/<camelCase>MockData.js
 *   3. Generates src/pages/<PascalCase>MockTestPage.jsx  (uses TestSeries component)
 *   4. Adds the import + route entry in src/App.jsx
 *   5. Adds a mock test card in src/pages/mockData.js under the specified category
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toCamelCase(routeName) {
  return routeName
    .split("-")
    .map((part, i) =>
      i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join("");
}

function toPascalCase(routeName) {
  return routeName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toHumanTitle(routeName) {
  return routeName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── HTML extractors ─────────────────────────────────────────────────────────

function extractRawData(html) {
  const rawDataMatch = html.match(/const\s+rawData\s*=\s*\[([\s\S]*?)^\s*\];/m);
  if (!rawDataMatch) {
    throw new Error("Could not find 'const rawData = [...]' in the HTML file.");
  }
  const rawArrayStr = "[" + rawDataMatch[1] + "]";
  try {
    return new Function("return " + rawArrayStr)();
  } catch (e) {
    throw new Error("Failed to parse rawData array: " + e.message);
  }
}

/**
 * Duration: prefer `let timeLeft = N * 60` (the actual exam timer),
 * fall back to `const totalTime = N * 60`, then plain seconds / 60.
 */
function extractDuration(html) {
  // 1. let timeLeft = N * 60
  const tl = html.match(/let\s+timeLeft\s*=\s*(\d+)\s*\*\s*60/);
  if (tl) return parseInt(tl[1], 10);
  // 2. const totalTime = N * 60
  const tt = html.match(/const\s+totalTime\s*=\s*(\d+)\s*\*\s*60/);
  if (tt) return parseInt(tt[1], 10);
  // 3. plain seconds
  const ps = html.match(/(?:let\s+timeLeft|const\s+totalTime)\s*=\s*(\d+)/);
  if (ps) return Math.round(parseInt(ps[1], 10) / 60);
  return 10; // default
}

/** Extract paper name from id="paper-name-display" inner text */
function extractPaperName(html) {
  const m = html.match(/id="paper-name-display"[^>]*>([^<]+)</);
  if (m) return m[1].trim();
  return "Mock Test";
}

/** Extract subject from id="subject-display" inner text */
function extractSubject(html) {
  const m = html.match(/id="subject-display"[^>]*>([^<]+)</);
  if (m) return m[1].trim();
  return "General Studies";
}

/** Extract marks from "Marks: +2.0, -0.5" style text in HTML */
function extractMarks(html) {
  const m = html.match(/Marks:\s*\+(\d+(?:\.\d+)?),\s*-(\d+(?:\.\d+)?)/);
  if (m) return { correct: parseFloat(m[1]), wrong: parseFloat(m[2]) };
  return { correct: 2, wrong: 0.5 };
}

/** Extract HISTORY_STORAGE_KEY value */
function extractStorageKey(html) {
  const m = html.match(/HISTORY_STORAGE_KEY\s*=\s*['"]([^'"]+)['"]/);
  if (m) return m[1].trim();
  return null; // will be generated from routeName
}

// ─── mockData.js category insertion ──────────────────────────────────────────

/**
 * Insert a test card into the correct `tests: [...]` array inside mockData.js
 * using a dot-path like "rrb.rrb-ntpc.geography.basic-concepts".
 *
 * Strategy: we work on the raw text.  We locate the target `tests: [` by
 * walking the path segments and finding each quoted key in order.  Once we
 * have the offset of the target array we find its closing `]` and insert
 * before it.
 */
function insertCardIntoCategory(mockDataContent, dotPath, cardText) {
  const segments = dotPath.split(".");

  let searchFrom = 0;
  for (const seg of segments) {
    // Match both quoted ("seg":) and unquoted (seg:) JS object keys
    const keyPattern = new RegExp(
      `(?:["']${escapeRegex(seg)}["']|\\b${escapeRegex(seg)}\\b)\\s*:`
    );
    const match = keyPattern.exec(mockDataContent.slice(searchFrom));
    if (!match) {
      throw new Error(
        `Category path segment "${seg}" not found in mockData.js (searched from offset ${searchFrom}).`
      );
    }
    searchFrom += match.index + match[0].length;
  }

  // From searchFrom, find the FIRST `tests: [` that follows
  const testsMatch = /\btests\s*:\s*\[/.exec(mockDataContent.slice(searchFrom));
  if (!testsMatch) {
    throw new Error(
      `No "tests: [" found after category path "${dotPath}" in mockData.js.`
    );
  }
  const testsArrayStart = searchFrom + testsMatch.index + testsMatch[0].length;

  // Walk forward to find the matching closing `]`
  let depth = 1;
  let i = testsArrayStart;
  while (i < mockDataContent.length && depth > 0) {
    if (mockDataContent[i] === "[") depth++;
    else if (mockDataContent[i] === "]") depth--;
    i++;
  }
  const closingBracketPos = i - 1; // position of `]`

  return (
    mockDataContent.slice(0, closingBracketPos) +
    "\n" +
    cardText +
    "\n                  " +
    mockDataContent.slice(closingBracketPos)
  );
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  // Parse --category option
  let categoryPath = null;
  const catFlagIdx = args.indexOf("--category");
  if (catFlagIdx !== -1) {
    categoryPath = args[catFlagIdx + 1];
    args.splice(catFlagIdx, 2);
  }

  if (args.length < 2) {
    console.error(
      "Usage: node scripts/html-to-mock.js <html-file> <route-name> [--category <dot.path>]"
    );
    console.error(
      'Example: node scripts/html-to-mock.js "src/component/files_html/Geography Basics Test 1.html" geography-basics-test-1 --category rrb.rrb-ntpc.geography.basic-concepts'
    );
    process.exit(1);
  }

  const htmlFilePath = path.resolve(ROOT, args[0]);
  const routeName = args[1];

  if (!fs.existsSync(htmlFilePath)) {
    console.error(`File not found: ${htmlFilePath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(htmlFilePath, "utf-8");

  // ── Extract data from HTML ──
  const questions = extractRawData(html);
  const durationMinutes = extractDuration(html);
  const paperName = extractPaperName(html);
  const subject = extractSubject(html);
  const { correct: marksCorrect, wrong: marksWrong } = extractMarks(html);
  const htmlStorageKey = extractStorageKey(html);

  const camel = toCamelCase(routeName);
  const pascal = toPascalCase(routeName);
  const dataVarName = `${camel}MockData`;
  const dataFileName = `${camel}MockData.js`;
  const pageComponentName = `${pascal}MockTestPage`;
  const pageFileName = `${pageComponentName}.jsx`;
  const storageKey = htmlStorageKey || `ExamRojgaar_${camel}`;

  console.log(`\n📄 HTML file  : ${args[0]}`);
  console.log(`🔗 Route name : ${routeName}`);
  console.log(`📚 Subject    : ${subject}`);
  console.log(`📝 Paper name : ${paperName}`);
  console.log(`⏱  Duration   : ${durationMinutes} min`);
  console.log(`✅ Marks      : +${marksCorrect} / -${marksWrong}`);
  console.log(`❓ Questions  : ${questions.length}`);
  if (categoryPath) console.log(`📂 Category   : ${categoryPath}`);
  console.log("");

  // ── 1. Generate data file ──
  const dataObj = {
    paperName,
    title: "EXAM ROJGAAR MOCKS",
    subtitle:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। / You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    subject,
    category: subject,
    duration: durationMinutes,
    marksCorrect,
    marksWrong,
    telegramLink: "https://t.me/ExamRojgaar",
    storageKey,
    questions,
  };

  const dataFileContent = `export const ${dataVarName} = ${JSON.stringify(dataObj, null, 2)};\n`;
  const dataFilePath = path.join(ROOT, "src", "data", dataFileName);
  fs.writeFileSync(dataFilePath, dataFileContent, "utf-8");
  console.log(`✅ Created data file     : src/data/${dataFileName}`);

  // ── 2. Generate page component (uses TestSeries) ──
  const pageContent = `import React from "react";
import { ${dataVarName} } from "../data/${camel}MockData";
import TestSeries from "../component/TestSeries";

const ${pageComponentName} = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={${dataVarName}} onComplete={handleComplete} />
    </div>
  );
};

export default ${pageComponentName};
`;
  const pageFilePath = path.join(ROOT, "src", "pages", pageFileName);
  fs.writeFileSync(pageFilePath, pageContent, "utf-8");
  console.log(`✅ Created page file      : src/pages/${pageFileName}`);

  // ── 3. Update App.jsx ──
  const appPath = path.join(ROOT, "src", "App.jsx");
  let appContent = fs.readFileSync(appPath, "utf-8");

  const importLine = `import ${pageComponentName} from "./pages/${pageComponentName}";`;
  if (!appContent.includes(importLine)) {
    const lastImportIdx = appContent.lastIndexOf("import ");
    const endOfLastImport = appContent.indexOf("\n", lastImportIdx);
    appContent =
      appContent.slice(0, endOfLastImport + 1) +
      importLine +
      "\n" +
      appContent.slice(endOfLastImport + 1);
    console.log(`✅ Added import in App.jsx: ${pageComponentName}`);
  } else {
    console.log(`⚠️  Import already exists : ${pageComponentName}`);
  }

  const routeEntry = `      { path: "${routeName}", element: <${pageComponentName} /> },`;
  if (!appContent.includes(`path: "${routeName}"`)) {
    const mockTestChildrenPattern = /path:\s*"\/mock-test"[\s\S]*?children:\s*\[/;
    const match = mockTestChildrenPattern.exec(appContent);
    if (match) {
      const childrenStart = match.index + match[0].length;
      let depth = 1;
      let i = childrenStart;
      while (i < appContent.length && depth > 0) {
        if (appContent[i] === "[") depth++;
        if (appContent[i] === "]") depth--;
        i++;
      }
      const insertPos = i - 1;
      appContent =
        appContent.slice(0, insertPos) +
        "\n" +
        routeEntry +
        "\n    " +
        appContent.slice(insertPos);
      console.log(`✅ Added route in App.jsx : /mock-test/${routeName}`);
    } else {
      console.error(
        "❌ Could not find /mock-test children array in App.jsx. Add the route manually."
      );
    }
  } else {
    console.log(`⚠️  Route already exists  : /mock-test/${routeName}`);
  }

  fs.writeFileSync(appPath, appContent, "utf-8");

  // ── 4. Update mockData.js ──
  const mockDataPath = path.join(ROOT, "src", "pages", "mockData.js");
  let mockDataContent = fs.readFileSync(mockDataPath, "utf-8");

  const mockEntryId = `${routeName}-mock-test`;
  if (!mockDataContent.includes(`"${mockEntryId}"`)) {
    const humanTitle = toHumanTitle(routeName);
    const questionCount = String(questions.length);
    const mockCard = `                    {
                      id: "${mockEntryId}",
                      image: "/rrb-ntpc.webp",
                      alt: "${humanTitle} Mock Test",
                      title: "${humanTitle} - Mock Test",
                      name: "${humanTitle} Mock",
                      difficulty: "Hard",
                      languages: ["English", "Hindi"],
                      questions: "${questionCount}",
                      marks: "${questionCount}",
                      duration: "${durationMinutes}",
                      isSpecialMock: true,
                      route: "/mock-test/${routeName}",
                    },`;

    if (categoryPath) {
      // Insert into the specified category tree
      try {
        mockDataContent = insertCardIntoCategory(
          mockDataContent,
          categoryPath,
          mockCard
        );
        console.log(
          `✅ Added card in mockData.js under: ${categoryPath}`
        );
      } catch (err) {
        console.error(`❌ Category insertion failed: ${err.message}`);
        console.error(
          "   Add the following card manually to mockData.js:\n",
          mockCard
        );
      }
    } else {
      // Legacy: insert after the last route entry
      const lastRouteIdx = mockDataContent.lastIndexOf('route: "/mock-test/');
      if (lastRouteIdx !== -1) {
        const closingBrace = mockDataContent.indexOf("},", lastRouteIdx);
        if (closingBrace !== -1) {
          const insertPos = closingBrace + 2;
          mockDataContent =
            mockDataContent.slice(0, insertPos) +
            "\n" +
            mockCard +
            mockDataContent.slice(insertPos);
          console.log(
            `✅ Added card in mockData.js (legacy – after last route entry)`
          );
        } else {
          console.error(
            "❌ Could not find insertion point in mockData.js. Add the card manually."
          );
        }
      } else {
        console.error(
          "❌ No existing route entries in mockData.js. Add the card manually."
        );
      }
    }

    fs.writeFileSync(mockDataPath, mockDataContent, "utf-8");
  } else {
    console.log(`⚠️  Card already exists   : "${mockEntryId}" in mockData.js`);
  }

  console.log(
    `\n🎉 Done! Run \`npm run dev\` and navigate to /mock-test/${routeName}\n`
  );
}

main();
