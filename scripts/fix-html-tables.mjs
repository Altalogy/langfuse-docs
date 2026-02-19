#!/usr/bin/env node
/**
 * Fix MDX files that contain raw HTML blocks (like pandas DataFrame tables
 * with <style> and <table> elements) that have unescaped curly braces.
 *
 * Wraps these HTML blocks in code fences to prevent MDX parsing.
 * Also escapes curly braces in inline text outside code fences.
 */

import fs from 'fs';
import path from 'path';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.log('Usage: node fix-html-tables.mjs <file1> [file2] ...');
  process.exit(1);
}

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let inCodeFence = false;
  let inFrontmatter = false;
  let frontmatterCount = 0;
  let inHtmlBlock = false;
  let htmlBlockStart = -1;
  const newLines = [];
  let modified = false;

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

    // Track code fences
    if (line.trimStart().startsWith('```')) {
      inCodeFence = !inCodeFence;
      newLines.push(line);
      continue;
    }

    if (inCodeFence) {
      newLines.push(line);
      continue;
    }

    // Detect HTML blocks with <style> or <div> containing dataframes
    if (!inHtmlBlock && (line.trim() === '<div>' || line.trim().startsWith('<style'))) {
      // Look ahead to see if this block contains curly braces
      let blockEnd = -1;
      let hasBraces = false;
      const closingTag = line.trim().startsWith('<style') ? '</style>' : '</div>';
      for (let j = i; j < lines.length; j++) {
        if (lines[j].includes('{') || lines[j].includes('}')) hasBraces = true;
        if (lines[j].includes(closingTag) || (closingTag === '</div>' && lines[j].trim() === '</div>')) {
          blockEnd = j;
          break;
        }
      }
      if (hasBraces && blockEnd > i) {
        // Wrap the entire block in code fence
        newLines.push('```html');
        for (let j = i; j <= blockEnd; j++) {
          newLines.push(lines[j]);
        }
        newLines.push('```');
        newLines.push('');
        i = blockEnd;
        modified = true;
        continue;
      }
    }

    // For non-code-fence lines, escape loose curly braces that look like data output
    if ((line.includes('{') || line.includes('}')) && !line.trimStart().startsWith('import ') && !line.trimStart().startsWith('export ') && !line.trimStart().startsWith('<')) {
      // Check if it looks like Python tqdm/progress output or data
      if (/\d+%\|.*\|.*</.test(line) || /\?it\/s/.test(line) || /\d+:\d+<\d+:\d+/.test(line)) {
        newLines.push('```text');
        newLines.push(line);
        newLines.push('```');
        modified = true;
        continue;
      }
    }

    newLines.push(line);
  }

  if (modified) {
    fs.writeFileSync(file, newLines.join('\n'));
    console.log(`Fixed: ${file}`);
  } else {
    console.log(`No changes needed: ${file}`);
  }
}
