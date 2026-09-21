const fs = require('fs');
let code = fs.readFileSync('scripts/expand-batch27.ts', 'utf-8');
// replace any backticks that are NOT preceded by "content: " or followed by "  },"
// actually, let's just find the exact line 248.
