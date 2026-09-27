import https from 'https';

const urls = [
  'https://support.brother.com/g/b/faqend.aspx?c=us&lang=en&prod=hll2370dw_us&faqid=faq00100216_510',
  'https://help.brother-usa.com/app/answers/detail/a_id/67527/~/can-i-turn-off-deep-sleep-mode',
  'https://ij.manual.canon/ij/webmanual/ErrorCode/MB2700%20series/EN/ERR/err_contents0100.html',
  'https://community.usa.canon.com/t5/Printer-Software-Networking/Communication-Error-306/td-p/145956',
  'https://ij.manual.canon/ij/webmanual/ErrorCode/GX7000%20series/EN/ERR/err_contents0100.html',
  'https://ij.manual.canon/ij/webmanual/ErrorCode/GX6000%20series/EN/ERR/err_contents0100.html',
  'https://ij.manual.canon/ij/webmanual/ErrorCode/GX4000%20series/EN/ERR/err_contents0100.html'
];

async function checkUrl(url: string): Promise<{ url: string; status: number; title: string }> {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => {
          if (body.length < 5000) body += chunk;
        });
        res.on('end', () => {
          const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
          resolve({
            url,
            status: res.statusCode || 0,
            title: titleMatch ? titleMatch[1].trim() : 'No Title'
          });
        });
      });
      req.on('error', (e) => {
        resolve({ url, status: 0, title: e.message });
      });
      req.setTimeout(10000, () => {
        req.destroy();
        resolve({ url, status: 408, title: 'Timeout' });
      });
    } catch (e: any) {
      resolve({ url, status: 0, title: e.message });
    }
  });
}

async function main() {
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(`${res.status} | ${res.title} | ${res.url}`);
  }
}

main();
