// Numerology utility functions

/**
 * Calculate the life path number from a birth date
 */
export function calculateLifePathNumber(birthDate: Date): number {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  
  const sum = day + month + year;
  return reduceToSingleDigit(sum);
}

/**
 * Calculate the expression number from a full name
 */
export function calculateExpressionNumber(fullName: string): number {
  const letterValues: { [key: string]: number } = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };
  
  const sum = fullName
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .reduce((total, letter) => total + (letterValues[letter] || 0), 0);
    
  return reduceToSingleDigit(sum);
}

/**
 * Reduce a number to a single digit (1-9) or master number (11, 22, 33)
 */
export function reduceToSingleDigit(num: number): number {
  // Keep master numbers
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }
  
  while (num > 9) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    // Check for master numbers after reduction
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
  }
  
  return num;
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

/**
 * Get available languages for name dictionary
 */
export function getAvailableLanguages(): string[] {
  return [
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
export function searchNameDictionary(query: string, language: string = 'English'): Array<{
  name: string;
  meaning: string;
  origin: string;
  numerologyValue: number;
}> {
  // Sample name dictionary data
  const nameDictionary: { [key: string]: Array<{
    name: string;
    meaning: string;
    origin: string;
  }> } = {
    'English': [
      { name: 'Alexander', meaning: 'Defender of mankind', origin: 'Greek' },
      { name: 'Emma', meaning: 'Universal', origin: 'Germanic' },
      { name: 'William', meaning: 'Resolute protector', origin: 'Germanic' },
      { name: 'Sophia', meaning: 'Wisdom', origin: 'Greek' },
      { name: 'James', meaning: 'Supplanter', origin: 'Hebrew' },
      { name: 'Isabella', meaning: 'God is my oath', origin: 'Hebrew' },
      { name: 'Michael', meaning: 'Who is like God?', origin: 'Hebrew' },
      { name: 'Olivia', meaning: 'Olive tree', origin: 'Latin' },
      { name: 'David', meaning: 'Beloved', origin: 'Hebrew' },
      { name: 'Charlotte', meaning: 'Free woman', origin: 'French' }
    ],
    'Spanish': [
      { name: 'Alejandro', meaning: 'Defender of mankind', origin: 'Greek' },
      { name: 'María', meaning: 'Bitter', origin: 'Hebrew' },
      { name: 'Carlos', meaning: 'Free man', origin: 'Germanic' },
      { name: 'Ana', meaning: 'Grace', origin: 'Hebrew' },
      { name: 'José', meaning: 'God will increase', origin: 'Hebrew' }
    ],
    'French': [
      { name: 'Alexandre', meaning: 'Defender of mankind', origin: 'Greek' },
      { name: 'Marie', meaning: 'Bitter', origin: 'Hebrew' },
      { name: 'Pierre', meaning: 'Stone', origin: 'Greek' },
      { name: 'Sophie', meaning: 'Wisdom', origin: 'Greek' },
      { name: 'Jean', meaning: 'God is gracious', origin: 'Hebrew' }
    ]
  };

  const languageNames = nameDictionary[language] || nameDictionary['English'];
  
  if (!query.trim()) {
    return languageNames.slice(0, 10).map(item => ({
      ...item,
      numerologyValue: calculateExpressionNumber(item.name)
    }));
  }

  const filteredNames = languageNames.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.meaning.toLowerCase().includes(query.toLowerCase()) ||
    item.origin.toLowerCase().includes(query.toLowerCase())
  );

  return filteredNames.map(item => ({
    ...item,
    numerologyValue: calculateExpressionNumber(item.name)
  }));
}