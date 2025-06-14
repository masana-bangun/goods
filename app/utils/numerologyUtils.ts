/**
 * Core Numerology Utility Functions
 */

// Normalize name by converting to uppercase and removing non-alphabetic characters
export const normalisasiNama = (nama: string): string => {
  if (!nama) return "";
  return nama
    .toUpperCase()
    .replace(/[^A-Z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

// Format date to DD/MM/YYYY
export const formatTanggal = (tanggalObj: Date): string => {
  const day = String(tanggalObj.getDate()).padStart(2, "0");
  const month = String(tanggalObj.getMonth() + 1).padStart(2, "0");
  const year = tanggalObj.getFullYear();
  return `${day}/${month}/${year}`;
};

// Calculate numerology value based on character mapping
export const hitungNilaiNumerologi = (teks: string): number => {
  if (!teks) return 0;

  const normalizedText = normalisasiNama(teks);
  let total = 0;

  for (let i = 0; i < normalizedText.length; i++) {
    const char = normalizedText[i];
    if (char === " ") continue;

    // A-I: 1-9, J-R: 1-9, S-Z: 1-8
    const charCode = char.charCodeAt(0) - 65; // A is 65 in ASCII
    const value = (charCode % 9) + 1;
    total += value;
  }

  return total;
};

// Reduce number to a single digit or master number (11, 22, 33)
export const reduksiAngka = (angka: number): number => {
  // Return master numbers as is
  if (angka === 11 || angka === 22 || angka === 33) {
    return angka;
  }

  // If single digit, return as is
  if (angka < 10) {
    return angka;
  }

  // Sum the digits
  let sum = 0;
  let num = angka;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }

  // Recursively reduce until we get a single digit or master number
  return reduksiAngka(sum);
};

// Pythagorean numerology conversion
export const pythagoreanValues: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

// Calculate Destiny number using Pythagorean method
export const calculateDestiny = (name: string): number => {
  const normalizedName = normalisasiNama(name);
  const words = normalizedName.split(" ").filter((word) => word.length > 0);

  let totalDestiny = 0;

  for (const word of words) {
    let wordSum = 0;
    for (const char of word) {
      wordSum += pythagoreanValues[char] || 0;
    }

    // Reduce to single digit unless 11 or 22
    const reducedWordSum = reduksiAngka(wordSum);
    totalDestiny += reducedWordSum;
  }

  // Reduce total to single digit unless 11 or 22
  return reduksiAngka(totalDestiny);
};

// Synchronize lookup table
const synchronizeTable: Record<string, string> = {
  "1-1": "100%",
  "1-2": "90%",
  "1-3": "80%",
  "1-4": "5%",
  "1-5": "100%",
  "1-6": "60%",
  "1-7": "50%",
  "1-8": "40%",
  "1-9": "30%",
  "1-11": "90%",
  "1-22": "5%",
  "2-1": "90%",
  "2-2": "100%",
  "2-3": "90%",
  "2-4": "80%",
  "2-5": "5%",
  "2-6": "100%",
  "2-7": "60%",
  "2-8": "50%",
  "2-9": "10%",
  "2-11": "100%",
  "2-22": "80%",
  "3-1": "80%",
  "3-2": "90%",
  "3-3": "100%",
  "3-4": "90%",
  "3-5": "80%",
  "3-6": "20%",
  "3-7": "100%",
  "3-8": "10%",
  "3-9": "50%",
  "3-11": "10%",
  "3-22": "90%",
  "4-1": "5%",
  "4-2": "80%",
  "4-3": "90%",
  "4-4": "100%",
  "4-5": "90%",
  "4-6": "80%",
  "4-7": "5%",
  "4-8": "100%",
  "4-9": "10%",
  "4-11": "80%",
  "4-22": "100%",
  "5-1": "100%",
  "5-2": "5%",
  "5-3": "80%",
  "5-4": "90%",
  "5-5": "100%",
  "5-6": "60%",
  "5-7": "80%",
  "5-8": "5%",
  "5-9": "80%",
  "5-11": "10%",
  "5-22": "90%",
  "6-1": "60%",
  "6-2": "100%",
  "6-3": "20%",
  "6-4": "80%",
  "6-5": "60%",
  "6-6": "100%",
  "6-7": "70%",
  "6-8": "60%",
  "6-9": "20%",
  "6-11": "100%",
  "6-22": "80%",
  "7-1": "50%",
  "7-2": "60%",
  "7-3": "100%",
  "7-4": "5%",
  "7-5": "80%",
  "7-6": "60%",
  "7-7": "80%",
  "7-8": "90%",
  "7-9": "10%",
  "7-11": "100%",
  "7-22": "5%",
  "8-1": "40%",
  "8-2": "50%",
  "8-3": "10%",
  "8-4": "100%",
  "8-5": "5%",
  "8-6": "10%",
  "8-7": "90%",
  "8-8": "80%",
  "8-9": "90%",
  "8-11": "50%",
  "8-22": "100%",
  "9-1": "30%",
  "9-2": "10%",
  "9-3": "50%",
  "9-4": "10%",
  "9-5": "80%",
  "9-6": "20%",
  "9-7": "10%",
  "9-8": "90%",
  "9-9": "100%",
  "9-11": "40%",
  "9-22": "10%",
  "11-1": "90%",
  "11-2": "10%",
  "11-3": "10%",
  "11-4": "40%",
  "11-5": "20%",
  "11-6": "60%",
  "11-7": "100%",
  "11-8": "50%",
  "11-9": "80%",
  "11-11": "10%",
  "11-22": "10%",
  "22-1": "5%",
  "22-2": "80%",
  "22-3": "90%",
  "22-4": "100%",
  "22-5": "90%",
  "22-6": "80%",
  "22-7": "5%",
  "22-8": "100%",
  "22-9": "60%",
  "22-11": "10%",
  "22-22": "10%",
};

// Calculate Synchronize value
export const calculateSynchronize = (
  destiny: number,
  time: number,
  physical: number,
  mental: number,
  emotion: number,
  intuition: number,
  gender: "Male" | "Female",
): string => {
  // Rule 1: Emotion = 6 and Physical = 6 and Gender = Female
  if (emotion === 6 && physical === 6 && gender === "Female") {
    return "50%";
  }

  // Rule 2: Destiny = 8 and Time = 1,2,3,5,6 and |Destiny - Physical| = 0
  if (
    destiny === 8 &&
    [1, 2, 3, 5, 6].includes(time) &&
    Math.abs(destiny - physical) === 0
  ) {
    return "80%";
  }

  // Rule 3: Destiny = 7 and Time = 4 and |Destiny - Mental| = 0
  if (destiny === 7 && time === 4 && Math.abs(destiny - mental) === 0) {
    return "80%";
  }

  // Rule 4: Destiny = 4 and Time = 7 and |Destiny - Mental| = 0
  if (destiny === 4 && time === 7 && Math.abs(destiny - mental) === 0) {
    return "80%";
  }

  // Rule 5: Perfect alignment conditions
  if (
    (destiny === 1 &&
      time === 3 &&
      physical === 1 &&
      mental === 1 &&
      emotion === 1 &&
      intuition === 1) ||
    (destiny === 3 &&
      time === 1 &&
      physical === 3 &&
      mental === 3 &&
      emotion === 3 &&
      intuition === 3) ||
    (destiny === 5 &&
      time === 7 &&
      physical === 5 &&
      mental === 5 &&
      emotion === 5 &&
      intuition === 5) ||
    (destiny === 7 &&
      time === 5 &&
      physical === 7 &&
      mental === 7 &&
      emotion === 7 &&
      intuition === 7)
  ) {
    return "100%";
  }

  // Rule 6: Complex combination conditions
  const destinyTimeCombos = [
    [5, 2],
    [2, 5],
    [1, 4],
    [4, 1],
    [4, 7],
    [7, 4],
    [5, 8],
    [8, 5],
  ];

  if (destinyTimeCombos.some(([d, t]) => destiny === d && time === t)) {
    const diffs = [
      Math.abs(destiny - physical),
      Math.abs(destiny - mental),
      Math.abs(destiny - emotion),
      Math.abs(destiny - intuition),
    ];
    if (diffs.every((diff) => diff === 0 || diff === 4)) {
      return "20%";
    }
  }

  // Rule 7: Specific conditions
  if (destiny === 6 && time === 3 && emotion === 4) {
    return "20%";
  }

  if (destiny === 3 && time === 6 && intuition === 4) {
    return "20%";
  }

  // Rule 8: Two aspects same condition
  const destinyTimeCombos2 = [
    [2, 3],
    [3, 2],
    [5, 6],
    [6, 5],
  ];

  if (destinyTimeCombos2.some(([d, t]) => destiny === d && time === t)) {
    const aspects = [physical, mental, emotion, intuition];
    const uniqueAspects = new Set(aspects);

    if (uniqueAspects.size === 3) {
      // Two aspects are the same
      return "70%";
    }

    if (uniqueAspects.size === 4) {
      // All aspects are different
      return "60%";
    }
  }

  // Rule 9: Specific pattern
  if (
    physical === 5 &&
    mental === 5 &&
    emotion === 2 &&
    intuition === 5 &&
    Math.abs(destiny - time) !== 0 &&
    Math.abs(destiny - time) !== 4
  ) {
    return "5%";
  }

  // Rule 10: Time = 7 and Destiny = 9 condition
  if (time === 7 && destiny === 9 && physical !== 0 && mental === 0) {
    return "5%";
  }

  // Rule 11: Multiple pattern conditions
  if (
    (physical === 6 && mental === 6 && emotion === 6) ||
    (physical === 5 && emotion === 5 && intuition === 5) ||
    (physical === 6 && mental === 6 && emotion === 6 && intuition === 6) ||
    (physical === 5 && mental === 5 && emotion === 5 && intuition === 5)
  ) {
    return "50%";
  }

  // Rule 12: Specific emotion pattern
  if (physical === 5 && emotion === 3 && time === 5 && mental !== intuition) {
    return "20%";
  }

  // Rule 13: Destiny-Time 6-8 or 8-6 pattern
  if ((destiny === 6 && time === 8) || (destiny === 8 && time === 6)) {
    if (physical !== 0 && mental !== 0 && emotion !== 0 && intuition === 0) {
      return "10%";
    }
  }

  // Default: Use lookup table
  const key = `${destiny}-${time}`;
  return synchronizeTable[key] || "0%";
};

// Calculate Time, Physical, Mental, Emotion, Intuition values
export const calculateTimePhysicalMentalEmotionIntuition = (
  name: string,
  birthdate: Date,
) => {
  const normalizedName = normalisasiNama(name);
  const dd = birthdate.getDate();
  const mm = birthdate.getMonth() + 1;
  const yyyy = birthdate.getFullYear();

  // Time: Sum of date (dd) + month (mm) + year (yyyy), single-digit reduced
  const timeSum = dd + mm + yyyy;
  const time = reduksiAngka(timeSum);

  // Count letters by Pythagorean values
  let physicalCount = 0; // Values 4 or 5
  let mentalCount = 0; // Values 1 or 8
  let emotionCount = 0; // Values 2, 3, or 6
  let intuitionCount = 0; // Values 7 or 9

  for (const char of normalizedName) {
    if (char === " ") continue;

    const value = pythagoreanValues[char];
    if (!value) continue;

    if (value === 4 || value === 5) {
      physicalCount++;
    } else if (value === 1 || value === 8) {
      mentalCount++;
    } else if (value === 2 || value === 3 || value === 6) {
      emotionCount++;
    } else if (value === 7 || value === 9) {
      intuitionCount++;
    }
  }

  // Reduce counts to single digits
  const physical = reduksiAngka(physicalCount);
  const mental = reduksiAngka(mentalCount);
  const emotion = reduksiAngka(emotionCount);
  const intuition = reduksiAngka(intuitionCount);

  return { time, physical, mental, emotion, intuition };
};

// Calculate Coherence value based on complex rules
export const calculateCoherence = (
  physical: number,
  mental: number,
  emotion: number,
  intuition: number,
  synchronize: string,
  gender: "Male" | "Female",
): string => {
  // Convert synchronize percentage to number for comparison
  const syncValue = parseInt(synchronize.replace("%", ""));

  // Rule 1: Physical = 5 and Emotion = 3
  if (physical === 5 && emotion === 3) {
    return "50%";
  }

  // Rule 2: Synchronicity < 60% and Emotion = 6 and Gender = Female
  if (syncValue < 60 && emotion === 6 && gender === "Female") {
    return "30%";
  }

  // Rule 3: Emotion = 6 and Gender = Female
  if (emotion === 6 && gender === "Female") {
    return "50%";
  }

  // Rule 4: All four dimensions are 0
  if (physical === 0 && mental === 0 && emotion === 0 && intuition === 0) {
    return "40%";
  }

  // Rule 5: Three dimensions are 0 (Mental, Emotion, Intuition)
  if (mental === 0 && emotion === 0 && intuition === 0) {
    return "40%";
  }

  // Rule 6: Three dimensions are 0 (Physical, Mental, Intuition)
  if (physical === 0 && mental === 0 && intuition === 0) {
    return "40%";
  }

  // Rule 7: Three dimensions are 0 (Physical, Emotion, Intuition)
  if (physical === 0 && emotion === 0 && intuition === 0) {
    return "40%";
  }

  // Rule 8: All values are 4
  if (physical === 4 && mental === 4 && emotion === 4 && intuition === 4) {
    return "100%";
  }

  // Rule 9: Three values are 4, one is not 4 and not 0
  const values = [physical, mental, emotion, intuition];
  const countFours = values.filter((v) => v === 4).length;
  const countZeros = values.filter((v) => v === 0).length;
  const countOthers = values.filter((v) => v !== 4 && v !== 0).length;

  if (countFours === 3 && countOthers === 1) {
    return "90%";
  }

  // Rule 10: Three values are 4, one is 0
  if (countFours === 3 && countZeros === 1) {
    return "60%";
  }

  // Rule 11: All values different, Physical ≠ 5, Emotion ≠ 3, one is 0
  const uniqueValues = new Set(values);
  if (
    uniqueValues.size === 4 &&
    physical !== 5 &&
    emotion !== 3 &&
    countZeros === 1
  ) {
    return "60%";
  }

  // Rule 12: All values different, Physical = 5, Emotion = 3, Mental or Intuition is 0
  if (
    uniqueValues.size === 4 &&
    physical === 5 &&
    emotion === 3 &&
    (mental === 0 || intuition === 0)
  ) {
    return "30%";
  }

  // Rule 13: All values different, no zeros, Physical = 5, Emotion = 3
  if (
    uniqueValues.size === 4 &&
    countZeros === 0 &&
    physical === 5 &&
    emotion === 3
  ) {
    return "50%";
  }

  // Rule 14: All values different, no zeros, other conditions
  if (uniqueValues.size === 4 && countZeros === 0) {
    return "70%";
  }

  // Rule 15: Physical = Emotion = Intuition = 5
  if (physical === 5 && emotion === 5 && intuition === 5) {
    return "20%";
  }

  // Rule 16: Physical, Mental, Emotion all = 6
  if (physical === 6 && mental === 6 && emotion === 6) {
    return "10%";
  }

  // Rule 17: All four values are the same
  if (uniqueValues.size === 1) {
    return "100%";
  }

  // Rule 18: Physical = Mental = Intuition = 5
  if (physical === 5 && mental === 5 && intuition === 5) {
    return "20%";
  }

  // Rule 19: Three values are the same and not 0
  if (uniqueValues.size === 2) {
    const valueCounts = values.reduce(
      (acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const hasThreeSame = Object.values(valueCounts).includes(3);
    if (hasThreeSame && !values.includes(0)) {
      return "90%";
    }
  }

  // Rule 20: Two values are the same, no zeros
  if (uniqueValues.size === 3 && countZeros === 0) {
    // Special case: if Emotion = 6
    if (emotion === 6) {
      return "30%";
    }
    return "80%";
  }

  // Rule 21: One of Physical, Emotion, or Intuition is 0
  if (physical === 0 || emotion === 0 || intuition === 0) {
    return "60%";
  }

  // Rule 22: Two values same and one other is 0
  if (uniqueValues.size === 3 && countZeros === 1) {
    return "60%";
  }

  // Rule 23: Only Mental = 0, others not 0
  if (mental === 0 && physical !== 0 && emotion !== 0 && intuition !== 0) {
    return "30%";
  }

  // Rule 24: Emotion = 6 and Physical = 1
  if (emotion === 6 && physical === 1) {
    return "30%";
  }

  // Rule 25: Only Physical = 5
  if (physical === 5) {
    return "80%";
  }

  // Default: no conditions met
  return "0%";
};

// Extract all numerology patterns from name and birthdate
export const getPola = (
  namaLengkap: string,
  tanggalLahirObj: Date,
  gender: "Male" | "Female" = "Male",
) => {
  // Normalize input
  const namaNormal = normalisasiNama(namaLengkap);
  const tglLahirFormat = formatTanggal(tanggalLahirObj);

  // Extract date components
  const dd = tanggalLahirObj.getDate();
  const mm = tanggalLahirObj.getMonth() + 1;
  const yyyy = tanggalLahirObj.getFullYear();

  // Extract name components
  const stringVokal = namaNormal.replace(/[^AEIOU]/g, "");
  const stringKonsonan = namaNormal.replace(/[AEIOU\s]/g, "");
  const namaDepan = namaNormal.split(" ")[0] || "";

  // Calculate raw values
  const nilai_mentah_karakter = hitungNilaiNumerologi(namaNormal);
  const nilai_mentah_vokal = hitungNilaiNumerologi(stringVokal);
  const nilai_mentah_konsonan = hitungNilaiNumerologi(stringKonsonan);
  const nilai_mentah_siklus_hidup = hitungNilaiNumerologi(`${dd}${mm}${yyyy}`);

  // Calculate reduced values
  const angka_karakter = reduksiAngka(nilai_mentah_karakter);
  const angka_vokal = reduksiAngka(nilai_mentah_vokal);
  const angka_konsonan = reduksiAngka(nilai_mentah_konsonan);
  const angka_siklus_hidup = reduksiAngka(nilai_mentah_siklus_hidup);
  const angka_takdir = reduksiAngka(angka_karakter + angka_siklus_hidup);
  const angka_ultah = reduksiAngka(dd);
  const angka_bulan = reduksiAngka(mm);
  const angka_tahun_lahir = reduksiAngka(yyyy);
  const angka_garis_hidup = `${angka_ultah}-${angka_bulan}-${angka_tahun_lahir}`;
  const angka_potensi_diri = reduksiAngka(
    nilai_mentah_karakter + nilai_mentah_vokal + nilai_mentah_konsonan,
  );
  const angka_sikap = reduksiAngka(angka_ultah + angka_bulan);
  const angka_pertumbuhan = reduksiAngka(hitungNilaiNumerologi(namaDepan));

  // Calculate new Destiny using Pythagorean method
  const destiny = calculateDestiny(namaLengkap);

  // Calculate Time, Physical, Mental, Emotion, Intuition
  const { time, physical, mental, emotion, intuition } =
    calculateTimePhysicalMentalEmotionIntuition(namaLengkap, tanggalLahirObj);

  // Calculate Synchronize using the new values
  const synchronize = calculateSynchronize(
    destiny,
    time,
    physical,
    mental,
    emotion,
    intuition,
    gender,
  );

  // Calculate Coherence value
  const coherence = calculateCoherence(
    physical,
    mental,
    emotion,
    intuition,
    synchronize,
    gender,
  );

  // Calculate intensity numbers
  const angka_intensitas: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  for (let i = 0; i < namaNormal.length; i++) {
    const char = namaNormal[i];
    if (char === " ") continue;

    const charCode = char.charCodeAt(0) - 65; // A is 65 in ASCII
    const value = (charCode % 9) + 1;
    angka_intensitas[value]++;
  }

  // Calculate Hara using the specific formula
  const calculateHara = (name: string): number => {
    const normalizedName = normalisasiNama(name);

    // Repeat name until it reaches 9 characters
    let extendedName = normalizedName.replace(/\s/g, ""); // Remove spaces
    while (extendedName.length < 9) {
      extendedName += normalizedName.replace(/\s/g, "");
    }

    // Take first 9 characters and convert using Pythagorean values
    const first9Letters = extendedName.substring(0, 9);
    const letterValues = [];

    for (let i = 0; i < 9; i++) {
      const letter = first9Letters[i];
      letterValues.push(pythagoreanValues[letter] || 0);
    }

    // Calculate three sums according to the formula
    const sum1 = letterValues[0] + 8 * letterValues[1] + letterValues[2];
    const sum2 =
      2 * letterValues[3] + 7 * letterValues[4] + 2 * letterValues[5];
    const sum3 = letterValues[6] + 8 * letterValues[7] + letterValues[8];

    // Reduce each sum to single digit
    const reducedSum1 = reduksiAngka(sum1);
    const reducedSum2 = reduksiAngka(sum2);
    const reducedSum3 = reduksiAngka(sum3);

    // Sum the three results
    const totalSum = reducedSum1 + reducedSum2 + reducedSum3;

    // If total is 11 or 13, use as is; otherwise reduce to single digit
    if (totalSum === 11 || totalSum === 13) {
      return totalSum;
    }

    return reduksiAngka(totalSum);
  };

  const hara = calculateHara(namaLengkap);

  // Calculate Expression number (same as destiny)
  const expression = destiny;

  // Calculate Soul Urge number (same as angka_vokal)
  const soulUrge = angka_vokal;

  // Calculate Personality number (same as angka_konsonan)
  const personality = angka_konsonan;

  // Calculate Birth Day number
  const birthDay = reduksiAngka(dd);

  // Calculate Maturity number
  const maturity = reduksiAngka(hara + expression);

  // Calculate Balance number
  const firstInitial = namaNormal.charAt(0);
  const balanceValue = pythagoreanValues[firstInitial] || 0;
  const balance = reduksiAngka(balanceValue);

  // Calculate Challenge numbers
  const challenge1 = Math.abs(angka_ultah - angka_bulan);
  const challenge2 = Math.abs(angka_ultah - angka_tahun_lahir);
  const challenge3 = Math.abs(challenge1 - challenge2);
  const challenge4 = Math.abs(angka_bulan - angka_tahun_lahir);

  // Calculate Personal Year
  const currentYear = new Date().getFullYear();
  const personalYear = reduksiAngka(
    angka_ultah + angka_bulan + reduksiAngka(currentYear),
  );

  // Calculate Synergize, Productive, and Momen Sukses
  const calculateLifeAnalysis = () => {
    const nameWords = namaLengkap
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    // Calculate letter values and durations for each word
    const wordLetterData = nameWords.map((word) => {
      const letterData: { letter: string; value: number; duration: number }[] =
        [];
      const normalizedWord = word.toUpperCase().replace(/[^A-Z]/g, "");

      for (let i = 0; i < normalizedWord.length; i++) {
        const letter = normalizedWord[i];
        const value = pythagoreanValues[letter] || 0;
        // Duration of each letter is equal to its Pythagorean value
        letterData.push({ letter, value, duration: value });
      }

      return letterData;
    });

    // Generate 100 years of essence data with parallel letter processing
    const essenceData = [];
    const doubleEssenceData = [];
    const phraseData = [];

    for (let age = 0; age < 100; age++) {
      // For each word, determine which letter is active at this age
      const activeLetters = wordLetterData.map((wordData) => {
        if (wordData.length === 0) return null;

        // Calculate which letter is active based on durations
        let totalDuration = 0;
        for (let i = 0; i < wordData.length; i++) {
          totalDuration += wordData[i].duration;
        }

        // Use modulo to cycle through the word's letters based on their durations
        let currentPosition = age % totalDuration;

        // Find which letter corresponds to the current position
        let runningDuration = 0;
        for (let i = 0; i < wordData.length; i++) {
          runningDuration += wordData[i].duration;
          if (currentPosition < runningDuration) {
            return wordData[i];
          }
        }

        // Fallback to first letter if calculation fails
        return wordData[0];
      });

      // Filter out null values
      const validLetters = activeLetters.filter(
        (letter) => letter !== null,
      ) as { letter: string; value: number }[];

      // Calculate essence (sum of active letter values)
      const essenceSum = validLetters.reduce(
        (sum, letter) => sum + letter.value,
        0,
      );
      // Keep special numbers (11, 13, 14, 16, 19, 22) without reduction
      const specialNumbers = [11, 13, 14, 16, 19, 22];
      const mainEssence = specialNumbers.includes(essenceSum)
        ? essenceSum
        : reduksiAngka(essenceSum);
      essenceData.push(mainEssence);

      // Store double essence (raw sum without reduction)
      doubleEssenceData.push(essenceSum);

      // Store active letters for phrase data
      phraseData.push(validLetters.map((letter) => letter.letter).join(""));
    }

    // Calculate Synergize: 100 dikurang jumlah baris dalam 100 year life report yang mengandung essence 11, 13, dan 19
    let specialEssenceCount = 0;
    for (let age = 0; age < 100; age++) {
      if ([11, 13, 19].includes(essenceData[age])) {
        specialEssenceCount++;
      }
    }
    const synergizeValue = Math.max(0, 100 - specialEssenceCount); // Pastikan tidak negatif
    const synergize = `${synergizeValue}%`;

    // Calculate Productive: 60 dikurang jumlah baris dalam 100 year life report dimulai dari age 21 sampai dengan age 80
    // yang mengandung essence 11, 13, dan 19. Kemudian hasilnya dibagi 60, kemudian dikali 100%
    let productiveEssenceCount = 0;
    for (let age = 21; age <= 80; age++) {
      if ([11, 13, 19].includes(essenceData[age])) {
        productiveEssenceCount++;
      }
    }
    const productiveValue = Math.round(
      ((60 - productiveEssenceCount) / 60) * 100,
    );
    const productive = `${Math.max(0, productiveValue)}%`;

    // Calculate Momen Sukses: Sum of essence values from age 18-57 with specific conversions
    const essenceValues: Record<number, number> = {
      1: 0.75,
      2: 0.75,
      3: 2,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 2,
      9: 0.5,
      11: 0.5,
      13: -1,
      14: 1,
      16: -1,
      19: -1,
      22: 3,
    };

    let momenSuksesTotal = 0;
    let validAgeCount = 0;

    for (let age = 18; age <= 57; age++) {
      validAgeCount++;
      momenSuksesTotal += essenceValues[essenceData[age]] || 0;
    }

    const momenSuksesAverage =
      validAgeCount > 0 ? momenSuksesTotal / validAgeCount : 0;
    // Format: show 5 decimal places if < 1, show "1+" if >= 1
    const momenSukses =
      momenSuksesAverage >= 1 ? "1+" : momenSuksesAverage.toFixed(5);

    return {
      synergize,
      productive,
      momenSukses,
      essenceData,
      doubleEssenceData,
      phraseData,
    };
  };

  const { synergize, productive, momenSukses } = calculateLifeAnalysis();

  return {
    namaNormal,
    tglLahirFormat,
    angka_karakter,
    angka_vokal,
    angka_konsonan,
    angka_siklus_hidup,
    angka_takdir,
    angka_ultah,
    angka_bulan,
    angka_tahun_lahir,
    angka_garis_hidup,
    angka_intensitas,
    angka_potensi_diri,
    angka_sikap,
    angka_pertumbuhan,
    // New parameters
    destiny,
    synchronize,
    // Time, Physical, Mental, Emotion, Intuition parameters
    time,
    physical,
    mental,
    emotion,
    intuition,
    coherence,
    // Life Analysis parameters
    synergize,
    productive,
    momenSukses,
    // Advanced parameters
    hara,
    expression,
    soulUrge,
    personality,
    birthDay,
    maturity,
    balance,
    challenge1,
    challenge2,
    challenge3,
    challenge4,
    personalYear,
    // Raw values for advanced calculations
    nilai_mentah_karakter,
    nilai_mentah_vokal,
    nilai_mentah_konsonan,
    nilai_mentah_siklus_hidup,
  };
};

// Global variables for database storage
export let allExpDatabases: Record<string, Array<[string, string]>> = {};
export let allEspDatabases: Record<string, Array<[string, string]>> = {};
export let currentExpResults: string[] = [];
export let currentCombiResults: string[] = [];

// Grafologi Index calculation
export interface GrafologiResult {
  indexValue: number;
  persValue: string;
  suggestions: Array<{ value: string; isPositive: boolean; deskValue: string }>;
  desk: string;
  deskIsPositive: boolean;
}

// Letter to number conversion for Grafologi Index
const grafologiValues: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 600,
  K: 10,
  L: 20,
  M: 30,
  N: 40,
  O: 50,
  P: 60,
  Q: 70,
  R: 80,
  S: 90,
  T: 100,
  U: 200,
  V: 700,
  W: 1400,
  X: 300,
  Y: 400,
  Z: 500,
};

// Grafologi lookup table
const grafologiTable = [
  {
    ang: 1,
    g1: "1",
    pers: "100%",
    ng1: 1,
    desk: "😎 Mengembangkan Hobi dan kegemaran, hobi yang menghasilkan (keuangan, pujian) serta kehormatan",
  },
  {
    ang: 2,
    g2: "2",
    pers: "0%",
    ng2: 0,
    desk: "😩 Rencanakan, ciptakan dan rawat lingkungan sistem keluarga/karir, bisnis atau keuangan, hindari kehidupan (bisnis) tidak tertata/kacau, binasa tidak wajar. Bina dengan sepenuh hati apa yang sudah didapat, tekun dan disiplinlah..kendalikan keinginan dan ego ke arah positif",
  },
  {
    ang: 3,
    g3: "3",
    pers: "100%",
    ng3: 1,
    desk: "😇 Senantiasalah ingat pada tuhan, Agamais, percaya pada kekuatan ruh, rohani dan spiritual",
  },
  {
    ang: 4,
    g4: "4",
    pers: "100%",
    ng4: 1,
    desk: "👮 Mengembangkan keteguhan, tegas berpengaruh, tetap bijaksana dalam kekuasaan",
  },
  {
    ang: 5,
    g5: "5",
    pers: "100%",
    ng5: 1,
    desk: "💑 Menjaga kehormatan diri/keluarga agar meraih kebahagiaan, kehormatan dan pernikahan",
  },
  {
    ang: 6,
    g6: "6",
    pers: "100%",
    ng6: 1,
    desk: "🤹 Tetap berusaha melakukan yang terbaik, sepenuh hati hingga mudah meraih kesempurnaan",
  },
  {
    ang: 7,
    g7: "7",
    pers: "100%",
    ng7: 1,
    desk: "😁 Teruslah mencari jalan kehidupan yang tentram, kebebasan, merdeka, bahagia dan kesempurnaan",
  },
  {
    ang: 8,
    g8: "8",
    pers: "100%",
    ng8: 1,
    desk: "⚖️ Upayakan bersikap adil keadilan, suka berbuat dan diperlakukan adil",
  },
  {
    ang: 9,
    g9: "9",
    pers: "0%",
    ng9: 0,
    desk: "😭 Hindari sikap kesedihan berkepanjangan, rasa kehilangan dalam hidup, sedih tak berujung, kekurangsempurnaan. Sadari segala sesuatunya tidak sempurna, itu yang membuat unik dan bersyukurlah atas nikmat yang masih diberi tuhan dan jadilah seseorang yang teguh jiwa",
  },
  {
    ang: 10,
    g1: "10",
    g2: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    desk: "🙃 Berlatih tekun dan beribadah/puasa agar berhasil baik, pintar dan beruntung",
  },
  {
    ang: 11,
    g1: "11",
    g2: "10",
    g3: "1",
    g4: "2",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😵 Selalu upayakan langkah antisipatif terhadap cacat/keributan hukum dan tabiat lupa kewajiban, sakit dan pengharapan. Kerjakan apa yang seharusnya dikerjakan, jangan menunda. Perhatikan setiap langkah dan setiap keputusan, jangan merugikan orang lain",
  },
  {
    ang: 12,
    g1: "12",
    g2: "10",
    g3: "2",
    g4: "3",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    desk: "🙂 Berusaha menjadi lebih bermanfaat dalam hal baik dan berguna",
  },
  {
    ang: 13,
    g1: "13",
    g2: "10",
    g3: "3",
    g4: "4",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "🤬 Perbaiki sikap berperilaku ekstrim, durjana dan kurang taat (kurang suka tata cara dan sistem). Bijaklah menghadapi perbedaan yang ada, hindari berdebat, tetap bersabar dan kendalikan ego pribadi",
  },
  {
    ang: 14,
    g1: "14",
    g2: "10",
    g3: "4",
    g4: "5",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "😌 Bersifat tulus, mau berkorban (atau menjadi korban) dalam hubungan karir, situasi, lingkungan, keuangan. Pertimbangkan apa yang bisa diberi, bijaksanalah! Diri pribadi dan keluarga juga diperhatikan",
  },
  {
    ang: 15,
    g1: "15",
    g2: "10",
    g3: "5",
    g4: "6",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "👳 Tetap menjaga ketaatan dalam ibadah, berperilaku baik budi dan sopan",
  },
  {
    ang: 16,
    g1: "16",
    g2: "10",
    g3: "6",
    g4: "7",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "👫 Tebarkan rasa Kecintaan dan teruslah berusaha meraih kebahagiaan",
  },
  {
    ang: 17,
    g1: "17",
    g2: "10",
    g3: "7",
    g4: "8",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "🤕 Periksa segala hal yang menimbulkan kurang menyenangkan dalam perjalanan, mungkin pelupa, sedikit lalai atau suka lupa. Mulailah melakukan sesuatu secara rutin dan letakkan sesuatu pada tempatnya. Perhatikan situasi ketika dalam perjalanan",
  },
  {
    ang: 18,
    g1: "18",
    g2: "10",
    g3: "8",
    g4: "9",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😫 Berhati-hati dalam bertindak jangan sampai menimbulkan kekejaman, bersifat kejam dan tega. Hindari lingkungan yang kurang bersahabat, tanamkan kasih sayang dalam diri",
  },
  {
    ang: 19,
    g1: "19",
    g2: "10",
    g3: "9",
    g4: "1",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    desk: "🤪 Selalu mengambil keputusan terbaik, rencana yang matang jangan ceroboh bertindak bodoh dan ketololan sendiri atau pihak lain, hingga ikut terkena akibatnya. Kendalikan tingkah laku dan emosi, jangan mudah terbawa suasana, ambil waktu berpikir jernih",
  },
  {
    ang: 20,
    g2: "20",
    pers: "0%",
    desk: "😤 Kurangi perilaku bertabiat bengis, ketus atau diam, galak judes, hasrat menang (match one on one). Berkasih sayang lebih menenteramkan, tumbuhkan rasa peduli dan persahabatan meski pada lawan sekalipun. Meski dalam kadar yang sedikit",
  },
  {
    ang: 21,
    g1: "21",
    g2: "20",
    g3: "1",
    g4: "3",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "🕵️ Tetap dalam sikap kebijaksanaan, upayakan pikiran jernih yang merangsang penciptaan dan kegaiban, karya fantastis diluar nalar tapi berfaedah",
  },
  {
    ang: 22,
    g1: "22",
    g2: "20",
    g3: "2",
    g4: "4",
    pers: "25%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    desk: "🛌 Atur pola hidup sehat dan pikiran seimbang agar terhindar sakit/ujian berkepanjangan. Dekatkan diri pada tuhan, jangan turuti hal-hal yang menjauhkan diri dari iman. Jaga perilaku sehat",
  },
  {
    ang: 23,
    g1: "23",
    g2: "20",
    g3: "3",
    g4: "5",
    pers: "50%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "🖖 Kurang memahami, kurang berpengetahuan tentang agama. Belajar memahami dan menerapkan ajaran agama perlahan, dengarkan dan ikuti saran pemuka agama",
  },
  {
    ang: 24,
    g1: "24",
    g2: "20",
    g3: "4",
    g4: "6",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "👣 Nikmati situasi wara-wiri, petualangan dan travelling",
  },
  {
    ang: 25,
    g1: "25",
    g2: "20",
    g3: "5",
    g4: "7",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "🤓 Terus asah diri dan nalar jenius, cerdas, pemikiran tajam, kelahiran dan penemuan",
  },
  {
    ang: 26,
    g1: "26",
    g2: "20",
    g3: "6",
    g4: "8",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "👩‍🔧 Jadikan sikap menjadi alamat baik dan berfaedah, berguna bagi banyak orang",
  },
  {
    ang: 27,
    g1: "27",
    g2: "20",
    g3: "7",
    g4: "9",
    pers: "50%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    desk: "💪 Kendalikan mental. Berjiwa gagah, kuat dan bersifat tabah",
  },
  {
    ang: 28,
    g1: "28",
    g2: "20",
    g3: "8",
    g4: "10",
    g5: "1",
    pers: "80%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "💞 Upayakan sikap kecintaan, ramah dan bijaklah. Tetap tidak berlebihan",
  },
  {
    ang: 29,
    g1: "29",
    g2: "20",
    g3: "9",
    g4: "11",
    g5: "2",
    g6: "10",
    g7: "1",
    pers: "43%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "✍️ Sepenuh hatilah ketika bergelut dalam administrasi dan surat-menyurat, analisis, sastrawan, content creator/ media",
  },
  {
    ang: 30,
    g1: "30",
    g2: "3",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    desk: "🤠 Termasyhur sedari kecil atau ketika dewasa atau setelah menikah",
  },
  {
    ang: 31,
    g1: "31",
    g2: "30",
    g3: "1",
    g4: "4",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "🤠 Bersemangatlah dalam gemar kemasyhuran dan kebajikan",
  },
  {
    ang: 32,
    g1: "32",
    g2: "30",
    g3: "2",
    g4: "5",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    desk: "👰Bergembiralah dan suka menjalin hubungan baik",
  },
  {
    ang: 33,
    g1: "33",
    g2: "30",
    g3: "3",
    g4: "6",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "🙇 Cara atau ketelitian yang amat sangat, namun jaga keseimbangan perilaku dan pola",
  },
  {
    ang: 34,
    g1: "34",
    g2: "30",
    g3: "4",
    g4: "7",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "🧟 Ariflah dalam setiap kesulitan yang ada, kendalikan dan cari solusi terbaik. Hindari pikiran terbeban yang bisa berdampak sakit, butuh olah mental. Perkuat kesadaran, mendekat pada tuhan dan atur dan seimbangkan beban diri. Upayakan lingkungan kondusif (keluarga). Kumpullah dan kompak bersama keluarga di akhir pekan, sangat menyenangkan",
  },
  {
    ang: 35,
    g1: "35",
    g2: "30",
    g3: "5",
    g4: "8",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "👪 Menjaga pola hidup dan kesehatan yang baik dan hidup dalam kerukunan",
  },
  {
    ang: 36,
    g1: "36",
    g2: "30",
    g3: "6",
    g4: "9",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    desk: "🕵️ Latih diri agar berperilaku jenius, pandai luar biasa, otak terang dan pengetahuan luas",
  },
  {
    ang: 37,
    g1: "37",
    g2: "30",
    g3: "7",
    g4: "10",
    g5: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "👨‍👩‍👧‍👦 Ciptakan jalan hidup manis, hidup rukun dalam berumahtangga. Komunikasi intens",
  },
  {
    ang: 38,
    g1: "38",
    g2: "30",
    g3: "8",
    g4: "11",
    g5: "2",
    g6: "10",
    g7: "1",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "🙈 Antisipasi segala hal cacat tidak sempurna, merasa kurang puas, bertabiat pelit dan pencemburu. Kerjakan segala sesuatu dengan sepenuh hati. Bersyukurlah atas apa yang ada. Rajinlah melakukan derma karena derma adalah jalan luhur keberkahan",
  },
  {
    ang: 39,
    g1: "39",
    g2: "30",
    g3: "9",
    g4: "12",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "🤭 Boleh gemar akan pujian, suka dipuji atau suka cari muka. Tetap ingat batasan, sewajarnya",
  },
  {
    ang: 40,
    g1: "40",
    g2: "4",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    desk: "💝 Bersyukur pada tuhan atas hajatan dan pesta, keramaian, bersuka-suka dan pernikahan (diri,anak, keluarga dan lingkungan)",
  },
  {
    ang: 41,
    g1: "41",
    g2: "40",
    g3: "1",
    g4: "5",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "💬 Jaga perilaku baik dan latih diri agar terhindar kenistaan umum, kurang kehati-hatian, gegabah, nista atau kesedihan (simpati) di hadapan banyak orang. Pikirkan dan perhitungkan dulu akibat atas setiap perbuatan yang akan dilakukan. Jangan mudah terbujuk atas segala hal yang masih samar",
  },
  {
    ang: 42,
    g1: "42",
    g2: "40",
    g3: "2",
    g4: "6",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    desk: "💣 Tingkatkan ibadah dan atur pola hidup sehat serta tekun dan konsisten agar terhindar dari hal/usaha berumur pendek, atau apapun itu yang dilakukan kurang langgeng, kesusahan, hidup kurang bahagia. Segala sesuatu memiliki masanya, lakukan sesuatu sepenuh hati dan hindari sifat ceroboh. Berhematlah",
  },
  {
    ang: 43,
    g1: "43",
    g2: "40",
    g3: "3",
    g4: "7",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "🕌 Sepenuh hatilah dalam ritual keagamaan, agamais, dekat dengan tokoh agama rohani spiritual di lingkungan",
  },
  {
    ang: 44,
    g1: "44",
    g2: "40",
    g3: "4",
    g4: "8",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "😃 Berupaya adil dalam memiliki pengaruh, pemerintahan dan kekuasaan",
  },
  {
    ang: 45,
    g1: "45",
    g2: "40",
    g3: "5",
    g4: "9",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    desk: "🏝️ Bersyukur dimanapun ketika menjelajah seisi negeri",
  },
  {
    ang: 46,
    g1: "46",
    g2: "40",
    g3: "6",
    g4: "10",
    g5: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "🏩 Atur pola hidup dan usaha secara cermat agar meraih Kemakmuran",
  },
  {
    ang: 47,
    g1: "47",
    g2: "40",
    g3: "7",
    g4: "11",
    g5: "2",
    g6: "10",
    g7: "1",
    pers: "71%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "🗽 Bersyukurlah atas hidup dan bahagialah, tetap usahakan lingkungan yang menyenangkan",
  },
  {
    ang: 48,
    g1: "48",
    g2: "40",
    g3: "8",
    g4: "12",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "🏛️ Berbuat adil terutama melakukan hal berhubungan dengan hakim, masuk pengadilan (jadi pengacara, korban, ataupun tersangka), berhubungan atau mengalami suatu kasus, hakim dan putusan pengadilan. Upayakan setiap langkah menuju hal positif dan hindari merugikan orang lain",
  },
  {
    ang: 49,
    g1: "49",
    g2: "40",
    g3: "9",
    g4: "13",
    g5: "4",
    g6: "10",
    g7: "3",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "🤑 Kendalikan sifat materialistik, rakus, suka pamer (posisi, uang, harta, kesuksesan). Bersyukur atas apa yang diberi tuhan, hindarkan diri dari perilaku sombong. Bukankah segala sesuatu materi akan tetap tinggal di dunia",
  },
  {
    ang: 50,
    g1: "50",
    g2: "5",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 51,
    g1: "50",
    g2: "1",
    g3: "6",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 52,
    g1: "50",
    g2: "2",
    g3: "7",
    pers: "67%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 53,
    g1: "50",
    g2: "3",
    g3: "8",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 54,
    g1: "50",
    g2: "4",
    g3: "9",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 55,
    g1: "50",
    g2: "5",
    g3: "10",
    g4: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 56,
    g1: "50",
    g2: "6",
    g3: "11",
    g4: "2",
    g5: "10",
    g6: "1",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 57,
    g1: "50",
    g2: "7",
    g3: "12",
    g4: "3",
    g5: "10",
    g6: "2",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 58,
    g1: "50",
    g2: "8",
    g3: "13",
    g4: "4",
    g5: "10",
    g6: "3",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 59,
    g1: "50",
    g2: "9",
    g3: "14",
    g4: "5",
    g5: "10",
    g6: "4",
    pers: "67%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🙏 Yakinlah dengan tuhan atas pengampunan, kebebasan dan kemerdekaan",
  },
  {
    ang: 60,
    g1: "60",
    g2: "6",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat, bisa pada hal fisik bisa dalam hal batin/berseberangan pemikiran, atau merasa ada jarak pemisah pada ruang waktu atau alam/lingkungan. Hargai setiap kebersamaan yang ada, tetaplah bina dan bijaklah karena ada waktu bersama dan ada masanya berpisah, sekali lagi hargai setiap kebersamaan",
  },
  {
    ang: 61,
    g1: "60",
    g2: "1",
    g3: "7",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 62,
    g1: "60",
    g2: "2",
    g3: "8",
    pers: "33%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 63,
    g1: "60",
    g2: "3",
    g3: "9",
    pers: "33%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 64,
    g1: "60",
    g2: "4",
    g3: "10",
    g4: "1",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 65,
    g1: "60",
    g2: "5",
    g3: "11",
    g4: "2",
    g5: "10",
    g6: "1",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 66,
    g1: "60",
    g2: "6",
    g3: "12",
    g4: "3",
    g5: "10",
    g6: "2",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 67,
    g1: "60",
    g2: "7",
    g3: "13",
    g4: "4",
    g5: "10",
    g6: "3",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 68,
    g1: "60",
    g2: "8",
    g3: "14",
    g4: "5",
    g5: "10",
    g6: "4",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 69,
    g1: "60",
    g2: "9",
    g3: "15",
    g4: "6",
    g5: "10",
    g6: "5",
    pers: "67%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "👥 Bijaklah terhadap adanya jarak dengan keluarga maupun sahabat",
  },
  {
    ang: 70,
    g1: "70",
    g2: "7",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    desk: "🧗 Penuhi diri dengan Semangat dalam hidup, bergerak, aktif, pengetahuan dan keindahan",
  },
  {
    ang: 71,
    g1: "70",
    g2: "1",
    g3: "8",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "🧗 Penuhi diri dengan Semangat dalam hidup, bergerak, aktif, pengetahuan dan keindahan",
  },
  {
    ang: 72,
    g1: "70",
    g2: "2",
    g3: "9",
    pers: "33%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    desk: "🧗 Penuhi diri dengan Semangat dalam hidup, bergerak, aktif, pengetahuan dan keindahan",
  },
  {
    ang: 73,
    g1: "70",
    g2: "3",
    g3: "10",
    g4: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "🧗 Penuhi diri dengan Semangat dalam hidup, bergerak, aktif, pengetahuan dan keindahan",
  },
  {
    ang: 74,
    g1: "70",
    g2: "4",
    g3: "11",
    g4: "2",
    g5: "10",
    g6: "1",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "🧗 Penuhi diri dengan Semangat dalam hidup, bergerak, aktif, pengetahuan dan keindahan",
  },
  {
    ang: 75,
    g1: "75",
    g2: "70",
    g3: "5",
    g4: "12",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "86%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "🏇 Berada dalam dunia sendiri, menata dunianya sendiri (nyata)/ maya (meditasi, kontemplasi, spiritual)",
  },
  {
    ang: 76,
    g1: "70",
    g2: "6",
    g3: "13",
    g4: "4",
    g5: "10",
    g6: "3",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🧗 Penuhi diri dengan Semangat dalam hidup, bergerak, aktif, pengetahuan dan keindahan",
  },
  {
    ang: 77,
    g1: "77",
    g2: "70",
    g3: "7",
    g4: "14",
    g5: "5",
    g6: "10",
    g7: "4",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "🙏 Terus meminta ampun pada tuhan, pengampunan, penyesalan dan bertobat",
  },
  {
    ang: 78,
    g1: "70",
    g2: "8",
    g3: "15",
    g4: "6",
    g5: "10",
    g6: "5",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🧗 Penuhi diri dengan Semangat dalam hidup, bergerak, aktif, pengetahuan dan keindahan",
  },
  {
    ang: 79,
    g1: "70",
    g2: "9",
    g3: "16",
    g4: "7",
    g5: "10",
    g6: "6",
    pers: "83%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🧗 Penuhi diri dengan Semangat dalam hidup, bergerak, aktif, pengetahuan dan keindahan",
  },
  {
    ang: 80,
    g1: "80",
    g2: "8",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 81,
    g1: "81",
    g2: "80",
    g3: "1",
    g4: "9",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    desk: "💃 Latih diri dalam Keahlian dalam ilmu seni, artistik, berjiwa seni",
  },
  {
    ang: 82,
    g1: "80",
    g2: "2",
    g3: "10",
    g4: "1",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 83,
    g1: "80",
    g2: "3",
    g3: "11",
    g4: "2",
    g5: "10",
    g6: "1",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 84,
    g1: "80",
    g2: "4",
    g3: "12",
    g4: "3",
    g5: "10",
    g6: "2",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 85,
    g1: "80",
    g2: "5",
    g3: "13",
    g4: "4",
    g5: "10",
    g6: "3",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 86,
    g1: "80",
    g2: "6",
    g3: "14",
    g4: "5",
    g5: "10",
    g6: "4",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 87,
    g1: "80",
    g2: "7",
    g3: "15",
    g4: "6",
    g5: "10",
    g6: "5",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 88,
    g1: "80",
    g2: "8",
    g3: "16",
    g4: "7",
    g5: "10",
    g6: "6",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 89,
    g1: "80",
    g2: "9",
    g3: "17",
    g4: "8",
    g5: "10",
    g6: "7",
    pers: "67%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "🧖 Atur pola hidup yang baik agar tetap dalam kesehatan prima, kesembuhan, cepat pulih dari sakit",
  },
  {
    ang: 90,
    g1: "90",
    g2: "9",
    pers: "0%",
    ng1: 0,
    ng2: 0,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka. Perkuat intuisi dan pertimbangkan baik buruknya suatu tawaran. Pahamilah bahwa hal yang menarik belum tentu baik, bijaksana dan jangan berlebihan dalam menginginkan sesuatu",
  },
  {
    ang: 91,
    g1: "90",
    g2: "1",
    g3: "10",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 92,
    g1: "90",
    g2: "2",
    g3: "11",
    g4: "10",
    g5: "1",
    pers: "40%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 93,
    g1: "90",
    g2: "3",
    g3: "12",
    g4: "10",
    g5: "2",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 0,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 94,
    g1: "90",
    g2: "4",
    g3: "13",
    g4: "10",
    g5: "3",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 95,
    g1: "90",
    g2: "5",
    g3: "14",
    g4: "10",
    g5: "4",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 96,
    g1: "90",
    g2: "6",
    g3: "15",
    g4: "10",
    g5: "5",
    pers: "80%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 97,
    g1: "90",
    g2: "7",
    g3: "16",
    g4: "10",
    g5: "6",
    pers: "80%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 98,
    g1: "90",
    g2: "8",
    g3: "17",
    g4: "10",
    g5: "7",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 99,
    g1: "90",
    g2: "9",
    g3: "18",
    g4: "10",
    g5: "8",
    pers: "40%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "🤩 Jangan mudah diperdaya, mudah percaya, kesilauan (harta,tahta, wanita/pria), kesesatan yang berujung duka",
  },
  {
    ang: 100,
    g1: "100",
    g2: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 101,
    g1: "100",
    g2: "1",
    g3: "2",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 102,
    g1: "100",
    g2: "2",
    g3: "3",
    pers: "67%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 103,
    g1: "100",
    g2: "3",
    g3: "4",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 104,
    g1: "100",
    g2: "4",
    g3: "5",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 105,
    g1: "100",
    g2: "5",
    g3: "6",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 106,
    g1: "100",
    g2: "6",
    g3: "7",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 107,
    g1: "100",
    g2: "7",
    g3: "8",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 108,
    g1: "100",
    g2: "8",
    g3: "9",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 109,
    g1: "100",
    g2: "9",
    g3: "10",
    g4: "1",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 110,
    g1: "100",
    g2: "10",
    g3: "2",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 111,
    g1: "100",
    g2: "11",
    g3: "1",
    g4: "3",
    g5: "10",
    pers: "80%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 112,
    g1: "100",
    g2: "12",
    g3: "2",
    g4: "4",
    g5: "10",
    pers: "80%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 113,
    g1: "100",
    g2: "13",
    g3: "3",
    g4: "5",
    g5: "10",
    pers: "80%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 114,
    g1: "100",
    g2: "14",
    g3: "4",
    g4: "6",
    g5: "10",
    pers: "80%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 115,
    g1: "100",
    g2: "15",
    g3: "5",
    g4: "7",
    g5: "10",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 116,
    g1: "100",
    g2: "16",
    g3: "6",
    g4: "8",
    g5: "10",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 117,
    g1: "100",
    g2: "17",
    g3: "7",
    g4: "9",
    g5: "10",
    pers: "60%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 118,
    g1: "100",
    g2: "18",
    g3: "8",
    g4: "10",
    g5: "1",
    pers: "80%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 119,
    g1: "100",
    g2: "19",
    g3: "9",
    g4: "11",
    g5: "10",
    g6: "2",
    g7: "1",
    pers: "43%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 120,
    g1: "120",
    g2: "100",
    g3: "20",
    g4: "3",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    desk: "🏝️ Semangat cinta negeri kampung halaman, gemar melakukan kebaikan",
  },
  {
    ang: 121,
    g1: "100",
    g2: "120",
    g3: "21",
    g4: "1",
    g5: "4",
    g6: "20",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 122,
    g1: "100",
    g2: "120",
    g3: "22",
    g4: "2",
    g5: "5",
    g6: "20",
    pers: "50%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 123,
    g1: "100",
    g2: "120",
    g3: "23",
    g4: "3",
    g5: "6",
    g6: "20",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 124,
    g1: "100",
    g2: "120",
    g3: "24",
    g4: "4",
    g5: "7",
    g6: "20",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 125,
    g1: "100",
    g2: "120",
    g3: "25",
    g4: "5",
    g5: "8",
    g6: "20",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 126,
    g1: "100",
    g2: "120",
    g3: "26",
    g4: "6",
    g5: "9",
    g6: "20",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 0,
    ng6: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 127,
    g1: "100",
    g2: "120",
    g3: "27",
    g4: "7",
    g5: "10",
    g6: "20",
    g7: "1",
    pers: "86%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 128,
    g1: "100",
    g2: "120",
    g3: "28",
    g4: "8",
    g5: "11",
    g6: "20",
    g7: "2",
    g8: "10",
    g9: "1",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 0,
    ng6: 0,
    ng7: 0,
    ng8: 1,
    ng9: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 129,
    g1: "100",
    g2: "120",
    g3: "29",
    g4: "9",
    g5: "12",
    g6: "20",
    g7: "3",
    g8: "10",
    g9: "2",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    ng8: 1,
    ng9: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 130,
    g1: "100",
    g2: "30",
    g3: "4",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 131,
    g1: "100",
    g2: "31",
    g3: "1",
    g4: "5",
    g5: "30",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 132,
    g1: "100",
    g2: "32",
    g3: "2",
    g4: "6",
    g5: "30",
    pers: "80%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 133,
    g1: "100",
    g2: "33",
    g3: "3",
    g4: "7",
    g5: "30",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 134,
    g1: "100",
    g2: "34",
    g3: "4",
    g4: "8",
    g5: "30",
    pers: "80%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 135,
    g1: "100",
    g2: "35",
    g3: "5",
    g4: "9",
    g5: "30",
    pers: "80%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 136,
    g1: "100",
    g2: "36",
    g3: "6",
    g4: "10",
    g5: "30",
    g6: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 137,
    g1: "100",
    g2: "37",
    g3: "7",
    g4: "11",
    g5: "30",
    g6: "2",
    g7: "10",
    g8: "1",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    ng8: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 138,
    g1: "100",
    g2: "38",
    g3: "8",
    g4: "12",
    g5: "30",
    g6: "3",
    g7: "10",
    g8: "2",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 139,
    g1: "100",
    g2: "39",
    g3: "9",
    g4: "13",
    g5: "30",
    g6: "4",
    g7: "10",
    g8: "3",
    pers: "63%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 140,
    g1: "100",
    g2: "40",
    g3: "5",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 141,
    g1: "100",
    g2: "41",
    g3: "1",
    g4: "6",
    g5: "40",
    pers: "80%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 142,
    g1: "100",
    g2: "42",
    g3: "2",
    g4: "7",
    g5: "40",
    pers: "60%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 143,
    g1: "100",
    g2: "43",
    g3: "3",
    g4: "8",
    g5: "40",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 144,
    g1: "100",
    g2: "44",
    g3: "4",
    g4: "9",
    g5: "40",
    pers: "80%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 145,
    g1: "100",
    g2: "45",
    g3: "5",
    g4: "10",
    g5: "40",
    g6: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 146,
    g1: "100",
    g2: "46",
    g3: "6",
    g4: "11",
    g5: "40",
    g6: "2",
    g7: "10",
    g8: "1",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    ng8: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 147,
    g1: "100",
    g2: "47",
    g3: "7",
    g4: "12",
    g5: "40",
    g6: "3",
    g7: "10",
    g8: "2",
    pers: "88%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 148,
    g1: "100",
    g2: "48",
    g3: "8",
    g4: "13",
    g5: "40",
    g6: "4",
    g7: "10",
    g8: "3",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 149,
    g1: "100",
    g2: "49",
    g3: "9",
    g4: "14",
    g5: "40",
    g6: "5",
    g7: "10",
    g8: "4",
    pers: "63%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 150,
    g1: "100",
    g2: "50",
    g3: "6",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 151,
    g1: "100",
    g2: "1",
    g3: "7",
    g4: "50",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 152,
    g1: "100",
    g2: "2",
    g3: "8",
    g4: "50",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 153,
    g1: "100",
    g2: "3",
    g3: "9",
    g4: "50",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 154,
    g1: "100",
    g2: "4",
    g3: "10",
    g4: "50",
    g5: "1",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 155,
    g1: "100",
    g2: "5",
    g3: "11",
    g4: "50",
    g5: "2",
    g6: "10",
    g7: "1",
    pers: "71%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 156,
    g1: "100",
    g2: "6",
    g3: "12",
    g4: "50",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "86%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 157,
    g1: "100",
    g2: "7",
    g3: "13",
    g4: "50",
    g5: "4",
    g6: "10",
    g7: "3",
    pers: "86%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 158,
    g1: "100",
    g2: "8",
    g3: "14",
    g4: "50",
    g5: "5",
    g6: "10",
    g7: "4",
    pers: "86%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 159,
    g1: "100",
    g2: "9",
    g3: "15",
    g4: "50",
    g5: "6",
    g6: "10",
    g7: "5",
    pers: "86%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 160,
    g1: "100",
    g2: "60",
    g3: "7",
    pers: "67%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 161,
    g1: "100",
    g2: "1",
    g3: "8",
    g4: "60",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 162,
    g1: "100",
    g2: "2",
    g3: "9",
    g4: "60",
    pers: "25%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 163,
    g1: "100",
    g2: "3",
    g3: "10",
    g4: "60",
    g5: "1",
    pers: "80%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 164,
    g1: "100",
    g2: "4",
    g3: "11",
    g4: "60",
    g5: "2",
    g6: "10",
    g7: "1",
    pers: "57%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 165,
    g1: "100",
    g2: "5",
    g3: "12",
    g4: "60",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "71%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 166,
    g1: "100",
    g2: "6",
    g3: "13",
    g4: "60",
    g5: "4",
    g6: "10",
    g7: "3",
    pers: "71%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 167,
    g1: "100",
    g2: "7",
    g3: "14",
    g4: "60",
    g5: "5",
    g6: "10",
    g7: "4",
    pers: "71%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 168,
    g1: "100",
    g2: "8",
    g3: "15",
    g4: "60",
    g5: "6",
    g6: "10",
    g7: "5",
    pers: "86%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 169,
    g1: "100",
    g2: "9",
    g3: "16",
    g4: "60",
    g5: "7",
    g6: "10",
    g7: "6",
    pers: "71%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 170,
    g1: "100",
    g2: "70",
    g3: "8",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 171,
    g1: "100",
    g2: "1",
    g3: "9",
    g4: "70",
    pers: "75%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 172,
    g1: "100",
    g2: "2",
    g3: "10",
    g4: "70",
    g5: "1",
    pers: "80%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 173,
    g1: "100",
    g2: "3",
    g3: "11",
    g4: "70",
    g5: "2",
    g6: "10",
    g7: "1",
    pers: "71%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 174,
    g1: "100",
    g2: "4",
    g3: "12",
    g4: "70",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "86%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 175,
    g1: "100",
    g2: "75",
    g3: "5",
    g4: "13",
    g5: "70",
    g6: "4",
    g7: "10",
    g8: "3",
    pers: "88%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 176,
    g1: "100",
    g2: "6",
    g3: "14",
    g4: "70",
    g5: "5",
    g6: "10",
    g7: "4",
    pers: "86%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 177,
    g1: "100",
    g2: "77",
    g3: "7",
    g4: "15",
    g5: "70",
    g6: "6",
    g7: "10",
    g8: "5",
    pers: "88%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 178,
    g1: "100",
    g2: "8",
    g3: "16",
    g4: "70",
    g5: "7",
    g6: "10",
    g7: "6",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 179,
    g1: "100",
    g2: "9",
    g3: "17",
    g4: "70",
    g5: "8",
    g6: "10",
    g7: "7",
    pers: "71%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 180,
    g1: "100",
    g2: "80",
    g3: "9",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 181,
    g1: "100",
    g2: "81",
    g3: "1",
    g4: "10",
    g5: "80",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 182,
    g1: "100",
    g2: "2",
    g3: "11",
    g4: "80",
    g5: "10",
    g6: "1",
    pers: "67%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 183,
    g1: "100",
    g2: "3",
    g3: "12",
    g4: "80",
    g5: "10",
    g6: "2",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 184,
    g1: "100",
    g2: "4",
    g3: "13",
    g4: "80",
    g5: "10",
    g6: "3",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 185,
    g1: "100",
    g2: "5",
    g3: "14",
    g4: "80",
    g5: "10",
    g6: "4",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 186,
    g1: "100",
    g2: "6",
    g3: "15",
    g4: "80",
    g5: "10",
    g6: "5",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 187,
    g1: "100",
    g2: "7",
    g3: "16",
    g4: "80",
    g5: "10",
    g6: "6",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 188,
    g1: "100",
    g2: "8",
    g3: "17",
    g4: "80",
    g5: "10",
    g6: "7",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 189,
    g1: "100",
    g2: "9",
    g3: "18",
    g4: "80",
    g5: "10",
    g6: "8",
    pers: "67%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 190,
    g1: "100",
    g2: "90",
    g3: "10",
    g4: "1",
    pers: "75%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 191,
    g1: "100",
    g2: "1",
    g3: "11",
    g4: "90",
    g5: "2",
    g6: "10",
    pers: "50%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 192,
    g1: "100",
    g2: "2",
    g3: "12",
    g4: "90",
    g5: "3",
    g6: "10",
    pers: "67%",
    ng1: 1,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 193,
    g1: "100",
    g2: "3",
    g3: "13",
    g4: "90",
    g5: "4",
    g6: "10",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 194,
    g1: "100",
    g2: "4",
    g3: "14",
    g4: "90",
    g5: "5",
    g6: "10",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 195,
    g1: "100",
    g2: "5",
    g3: "15",
    g4: "90",
    g5: "6",
    g6: "10",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 196,
    g1: "100",
    g2: "6",
    g3: "16",
    g4: "90",
    g5: "7",
    g6: "10",
    pers: "83%",
    ng1: 1,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 197,
    g1: "100",
    g2: "7",
    g3: "17",
    g4: "90",
    g5: "8",
    g6: "10",
    pers: "67%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 198,
    g1: "100",
    g2: "8",
    g3: "18",
    g4: "90",
    g5: "9",
    g6: "10",
    pers: "50%",
    ng1: 1,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 199,
    g1: "100",
    g2: "9",
    g3: "19",
    g4: "90",
    g5: "1",
    g6: "10",
    pers: "50%",
    ng1: 1,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😇 Taatlah agar mendapat keberkahan yang maha Agung",
  },
  {
    ang: 200,
    g1: "200",
    g2: "2",
    pers: "0%",
    ng1: 0,
    ng2: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 201,
    g1: "200",
    g2: "1",
    g3: "3",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 202,
    g1: "200",
    g2: "2",
    g3: "4",
    pers: "33%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 203,
    g1: "200",
    g2: "3",
    g3: "5",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 204,
    g1: "200",
    g2: "4",
    g3: "6",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 205,
    g1: "200",
    g2: "5",
    g3: "7",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 206,
    g1: "200",
    g2: "6",
    g3: "8",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 207,
    g1: "200",
    g2: "7",
    g3: "9",
    pers: "33%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 208,
    g1: "200",
    g2: "8",
    g3: "10",
    g4: "1",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 209,
    g1: "200",
    g2: "9",
    g3: "11",
    g4: "2",
    g5: "10",
    g6: "1",
    pers: "33%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 210,
    g1: "200",
    g2: "10",
    g3: "3",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 211,
    g1: "200",
    g2: "11",
    g3: "1",
    g4: "4",
    g5: "10",
    pers: "60%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 212,
    g1: "200",
    g2: "12",
    g3: "2",
    g4: "5",
    g5: "10",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 213,
    g1: "200",
    g2: "13",
    g3: "3",
    g4: "6",
    g5: "10",
    pers: "60%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 214,
    g1: "200",
    g2: "14",
    g3: "4",
    g4: "7",
    g5: "10",
    pers: "60%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 215,
    g1: "215",
    g2: "200",
    g3: "15",
    g4: "5",
    g5: "8",
    g6: "10",
    pers: "67%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😫 Berhematlah di segala kesempatan, giatlah di waktu muda agar tak menyesal di masa tua. Hindari Potensi mengalami kesengsaraan dan kesusahan hidup",
  },
  {
    ang: 216,
    g1: "200",
    g2: "16",
    g3: "6",
    g4: "9",
    g5: "10",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 217,
    g1: "200",
    g2: "17",
    g3: "7",
    g4: "10",
    g5: "1",
    pers: "60%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 218,
    g1: "200",
    g2: "18",
    g3: "8",
    g4: "11",
    g5: "10",
    g6: "2",
    g7: "1",
    pers: "43%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 219,
    g1: "200",
    g2: "19",
    g3: "9",
    g4: "12",
    g5: "10",
    g6: "3",
    g7: "2",
    pers: "43%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 220,
    g1: "200",
    g2: "20",
    g3: "4",
    pers: "33%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 221,
    g1: "200",
    g2: "21",
    g3: "1",
    g4: "5",
    g5: "20",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 222,
    g1: "200",
    g2: "22",
    g3: "2",
    g4: "6",
    g5: "20",
    pers: "20%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 223,
    g1: "200",
    g2: "23",
    g3: "3",
    g4: "7",
    g5: "20",
    pers: "40%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 224,
    g1: "200",
    g2: "24",
    g3: "4",
    g4: "8",
    g5: "20",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 225,
    g1: "200",
    g2: "25",
    g3: "5",
    g4: "9",
    g5: "20",
    pers: "40%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 226,
    g1: "200",
    g2: "26",
    g3: "6",
    g4: "10",
    g5: "20",
    g6: "1",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 0,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 227,
    g1: "200",
    g2: "27",
    g3: "7",
    g4: "11",
    g5: "20",
    g6: "2",
    g7: "10",
    g8: "1",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 0,
    ng6: 0,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 228,
    g1: "200",
    g2: "28",
    g3: "8",
    g4: "12",
    g5: "20",
    g6: "3",
    g7: "10",
    g8: "2",
    pers: "63%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    ng8: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 229,
    g1: "200",
    g2: "29",
    g3: "9",
    g4: "13",
    g5: "20",
    g6: "4",
    g7: "10",
    g8: "3",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 230,
    g1: "200",
    g2: "30",
    g3: "5",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 231,
    g1: "200",
    g2: "31",
    g3: "1",
    g4: "6",
    g5: "30",
    pers: "80%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 232,
    g1: "200",
    g2: "32",
    g3: "2",
    g4: "7",
    g5: "30",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 233,
    g1: "200",
    g2: "33",
    g3: "3",
    g4: "8",
    g5: "30",
    pers: "80%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 234,
    g1: "200",
    g2: "34",
    g3: "4",
    g4: "9",
    g5: "30",
    pers: "40%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 235,
    g1: "200",
    g2: "35",
    g3: "5",
    g4: "10",
    g5: "30",
    g6: "1",
    pers: "83%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 236,
    g1: "200",
    g2: "36",
    g3: "6",
    g4: "11",
    g5: "30",
    g6: "2",
    g7: "10",
    g8: "1",
    pers: "63%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 237,
    g1: "200",
    g2: "37",
    g3: "7",
    g4: "12",
    g5: "30",
    g6: "3",
    g7: "10",
    g8: "2",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 238,
    g1: "200",
    g2: "38",
    g3: "8",
    g4: "13",
    g5: "30",
    g6: "4",
    g7: "10",
    g8: "3",
    pers: "63%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 239,
    g1: "200",
    g2: "39",
    g3: "9",
    g4: "14",
    g5: "30",
    g6: "5",
    g7: "10",
    g8: "4",
    pers: "50%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 240,
    g1: "200",
    g2: "40",
    g3: "6",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 241,
    g1: "200",
    g2: "41",
    g3: "1",
    g4: "7",
    g5: "40",
    pers: "60%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 242,
    g1: "200",
    g2: "42",
    g3: "2",
    g4: "8",
    g5: "40",
    pers: "40%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 243,
    g1: "200",
    g2: "43",
    g3: "3",
    g4: "9",
    g5: "40",
    pers: "60%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 244,
    g1: "200",
    g2: "44",
    g3: "4",
    g4: "10",
    g5: "40",
    g6: "1",
    pers: "83%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 245,
    g1: "200",
    g2: "45",
    g3: "5",
    g4: "11",
    g5: "40",
    g6: "2",
    g7: "10",
    g8: "1",
    pers: "63%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 246,
    g1: "200",
    g2: "46",
    g3: "6",
    g4: "12",
    g5: "40",
    g6: "3",
    g7: "10",
    g8: "2",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 247,
    g1: "200",
    g2: "47",
    g3: "7",
    g4: "13",
    g5: "40",
    g6: "4",
    g7: "10",
    g8: "3",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 248,
    g1: "200",
    g2: "48",
    g3: "8",
    g4: "14",
    g5: "40",
    g6: "5",
    g7: "10",
    g8: "4",
    pers: "63%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 249,
    g1: "200",
    g2: "49",
    g3: "9",
    g4: "15",
    g5: "40",
    g6: "6",
    g7: "10",
    g8: "5",
    pers: "63%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    ng8: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 250,
    g1: "200",
    g2: "50",
    g3: "7",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 251,
    g1: "200",
    g2: "1",
    g3: "8",
    g4: "50",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 252,
    g1: "200",
    g2: "2",
    g3: "9",
    g4: "50",
    pers: "25%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 253,
    g1: "200",
    g2: "3",
    g3: "10",
    g4: "50",
    g5: "1",
    pers: "80%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 254,
    g1: "200",
    g2: "4",
    g3: "11",
    g4: "50",
    g5: "2",
    g6: "10",
    g7: "1",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 255,
    g1: "200",
    g2: "5",
    g3: "12",
    g4: "50",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 256,
    g1: "200",
    g2: "6",
    g3: "13",
    g4: "50",
    g5: "4",
    g6: "10",
    g7: "3",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 257,
    g1: "200",
    g2: "7",
    g3: "14",
    g4: "50",
    g5: "5",
    g6: "10",
    g7: "4",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 258,
    g1: "200",
    g2: "8",
    g3: "15",
    g4: "50",
    g5: "6",
    g6: "10",
    g7: "5",
    pers: "86%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 259,
    g1: "200",
    g2: "9",
    g3: "16",
    g4: "50",
    g5: "7",
    g6: "10",
    g7: "6",
    pers: "71%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 260,
    g1: "200",
    g2: "60",
    g3: "8",
    pers: "33%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 261,
    g1: "200",
    g2: "1",
    g3: "9",
    g4: "60",
    pers: "25%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 262,
    g1: "200",
    g2: "2",
    g3: "10",
    g4: "60",
    g5: "1",
    pers: "40%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 263,
    g1: "200",
    g2: "3",
    g3: "11",
    g4: "60",
    g5: "2",
    g6: "10",
    g7: "1",
    pers: "43%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 264,
    g1: "200",
    g2: "4",
    g3: "12",
    g4: "60",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 265,
    g1: "200",
    g2: "5",
    g3: "13",
    g4: "60",
    g5: "4",
    g6: "10",
    g7: "3",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 266,
    g1: "200",
    g2: "6",
    g3: "14",
    g4: "60",
    g5: "5",
    g6: "10",
    g7: "4",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 267,
    g1: "200",
    g2: "7",
    g3: "15",
    g4: "60",
    g5: "6",
    g6: "10",
    g7: "5",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 268,
    g1: "200",
    g2: "8",
    g3: "16",
    g4: "60",
    g5: "7",
    g6: "10",
    g7: "6",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 269,
    g1: "200",
    g2: "9",
    g3: "17",
    g4: "60",
    g5: "8",
    g6: "10",
    g7: "7",
    pers: "43%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 270,
    g1: "200",
    g2: "70",
    g3: "9",
    pers: "33%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 271,
    g1: "200",
    g2: "1",
    g3: "10",
    g4: "70",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 272,
    g1: "200",
    g2: "2",
    g3: "11",
    g4: "70",
    g5: "10",
    g6: "1",
    pers: "50%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 273,
    g1: "200",
    g2: "3",
    g3: "12",
    g4: "70",
    g5: "10",
    g6: "2",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 274,
    g1: "200",
    g2: "4",
    g3: "13",
    g4: "70",
    g5: "10",
    g6: "3",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 275,
    g1: "200",
    g2: "75",
    g3: "5",
    g4: "14",
    g5: "70",
    g6: "10",
    g7: "4",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 276,
    g1: "200",
    g2: "6",
    g3: "15",
    g4: "70",
    g5: "10",
    g6: "5",
    pers: "83%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 277,
    g1: "200",
    g2: "77",
    g3: "7",
    g4: "16",
    g5: "70",
    g6: "10",
    g7: "6",
    pers: "71%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 278,
    g1: "200",
    g2: "8",
    g3: "17",
    g4: "70",
    g5: "10",
    g6: "7",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 279,
    g1: "200",
    g2: "9",
    g3: "18",
    g4: "70",
    g5: "10",
    g6: "8",
    pers: "50%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 280,
    g1: "200",
    g2: "80",
    g3: "10",
    g4: "1",
    pers: "75%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 281,
    g1: "200",
    g2: "81",
    g3: "1",
    g4: "11",
    g5: "80",
    g6: "2",
    g7: "10",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 0,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 282,
    g1: "200",
    g2: "2",
    g3: "12",
    g4: "80",
    g5: "3",
    g6: "10",
    pers: "67%",
    ng1: 0,
    ng2: 0,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 283,
    g1: "200",
    g2: "3",
    g3: "13",
    g4: "80",
    g5: "4",
    g6: "10",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 284,
    g1: "200",
    g2: "4",
    g3: "14",
    g4: "80",
    g5: "5",
    g6: "10",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 285,
    g1: "200",
    g2: "5",
    g3: "15",
    g4: "80",
    g5: "6",
    g6: "10",
    pers: "83%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 286,
    g1: "200",
    g2: "6",
    g3: "16",
    g4: "80",
    g5: "7",
    g6: "10",
    pers: "83%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 287,
    g1: "200",
    g2: "7",
    g3: "17",
    g4: "80",
    g5: "8",
    g6: "10",
    pers: "67%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 288,
    g1: "200",
    g2: "8",
    g3: "18",
    g4: "80",
    g5: "9",
    g6: "10",
    pers: "50%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 1,
    ng5: 0,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 289,
    g1: "200",
    g2: "9",
    g3: "19",
    g4: "80",
    g5: "1",
    g6: "10",
    pers: "50%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 1,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 290,
    g1: "200",
    g2: "90",
    g3: "11",
    g4: "2",
    g5: "10",
    g6: "1",
    pers: "33%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 291,
    g1: "200",
    g2: "1",
    g3: "12",
    g4: "90",
    g5: "3",
    g6: "10",
    g7: "2",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 292,
    g1: "200",
    g2: "2",
    g3: "13",
    g4: "90",
    g5: "4",
    g6: "10",
    g7: "3",
    pers: "43%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 293,
    g1: "200",
    g2: "3",
    g3: "14",
    g4: "90",
    g5: "5",
    g6: "10",
    g7: "4",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 294,
    g1: "200",
    g2: "4",
    g3: "15",
    g4: "90",
    g5: "6",
    g6: "10",
    g7: "5",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 295,
    g1: "200",
    g2: "5",
    g3: "16",
    g4: "90",
    g5: "7",
    g6: "10",
    g7: "6",
    pers: "71%",
    ng1: 0,
    ng2: 1,
    ng3: 1,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 296,
    g1: "200",
    g2: "6",
    g3: "17",
    g4: "90",
    g5: "8",
    g6: "10",
    g7: "7",
    pers: "57%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 297,
    g1: "200",
    g2: "7",
    g3: "18",
    g4: "90",
    g5: "9",
    g6: "10",
    g7: "8",
    pers: "43%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 0,
    ng6: 1,
    ng7: 1,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 298,
    g1: "200",
    g2: "8",
    g3: "19",
    g4: "90",
    g5: "1",
    g6: "10",
    g7: "9",
    pers: "43%",
    ng1: 0,
    ng2: 1,
    ng3: 0,
    ng4: 0,
    ng5: 1,
    ng6: 1,
    ng7: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 299,
    g1: "200",
    g2: "9",
    g3: "20",
    g4: "90",
    g5: "2",
    pers: "0%",
    ng1: 0,
    ng2: 0,
    ng3: 0,
    ng4: 0,
    ng5: 0,
    desk: "😮 Hindari Sifat ragu-ragu, bingung dalam menentukan sikap, suka plin-plan. Fokus lah pada tujuan, gunakan waktu sebaik mungkin",
  },
  {
    ang: 300,
    g1: "300",
    g2: "3",
    pers: "100%",
    ng1: 1,
    ng2: 1,
    desk: "👼 Potensi hidup sentausa, kepercayaan dan sifat suka ilmu pengetahuan",
  },
];

// Calculate Grafologi Index
export const calculateGrafologiIndex = (name: string): GrafologiResult => {
  const normalizedName = normalisasiNama(name);
  let sum = 0;

  // Calculate sum of letter values
  for (const char of normalizedName) {
    if (char === " ") continue;
    sum += grafologiValues[char] || 0;
  }

  // Remove thousands if sum > 1390
  if (sum > 1390) {
    sum = sum % 1000;
  }

  // Find matching entry in lookup table
  const entry =
    grafologiTable.find((item) => item.ang === sum) || grafologiTable[0];

  // Collect all G values with their positive/negative status and corresponding DESK values
  const suggestions: Array<{
    value: string;
    isPositive: boolean;
    deskValue: string;
  }> = [];

  // Check for g1-g9 properties and add them if they exist
  for (let i = 1; i <= 9; i++) {
    const gKey = `g${i}` as keyof typeof entry;
    const ngKey = `ng${i}` as keyof typeof entry;

    if (entry[gKey]) {
      const gValue = entry[gKey] as string;
      // Find the corresponding entry in grafologiTable for this G value
      const gValueNum = parseInt(gValue);
      const gEntry =
        grafologiTable.find((item) => item.ang === gValueNum) ||
        grafologiTable[0];

      suggestions.push({
        value: gValue,
        isPositive: (entry[ngKey] as number) === 1,
        deskValue: gEntry.desk,
      });
    }
  }

  return {
    indexValue: entry.ang,
    persValue: entry.pers,
    suggestions,
    desk: entry.desk,
    deskIsPositive:
      entry.desk.startsWith("😎") ||
      entry.desk.startsWith("😇") ||
      entry.desk.startsWith("👮") ||
      entry.desk.startsWith("💑") ||
      entry.desk.startsWith("🤹") ||
      entry.desk.startsWith("😁") ||
      entry.desk.startsWith("⚖️") ||
      entry.desk.startsWith("🙃") ||
      entry.desk.startsWith("🙂") ||
      entry.desk.startsWith("👳") ||
      entry.desk.startsWith("👫"),
  };
};

// Load database file
export const muatFile = (fileContent: string, fileName: string) => {
  try {
    const data = JSON.parse(fileContent) as Array<[string, string]>;

    if (fileName.endsWith(".exp")) {
      allExpDatabases[fileName] = data;
    } else if (fileName.endsWith(".esp")) {
      allEspDatabases[fileName] = data;
    }

    return true;
  } catch (error) {
    console.error(`Error loading file ${fileName}:`, error);
    return false;
  }
};

// Process fixed patterns with EXP database
export const prosesPolaFixDenganDB = (
  polaPengguna: ReturnType<typeof getPola>,
  namaDbExp: string,
): string[] => {
  const dbData = allExpDatabases[namaDbExp] || [];
  const hasilCocokExp: string[] = [];

  // Iterate through user patterns
  Object.entries(polaPengguna).forEach(([kunci, nilai]) => {
    // Skip raw values and complex objects
    if (kunci.startsWith("nilai_mentah_") || typeof nilai === "object") {
      return;
    }

    const nilaiString = String(nilai);

    // Match with database entries
    dbData.forEach((entriDb) => {
      if (nilaiString === entriDb[0]) {
        const hasil = `Pola ${kunci} (${nilaiString}): ${entriDb[1]}`;
        if (!hasilCocokExp.includes(hasil)) {
          hasilCocokExp.push(hasil);
        }
      }
    });
  });

  currentExpResults = hasilCocokExp;
  return hasilCocokExp;
};

// Process combination patterns with ESP databases
export const prosesPolaKombinasiDenganDB = (
  polaPengguna: ReturnType<typeof getPola>,
  namaDbEsp1: string,
  namaDbEsp2: string,
): string[] => {
  const dbData1 = allEspDatabases[namaDbEsp1] || [];
  const dbData2 = allEspDatabases[namaDbEsp2] || [];
  const hasilKombinasiEsp: string[] = [];

  // Iterate through first set of patterns
  Object.entries(polaPengguna).forEach(([kunci1, nilai1]) => {
    // Skip raw values and complex objects
    if (kunci1.startsWith("nilai_mentah_") || typeof nilai1 === "object") {
      return;
    }

    const nilaiString1 = String(nilai1);

    // Match with first database
    dbData1.forEach((entriDb1) => {
      if (nilaiString1 === entriDb1[0]) {
        // Iterate through second set of patterns
        Object.entries(polaPengguna).forEach(([kunci2, nilai2]) => {
          // Skip same key and raw values and complex objects
          if (
            kunci1 === kunci2 ||
            kunci2.startsWith("nilai_mentah_") ||
            typeof nilai2 === "object"
          ) {
            return;
          }

          const nilaiString2 = String(nilai2);

          // Match with second database
          dbData2.forEach((entriDb2) => {
            if (nilaiString2 === entriDb2[0]) {
              const hasil = `Kombinasi: ${kunci1}:${nilaiString1} (${entriDb1[1]}) DAN ${kunci2}:${nilaiString2} (${entriDb2[1]})`;
              if (!hasilKombinasiEsp.includes(hasil)) {
                hasilKombinasiEsp.push(hasil);
              }
            }
          });
        });
      }
    });
  });

  currentCombiResults = hasilKombinasiEsp;
  return hasilKombinasiEsp;
};

// Generate optimal names based on numerology patterns
export const generateOptimalNames = (
  targetPattern: number,
  nameBase: string,
  nameDatabase: string[],
): string[] => {
  const results: string[] = [];
  const normalizedBase = normalisasiNama(nameBase);

  // Filter names from database that match target pattern when combined with base
  nameDatabase.forEach((name) => {
    const normalizedName = normalisasiNama(name);
    const combinedName = `${normalizedBase} ${normalizedName}`;
    const numerologyValue = hitungNilaiNumerologi(combinedName);
    const reducedValue = reduksiAngka(numerologyValue);

    if (reducedValue === targetPattern) {
      results.push(`${normalizedBase} ${normalizedName}`);
    }
  });

  return results.slice(0, 10); // Return top 10 matches
};

// Check compatibility between two people
export const checkCompatibility = (
  name1: string,
  birthdate1: Date,
  name2: string,
  birthdate2: Date,
): {
  compatibilityScore: number;
  compatibilityAreas: Record<string, number>;
  description: string;
} => {
  const pattern1 = getPola(name1, birthdate1);
  const pattern2 = getPola(name2, birthdate2);

  // Calculate compatibility score based on various factors
  const destinyCompatibility =
    10 - Math.abs(pattern1.angka_takdir - pattern2.angka_takdir);
  const characterCompatibility =
    10 - Math.abs(pattern1.angka_karakter - pattern2.angka_karakter);
  const attitudeCompatibility =
    10 - Math.abs(pattern1.angka_sikap - pattern2.angka_sikap);

  const compatibilityAreas = {
    destiny: destinyCompatibility,
    character: characterCompatibility,
    attitude: attitudeCompatibility,
  };

  // Calculate overall compatibility score (0-100)
  const compatibilityScore = Math.round(
    ((destinyCompatibility + characterCompatibility + attitudeCompatibility) /
      30) *
      100,
  );

  // Generate description based on score
  let description = "";
  if (compatibilityScore >= 80) {
    description = "Excellent compatibility! You have a harmonious connection.";
  } else if (compatibilityScore >= 60) {
    description =
      "Good compatibility. You have potential for a strong relationship with some effort.";
  } else if (compatibilityScore >= 40) {
    description =
      "Moderate compatibility. You may face challenges but can overcome them with understanding.";
  } else {
    description =
      "Low compatibility. This relationship may require significant work to harmonize.";
  }

  return {
    compatibilityScore,
    compatibilityAreas,
    description,
  };
};

// Generate lifetime vibration report
export const generateLifetimeReport = (
  name: string,
  birthdate: Date,
  years: number = 100,
): Array<{
  age: number;
  year: number;
  vibration: number;
  description: string;
}> => {
  const pattern = getPola(name, birthdate);
  const birthYear = birthdate.getFullYear();
  const report = [];

  // Generate vibration for each year
  for (let i = 0; i < years; i++) {
    const age = i;
    const year = birthYear + i;

    // Calculate personal year number
    const personalYear = reduksiAngka(
      pattern.angka_ultah + pattern.angka_bulan + reduksiAngka(year),
    );

    // Generate description based on personal year
    let description = "";
    switch (personalYear) {
      case 1:
        description = "A year of new beginnings and opportunities.";
        break;
      case 2:
        description = "A year for partnerships and patience.";
        break;
      case 3:
        description = "A year of creativity and self-expression.";
        break;
      case 4:
        description = "A year of building foundations and hard work.";
        break;
      case 5:
        description = "A year of change and adventure.";
        break;
      case 6:
        description = "A year of responsibility and relationships.";
        break;
      case 7:
        description = "A year of reflection and spiritual growth.";
        break;
      case 8:
        description = "A year of achievement and financial focus.";
        break;
      case 9:
        description = "A year of completion and letting go.";
        break;
      case 11:
        description = "A master year of intuition and spiritual insight.";
        break;
      case 22:
        description = "A master year of building and manifesting great works.";
        break;
      case 33:
        description = "A master year of spiritual teaching and healing.";
        break;
      default:
        description = "A balanced year with mixed energies.";
    }

    report.push({
      age,
      year,
      vibration: personalYear,
      description,
    });
  }

  return report;
};

// Name dictionary databases with meanings
export const nameDictionary: Record<
  string,
  Array<{ name: string; meaning: string }>
> = {
  Indonesian: [
    { name: "Agung", meaning: "Great, magnificent, noble" },
    { name: "Bahagia", meaning: "Happy, joyful, blessed" },
    { name: "Cahaya", meaning: "Light, brightness, illumination" },
    { name: "Damai", meaning: "Peace, tranquil, serene" },
    { name: "Elok", meaning: "Beautiful, elegant, graceful" },
    { name: "Fajar", meaning: "Dawn, morning light, new beginning" },
    { name: "Gemilang", meaning: "Brilliant, shining, glorious" },
    { name: "Harapan", meaning: "Hope, expectation, aspiration" },
    { name: "Indah", meaning: "Beautiful, lovely, pretty" },
    { name: "Jaya", meaning: "Victory, success, triumph" },
    { name: "Kasih", meaning: "Love, affection, compassion" },
    { name: "Luhur", meaning: "Noble, high, elevated" },
    { name: "Mulia", meaning: "Noble, honorable, precious" },
    { name: "Nusantara", meaning: "Archipelago, homeland, nation" },
    { name: "Optimis", meaning: "Optimistic, hopeful, positive" },
    { name: "Permata", meaning: "Gem, jewel, precious stone" },
    { name: "Qalbu", meaning: "Heart, soul, inner self" },
    { name: "Rahmat", meaning: "Blessing, mercy, grace" },
    { name: "Sejahtera", meaning: "Prosperous, peaceful, blessed" },
    { name: "Terang", meaning: "Bright, clear, radiant" },
  ],
  Arabic: [
    { name: "Ahmad", meaning: "Most praised, commendable" },
    { name: "Fatimah", meaning: "Captivating, one who abstains" },
    { name: "Hassan", meaning: "Beautiful, good, handsome" },
    { name: "Khadijah", meaning: "Premature child, trustworthy" },
    { name: "Muhammad", meaning: "Praised, commendable" },
    { name: "Aisha", meaning: "Living, alive, prosperous" },
    { name: "Omar", meaning: "Long-lived, flourishing" },
    { name: "Zainab", meaning: "Fragrant flower, beauty" },
    { name: "Ali", meaning: "High, elevated, noble" },
    { name: "Maryam", meaning: "Beloved, wished for child" },
  ],
  English: [
    { name: "Abacas", meaning: "Device for doing calculations, Clever" },
    { name: "Abacus", meaning: "Device for doing calculations, Clever" },
    { name: "Abakus", meaning: "Device for doing calculations, Clever" },
    { name: "Abba", meaning: "Device for doing calculations, Clever" },
    { name: "Abelard", meaning: "Resolute, Keeper of the abbey larder" },
    { name: "Abelardo", meaning: "Resolute, Keeper of the abbey larder" },
    { name: "Ackerley", meaning: "Meadow of oaks" },
    { name: "Ackley", meaning: "Meadow of oaks" },
    { name: "Acton", meaning: "Town with many oaks" },
    { name: "Ada", meaning: "Wealthy" },
    { name: "Adalbeorht", meaning: "Noble" },
    { name: "Adalbrechta", meaning: "Noble" },
    { name: "Adda", meaning: "Wealthy" },
    { name: "Addisen", meaning: "Adam's son" },
    { name: "Addison", meaning: "Son of Adam" },
    { name: "Adia", meaning: "Wealthy" },
    { name: "Adison", meaning: "Adam's son" },
    { name: "Aeldra", meaning: "Noble" },
    { name: "Aelfraed", meaning: "Elf counselor" },
    { name: "Aelfwine", meaning: "Friend of the elves" },
    { name: "Aerwyna", meaning: "Friend of the sea" },
    { name: "Aethelreda", meaning: "Noble maiden" },
    { name: "Aethelwine", meaning: "Friend of the elves" },
    { name: "Aethelwyne", meaning: "Friend of the elves" },
    { name: "Afreda", meaning: "Elf counselor" },
    { name: "Afton", meaning: "River name" },
    { name: "Aftonio", meaning: "River name" },
    { name: "Aida", meaning: "Wealthy, Helper" },
    { name: "Aidan", meaning: "Help" },
    { name: "Ailen", meaning: "Made of oak" },
    { name: "Aisley", meaning: "From the ash tree grove" },
    { name: "Alana", meaning: "Fair, Beautiful" },
    { name: "Aland", meaning: "Bright as the sun" },
    { name: "Alard", meaning: "Noble, Brave" },
    { name: "Alaric", meaning: "Noble ruler" },
    { name: "Alarice", meaning: "Rules all" },
    { name: "Alberta", meaning: "Noble" },
    { name: "Alberteen", meaning: "Noble" },
    { name: "Albertina", meaning: "Noble" },
    { name: "Albertine", meaning: "Noble" },
    { name: "Albertyna", meaning: "Noble" },
    { name: "Albertyne", meaning: "Noble" },
    { name: "Alcot", meaning: "Old cottage" },
    { name: "Alcott", meaning: "Old cottage" },
    { name: "Aldan", meaning: "Antique, Wise protector, Old friend" },
    { name: "Alden", meaning: "Antique, Wise protector, Old friend" },
    { name: "Alder", meaning: "Birch tree, Revered one" },
    { name: "Aldercy", meaning: "Chief" },
    { name: "Aldis", meaning: "From the old house" },
    { name: "Aldon", meaning: "Antique, Wise protector, Old friend" },
    { name: "Aldora", meaning: "Noble" },
    { name: "Aldred", meaning: "Old king" },
    { name: "Aldren", meaning: "Old king" },
    { name: "Aldrich", meaning: "Old king" },
    { name: "Aldridge", meaning: "Old king" },
    { name: "Aldrych", meaning: "Old king" },
    { name: "Aldus", meaning: "Birch tree, Revered one" },
    { name: "Aldwin", meaning: "Antique, Wise protector, Old friend" },
    { name: "Aldys", meaning: "From the old house" },
    { name: "Aleda", meaning: "Winged" },
    { name: "Aleta", meaning: "Winged" },
    { name: "Alexa", meaning: "Protector of mankind" },
    { name: "Alexandra", meaning: "Protector of mankind" },
    { name: "Alexandrea", meaning: "Protector of mankind" },
    { name: "Alexandria", meaning: "Protector of mankind" },
    { name: "Alexandrina", meaning: "Protector of mankind" },
    { name: "Alexi", meaning: "Protector of mankind" },
    { name: "Alexia", meaning: "Protector of mankind" },
    { name: "Alexina", meaning: "Protector of mankind" },
    { name: "Alexine", meaning: "Protector of mankind" },
    { name: "Alexis", meaning: "Protector of mankind" },
    { name: "Alf", meaning: "Wise counsel" },
    { name: "Alfie", meaning: "Wise counsel" },
    { name: "Alfred", meaning: "Wise counsel" },
    { name: "Alfredo", meaning: "Wise counsel" },
    { name: "Alfric", meaning: "Wise counsel" },
    { name: "Alfrid", meaning: "Wise counsel" },
    { name: "Alfrida", meaning: "Elf counselor" },
    { name: "Alhraed", meaning: "Divine counselor" },
    { name: "Alice", meaning: "Of nobility, Noble" },
    { name: "Alisanne", meaning: "Of nobility, Noble" },
    { name: "Alissa", meaning: "Noble, Truth" },
    { name: "Alisse", meaning: "Noble, Truth" },
    { name: "Alita", meaning: "Winged" },
    { name: "Allard", meaning: "Noble, Brave" },
    { name: "Allaryce", meaning: "Noble ruler" },
    { name: "Allie", meaning: "Wise counsel" },
    { name: "Allison", meaning: "Of nobility, Noble" },
    { name: "Allura", meaning: "Divine counselor" },
    { name: "Allyse", meaning: "Noble, Truth" },
    { name: "Allyson", meaning: "Of nobility, Noble" },
    { name: "Alsatia", meaning: "From Alsace" },
    { name: "Altha", meaning: "Healer" },
    { name: "Altheda", meaning: "Healer" },
    { name: "Althia", meaning: "Healer" },
    { name: "Alton", meaning: "The old town" },
    { name: "Alura", meaning: "Divine counselor" },
    { name: "Alurea", meaning: "Divine counselor" },
    { name: "Alvin", meaning: "Elf wine, Noble friend" },
    { name: "Alvina", meaning: "Friend of the elves" },
    { name: "Alwyn", meaning: "Elf wine, Noble friend" },
    { name: "Alyse", meaning: "Noble, Truth" },
    { name: "Alyson", meaning: "Of nobility, Noble" },
    { name: "Alyssa", meaning: "Noble, Truth" },
    { name: "Alysse", meaning: "Noble, Truth" },
    { name: "Alyssia", meaning: "Noble, Truth" },
    { name: "Alyx", meaning: "Protector of mankind" },
    { name: "Amalia", meaning: "Industrious, Striving" },
    { name: "Amanda", meaning: "Love, Worthy of love, Precious thing" },
    { name: "Amaris", meaning: "Child of the moon" },
    { name: "Amber", meaning: "Brownish-yellow, Precious jewel" },
    { name: "Amberjill", meaning: "Brownish-yellow, Precious jewel" },
    { name: "Amberlee", meaning: "Brownish-yellow, Precious jewel" },
    { name: "Amberly", meaning: "Brownish-yellow, Precious jewel" },
    { name: "Amberlyn", meaning: "Brownish-yellow, Precious jewel" },
    { name: "Amberlynn", meaning: "Brownish-yellow, Precious jewel" },
    { name: "Ambria", meaning: "Brownish-yellow, Precious jewel" },
    { name: "Amelia", meaning: "Industrious, Striving" },
    { name: "Ametta", meaning: "Love" },
    { name: "Amette", meaning: "Love" },
    { name: "Amherst", meaning: "Place name" },
    { name: "Amia", meaning: "Beloved" },
    { name: "Amie", meaning: "Beloved" },
    { name: "Amity", meaning: "Friendship" },
    { name: "Amold", meaning: "Love" },
    { name: "Amorica", meaning: "Ancient name for Britain" },
    { name: "Amsden", meaning: "From the Ambroses valley" },
    { name: "Amy", meaning: "Beloved" },
    { name: "Analyn", meaning: "Favor, Grace" },
    { name: "Analynne", meaning: "Favor, Grace" },
    { name: "Anda", meaning: "Womanly" },
    { name: "Andee", meaning: "Valiant, Courageous" },
    { name: "Andena", meaning: "Valiant, Courageous" },
    { name: "Andi", meaning: "Valiant, Courageous" },
    { name: "Andie", meaning: "Valiant, Courageous" },
    { name: "Andrea", meaning: "Manly, Valiant, Courageous" },
    { name: "Aneisha", meaning: "Favor, Grace" },
    { name: "Anessa", meaning: "Favor, Grace" },
    { name: "Anisha", meaning: "Favor, Grace" },
    { name: "Anissa", meaning: "Favor, Grace" },
    { name: "Anjanette", meaning: "Gift of God's favor" },
    { name: "Anjanique", meaning: "Gift of God's favor" },
    { name: "Anjeanette", meaning: "Gift of God's favor" },
    { name: "Anna", meaning: "Favor, Grace" },
    { name: "Annabeth", meaning: "Lovable, Devoted to God" },
    { name: "Annalee", meaning: "Favor, Grace" },
    { name: "Annalisa", meaning: "Favor, Grace" },
    { name: "Annalynn", meaning: "Favor, Grace" },
    { name: "Annalynne", meaning: "Favor, Grace" },
    { name: "Annamarie", meaning: "Favor, Grace" },
    { name: "Anne", meaning: "God's grace" },
    { name: "Annice", meaning: "Favor, Grace" },
    { name: "Annis", meaning: "Favor, Grace" },
    { name: "Annissa", meaning: "Favor, Grace" },
    { name: "Annjeanette", meaning: "Gift of God's favor" },
    { name: "Anora", meaning: "Light" },
    { name: "Ansel", meaning: "Blessed" },
    { name: "Ansley", meaning: "From the pastureland of the noble" },
    { name: "Anyssa", meaning: "Favor, Grace" },
    { name: "April", meaning: "Opening buds of spring; Born in April" },
    { name: "Aprille", meaning: "The month April, Spring" },
    { name: "Apryl", meaning: "The month April, Spring" },
    { name: "Apryll", meaning: "The month April, Spring" },
    { name: "Aquanetta", meaning: "Blue-green sea color" },
    { name: "Shaw", meaning: "From the shady grove" },
    { name: "Shawn", meaning: "From the shady grove" },
    { name: "Sheffield", meaning: "From the crooked field" },
    { name: "Shel", meaning: "Form of SHELDON. protected hill" },
    { name: "Shelby", meaning: "From the manor house" },
    { name: "Shelden", meaning: "Deep valley" },
    { name: "Sheldon", meaning: "Protected hill" },
    { name: "Shell", meaning: "Clearing on a bank" },
    { name: "Shelley", meaning: "Clearing on a bank" },
    { name: "Shelli", meaning: "Clearing on a bank" },
    { name: "Shelly", meaning: "Clearing on a bank" },
    { name: "Shelton", meaning: "Protected hill" },
    { name: "Shep", meaning: "Shepherd" },
    { name: "Shepard", meaning: "Shepherd" },
    { name: "Shepherd", meaning: "Shepherd" },
    { name: "Shepley", meaning: "Shepherd" },
    { name: "Sheply", meaning: "From the sheep meadow" },
    { name: "Sheppard", meaning: "Shepherd" },
    { name: "Sherborne", meaning: "Wool cutter" },
    { name: "Sherbourn", meaning: "From the clear brook" },
    { name: "Sherbourne", meaning: "From the clear brook" },
    { name: "Sherburne", meaning: "From the clear brook" },
    { name: "Sherey", meaning: "From the country meadow" },
    { name: "Sheridan", meaning: "Bright" },
    { name: "Sherlie", meaning: "From the country meadow" },
    { name: "Sherlock", meaning: "White-haired" },
    { name: "Sherm", meaning: "Wool cutter" },
    { name: "Sherman", meaning: "Wool cutter" },
    { name: "Shermon", meaning: "Wool cutter" },
    { name: "Sherri", meaning: "From the white meadow" },
    { name: "Sherry", meaning: "Beloved, Dear, Darling" },
    { name: "Sherwin", meaning: "Wool cutter" },
    { name: "Sherwood", meaning: "From the bright forest" },
    { name: "Sherwyn", meaning: "Swift" },
    { name: "Shipley", meaning: "From the deep meadow" },
    { name: "Shipton", meaning: "From the deep meadow" },
    { name: "Shir", meaning: "From the country meadow" },
    { name: "Shirl", meaning: "From the country meadow" },
    { name: "Shirlee", meaning: "From the country meadow" },
    { name: "Shirleen", meaning: "From the country meadow" },
    { name: "Shirleigh", meaning: "From the country meadow" },
    { name: "Shirley", meaning: "From the country meadow" },
    { name: "Shurl", meaning: "From the country meadow" },
    { name: "Shurlie", meaning: "From the country meadow" },
    { name: "Sid", meaning: "From St. Denis" },
    { name: "Siddael", meaning: "From the wide valley" },
    { name: "Siddel", meaning: "From the wide valley" },
    { name: "Siddell", meaning: "From the wide valley" },
    { name: "Sidell", meaning: "From the wide valley" },
    { name: "Sidney", meaning: "From St. Denis" },
    { name: "Sidwell", meaning: "From the broad well" },
    { name: "Sigehere", meaning: "Victorious" },
    { name: "Silas", meaning: "Forest, Woods" },
    { name: "Silsby", meaning: "From Sill's farm" },
    { name: "Silvano", meaning: "Trees, Sylvan. See also Sylvester and ." },
    { name: "Silvester", meaning: "Trees, Sylvan" },
    { name: "Simeon", meaning: "One who listens" },
    { name: "Simon", meaning: "One who listens" },
    { name: "Sinclair", meaning: "St. Clair" },
    { name: "Sinclaire", meaning: "St. Clair" },
    { name: "Sinjin", meaning: "St. John" },
    { name: "Sissy", meaning: "Young Female" },
    { name: "Skeat", meaning: "Swift" },
    { name: "Skeet", meaning: "Swift" },
    { name: "Skeeter", meaning: "Swift" },
    { name: "Skeets", meaning: "Swift" },
    { name: "Skelton", meaning: "From the estate on the ledge" },
    { name: "Skete", meaning: "Swift" },
    { name: "Sketes", meaning: "Swift" },
    { name: "Skipper", meaning: "Captain" },
    { name: "Skippere", meaning: "Captain" },
    { name: "Skipton", meaning: "From the sheep estate" },
    { name: "Sky", meaning: "Sky, Sheltering" },
    { name: "Skye", meaning: "Place Name, Sky" },
    { name: "Skyelar", meaning: "Shield, Scholar" },
    { name: "Skyla", meaning: "Sky, Sheltering" },
    { name: "Skylar", meaning: "Shield, Scholar" },
    { name: "Skyler", meaning: "Shield, Scholar" },
    { name: "Skylor", meaning: "Shield, Scholar" },
    { name: "Skyrah", meaning: "Eternal life, Strength, Love, Beauty" },
    { name: "Slade", meaning: "Child of the valley" },
    { name: "Slaed", meaning: "From the valley" },
    { name: "Slaton", meaning: "From the valley farm" },
    { name: "Slayton", meaning: "From the valley farm" },
    { name: "Smedley", meaning: "From the flat meadow" },
    { name: "Smetheleah", meaning: "From the flat meadow" },
    { name: "Smith", meaning: "Blacksmith" },
    { name: "Smits", meaning: "Blacksmith" },
    { name: "Smitty", meaning: "Blacksmith" },
    { name: "Smyth", meaning: "Blacksmith" },
    { name: "Smythe", meaning: "Blacksmith" },
    { name: "Snow", meaning: "From the snow-covered hill" },
    { name: "Snowden", meaning: "From the snow-covered hill" },
    { name: "Snowdun", meaning: "From the snow-covered hill" },
    { name: "Snowy", meaning: "Dim. of SNOW" },
    { name: "Somerset", meaning: "From the summer settlers" },
    { name: "Somerton", meaning: "From the summer estate" },
    { name: "Sonnie", meaning: "Son" },
    { name: "Sonny", meaning: "Son" },
    { name: "Southwell", meaning: "From the south spring" },
    { name: "Spalding", meaning: "From the split meadow" },
    { name: "Spark", meaning: "Gallant" },
    { name: "Sparke", meaning: "Gallant" },
    { name: "Sparrow", meaning: "Bird" },
    { name: "Spaulding", meaning: "Divided field" },
    { name: "Spear", meaning: "Spear" },
    { name: "Sped", meaning: "Success" },
    { name: "Speed", meaning: "Success" },
    { name: "Spelding", meaning: "From the split meadow" },
    { name: "Spence", meaning: "Keeper of provisions" },
    { name: "Spencer", meaning: "Keeper of provisions" },
    { name: "Spenser", meaning: "Keeper of provisions" },
    { name: "Spere", meaning: "Spear" },
    { name: "Spike", meaning: "Long, Heavy nail" },
    { name: "Spring", meaning: "Spring season" },
    { name: "Sproul", meaning: "Active" },
    { name: "Sproule", meaning: "Active" },
    { name: "Sprowle", meaning: "Active" },
    { name: "Squier", meaning: "Shieldbearer" },
    { name: "Squire", meaning: "Shieldbearer" },
    { name: "Stacey", meaning: "Fruitful" },
    { name: "Stacy", meaning: "Fruitful" },
    { name: "Staerling", meaning: "Bird" },
    { name: "Stafford", meaning: "From the landing ford" },
    { name: "Stamford", meaning: "From the stony ford" },
    { name: "Stan", meaning: "Lives by the stony grove" },
    { name: "Stanbeny", meaning: "From the stone fortress" },
    { name: "Stanberry", meaning: "From the rocky meadow" },
    { name: "Stanburh", meaning: "From the stone fortress" },
    { name: "Stanbury", meaning: "From the rocky meadow" },
    { name: "StancIyf", meaning: "From the rocky diff" },
    { name: "Stancliff", meaning: "From the rocky diff" },
    { name: "Standish", meaning: "From the rocky meadow" },
    { name: "Stanedisc", meaning: "From the stony park" },
    { name: "Stanfeld", meaning: "From the stony field" },
    { name: "Stanfield", meaning: "From the rocky meadow" },
    { name: "Stanford", meaning: "From the rocky meadow" },
    { name: "Stanhop", meaning: "From the stony hollow" },
    { name: "Stanhope", meaning: "From the rocky meadow" },
    { name: "Stanleigh", meaning: "From the rocky meadow" },
    { name: "Stanley", meaning: "From the rocky meadow" },
    { name: "Stanly", meaning: "From the rocky meadow" },
    { name: "Stanmore", meaning: "From the rocky meadow" },
    { name: "Stanton", meaning: "From the rocky meadow" },
    { name: "Stantun", meaning: "From the stony farm" },
    { name: "Stanway", meaning: "From the rocky meadow" },
    { name: "Stanweg", meaning: "Lives by the stony road" },
    { name: "Stanwic", meaning: "From the stony village" },
    { name: "Stanwick", meaning: "From the rocky meadow" },
    { name: "Stanwik", meaning: "From the stony village" },
    { name: "Stanwode", meaning: "From the stony forest" },
    { name: "Stanwood", meaning: "From the stony forest" },
    { name: "Stanwyck", meaning: "From the rocky meadow" },
    { name: "Stanwyk", meaning: "From the stony village" },
    { name: "Star", meaning: "Star" },
    { name: "Starbuck", meaning: "Star deer" },
    { name: "Starling", meaning: "Bird" },
    { name: "Starls", meaning: "Star" },
    { name: "Starr", meaning: "Star" },
    { name: "Staunton", meaning: "From the stony farm" },
    { name: "Stearn", meaning: "Serious-minded" },
    { name: "Stearne", meaning: "Serious-minded" },
    { name: "Steathford", meaning: "From the landing ford" },
    { name: "Stedeman", meaning: "Owns a farm" },
    { name: "Stedman", meaning: "Owns a farm" },
    { name: "Steele", meaning: "Hard, Durable" },
    { name: "Stefford", meaning: "Crown" },
    { name: "Stefon", meaning: "Crown" },
    { name: "Stem", meaning: "Austere" },
    { name: "Step", meaning: "Form of STEVEN. crown" },
    { name: "Stephen", meaning: "Crown, Wreath" },
    { name: "Stephenson", meaning: "Crown, Wreath" },
    { name: "Stephon", meaning: "Crown, Wreath" },
    { name: "Sterling", meaning: "Pure, Genuine, Valued" },
    { name: "Sterlyn", meaning: "Pure, Genuine, Valued" },
    { name: "Stern", meaning: "Serious-minded" },
    { name: "Sterne", meaning: "Serious-minded" },
    { name: "Stevan", meaning: "Crown, Wreath" },
    { name: "Steve", meaning: "Crown" },
    { name: "Steven", meaning: "Crown, Wreath" },
    { name: "Stevenson", meaning: "Crown, Wreath" },
    { name: "Stevie", meaning: "Crown" },
    { name: "Stevon", meaning: "Crown, Wreath" },
    { name: "Stevyn", meaning: "Crown, Wreath" },
    { name: "Stew", meaning: "Form of STUART. steward" },
    { name: "Steward", meaning: "Bailiff" },
    { name: "Stewart", meaning: "Bailiff" },
    { name: "Stewert", meaning: "Bailiff" },
    { name: "Stigols", meaning: "Stiles" },
    { name: "Stiles", meaning: "Stiles" },
    { name: "Stilleman", meaning: "Quiet" },
    { name: "Stillman", meaning: "Quiet" },
    { name: "Stillmann", meaning: "Quiet" },
    { name: "Stirling", meaning: "Pure, Genuine, Valued" },
    { name: "Stoc", meaning: "From the tree stump" },
    { name: "Stock", meaning: "From the tree stump" },
    { name: "Stockard", meaning: "Hardy tree" },
    { name: "Stockhard", meaning: "Hardy tree" },
    { name: "Stockhart", meaning: "Hardy tree" },
    { name: "Stockley", meaning: "From the tree stump meadow" },
    { name: "Stockman", meaning: "From the tree stump meadow" },
    { name: "Stockton", meaning: "From the tree stump meadow" },
    { name: "Stockwell", meaning: "From the tree stump spring" },
    { name: "Stocleah", meaning: "From the tree stump meadow" },
    { name: "Stocwiella", meaning: "From the tree stump spring" },
    { name: "Stod", meaning: "Horse" },
    { name: "Stodd", meaning: "Horse" },
    { name: "Stoddard", meaning: "Keeper of the horses, Steward" },
    { name: "Stok", meaning: "From the tree stump" },
    { name: "Stoke", meaning: "From the village" },
    { name: "Stokkard", meaning: "Hardy tree" },
    { name: "Stokley", meaning: "From the tree stump meadow" },
    { name: "Stoner", meaning: "Stone" },
    { name: "Stoney", meaning: "Stone" },
    { name: "Storm", meaning: "Tempest" },
    { name: "Storme", meaning: "Tempest" },
    { name: "Stormie", meaning: "Stormy weather, Tempest" },
    { name: "Stormy", meaning: "Stormy weather, Tempest" },
    { name: "Stowe", meaning: "Place name" },
    { name: "Strang", meaning: "Powerful" },
    { name: "Stratford", meaning: "From the river ford, On the street" },
    { name: "Strod", meaning: "From the thicket" },
    { name: "Strong", meaning: "Powerful" },
    { name: "Stroud", meaning: "From the thicket" },
    { name: "Stroude", meaning: "From the thicket" },
    { name: "Stu", meaning: "Form of STUART. steward" },
    { name: "Stuart", meaning: "Bailiff" },
    { name: "Studs", meaning: "A home" },
    { name: "Sue", meaning: "Lily" },
    { name: "Sueanne", meaning: "Lily" },
    { name: "Suellen", meaning: "Lily" },
    { name: "Suffield", meaning: "From the south field" },
    { name: "Sully", meaning: "From the south meadow" },
    { name: "Suma", meaning: "Born during the summer" },
    { name: "Sumernor", meaning: "Summoner" },
    { name: "Sumerton", meaning: "From the summer estate" },
    { name: "Sumertun", meaning: "From the summer estate" },
    { name: "Summer", meaning: "Born during the summer" },
    { name: "Sumner", meaning: "Summoner" },
    { name: "Sunday", meaning: "Bright disposition, Cheerful" },
    { name: "Sunnee", meaning: "Bright disposition, Cheerful" },
    { name: "Sunnie", meaning: "Bright disposition, Cheerful" },
    { name: "Sunny", meaning: "Bright disposition, Cheerful" },
    { name: "Susie", meaning: "Lily" },
    { name: "Susy", meaning: "Lily" },
    { name: "SutcIyf", meaning: "From the south cliff" },
    { name: "Sutcliff", meaning: "From the south cliff" },
    { name: "Suthclif", meaning: "From the south cliff" },
    { name: "Suthfeld", meaning: "From the south field" },
    { name: "Suthleah", meaning: "From the south meadow" },
    { name: "Suthley", meaning: "From the south meadow" },
    { name: "Suttecliff", meaning: "From the south cliff" },
    { name: "Sutton", meaning: "From the south farm" },
    { name: "Suzanna", meaning: "Lily" },
    { name: "Suzy", meaning: "Lily" },
    { name: "Swain", meaning: "Knight's attendant" },
    { name: "Swaine", meaning: "Knight's attendant" },
    { name: "Swayn", meaning: "Knight's attendant" },
    { name: "Swayne", meaning: "Knight's attendant" },
    { name: "Swayze", meaning: "Knight's attendant" },
    { name: "Swinton", meaning: "From the swine farm" },
    { name: "Swintun", meaning: "From the swine farm" },
    { name: "Syd", meaning: "From the city of St. Denis" },
    { name: "Sydell", meaning: "From the wide valley" },
    { name: "Sydney", meaning: "From the city of St. Denis" },
    { name: "Sylvana", meaning: "Woodland maid" },
    { name: "Sylvanus", meaning: "Forest, Woods" },
    { name: "Sylvester", meaning: "Trees, Sylvan" },
    { name: "Sylvie", meaning: "Woodland maid" },
    { name: "Sylvina", meaning: "Woodland maid" },
    { name: "Sylvonna", meaning: "Woodland maid" },
    { name: "Symington", meaning: "From Simon's estate" },
    { name: "Symon", meaning: "One who listens" },
    { name: "Symontun", meaning: "From Simon's estate" },
    { name: "Tab", meaning: "Drummer" },
    { name: "Tabbert", meaning: "Drummer" },
    { name: "Tabby", meaning: "Drummer" },
    { name: "Taber", meaning: "Drummer" },
    { name: "Tabor", meaning: "Drummer" },
    { name: "Taburer", meaning: "Drummer" },
    { name: "Tacy", meaning: "Silence" },
    { name: "Tad", meaning: "One of Christ's 12 apostles" },
    { name: "Tadd", meaning: "One of Christ's 12 apostles" },
    { name: "Tahurer", meaning: "Drummer" },
    { name: "Tai", meaning: "Enclosed" },
    { name: "Tailor", meaning: "Tailor" },
    { name: "Tain", meaning: "River" },
    { name: "Tait", meaning: "Cheerful" },
    { name: "Taite", meaning: "Cheerful, Brings joy" },
    { name: "Taitum", meaning: "Cheerful, Brings joy" },
    { name: "Tal", meaning: "Tall" },
    { name: "Talbert", meaning: "Tall" },
    { name: "Talbot", meaning: "Tall" },
    { name: "Talbott", meaning: "Tall" },
    { name: "Talford", meaning: "Tall" },
    { name: "Tallon", meaning: "Tall" },
    { name: "Talmadge", meaning: "Tall" },
    { name: "Talon", meaning: "Claw" },
    { name: "Tami", meaning: "Palm tree" },
    { name: "Tammie", meaning: "Palm tree" },
    { name: "Tammy", meaning: "Palm tree" },
    { name: "Tamsin", meaning: "Twin" },
    { name: "Tamtun", meaning: "From the quiet river farm" },
    { name: "Tangerina", meaning: "From Tangiers" },
    { name: "Tangerine", meaning: "From Tangiers" },
    { name: "Tania", meaning: "Princess" },
    { name: "Tanner", meaning: "Leather maker" },
    { name: "Tannere", meaning: "Leather maker" },
    { name: "Tanton", meaning: "From the quiet river farm" },
    { name: "Taralynn", meaning: "A hill where the kings met" },
    { name: "Tarin", meaning: "From the rocky hills, Watchtower" },
    { name: "Tarleton", meaning: "From the thunder estate" },
    { name: "Taron", meaning: "Earthman" },
    { name: "Tarrah", meaning: "From the rocky hills, Watchtower" },
    { name: "Tarrence", meaning: "Roman clan name" },
    { name: "Tarrin", meaning: "Earthman" },
    { name: "Tarynn", meaning: "From the rocky hills, Watchtower" },
    { name: "Tashia", meaning: "Born at Christmas" },
    { name: "Tassa", meaning: "Born at Christmas" },
    { name: "Tat", meaning: "Cheerful, Brings joy" },
    { name: "Tate", meaning: "Cheerful, Brings joy" },
    { name: "Tatum", meaning: "Cheerful, Brings joy" },
    { name: "Taura", meaning: "Born under the sign of Taurus" },
    { name: "Taurina", meaning: "Born under the sign of Taurus" },
    { name: "Taves", meaning: "Great" },
    { name: "Tavia", meaning: "Great" },
    { name: "Tawnie", meaning: "Little one, Yellowish-brown" },
    { name: "Tawny", meaning: "Little one, Yellowish-brown" },
    { name: "Tay", meaning: "Tailor" },
    { name: "Taylan", meaning: "Tailor" },
    { name: "Tayler", meaning: "Tailor" },
    { name: "Taylon", meaning: "Tailor" },
    { name: "Taylor", meaning: "Tailor" },
    { name: "Tayson", meaning: "Tailor" },
    { name: "Tayt", meaning: "Cheerful" },
    { name: "Tayte", meaning: "Cheerful" },
    { name: "Teagan", meaning: "Good looking" },
    { name: "Teal", meaning: "The bird teal, The blue-green color" },
    { name: "Tearle", meaning: "Stem" },
    { name: "Ted", meaning: "Guardian of prosperity, Guardian of the mists" },
    { name: "Tedd", meaning: "Gift of God" },
    { name: "Teddi", meaning: "Gift of God" },
    {
      name: "Teddie",
      meaning: "Guardian of prosperity, Guardian of the mists",
    },
    { name: "Teddy", meaning: "Guardian of prosperity, Guardian of the mists" },
    { name: "Tedman", meaning: "Gift of God" },
    { name: "Tedmond", meaning: "National protector" },
    { name: "Tedmund", meaning: "National protector" },
    { name: "Tedric", meaning: "Gift of God" },
    { name: "Tedrick", meaning: "Gift of God" },
    { name: "Teela", meaning: "The bird teal, The blue-green color" },
    { name: "Tegan", meaning: "Good looking" },
    { name: "Teige", meaning: "Good looking" },
    { name: "Tem", meaning: "County" },
    { name: "Tempeltun", meaning: "From the temple farm" },
    { name: "Tempest", meaning: "Turbulent, Stormy" },
    { name: "Temple", meaning: "Temple-town" },
    { name: "Templeton", meaning: "Temple-town" },
    { name: "Tennessee", meaning: "Son of Dennis" },
    { name: "Tennison", meaning: "Son of Dennis" },
    { name: "Tenny", meaning: "Son of Dennis" },
    { name: "Tennyson", meaning: "Son of Dennis" },
    { name: "Terell", meaning: "Powerful" },
    { name: "Terence", meaning: "Roman clan name" },
    { name: "Teri", meaning: "Saint's name" },
    { name: "Teriana", meaning: "Saint's name" },
    { name: "Teriann", meaning: "Saint's name" },
    { name: "Terika", meaning: "Saint's name" },
    { name: "Terilynn", meaning: "Saint's name" },
    { name: "Terrall", meaning: "Powerful" },
    { name: "Terran", meaning: "Earthman" },
    { name: "Terrance", meaning: "Roman clan name" },
    { name: "Terrel", meaning: "Thunderer" },
    { name: "Terrell", meaning: "Thunder ruler" },
    { name: "Terrelle", meaning: "Powerful" },
    { name: "Terrence", meaning: "Roman clan name" },
    { name: "Terri", meaning: "Saint's name" },
    { name: "Terrie", meaning: "Saint's name" },
    { name: "Terrill", meaning: "Thunder ruler" },
    { name: "Terrin", meaning: "Earthman" },
    { name: "Terris", meaning: "Son of Terrell" },
    { name: "Terron", meaning: "Earthman" },
    { name: "Terry", meaning: "Roman clan name" },
    { name: "Terryn", meaning: "Saint's name" },
    { name: "Terrys", meaning: "Son of Terrell" },
    { name: "Teryn", meaning: "Saint's name" },
    { name: "Teryysone", meaning: "Son of Terrell" },
    { name: "Tess", meaning: "Saint's name" },
    { name: "Tessa", meaning: "Saint's name" },
    { name: "Tessia", meaning: "Saint's name" },
    { name: "Tessie", meaning: "Saint's name" },
    { name: "Tex", meaning: "Nickname for a Texan" },
    { name: "Teyen", meaning: "From the enclosure" },
    { name: "Thacher", meaning: "Roofer" },
    { name: "Thacker", meaning: "Roofer" },
    { name: "Thackere", meaning: "Roofer" },
    { name: "Thaddeus", meaning: "One of Christ's 12 apostles" },
    { name: "Thain", meaning: "Follower" },
    { name: "Thane", meaning: "Follower" },
    { name: "Thatcher", meaning: "Roofer" },
    { name: "Thaw", meaning: "Thaw" },
    { name: "Thawain", meaning: "Thaw" },
    { name: "Thaxter", meaning: "Roofer" },
    { name: "Thayne", meaning: "Follower" },
    { name: "Thearl", meaning: "Stem" },
    { name: "Theomund", meaning: "National protector" },
    { name: "Theyn", meaning: "Follower" },
    { name: "Thistle", meaning: "Thistle" },
    { name: "Thom", meaning: "Twin" },
    { name: "Thomdic", meaning: "From the thorny dike" },
    { name: "Thomkins", meaning: "Little Tom" },
    { name: "Thompson", meaning: "Twin" },
    { name: "Thorald", meaning: "From Thor's meadow" },
    { name: "Thoraldtun", meaning: "From the thunder estate" },
    { name: "Thorbert", meaning: "From Thor's meadow" },
    { name: "Thorburn", meaning: "From Thor's meadow" },
    { name: "Thorley", meaning: "From Thor's meadow" },
    { name: "Thormond", meaning: "From Thor's meadow" },
    { name: "Thormund", meaning: "Thor's protection" },
    { name: "Thorn", meaning: "Town of thorns" },
    { name: "Thorndike", meaning: "From the thorny dike" },
    { name: "Thorndyke", meaning: "Thorn tree" },
    { name: "Thorne", meaning: "Thorn tree" },
    { name: "Thornley", meaning: "Thorn tree" },
    { name: "Thornly", meaning: "From the thorny meadow" },
    { name: "Thornton", meaning: "Thorn tree" },
    { name: "Thorntun", meaning: "From the thorn tree farm" },
    { name: "Thorp", meaning: "From the village" },
    { name: "Thorpe", meaning: "From the village" },
    { name: "Thrythwig", meaning: "Strong warrior" },
    { name: "Thunder", meaning: "Stormy tempered" },
    { name: "Thurber", meaning: "From Thor's meadow" },
    { name: "Thurhloew", meaning: "From Thor's hill" },
    { name: "Thurleah", meaning: "From Thor's meadow" },
    { name: "Thurleigh", meaning: "From Thor's meadow" },
    { name: "Thurlow", meaning: "From Thor's meadow" },
    { name: "Thurman", meaning: "From Thor's meadow" },
    { name: "Thurmon", meaning: "From Thor's meadow" },
    { name: "Thurmond", meaning: "From Thor's meadow" },
    { name: "Thurstan", meaning: "Thor's stone" },
    { name: "Thurston", meaning: "Thor's stone" },
    { name: "Thurstun", meaning: "Thor's stone" },
    { name: "Tiahna", meaning: "Princess" },
    { name: "Tiane", meaning: "Princess" },
    { name: "Tianna", meaning: "Prince" },
    { name: "Tiauna", meaning: "Princess" },
    { name: "Tie", meaning: "Tailor" },
    { name: "Tiegh", meaning: "Enclosed" },
    { name: "Tiesha", meaning: "Joyful" },
    { name: "Tiffanie", meaning: "Appearance of God" },
    { name: "Tiffney", meaning: "Appearance of God" },
    { name: "Tigh", meaning: "Enclosed" },
    { name: "Tighe", meaning: "Enclosed" },
    { name: "Tila", meaning: "Good" },
    { name: "Tiladene", meaning: "From the fertile valley" },
    { name: "Tilden", meaning: "From the fertile valley" },
    { name: "Tilford", meaning: "From the fertile ford" },
    { name: "Tillman", meaning: "Virile" },
    { name: "Tilman", meaning: "Virile" },
    { name: "Tilton", meaning: "From the good estate" },
    { name: "Tim", meaning: "One who honors God" },
    { name: "Timmy", meaning: "One who honors God" },
    { name: "Timon", meaning: "One who honors God" },
    { name: "Timothy", meaning: "One who honors God" },
    { name: "Tina", meaning: "River" },
    { name: "Tine", meaning: "River" },
    { name: "Tionna", meaning: "Princess" },
    { name: "Tip", meaning: "Nickname for THOMAS" },
    { name: "Tirell", meaning: "Thunderer" },
    { name: "Tito", meaning: "Bright, Famous" },
    { name: "Tiwesdaeg", meaning: "Born on Tuesday" },
    { name: "Tobey", meaning: "Goodness of God" },
    { name: "Tobiah", meaning: "Jah is good." },
    { name: "Tobie", meaning: "Goodness of God" },
    { name: "Tobin", meaning: "Goodness of God" },
    { name: "Toby", meaning: "Goodness of God" },
    { name: "Tobyn", meaning: "Goodness of God" },
    { name: "Tod", meaning: "Fox, Clever, Wily" },
    { name: "Todd", meaning: "Fox, Clever, Wily" },
    { name: "Toft", meaning: "From the small farm" },
    { name: "Toland", meaning: "Owns taxed land" },
    { name: "Tolland", meaning: "Owns taxed land" },
    { name: "Tolman", meaning: "Collects taxes" },
    { name: "Tom", meaning: "Twin" },
    { name: "Tomasina", meaning: "Twin" },
    { name: "Tomkin", meaning: "Little Tom" },
    { name: "Tomlin", meaning: "Little Tom" },
    { name: "Tommie", meaning: "Twin" },
    { name: "Tommy", meaning: "Twin" },
    { name: "Tompkin", meaning: "Little Tom" },
    { name: "Toni", meaning: "Beyond praise" },
    { name: "Tonia", meaning: "Beyond praise" },
    { name: "Tonisha", meaning: "Beyond praise" },
    { name: "Tony", meaning: "Highly praiseworthy" },
    { name: "Topper", meaning: "Hill" },
    { name: "Torey", meaning: "From the rocky hills, Watchtower" },
    { name: "Tori", meaning: "Triumphant" },
    { name: "Toriana", meaning: "Triumphant" },
    { name: "Torie", meaning: "Form of VICTORIA. victory" },
    { name: "Torley", meaning: "From Thor's meadow" },
    { name: "Torn", meaning: "From the thom tree" },
    { name: "Torold", meaning: "From Thor's meadow" },
    { name: "Torr", meaning: "Tower" },
    { name: "Torrey", meaning: "From the rocky hills, Watchtower" },
    { name: "Torrie", meaning: "Triumphant" },
    { name: "Torsten", meaning: "Little Tom" },
    { name: "Tory", meaning: "From the rocky hills, Watchtower" },
    { name: "Tosha", meaning: "Born at Christmas" },
    { name: "Tostig", meaning: "Name of an earl" },
    { name: "Toukere", meaning: "Tucker of doth" },
    { name: "Tournour", meaning: "Lather worker" },
    { name: "Towley", meaning: "From the town meadow" },
    { name: "Towne", meaning: "From the end of the town" },
    { name: "Townes", meaning: "From the end of the town" },
    { name: "Townley", meaning: "From the end of the town" },
    { name: "Townly", meaning: "From the town meadow" },
    { name: "Townsend", meaning: "From the end of the town" },
    { name: "Trace", meaning: "From Thracia" },
    { name: "Tracee", meaning: "Path, Roadway" },
    { name: "Traci", meaning: "Path, Roadway" },
    { name: "Tracy", meaning: "From Thracia" },
    { name: "Tramaine", meaning: "From the big town" },
    { name: "Tranter", meaning: "Wagon driver" },
    { name: "Traveon", meaning: "Fair town" },
    { name: "Travion", meaning: "Fair town" },
    { name: "Travis", meaning: "Crossing, Crossroads" },
    { name: "Travon", meaning: "Fair town" },
    { name: "Tray", meaning: "Third born" },
    { name: "Treadway", meaning: "Strong warrior" },
    { name: "Tredway", meaning: "Strong warrior" },
    { name: "Tremain", meaning: "From the big town" },
    { name: "Tremaine", meaning: "From the big town" },
    { name: "Tremayne", meaning: "From the big town" },
    { name: "Trent", meaning: "Dweller by the river Trent" },
    { name: "Trenten", meaning: "Dweller by the river Trent" },
    { name: "Trentin", meaning: "Dweller by the river Trent" },
    { name: "Trenton", meaning: "Dweller by the river Trent" },
    { name: "Treowbrycg", meaning: "From the tree bridge" },
    { name: "Treowe", meaning: "Loyal" },
    { name: "Treoweman", meaning: "Loyal" },
    { name: "Trevan", meaning: "Fair town" },
    { name: "Treven", meaning: "Fair town" },
    { name: "Trevian", meaning: "Fair town" },
    { name: "Trevion", meaning: "Fair town" },
    { name: "Trevls", meaning: "Place name" },
    { name: "Trevon", meaning: "Fair town" },
    { name: "Trevonn", meaning: "Fair town" },
    { name: "Trevyn", meaning: "Fair town" },
    { name: "Trey", meaning: "Third born" },
    { name: "Trip", meaning: "Traveler" },
    { name: "Tripp", meaning: "Traveler" },
    { name: "Tripper", meaning: "Traveler" },
    { name: "Trisa", meaning: "Noble one" },
    { name: "Trish", meaning: "Noble one" },
    { name: "Trisha", meaning: "Noble one" },
    { name: "Trista", meaning: "Outcry" },
    { name: "Tristan", meaning: "Outcry" },
    { name: "Tristen", meaning: "Outcry" },
    { name: "Tristian", meaning: "Outcry" },
    { name: "Tristin", meaning: "Outcry" },
    { name: "Tristina", meaning: "Outcry" },
    { name: "Trixie", meaning: "Cheerful, Brings joy" },
    { name: "Troi", meaning: "The city of Troy" },
    { name: "Trowbrydge", meaning: "From the tree bridge" },
    { name: "Trowhridge", meaning: "From the tree bridge" },
    { name: "Troy", meaning: "The city of Troy" },
    { name: "Troye", meaning: "The city of Troy" },
    { name: "Trudy", meaning: "Beloved" },
    { name: "True", meaning: "Disciple, Loyal" },
    { name: "Trueman", meaning: "Disciple, Loyal" },
    { name: "Truesdale", meaning: "Disciple, Loyal" },
    { name: "Truesdell", meaning: "From the beloved one's farm" },
    { name: "Truitestall", meaning: "From the beloved one's farm" },
    { name: "Trula", meaning: "TRUE" },
    { name: "Truly", meaning: "TRUE" },
    { name: "Truman", meaning: "Disciple, Loyal" },
    { name: "Trumbald", meaning: "Strong, Brave" },
    { name: "Trumble", meaning: "Strong, Brave" },
    { name: "Trumen", meaning: "Disciple, Loyal" },
    { name: "Trumhall", meaning: "Strong, Brave" },
    { name: "Tryp", meaning: "Traveler" },
    { name: "Trypp", meaning: "Traveler" },
    { name: "Tuck", meaning: "Tailor" },
    { name: "Tucker", meaning: "Tailor" },
    { name: "Tuckere", meaning: "Tucker of doth" },
    { name: "Tuckman", meaning: "Tailor" },
    { name: "Tuesday", meaning: "Born on Tuesday" },
    { name: "Tunleah", meaning: "From the town meadow" },
    { name: "Tupper", meaning: "Ram herder" },
    { name: "Tuppere", meaning: "Ram herder" },
    { name: "Turner", meaning: "Carpenter" },
    { name: "Twain", meaning: "Two pieces" },
    { name: "Twein", meaning: "Cut in two" },
    { name: "Twiford", meaning: "From the double river ford" },
    { name: "Twila", meaning: "Form of TWYLA. Thread" },
    { name: "Twitchel", meaning: "Lives on a narrow passage" },
    { name: "Twitchell", meaning: "Lives on a narrow passage" },
    { name: "Twyford", meaning: "From the double river ford" },
    { name: "Twyla", meaning: "Woven" },
    { name: "Tyce", meaning: "Fiery" },
    { name: "Tye", meaning: "Enclosed" },
    { name: "Tyeson", meaning: "Fiery" },
    { name: "Tyesone", meaning: "Son of Tye" },
    { name: "Tyfiell", meaning: "Scandinavian god of battle" },
    { name: "Tyg", meaning: "From the enclosure" },
    { name: "Tyla", meaning: "Good" },
    { name: "Tyler", meaning: "Tiler, Roofer" },
    { name: "Tylere", meaning: "Tiler, Roofer" },
    { name: "Tylor", meaning: "Tiler, Roofer" },
    { name: "Tyna", meaning: "River" },
    { name: "Tynan", meaning: "Enclosed" },
    { name: "Tyne", meaning: "River" },
    { name: "Tyreece", meaning: "Scandinavian god of battle" },
    { name: "Tyrel", meaning: "Scandinavian god of battle" },
    { name: "Tyrell", meaning: "Thunderer" },
    { name: "Tyrelle", meaning: "Scandinavian god of battle" },
    { name: "Tyrus", meaning: "Person from Tyre" },
    { name: "Tyson", meaning: "Son of Tye" },
    { name: "Udale", meaning: "From the yew tree valley" },
    { name: "Udall", meaning: "From the yew tree valley" },
    { name: "Udayle", meaning: "From the yew tree valley" },
    { name: "Udell", meaning: "From the yew tree valley" },
    { name: "Udolf", meaning: "Wolf ruler" },
    { name: "Udolph", meaning: "Wealthy wolf" },
    { name: "Uldwyna", meaning: "Special friend" },
    { name: "Ulfred", meaning: "Wolf of peace" },
    { name: "Ulger", meaning: "Wolf ruler" },
    { name: "Ull", meaning: "Wolf ruler" },
    { name: "Ulla", meaning: "To fill up" },
    { name: "Ullock", meaning: "Wolf sport" },
    { name: "Ullok", meaning: "Wolf sport" },
    { name: "Ulmar", meaning: "Famous wolf" },
    { name: "Ulmarr", meaning: "Famous wolf" },
    { name: "Ulric", meaning: "Wolf ruler" },
    { name: "Ulrica", meaning: "Wolf ruler" },
    { name: "Ulrich", meaning: "Wolf ruler" },
    { name: "Ulrick", meaning: "Wolf ruler" },
    { name: "Ulrika", meaning: "Wolf ruler" },
    { name: "Ulrike", meaning: "Wolf ruler" },
    { name: "Ulu", meaning: "Wolf ruler" },
    { name: "Ulvelaik", meaning: "Wolf sport" },
    { name: "Una", meaning: "One" },
    { name: "Unity", meaning: "Oneness" },
    { name: "Unwin", meaning: "Unfriendly" },
    { name: "Unwine", meaning: "Unfriendly" },
    { name: "Unwyn", meaning: "Unfriendly" },
    { name: "Upchurch", meaning: "From the upper church" },
    { name: "Upshaw", meaning: "From the upper town" },
    { name: "Upton", meaning: "From the upper town" },
    { name: "Uptun", meaning: "From the upper farm" },
    { name: "Upwode", meaning: "From the upper forest" },
    { name: "Upwood", meaning: "From the upper forest" },
    { name: "Usbeorn", meaning: "Divine warrior" },
    { name: "Vail", meaning: "Lives in the valley" },
    { name: "Val", meaning: "Strong" },
    { name: "Vala", meaning: "Chosen" },
    { name: "Vale", meaning: "Lives in the valley" },
    { name: "Valen", meaning: "Strong" },
    { name: "Valentine", meaning: "Strong" },
    { name: "Valerie", meaning: "Strong, Brave" },
    { name: "Valiant", meaning: "Brave" },
    { name: "Vallen", meaning: "Strong" },
    { name: "Vance", meaning: "Dweller at the windmill" },
    { name: "Vannes", meaning: "Grain fans" },
    { name: "Vareck", meaning: "From the fortress" },
    { name: "Varek", meaning: "From the fortress" },
    { name: "Varik", meaning: "From the fortress" },
    { name: "Vayle", meaning: "Lives in the valley" },
    { name: "Velouette", meaning: "Soft" },
    { name: "Velvet", meaning: "Soft" },
    { name: "Verita", meaning: "Verity, Truth" },
    { name: "Verity", meaning: "Verity, Truth" },
    { name: "Vern", meaning: "From the alder grove, Spring-like" },
    { name: "Verne", meaning: "From the alder grove, Spring-like" },
    { name: "Vernon", meaning: "From the alder grove, Spring-like" },
    { name: "Vidal", meaning: "Life" },
    { name: "Videl", meaning: "Life" },
    { name: "Vince", meaning: "Conqueror" },
    { name: "Vincent", meaning: "Conqueror" },
    { name: "Vingon", meaning: "Son of Vinn" },
    { name: "Vinn", meaning: "Conqueror" },
    { name: "Vinnie", meaning: "Conqueror" },
    { name: "Vinson", meaning: "Conqueror" },
    { name: "Vinsone", meaning: "Son of Vinn" },
    { name: "Virgena", meaning: "Chaste, Pure" },
    { name: "Virgil", meaning: "Flourishing" },
    { name: "Virginia", meaning: "Chaste, Pure" },
    { name: "Vivian", meaning: "The Lady of the Lake" },
    { name: "Viviana", meaning: "The Lady of the Lake" },
    { name: "Vivianna", meaning: "The Lady of the Lake" },
    { name: "Vivianne", meaning: "The Lady of the Lake" },
    { name: "Vruyk", meaning: "From the fortress" },
    { name: "Wacfeld", meaning: "From Wake's field" },
    { name: "Wacian", meaning: "Alert" },
    { name: "Wacleah", meaning: "From Wake's meadow" },
    { name: "Wacuman", meaning: "Watchman" },
    { name: "Wada", meaning: "Advancer" },
    { name: "Wadanhyll", meaning: "From the advancer's hill" },
    { name: "Wade", meaning: "A ford" },
    { name: "Wadley", meaning: "A ford" },
    { name: "Wadsworth", meaning: "From Wade's estate" },
    { name: "Waed", meaning: "Advancer" },
    { name: "Waefreleah", meaning: "From the quaking aspen tree meadow" },
    { name: "Waer", meaning: "Wary" },
    { name: "Waerheall", meaning: "From the true man's manor" },
    { name: "Waeringawicum", meaning: "Fortress" },
    { name: "Waescburne", meaning: "From the flooding brook" },
    { name: "Waggoner", meaning: "Wagon maker" },
    { name: "Wahoo", meaning: "Joyful" },
    { name: "Wain", meaning: "Craftsman" },
    { name: "Wainwright", meaning: "Wagon maker" },
    { name: "Wait", meaning: "Guard" },
    { name: "Waite", meaning: "Guard" },
    { name: "Wake", meaning: "Alert" },
    { name: "Wakefield", meaning: "From Wake's field" },
    { name: "Wakeley", meaning: "From Wake's meadow" },
    { name: "Wakeman", meaning: "Watchman" },
    { name: "Wakler", meaning: "Thickener of cloth" },
    { name: "Walbridge", meaning: "From the Welshman's bridge" },
    { name: "Walbrydge", meaning: "From the Welshman's bridge" },
    { name: "Walby", meaning: "From the Welshman's dwellings" },
    { name: "Walcot", meaning: "Old cottage" },
    { name: "Walcott", meaning: "Old cottage" },
    { name: "Walden", meaning: "From the Welshman's valley" },
    { name: "Waldo", meaning: "Divinely powerful" },
    { name: "Waldon", meaning: "From the Welshman's hill" },
    { name: "Waldron", meaning: "From the Welshman's hill" },
    { name: "Waleis", meaning: "From Wales" },
    { name: "Walford", meaning: "From the Welshman's ford" },
    { name: "Walker", meaning: "Cloth worker" },
    { name: "Wallace", meaning: "Welshman" },
    { name: "Wallach", meaning: "Welshman" },
    { name: "Wallas", meaning: "Welshman" },
    { name: "Waller", meaning: "Mason" },
    { name: "Wallie", meaning: "Welshman" },
    { name: "Wallis", meaning: "Welshman" },
    { name: "Wally", meaning: "Welshman" },
    { name: "Walsh", meaning: "Welshman" },
    { name: "Walton", meaning: "Mason" },
    { name: "Walworth", meaning: "From the Welshman's farm, Welsh friend" },
    { name: "Walwyn", meaning: "Welsh friend" },
    { name: "Wanetta", meaning: "Pale" },
    { name: "Wann", meaning: "Pale" },
    { name: "Wanrrick", meaning: "Fortress" },
    { name: "Ward", meaning: "Guardian" },
    { name: "Warde", meaning: "Guardian" },
    { name: "Wardell", meaning: "Guardian" },
    { name: "Warden", meaning: "Guardian" },
    { name: "Wardley", meaning: "Guardian" },
    { name: "Ware", meaning: "Wary" },
    { name: "Wareine", meaning: "Game warden" },
    { name: "Warfield", meaning: "Guardian" },
    { name: "Warford", meaning: "Guardian" },
    { name: "Warin", meaning: "Game warden" },
    { name: "Warleigh", meaning: "From the weir meadow" },
    { name: "Warley", meaning: "Guardian" },
    { name: "Warmond", meaning: "Guardian" },
    { name: "Warner", meaning: "Defender, Guard" },
    { name: "Warren", meaning: "Game warden" },
    { name: "Warrener", meaning: "Game warden" },
    { name: "Warrick", meaning: "Fortress" },
    { name: "Warton", meaning: "Guardian" },
    { name: "Wartun", meaning: "From the farm by the weir" },
    { name: "Warwick", meaning: "Guardian" },
    { name: "Warwyk", meaning: "Fortress" },
    { name: "Wasdsorth", meaning: "A ford" },
    { name: "Washbourne", meaning: "From the flooding brook" },
    { name: "Washburn", meaning: "From the flooding brook" },
    { name: "Washburne", meaning: "From the flooding brook" },
    { name: "Washington", meaning: "From the wise man's estate" },
    { name: "Wat", meaning: "Hurdle" },
    { name: "Watelford", meaning: "From the hurdle ford" },
    { name: "Watford", meaning: "From the hurdle ford" },
    { name: "Watkins", meaning: "Son of Walter" },
    { name: "Watson", meaning: "Son of Walter" },
    { name: "Watt", meaning: "Son of Walter" },
    { name: "Wattekinson", meaning: "Son of Walter" },
    { name: "Wattesone", meaning: "Son of Walter" },
    { name: "Wattikinson", meaning: "Son of Walter" },
    { name: "Wattkins", meaning: "Son of Walter" },
    { name: "Watts", meaning: "Son of Walter" },
    { name: "Wattson", meaning: "Son of Walter" },
    { name: "Waverly", meaning: "From the tree-lined meadow" },
    { name: "Way", meaning: "From the path land" },
    { name: "Wayde", meaning: "Angel from God" },
    { name: "Waydee", meaning: "Angel from God" },
    { name: "Waydell", meaning: "Angel from God" },
    { name: "Waylan", meaning: "Angel from God" },
    { name: "Wayland", meaning: "Angel from God" },
    { name: "Waylin", meaning: "Angel from God" },
    { name: "Waylon", meaning: "Angel from God" },
    { name: "Wayne", meaning: "Wagon maker" },
    { name: "Wayte", meaning: "Guard" },
    { name: "Wealaworth", meaning: "From the Welshman's farm, Welsh friend" },
    { name: "Weallcot", meaning: "Lives in the Welshman's cottage" },
    { name: "Weallere", meaning: "Mason" },
    { name: "Weard", meaning: "Guard" },
    { name: "Weardhyll", meaning: "From the guardian's hill" },
    { name: "Weardleah", meaning: "From the guardian's meadow" },
    { name: "Weatherby", meaning: "From the wether sheep farm" },
    { name: "Weatherly", meaning: "From the wether sheep meadow" },
    { name: "Webb", meaning: "Weaver" },
    { name: "Webbe", meaning: "Weaver" },
    { name: "Webbeleah", meaning: "From the weaver's meadow" },
    { name: "Webbestre", meaning: "Weaver" },
    { name: "Weber", meaning: "Weaver" },
    { name: "Webley", meaning: "Weaver" },
    { name: "Webster", meaning: "Weaver" },
    { name: "Weddell", meaning: "From the advancer's hill" },
    { name: "Wegland", meaning: "From the land by the highway" },
    { name: "Weifield", meaning: "From the field by the weir" },
    { name: "Weiford", meaning: "From the farm by the weir" },
    { name: "Weirley", meaning: "From the weir meadow" },
    { name: "Welborn", meaning: "From the spring brook" },
    { name: "Welborne", meaning: "Lives by the spring" },
    { name: "Welburn", meaning: "From the spring brook" },
    { name: "Welby", meaning: "Lives by the spring" },
    { name: "Welch", meaning: "Welshman" },
    { name: "Welcome", meaning: "Welcome" },
    { name: "Weldon", meaning: "Lives by the spring" },
    { name: "Welford", meaning: "Lives by the spring" },
    { name: "Weller", meaning: "Lives by the spring" },
    { name: "Welles", meaning: "Lives by the spring" },
    { name: "Wellington", meaning: "From the wealthy estate" },
    { name: "Wells", meaning: "Lives by the spring" },
    { name: "Welsh", meaning: "Welshman" },
    { name: "Welsie", meaning: "From the west" },
    { name: "Welss", meaning: "From the west" },
    { name: "Welton", meaning: "Lives by the spring" },
    { name: "Wenda", meaning: "Comely" },
    { name: "Wendale", meaning: "Traveler, Wanderer" },
    { name: "Wendall", meaning: "Traveler, Wanderer" },
    { name: "Wendell", meaning: "Traveler, Wanderer" },
    { name: "Wendi", meaning: "Wanderer" },
    { name: "Wendlesora", meaning: "From Windsor" },
    { name: "Wendy", meaning: "Fair" },
    { name: "Wentworth", meaning: "From the white one's estate" },
    { name: "Weolingtun", meaning: "From the wealthy estate" },
    { name: "Weorth", meaning: "From the farm" },
    { name: "Wes", meaning: "From the west meadow" },
    { name: "Weslee", meaning: "From the west meadow" },
    { name: "Wesley", meaning: "From the west meadow" },
    { name: "Weslia", meaning: "From the west meadow" },
    { name: "Wess", meaning: "From the west meadow" },
    { name: "Wessely", meaning: "From the west meadow" },
    { name: "Wessley", meaning: "From the west meadow" },
    { name: "West", meaning: "From the west" },
    { name: "Westbroc", meaning: "From the west brook" },
    { name: "Westbrook", meaning: "From the west" },
    { name: "Westby", meaning: "From the west" },
    { name: "Westcot", meaning: "From the west cottage" },
    { name: "Westcott", meaning: "From the west" },
    { name: "Westen", meaning: "West town" },
    { name: "Westin", meaning: "West town" },
    { name: "Westleah", meaning: "From the west meadow" },
    { name: "Westleigh", meaning: "From the west" },
    { name: "Westley", meaning: "From the west meadow" },
    { name: "Weston", meaning: "From the west" },
    { name: "Westun", meaning: "From the west" },
    { name: "Wetherby", meaning: "From the wether sheep farm" },
    { name: "Wetherly", meaning: "From the wether sheep meadow" },
    { name: "Wethrby", meaning: "From the wether sheep farm" },
    { name: "Wethrleah", meaning: "From the wether sheep meadow" },
    { name: "Weyland", meaning: "From the land by the highway" },
    { name: "Wharton", meaning: "From the estate at the hollow" },
    { name: "Wheatley", meaning: "From the wheat meadow" },
    { name: "Wheaton", meaning: "Wheat town" },
    { name: "Wheeler", meaning: "Wheel maker" },
    { name: "Whistler", meaning: "Piper" },
    { name: "Whit", meaning: "White" },
    { name: "Whitby", meaning: "White" },
    { name: "Whitcomb", meaning: "White" },
    { name: "White", meaning: "White" },
    { name: "Whitelaw", meaning: "White" },
    { name: "Whitey", meaning: "White" },
    { name: "Whitfield", meaning: "White" },
    { name: "Whitford", meaning: "White" },
    { name: "Whitlaw", meaning: "From the white hill" },
    { name: "Whitley", meaning: "White" },
    { name: "Whitlock", meaning: "White" },
    { name: "Whitman", meaning: "White" },
    { name: "Whitmoor", meaning: "From the white moor" },
    { name: "Whitmore", meaning: "White" },
    { name: "Whitney", meaning: "From the white haired man's estate" },
    { name: "Whittaker", meaning: "White" },
    { name: "Whoopi", meaning: "Joyful" },
    { name: "Whytlok", meaning: "Blond" },
    { name: "Wiatt", meaning: "Guide" },
    { name: "Wiccum", meaning: "From the village meadow" },
    { name: "Wichamm", meaning: "From the village meadow" },
    { name: "Wichell", meaning: "From the bend in the road" },
    { name: "Wickam", meaning: "From the village meadow" },
    { name: "Wickley", meaning: "From the village meadow" },
    { name: "Wicleah", meaning: "From the village meadow" },
    { name: "Wiellaburne", meaning: "From the spring brook" },
    { name: "Wiellaby", meaning: "From the spring farm" },
    { name: "Wielladun", meaning: "From the spring hill" },
    { name: "Wiellaford", meaning: "From the spring by the ford" },
    { name: "Wiellatun", meaning: "From the spring farm" },
    { name: "Wigmaere", meaning: "Famous in battle" },
    { name: "Wigman", meaning: "Warrior" },
    { name: "Wilber", meaning: "Willful, Bright" },
    { name: "Wilbert", meaning: "Willful, Bright" },
    { name: "Wilbur", meaning: "From the strong fortress" },
    { name: "Wilburn", meaning: "Willful, Bright" },
    { name: "Wilburt", meaning: "Willful, Bright" },
    { name: "Wildon", meaning: "From the wooded hill" },
    { name: "Wiley", meaning: "Enchanting" },
    { name: "Wilford", meaning: "From the willow ford, Desires peace" },
    { name: "Wilfred", meaning: "Peace" },
    { name: "Wilfredo", meaning: "Desires peace" },
    { name: "Wilfrid", meaning: "Peace" },
    { name: "Wilfried", meaning: "Peace" },
    { name: "Wilfryd", meaning: "Peace" },
    { name: "Will", meaning: "Resolute protector" },
    { name: "Willa", meaning: "Resolute" },
    { name: "Willaburh", meaning: "From the strong fortress" },
    { name: "Willard", meaning: "Resolute, Brave" },
    { name: "Willesone", meaning: "Son of William" },
    { name: "Willhard", meaning: "Resolute, Brave" },
    { name: "William", meaning: "Resolute protector" },
    { name: "Williams", meaning: "Son of William" },
    { name: "Williamson", meaning: "Son of William" },
    { name: "Willie", meaning: "Resolute protector" },
    { name: "Willis", meaning: "Resolute protector" },
    { name: "Willoughby", meaning: "From the willow farm" },
    { name: "Willow", meaning: "Willow tree" },
    { name: "Willy", meaning: "Resolute protector" },
    { name: "Wilmer", meaning: "Resolute, Famous" },
    { name: "Wilona", meaning: "Desired" },
    { name: "Wilson", meaning: "Son of Will" },
    { name: "Wilton", meaning: "From the farm by the spring" },
    { name: "Win", meaning: "Peaceful friend" },
    { name: "Wincel", meaning: "From the bend in the road" },
    { name: "Winchell", meaning: "From Windsor" },
    { name: "Windell", meaning: "Traveler, Wanderer" },
    { name: "Windgate", meaning: "From the winding gate" },
    { name: "Windham", meaning: "The field with the winding path" },
    { name: "Windsor", meaning: "From Windsor" },
    { name: "Wine", meaning: "Friend" },
    { name: "Winefield", meaning: "From a friend's field" },
    { name: "Winefrith", meaning: "Friend of peace" },
    { name: "Winetorp", meaning: "From Wine's estate" },
    { name: "Winfield", meaning: "From Windsor" },
    { name: "Winfred", meaning: "From Windsor" },
    { name: "Winfrey", meaning: "From Windsor" },
    { name: "Winfrid", meaning: "Friend of peace" },
    { name: "Winfrith", meaning: "Friend of peace" },
    { name: "Wingate", meaning: "From Windsor" },
    { name: "Winifred", meaning: "Peaceful friend" },
    { name: "Winn", meaning: "Peaceful friend" },
    { name: "Winni", meaning: "Peaceful friend" },
    { name: "Winnie", meaning: "Peaceful friend" },
    { name: "Winny", meaning: "Peaceful friend" },
    { name: "Winslow", meaning: "From Windsor" },
    { name: "Winslowe", meaning: "From Windsor" },
    { name: "Winsor", meaning: "From Windsor" },
    { name: "Winston", meaning: "Joy stone, Victory town" },
    { name: "Winswode", meaning: "From Wine's forest" },
    { name: "Wintanweorth", meaning: "From the white one's estate" },
    { name: "Winter", meaning: "Born in the winter" },
    { name: "Winters", meaning: "Born in the winter" },
    { name: "Winthorp", meaning: "From Wine's estate" },
    { name: "Winthrop", meaning: "From Windsor" },
    { name: "Winton", meaning: "From Windsor" },
    { name: "Winward", meaning: "From Windsor" },
    { name: "Winwodem", meaning: "From Wine's forest" },
    { name: "Winwood", meaning: "From Wine's forest" },
    { name: "Wireceaster", meaning: "From the alder forest army camp" },
    { name: "Withypoll", meaning: "Twig head" },
    { name: "Witt", meaning: "Wise" },
    { name: "Witta", meaning: "Wise" },
    { name: "Wittahere", meaning: "Wise wamor" },
    { name: "Wittatun", meaning: "From the wise man's estate" },
    { name: "Witter", meaning: "Wise wamor" },
    { name: "Witton", meaning: "From the wise man's estate" },
    { name: "Wodeleah", meaning: "From the wooded meadow" },
    { name: "Wolcott", meaning: "Lives in Wolfe's cottage" },
    { name: "Wolf", meaning: "Wolf" },
    { name: "Wolfcot", meaning: "Lives in Wolfe's cottage" },
    { name: "Wolfe", meaning: "Wolf" },
    { name: "Wood", meaning: "Form of WOODY. See WOODS" },
    { name: "Woodie", meaning: "Forester, Row of houses by a wood" },
    { name: "Woodley", meaning: "From the wooded meadow" },
    { name: "Woodman", meaning: "Hunter" },
    { name: "Woodrow", meaning: "Forester, Row of houses by a wood" },
    { name: "Woodruff", meaning: "Forester, Row of houses by a wood" },
    { name: "Woods", meaning: "Of the Woods" },
    { name: "Woodward", meaning: "Forester, Row of houses by a wood" },
    { name: "Woody", meaning: "Forester, Row of houses by a wood" },
    { name: "Woolcott", meaning: "Lives in Wolfe's cottage" },
    { name: "Woolsey", meaning: "Victorious wolf" },
    { name: "Worcester", meaning: "From the alder forest army camp" },
    { name: "Worden", meaning: "Defender, Guard" },
    { name: "Wordsworth", meaning: "World guardian" },
    { name: "Worrell", meaning: "From the true man's manor" },
    { name: "Worth", meaning: "From the farm" },
    { name: "Worton", meaning: "From the vegetable farm" },
    { name: "Wray", meaning: "Worthy protector" },
    { name: "Wright", meaning: "Craftsman, Carpenter" },
    { name: "Wryhta", meaning: "Craftsman" },
    { name: "Wudoweard", meaning: "Forester" },
    { name: "Wulf", meaning: "Wolf" },
    { name: "Wulfcot", meaning: "Lives in Wolfe's cottage" },
    { name: "Wulffrith", meaning: "Wolf of peace" },
    { name: "Wulfgar", meaning: "Wolf spear" },
    { name: "Wulfsige", meaning: "Victorious wolf" },
    { name: "Wulfweardsweorth", meaning: "World guardian" },
    { name: "Wyatt", meaning: "Little warrior" },
    { name: "WycIyf", meaning: "From the white cliff" },
    { name: "Wycliff", meaning: "From the white cliff" },
    { name: "Wyeth", meaning: "Little warrior" },
    { name: "WyIfrid", meaning: "Friend of peace" },
    { name: "WyIltun", meaning: "From the farm by the spring" },
    { name: "Wylie", meaning: "Enchanting" },
    { name: "Wyligby", meaning: "From the willow farm" },
    { name: "Wylingford", meaning: "From the willow ford, Desires peace" },
    { name: "Wyman", meaning: "Warrior" },
    { name: "Wymer", meaning: "Famous in battle" },
    { name: "Wyn", meaning: "Peaceful friend" },
    { name: "Wyndam", meaning: "The field with the winding path" },
    { name: "Wyndell", meaning: "Friend" },
    { name: "Wyndham", meaning: "From the windy viIlage" },
    { name: "Wyne", meaning: "Friend" },
    { name: "Wynfield", meaning: "From a friend's field" },
    { name: "Wynfrith", meaning: "Friend of peace" },
    { name: "Wynn", meaning: "Friend" },
    { name: "Wynston", meaning: "From Wine's estate" },
    { name: "Wynter", meaning: "Born in the winter" },
    { name: "Wynthrop", meaning: "From Wine's estate" },
    { name: "Wynton", meaning: "From Windsor" },
    { name: "Wynward", meaning: "From Wine's forest" },
    { name: "Wynwode", meaning: "From Wine's forest" },
    { name: "Wyrttun", meaning: "From the vegetable farm" },
    { name: "Wyth", meaning: "From the willow tree" },
    { name: "Wythe", meaning: "From the willow tree" },
    { name: "Xandra", meaning: "Protector of mankind" },
    { name: "Yael", meaning: "From the slope land" },
    { name: "Yahoo", meaning: "Joyful" },
    { name: "Yale", meaning: "From the slope land" },
    { name: "Yardley", meaning: "From the enclosed meadow" },
    { name: "Yardly", meaning: "From the enclosed meadow" },
    { name: "Yates", meaning: "Gatekeeper" },
    {
      name: "Yeardleigh",
      meaning: "Form of YARDLEY. from the enclosed meadow",
    },
    { name: "Yedda", meaning: "Beautiful voice" },
    { name: "Yeoman", meaning: "Retainer" },
    { name: "Yetta", meaning: "Beautiful voice" },
    { name: "Yippee", meaning: "Joyful" },
    { name: "Yoman", meaning: "Retainer" },
    { name: "Yorick", meaning: "From the farm of yew trees" },
    { name: "York", meaning: "From the farm of yew trees" },
    { name: "Yul", meaning: "Born at Christmas" },
    { name: "Yule", meaning: "Born at Christmas" },
    { name: "Zabrina", meaning: "Legendary princess" },
    { name: "Zach", meaning: "Remembered by God" },
    { name: "Zachary", meaning: "Remembered by God" },
    { name: "Zack", meaning: "Remembered by God" },
    { name: "Zackary", meaning: "Remembered by God" },
    { name: "Zackery", meaning: "Remembered by God" },
    { name: "Zain", meaning: "God is merciful" },
    { name: "Zaine", meaning: "God is merciful" },
    { name: "Zak", meaning: "Remembered by God" },
    { name: "Zakari", meaning: "Remembered by God" },
    { name: "Zakary", meaning: "Remembered by God" },
    { name: "Zander", meaning: "Protector of mankind" },
    { name: "Zandra", meaning: "Protector of mankind" },
    { name: "Zane", meaning: "God is merciful" },
    { name: "Zavrina", meaning: "Legendary princess" },
    { name: "Zayne", meaning: "God is merciful" },
    { name: "Zeke", meaning: "Strength of God" },
    { name: "Zelma", meaning: "Comely" },
    { name: "Zin", meaning: "Flower name" },
    { name: "Zina", meaning: "Flower name" },
    { name: "Zinia", meaning: "Flower name" },
    { name: "Zinnia", meaning: "Flower name" },
    { name: "StAlban", meaning: "From St. Alban" },
    { name: "Styles", meaning: "Stiles" },
  ],
  Japanese: [
    { name: "Akira", meaning: "Bright, clear, intelligent" },
    { name: "Sakura", meaning: "Cherry blossom, spring beauty" },
    { name: "Hiroshi", meaning: "Tolerant, generous" },
    { name: "Yuki", meaning: "Snow, happiness" },
    { name: "Takeshi", meaning: "Warrior, strong" },
    { name: "Hanako", meaning: "Flower child" },
    { name: "Kenji", meaning: "Intelligent second son" },
    { name: "Michiko", meaning: "Beautiful wise child" },
    { name: "Taro", meaning: "First-born male" },
    { name: "Emiko", meaning: "Beautiful blessed child" },
  ],
  Chinese: [
    { name: "Wei", meaning: "Great, powerful" },
    { name: "Li", meaning: "Beautiful, pretty" },
    { name: "Ming", meaning: "Bright, intelligent" },
    { name: "Mei", meaning: "Beautiful, plum" },
    { name: "Jun", meaning: "Handsome, talented" },
    { name: "Xin", meaning: "Heart, mind, new" },
    { name: "Hao", meaning: "Good, excellent" },
    { name: "Ling", meaning: "Spirit, soul, bell" },
    { name: "Feng", meaning: "Wind, style, grace" },
    { name: "Yu", meaning: "Jade, rain, universe" },
  ],
};

// Sample language databases for complex search
export const languageDatabases: Record<string, Record<string, string[]>> = {
  id: {
    Exp1: [
      "Abhimata",
      "Abiwara",
      "Abyaz",
      "Ade",
      "Adianto",
      "Adicandra",
      "Adrianto",
      "Agnibrata",
      "Amin",
      "Anang",
      "Andi",
      "Apit",
      "Aptanta",
      "Ararya",
      "Araya",
      "Ardhani",
      "Ardianto",
      "Ariza",
      "Arkana",
      "Arkarna",
      "Arraya",
      "Astama",
      "Aswangga",
      "Atmaja",
      "Awang",
      "Bagong",
      "Bhadreswara",
      "Bhanu",
      "Bowo",
      "Bratalegawa",
      "Buntaran",
      "Byantara",
      "Choiron",
      "Cokroatmojo",
      "Damar",
      "Damarlangit",
      "Dani",
      "Danirmala",
      "Danurdara",
      "Darma",
      "Dewandaru",
      "Dewanto",
      "Dhana",
      "Dicka",
      "didik",
      "Djoko",
      "Gandara",
      "Gandewa",
      "Ganendra",
      "Ghata",
      "Hantoro",
      "Haris",
      "Harris",
      "Harsanta",
      "Harsaya",
      "Hartono",
      "Harwanto",
      "Hendro",
      "Herjuno",
      "Herwibowo",
      "Hutama",
      "Indra",
      "Ismanto",
      "Jaladri",
      "Janady",
      "Janitra",
      "Janu",
      "Jarot",
      "Jaya",
      "Junaedi",
      "kairupan",
      "Kresno",
      "Kristanto",
      "Kristianto",
      "Lakeswara",
      "Laksamana",
      "Lejar",
      "Leksono",
      "Madhara",
      "Mahaprana",
      "Manah",
      "Mandala",
      "Mardikun",
      "Margana",
      "Mariadi",
      "Mul",
      "Nardi",
      "Nareswara",
      "Naryama",
      "Natajaya",
      "Nurwan",
      "Padantya",
      "Palupy",
      "Pambadi",
      "Pangerep",
      "Partaya",
      "Pradana",
      "Pranama",
      "Prastito",
      "Prastowo",
      "Prawiro",
      "Prayitno",
      "Prayogha",
      "Prayogi",
      "Puguh",
      "Pulung",
      "Purwaka",
      "Rajaswa",
      "Randi",
      "Rhandra",
      "Rinoto",
      "Rudiyanto",
      "Sakuntala",
      "Sambara",
      "Samidi",
      "Sarono",
      "Satio",
      "Sigit",
      "Singgih",
      "Sudarwanto",
      "Sugih",
      "Sugiharto",
      "Sugiono",
      "Suharyono",
      "Sukamto",
      "Sumaji",
      "Suprono",
      "Surendra",
      "Suro",
      "Suryono",
      "Suwarsono",
      "Syurowo",
      "Trisula",
      "Usada",
      "Utungga",
      "Waksa",
      "Wicaksana",
      "Widadoko",
      "Wisaka",
      "Yudho",
      "Ar Raya",
    ],
    Exp2: [
      "Abimata",
      "Abyantara",
      "Adamar",
      "Adarma",
      "Adarma",
      "Adarrma",
      "Adibrata",
      "Adipramanna",
      "Adiwijaya",
      "Adjie",
      "Aji",
      "Aman",
      "Apsara",
      "Apta",
      "Arcana",
      "Ardhana",
      "Argyanto",
      "Arjanta",
      "Arjuna",
      "Arjuna",
      "Arsanta",
      "Asanka",
      "Asmaralaya",
      "Atindriya",
      "Atya",
      "Bandot",
      "Banu",
      "Baswara",
      "Bekti",
      "Bintara",
      "Bismaka",
      "Brahmaputra",
      "Dierja",
      "Djani",
      "Djatmiko",
      "Dwija",
      "Estiawan",
      "Febriantono",
      "Garudho",
      "Genjik",
      "Guntur",
      "Gupita",
      "Gupita",
      "Hanenda",
      "Hardana",
      "Hardiyanta",
      "Harja",
      "Harsa",
      "Harsoyo",
      "Hartanta",
      "Harti",
      "Haryaka",
      "Herdiawan",
      "Huntara",
      "Jaladra",
      "Jatmika",
      "Jiman",
      "Kalbu",
      "Karseno",
      "Kurnia",
      "Lesmana",
      "Luhung",
      "Mahawira",
      "Mahawirra",
      "Mahesa",
      "Mandani",
      "Manggala",
      "Manhwatu",
      "Mugiyono",
      "Mugyono",
      "Muhadir",
      "Mujur",
      "mulwanto",
      "Naresh",
      "Novanto",
      "Pancaka",
      "Pandu",
      "Pedang",
      "Pertama",
      "Pertama",
      "Pinot",
      "Pinto",
      "Pramono",
      "Pranawa",
      "Prasetiyo",
      "Prasetyo",
      "Prayoga",
      "Priyo",
      "Purwanto",
      "Rahardian",
      "Rahardiani",
      "Rambang",
      "Rion",
      "Risman",
      "Rukmantoro",
      "Saputro",
      "Saridin",
      "Semar",
      "Setiawan",
      "Setyadi",
      "setyanto",
      "Siman",
      "Soeharto",
      "Subianto",
      "Sugiarto",
      "Sujiwa",
      "Sukardi",
      "Sunarman",
      "Sunjoyo",
      "Sutardi",
      "Sutianto",
      "Syaron",
      "Ucida",
      "Utama",
      "Utama",
      "Wani",
      "Wani",
      "Wendra",
      "Yagami",
      "Yagami",
      "Yoganta",
      "Yoganta",
      "Yudo",
      "Yumna",
      "BrataKusuma",
    ],
    Exp3: [
      "Abi",
      "Adhiatma",
      "Adhinatha",
      "Adiguna",
      "Admaja",
      "Adriyanta",
      "Adry",
      "Anarghya",
      "Anindityo",
      "Aradhana",
      "Aras",
      "Arbi",
      "Ardana",
      "Arfin",
      "Arja",
      "Arkha",
      "Arsa",
      "Artanta",
      "Aryasatya",
      "Astaguna",
      "Aswin",
      "Awan",
      "Bagas",
      "Bajrayekti",
      "Bari",
      "Baridin",
      "Baruna",
      "Biantara",
      "Bimo",
      "Bramantio",
      "Brijaya",
      "Budiyanto",
      "Cah",
      "Cakera",
      "Caturangga",
      "Dikan",
      "Dirun",
      "Elang",
      "Fusena",
      "Guruh",
      "Hardya",
      "Hariyatno",
      "Harssa",
      "Haryadi",
      "Haryanto",
      "Hastanta",
      "Inderaswanta",
      "Janadi",
      "Jayantaka",
      "Jiwan",
      "Kadaryan",
      "Kamandaka",
      "Kampret",
      "Kasirun",
      "Kathmandu",
      "Kingkin",
      "Kusna",
      "Madaharsa",
      "Mahardika",
      "Mahatma",
      "Mahessa",
      "Manik",
      "Martini",
      "Muni",
      "Muniri",
      "Nugrahayudha",
      "Palupi",
      "Pambudi",
      "Pantes",
      "Prasaja",
      "Pudjo",
      "Purbaya",
      "Purwo",
      "Rahat",
      "Rajiman",
      "Rangga",
      "Raras",
      "Rasiman",
      "Risena",
      "Ryanto",
      "Sajidin",
      "Saronto",
      "Satya",
      "Siswanto",
      "Sobiyanto",
      "Soenggono",
      "Suharto",
      "Sunarno",
      "Supriyasa",
      "Surono",
      "Surya",
      "Suwarno",
      "Tugimin",
      "Tulus",
      "Ulung",
      "utomo",
      "Waskita",
      "Widyanto",
      "Yadi",
      "Yoga",
    ],
    Exp4: [
      "Abiyogga",
      "Adhinata",
      "Adiwilaga",
      "Adya",
      "Anargya",
      "Anggara",
      "Anggarra",
      "Ariyanto",
      "Arka",
      "Arundaya",
      "Aryaputra",
      "Aryastia",
      "Bawe",
      "Bayu",
      "Brahmana",
      "Danu",
      "Dewangkara",
      "Dhinakara",
      "Eko",
      "Endrasuta",
      "Hadinata",
      "Handaru",
      "Handayanto",
      "Hardi",
      "Hardinata",
      "Hariyo",
      "Harjita",
      "Hartoni",
      "Haryo",
      "Hastungkara",
      "Hendi",
      "Inderatma",
      "Jantaka",
      "Jati",
      "Juniarka",
      "Kanda",
      "Kartiko",
      "Kartono",
      "Kasidin",
      "Kastawa",
      "Kunta",
      "Kuwat",
      "Lasto",
      "Losta",
      "Mainaki",
      "muliady",
      "mulyadi",
      "Mulyanto",
      "Nabda",
      "Pamungkas",
      "Pangestu",
      "Prasetyono",
      "Prasojo",
      "Puboyo",
      "Purboyo",
      "Purnomo",
      "Purwana",
      "Resmawan",
      "Sadana",
      "Saki",
      "Sampurna",
      "Saroni",
      "setianto",
      "sholeh",
      "Soeparno",
      "Sriyanto",
      "Sucipto",
      "Suharsono",
      "Sukaryono",
      "Sumainto",
      "Sumardi",
      "Sumianto",
      "Suparman",
      "suparyawan",
      "Suristiyono",
      "tedja",
      "Trimans",
      "Wajendra",
      "Widagda",
      "Widura",
      "Winasis",
      "Wirya",
      "Yan",
    ],
    Exp5: [
      "Abbi",
      "Abiandra",
      "Abimana",
      "Abimanyu",
      "Adanu",
      "Addicandra",
      "Adi",
      "Adinata",
      "Adri",
      "Agraprana",
      "Agung",
      "Ahad",
      "Aksa",
      "Among",
      "Andaka",
      "Andang",
      "Andaru",
      "Angnyana",
      "Anjana",
      "Ardi",
      "Argani",
      "Argo",
      "Arju",
      "aryo",
      "Asmuni",
      "Astamurti",
      "Bagus",
      "Bajra",
      "Bejo",
      "Bondan",
      "Bramantya",
      "Bratadikara",
      "budianto",
      "Candra",
      "Cayapata",
      "Chahyadi",
      "Chaironi",
      "Cokroaminoto",
      "Dikun",
      "Eri",
      "Gadhing",
      "Gilang",
      "Giyarto",
      "Gumelar",
      "Hariatno",
      "Hartawan",
      "Herdian",
      "Herman",
      "Jatmo",
      "Jayadi",
      "Junaidi",
      "Juwanto",
      "Kantata",
      "Karno",
      "Kasiman",
      "Kasman",
      "Katmanto",
      "Kencono",
      "Laksana",
      "Lasmadi",
      "Lasmanto",
      "Leksanna",
      "Lingga",
      "Lintang",
      "Liswanto",
      "Madhani",
      "Madyana",
      "Manggalla",
      "Nangkulo",
      "ngadio",
      "Numatya",
      "Padmana",
      "Panji",
      "Parwa",
      "Perdana",
      "Permana",
      "Perwiro",
      "Pradhika",
      "Pramatya",
      "Prayitna",
      "Rajasa",
      "Rambet",
      "Ranjana",
      "Riansyah",
      "Rukimin",
      "Sabar",
      "Sadya",
      "Salimin",
      "Sardono",
      "Saridun",
      "Saryoto",
      "Satria",
      "Soleh",
      "solihin",
      "Supriyanto",
      "Suryawan",
      "Susilo",
      "Tasiman",
      "Tejo",
      "Tjokroaminoto",
      "Warih",
      "Wibawa",
      "Widianto",
      "Widoko",
      "Wihrasto",
      "Wijok",
      "Wijono",
      "Wir",
      "Wiratama",
      "Wisnu",
      "Yudha",
      "Yukti",
      "Gandakusuma",
    ],
    Exp6: [
      "Abisatya",
      "Abisatya",
      "Abiyoga",
      "Adijaya",
      "Adipramana",
      "Aditya",
      "Adji",
      "Adnyana",
      "Akssa",
      "Ande",
      "Anidoko",
      "Ankawijaya",
      "Argana",
      "Ariwibawa",
      "Arkano",
      "Awanta",
      "Barep",
      "Bawana",
      "Bayuadjie",
      "Bayuaji",
      "Bhagaskara",
      "Bhagawanta",
      "Brata",
      "Bryatta",
      "Btara",
      "Budiyono",
      "Buntoro",
      "Buntoro",
      "Byakta",
      "Cahyadi",
      "Chayadi",
      "Chayadi",
      "Danuja",
      "darojati",
      "Dermawanto",
      "Dewa",
      "Dewantara",
      "Dhika",
      "Dhika",
      "Digdaya",
      "Endra",
      "Enrda",
      "Galieh",
      "Gentala",
      "Giharto",
      "Girto",
      "Gito",
      "Halabi",
      "Hardiyata",
      "Hardyata",
      "Hariyono",
      "Harjuno",
      "Haryatma",
      "Haryono",
      "Hastu",
      "Himawan",
      "Ikang",
      "Indera",
      "Indro",
      "Joko",
      "Kali",
      "Karyadi",
      "Karyanto",
      "kurniadi",
      "Kusmanto",
      "Laksono",
      "Mahapraja",
      "Majaya",
      "Mannah",
      "Manut",
      "Mas",
      "Mulyana",
      "Nawang",
      "Nehan",
      "Pancawara",
      "Patut",
      "Prono",
      "Purboyoningrat",
      "putu",
      "Raden",
      "Raditya",
      "Rama",
      "Rian",
      "Sahardaya",
      "Sahasika",
      "Sakti",
      "Samingan",
      "Sampara",
      "Saputra",
      "Septha",
      "Soetandi",
      "Subekti",
      "sukimin",
      "Sukmadi",
      "Suradiyono",
      "Suwendar",
      "Suyatman",
      "Tarmono",
      "tjahyadi",
      "Turman",
      "Tursimin",
      "Wakijan",
      "Wakijan",
      "Warsito",
      "Wibisana",
      "Wibisana",
      "Wibowo",
      "Wiji",
      "Wisarga",
      "Wisaya",
      "Wiyasa",
      "Yuda",
      "Yuda",
    ],
    Exp7: [
      "Abang",
      "Abhicandra",
      "Abimantra",
      "Abyakta",
      "Adiharja",
      "Adiwangsa",
      "Anantara",
      "Andakka",
      "Andani",
      "Anggasta",
      "Anom",
      "Ardiaman",
      "Argya",
      "Aryadika",
      "Aryaguna",
      "Aryasuta",
      "Asadha",
      "Astaseni",
      "Aswanta",
      "Bagaskara",
      "Bagaskara",
      "Bagaskara",
      "Bagio",
      "Bagio",
      "Bakti",
      "Balen",
      "Balindra",
      "Barata",
      "Batara",
      "Bhadra",
      "Bicaksana",
      "Bicaksana",
      "Bima",
      "Bimantara",
      "Brahma",
      "Bratajaya",
      "cahyo",
      "Cakra",
      "Catra",
      "Damario",
      "Damario",
      "Deawa",
      "Dhananjaya",
      "Dika",
      "Diwangka",
      "Diwangka",
      "Dodik",
      "Dumadi",
      "Euko",
      "Euko",
      "Gadang",
      "Gandhi",
      "Gareng",
      "Gastiadi",
      "Giri",
      "Handayono",
      "Hardiyanto",
      "Haritala",
      "Harjo",
      "Hartadi",
      "Hartanto",
      "Hary",
      "Haryanta",
      "Hatala",
      "Heriyanto",
      "Hernawa",
      "Heru",
      "Heryanto",
      "Idhang",
      "Ijo",
      "Indradewa",
      "Janied",
      "Jatiady",
      "Jatmiko",
      "Jatmiko",
      "Judhi",
      "Kardi",
      "Katon",
      "Katon",
      "Kawidagda",
      "Kuswanto",
      "Lasmana",
      "Madana",
      "Mahadana",
      "Mandara",
      "Manikmaya",
      "Mardy",
      "Mardy",
      "Menggolo",
      "mulyono",
      "Nugraha",
      "Padang",
      "Padmasana",
      "Palastra",
      "Panita",
      "Parto",
      "Penengah",
      "Penengah",
      "Pratama",
      "Prayogo",
      "Priatna",
      "Puntodewo",
      "Purwa",
      "Rakabuming",
      "Rakryan",
      "Ranggawuni",
      "Ranggawuni",
      "Respati",
      "Samido",
      "Setya",
      "Setyohadi",
      "Somad",
      "Sugiyana",
      "Suharta",
      "Suharyanto",
      "Suharyanto",
      "Suprianto",
      "Suryanto",
      "Teguh",
      "Trie",
      "Tuhu",
      "Tukimin",
      "Ugo",
      "Wahyaka",
      "Wahyaka",
      "Wara",
      "Wara",
      "Wardani",
      "Wardani",
      "Wardhana",
      "Wardhana",
      "Widodo",
      "Yodya",
      "Yogamaya",
      "Yudhoyono",
      "Yuwa",
    ],
    Exp8: [
      "Adika",
      "Adyasta",
      "Agnybrata",
      "Anggaraksa",
      "Anggeria",
      "Aptana",
      "Ardiona",
      "Ardiyanto",
      "Ardiyanto",
      "Ariyanta",
      "Arjani",
      "Arjna",
      "Artanto",
      "Artanto",
      "Asanggata",
      "Aswandi",
      "Atma",
      "Awara",
      "Bada",
      "Badra",
      "Bagaskoro",
      "Bahuwarna",
      "Bamantara",
      "Barin",
      "Barin",
      "Baroto",
      "Baskara",
      "Bayuputra",
      "Bisma",
      "Brama",
      "Budhi",
      "Budiono",
      "Budiono",
      "Buwana",
      "Cakara",
      "Cakara",
      "Cakrawala",
      "Citrapata",
      "Dananjaya",
      "Daru",
      "Dewangga",
      "Dimaz",
      "Diwangkara",
      "Djumanto",
      "Eriati",
      "Eriati",
      "Fazaira",
      "Gandi",
      "Garde",
      "Gembel",
      "Gentamas",
      "Guinandra",
      "Hadyan",
      "Hadyan",
      "Hamengku",
      "Hantari",
      "Harto",
      "Harya",
      "Hermanta",
      "Hestamma",
      "Hestamma",
      "Hestamma",
      "Icuk",
      "Ireng",
      "Ismawan",
      "ismawan",
      "Ismoyono",
      "Ismoyono",
      "Jana",
      "Janggala",
      "Jawra",
      "Joniadi",
      "Joniadi",
      "Judha",
      "Jumanta",
      "Juniarso",
      "Kalandra",
      "Karyana",
      "Kawi",
      "Kayrana",
      "Kumbayana",
      "Kusno",
      "Kuswan",
      "Laksmada",
      "Luhur",
      "Luruh",
      "madya",
      "Maheswara",
      "Mandrakanta",
      "Mardhi",
      "Maryadi",
      "Mudjianto",
      "mudjianto",
      "Muji",
      "Mulyanta",
      "Murjimin",
      "Nafiadi",
      "Nataya",
      "Ngadimin",
      "Nyoto",
      "Padma",
      "Paimin",
      "Panca",
      "Pandi",
      "Parwaka",
      "Perkasa",
      "Pranadipa",
      "Pranadipa",
      "Pratomo",
      "Pujo",
      "Rahagi",
      "Raharjo",
      "Randy",
      "Raykarian",
      "Riono",
      "Riyen",
      "Rrkina",
      "Rrkina",
      "Sadino",
      "Sapto",
      "Soekarno",
      "Sugiyono",
      "Sujarwo",
      "Sukirno",
      "Sumedi",
      "Sungkono",
      "Supriyono",
      "Tohpati",
      "Utangga",
      "Utangga",
      "Wardana",
      "Wardana",
      "Waskito",
      "Widiartanto",
      "Wiguno",
      "Wijaksana",
      "Windu",
      "Wirawan",
      "Yudoyono",
      "Yudoyono",
    ],
    Exp9: [
      "Abimara",
      "Abimmanyu",
      "Adichandra",
      "Adichandra",
      "Andhanu",
      "Andiko",
      "Andriya",
      "Angasta",
      "Arga",
      "Argatsani",
      "Arkananta",
      "Arnawarma",
      "Arya",
      "Arzaquna",
      "Aswanda",
      "Atmajaya",
      "Auditya",
      "Bahlata",
      "Bahuwirya",
      "Bandan",
      "Bandul",
      "Banyu",
      "Baskoro",
      "Basuki",
      "Bawa",
      "Bhadrika",
      "Birawa",
      "Brana",
      "Brawijaya",
      "Budi",
      "Buwono",
      "Byaratma",
      "Cakrawangsa",
      "Catur",
      "Cipto",
      "Dadi",
      "Daniswara",
      "Dewata",
      "Dewonggo",
      "Dhani",
      "Dhanurendra",
      "Dianto",
      "Diyana",
      "Dwi",
      "Edi",
      "Edi",
      "Endaru",
      "Fajar",
      "Gatot",
      "Giandra",
      "Giras",
      "Goentoer",
      "Gumilar",
      "Gumilar",
      "Gunawan",
      "Hari",
      "Haribawa",
      "Harimurti",
      "Harjono",
      "Hartana",
      "Hartohusodo",
      "Hastama",
      "Hattala",
      "Husada",
      "Indraya",
      "Jaladhi",
      "Jalmantra",
      "Jatiadi",
      "Jono",
      "Jumantara",
      "Kamajaya",
      "Kawindra",
      "Kayun",
      "Kukuh",
      "Kusumanto",
      "Kusyanto",
      "Lagawa",
      "Laksmana",
      "Langit",
      "Layana",
      "Leksana",
      "Listu",
      "Mahadi",
      "Mahadri",
      "Mahaeswara",
      "Makayasa",
      "Mandaka",
      "Mardi",
      "Mulya",
      "Mulya",
      "Nata",
      "Nayotama",
      "Padan",
      "Paiman",
      "Pandia",
      "Pandji",
      "Panut",
      "Para",
      "Parikesit",
      "Prabowo",
      "Pradhana",
      "Pradhana",
      "Prakosa",
      "Pramudya",
      "Pras",
      "Pratowo",
      "Pritaya",
      "Rangin",
      "Reksa",
      "ruswi",
      "Sadjiwo",
      "Sahya",
      "saptomo",
      "Setyawan",
      "Suardi",
      "Subarkah",
      "Suprana",
      "Suranto",
      "Suroto",
      "Suryana",
      "Suryopati",
      "Sutejo",
      "Sutrisno",
      "Takim",
      "Tukino",
      "Upasama",
      "Upasama",
      "Widako",
      "Wishaka",
      "Wishaka",
      "Yoda",
      "Yoni",
      "Yuga",
      "Yulianto",
    ],
  },
  en: {
    Exp1: [
      "Abakus",
      "Adda",
      "Aethelwyne",
      "Alberteen",
      "Albertina",
      "Aldon",
      "Aldrich",
      "Alf",
      "Alfred",
      "Allison",
      "Amalia",
      "Amberjill",
      "Amette",
      "Amie",
      "Andi",
      "Annalynne",
      "Annice",
      "Annjeanette",
      "Aprille",
      "Aquanetta",
      "Sherlock",
      "Sissy",
      "Sky",
      "Sky",
      "Skyelar",
      "Skylor",
      "Skyrah",
      "Spalding",
      "Spalding",
      "Stacey",
      "Stanbeny",
      "Stanly",
      "Stantun",
      "Stanwick",
      "Starling",
      "Stearne",
      "Stillman",
      "Stockard",
      "Stockard",
      "Stoner",
      "Stowe",
      "Suffield",
      "Sunnie",
      "Susie",
      "Sutton",
      "Sutton",
      "Suzy",
      "Swayn",
      "Sylvester",
      "Symington",
      "Taber",
      "Tahurer",
      "Taite",
      "Tate",
      "Tate",
      "Tate",
      "Tay",
      "Tay",
      "Taylan",
      "Taylor",
      "Taylor",
      "Taylor",
      "Teige",
      "Terika",
      "Terika",
      "Terryn",
      "Teryn",
      "Tessa",
      "Tessia",
      "Thaddeus",
      "Thayne",
      "Thearl",
      "Theomund",
      "Thomkins",
      "Thorpe",
      "Thurmon",
      "Tilden",
      "Tionna",
      "Tito",
      "Tobiah",
      "Tomkin",
      "Towley",
      "Townly",
      "Tray",
      "Trentin",
      "Treowbrycg",
      "Tristin",
      "Trowhridge",
      "True",
      "Trumbald",
      "Trumble",
      "Trumen",
      "Tuck",
      "Twitchel",
      "Tyne",
      "Tyne",
      "Tyne",
      "Uldwyna",
      "Ulla",
      "Ulrica",
      "Verne",
      "Vinnie",
      "Wadanhyll",
      "Wakeley",
      "Waldo",
      "Wally",
      "Ward",
      "Ward",
      "Warton",
      "Wasdsorth",
      "Watt",
      "Waydell",
      "Weallcot",
      "Webbe",
      "Weifield",
      "Weldon",
      "Welsie",
      "Wendale",
      "Wendi",
      "Westley",
      "Wethrleah",
      "Wiatt",
      "Williamson",
      "Win",
      "Win",
      "Winfield",
      "Winfrey",
      "Witta",
      "Wittahere",
      "Wodeleah",
      "Woody",
      "Woody",
      "Wordsworth",
      "Wulfcot",
      "WycIyf",
      "Wynwode",
      "Yahoo",
      "Yeoman",
      "Zachary",
      "Zaine",
      "Zakary",
      "Zandra",
      "Zane",
      "Zavrina",
      "Zinnia",
      "Styles",
    ],
    Exp2: [
      "Abacus",
      "Addisen",
      "Afton",
      "Aidan",
      "Alana",
      "Alisse",
      "Allura",
      "Allyse",
      "Amsden",
      "Anda",
      "Andee",
      "Anjanique",
      "Annabeth",
      "April",
      "Shawn",
      "Sheffield",
      "Shell",
      "Shelli",
      "Shepherd",
      "Sherburne",
      "Shermon",
      "Shipton",
      "Shurlie",
      "Siddell",
      "Silvano",
      "Skeat",
      "Skeeter",
      "Smedley",
      "Snowdun",
      "Somerton",
      "Spark",
      "Sparrow",
      "Spring",
      "Sproul",
      "Stanwode",
      "Stewert",
      "Stigols",
      "Stockley",
      "Stocleah",
      "Stocwiella",
      "Stok",
      "Stormy",
      "Studs",
      "Suthley",
      "Sydney",
      "Sylvie",
      "Tabor",
      "Tadd",
      "Tallon",
      "Tarynn",
      "Tawny",
      "Teal",
      "Ted",
      "Teddie",
      "Tegan",
      "Tem",
      "Tennison",
      "Teryysone",
      "Thatcher",
      "Thom",
      "Thurber",
      "Timothy",
      "Tomasina",
      "Tomlin",
      "Tony",
      "Torey",
      "Torrey",
      "Trace",
      "Tremayne",
      "Trish",
      "Tristan",
      "Tristian",
      "Tristina",
      "Trowbrydge",
      "Troye",
      "Trueman",
      "Tuckere",
      "Tuckman",
      "Tuppere",
      "Twila",
      "Tynan",
      "Tyrell",
      "Ullock",
      "Ulmar",
      "Ulmarr",
      "Ulrick",
      "Uptun",
      "Vayle",
      "Vivianna",
      "Wada",
      "Waer",
      "Wain",
      "Walcot",
      "Warden",
      "Ware",
      "Warin",
      "Warleigh",
      "Warrick",
      "Warwyk",
      "Watson",
      "Wattikinson",
      "Watts",
      "Wayte",
      "Webster",
      "Weddell",
      "Welford",
      "Wenda",
      "Wentworth",
      "Wes",
      "Westbrook",
      "Wethrby",
      "White",
      "Whitelaw",
      "Whitlock",
      "Wielladun",
      "Wiley",
      "Wilfredo",
      "Will",
      "Wilona",
      "Wilson",
      "Windgate",
      "Winfrid",
      "Winnie",
      "Winward",
      "Wittatun",
      "Witton",
      "Wolf",
      "Wylie",
      "Zach",
      "Zak",
      "Zeke",
    ],
    Exp3: [
      "Ackley",
      "Adalbrechta",
      "Addison",
      "Aelfwine",
      "Aethelwine",
      "Albertyne",
      "Aldus",
      "Aleta",
      "Alexina",
      "Alice",
      "Alice",
      "Alisanne",
      "Allard",
      "Allie",
      "Alwyn",
      "Amber",
      "Amber",
      "Amherst",
      "Amy",
      "Andena",
      "Aneisha",
      "Anna",
      "Annis",
      "Apryll",
      "Shelton",
      "Shep",
      "Sherbourn",
      "Sherry",
      "Shirl",
      "Sidwell",
      "Silvester",
      "Simeon",
      "Sinjin",
      "Stanbury",
      "Stanhop",
      "Stanwood",
      "Steele",
      "Stefford",
      "Stem",
      "Stiles",
      "Stoc",
      "Stockwell",
      "Strong",
      "Stroude",
      "Sunday",
      "Sunny",
      "Sunny",
      "Sunny",
      "Susy",
      "Swain",
      "Swintun",
      "Syd",
      "Sylvina",
      "Tai",
      "Tailor",
      "Tailor",
      "Taitum",
      "Tangerine",
      "Tanton",
      "Tarrah",
      "Tarrence",
      "Tatum",
      "Taurina",
      "Tayt",
      "Teagan",
      "Tedman",
      "Tedmond",
      "Templeton",
      "Templeton",
      "Terrance",
      "Terrie",
      "Terrin",
      "Terrin",
      "Thacker",
      "Thane",
      "Thane",
      "Thistle",
      "Thompson",
      "Thorn",
      "Thorndyke",
      "Thrythwig",
      "Thurleah",
      "Tiauna",
      "Tilford",
      "Tine",
      "Tiwesdaeg",
      "Tod",
      "Tod",
      "Toland",
      "Tolman",
      "Tom",
      "Tommie",
      "Torold",
      "Torsten",
      "Treven",
      "Tripper",
      "Trisha",
      "Twyford",
      "Tyson",
      "Ulfred",
      "Ulvelaik",
      "Upwode",
      "Valentine",
      "Vallen",
      "Vannes",
      "Varek",
      "Verita",
      "Vidal",
      "Vinson",
      "Waefreleah",
      "Waeringawicum",
      "Waescburne",
      "Wallace",
      "Walworth",
      "Wanetta",
      "Wardell",
      "Wareine",
      "Warley",
      "Warrener",
      "Washburne",
      "Waylin",
      "Wegland",
      "Weller",
      "Wendell",
      "Wess",
      "Westleah",
      "Westun",
      "Weyland",
      "Whitcomb",
      "Whitley",
      "Whitley",
      "Whitmore",
      "Willa",
      "Willa",
      "Willis",
      "Wilton",
      "Wincel",
      "Windsor",
      "Winetorp",
      "Winslowe",
      "Wood",
      "Worth",
      "Wulfsige",
      "Wycliff",
      "Wymer",
      "Wynton",
      "Yedda",
      "Zakari",
      "Zelma",
    ],
    Exp4: [
      "Abelardo",
      "Alarice",
      "Alexandrea",
      "Alexandrina",
      "Alfric",
      "Alhraed",
      "Amberly",
      "Annamarie",
      "Shelden",
      "Sheply",
      "Sherlie",
      "Sherwyn",
      "Shipley",
      "Shirlee",
      "Sidney",
      "Sigehere",
      "Sinclair",
      "Skipper",
      "Snowden",
      "Sonnie",
      "Spaulding",
      "Stanburh",
      "Standish",
      "Stanedisc",
      "Star",
      "Stew",
      "Stod",
      "Stoddard",
      "Stratford",
      "SutcIyf",
      "Suthleah",
      "Suttecliff",
      "Taburer",
      "Tacy",
      "Talford",
      "Taves",
      "Terran",
      "Terrill",
      "Tex",
      "Thawain",
      "Thorley",
      "Thornly",
      "Thorntun",
      "Thurhloew",
      "Thurstan",
      "Tiegh",
      "Tiffney",
      "Tighe",
      "Tirell",
      "Torie",
      "Torrie",
      "Tremaine",
      "Trevion",
      "Trevon",
      "Trixie",
      "Truitestall",
      "Twitchell",
      "Tyesone",
      "Tyla",
      "Tylere",
      "Udolph",
      "Ulrike",
      "Upwood",
      "Usbeorn",
      "Vale",
      "Virgena",
      "Waerheall",
      "Wake",
      "Wakefield",
      "Warford",
      "Washington",
      "Way",
      "Welborne",
      "Welcome",
      "West",
      "Wheeler",
      "Whitford",
      "Whitmoor",
      "Wigman",
      "Wilbur",
      "Willow",
      "Winefrith",
      "Winny",
      "Winswode",
      "Winwood",
      "Wolfcot",
      "Woodman",
      "Woodward",
      "Worrell",
      "Wright",
      "WyIfrid",
      "Wyligby",
      "Wynston",
      "Wynthrop",
      "Yardly",
      "Yeardleigh",
      "Yippee",
      "Yul",
      "Zackary",
      "Alder",
      "Alurea",
      "Alvin",
      "Analyn",
      "Anora",
      "Ansley",
      "Ansley",
      "Smyth",
      "Speed",
      "Stanton",
      "Stanway",
      "Starr",
      "Starr",
      "Starr",
      "Stedman",
      "Stern",
      "Steven",
      "Storm",
      "Storm",
      "Storm",
      "Strod",
      "Sylvana",
      "Tamsin",
      "Tashia",
      "Tayson",
      "Teddy",
      "Tiane",
      "Tobey",
      "Tobyn",
      "Toni",
      "Torn",
      "Tracy",
      "Trisa",
      "Twain",
      "Tyrus",
      "Udolf",
      "Wacuman",
      "Waite",
      "Walcott",
      "Wallis",
      "Wallis",
      "Walton",
      "Wattson",
      "Wayde",
      "Waylan",
      "Welby",
      "Welles",
      "Welsh",
      "Westby",
      "Woods",
      "Wray",
      "Wyman",
      "Wyne",
      "Wynn",
      "Wyth",
      "Zin",
    ],
    Exp5: [
      "Adalbeorht",
      "Aeldra",
      "Ailen",
      "Aland",
      "Alberta",
      "Albertine",
      "Aldan",
      "Aldercy",
      "Aleda",
      "Alfrid",
      "Allaryce",
      "Alvina",
      "Alyson",
      "Alyssa",
      "Alyssia",
      "Amberlynn",
      "Amelia",
      "Amity",
      "Analynne",
      "Anessa",
      "Anjeanette",
      "Annalynn",
      "Annissa",
      "Sheldon",
      "Shelley",
      "Sherborne",
      "Sherri",
      "Shirleigh",
      "Sid",
      "Silsby",
      "Skipton",
      "Skyla",
      "Skylar",
      "Slade",
      "Slaed",
      "Spear",
      "Spelding",
      "Stacy",
      "Stanberry",
      "Stanleigh",
      "Stanwyk",
      "Starbuck",
      "Stearn",
      "Sterling",
      "Sterlyn",
      "Stevon",
      "Stock",
      "Sumertun",
      "Suthfeld",
      "Sydell",
      "Sylvonna",
      "Symon",
      "Tab",
      "Tabbert",
      "Tabby",
      "Tait",
      "Tannere",
      "Taron",
      "Tat",
      "Tedric",
      "Teriana",
      "Terrall",
      "Terrelle",
      "Terry",
      "Tessie",
      "Thormund",
      "Thorndike",
      "Thorp",
      "Thurman",
      "Thurmond",
      "Tianna",
      "Tommy",
      "Tonia",
      "Tonisha",
      "Torley",
      "Toukere",
      "Towne",
      "Traveon",
      "Trent",
      "Treowe",
      "Trevyn",
      "Trey",
      "Trypp",
      "Tuesday",
      "Twiford",
      "Tye",
      "Udall",
      "Udayle",
      "Unwine",
      "Upton",
      "Velvet",
      "Vern",
      "Vinn",
      "Virgil",
      "Vivian",
      "Wadsworth",
      "Wakeman",
      "Walden",
      "Wallas",
      "Watelford",
      "Wattesone",
      "Wayne",
      "Weardleah",
      "Webb",
      "Welburn",
      "Wellington",
      "Weolingtun",
      "Westen",
      "Wheaton",
      "Whitney",
      "Whoopi",
      "Wiellaburne",
      "Wildon",
      "Wilfred",
      "Wilfried",
      "Winchell",
      "Winton",
      "Withypoll",
      "Witter",
      "Woodrow",
      "Wryhta",
      "Wulfweardsweorth",
      "Wyndell",
      "Yoman",
      "Zack",
      "Zain",
      "Zander",
      "Zina",
      "Zinia",
    ],
    Exp6: [
      "Abba",
      "Ada",
      "Adia",
      "Aerwyna",
      "Aida",
      "Alcot",
      "Aldora",
      "Aldridge",
      "Alexi",
      "Alfie",
      "Alfrida",
      "Altha",
      "Altheda",
      "Althia",
      "Ametta",
      "Amia",
      "Amorica",
      "Andie",
      "Ansel",
      "Shaw",
      "Sheppard",
      "Sheridan",
      "Sherman",
      "Sherwin",
      "Shirley",
      "Shurl",
      "Silas",
      "Skeet",
      "Skelton",
      "Skete",
      "Skye",
      "Smetheleah",
      "Smith",
      "Snowy",
      "Somerset",
      "Sonny",
      "Spenser",
      "Spike",
      "Staerling",
      "Stamford",
      "Stanley",
      "Stanmore",
      "Step",
      "Stephen",
      "Stevyn",
      "Stilleman",
      "Stillmann",
      "Stockman",
      "Stu",
      "Sumernor",
      "Sunnee",
      "Sutcliff",
      "Suzanna",
      "Swayne",
      "Swinton",
      "Symontun",
      "Tal",
      "Talbert",
      "Taralynn",
      "Tarleton",
      "Tassa",
      "Taylon",
      "Tedd",
      "Teddi",
      "Tenny",
      "Terrel",
      "Terrys",
      "Teyen",
      "Thaxter",
      "Thorald",
      "Thurstun",
      "Tila",
      "Tilman",
      "Tim",
      "Tobie",
      "Tobin",
      "Tolland",
      "Toriana",
      "Tory",
      "Townes",
      "Townley",
      "Townsend",
      "Traci",
      "Tranter",
      "Tredway",
      "Trenten",
      "Treoweman",
      "Trevls",
      "Trista",
      "Tristen",
      "Troy",
      "Truesdale",
      "Truly",
      "Truman",
      "Trumhall",
      "Tucker",
      "Tupper",
      "Turner",
      "Tyna",
      "Vareck",
      "Vincent",
      "Viviana",
      "Vivianne",
      "Wacian",
      "Wade",
      "Waed",
      "Wainwright",
      "Waldon",
      "Waldron",
      "Waleis",
      "Wallach",
      "Warde",
      "Warfield",
      "Watford",
      "Weard",
      "Welch",
      "Welss",
      "Weslee",
      "Weslia",
      "Westbroc",
      "Westcot",
      "Weston",
      "Whistler",
      "Whit",
      "Whitby",
      "Whitfield",
      "Whitlaw",
      "Whytlok",
      "Wickam",
      "Wiellaford",
      "Wilber",
      "Wilburt",
      "Wilford",
      "Willesone",
      "Willhard",
      "Wine",
      "Winefield",
      "Winn",
      "Winni",
      "Winston",
      "Winthorp",
      "Winthrop",
      "Woolcott",
      "Woolsey",
      "Worton",
      "Wudoweard",
      "Wulffrith",
      "Wynfrith",
      "Wynter",
      "Wyrttun",
      "York",
      "StAlban",
    ],
    Exp7: [
      "Abelard",
      "Aelfraed",
      "Aethelreda",
      "Aldys",
      "Alexa",
      "Alexia",
      "Alexine",
      "Alexis",
      "Alfredo",
      "Alissa",
      "Alita",
      "Amanda",
      "Amaris",
      "Amberlee",
      "Andrea",
      "Anisha",
      "Annalee",
      "Anne",
      "Anyssa",
      "Sidell",
      "Simon",
      "Skeets",
      "Sketes",
      "Slayton",
      "Smitty",
      "Sparke",
      "Sproule",
      "StancIyf",
      "Stanford",
      "Stanwik",
      "Staunton",
      "Stefon",
      "Stephon",
      "Stevenson",
      "Stewart",
      "Stockhart",
      "Stoke",
      "Strang",
      "Stroud",
      "Sueanne",
      "Suellen",
      "Sylvanus",
      "Tad",
      "Talbot",
      "Tami",
      "Tammie",
      "Taura",
      "Tearle",
      "Tedrick",
      "Teela",
      "Tennessee",
      "Terence",
      "Teri",
      "Terrence",
      "Terri",
      "Thain",
      "Thaw",
      "Thoraldtun",
      "Thorbert",
      "Thornton",
      "Tie",
      "Tiffanie",
      "Tiladene",
      "Todd",
      "Toft",
      "Tournour",
      "Tracee",
      "Treadway",
      "Trenton",
      "Tripp",
      "Trudy",
      "Tryp",
      "Tyg",
      "Tyrelle",
      "Udale",
      "Unwyn",
      "Upshaw",
      "Valiant",
      "Varik",
      "Vernon",
      "Videl",
      "Vruyk",
      "Wadley",
      "Wakler",
      "Walbrydge",
      "Walford",
      "Walker",
      "Wann",
      "Wanrrick",
      "Wardley",
      "Warmond",
      "Warner",
      "Warren",
      "Wartun",
      "Warwick",
      "Washburn",
      "Watkins",
      "Wattekinson",
      "Waverly",
      "Weirley",
      "Wetherby",
      "Whitman",
      "Whittaker",
      "Wichamm",
      "Wickley",
      "Wicleah",
      "Wilfryd",
      "Willaburh",
      "Willard",
      "William",
      "Willie",
      "Windell",
      "Winfred",
      "Wingate",
      "Winifred",
      "Winslow",
      "Winwodem",
      "Wolfe",
      "Worden",
      "Wulfgar",
      "WyIltun",
      "Wylingford",
      "Wyndham",
      "Yael",
      "Yale",
      "Yates",
    ],
    Exp8: [
      "Ackerley",
      "Ackerley",
      "Acton",
      "Adison",
      "Afreda",
      "Aftonio",
      "Aisley",
      "Alaric",
      "Albertyna",
      "Alcott",
      "Aldred",
      "Aldrych",
      "Alexandra",
      "Alexandria",
      "Allyson",
      "Alton",
      "Alura",
      "Alyse",
      "Alyx",
      "Ambria",
      "Annalisa",
      "Shel",
      "Shelby",
      "Shepard",
      "Sherbourne",
      "Sherey",
      "Sherwood",
      "Siddel",
      "Smits",
      "Snow",
      "Sped",
      "Spence",
      "Spencer",
      "Squier",
      "Squire",
      "Stafford",
      "Stanhope",
      "Stanweg",
      "Stanwic",
      "Stanwyck",
      "Starls",
      "Steathford",
      "Steve",
      "Stevie",
      "Stodd",
      "Stokley",
      "Stoney",
      "Sully",
      "Sumerton",
      "Summer",
      "Suthclif",
      "Swaine",
      "Tain",
      "Talon",
      "Tamtun",
      "Tangerina",
      "Tarin",
      "Tarrin",
      "Tavia",
      "Tayte",
      "Tempest",
      "Temple",
      "Terris",
      "Thackere",
      "Thorburn",
      "Thormond",
      "Thorne",
      "Tiahna",
      "Tiesha",
      "Tigh",
      "Timmy",
      "Timon",
      "Tina",
      "Toby",
      "Tompkin",
      "Tori",
      "Torr",
      "Travis",
      "Tremain",
      "Trevan",
      "Trevian",
      "Troi",
      "Truesdell",
      "Twein",
      "Tyce",
      "Tyeson",
      "Tyfiell",
      "Tyler",
      "Tyrel",
      "Ullok",
      "Ulrich",
      "Unity",
      "Upchurch",
      "Vail",
      "Val",
      "Velouette",
      "Vince",
      "Vinsone",
      "Virginia",
      "Wacleah",
      "Wahoo",
      "Wait",
      "Waller",
      "Wallie",
      "Walwyn",
      "Wat",
      "Wayland",
      "Weatherby",
      "Weber",
      "Weiford",
      "Welborn",
      "Wells",
      "Welton",
      "Wendall",
      "Wendlesora",
      "Wendy",
      "Weorth",
      "Wesley",
      "Westcott",
      "Wetherly",
      "Wiellaby",
      "Wilbert",
      "Williams",
      "Willoughby",
      "Wilmer",
      "Winfrith",
      "Winsor",
      "Wintanweorth",
      "Winter",
      "Woodie",
      "Wulf",
      "Wyatt",
      "Wyn",
      "Wyndam",
      "Wynfield",
      "Xandra",
      "Yetta",
      "Zabrina",
      "Zackery",
      "Zayne",
    ],
    Exp9: [
      "Abacas",
      "Alard",
      "Alden",
      "Aldis",
      "Aldren",
      "Aldwin",
      "Alsatia",
      "Alysse",
      "Amberlyn",
      "Amold",
      "Anissa",
      "Anjanette",
      "Apryl",
      "Shelly",
      "Shepley",
      "Sherm",
      "Shir",
      "Shirleen",
      "Siddael",
      "Sinclaire",
      "Skippere",
      "Skyler",
      "Slaton",
      "Smythe",
      "Southwell",
      "Spere",
      "Sprowle",
      "Stan",
      "Stancliff",
      "Stanfeld",
      "Stanfield",
      "Stedeman",
      "Stephenson",
      "Sterne",
      "Stevan",
      "Steward",
      "Stirling",
      "Stockhard",
      "Stockton",
      "Stokkard",
      "Storme",
      "Stormie",
      "Stuart",
      "Sue",
      "Suma",
      "Sumner",
      "Swayze",
      "Talbott",
      "Talmadge",
      "Tammy",
      "Tania",
      "Tanner",
      "Tawnie",
      "Tayler",
      "Tedmund",
      "Tempeltun",
      "Tennyson",
      "Terell",
      "Teriann",
      "Terilynn",
      "Terrell",
      "Terron",
      "Tess",
      "Thacher",
      "Theyn",
      "Thomdic",
      "Thornley",
      "Thunder",
      "Thurleigh",
      "Thurlow",
      "Thurston",
      "Tillman",
      "Tilton",
      "Tip",
      "Topper",
      "Tosha",
      "Tostig",
      "Tramaine",
      "Travion",
      "Travon",
      "Trevonn",
      "Trip",
      "Trula",
      "Tunleah",
      "Twyla",
      "Tylor",
      "Tyreece",
      "Udell",
      "Ulger",
      "Ull",
      "Ulric",
      "Ulrika",
      "Ulu",
      "Una",
      "Unwin",
      "Vala",
      "Valen",
      "Valerie",
      "Vance",
      "Verity",
      "Vingon",
      "Wacfeld",
      "Waggoner",
      "Walbridge",
      "Walby",
      "Walsh",
      "Washbourne",
      "Wattkins",
      "Waydee",
      "Waylon",
      "Wealaworth",
      "Weallere",
      "Weardhyll",
      "Weatherly",
      "Webbeleah",
      "Webbestre",
      "Webley",
      "Wessely",
      "Wessley",
      "Westin",
      "Westleigh",
      "Wharton",
      "Wheatley",
      "Whitey",
      "Wiccum",
      "Wichell",
      "Wiellatun",
      "Wigmaere",
      "Wilburn",
      "Wilfrid",
      "Willy",
      "Windham",
      "Winters",
      "Wireceaster",
      "Witt",
      "Wolcott",
      "Woodley",
      "Woodruff",
      "Worcester",
      "Wyeth",
      "Wynward",
      "Wythe",
      "Yardley",
      "Yorick",
      "Yule",
    ],
  },
};

// Complex search state interface
export interface ComplexSearchState {
  language: string;
  currentDatabaseList: string[];
  currentDbIndexInSequence: number;
  currentIndexInDb: number;
  currentVariations: string[];
  currentVariationIndex: number;
  totalVariationsChecked: number;
  isFinishedCurrentSequence: boolean;
  isInitialized: boolean;
  foundNamesThisOverallRun: Array<{
    name: string;
    hara: number;
    sync: number;
    coherence: number;
    synergize: string;
    productive: string;
    momenSukses: string;
    grafologiIndex: string;
    saranAngka?: number[];
  }>;
}

// Initialize complex search state
export let complexState: ComplexSearchState = {
  language: "id",
  currentDatabaseList: [],
  currentDbIndexInSequence: 0,
  currentIndexInDb: 0,
  currentVariations: [],
  currentVariationIndex: 0,
  totalVariationsChecked: 0,
  isFinishedCurrentSequence: false,
  isInitialized: false,
  foundNamesThisOverallRun: [],
};

// Reset complex search state
export const resetComplexState = () => {
  complexState = {
    language: "id",
    currentDatabaseList: [],
    currentDbIndexInSequence: 0,
    currentIndexInDb: 0,
    currentVariations: [],
    currentVariationIndex: 0,
    totalVariationsChecked: 0,
    isFinishedCurrentSequence: false,
    isInitialized: false,
    foundNamesThisOverallRun: [],
  };
};

// Generate name variations with advanced positioning for Combi mode
export const generateNameVariations = (
  originalName: string,
  wordsToAdd: string[],
): string[] => {
  const results = new Set<string>();
  const originalWords =
    originalName.trim() === "" ? [] : originalName.split(" ").filter(Boolean);
  const nOrig = originalWords.length;
  const normalizeName = (nameArray: string[]) =>
    nameArray.join(" ").replace(/\s+/g, " ").trim();

  if (wordsToAdd.length === 1) {
    // COMPLEX mode
    const newWord = wordsToAdd[0];
    if (nOrig === 0) {
      results.add(newWord);
    } else {
      results.add(normalizeName([newWord, ...originalWords]));
      results.add(normalizeName([...originalWords, newWord]));
      for (let i = 1; i < nOrig; i++) {
        results.add(
          normalizeName([
            ...originalWords.slice(0, i),
            newWord,
            ...originalWords.slice(i),
          ]),
        );
      }
    }
  } else if (wordsToAdd.length === 2) {
    // COMBI mode
    const w1 = wordsToAdd[0];
    const w2 = wordsToAdd[1];

    function placeBlock(block: string) {
      const blockVariations = new Set<string>();
      if (nOrig === 0) {
        blockVariations.add(block);
      } else {
        blockVariations.add(normalizeName([block, ...originalWords]));
        blockVariations.add(normalizeName([...originalWords, block]));
        for (let i = 1; i < nOrig; i++) {
          blockVariations.add(
            normalizeName([
              ...originalWords.slice(0, i),
              block,
              ...originalWords.slice(i),
            ]),
          );
        }
      }
      return Array.from(blockVariations);
    }

    // Block placements
    placeBlock(`${w1} ${w2}`).forEach((v) => results.add(v));
    if (w1 !== w2) placeBlock(`${w2} ${w1}`).forEach((v) => results.add(v));
    placeBlock(`${w1}${w2}`).forEach((v) => results.add(v));
    if (w1 !== w2) placeBlock(`${w2}${w1}`).forEach((v) => results.add(v));

    // Separated placements
    function generateSeparatedOptimal(wordX: string, wordY: string) {
      if (nOrig === 0) {
        results.add(normalizeName([wordX, wordY]));
        return;
      }
      for (let i = 0; i <= nOrig; i++) {
        let tempBuild = [...originalWords];
        tempBuild.splice(i, 0, wordX);
        if (i + 1 < tempBuild.length) {
          let finalBuild = [...tempBuild];
          finalBuild.splice(i + 2, 0, wordY);
          results.add(normalizeName(finalBuild));
        }
      }
    }
    generateSeparatedOptimal(w1, w2);
    if (w1 !== w2) generateSeparatedOptimal(w2, w1);
  }

  return Array.from(results).map((name) => name.replace(/\s+/g, " ").trim());
};

// Calculate metrics for name (basic version for complex search)
export const calculateMetricsForNameBasic = (
  name: string,
  birthdate: string,
  gender: "Male" | "Female",
): {
  hara: number;
  sync: number;
  coherence: number;
  synergize: string;
  productive: string;
  momenSukses: string;
  grafologiIndex: string;
  saranAngka?: number[];
} | null => {
  try {
    // Parse birthdate
    const [day, month, year] = birthdate.split("/").map(Number);
    if (!day || !month || !year) return null;

    const birthdateObj = new Date(year, month - 1, day);
    const patterns = getPola(name, birthdateObj, gender);
    const grafologiResult = calculateGrafologiIndex(name);

    // Extract suggestion numbers from grafologi result
    const saranAngka = grafologiResult.suggestions
      .map((s) => parseInt(s.value))
      .filter((n) => !isNaN(n));

    return {
      hara: patterns.hara,
      sync: patterns.synchronize,
      coherence: patterns.coherence,
      synergize: patterns.synergize,
      productive: patterns.productive,
      momenSukses: patterns.momenSukses,
      grafologiIndex: grafologiResult.persValue,
      saranAngka,
    };
  } catch (error) {
    console.error("Error calculating metrics:", error);
    return null;
  }
};

// Get database keys for complex search based on LP and Expression
export const getDatabaseKeysForComplex = (
  lp: number,
  exp: number,
): string[] => {
  // 81 conditions matrix
  if (lp === 1 && exp === 1) return ["Exp4", "Exp9"];
  else if (lp === 1 && exp === 2) return ["Exp3", "Exp8"];
  else if (lp === 1 && exp === 3) return ["Exp2", "Exp7"];
  else if (lp === 1 && exp === 4) return ["Exp1", "Exp6"];
  else if (lp === 1 && exp === 5) return ["Exp9", "Exp5"];
  else if (lp === 1 && exp === 6) return ["Exp8", "Exp4"];
  else if (lp === 1 && exp === 7) return ["Exp7", "Exp3"];
  else if (lp === 1 && exp === 8) return ["Exp6", "Exp2"];
  else if (lp === 1 && exp === 9) return ["Exp5", "Exp1"];
  else if (lp === 2 && exp === 1) return ["Exp5", "Exp1"];
  else if (lp === 2 && exp === 2) return ["Exp4", "Exp9"];
  else if (lp === 2 && exp === 3) return ["Exp3", "Exp8"];
  else if (lp === 2 && exp === 4) return ["Exp2", "Exp7"];
  else if (lp === 2 && exp === 5) return ["Exp1", "Exp6"];
  else if (lp === 2 && exp === 6) return ["Exp9", "Exp5"];
  else if (lp === 2 && exp === 7) return ["Exp8", "Exp4"];
  else if (lp === 2 && exp === 8) return ["Exp7", "Exp3"];
  else if (lp === 2 && exp === 9) return ["Exp6", "Exp2"];
  else if (lp === 3 && exp === 1) return ["Exp6", "Exp2"];
  else if (lp === 3 && exp === 2) return ["Exp5", "Exp1"];
  else if (lp === 3 && exp === 3) return ["Exp4", "Exp9"];
  else if (lp === 3 && exp === 4) return ["Exp3", "Exp8"];
  else if (lp === 3 && exp === 5) return ["Exp2", "Exp7"];
  else if (lp === 3 && exp === 6) return ["Exp1", "Exp6"];
  else if (lp === 3 && exp === 7) return ["Exp9", "Exp5"];
  else if (lp === 3 && exp === 8) return ["Exp8", "Exp4"];
  else if (lp === 3 && exp === 9) return ["Exp7", "Exp3"];
  else if (lp === 4 && exp === 1) return ["Exp7", "Exp3"];
  else if (lp === 4 && exp === 2) return ["Exp6", "Exp2"];
  else if (lp === 4 && exp === 3) return ["Exp5", "Exp1"];
  else if (lp === 4 && exp === 4) return ["Exp4", "Exp9"];
  else if (lp === 4 && exp === 5) return ["Exp3", "Exp8"];
  else if (lp === 4 && exp === 6) return ["Exp2", "Exp7"];
  else if (lp === 4 && exp === 7) return ["Exp1", "Exp6"];
  else if (lp === 4 && exp === 8) return ["Exp9", "Exp5"];
  else if (lp === 4 && exp === 9) return ["Exp8", "Exp4"];
  else if (lp === 5 && exp === 1) return ["Exp9", "Exp4"];
  else if (lp === 5 && exp === 2) return ["Exp8", "Exp3"];
  else if (lp === 5 && exp === 3) return ["Exp7", "Exp2"];
  else if (lp === 5 && exp === 4) return ["Exp6", "Exp1"];
  else if (lp === 5 && exp === 5) return ["Exp5", "Exp9"];
  else if (lp === 5 && exp === 6) return ["Exp4", "Exp8"];
  else if (lp === 5 && exp === 7) return ["Exp3", "Exp7"];
  else if (lp === 5 && exp === 8) return ["Exp2", "Exp6"];
  else if (lp === 5 && exp === 9) return ["Exp1", "Exp5"];
  else if (lp === 6 && exp === 1) return ["Exp1", "Exp5"];
  else if (lp === 6 && exp === 2) return ["Exp9", "Exp4"];
  else if (lp === 6 && exp === 3) return ["Exp8", "Exp3"];
  else if (lp === 6 && exp === 4) return ["Exp7", "Exp2"];
  else if (lp === 6 && exp === 5) return ["Exp6", "Exp1"];
  else if (lp === 6 && exp === 6) return ["Exp5", "Exp9"];
  else if (lp === 6 && exp === 7) return ["Exp4", "Exp8"];
  else if (lp === 6 && exp === 8) return ["Exp3", "Exp7"];
  else if (lp === 6 && exp === 9) return ["Exp2", "Exp6"];
  else if (lp === 7 && exp === 1) return ["Exp2"];
  else if (lp === 7 && exp === 2) return ["Exp1"];
  else if (lp === 7 && exp === 3) return ["Exp9"];
  else if (lp === 7 && exp === 4) return ["Exp8"];
  else if (lp === 7 && exp === 5) return ["Exp7"];
  else if (lp === 7 && exp === 6) return ["Exp6"];
  else if (lp === 7 && exp === 7) return ["Exp5"];
  else if (lp === 7 && exp === 8) return ["Exp4"];
  else if (lp === 7 && exp === 9) return ["Exp3"];
  else if (lp === 8 && exp === 1) return ["Exp3"];
  else if (lp === 8 && exp === 2) return ["Exp2"];
  else if (lp === 8 && exp === 3) return ["Exp1"];
  else if (lp === 8 && exp === 4) return ["Exp9"];
  else if (lp === 8 && exp === 5) return ["Exp8"];
  else if (lp === 8 && exp === 6) return ["Exp7"];
  else if (lp === 8 && exp === 7) return ["Exp6"];
  else if (lp === 8 && exp === 8) return ["Exp5"];
  else if (lp === 8 && exp === 9) return ["Exp4"];
  else if (lp === 9 && exp === 1) return ["Exp8"];
  else if (lp === 9 && exp === 2) return ["Exp7"];
  else if (lp === 9 && exp === 3) return ["Exp6"];
  else if (lp === 9 && exp === 4) return ["Exp5"];
  else if (lp === 9 && exp === 5) return ["Exp4"];
  else if (lp === 9 && exp === 6) return ["Exp3"];
  else if (lp === 9 && exp === 7) return ["Exp2"];
  else if (lp === 9 && exp === 8) return ["Exp1"];
  else if (lp === 9 && exp === 9) return ["Exp9"];
  else return [];
};

// Generate 100-year life report data with updated essence calculation
export const generateLifeReport = (
  name: string,
  birthdate: Date,
  gender: "Male" | "Female",
) => {
  const patterns = getPola(name, birthdate, gender);
  const birthYear = birthdate.getFullYear();
  const birthMonth = birthdate.getMonth() + 1;
  const birthDay = birthdate.getDate();

  // Calculate life path number
  const lifePath = reduksiAngka(birthDay + birthMonth + birthYear);

  // Split name into words/phrases
  const nameWords = name
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  // Calculate challenge numbers
  const singleDigitMonth = reduksiAngka(birthMonth);
  const singleDigitDay = reduksiAngka(birthDay);
  const singleDigitYear = reduksiAngka(birthYear);

  const challenge1 = Math.abs(singleDigitMonth - singleDigitDay);
  const challenge2 = Math.abs(singleDigitYear - singleDigitDay);
  const challenge3 = Math.abs(challenge1 - challenge2);
  const challenge4 = Math.abs(singleDigitMonth - singleDigitYear);

  // Calculate challenge periods
  const challenge1End = Math.abs(36 - lifePath) - 1;
  const challenge2End = Math.abs(45 - lifePath) - 1;
  const challenge3End = Math.abs(54 - lifePath) - 1;

  // Calculate cycle numbers (preserve master numbers)
  const getCycleNumber = (num: number): number => {
    const reduced = reduksiAngka(num);
    return num === 11 || num === 22 || reduced === 11 || reduced === 22
      ? num === 11 || num === 22
        ? num
        : reduced
      : reduced;
  };

  const cycle1 = getCycleNumber(birthMonth);
  const cycle2 = getCycleNumber(birthDay);
  const cycle3 = getCycleNumber(birthYear);

  // Calculate pinnacle numbers (preserve master numbers)
  const getPinnacleNumber = (sum: number): number => {
    const reduced = reduksiAngka(sum);
    return sum === 11 || sum === 22 || reduced === 11 || reduced === 22
      ? sum === 11 || sum === 22
        ? sum
        : reduced
      : reduced;
  };

  const pinnacle1 = getPinnacleNumber(singleDigitMonth + singleDigitDay);
  const pinnacle2 = getPinnacleNumber(singleDigitYear + singleDigitDay);
  const pinnacle3 = getPinnacleNumber(pinnacle1 + pinnacle2);
  const pinnacle4 = getPinnacleNumber(singleDigitMonth + singleDigitYear);

  // Calculate letter values and durations for each word
  const wordLetterData = nameWords.map((word) => {
    const letterData: { letter: string; value: number; duration: number }[] =
      [];
    const normalizedWord = word.toUpperCase().replace(/[^A-Z]/g, "");

    for (let i = 0; i < normalizedWord.length; i++) {
      const letter = normalizedWord[i];
      const value = pythagoreanValues[letter] || 0;
      // Duration of each letter is equal to its Pythagorean value
      letterData.push({ letter, value, duration: value });
    }

    return letterData;
  });

  // Generate 100 years of data
  const report = [];

  for (let age = 0; age < 100; age++) {
    const currentYear = birthYear + age;

    // Challenge calculation
    let challenge = challenge1;
    if (age > challenge1End) {
      challenge = challenge2;
    }
    if (age > challenge2End) {
      challenge = challenge3;
    }
    if (age > challenge3End) {
      challenge = challenge4;
    }

    // Cycle calculation
    let cycle = cycle1;
    if (age >= 27) {
      cycle = cycle2;
    }
    if (age >= 53) {
      cycle = cycle3;
    }

    // Pinnacle calculation
    let pinnacle = pinnacle1;
    if (age > challenge1End) {
      pinnacle = pinnacle2;
    }
    if (age > challenge2End) {
      pinnacle = pinnacle3;
    }
    if (age > challenge3End) {
      pinnacle = pinnacle4;
    }

    // Calendar Year calculation (preserve master numbers)
    const calYearSum = currentYear
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
    const calYear =
      calYearSum === 11 || calYearSum === 22
        ? calYearSum
        : reduksiAngka(calYearSum);

    // Personal Year calculation (preserve special numbers)
    const personalYearSum =
      singleDigitDay + singleDigitMonth + reduksiAngka(currentYear);
    let personalYear = personalYearSum;
    if (
      personalYearSum !== 11 &&
      personalYearSum !== 13 &&
      personalYearSum !== 14 &&
      personalYearSum !== 19 &&
      personalYearSum !== 22
    ) {
      personalYear = reduksiAngka(personalYearSum);
    }

    // For each word, determine which letter is active at this age
    const activeLetters = wordLetterData.map((wordData) => {
      if (wordData.length === 0) return null;

      // Calculate which letter is active based on durations
      let totalDuration = 0;
      for (let i = 0; i < wordData.length; i++) {
        totalDuration += wordData[i].duration;
      }

      // Use modulo to cycle through the word's letters based on their durations
      let currentPosition = age % totalDuration;

      // Find which letter corresponds to the current position
      let runningDuration = 0;
      for (let i = 0; i < wordData.length; i++) {
        runningDuration += wordData[i].duration;
        if (currentPosition < runningDuration) {
          return wordData[i];
        }
      }

      // Fallback to first letter if calculation fails
      return wordData[0];
    });

    // Filter out null values
    const validLetters = activeLetters.filter((letter) => letter !== null) as {
      letter: string;
      value: number;
    }[];

    // Extract word letters and essences
    const wordLetters = validLetters.map((letter) => letter.letter);
    const wordEssences = validLetters.map((letter) => letter.value);

    // Main essence (sum of all word essences)
    const essenceSum = wordEssences.reduce((sum, essence) => sum + essence, 0);

    // Keep special numbers (11, 13, 14, 16, 19, 22) without reduction
    const specialNumbers = [11, 13, 14, 16, 19, 22];
    const mainEssence = specialNumbers.includes(essenceSum)
      ? essenceSum
      : reduksiAngka(essenceSum);

    // Double essence (sum of all word essences without reduction)
    const doubleEss = essenceSum;

    report.push({
      year: currentYear,
      age,
      challenge,
      cycle,
      pinnacle,
      calYear,
      personalYear,
      essence: mainEssence,
      doubleEss,
      wordEssences,
      wordLetters,
      // Color coding flags
      cycleCalYearDiff3: Math.abs(cycle - calYear) === 3,
      personalEssenceDiff3: Math.abs(personalYear - mainEssence) === 3,
      personalEssenceDiff0: Math.abs(personalYear - mainEssence) === 0,
    });
  }

  return {
    report,
    patterns,
    lifePath,
    nameWords,
  };
};

// Complex and Combi Name Generation Functions

// Search names in dictionary by name or meaning
export const searchNameDictionary = (
  language: string,
  nameSearchTerm: string = "",
  meaningSearchTerm: string = "",
): Array<{ name: string; meaning: string }> => {
  const dictionary = nameDictionary[language] || [];

  if (!nameSearchTerm && !meaningSearchTerm) {
    return dictionary;
  }

  return dictionary.filter((entry) => {
    const nameMatch = nameSearchTerm
      ? entry.name.toLowerCase().includes(nameSearchTerm.toLowerCase())
      : true;
    const meaningMatch = meaningSearchTerm
      ? entry.meaning.toLowerCase().includes(meaningSearchTerm.toLowerCase())
      : true;

    return nameMatch && meaningMatch;
  });
};

// Get available languages/ethnicities for name dictionary
export const getAvailableLanguages = (): string[] => {
  return Object.keys(nameDictionary);
};

// Generate complex names based on multiple criteria (legacy function for other modes)
export const generateComplexNames = (
  baseFirstName: string,
  targetNumbers: number[],
  nameDatabase: string[],
  maxResults: number = 10,
): string[] => {
  const results: string[] = [];
  const normalizedBase = normalisasiNama(baseFirstName);

  // Filter names from database that match ALL target patterns when combined with base
  nameDatabase.forEach((name) => {
    if (results.length >= maxResults) return;

    const normalizedName = normalisasiNama(name);
    const combinedName = `${normalizedBase} ${normalizedName}`;

    // Calculate various numerology values
    const pattern = getPola(combinedName, new Date());

    // Check if all target numbers are matched
    const matches = targetNumbers.every((target) => {
      return (
        pattern.destiny === target ||
        pattern.angka_karakter === target ||
        pattern.angka_vokal === target ||
        pattern.angka_konsonan === target ||
        pattern.angka_siklus_hidup === target
      );
    });

    if (matches) {
      results.push(combinedName);
    }
  });

  return results;
};

// Combi state interface for Advanced Combination Generator
export interface CombiState {
  language: string;
  currentDatabasePairList: Array<{ db1Key: string; db2Key: string }>;
  currentDbPairIndexInSequence: number;
  currentWord1IndexInDb: number;
  currentWord2IndexInDb: number;
  currentVariations: string[];
  currentVariationIndex: number;
  totalCombinationsChecked: number;
  isFinishedCurrentPairSequence: boolean;
  foundNamesThisOverallRun: Array<{
    name: string;
    hara: number;
    sync: number;
    coherence: number;
    synergize: string;
    productive: string;
    momenSukses: string;
    grafologiIndex: string;
    saranAngka?: number[];
  }>;
}

// Initialize combi search state
export let combiState: CombiState = {
  language: "id",
  currentDatabasePairList: [],
  currentDbPairIndexInSequence: 0,
  currentWord1IndexInDb: 0,
  currentWord2IndexInDb: 0,
  currentVariations: [],
  currentVariationIndex: 0,
  totalCombinationsChecked: 0,
  isFinishedCurrentPairSequence: true,
  foundNamesThisOverallRun: [],
};

// Reset combi search state
export const resetCombiState = () => {
  combiState = {
    language: "id",
    currentDatabasePairList: [],
    currentDbPairIndexInSequence: 0,
    currentWord1IndexInDb: 0,
    currentWord2IndexInDb: 0,
    currentVariations: [],
    currentVariationIndex: 0,
    totalCombinationsChecked: 0,
    isFinishedCurrentPairSequence: true,
    foundNamesThisOverallRun: [],
  };
};

// Get database pairs for Combi based on LP and Expression
export const getDatabasePairsForCombi = (
  lp: number,
  exp: number,
): Array<{ db1Key: string; db2Key: string }> => {
  // Comprehensive matrix for all LP and Expression combinations
  if (
    (lp === 1 && exp === 1) ||
    (lp === 2 && exp === 2) ||
    (lp === 3 && exp === 3) ||
    (lp === 4 && exp === 4)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp3" },
      { db1Key: "Exp2", db2Key: "Exp2" },
      { db1Key: "Exp4", db2Key: "Exp9" },
      { db1Key: "Exp5", db2Key: "Exp8" },
      { db1Key: "Exp6", db2Key: "Exp7" },
      { db1Key: "Exp1", db2Key: "Exp8" },
      { db1Key: "Exp2", db2Key: "Exp7" },
      { db1Key: "Exp3", db2Key: "Exp6" },
      { db1Key: "Exp4", db2Key: "Exp5" },
      { db1Key: "Exp9", db2Key: "Exp9" },
    ];
  } else if (
    (lp === 5 && exp === 5) ||
    (lp === 6 && exp === 6) ||
    (lp === 7 && exp === 7) ||
    (lp === 8 && exp === 8)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp4" },
      { db1Key: "Exp2", db2Key: "Exp3" },
      { db1Key: "Exp5", db2Key: "Exp9" },
      { db1Key: "Exp6", db2Key: "Exp8" },
      { db1Key: "Exp7", db2Key: "Exp7" },
      { db1Key: "Exp1", db2Key: "Exp8" },
      { db1Key: "Exp2", db2Key: "Exp7" },
      { db1Key: "Exp3", db2Key: "Exp6" },
      { db1Key: "Exp4", db2Key: "Exp5" },
      { db1Key: "Exp9", db2Key: "Exp9" },
    ];
  } else if (lp === 9 && exp === 9) {
    return [
      { db1Key: "Exp1", db2Key: "Exp8" },
      { db1Key: "Exp2", db2Key: "Exp7" },
      { db1Key: "Exp3", db2Key: "Exp6" },
      { db1Key: "Exp4", db2Key: "Exp5" },
      { db1Key: "Exp9", db2Key: "Exp9" },
    ];
  } else if (
    (lp === 1 && exp === 2) ||
    (lp === 2 && exp === 3) ||
    (lp === 3 && exp === 4) ||
    (lp === 4 && exp === 5)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp2" },
      { db1Key: "Exp3", db2Key: "Exp9" },
      { db1Key: "Exp4", db2Key: "Exp8" },
      { db1Key: "Exp5", db2Key: "Exp7" },
      { db1Key: "Exp6", db2Key: "Exp6" },
      { db1Key: "Exp1", db2Key: "Exp7" },
      { db1Key: "Exp2", db2Key: "Exp6" },
      { db1Key: "Exp3", db2Key: "Exp5" },
      { db1Key: "Exp4", db2Key: "Exp4" },
      { db1Key: "Exp8", db2Key: "Exp9" },
    ];
  } else if (
    (lp === 5 && exp === 6) ||
    (lp === 6 && exp === 7) ||
    (lp === 7 && exp === 8) ||
    (lp === 8 && exp === 9)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp3" },
      { db1Key: "Exp2", db2Key: "Exp2" },
      { db1Key: "Exp4", db2Key: "Exp9" },
      { db1Key: "Exp5", db2Key: "Exp8" },
      { db1Key: "Exp6", db2Key: "Exp7" },
      { db1Key: "Exp1", db2Key: "Exp7" },
      { db1Key: "Exp2", db2Key: "Exp6" },
      { db1Key: "Exp3", db2Key: "Exp5" },
      { db1Key: "Exp4", db2Key: "Exp4" },
      { db1Key: "Exp8", db2Key: "Exp9" },
    ];
  }
  // Kondisi 3
  else if (
    (lp === 1 && exp === 3) ||
    (lp === 2 && exp === 4) ||
    (lp === 3 && exp === 5) ||
    (lp === 4 && exp === 6)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp1" },
      { db1Key: "Exp2", db2Key: "Exp9" },
      { db1Key: "Exp3", db2Key: "Exp8" },
      { db1Key: "Exp4", db2Key: "Exp7" },
      { db1Key: "Exp5", db2Key: "Exp6" },
      { db1Key: "Exp1", db2Key: "Exp6" },
      { db1Key: "Exp2", db2Key: "Exp5" },
      { db1Key: "Exp3", db2Key: "Exp4" },
      { db1Key: "Exp7", db2Key: "Exp9" },
      { db1Key: "Exp8", db2Key: "Exp8" },
    ];
  } else if ((lp === 5 && exp === 7) || (lp === 6 && exp === 8)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp2" },
      { db1Key: "Exp3", db2Key: "Exp9" },
      { db1Key: "Exp4", db2Key: "Exp8" },
      { db1Key: "Exp5", db2Key: "Exp7" },
      { db1Key: "Exp6", db2Key: "Exp6" },
      { db1Key: "Exp1", db2Key: "Exp6" },
      { db1Key: "Exp2", db2Key: "Exp5" },
      { db1Key: "Exp3", db2Key: "Exp4" },
      { db1Key: "Exp7", db2Key: "Exp9" },
      { db1Key: "Exp8", db2Key: "Exp8" },
    ];
  } else if ((lp === 7 && exp === 9) || (lp === 8 && exp === 1)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp2" },
      { db1Key: "Exp3", db2Key: "Exp9" },
      { db1Key: "Exp4", db2Key: "Exp8" },
      { db1Key: "Exp5", db2Key: "Exp7" },
      { db1Key: "Exp6", db2Key: "Exp6" },
    ];
  }
  // Kondisi 4
  else if (
    (lp === 1 && exp === 4) ||
    (lp === 2 && exp === 5) ||
    (lp === 3 && exp === 6) ||
    (lp === 4 && exp === 7)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp9" },
      { db1Key: "Exp2", db2Key: "Exp8" },
      { db1Key: "Exp3", db2Key: "Exp7" },
      { db1Key: "Exp4", db2Key: "Exp6" },
      { db1Key: "Exp5", db2Key: "Exp5" },
      { db1Key: "Exp1", db2Key: "Exp5" },
      { db1Key: "Exp2", db2Key: "Exp4" },
      { db1Key: "Exp3", db2Key: "Exp3" },
      { db1Key: "Exp6", db2Key: "Exp9" },
      { db1Key: "Exp7", db2Key: "Exp8" },
    ];
  } else if ((lp === 5 && exp === 8) || (lp === 6 && exp === 9)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp1" },
      { db1Key: "Exp2", db2Key: "Exp9" },
      { db1Key: "Exp3", db2Key: "Exp8" },
      { db1Key: "Exp4", db2Key: "Exp7" },
      { db1Key: "Exp5", db2Key: "Exp6" },
      { db1Key: "Exp1", db2Key: "Exp5" },
      { db1Key: "Exp2", db2Key: "Exp4" },
      { db1Key: "Exp3", db2Key: "Exp3" },
      { db1Key: "Exp6", db2Key: "Exp9" },
      { db1Key: "Exp7", db2Key: "Exp8" },
    ];
  } else if ((lp === 7 && exp === 1) || (lp === 8 && exp === 2)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp1" },
      { db1Key: "Exp2", db2Key: "Exp9" },
      { db1Key: "Exp3", db2Key: "Exp8" },
      { db1Key: "Exp4", db2Key: "Exp7" },
      { db1Key: "Exp5", db2Key: "Exp6" },
    ];
  } else if (lp === 9 && exp === 3) {
    return [
      { db1Key: "Exp1", db2Key: "Exp5" },
      { db1Key: "Exp2", db2Key: "Exp4" },
      { db1Key: "Exp3", db2Key: "Exp3" },
      { db1Key: "Exp6", db2Key: "Exp9" },
      { db1Key: "Exp7", db2Key: "Exp8" },
    ];
  }
  // Kondisi 5
  else if (
    (lp === 1 && exp === 5) ||
    (lp === 2 && exp === 6) ||
    (lp === 3 && exp === 7) ||
    (lp === 4 && exp === 8)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp8" },
      { db1Key: "Exp2", db2Key: "Exp7" },
      { db1Key: "Exp3", db2Key: "Exp6" },
      { db1Key: "Exp4", db2Key: "Exp5" },
      { db1Key: "Exp1", db2Key: "Exp4" },
      { db1Key: "Exp2", db2Key: "Exp3" },
      { db1Key: "Exp5", db2Key: "Exp9" },
      { db1Key: "Exp6", db2Key: "Exp8" },
      { db1Key: "Exp7", db2Key: "Exp7" },
    ];
  } else if ((lp === 5 && exp === 9) || (lp === 6 && exp === 1)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp9" },
      { db1Key: "Exp2", db2Key: "Exp8" },
      { db1Key: "Exp3", db2Key: "Exp7" },
      { db1Key: "Exp4", db2Key: "Exp6" },
      { db1Key: "Exp5", db2Key: "Exp5" },
      { db1Key: "Exp1", db2Key: "Exp4" },
      { db1Key: "Exp2", db2Key: "Exp3" },
      { db1Key: "Exp5", db2Key: "Exp9" },
      { db1Key: "Exp6", db2Key: "Exp8" },
      { db1Key: "Exp7", db2Key: "Exp7" },
    ];
  } else if ((lp === 7 && exp === 2) || (lp === 8 && exp === 3)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp9" },
      { db1Key: "Exp2", db2Key: "Exp8" },
      { db1Key: "Exp3", db2Key: "Exp7" },
      { db1Key: "Exp4", db2Key: "Exp6" },
      { db1Key: "Exp5", db2Key: "Exp5" },
    ];
  } else if (lp === 9 && exp === 4) {
    return [
      { db1Key: "Exp1", db2Key: "Exp4" },
      { db1Key: "Exp2", db2Key: "Exp3" },
      { db1Key: "Exp5", db2Key: "Exp9" },
      { db1Key: "Exp6", db2Key: "Exp8" },
      { db1Key: "Exp7", db2Key: "Exp7" },
    ];
  }
  // Kondisi 6
  else if (
    (lp === 1 && exp === 6) ||
    (lp === 2 && exp === 7) ||
    (lp === 3 && exp === 8) ||
    (lp === 4 && exp === 9)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp7" },
      { db1Key: "Exp2", db2Key: "Exp6" },
      { db1Key: "Exp3", db2Key: "Exp5" },
      { db1Key: "Exp4", db2Key: "Exp4" },
      { db1Key: "Exp1", db2Key: "Exp3" },
      { db1Key: "Exp2", db2Key: "Exp2" },
      { db1Key: "Exp4", db2Key: "Exp9" },
      { db1Key: "Exp5", db2Key: "Exp8" },
      { db1Key: "Exp6", db2Key: "Exp7" },
    ];
  } else if ((lp === 5 && exp === 1) || (lp === 6 && exp === 2)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp8" },
      { db1Key: "Exp2", db2Key: "Exp7" },
      { db1Key: "Exp3", db2Key: "Exp6" },
      { db1Key: "Exp4", db2Key: "Exp5" },
      { db1Key: "Exp9", db2Key: "Exp9" },
      { db1Key: "Exp1", db2Key: "Exp3" },
      { db1Key: "Exp2", db2Key: "Exp2" },
      { db1Key: "Exp4", db2Key: "Exp9" },
      { db1Key: "Exp5", db2Key: "Exp8" },
      { db1Key: "Exp6", db2Key: "Exp7" },
    ];
  } else if ((lp === 7 && exp === 3) || (lp === 8 && exp === 4)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp8" },
      { db1Key: "Exp2", db2Key: "Exp7" },
      { db1Key: "Exp3", db2Key: "Exp6" },
      { db1Key: "Exp4", db2Key: "Exp5" },
      { db1Key: "Exp9", db2Key: "Exp9" },
    ];
  } else if (lp === 9 && exp === 5) {
    return [
      { db1Key: "Exp1", db2Key: "Exp3" },
      { db1Key: "Exp2", db2Key: "Exp2" },
      { db1Key: "Exp5", db2Key: "Exp8" },
      { db1Key: "Exp6", db2Key: "Exp7" },
      { db1Key: "Exp9", db2Key: "Exp4" },
    ];
  }
  // Kondisi 7
  else if (
    (lp === 1 && exp === 7) ||
    (lp === 2 && exp === 8) ||
    (lp === 3 && exp === 9) ||
    (lp === 4 && exp === 1)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp6" },
      { db1Key: "Exp2", db2Key: "Exp5" },
      { db1Key: "Exp3", db2Key: "Exp4" },
      { db1Key: "Exp7", db2Key: "Exp9" },
      { db1Key: "Exp8", db2Key: "Exp8" },
      { db1Key: "Exp1", db2Key: "Exp2" },
      { db1Key: "Exp3", db2Key: "Exp9" },
      { db1Key: "Exp4", db2Key: "Exp8" },
      { db1Key: "Exp5", db2Key: "Exp7" },
      { db1Key: "Exp6", db2Key: "Exp6" },
    ];
  } else if ((lp === 5 && exp === 2) || (lp === 6 && exp === 3)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp7" },
      { db1Key: "Exp2", db2Key: "Exp6" },
      { db1Key: "Exp3", db2Key: "Exp5" },
      { db1Key: "Exp4", db2Key: "Exp4" },
      { db1Key: "Exp8", db2Key: "Exp9" },
      { db1Key: "Exp1", db2Key: "Exp2" },
      { db1Key: "Exp3", db2Key: "Exp9" },
      { db1Key: "Exp4", db2Key: "Exp8" },
      { db1Key: "Exp5", db2Key: "Exp7" },
      { db1Key: "Exp6", db2Key: "Exp6" },
    ];
  } else if ((lp === 7 && exp === 4) || (lp === 8 && exp === 5)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp7" },
      { db1Key: "Exp2", db2Key: "Exp6" },
      { db1Key: "Exp3", db2Key: "Exp5" },
      { db1Key: "Exp4", db2Key: "Exp4" },
      { db1Key: "Exp8", db2Key: "Exp9" },
    ];
  } else if (lp === 9 && exp === 6) {
    return [
      { db1Key: "Exp1", db2Key: "Exp2" },
      { db1Key: "Exp3", db2Key: "Exp9" },
      { db1Key: "Exp4", db2Key: "Exp8" },
      { db1Key: "Exp5", db2Key: "Exp7" },
      { db1Key: "Exp6", db2Key: "Exp6" },
    ];
  }
  // Kondisi 8
  else if (
    (lp === 1 && exp === 8) ||
    (lp === 2 && exp === 9) ||
    (lp === 3 && exp === 1) ||
    (lp === 4 && exp === 2)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp5" },
      { db1Key: "Exp2", db2Key: "Exp4" },
      { db1Key: "Exp3", db2Key: "Exp3" },
      { db1Key: "Exp6", db2Key: "Exp9" },
      { db1Key: "Exp7", db2Key: "Exp8" },
      { db1Key: "Exp1", db2Key: "Exp1" },
      { db1Key: "Exp2", db2Key: "Exp9" },
      { db1Key: "Exp3", db2Key: "Exp8" },
      { db1Key: "Exp4", db2Key: "Exp7" },
      { db1Key: "Exp5", db2Key: "Exp6" },
    ];
  } else if ((lp === 5 && exp === 3) || (lp === 6 && exp === 4)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp6" },
      { db1Key: "Exp2", db2Key: "Exp5" },
      { db1Key: "Exp3", db2Key: "Exp4" },
      { db1Key: "Exp7", db2Key: "Exp9" },
      { db1Key: "Exp8", db2Key: "Exp8" },
      { db1Key: "Exp1", db2Key: "Exp1" },
      { db1Key: "Exp2", db2Key: "Exp9" },
      { db1Key: "Exp3", db2Key: "Exp8" },
      { db1Key: "Exp4", db2Key: "Exp7" },
      { db1Key: "Exp5", db2Key: "Exp6" },
    ];
  } else if ((lp === 7 && exp === 5) || (lp === 8 && exp === 6)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp6" },
      { db1Key: "Exp2", db2Key: "Exp5" },
      { db1Key: "Exp3", db2Key: "Exp4" },
      { db1Key: "Exp7", db2Key: "Exp9" },
      { db1Key: "Exp8", db2Key: "Exp8" },
    ];
  } else if (lp === 9 && exp === 7) {
    return [
      { db1Key: "Exp1", db2Key: "Exp1" },
      { db1Key: "Exp2", db2Key: "Exp9" },
      { db1Key: "Exp3", db2Key: "Exp8" },
      { db1Key: "Exp4", db2Key: "Exp7" },
      { db1Key: "Exp5", db2Key: "Exp6" },
    ];
  }
  // Kondisi 9
  else if (
    (lp === 1 && exp === 9) ||
    (lp === 2 && exp === 1) ||
    (lp === 3 && exp === 2) ||
    (lp === 4 && exp === 3)
  ) {
    return [
      { db1Key: "Exp1", db2Key: "Exp4" },
      { db1Key: "Exp2", db2Key: "Exp3" },
      { db1Key: "Exp5", db2Key: "Exp9" },
      { db1Key: "Exp6", db2Key: "Exp8" },
      { db1Key: "Exp7", db2Key: "Exp7" },
      { db1Key: "Exp1", db2Key: "Exp9" },
      { db1Key: "Exp2", db2Key: "Exp8" },
      { db1Key: "Exp3", db2Key: "Exp7" },
      { db1Key: "Exp4", db2Key: "Exp6" },
      { db1Key: "Exp5", db2Key: "Exp5" },
    ];
  } else if ((lp === 5 && exp === 4) || (lp === 6 && exp === 5)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp5" },
      { db1Key: "Exp2", db2Key: "Exp4" },
      { db1Key: "Exp3", db2Key: "Exp3" },
      { db1Key: "Exp6", db2Key: "Exp9" },
      { db1Key: "Exp7", db2Key: "Exp8" },
      { db1Key: "Exp1", db2Key: "Exp9" },
      { db1Key: "Exp2", db2Key: "Exp8" },
      { db1Key: "Exp3", db2Key: "Exp7" },
      { db1Key: "Exp4", db2Key: "Exp6" },
      { db1Key: "Exp5", db2Key: "Exp5" },
    ];
  } else if ((lp === 7 && exp === 6) || (lp === 8 && exp === 7)) {
    return [
      { db1Key: "Exp1", db2Key: "Exp5" },
      { db1Key: "Exp2", db2Key: "Exp4" },
      { db1Key: "Exp3", db2Key: "Exp3" },
      { db1Key: "Exp6", db2Key: "Exp9" },
      { db1Key: "Exp7", db2Key: "Exp8" },
    ];
  } else if (lp === 9 && exp === 8) {
    return [
      { db1Key: "Exp1", db2Key: "Exp9" },
      { db1Key: "Exp2", db2Key: "Exp8" },
      { db1Key: "Exp3", db2Key: "Exp7" },
      { db1Key: "Exp4", db2Key: "Exp6" },
      { db1Key: "Exp5", db2Key: "Exp5" },
    ];
  }
  // Add more conditions as needed...
  else {
    return [];
  }
};

