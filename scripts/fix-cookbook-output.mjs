#!/usr/bin/env node
/**
 * Fix cookbook MDX files: Wrap indented output blocks (notebook cell output)
 * in code fences to prevent MDX from parsing curly braces as JSX.
 *
 * Pattern: After a closing ```, there are sometimes indented lines (4 spaces)
 * that represent cell output. These need to be wrapped in ```text fences.
 *
 * Also handles:
 * - ```env → ```text (unsupported language)
 * - HTML <style> blocks that need escaping
 */

import fs from 'fs';
import path from 'path';
import { readdirSync, statSync } from 'fs';

function walkDir(dir) {
  let results = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(full));
    } else if (full.endsWith('.mdx')) {
      results.push(full);
    }
  }
  return results;
}

const targetDir = process.argv[2] || 'content';
const files = walkDir(targetDir);

let totalFixed = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let modified = false;
  let inCodeFence = false;
  let inFrontmatter = false;
  let frontmatterCount = 0;
  let inOutputBlock = false;
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track frontmatter
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount === 1) inFrontmatter = true;
      if (frontmatterCount === 2) inFrontmatter = false;
      newLines.push(line);
      continue;
    }
    if (inFrontmatter) {
      newLines.push(line);
      continue;
    }

    // Fix ```env → ```text
    if (line.trimStart().match(/^```env\b/)) {
      newLines.push(line.replace('```env', '```text'));
      inCodeFence = true;
      modified = true;
      continue;
    }

    // Track code fences
    if (line.trimStart().startsWith('```')) {
      if (inCodeFence) {
        // Closing fence
        inCodeFence = false;
        newLines.push(line);
        continue;
      } else {
        // Opening fence
        inCodeFence = true;
        newLines.push(line);
        continue;
      }
    }

    if (inCodeFence) {
      newLines.push(line);
      continue;
    }

    // Check if this line is indented output (4+ spaces) that contains problematic chars
    const isIndentedOutput = /^    \S/.test(line) || /^    /.test(line) && line.trim().length > 0;

    if (isIndentedOutput && !inOutputBlock) {
      // Check if this line or nearby lines contain { or } or HTML
      const hasBraces = line.includes('{') || line.includes('}');
      const hasHtmlStyle = /<style|<\/style/.test(line);

      // Look ahead to see if any line in this indented block has braces
      let blockHasBraces = hasBraces || hasHtmlStyle;
      if (!blockHasBraces) {
        for (let j = i + 1; j < lines.length && (lines[j].startsWith('    ') || lines[j].trim() === ''); j++) {
          if (lines[j].includes('{') || lines[j].includes('}') || /<style|<\/style/.test(lines[j])) {
            blockHasBraces = true;
            break;
          }
        }
      }

      if (blockHasBraces) {
        // Start wrapping in code fence
        newLines.push('```text');
        inOutputBlock = true;
        modified = true;
      }
    }

    if (inOutputBlock) {
      if (!isIndentedOutput && line.trim() !== '') {
        // End of indented block
        newLines.push('```');
        newLines.push('');
        inOutputBlock = false;
      } else if (line.trim() === '') {
        // Check if the next non-empty line is still indented
        let nextNonEmpty = i + 1;
        while (nextNonEmpty < lines.length && lines[nextNonEmpty].trim() === '') nextNonEmpty++;
        if (nextNonEmpty < lines.length && /^    /.test(lines[nextNonEmpty])) {
          // Still in the output block, keep going
          newLines.push(line);
          continue;
        } else {
          // End of output block
          newLines.push('```');
          newLines.push('');
          inOutputBlock = false;
          continue; // Skip the blank line since we added one
        }
      }
    }

    newLines.push(line);
  }

  // Close any open output block at end of file
  if (inOutputBlock) {
    newLines.push('```');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, newLines.join('\n'));
    console.log(`Fixed: ${file}`);
    totalFixed++;
  }
}

console.log(`\nTotal files fixed: ${totalFixed}`);
