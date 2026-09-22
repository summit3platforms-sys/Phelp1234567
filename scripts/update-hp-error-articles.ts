import { prisma } from '../src/lib/prisma';

async function updateHpArticles() {
  console.log('Starting HP error articles refurbishment & repair...');

  // 1. Update errorCode fields
  const codeUpdates = [
    { slug: 'hp-printer-error-0xc19a0003-problem-with-printhead', code: '0xc19a0003' },
    { slug: 'hp-printer-error-0xc4eb827f-ink-system-failure-fix', code: '0xC4EB827F' },
    { slug: 'hp-printer-error-79-service-error-real-fix', code: '79' },
    { slug: 'hp-laserjet-50-2-fuser-error-fix', code: '50.2' },
    { slug: 'hp-printer-13-20-paper-jam-error-fix', code: '13.20' }
  ];

  for (const item of codeUpdates) {
    await prisma.article.update({
      where: { slug: item.slug },
      data: { errorCode: item.code }
    });
    console.log(`✓ Set errorCode="${item.code}" for ${item.slug}`);
  }

  // 2. Refurbish hp-laserjet-50-2-fuser-error-fix
  const fuserArticle = await prisma.article.findUnique({
    where: { slug: 'hp-laserjet-50-2-fuser-error-fix' }
  });

  if (fuserArticle) {
    const fuserNewContent = `<h2>The Quick Answer</h2>
<p><strong>An HP LaserJet 50.2 fuser error means the fusing assembly failed to warm up to its required operating temperature within the expected time window.</strong></p>

<p>If this error appeared right after you moved or relocated your printer, the fuser unit was almost certainly jarred loose from its high-voltage power connector, or the printer was moved from a cold vehicle/room into a warm office causing thermal condensation.</p>

<p>Before buying an expensive replacement fuser, reseat the assembly levers, bypass surge protectors by plugging directly into a wall outlet, and give cold units 30 minutes to acclimate.</p>

<h2>Quick-Fix Summary</h2>
<ol>
  <li><strong>Reseat the fuser assembly:</strong> Open the rear door, unlock both blue levers, pull the fuser out 2 inches, and firmly press it back in until both levers click.</li>
  <li><strong>Let the printer acclimate:</strong> If the printer was moved in cold weather or transported in a car, leave it powered off in the warm room for 30–45 minutes before turning it on.</li>
  <li><strong>Bypass power strips and surge protectors:</strong> Plug the AC cord directly into a dedicated 120V/240V wall socket. Fusers draw 600–1000 watts during warm-up.</li>
  <li><strong>Check the fuser paper entry area:</strong> Clear any tiny accordion scraps or labels wrapped around the pressure roller.</li>
  <li><strong>Perform a true capacitor reset:</strong> Unplug the AC cord while powered on, wait 60 seconds, and reconnect directly to power.</li>
</ol>

<h2>What HP LaserJet 50.2 Fuser Error Means</h2>
<p>In HP LaserJet printers, the fuser bonds dry toner powder into the paper fibers using intense heat and mechanical pressure.</p>

<p>When the printer powers on or wakes from sleep, the DC controller sends high current to the ceramic heating element. An onboard thermistor tracks the temperature rise curve.</p>

<p>If the surface does not hit its threshold within roughly 30 to 45 seconds, the printer halts with <strong>50.2 Fuser Error (Slow Warm-Up)</strong> to prevent paper fires and incomplete fusing.</p>

<h2>Fix 1: Reseat the Fuser Assembly and Check Locking Levers</h2>
<p><strong>Turn off the printer, unplug the power cord, and allow the rear fuser area to cool for 20 minutes before touching any internal metal.</strong></p>

<p>Physical movement or vibration during transit commonly wiggles the heavy fuser assembly outward by just 1–2 millimeters.</p>

<ol>
  <li><strong>Open the rear access door:</strong> Lower the fold-down rear output bin or open the fuser door.</li>
  <li><strong>Inspect the blue locking levers:</strong> Locate the two blue or orange release levers on the left and right sides of the fuser frame.</li>
  <li><strong>Release and slide out:</strong> Squeeze or flip the levers downward, then slide the fuser out 2 to 3 inches along its guide rails.</li>
  <li><strong>Inspect the high-voltage male pins:</strong> Check that the electrical contact prongs on the printer chassis are clean, unbent, and free of melted toner dust.</li>
  <li><strong>Firmly reseat the fuser:</strong> Slide the fuser unit straight in with even two-handed pressure until it stops, then push both locking levers up until they lock firmly into place.</li>
</ol>

<h2>Fix 2: Let Cold-Shocked Printers Acclimate</h2>
<p><strong>If you moved your LaserJet from a garage, warehouse, moving van, or cold vehicle, do not turn it on immediately.</strong></p>

<p>Cold printer frames develop microscopic moisture condensation on the internal ceramic heating element and thermistor sensors when brought into a heated room.</p>

<p>Moisture absorbs thermal energy and skews thermistor resistance readings. This tricks the printer engine into reporting a slow warm-up timeout.</p>

<p>Let the printer stand in your conditioned room for at least 45 minutes with the top and rear doors cracked open before connecting power.</p>

<h2>Fix 3: Plug Directly Into the Wall Outlet</h2>
<p><strong>Disconnect your HP LaserJet from any surge suppressor, uninterruptible power supply (UPS), extension cord, or power strip.</strong></p>

<p>LaserJet fusers draw massive bursts of electrical current—frequently exceeding 800 to 1,200 watts for several seconds during startup.</p>

<p>Power strips and consumer-grade UPS units clamp or throttle voltage during peak draw cycles. This starvation prevents the ceramic element from heating up at the required speed.</p>

<p>Plugging directly into a dedicated wall receptacle resolves approximately 30% of sudden 50.2 errors in home and satellite offices.</p>

<h2>Fix 4: Check the Paper Path Near the Fuser</h2>
<p>Power the printer off, let the fuser cool, and inspect the delivery rollers and fuser entrance throat for obstructions.</p>

<p>Look for accordion-folded paper scraps, peeled adhesive shipping labels, or plastic packing clips left over from the move.</p>

<p>Even a lightweight scrap resting against the thermistor sensor bulb can insulate it from the ceramic heater, causing a false 50.2 temperature delay report.</p>

<h2>Fix 5: Replace the Fuser Assembly</h2>
<p>If reseating the assembly, direct wall power, and thermal acclimation fail to clear 50.2, the internal ceramic heater or thermal fuse has reached end-of-life.</p>

<p>Fusers are rated for approximately 100,000 to 200,000 pages depending on your LaserJet model (such as Enterprise M506, M507, M605, or Pro M402/M404).</p>

<p>Replacing the fuser is a tool-less, 5-minute operation: purchase the correct OEM maintenance kit part number, slide out the old unit, and insert the new one.</p>

<h2>When to Call a Professional</h2>
<p>If a brand-new replacement fuser also immediately displays 50.2, the low-voltage power supply (LVPS) or engine controller board triac circuit has failed to deliver AC voltage to the fuser socket.</p>

<p>At that point, board-level component testing or an authorized HP service depot repair is required.</p>

<h2>FAQ</h2>
<details>
  <summary>What does HP LaserJet error 50.2 mean?</summary>
  <p>Error 50.2 indicates a fuser warm-up timeout. The heating element did not reach normal operating temperature within the expected timeframe due to an unseated connector, low line voltage, or a worn element.</p>
</details>

<details>
  <summary>Why did moving my printer cause a 50.2 fuser error?</summary>
  <p>Moving a printer often dislodges the locking tabs or disconnects the high-voltage electrical prongs at the rear. Cold temperature shock during transit can also cause temporary thermistor condensation.</p>
</details>

<details>
  <summary>Can a surge protector cause HP fuser error 50.2?</summary>
  <p>Yes. Fusers require heavy electrical current (800W+) during warmup. Surge protectors and power strips often throttle line voltage, causing the printer to time out and throw error 50.2.</p>
</details>

<details>
  <summary>How do I know if I need a new fuser?</summary>
  <p>If reseating the fuser levers, plugging directly into a verified wall outlet, and acclimating to room temperature do not fix the error, the internal heating element has failed and requires replacement.</p>
</details>

<h3>Additional Resources</h3>
<ul>
  <li><a href="https://support.hp.com/" target="_blank" rel="noopener noreferrer">Official HP Customer Support Knowledge Base</a></li>
  <li><a href="https://support.hp.com/us-en/drivers/printers" target="_blank" rel="noopener noreferrer">HP Printer Drivers &amp; Official Software Downloads</a></li>
</ul>`;

    const wordCount = fuserNewContent.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    await prisma.article.update({
      where: { slug: 'hp-laserjet-50-2-fuser-error-fix' },
      data: {
        content: fuserNewContent,
        wordCount,
        excerpt: 'HP LaserJet 50.2 fuser error explained by a technician: why moving your printer triggers slow warmup, how to reseat the assembly levers, and outlet fixes.'
      }
    });
    console.log(`✓ Refurbished hp-laserjet-50-2-fuser-error-fix (${wordCount} words)`);
  }

  // 3. Clean up hp-printer-13-20-paper-jam-error-fix
  const jamArticle = await prisma.article.findUnique({
    where: { slug: 'hp-printer-13-20-paper-jam-error-fix' }
  });

  if (jamArticle) {
    let cleanedContent = jamArticle.content;

    // Fix regex damage where "13." was stripped leaving isolated "20"
    cleanedContent = cleanedContent.replace(
      /<p><strong><a href="[^"]*"[^>]*>HP printer<\/a>20 paper jam error/g,
      '<p><strong>HP printer 13.20 paper jam error'
    );
    cleanedContent = cleanedContent.replace(
      /<p><strong>HP printer<\/strong>20 paper jam error/g,
      '<p><strong>HP printer 13.20 paper jam error'
    );
    cleanedContent = cleanedContent.replace(
      /<p>20 error remains exactly where it was/g,
      '<p>Yet the 13.20 error remains exactly where it was'
    );
    cleanedContent = cleanedContent.replace(
      /<p>20 errors seem to get permanently worse/g,
      '<p>Many 13.20 errors seem to get permanently worse'
    );
    cleanedContent = cleanedContent.replace(
      /<p>20 error with genuinely no paper anywhere/g,
      '<p>This triggers a persistent 13.20 error with genuinely no paper anywhere'
    );
    cleanedContent = cleanedContent.replace(
      /<h3>20 jam when there's genuinely no paper stuck anywhere\?<\/h3>/g,
      '<h3>Why does my HP printer show a 13.20 jam with no paper stuck inside?</h3>'
    );
    cleanedContent = cleanedContent.replace(
      /An <a href="[^"]*"[^>]*>HP printer<\/a>20 paper jam error/g,
      'An HP printer 13.20 paper jam error'
    );
    cleanedContent = cleanedContent.replace(
      /paper\. Path/g,
      'paper path'
    );
    cleanedContent = cleanedContent.replace(
      /simple\. Jam/g,
      'simple paper jam'
    );

    const wordCount = cleanedContent.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    await prisma.article.update({
      where: { slug: 'hp-printer-13-20-paper-jam-error-fix' },
      data: {
        content: cleanedContent,
        wordCount,
        excerpt: 'HP printer 13.20 paper jam error with no paper inside? Learn how to inspect stuck sensor flags, clean optical interrupters, and clear false jam locks.'
      }
    });
    console.log(`✓ Cleaned hp-printer-13-20-paper-jam-error-fix (${wordCount} words)`);
  }

  console.log('All HP error article repairs complete!');
}

updateHpArticles().catch(console.error).finally(() => prisma.$disconnect());
