// Numerology utility functions

// Pythagorean numerology values
export const pythagoreanValues: { [key: string]: number } = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

// Extended word database for name generation
const extendedWordDatabase = {
  exp1: ["Agung", "Bayu", "Cahya", "Dewa", "Eka", "Fajar", "Gita", "Hadi", "Indra", "Jaya"],
  exp2: ["Kartika", "Lestari", "Mulia", "Nanda", "Oktavia", "Pratama", "Qori", "Ratna", "Sari", "Tama"],
  exp3: ["Utama", "Vina", "Wati", "Xenia", "Yanti", "Zahra", "Aditya", "Bima", "Citra", "Dian"],
  exp4: ["Elang", "Fitri", "Galih", "Hana", "Ilham", "Jihan", "Kirana", "Laras", "Maya", "Nisa"],
  exp5: ["Oka", "Putri", "Qonita", "Reza", "Sinta", "Tari", "Ulfa", "Vera", "Winda", "Yuda"],
  exp6: ["Zara", "Arya", "Bella", "Candra", "Dewi", "Esa", "Fira", "Gina", "Hesti", "Ira"],
  exp7: ["Joko", "Kiki", "Luna", "Mira", "Nova", "Ocha", "Prita", "Qila", "Rina", "Sela"],
  exp8: ["Tina", "Umi", "Vira", "Wulan", "Yesi", "Zeta", "Andi", "Budi", "Cici", "Dini"],
  exp9: ["Erni", "Fani", "Gani", "Heri", "Ika", "Jeni", "Kani", "Lani", "Mani", "Nani"]
};

/**
 * Normalize Indonesian name by removing diacritics and converting to uppercase
 */
export function normalisasiNama(nama: string): string {
  return nama
    .toUpperCase()
    .replace(/[^A-Z\s]/g, '')
    .trim();
}

/**
 * Format date to Indonesian format
 */
export function formatTanggal(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Reduce number to single digit (1-9) or master numbers (11, 22, 33)
 */
export function reduksiAngka(num: number): number {
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }
  
  while (num > 9) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
  }
  
  return num;
}

/**
 * Calculate numerology value for a name
 */
export function hitungNilaiNama(nama: string): number {
  const normalizedName = normalisasiNama(nama);
  let total = 0;
  
  for (const char of normalizedName) {
    if (pythagoreanValues[char]) {
      total += pythagoreanValues[char];
    }
  }
  
  return reduksiAngka(total);
}

/**
 * Get polar value for a number
 */
export function getPola(angka: number): string {
  const pola: { [key: number]: string } = {
    1: "Pemimpin",
    2: "Kerjasama", 
    3: "Kreatif",
    4: "Pekerja Keras",
    5: "Petualang",
    6: "Pengasuh",
    7: "Spiritual",
    8: "Materi",
    9: "Humanitarian",
    11: "Intuisi",
    22: "Master Builder",
    33: "Master Teacher"
  };
  
  return pola[angka] || "Unknown";
}

/**
 * Calculate life path number from birth date
 */
export function calculateLifePathNumber(birthDate: Date): number {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  
  const sum = day + month + year;
  return reduksiAngka(sum);
}

/**
 * Calculate expression number from a full name
 */
export function calculateExpressionNumber(fullName: string): number {
  return hitungNilaiNama(fullName);
}

/**
 * Generate comprehensive numerology patterns for a person
 */
export function generateNumerologyPatterns(name: string, birthdate: Date, gender: "Male" | "Female") {
  const normalizedName = normalisasiNama(name);
  const day = birthdate.getDate();
  const month = birthdate.getMonth() + 1;
  const year = birthdate.getFullYear();
  
  const angka_nama = hitungNilaiNama(normalizedName);
  const angka_ultah = reduksiAngka(day);
  const angka_bulan = reduksiAngka(month);
  const angka_tahun = reduksiAngka(year);
  const life_path = reduksiAngka(day + month + year);
  
  return {
    namaNormal: normalizedName,
    tglLahirFormat: formatTanggal(birthdate),
    angka_nama,
    angka_ultah,
    angka_bulan,
    angka_tahun,
    life_path,
    pola_nama: getPola(angka_nama),
    pola_ultah: getPola(angka_ultah),
    gender
  };
}

/**
 * Calculate compatibility between two people
 */
