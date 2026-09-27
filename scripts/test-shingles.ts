// Quick test script for 6-word shingle overlap calculation
export function calculateShingles(text: string, size = 6): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - size; i++) {
    shingles.add(words.slice(i, i + size).join(' '));
  }
  return shingles;
}

export function computeUniqueness(target: string, others: string[]): number {
  const targetShingles = calculateShingles(target);
  if (targetShingles.size === 0) return 0;

  const otherShingles = new Set<string>();
  for (const o of others) {
    for (const s of calculateShingles(o)) {
      otherShingles.add(s);
    }
  }

  let uniqueCount = 0;
  for (const s of targetShingles) {
    if (!otherShingles.has(s)) {
      uniqueCount++;
    }
  }

  return (uniqueCount / targetShingles.size) * 100;
}

console.log('Shingle utility ready');
