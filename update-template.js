const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/[brandSlug]/[categorySlug]/[articleSlug]/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Insert import at top (after imports)
if (!content.includes('FeedbackWidget')) {
  content = content.replace(
    /import Image from 'next\/image';/,
    "import Image from 'next/image';\nimport FeedbackWidget from '../../../components/FeedbackWidget';"
  );

  // Insert the widget right before </article>
  content = content.replace(
    /<\/article>/,
    "  {/* User Interaction Feedback Widget */}\n            <FeedbackWidget />\n\n          </article>"
  );

  fs.writeFileSync(filePath, content);
  console.log('Template updated successfully.');
}
