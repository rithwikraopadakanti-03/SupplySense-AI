const fs = require('fs');

const filepath = 'app/(dashboard)/copilot/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/\\{\\\`/g, '{`');
content = content.replace(/\\\`\\}/g, '`}');
content = content.replace(/\\\$\\{/g, '${');

fs.writeFileSync(filepath, content, 'utf8');
console.log('Fixed syntax errors aggressively');
