import fs from 'fs';
import path from 'path';

// Helper to parse Issue Form Body (Markdown)
function parseIssueBody(body) {
  const data = {};
  const sections = body.split('### ');
  
  sections.forEach(section => {
    if (!section.trim()) return;
    const lines = section.split('\n');
    const keyLine = lines.shift().trim(); // e.g. "项目名称 (Title)"
    const value = lines.join('\n').trim();
    
    // Map keys to Garbage fields
    if (keyLine.includes('Title')) data.title = value;
    if (keyLine.includes('Author')) data.author = value;
    if (keyLine.includes('Description')) data.description = value;
    if (keyLine.includes('Repository')) data.repo = value;
    if (keyLine.includes('Demo')) data.demo = value;
    if (keyLine.includes('Tags')) data.tags = value;
    if (keyLine.includes('Prompt')) data.prompt = value;
  });

  // Validate
  if (data.value === '_No response_') return null;
  return data;
}

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY; // owner/repo
  
  if (!token || !repo) {
    console.error('Missing GITHUB_TOKEN or GITHUB_REPOSITORY');
    process.exit(1);
  }

  // 1. Fetch Open Submission Issues
  console.log(`🔍 Scanning for trash in ${repo}...`);
  const issuesUrl = `https://api.github.com/repos/${repo}/issues?labels=submission&state=open`;
  
  const response = await fetch(issuesUrl, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  if (!response.ok) {
    console.error(`Failed to fetch issues: ${response.statusText}`);
    process.exit(1);
  }

  const issues = await response.json();
  
  if (issues.length === 0) {
    console.log('✨ No new garbage found. The heap is clean.');
    return; // Exit, no PR needed
  }

  console.log(`♻️ Found ${issues.length} items to collect.`);

  // 2. Parse Issues to Garbage Objects
  const newGarbageItems = [];
  const processedIssueNumbers = [];

  for (const issue of issues) {
    const parsed = parseIssueBody(issue.body);
    if (!parsed || !parsed.title) {
      console.warn(`⚠️ Skipped Issue #${issue.number}: Could not parse body.`);
      continue;
    }

    const newItem = {
      id: `issue-${issue.number}`, // Unique ID linking back to issue
      title: parsed.title,
      author: parsed.author,
      description: parsed.description,
      links: {
        repo: parsed.repo === '_No response_' ? undefined : parsed.repo,
        demo: parsed.demo === '_No response_' ? undefined : parsed.demo,
      },
      tags: parsed.tags ? parsed.tags.split(',').map(t => t.trim()).filter(Boolean) : ['community'],
      prompt: parsed.prompt === '_No response_' ? undefined : parsed.prompt,
      created_at: issue.created_at, // Use issue creation time
      updated_at: new Date().toISOString(),
      reference_count: 1, // New items start with 1 ref
      status: 'GarbageStatus.NEW', // We'll handle the Enum string manually
    };

    newGarbageItems.push(newItem);
    processedIssueNumbers.push(issue.number);
  }

  if (newGarbageItems.length === 0) return;

  // 3. Update web/data/garbage.ts
  const garbageFilePath = path.join(process.cwd(), 'web/data/garbage.ts');
  let fileContent = fs.readFileSync(garbageFilePath, 'utf-8');

  // Generate TS string for new items
  // We need to match the indentation and format roughly
  const itemsString = newGarbageItems.map(item => {
    return `  {
    id: '${item.id}',
    title: ${JSON.stringify(item.title)},
    author: ${JSON.stringify(item.author)},
    description: ${JSON.stringify(item.description)},
    links: {
      ${item.links.repo ? `repo: '${item.links.repo}',` : ''}
      ${item.links.demo ? `demo: '${item.links.demo}',` : ''}
    },
    tags: ${JSON.stringify(item.tags)},
    prompt: ${item.prompt ? JSON.stringify(item.prompt) : 'undefined'},
    created_at: '${item.created_at}',
    updated_at: '${item.updated_at}',
    reference_count: ${item.reference_count},
    status: GarbageStatus.NEW,
  }`;
  }).join(',\n');

  // Insert before the last closing bracket "];"
  // Look for the last occurrence of "];"
  const insertionPoint = fileContent.lastIndexOf('];');
  
  if (insertionPoint === -1) {
    console.error('❌ Could not find insertion point in garbage.ts');
    process.exit(1);
  }

  const newContent = fileContent.slice(0, insertionPoint) + ',\n' + itemsString + '\n' + fileContent.slice(insertionPoint);
  
  fs.writeFileSync(garbageFilePath, newContent);
  console.log(`✅ Successfully injected ${newGarbageItems.length} items into the Heap.`);

  // Export issue numbers for the workflow to use (to close them later)
  // We'll write to GITHUB_OUTPUT
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `processed_issues=${processedIssueNumbers.join(',')}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `has_changes=true\n`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
