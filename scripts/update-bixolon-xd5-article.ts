import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newContent = `<h2 id="quick-answer">The Direct Answer</h2>
<p class="direct-answer-summary"><strong>The Bixolon XD5-40 uses a two-LED combined-color system to report every error state.</strong> Red On + Orange On = Media Jam (sensor can't find gap/black mark). Red On + Green Blink = Print Head Overheating (wait 10 minutes idle). Red On + Orange Blink = No Media Loaded. Red On + Red Blink = Media Cover Open. Red On + LED 2 Off = Calibration Failure. Red Blink + Red Blink = Auto-Cutter Error. Most errors clear with a power cycle, correct media reload, and a sensor auto-calibration from <strong>Settings → Sensor → Gap Cal</strong> or <strong>B/M Cal</strong>.</p>

<h2 id="about-xd5-40">What Is the Bixolon XD5-40?</h2>
<p>The Bixolon XD5-40 is a commercial-grade direct thermal label printer designed for high-volume warehouse, logistics, retail, and healthcare labeling environments. It prints labels up to 4 inches (104mm) wide at speeds up to 6 inches per second (152mm/s) and supports a wide range of media types — gap-detected labels, black-mark continuous media, and liner-free labels — using dual sensing technology (transmissive gap sensor + reflective black-mark sensor).</p>
<p>Unlike the budget-tier XD3-40, the XD5-40 features a backlit LCD display for direct menu navigation, an optional auto-cutter module, USB/Serial/Ethernet connectivity, and significantly more robust memory switch configurability. This additional complexity means its error reporting is correspondingly richer — which is good once you understand the LED table, and bewildering before you do.</p>
<p>The XD5-40d variant adds an internal dispenser/peeler for peel-and-apply workflows. Most of the troubleshooting in this guide applies equally to both variants unless specifically noted. For a comparison of the XD3-40 error patterns and LED system, see the <a href="/bixolon/error-codes-alerts/bixolon-xd3-40-label-printer-error" title="Bixolon XD3-40 Label Printer Error: Causes & Fixes">Bixolon XD3-40 error guide</a>.</p>

<h2 id="led-table">The Complete XD5-40 Two-LED Status Table</h2>
<p>The XD5-40 has two physical LEDs — LED 1 (left) and LED 2 (right). Each has three possible states: On (solid), Blinking, or Off. The color of each (Green, Orange, or Red) combined with the state of both LEDs together tells you exactly what mode the printer is in. Reading one LED in isolation will mislead you.</p>

<table style="width:100%;border-collapse:collapse;font-size:0.9rem;margin:1rem 0">
  <thead>
    <tr style="background:#f1f5f9;border-bottom:2px solid #cbd5e1;text-align:left">
      <th style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">LED 1</th>
      <th style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">LED 2</th>
      <th style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">State / Meaning</th>
      <th style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Action Required</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #e2e8f0;background:#f0fdf4">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#16a34a;font-weight:700">● Green On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#16a34a;font-weight:700">● Green On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Print Ready</strong> — normal operating state</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">None — ready to print</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#16a34a;font-weight:700">● Green On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">◌ Red Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Print Cancel Mode</strong> — waiting for button input</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Press FEED or CANCEL to resume</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#f8fafc">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#16a34a;font-weight:700">◌ Green Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">● Red On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Print Paused</strong> — temporarily stopped mid-job</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Press FEED to resume</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#16a34a;font-weight:700">◌ Green Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#16a34a;font-weight:700">◌ Green Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Print Standby Mode</strong> — waiting for data or button</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Press FEED or send a print job</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#f8fafc">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#f59e0b;font-weight:700">● Orange On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#f59e0b;font-weight:700">● Orange On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Mode Switching</strong> — normal notification during mode change</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Wait — clears automatically</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#fff7ed">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">● Red On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#f59e0b;font-weight:700">● Orange On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>❌ Error: Media Jam</strong> — gap/mark not recognized</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Clear jam, reload, run Gap Cal</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#fff7ed">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">● Red On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#16a34a;font-weight:700">◌ Green Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>⚠️ Error: Print Head Overheating</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Leave idle 10 min, improve ventilation</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#fff7ed">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">● Red On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#f59e0b;font-weight:700">◌ Orange Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>❌ Error: No Media Loaded</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Load media roll, clean sensor if persists</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#fff7ed">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">● Red On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">◌ Red Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>❌ Error: Media Cover Open</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Press cover firmly until latch clicks</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#fff7ed">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">● Red On</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0" class="led-off">⬜ Off</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>❌ Error: Media Calibration Failure</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Clean sensors, re-run correct Cal mode</td>
    </tr>
    <tr style="background:#fff7ed">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">◌ Red Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><span style="color:#dc2626;font-weight:700">◌ Red Blink</span></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>❌ Error: Auto-Cutter Error</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Clear cutter jam, verify cutter enabled in menu</td>
    </tr>
  </tbody>
</table>

<h2 id="error-media-jam">Error: Media Jam — Red On + Orange On</h2>
<p>This is the most common XD5-40 error. The LED combination Red On + Orange On means the printer's media sensor cannot find the gap between labels (or the black position mark on continuous media). This can be caused by a physical jam, incorrect media loading, or a sensor that needs calibration for the new media type.</p>

<h3 id="media-jam-causes">What Causes This Error</h3>
<ul>
  <li><strong>Physical media jam:</strong> A label or piece of liner is caught between the printhead and platen roller, or at the media exit slot</li>
  <li><strong>Incorrect media threading:</strong> The leading edge of the media isn't properly seated under the media guides or through the sensor path</li>
  <li><strong>Wrong sensor mode:</strong> The printer is configured for gap sensing but you've loaded black-mark media (or vice versa)</li>
  <li><strong>Uncalibrated sensor:</strong> The gap sensor hasn't been calibrated for this specific label stock — common when switching between different label sizes or brands</li>
  <li><strong>Dirty transmissive sensor:</strong> Paper dust and label adhesive residue on the gap sensor lens causes it to misread the gap position</li>
</ul>

<h3 id="media-jam-fix">Step-by-Step Fix</h3>
<ol>
  <li>Power off the printer completely</li>
  <li>Open the media cover — press the cover release button and lift the clamshell top</li>
  <li>Inspect the media path for any stuck labels, torn liner, or adhesive residue — remove gently without forcing; fine tweezers can help with liner fragments in the exit slot</li>
  <li>Remove the media roll entirely and inspect the first 12 inches of the roll — if any labels are partially detached or the liner is damaged at the leading edge, tear back to a clean section</li>
  <li>With the roll removed, use a lint-free cloth lightly dampened with 99% isopropyl alcohol to wipe the transmissive sensor windows (the small lens pair facing each other across the media path) and the reflective sensor (the small angled window below the platen)</li>
  <li>Allow 30 seconds for the alcohol to evaporate</li>
  <li>Reload the media roll: ensure the roll sits flush in the media spindle, the leading edge is straight (not torn or angled), and the media is threaded between the media guides with the guides adjusted snugly to the media width</li>
  <li>Close the cover and power on — wait for the boot sequence to complete</li>
  <li>If the error persists, run sensor calibration (see Calibration section below)</li>
</ol>

<h2 id="error-overheat">Error: Print Head Overheating — Red On + Green Blink</h2>
<p>The XD5-40's thermal printhead contains a temperature sensor that triggers this protective error when head temperature exceeds safe operating limits. This is not a defect — it's a designed safety mechanism that prevents permanent printhead damage from heat buildup during high-speed, high-density continuous printing.</p>

<h3 id="overheat-causes">Common Scenarios That Trigger Overheating</h3>
<ul>
  <li><strong>High-volume continuous printing:</strong> Printing dense barcodes or all-black graphics at maximum speed for extended periods — the XD5-40 is designed for high-throughput, but sustained maximum-density runs can still accumulate heat faster than it dissipates</li>
  <li><strong>High print density setting:</strong> If density is set to 4 or 5 (on a 1–5 scale), the head elements energize longer per dot, generating more heat per label</li>
  <li><strong>Poor ventilation around the printer:</strong> The printer requires at least 4 inches of clearance on all sides. Placing it in a cabinet, drawer, or against a wall restricts airflow and accelerates heat buildup</li>
  <li><strong>High ambient temperature:</strong> Operating in environments above 40°C (104°F) — common in summer near loading docks or in non-air-conditioned warehouses</li>
</ul>

<h3 id="overheat-fix">Fix and Prevention</h3>
<p>The immediate fix is straightforward: leave the printer powered on but idle for 8–10 minutes. Do not power cycle it — the temperature monitoring only works while the printer is on, and powering off removes the thermal protection circuit. The error clears automatically once the head temperature drops to safe levels, and the printer resumes normal operation without any button press.</p>
<p>For prevention:</p>
<ul>
  <li>Reduce print density by one level (e.g., from 4 to 3) if the application allows — this significantly reduces per-dot heat generation</li>
  <li>Increase the gap between print batches to allow passive cooling</li>
  <li>Ensure the printer has adequate ventilation clearance on all four sides</li>
  <li>If operating in a hot environment, consider a small fan circulating air across the top of the printer</li>
</ul>
<p>If overheating occurs regularly even at low print density with good ventilation, check whether the printer's internal cooling vents are clogged with dust — compressed air blown through the vent slots (with the printer powered off) clears accumulated dust from internal surfaces.</p>

<h2 id="error-no-media">Error: No Media — Red On + Orange Blink</h2>
<p>The media sensor doesn't detect any loaded media. This is straightforward when the roll is genuinely empty, but it also appears with a full roll installed in several situations:</p>
<ul>
  <li><strong>Media not threaded past the sensor:</strong> The media roll is loaded into the spindle but the leading edge hasn't been threaded through the media guides and under the printhead to reach the exit slot where the sensor reads it</li>
  <li><strong>Media loaded face-down:</strong> Direct thermal media has a coated (sensitive) side and an uncoated liner side. If loaded upside down, the sensor may still read media presence but prints will be blank — however, some rolls loaded upside down also fail the sensor check</li>
  <li><strong>Dirty media sensor:</strong> Heavy paper dust or adhesive residue on the sensor lens causes a false "no media" reading even with a full roll correctly loaded</li>
  <li><strong>Wrong media type for sensor mode:</strong> Transparent liner material may not register correctly with gap sensing if the sensor's detection threshold isn't calibrated for it</li>
</ul>

<h3 id="no-media-fix">Fix</h3>
<ol>
  <li>Open the cover and verify the media roll is correctly seated on the spindle (roll sits in the spindle holders, not resting loose)</li>
  <li>Thread the leading edge of the media through the media guides — the coated (slick, print-receiving) side faces up toward the printhead</li>
  <li>Thread the leading edge forward until it protrudes 1–2 inches past the exit slot</li>
  <li>Adjust the media width guides to sit flush against both edges of the media — loose guides cause skewing that can bring media off the sensor</li>
  <li>Close the cover firmly</li>
  <li>If the error persists with a correctly loaded roll: open the cover again and clean the transmissive sensor windows with IPA on a lint-free swab, allow to dry, reload, and retry</li>
</ol>

<h2 id="error-cover-open">Error: Media Cover Open — Red On + Red Blink</h2>
<p>The cover latch detection switch isn't registering the cover as fully closed. The XD5-40's clamshell cover has a mechanical latch on both sides that engages a micro-switch when pressed to the closed position.</p>
<ul>
  <li>Press the cover firmly at the center and both sides simultaneously — if one side latches before the other, it can appear closed but not register</li>
  <li>Listen for an audible click from the latch mechanism — if you hear one click on one side but not both, the cover isn't fully seated</li>
  <li>Inspect the latch hooks on both sides of the cover for visible damage or accumulated label adhesive buildup that prevents full engagement — clean with IPA if adhesive is visible</li>
  <li>On well-used printers (typically after 12–18 months of high-volume use), the latch springs can weaken and no longer generate enough force to close reliably — contact Bixolon support about latch spring replacement if cleaning doesn't resolve it</li>
</ul>

<h2 id="error-calibration-failure">Error: Media Calibration Failure — Red On + LED 2 Off</h2>
<p>This error is specific: the printer actively attempted an auto-calibration for the loaded media type and the calibration algorithm failed to produce a reliable result. It's different from the Media Jam error — with a Jam, the printer didn't attempt calibration; with a Calibration Failure, it tried and the result was outside acceptable tolerance.</p>

<h3 id="calibration-failure-causes">Why Calibration Fails</h3>
<ul>
  <li><strong>Wrong calibration mode for the media:</strong> Running Gap Calibration while black-mark media is loaded (or vice versa) — the sensor readings will be inconsistent and out of range</li>
  <li><strong>Non-standard media specifications:</strong> Labels with very short inter-label gaps (under 2mm), unusually transparent liner, dual-sided printing material, or pre-printed backing that confuses the gap sensor</li>
  <li><strong>Dirty sensors:</strong> Paper dust on the gap sensor causes the calibration reference readings to be offset, producing values outside the algorithm's acceptable window</li>
  <li><strong>Damaged media at the leading edge:</strong> If the calibration uses the first few labels of the roll and those labels have torn, folded, or missing gaps, the calibration data will be invalid</li>
  <li><strong>Very thin or transparent liner:</strong> Some premium label stocks use ultra-thin liners that can confuse standard transmissive sensor thresholds</li>
</ul>

<h3 id="calibration-failure-fix">Fix Sequence</h3>
<ol>
  <li>Power cycle the printer and open the cover</li>
  <li>Clean both the transmissive gap sensor windows and the reflective black-mark sensor with a lint-free IPA swab — this is the most commonly skipped step and the most effective one</li>
  <li>Remove the first 3–4 labels from the roll to expose a fresh section with clean gaps</li>
  <li>Reload with the fresh leading edge and close the cover</li>
  <li>Navigate to <strong>Settings → Sensor</strong> and manually select the correct calibration type for your media:
    <ul>
      <li><strong>Gap Cal</strong> — for standard labels with die-cut gaps between each label</li>
      <li><strong>B/M Cal</strong> (Black Mark) — for continuous media with printed black position marks</li>
      <li><strong>Continuous</strong> — for plain continuous media with no gaps or marks (no calibration needed)</li>
    </ul>
  </li>
  <li>Run the calibration — the printer feeds a length of media and measures the sensor signal variation across at least one complete label + gap cycle</li>
  <li>If auto-calibration still fails on unusual media, switch to manual calibration via the Unified Label Utility-II software: select the sensing type, enter the label length in millimeters, click "Check Sensing Value," and manually input the optimal sensing threshold from the test results</li>
</ol>

<h2 id="error-autocutter">Error: Auto-Cutter Error — Red Blink + Red Blink</h2>
<p>This error only appears when the XD5-40 is fitted with the optional auto-cutter module. Both LEDs blinking red simultaneously means the cutter mechanism has encountered a fault — typically a jam in the cutter blade assembly, or a misconfiguration where the cutter is enabled in the menu but no physical cutter module is installed.</p>

<h3 id="autocutter-fix">Fix</h3>
<ol>
  <li>Power off the printer</li>
  <li>Open the media cover and carefully inspect the cutter mechanism — look for any label, liner fragment, or adhesive buildup in the blade channel</li>
  <li>Use fine tweezers or a toothpick to gently remove any foreign material from between the cutter blades — never use metal tools that could nick or misalign the blade edge</li>
  <li>Verify the cutter blade moves freely by gently pressing the blade retainer — it should spring back without resistance</li>
  <li>Close the cover and power on</li>
  <li>If the error returns immediately: navigate to <strong>Print Mode → Cutter</strong> in the menu — if a factory reset was recently performed, the cutter may have been reset to disabled, causing the module to fault. Enable it and power cycle</li>
  <li>If no physical cutter module is installed but this error appears, navigate to the menu and disable the cutter function under Print Mode</li>
</ol>

<h2 id="sensor-calibration">Sensor Auto-Calibration: Complete Procedure</h2>
<p>Sensor calibration is the most important maintenance task on the XD5-40. It should be performed whenever you switch to a new label stock type, after a factory reset, after cleaning the sensors, or whenever the printer begins mis-feeding labels. A miscalibrated sensor is the root cause of the majority of "Media Jam" and "Calibration Failure" errors on this printer.</p>

<h3 id="gap-calibration">Gap Sensor Calibration (Standard Labels)</h3>
<ol>
  <li>Load the media roll you want to calibrate for — calibration is media-specific, so you must have the actual roll installed</li>
  <li>Power on and wait for the ready state (Green On + Green On)</li>
  <li>Press the <strong>Menu</strong> button to enter the settings menu</li>
  <li>Navigate to <strong>Sensor</strong> using the navigation buttons</li>
  <li>Select <strong>Gap Cal</strong></li>
  <li>Press the <strong>Select</strong> button (Function Button 1) to confirm</li>
  <li>The printer feeds approximately 4–5 labels and measures the signal difference between label area and gap — you'll see the media feed and then retract slightly as the calibration completes</li>
  <li>The display shows "Done" or returns to the ready screen — calibration is complete</li>
  <li>Print a test label to confirm correct gap detection and label-to-label alignment</li>
</ol>

<h3 id="blackmark-calibration">Black Mark Calibration (Continuous/Mark Media)</h3>
<p>The procedure is identical to gap calibration but you select <strong>B/M Cal</strong> instead of Gap Cal in step 5. The printer uses the reflective sensor (located below the printhead, facing the non-print side of the media) to detect black mark positions. Ensure the black marks on your media are on the underside (liner side) of the media, not the print face.</p>

<h3 id="manual-calibration">Manual Calibration via Unified Label Utility-II</h3>
<p>When auto-calibration fails repeatedly on non-standard media, manual threshold setting through the software gives you precise control:</p>
<ol>
  <li>Connect the XD5-40 to your Windows PC via USB</li>
  <li>Open Bixolon Unified Label Utility-II (downloadable from bixolon.com support section)</li>
  <li>Select your printer from the device list and click Connect</li>
  <li>Navigate to <strong>Calibration → Media Sensing</strong></li>
  <li>Select your sensing type (Gap or Black Mark)</li>
  <li>Enter your label length in millimeters</li>
  <li>Click <strong>Check Sensing Value</strong> — the utility reads the current sensor signal and displays min/max/threshold values across a sample feed</li>
  <li>Adjust the threshold value to fall midway between the label and gap signal peaks</li>
  <li>Click Save — the calibration data is written to the printer's NVM</li>
  <li>Run a test print to validate</li>
</ol>

<h2 id="factory-reset">Factory Reset Procedure</h2>
<p>A factory reset returns the XD5-40 to its shipped default configuration. Use this when accumulated setting changes have produced unpredictable behavior, or after troubleshooting has stalled and a clean start is faster than tracking down the corrupted setting.</p>
<p><strong>What factory reset clears:</strong> All network configuration, print density, media type selection, sensor calibration data, memory switch values, cutter settings, and any macro or stored format data.</p>
<p><strong>Before resetting, note your current settings:</strong> print the current configuration via <strong>Tools → Configuration Print</strong> so you have a physical record of your settings to reference during reconfiguration.</p>
<ol>
  <li>Ensure media is loaded and the printer shows the ready state</li>
  <li>Press <strong>Menu</strong> to enter the settings menu</li>
  <li>Navigate to <strong>Tools → Reset</strong></li>
  <li>Press <strong>Function Button 1</strong> to confirm — the display shows a confirmation prompt</li>
  <li>Confirm again — the printer immediately reboots</li>
  <li>After reboot, run Gap Cal or B/M Cal calibration before printing production labels</li>
  <li>Reconfigure network settings, print density, and cutter settings if applicable</li>
</ol>
<p>After a factory reset, if you're using this printer with a custom barcode or label software application, re-run any software-side printer setup or driver configuration as well — the factory reset may change identifiers that the software references.</p>

<h2 id="data-dump-mode">Data Dump Mode: Debugging Communication Issues</h2>
<p>If the XD5-40 is receiving print jobs but outputting garbled content — random characters, raw ZPL/DPL command text printed literally, or completely wrong formats — Data Dump Mode reveals exactly what bytes the printer is actually receiving from the host.</p>
<ol>
  <li>Navigate to <strong>Tools → Dump</strong> in the printer menu</li>
  <li>Enable Dump Mode</li>
  <li>Send a normal print job from your computer or POS system</li>
  <li>Instead of printing the intended label, the printer outputs the received data in hexadecimal + ASCII format — one character per position</li>
  <li>Compare this against the expected command structure for your label language (DPL for Datamax-compatible, SLCS for Bixolon-native, or ZPL for Zebra-compatible firmware variants)</li>
  <li>Turn Dump Mode off when done — navigate back to <strong>Tools → Dump</strong> and disable, or power cycle the printer</li>
</ol>
<p>Common findings: the wrong label language is configured (printer set to DPL but host is sending ZPL), the baud rate doesn't match on serial connections, or a Windows driver is sending PCL/PostScript header data before the label commands.</p>

<h2 id="printhead-check">Print Head Dot Check</h2>
<p>The XD5-40's Print Head Check function tests every heating element (dot) in the printhead and flags any that aren't responding. Dead or degraded elements create white horizontal stripes in printed output — a faint stripe at the same vertical position on every label, regardless of label content.</p>
<ol>
  <li>Ensure a media roll is loaded</li>
  <li>Navigate to <strong>Tools → Head Chk</strong></li>
  <li>The printer prints a full-coverage test pattern that activates every dot element simultaneously</li>
  <li>Inspect the test print for white stripes — a white stripe at position X means the element(s) at that horizontal position are not firing</li>
</ol>
<p>A single dead element (1 dot = 0.125mm at 203dpi) may be acceptable for text labels but will compromise barcode readability if it falls within a barcode bar. Multiple consecutive dead elements will visibly affect label readability and scan reliability. If the head check shows significant dropout, the printhead requires replacement.</p>
<p>Before replacing the printhead, always clean it first — accumulated adhesive or paper residue can prevent elements from making contact with the media, mimicking dead elements. Clean with a lint-free IPA swab across the full width of the printhead edge, allow to dry, and re-run the head check.</p>
<p>For broader LED error pattern reference across all Bixolon models, see the <a href="/bixolon/error-codes-alerts/bixolon-printer-blinking-light-meaning" title="Bixolon Printer Blinking Light Meaning: Full LED Code Chart">Bixolon blinking light meaning and LED code chart</a>.</p>

<h2 id="print-quality">Print Quality Problems: Causes and Fixes</h2>
<p>Even when no error LEDs are active, print quality issues are common on the XD5-40 — particularly in high-volume environments where consumables and hardware wear occurs faster.</p>

<h3 id="quality-faint">Faint, Washed-Out Print</h3>
<ul>
  <li><strong>Print density too low:</strong> Navigate to <strong>Settings → Print Density</strong> and increase by one level — start at level 3 (default) and step up to 4 if output is faint</li>
  <li><strong>Wrong media side:</strong> Verify the print-receiving (coated) side faces the printhead — the coated side is slightly shinier and more reflective than the liner side</li>
  <li><strong>Dirty printhead:</strong> Clean the printhead edge with an IPA swab — accumulated adhesive residue reduces thermal transfer efficiency</li>
  <li><strong>Worn printhead:</strong> If cleaning doesn't improve density and the head check shows normal element activity, the printhead's thermal coating may be worn — this requires replacement</li>
</ul>

<h3 id="quality-stripes">White Horizontal Stripes Across Every Label</h3>
<p>A consistent white stripe at the same position on every label = a dead or damaged printhead element at that dot row. Run <strong>Tools → Head Chk</strong> to confirm, then clean the head and re-test. If the stripe persists after cleaning, printhead replacement is needed.</p>

<h3 id="quality-skewed">Skewed or Angled Print / Labels Not Tracking Straight</h3>
<ul>
  <li>Media width guides are not adjusted snugly to the media width — the roll can drift sideways as it feeds, causing the print to shift</li>
  <li>Media roll is not seated parallel in the spindle — the roll should sit flat with even tension across its width</li>
  <li>Platen roller may have uneven wear on one side — a worn platen applies uneven pressure, pulling the media sideways</li>
</ul>

<h3 id="quality-barcode">Barcodes Not Scanning After Printing</h3>
<p>If barcodes print visually but fail to scan:</p>
<ul>
  <li>Increase print density slightly — under-dense barcode bars have ragged edges that confuse scanners</li>
  <li>Run Gap Cal to ensure labels are printing in the correct start position — an offset print position can shift barcodes outside the expected quiet zone</li>
  <li>Check barcode width specification — if the ZPL/DPL barcode width multiplier produces bars thinner than the minimum scannable width, adjust the barcode definition in your label template</li>
  <li>Run the Head Chk — a dead element falling within a barcode bar creates a white gap that breaks the barcode</li>
</ul>

<h2 id="firmware-update">Firmware Update</h2>
<p>Bixolon periodically releases XD5-40 firmware updates that improve calibration accuracy, add label language compatibility, fix communication edge cases, and address specific hardware variants. Keeping firmware current is good practice — many intermittent calibration failures and communication issues are resolved by firmware updates without any hardware intervention.</p>
<ol>
  <li>Download the latest XD5-40 firmware from bixolon.com → Support → Downloads → select "XD5-40" from the product list</li>
  <li>Connect the printer to your PC via USB</li>
  <li>Open Bixolon Unified Label Utility-II</li>
  <li>Navigate to <strong>Firmware Update</strong></li>
  <li>Select the downloaded firmware file (.bin or .upl extension)</li>
  <li>Click Update — the process takes 2–4 minutes; do not disconnect USB or power off during update</li>
  <li>The printer automatically reboots after the update completes</li>
  <li>Verify the firmware version in <strong>Tools → Self Test</strong> or the self-test printout</li>
</ol>
<p><strong>Important:</strong> A firmware update does not perform a factory reset — your settings are preserved. However, on rare occasions after a major version update, re-running sensor calibration is recommended as sensor threshold algorithms may have changed.</p>

<h2 id="self-test">Running a Self-Test Print</h2>
<p>The XD5-40 self-test is a critical diagnostic tool — it prints a summary of all current configuration values including firmware version, interface settings, baud rate, print density, sensor type, label length, calibration values, and memory switch states. Print one whenever:</p>
<ul>
  <li>You receive the printer for the first time and want to document its starting configuration</li>
  <li>Before and after any significant configuration change, to compare settings</li>
  <li>When troubleshooting, to confirm whether settings are what you expect</li>
  <li>After a firmware update, to verify the update completed successfully</li>
</ul>
<p>To print a self-test: navigate to <strong>Tools → Self Test</strong> and confirm. The printer feeds one or more labels printed with configuration data. Alternatively, power on while holding the FEED button to trigger the self-test directly from startup.</p>
<p>For the complete Bixolon error code reference across all product lines, see the <a href="/bixolon/error-codes-alerts/printer-error-codes" title="Bixolon Printer Error Codes: The Complete Guide (All Models)">Bixolon printer error codes master guide</a>.</p>

<h2 id="maintenance-schedule">Preventive Maintenance Schedule</h2>
<p>High-volume XD5-40 deployments (500+ labels/day) benefit from a proactive maintenance schedule. Most errors that appear as "sudden" failures are actually the end result of gradual sensor contamination, platen wear, or adhesive buildup that could have been caught earlier.</p>

<table style="width:100%;border-collapse:collapse;font-size:0.9rem;margin:1rem 0">
  <thead>
    <tr style="background:#f1f5f9;text-align:left">
      <th style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Frequency</th>
      <th style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Task</th>
      <th style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Method</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #e2e8f0">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Every roll change</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Wipe printhead edge</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Lint-free IPA swab across full head width</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#f8fafc">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Every roll change</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Re-run Gap Cal or B/M Cal</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Settings → Sensor → appropriate Cal type</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Weekly</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Clean gap + reflective sensors</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">IPA swab on sensor windows with media removed</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#f8fafc">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Weekly</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Wipe platen roller</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Slightly damp IPA cloth — rotate roller while wiping</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Monthly</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Print Head Check</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Tools → Head Chk — document result</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;background:#f8fafc">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Monthly</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Self-test print</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Tools → Self Test — file for configuration record</td>
    </tr>
    <tr style="background:#f8fafc">
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0"><strong>Quarterly</strong></td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">Check firmware version, update if available</td>
      <td style="padding:0.6rem 0.75rem;border:1px solid #e2e8f0">bixolon.com → Support → Downloads</td>
    </tr>
  </tbody>
</table>

<h2 id="xd5-vs-xd3">XD5-40 vs XD3-40: Key Differences for Troubleshooting</h2>
<p>If you also manage XD3-40 printers alongside the XD5-40, be aware that while the two models share the same general LED color scheme, there are important differences:</p>
<ul>
  <li>The XD5-40 has an LCD display for direct menu navigation — the XD3-40 does not; it relies entirely on the Unified Label Utility-II for configuration</li>
  <li>The XD5-40 supports an optional auto-cutter — the XD3-40 does not have this option, so the Red Blink + Red Blink (cutter error) code will never appear on an XD3-40</li>
  <li>The XD5-40 has a print speed advantage (6 ips vs 4 ips on the XD3-40) — overheating errors are more likely on the XD5-40 at maximum throughput</li>
  <li>The XD5-40 supports both gap and black-mark sensing natively — the XD3-40 variant determines sensing type by hardware configuration</li>
</ul>
<p>For complete XD3-40 specific error troubleshooting, see the <a href="/bixolon/error-codes-alerts/bixolon-xd3-40-label-printer-error" title="Bixolon XD3-40 Label Printer Error: Causes & Fixes">XD3-40 error and calibration guide</a>.</p>
<p>For Bixolon SRP-Q300 and other receipt printer LED error codes, see the <a href="/bixolon/error-codes-alerts/bixolon-srp-q300-error-light" title="Bixolon SRP-Q300 Error Light: What Each Pattern Means">SRP-Q300 error light guide</a>.</p>

<div class="accordion-group">
<h2 class="accordion-title">Frequently Asked Questions</h2>

<details class="faq-disclosure">
  <summary class="faq-summary">Why does the Bixolon XD5-40 keep showing a Media Jam error even with a new roll?</summary>
  <div class="faq-answer">
    <p>A Media Jam error (Red On + Orange On) with a brand new roll is almost always a calibration mismatch, not an actual jam. When you switch to a new label stock — especially if it's a different brand, size, or liner type — the gap sensor's stored calibration thresholds may no longer match the new media's optical profile. The sensor can't reliably find the gap and reports a jam. Fix: clean the gap sensor windows with an IPA swab, then navigate to Settings → Sensor → Gap Cal and run a fresh calibration with the new roll loaded. If that fails, use the Unified Label Utility-II manual calibration to set the threshold directly.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">How do I get the Bixolon XD5-40 into the settings menu?</summary>
  <div class="faq-answer">
    <p>Press the Menu button on the front panel (the button labeled MENU or with a menu icon, depending on firmware version). The LCD display switches from the ready screen to the main menu. Navigate using the Left/Right arrow buttons to move between menu items and the Select or Function Button 1 to enter a submenu or confirm a selection. Press Back or the Menu button again to exit the current menu level without saving changes. If you can't access the menu while the printer is in an error state, power cycle first to clear the error, wait for the ready state (both LEDs green), then press Menu.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">What's the difference between Gap Cal and B/M Cal on the XD5-40?</summary>
  <div class="faq-answer">
    <p>Gap Cal (Gap Calibration) uses the transmissive optical sensor — two lens elements facing each other across the media path — to detect the gap (transparent or semi-transparent space) between individual die-cut labels. It's the correct mode for standard label rolls with physical spaces between each label. B/M Cal (Black Mark Calibration) uses the reflective sensor on the underside of the media path to detect printed black marks on the backing of continuous media. It's used for media that has no die-cut gaps — instead, black marks printed on the liner side indicate where each label starts. Using the wrong calibration mode for your media type will always result in a calibration failure. If you're unsure which type your media uses, look at the liner (back) side of the media: if you see black rectangular marks, use B/M Cal; if you see no marks and there are physical gaps between labels, use Gap Cal.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">The Bixolon XD5-40 prints barcodes that don't scan. What's wrong?</summary>
  <div class="faq-answer">
    <p>Several issues can produce visually acceptable barcodes that fail to scan reliably: (1) A dead printhead element creating a white gap within a barcode bar — run Tools → Head Chk to check. (2) Print density too low — bar edges are ragged at low density, which some scanners reject. Increase density by one step. (3) Label offset — if the print start position is shifted, the barcode may print outside its quiet zone or with incorrect aspect ratio. Run Gap Cal to ensure correct positioning. (4) Incorrect barcode width parameters in your label template — if bars are narrower than the minimum scannable width for your scanner's resolution, the barcode will print but won't decode. Check the X-dimension (minimum bar width) in your ZPL/DPL command against your scanner's specification sheet.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">The XD5-40 overheats frequently. Is the printhead dying?</summary>
  <div class="faq-answer">
    <p>Frequent overheating errors (Red On + Green Blink) are not usually a sign of a failing printhead — they're a sign that the thermal load on the head is consistently exceeding the cooling capacity. Before assuming hardware failure: (1) Check ventilation — the printer needs at least 4 inches of clearance on all sides. (2) Reduce print density by one level — each density step significantly changes heat generation per dot. (3) Reduce print speed if your application allows. (4) Check for dust blockage in the printer's internal vents — compressed air through the vent slots clears heat-trapping dust. (5) Check ambient temperature — operation above 35°C (95°F) significantly reduces the thermal headroom before overheating triggers. If overheating occurs even at low density, low speed, with good ventilation, in a cool environment, the printhead's thermal sensor may be reading incorrectly — contact Bixolon support.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">Does factory resetting the XD5-40 delete the firmware?</summary>
  <div class="faq-answer">
    <p>No. A factory reset only clears the configuration data stored in non-volatile memory — settings like IP address, print density, sensor calibration values, and memory switches. The printer's firmware (the operating software that controls all printer functions) is stored in a separate protected flash partition and is never affected by a factory reset. Only a deliberate firmware update operation (using Unified Label Utility-II and a firmware file) can change the firmware. After a factory reset, you will need to re-run sensor calibration and reconfigure network settings, but the printer will function normally with its existing firmware version intact.</p>
  </div>
</details>

</div>`;

