#!/usr/bin/env node
/**
 * HTML-to-React Mock Test Converter
 *
 * Usage:
 *   node scripts/html-to-mock.js <html-file-path> <route-name>
 *
 * Example:
 *   node scripts/html-to-mock.js "src/component/files_html/Delhi Sultanate.html" delhi-sultanate
 *
 * This will:
 *   1. Parse rawData and totalTime from the HTML file
 *   2. Generate src/data/<camelCase>MockData.js
 *   3. Generate src/pages/<PascalCase>MockTestPage.jsx
 *   4. Add the import and route entry in src/App.jsx
 *   5. Add mock test card entry in src/pages/mockData.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// --- Helpers ---
function toCamelCase(routeName) {
  return routeName
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

function toPascalCase(routeName) {
  return routeName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function extractRawData(html) {
  // Match the rawData array from the script
  const rawDataMatch = html.match(/const\s+rawData\s*=\s*\[([\s\S]*?)^\];/m);
  if (!rawDataMatch) {
    throw new Error("Could not find 'const rawData = [...]' in the HTML file.");
  }
  const rawArrayStr = "[" + rawDataMatch[1] + "]";

  // Use Function constructor to safely evaluate the JS array literal
  let questions;
  try {
    questions = new Function("return " + rawArrayStr)();
  } catch (e) {
    throw new Error("Failed to parse rawData array: " + e.message);
  }
  return questions;
}

function extractTotalTime(html) {
  // Match: const totalTime = 3 * 60  OR  let timeLeft = 3 * 60
  const match = html.match(/(?:const\s+totalTime|let\s+timeLeft)\s*=\s*(\d+)\s*\*\s*60/);
  if (match) return parseInt(match[1], 10);
  // fallback: const totalTime = 180
  const match2 = html.match(/(?:const\s+totalTime|let\s+timeLeft)\s*=\s*(\d+)/);
  if (match2) return Math.round(parseInt(match2[1], 10) / 60);
  return 3; // default 3 minutes
}

function extractCategory(html) {
  // Try to extract from the blue badge text on the home screen
  const match = html.match(
    /text-brand-accent font-semibold[^>]*>\s*([^<]+)/
  );
  if (match) return match[1].trim();
  return "Mock Test";
}

function toHumanTitle(routeName) {
  // "delhi-sultanate" -> "Delhi Sultanate"
  return routeName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// --- Main ---
function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: node scripts/html-to-mock.js <html-file> <route-name>");
    console.error('Example: node scripts/html-to-mock.js "src/component/files_html/Delhi Sultanate.html" delhi-sultanate');
    process.exit(1);
  }

  const htmlFilePath = path.resolve(ROOT, args[0]);
  const routeName = args[1]; // e.g. "delhi-sultanate"

  if (!fs.existsSync(htmlFilePath)) {
    console.error(`File not found: ${htmlFilePath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(htmlFilePath, "utf-8");

  // --- Extract data ---
  const questions = extractRawData(html);
  const durationMinutes = extractTotalTime(html);
  const category = extractCategory(html);

  const camel = toCamelCase(routeName); // e.g. "delhiSultanate"
  const pascal = toPascalCase(routeName); // e.g. "DelhiSultanate"
  const dataVarName = `${camel}MockData`; // e.g. "delhiSultanateMockData"
  const dataFileName = `${camel}MockData.js`; // e.g. "delhiSultanateMockData.js"
  const pageComponentName = `${pascal}MockTestPage`; // e.g. "DelhiSultanateMockTestPage"
  const pageFileName = `${pascal}MockTestPage.jsx`;

  // --- 1. Generate data file ---
  const dataObj = {
    title: "EXAM ROJGAAR MOCKS",
    subtitle:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। / You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    category,
    duration: durationMinutes,
    questions,
  };

  const dataFileContent = `export const ${dataVarName} = ${JSON.stringify(dataObj, null, 2)};\n`;
  const dataFilePath = path.join(ROOT, "src", "data", dataFileName);
  fs.writeFileSync(dataFilePath, dataFileContent, "utf-8");
  console.log(`✅ Created data file: src/data/${dataFileName}`);

  // --- 2. Generate page component ---
  const pageContent = `import React from "react";
import MockTest from "../component/MockTest";
import { ${dataVarName} } from "../data/${camel}MockData";

const ${pageComponentName} = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={${dataVarName}} onComplete={handleComplete} />
    </div>
  );
};

export default ${pageComponentName};
`;
  const pageFilePath = path.join(ROOT, "src", "pages", pageFileName);
  fs.writeFileSync(pageFilePath, pageContent, "utf-8");
  console.log(`✅ Created page file: src/pages/${pageFileName}`);

  // --- 3. Update App.jsx ---
  const appPath = path.join(ROOT, "src", "App.jsx");
  let appContent = fs.readFileSync(appPath, "utf-8");

  // Add import (before the router declaration)
  const importLine = `import ${pageComponentName} from "./pages/${pageComponentName}";`;
  if (!appContent.includes(importLine)) {
    // Insert after the last mock test import
    const lastImportIdx = appContent.lastIndexOf("import ");
    const endOfLastImport = appContent.indexOf("\n", lastImportIdx);
    appContent =
      appContent.slice(0, endOfLastImport + 1) +
      importLine +
      "\n" +
      appContent.slice(endOfLastImport + 1);
    console.log(`✅ Added import for ${pageComponentName} in App.jsx`);
  } else {
    console.log(`⚠️  Import for ${pageComponentName} already exists in App.jsx`);
  }

  // Add route inside /mock-test children
  const routeEntry = `      { path: "${routeName}", element: <${pageComponentName} /> },`;
  if (!appContent.includes(`path: "${routeName}"`)) {
    // Find the /mock-test children array and insert before its closing bracket
    const mockTestChildrenPattern = /path:\s*"\/mock-test"[\s\S]*?children:\s*\[/;
    const match = mockTestChildrenPattern.exec(appContent);
    if (match) {
      // Find the closing ] of the children array
      const childrenStart = match.index + match[0].length;
      let depth = 1;
      let i = childrenStart;
      while (i < appContent.length && depth > 0) {
        if (appContent[i] === "[") depth++;
        if (appContent[i] === "]") depth--;
        i++;
      }
      // i is now right after the closing ]
      const insertPos = i - 1; // right before the ]
      appContent =
        appContent.slice(0, insertPos) +
        "\n" +
        routeEntry +
        "\n    " +
        appContent.slice(insertPos);
      console.log(`✅ Added route "/${routeName}" under /mock-test in App.jsx`);
    } else {
      console.error("❌ Could not find /mock-test children array in App.jsx. Add the route manually.");
    }
  } else {
    console.log(`⚠️  Route "${routeName}" already exists in App.jsx`);
  }

  fs.writeFileSync(appPath, appContent, "utf-8");

  // --- 4. Update mockData.js (add card entry) ---
  const mockDataPath = path.join(ROOT, "src", "pages", "mockData.js");
  let mockDataContent = fs.readFileSync(mockDataPath, "utf-8");

  const mockEntryId = `${routeName}-mock-test`;
  if (!mockDataContent.includes(`"${mockEntryId}"`)) {
    const humanTitle = toHumanTitle(routeName);
    const questionCount = String(questions.length);
    const mockEntry = `            {
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

    // Find the last isSpecialMock entry's closing },  then insert after it
    const lastSpecialIdx = mockDataContent.lastIndexOf('route: "/mock-test/');
    if (lastSpecialIdx !== -1) {
      // Find the end of that entry block: next "},"
      const closingBrace = mockDataContent.indexOf("},", lastSpecialIdx);
      if (closingBrace !== -1) {
        const insertPos = closingBrace + 2; // after the "},"
        mockDataContent =
          mockDataContent.slice(0, insertPos) +
          "\n" +
          mockEntry +
          mockDataContent.slice(insertPos);
        console.log(`✅ Added mock test card in src/pages/mockData.js`);
      } else {
        console.error("❌ Could not find insertion point in mockData.js. Add the card manually.");
      }
    } else {
      console.error("❌ Could not find any existing mock test entries in mockData.js. Add the card manually.");
    }

    fs.writeFileSync(mockDataPath, mockDataContent, "utf-8");
  } else {
    console.log(`⚠️  Mock data entry "${mockEntryId}" already exists in mockData.js`);
  }

  console.log("\n🎉 Done! You can now run `npm run dev` and navigate to /mock-test/" + routeName);
}

main();