export function calculateCompatibility(
  name1: string, 
  birthdate1: Date, 
  gender1: "Male" | "Female",
  name2: string, 
  birthdate2: Date, 
  gender2: "Male" | "Female"
) {
  const patterns1 = generateNumerologyPatterns(name1, birthdate1, gender1);
  const patterns2 = generateNumerologyPatterns(name2, birthdate2, gender2);
  
  // Calculate synchronization (name compatibility)
  const nameDiff = Math.abs(patterns1.angka_nama - patterns2.angka_nama);
  const synchronize = Math.max(0, 100 - (nameDiff * 10));
  
  // Calculate coherence (life path compatibility)
  const lifeDiff = Math.abs(patterns1.life_path - patterns2.life_path);
  const coherence = Math.max(0, 100 - (lifeDiff * 8));
  
  // Calculate momentum (birth date harmony)
  const birthDiff = Math.abs(patterns1.angka_ultah - patterns2.angka_ultah);
  const momentum = Math.max(1, 10 - birthDiff);
  
  // Overall harmony calculation
  const harmony = Math.round((synchronize + coherence + (momentum * 10)) / 3);
  
  return {
    harmony: Math.min(100, harmony),
    synchronize: Math.round(synchronize),
    coherence: Math.round(coherence),
    momentum,
    description: getCompatibilityDescription(harmony)
  };
}

/**
 * Get compatibility description based on harmony score
 */
function getCompatibilityDescription(harmony: number): string {
  if (harmony >= 90) {
    return "Exceptional compatibility! You share a deep spiritual and emotional connection with natural understanding and mutual support.";
  } else if (harmony >= 80) {
    return "Very strong compatibility. You complement each other well and can build a lasting, harmonious relationship.";
  } else if (harmony >= 70) {
    return "Good compatibility with potential for growth. With understanding and effort, you can create a beautiful relationship.";
  } else if (harmony >= 60) {
    return "Moderate compatibility. You may face some challenges but can work through them with patience and communication.";
  } else {
    return "Lower compatibility suggests you may need to work harder to understand each other, but growth is possible with dedication.";
  }
}

/**
 * Generate name suggestions with additional words
 */
export function generateNameSuggestions(
  originalName: string,
  birthdate: Date,
  gender: "Male" | "Female",
  type: "oneWord" | "twoWords" = "oneWord"
): string[] {
  const suggestions: string[] = [];
  const normalizedOriginal = normalisasiNama(originalName);
  
  // Get all available words from extended database
  const allWords: string[] = [];
  Object.values(extendedWordDatabase).forEach(wordArray => {
    allWords.push(...wordArray);
  });
  
  if (type === "oneWord") {
    // Generate suggestions with one additional word
    allWords.forEach(word => {
      suggestions.push(`${normalizedOriginal} ${word}`);
    });
  } else {
    // Generate suggestions with two additional words
    for (let i = 0; i < allWords.length; i++) {
      for (let j = i + 1; j < allWords.length; j++) {
        suggestions.push(`${normalizedOriginal} ${allWords[i]} ${allWords[j]}`);
      }
    }
  }
  
  // Limit to reasonable number of suggestions
  return suggestions.slice(0, 100);
}

/**
 * Generate life report data for 100 years
 */
export function generateLifeReport(name: string, birthdate: Date, gender: "Male" | "Female") {
  const patterns = generateNumerologyPatterns(name, birthdate, gender);
  const lifePath = patterns.life_path;
  const nameWords = normalisasiNama(name).split(' ').filter(word => word.length > 0);
  
  const report = [];
  const birthYear = birthdate.getFullYear();
  
  for (let i = 0; i < 100; i++) {
    const currentYear = birthYear + i;
    const age = i;
    
    // Calculate various numerological aspects for this year
    const personalYear = reduksiAngka(patterns.angka_ultah + patterns.angka_bulan + reduksiAngka(currentYear));
    const calYear = reduksiAngka(currentYear);
    
    // Calculate cycles and pinnacles (simplified)
    const cycle = reduksiAngka((age / 9) + 1);
    const pinnacle = reduksiAngka(patterns.angka_ultah + patterns.angka_bulan);
    const challenge = Math.abs(patterns.angka_ultah - patterns.angka_bulan);
    
    // Calculate essence (simplified)
    const essence = reduksiAngka(personalYear + patterns.angka_nama);
    const doubleEss = reduksiAngka(essence * 2);
    
    // Calculate word letters for this year (simplified)
    const wordLetters = nameWords.map((word, index) => {
      const letterIndex = age % word.length;
      return word[letterIndex] || '';
    });
    
    // Calculate differences for highlighting
    const cycleCalYearDiff3 = Math.abs(cycle - calYear) === 3;
    const personalEssenceDiff3 = Math.abs(personalYear - essence) === 3;
    const personalEssenceDiff0 = Math.abs(personalYear - essence) === 0;
    
    report.push({
      year: currentYear,
      age,
      challenge,
      cycle,
      pinnacle,
      calYear,
      personalYear,
      essence,
      doubleEss,
      wordLetters,
      cycleCalYearDiff3,
      personalEssenceDiff3,
      personalEssenceDiff0
    });
  }
  
  return {
    report,
    patterns,
    lifePath,
    nameWords
  };
}