// Generate combination names based on specific pattern combinations
export const generateCombiNames = (
  baseFirstName: string,
  targetPatterns: { [key: string]: number },
  nameDatabase: string[],
  maxResults: number = 10,
): string[] => {
  const results: string[] = [];
  const normalizedBase = normalisasiNama(baseFirstName);

  // Filter names from database that match specific pattern combinations
  nameDatabase.forEach((name) => {
    if (results.length >= maxResults) return;

    const normalizedName = normalisasiNama(name);
    const combinedName = `${normalizedBase} ${normalizedName}`;

    // Calculate pattern for the combined name
    const pattern = getPola(combinedName, new Date());

    // Check if all target patterns are matched
    const matches = Object.entries(targetPatterns).every(([key, value]) => {
      if (
        key in pattern &&
        typeof pattern[key as keyof typeof pattern] === "number"
      ) {
        return pattern[key as keyof typeof pattern] === value;
      }
      return false;
    });

    if (matches) {
      results.push(combinedName);
    }
  });

  return results;
};

// Generate names with balanced numerology values
export const generateBalancedNames = (
  baseFirstName: string,
  nameDatabase: string[],
  maxResults: number = 10,
): string[] => {
  const results: string[] = [];
  const normalizedBase = normalisasiNama(baseFirstName);
  const scoredNames: { name: string; score: number }[] = [];

  // Calculate balance score for each potential name
  nameDatabase.forEach((name) => {
    const normalizedName = normalisasiNama(name);
    const combinedName = `${normalizedBase} ${normalizedName}`;

    // Calculate pattern
    const pattern = getPola(combinedName, new Date());

    // Calculate balance score (lower is better)
    // This checks how evenly distributed the intensity numbers are
    let balanceScore = 0;
    const intensityValues = Object.values(pattern.angka_intensitas);
    const avgIntensity =
      intensityValues.reduce((a, b) => a + b, 0) / intensityValues.length;

    intensityValues.forEach((value) => {
      balanceScore += Math.abs(value - avgIntensity);
    });

    scoredNames.push({
      name: combinedName,
      score: balanceScore,
    });
  });

  // Sort by balance score (ascending)
  scoredNames.sort((a, b) => a.score - b.score);

  // Return top results
  return scoredNames.slice(0, maxResults).map((item) => item.name);
};

// Generate names with high synchronize value
export const generateSynchronizedNames = (
  baseFirstName: string,
  birthdate: Date,
  gender: "Male" | "Female",
  nameDatabase: string[],
  maxResults: number = 10,
): string[] => {
  const scoredNames: { name: string; synchronize: number }[] = [];
  const normalizedBase = normalisasiNama(baseFirstName);

  // Calculate synchronize value for each potential name
  nameDatabase.forEach((name) => {
    const normalizedName = normalisasiNama(name);
    const combinedName = `${normalizedBase} ${normalizedName}`;

    // Calculate pattern with the given birthdate and gender
    const pattern = getPola(combinedName, birthdate, gender);

    scoredNames.push({
      name: combinedName,
      synchronize: pattern.synchronize,
    });
  });

  // Sort by synchronize value (descending)
  scoredNames.sort((a, b) => b.synchronize - a.synchronize);

  // Return top results
  return scoredNames.slice(0, maxResults).map((item) => item.name);
};