async function main() {
  const result = await prisma.article.updateMany({
    where: { slug: 'bixolon-xd5-40-troubleshooting' },
    data: {
      content: newContent,
      faqs: null, // Clear old generic FAQs — detailed FAQs embedded in content
      excerpt: 'Complete Bixolon XD5-40 troubleshooting guide covering every two-LED error code (Media Jam, Overheating, No Media, Cover Open, Calibration Failure, Auto-Cutter Error), sensor gap and black-mark calibration procedures, printhead check, data dump mode, firmware update, print quality fixes, and a monthly maintenance schedule.',
      wordCount: 3800,
      seoTitle: 'Bixolon XD5-40 Troubleshooting: Complete LED Error Guide & Calibration Fixes',
      featuredSnippet: 'Bixolon XD5-40 uses two LEDs in combination to report errors: Red On + Orange On = Media Jam (run Gap Cal after reloading). Red On + Green Blink = Print Head Overheating (leave idle 10 min). Red On + Orange Blink = No Media. Red On + Red Blink = Cover Open. Red On + LED 2 Off = Calibration Failure (clean sensor, re-run correct Cal mode). Red Blink + Red Blink = Auto-Cutter Error. Calibrate via Settings → Sensor → Gap Cal or B/M Cal.',
      tags: 'bixolon xd5-40, label printer troubleshooting, bixolon error codes, calibration failure, media jam, printhead overheating'
    }
  });

  console.log('✅ Updated:', result.count, 'rows');
  console.log('📝 Word count: ~3800');
  console.log('🔗 Internal links: same category only (Bixolon error-codes-alerts)');
  console.log('🚫 FAQs field: cleared (merged into content accordion)');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
