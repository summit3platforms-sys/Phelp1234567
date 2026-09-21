const str = `<p>Hello</p>
<h2>Title</h2>
<ul><li>One</li><li>Two</li></ul>
<table>
  <tr><th>Key</th><th>Value</th></tr>
  <tr><td>A</td><td>B</td></tr>
</table>`;

const cleanContent = str
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n')
  .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
  .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
  .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
  .replace(/<details>[\s\S]*?<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi, '\n**Q: $1**\n$2\n')
  .replace(/<tr[^>]*>/gi, '\n| ')
  .replace(/<\/tr>/gi, '')
  .replace(/<th[^>]*>/gi, '')
  .replace(/<\/th>/gi, ' | ')
  .replace(/<td[^>]*>/gi, '')
  .replace(/<\/td>/gi, ' | ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/[ \t]+/g, ' ')
  .replace(/\n\s*\n/g, '\n\n')
  .trim();

console.log(cleanContent);
