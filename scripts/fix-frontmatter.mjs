#!/usr/bin/env node
/**
 * Fix missing frontmatter title in MDX files.
 * Fumadocs requires `title` in frontmatter. This script:
 * 1. Finds MDX files without a title in frontmatter
 * 2. Extracts the first H1 heading as the title
 * 3. Adds it to the frontmatter
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");

// Only process Fumadocs content sections
const SECTIONS = [
  "docs",
  "self-hosting",
  "guides",
  "integrations",
  "faq",
  "handbook",
  "library",
  "security",
];

function findMdxFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (item.name.endsWith(".mdx") || item.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { frontmatter: null, body: content, raw: null };

  const raw = match[1];
  const body = content.slice(match[0].length);

  // Simple YAML parsing for title
  const titleMatch = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const title = titleMatch ? titleMatch[1] : null;

  return { frontmatter: { title }, body, raw, fullMatch: match[0] };
}

function extractFirstH1(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function titleFromFilename(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  if (basename === "index") {
    // Use parent directory name
    const parentDir = path.basename(path.dirname(filePath));
    return parentDir
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return basename
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

let fixed = 0;
let skipped = 0;
let alreadyOk = 0;

for (const section of SECTIONS) {
  const sectionDir = path.join(CONTENT_DIR, section);
  const files = findMdxFiles(sectionDir);

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const { frontmatter, body, raw, fullMatch } = parseFrontmatter(content);

    if (frontmatter?.title) {
      alreadyOk++;
      continue;
    }

    // Try to extract title from H1 heading
    let title = extractFirstH1(body || content);
    if (!title) {
      // Fall back to filename
      title = titleFromFilename(file);
    }

    // Escape quotes in title
    const escapedTitle = title.replace(/"/g, '\\"');

    let newContent;
    if (raw !== null) {
      // Has frontmatter but no title - add title
      const newFrontmatter = `title: "${escapedTitle}"\n${raw}`;
      newContent = `---\n${newFrontmatter}\n---\n${body}`;
    } else {
      // No frontmatter at all - add it
      newContent = `---\ntitle: "${escapedTitle}"\n---\n\n${content}`;
    }

    fs.writeFileSync(file, newContent);
    fixed++;
    console.log(
      `  Fixed: ${path.relative(ROOT, file)} → "${title}"`
    );
  }
}

console.log(`\nDone! Fixed: ${fixed}, Already OK: ${alreadyOk}, Skipped: ${skipped}`);
