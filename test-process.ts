function processText(text: string): string {
  // 4. Wordy openers
  text = text.replace(/\bIn order to\b/ig, "To");
  text = text.replace(/\bDue to the fact that\b/ig, "Because");
  text = text.replace(/\bAt this point in time\b/ig, "Now");
  
  // 3. Action verbs
  text = text.replace(/\b(You should|You need to|It is necessary to|You can|You must|We recommend that you)\s+open\b/ig, "Open");
  text = text.replace(/\b(You should|You need to|It is necessary to|You can|You must)\s+click\b/ig, "Click");
  text = text.replace(/\b(You should|You need to|It is necessary to|You can|You must)\s+press\b/ig, "Press");
  text = text.replace(/\b(You should|You need to|It is necessary to|You can|You must)\s+check\b/ig, "Check");
  text = text.replace(/\b(It is important to|You should|You need to|You must)\s+make sure\b/ig, "Make sure");

  // 2. Jargon
  text = text.replace(/\bbidirectional communication\b/ig, "two-way connection");
  text = text.replace(/\binitialization\b/ig, "setup");
  text = text.replace(/\bproprietary\b/ig, "built-in");
  text = text.replace(/\bcalibration protocol\b/ig, "calibration process");
  // avoid double replacement for firmware
  text = text.replace(/\bfirmware(?! \(internal software\))\b/ig, "firmware (internal software)");
  text = text.replace(/\bconfiguration\b/ig, "settings");

  let sentences = text.split(/(?<=[.?!])\s+(?=[A-Z])/);
  sentences = sentences.map(s => {
    let words = s.split(/\s+/);
    if (words.length > 20) {
      const splitMatches = [
        /(,\s+and\s+)/i,
        /(,\s+but\s+)/i,
        /(,\s+so\s+)/i,
        /(,\s+which\s+)/i,
        /(\s+because\s+)/i,
        /(,\s+or\s+)/i,
        /(,\s+)/ // fallback to any comma
      ];

      for (let regex of splitMatches) {
        let parts = s.split(regex);
        if (parts.length > 2) {
          for (let i = 1; i < parts.length; i += 2) {
            let before = parts.slice(0, i).join('');
            let match = parts[i];
            let after = parts.slice(i + 1).join('');
            
            if (before.split(/\s+/).length > 5 && after.split(/\s+/).length > 5) {
                let newStart = after.trim();
                newStart = newStart.charAt(0).toUpperCase() + newStart.slice(1);
                
                if (match.toLowerCase().includes('which')) {
                    newStart = 'This ' + newStart;
                } else if (match.toLowerCase().includes('and')) {
                    newStart = 'And ' + newStart;
                } else if (match.toLowerCase().includes('but')) {
                    newStart = 'But ' + newStart;
                } else if (match.toLowerCase().includes('so')) {
                    newStart = 'So ' + newStart;
                } else if (match.toLowerCase().includes('or')) {
                    newStart = 'Or ' + newStart;
                } else if (match.toLowerCase().includes('because')) {
                    newStart = 'Because ' + newStart;
                }
                
                return before.trim().replace(/,$/, '') + '. ' + newStart;
            }
          }
        }
      }
      
      let firstPart = words.slice(0, 12).join(' ');
      let secondPart = words.slice(12).join(' ');
      secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
      return firstPart + '. ' + secondPart;
    }
    return s;
  });

  return sentences.join(' ');
}

console.log(processText("When a print job disappears, the Windows Print Spooler thinks it successfully delivered the file, but it actually delivered it to a black hole port."));
