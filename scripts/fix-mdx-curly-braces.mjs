#!/usr/bin/env node
/**
 * Fix MDX files that have unescaped curly braces outside of code fences.
 * This is common in cookbook files where Python output contains dicts like {'key': 'value'}
 *
 * Strategy: Find lines outside of code fences that contain { or } and escape them.
 * We escape { as \{ and } as \} but ONLY outside of:
 * - Code fences (``` blocks)
 * - JSX expressions (like {variable} in component props)
 * - Import/export statements
 */

import fs from 'fs';
import path from 'path';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.log('Usage: node fix-mdx-curly-braces.mjs <file1> [file2] ...');
  process.exit(1);
}

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let inCodeFence = false;
  let inFrontmatter = false;
  let frontmatterCount = 0;
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track frontmatter
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount <= 2) {
        inFrontmatter = frontmatterCount === 1;
        if (frontmatterCount === 2) inFrontmatter = false;
        continue;
      }
    }
    if (inFrontmatter) continue;

    // Track code fences
    if (line.trimStart().startsWith('```')) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) continue;

    // Skip import/export lines
    if (line.trimStart().startsWith('import ') || line.trimStart().startsWith('export ')) continue;

    // Skip lines that look like JSX component usage (starts with <)
    if (line.trimStart().startsWith('<')) continue;

    // Skip lines that look like JSX props (contains ={something})
    if (/=\{[^}]+\}/.test(line)) continue;

    // Skip lines that are JSX expression containers (like {children})
    if (line.trim().startsWith('{') && line.trim().endsWith('}') && !line.includes("'") && !line.includes(':')) continue;

    // If line contains { or } and looks like Python output or data (not JSX), escape them
    if (line.includes('{') || line.includes('}')) {
      // Check if this looks like a Python dict, output, or data line
      // Heuristic: contains quotes like ' or ", or starts with whitespace, or has Python-like patterns
      const isPythonLike = /['"].*[{}]|[{}].*['"]|^\s+[{}']|^[{}]|datetime\.|np\.|float64|True|False|None/.test(line);
      const isHtmlStyle = /<style|<\/style|\.dataframe|border:|text-align:|background-color:/.test(line);

      if (isPythonLike || isHtmlStyle) {
        const newLine = line.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
        if (newLine !== line) {
          lines[i] = newLine;
          modified = true;
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(file, lines.join('\n'));
    console.log(`Fixed: ${file}`);
  } else {
    console.log(`No changes needed: ${file}`);
  }
}