/**
 * Get available languages for name dictionary
 */
export function getAvailableLanguages(): string[] {
  return [
    'Indonesian',
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese',
    'Japanese',
    'Arabic',
    'Hindi',
    'Hebrew'
  ];
}

/**
 * Search name dictionary for names and their meanings
 */
export function searchNameDictionary(
  language: string,
  nameQuery: string = '',
  meaningQuery: string = ''
): Array<{ name: string; meaning: string }> {
  // Sample name dictionary data
  const nameDictionary: { [key: string]: Array<{ name: string; meaning: string }> } = {
    'Indonesian': [
      { name: 'Agung', meaning: 'Besar, mulia, terhormat' },
      { name: 'Bayu', meaning: 'Angin, udara segar' },
      { name: 'Cahya', meaning: 'Sinar, cahaya terang' },
      { name: 'Dewi', meaning: 'Putri, wanita cantik' },
      { name: 'Eka', meaning: 'Satu, pertama, utama' },
      { name: 'Fajar', meaning: 'Pagi hari, awal yang baru' },
      { name: 'Gita', meaning: 'Lagu, nyanyian indah' },
      { name: 'Hadi', meaning: 'Pembimbing, penunjuk jalan' },
      { name: 'Indra', meaning: 'Raja para dewa' },
      { name: 'Jaya', meaning: 'Kemenangan, kejayaan' }
    ],
    'English': [
      { name: 'Alexander', meaning: 'Defender of mankind' },
      { name: 'Emma', meaning: 'Universal' },
      { name: 'William', meaning: 'Resolute protector' },
      { name: 'Sophia', meaning: 'Wisdom' },
      { name: 'James', meaning: 'Supplanter' },
      { name: 'Isabella', meaning: 'God is my oath' },
      { name: 'Michael', meaning: 'Who is like God?' },
      { name: 'Olivia', meaning: 'Olive tree' },
      { name: 'David', meaning: 'Beloved' },
      { name: 'Charlotte', meaning: 'Free woman' }
    ],
    'Spanish': [
      { name: 'Alejandro', meaning: 'Defensor de la humanidad' },
      { name: 'María', meaning: 'Amarga' },
      { name: 'Carlos', meaning: 'Hombre libre' },
      { name: 'Ana', meaning: 'Gracia' },
      { name: 'José', meaning: 'Dios aumentará' }
    ],
    'French': [
      { name: 'Alexandre', meaning: 'Défenseur de l\'humanité' },
      { name: 'Marie', meaning: 'Amère' },
      { name: 'Pierre', meaning: 'Pierre' },
      { name: 'Sophie', meaning: 'Sagesse' },
      { name: 'Jean', meaning: 'Dieu fait grâce' }
    ]
  };

  const languageNames = nameDictionary[language] || nameDictionary['Indonesian'];
  
  if (!nameQuery.trim() && !meaningQuery.trim()) {
    return languageNames.slice(0, 20);
  }

  return languageNames.filter(item => {
    const nameMatch = !nameQuery.trim() || item.name.toLowerCase().includes(nameQuery.toLowerCase());
    const meaningMatch = !meaningQuery.trim() || item.meaning.toLowerCase().includes(meaningQuery.toLowerCase());
    return nameMatch && meaningMatch;
  });
}

/**
 * Get numerology meaning for a given number
 */
export function getNumerologyMeaning(number: number): string {
  const meanings: { [key: number]: string } = {
    1: "Leadership, independence, and pioneering spirit",
    2: "Cooperation, diplomacy, and partnership",
    3: "Creativity, communication, and self-expression",
    4: "Stability, hard work, and practicality",
    5: "Freedom, adventure, and versatility",
    6: "Nurturing, responsibility, and healing",
    7: "Spirituality, introspection, and analysis",
    8: "Material success, ambition, and authority",
    9: "Humanitarianism, wisdom, and completion",
    11: "Intuition, inspiration, and enlightenment (Master Number)",
    22: "Master builder, practical idealism, and large-scale achievement (Master Number)",
    33: "Master teacher, compassion, and spiritual guidance (Master Number)"
  };
  
  return meanings[number] || "Unknown number";
}