import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import NumerologyResults from "./NumerologyResults";
import { Picker } from "@react-native-picker/picker";
import {
  normalisasiNama,
  hitungNilaiNumerologi,
  reduksiAngka,
  generateComplexNames,
  generateCombiNames,
  generateBalancedNames,
  generateSynchronizedNames,
  getPola,
  calculateGrafologiIndex,
  languageDatabases,
  complexState,
  resetComplexState,
  generateNameVariations,
  calculateMetricsForNameBasic,
  getDatabaseKeysForComplex,
  ComplexSearchState,
  combiState,
  resetCombiState,
  getDatabasePairsForCombi,
  CombiState,
  searchNameDictionary,
  getAvailableLanguages,
} from "../utils/numerologyUtils";

interface NameGeneratorProps {
  isPremium?: boolean;
  nameDatabase?: string[];
  analysisName?: string;
  analysisBirthdate?: Date;
  analysisGender?: "Male" | "Female";
}

// Sample name database for demonstration
const SAMPLE_NAMES = [
  "Aditya",
  "Budi",
  "Citra",
  "Dewi",
  "Eka",
  "Farhan",
  "Gita",
  "Hadi",
  "Indah",
  "Joko",
  "Kartika",
  "Lina",
  "Mira",
  "Nadia",
  "Oscar",
  "Putri",
  "Qori",
  "Rini",
  "Surya",
  "Tono",
  "Utami",
  "Vina",
  "Wayan",
  "Xavier",
  "Yanti",
  "Zainal",
  "Anisa",
  "Bayu",
  "Cahya",
  "Dian",
  "Emma",
  "Fajar",
  "Gading",
  "Hana",
  "Irfan",
  "Julia",
  "Krisna",
  "Laras",
  "Maya",
  "Nina",
];

// Sample language options with flag emojis
const LANGUAGE_OPTIONS = [
  { id: "id", name: "Indonesian", flag: "🇮🇩" },
  { id: "en", name: "English", flag: "🇺🇸" },
  { id: "ar", name: "Arabic", flag: "🇸🇦" },
  { id: "jp", name: "Japanese", flag: "🇯🇵" },
  { id: "cn", name: "Chinese", flag: "🇨🇳" },
];

export default function NameGenerator({
  isPremium = false,
  nameDatabase = SAMPLE_NAMES,
  analysisName = "",
  analysisBirthdate = null,
  analysisGender = "Male",
}: NameGeneratorProps) {
  const [baseFirstName, setBaseFirstName] = useState(analysisName || "");
  const [targetNumber, setTargetNumber] = useState("1");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(["id"]);
  const [nameType, setNameType] = useState("personal"); // 'personal' or 'baby'
  const [generationMode, setGenerationMode] = useState<"combi" | "advanced">(
    "advanced",
  );

  // Advanced search states
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  const [userBirthdate, setUserBirthdate] = useState(
    analysisBirthdate
      ? `${analysisBirthdate.getDate().toString().padStart(2, "0")}/${(analysisBirthdate.getMonth() + 1).toString().padStart(2, "0")}/${analysisBirthdate.getFullYear()}`
      : "",
  );
  const [userGender, setUserGender] = useState<"Male" | "Female">(
    analysisGender || "Male",
  );
  const [targetHara, setTargetHara] = useState<string>("all");
  const [targetCoherence, setTargetCoherence] = useState("70");
  const [targetMomenSukses, setTargetMomenSukses] = useState("80");
  const [targetDeskripsi, setTargetDeskripsi] = useState("");
  const [startingLetter, setStartingLetter] = useState("");
  const [firstWordFilter, setFirstWordFilter] = useState("");
  const [secondWordFilter, setSecondWordFilter] = useState("");
  const [advancedResults, setAdvancedResults] = useState<any[]>([]);
  const [searchProgress, setSearchProgress] = useState("");
  const [isAdvancedSearching, setIsAdvancedSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Full screen and analysis states
  const [showFullScreenResults, setShowFullScreenResults] = useState(false);
  const [selectedNameForAnalysis, setSelectedNameForAnalysis] = useState<
    string | null
  >(null);
  const [selectedNameBirthdate, setSelectedNameBirthdate] =
    useState<Date | null>(null);
  const [selectedNameGender, setSelectedNameGender] = useState<
    "Male" | "Female"
  >("Male");

  // Combi search states
  const [combiResults, setCombiResults] = useState<any[]>([]);
  const [combiProgress, setCombiProgress] = useState("");
  const [isCombiSearching, setIsCombiSearching] = useState(false);
  const combiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Combi mode states
  const [targetPatterns, setTargetPatterns] = useState<{
    [key: string]: number;
  }>({});
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [selectedPatternValue, setSelectedPatternValue] = useState<number>(1);

  const toggleLanguage = (langId: string) => {
    if (isPremium) {
      setSelectedLanguages((prev) =>
        prev.includes(langId)
          ? prev.filter((id) => id !== langId)
          : [...prev, langId],
      );
    } else {
      setSelectedLanguages(["id"]); // Free users can only use Indonesian
    }
  };

  const handleAddTargetPattern = () => {
    if (selectedPattern && selectedPatternValue) {
      setTargetPatterns({
        ...targetPatterns,
        [selectedPattern]: selectedPatternValue,
      });
      setSelectedPattern(null);
      setSelectedPatternValue(1);
    }
  };

  const handleRemoveTargetPattern = (key: string) => {
    const newPatterns = { ...targetPatterns };
    delete newPatterns[key];
    setTargetPatterns(newPatterns);
  };

  const generateNames = () => {
    if (!baseFirstName.trim()) return;

    setIsGenerating(true);

    // Simulate processing time
    setTimeout(() => {
      let results: string[] = [];

      if (generationMode === "combi") {
        // For Combi mode, we'll use the advanced search modal instead
        setShowAdvancedModal(true);
        setIsGenerating(false);
        return;
      } else {
        // Generate names based on selected languages
        results = generateNamesForSelectedLanguages();
      }

      setGeneratedNames(results);
      setIsGenerating(false);
    }, 1000);
  };

  const generateNamesForSelectedLanguages = (): string[] => {
    const results: string[] = [];
    const targetNum = parseInt(targetNumber);

    // Generate names based on selected languages
    selectedLanguages.forEach((langId) => {
      const langOption = LANGUAGE_OPTIONS.find((opt) => opt.id === langId);
      if (langOption) {
        // Filter names from database based on language
        const filteredNames = nameDatabase.filter((name) => {
          // Simple logic to associate names with languages
          // This can be enhanced with actual language-specific databases
          if (langId === "id") return true; // Indonesian names (default)
          if (langId === "en") return /^[A-Za-z]+$/.test(name); // English names
          if (langId === "ar") return name.length > 4; // Arabic-style names
          if (langId === "jp") return name.length <= 5; // Japanese-style names
          if (langId === "cn") return name.length <= 4; // Chinese-style names
          return true;
        });

        // Generate variations with the base name
        filteredNames.slice(0, 5).forEach((name) => {
          if (baseFirstName.trim()) {
            results.push(`${baseFirstName.trim()} ${name}`);
            results.push(`${name} ${baseFirstName.trim()}`);
          } else {
            results.push(name);
          }
        });
      }
    });

    // Remove duplicates and limit results
    return [...new Set(results)].slice(0, 20);
  };

  const runAdvancedSearch = () => {
    if (generationMode === "combi") {
      runCombiSearch();
      return;
    }

    if (!baseFirstName.trim() || !userBirthdate.trim()) {
      alert("Nama dan Tanggal Lahir wajib diisi untuk pencarian lanjutan.");
      return;
    }

    // Calculate initial Life Path and Expression
    try {
      const [day, month, year] = userBirthdate.split("/").map(Number);
      if (!day || !month || !year) {
        alert("Format tanggal lahir tidak valid. Gunakan DD/MM/YYYY");
        return;
      }

      const birthdateObj = new Date(year, month - 1, day);
      const patterns = getPola(baseFirstName, birthdateObj, userGender);
      const initialLifePath = patterns.time;
      const initialExpression = patterns.destiny;

      if (!initialLifePath || !initialExpression) {
        alert("Gagal menghitung Life Path dan Expression. Periksa input Anda.");
        return;
      }

      setIsAdvancedSearching(true);
      setSearchProgress("Mempersiapkan pencarian lanjutan...");

      // Only reset results and state if this is a new search (not continuing)
      if (
        !complexState.isInitialized ||
        complexState.isFinishedCurrentSequence
      ) {
        setAdvancedResults([]);
        // Get database keys based on LP and Expression
        const dbKeys = getDatabaseKeysForComplex(
          initialLifePath,
          initialExpression,
        );
        if (dbKeys.length === 0) {
          setSearchProgress(
            `Tidak ada database yang sesuai untuk LP ${initialLifePath} & Exp ${initialExpression}`,
          );
          setIsAdvancedSearching(false);
          return;
        }

        // Reset complex state for new search
        resetComplexState();
        complexState.currentDatabaseList = [...dbKeys];
        // Map selected languages to language database keys
        const getLanguageKey = (langId: string) => {
          switch (langId) {
            case "id":
              return "id";
            case "en":
              return "en";
            case "ar":
              return "id"; // Arabic uses Indonesian database for now
            case "jp":
              return "id"; // Japanese uses Indonesian database for now
            case "cn":
              return "id"; // Chinese uses Indonesian database for now
            default:
              return "id";
          }
        };
        // Use the first selected language or default to "id"
        complexState.language = getLanguageKey(
          selectedLanguages.length > 0 ? selectedLanguages[0] : "id",
        );
        complexState.isInitialized = true;
      } else {
        // Continue from where we left off
        setSearchProgress("Melanjutkan pencarian dari posisi sebelumnya...");
      }

      // Start batch processing
      processAdvancedSearchBatch();
    } catch (error) {
      alert("Terjadi kesalahan dalam memproses data. Periksa input Anda.");
      setIsAdvancedSearching(false);
    }
  };

  const runCombiSearch = () => {
    if (!baseFirstName.trim() || !userBirthdate.trim()) {
      alert("Nama dan Tanggal Lahir wajib diisi untuk pencarian Combi.");
      return;
    }

    try {
      const [day, month, year] = userBirthdate.split("/").map(Number);
      if (!day || !month || !year) {
        alert("Format tanggal lahir tidak valid. Gunakan DD/MM/YYYY");
        return;
      }

      const birthdateObj = new Date(year, month - 1, day);
      const patterns = getPola(baseFirstName, birthdateObj, userGender);
      const initialLifePath = patterns.time;
      const initialExpression = patterns.destiny;

      if (!initialLifePath || !initialExpression) {
        alert("Gagal menghitung Life Path dan Expression. Periksa input Anda.");
        return;
      }

      setIsCombiSearching(true);
      setCombiProgress("Mempersiapkan pencarian Combi...");

      // Get database pairs for Combi
      const dbPairs = getDatabasePairsForCombi(
        initialLifePath,
        initialExpression,
      );
      if (dbPairs.length === 0) {
        setCombiProgress(
          `Tidak ada pasangan database Exp untuk LP ${initialLifePath} & Exp ${initialExpression}`,
        );
        setIsCombiSearching(false);
        return;
      }

      // Check if we need to reset or continue
      const currentDbPairListString = dbPairs
        .map((p) => `${p.db1Key}-${p.db2Key}`)
        .join(",");
      const previousDbPairListString = combiState.currentDatabasePairList
        .map((p) => `${p.db1Key}-${p.db2Key}`)
        .join(",");

      if (
        currentDbPairListString !== previousDbPairListString ||
        combiState.isFinishedCurrentPairSequence
      ) {
        resetCombiState();
        combiState.currentDatabasePairList = [...dbPairs];
        // Map selected languages to language database keys
        const getLanguageKey = (langId: string) => {
          switch (langId) {
            case "id":
              return "id";
            case "en":
              return "en";
            case "ar":
              return "id"; // Arabic uses Indonesian database for now
            case "jp":
              return "id"; // Japanese uses Indonesian database for now
            case "cn":
              return "id"; // Chinese uses Indonesian database for now
            default:
              return "id";
          }
        };
        // Use the first selected language or default to "id"
        combiState.language = getLanguageKey(
          selectedLanguages.length > 0 ? selectedLanguages[0] : "id",
        );
        combiState.isFinishedCurrentPairSequence = false;
        // Don't reset combiResults here to accumulate results
        // setCombiResults([]);
      }

      if (
        combiState.foundNamesThisOverallRun.length >= 10 &&
        !combiState.isFinishedCurrentPairSequence
      ) {
        combiState.foundNamesThisOverallRun = [];
      }

      // Start batch processing
      processCombiSearchBatch();
    } catch (error) {
      alert(
        "Terjadi kesalahan dalam memproses data Combi. Periksa input Anda.",
      );
      setIsCombiSearching(false);
    }
  };

  const processAdvancedSearchBatch = () => {
    const BATCH_PROCESSING_LIMIT_MS = 150;
    const MAX_RESULTS_PER_CLICK = 10;
    const startTime = Date.now();

    // Track how many new results we found in this batch
    const initialResultCount = advancedResults.length;
    let newResultsFound = 0;

    const processBatch = () => {
      while (
        newResultsFound < MAX_RESULTS_PER_CLICK &&
        !complexState.isFinishedCurrentSequence
      ) {
        if (Date.now() - startTime > BATCH_PROCESSING_LIMIT_MS) {
          setSearchProgress(
            `Memproses... Total variasi dicek: ${complexState.totalVariationsChecked}`,
          );
          searchTimeoutRef.current = setTimeout(processBatch, 0);
          return;
        }

        if (
          complexState.currentVariationIndex >=
          complexState.currentVariations.length
        ) {
          complexState.currentVariationIndex = 0;
          complexState.currentVariations = [];

          // Try all selected languages if multiple are selected
          let selectedDatabase = null;
          const currentDbKey =
            complexState.currentDatabaseList[
              complexState.currentDbIndexInSequence
            ];

          // If multiple languages are selected, try each one
          if (selectedLanguages.length > 1) {
            for (const langId of selectedLanguages) {
              const langKey =
                langId === "id" ? "id" : langId === "en" ? "en" : "id";
              if (
                languageDatabases[langKey] &&
                languageDatabases[langKey][currentDbKey]
              ) {
                selectedDatabase = languageDatabases[langKey][currentDbKey];
                break;
              }
            }
          } else {
            // Single language selection
            selectedDatabase =
              currentDbKey && languageDatabases[complexState.language]
                ? languageDatabases[complexState.language][currentDbKey]
                : null;
          }

          // Apply starting letter filter if specified (for advanced mode)
          if (selectedDatabase && startingLetter.trim()) {
            const filterLetter = startingLetter.trim().toUpperCase();
            selectedDatabase = selectedDatabase.filter((word: string) =>
              word.toUpperCase().startsWith(filterLetter),
            );
          }

          while (
            !selectedDatabase ||
            complexState.currentIndexInDb >= selectedDatabase.length
          ) {
            complexState.currentIndexInDb = 0;
            complexState.currentDbIndexInSequence++;
            if (
              complexState.currentDbIndexInSequence >=
              complexState.currentDatabaseList.length
            ) {
              complexState.isFinishedCurrentSequence = true;
              break;
            }
            const nextDbKey =
              complexState.currentDatabaseList[
                complexState.currentDbIndexInSequence
              ];

            // Try all selected languages for the next database
            selectedDatabase = null;
            if (selectedLanguages.length > 1) {
              for (const langId of selectedLanguages) {
                const langKey =
                  langId === "id" ? "id" : langId === "en" ? "en" : "id";
                if (
                  languageDatabases[langKey] &&
                  languageDatabases[langKey][nextDbKey]
                ) {
                  selectedDatabase = languageDatabases[langKey][nextDbKey];
                  break;
                }
              }
            } else {
              selectedDatabase =
                nextDbKey && languageDatabases[complexState.language]
                  ? languageDatabases[complexState.language][nextDbKey]
                  : null;
            }

            // Apply starting letter filter if specified
            if (selectedDatabase && startingLetter.trim()) {
              const filterLetter = startingLetter.trim().toUpperCase();
              selectedDatabase = selectedDatabase.filter((word: string) =>
                word.toUpperCase().startsWith(filterLetter),
              );
            }

            if (!selectedDatabase || selectedDatabase.length === 0) {
              continue;
            }
          }

          if (complexState.isFinishedCurrentSequence) break;

          const wordToAdd = selectedDatabase[complexState.currentIndexInDb];
          if (wordToAdd) {
            complexState.currentVariations = generateNameVariations(
              baseFirstName,
              [wordToAdd],
            );
          }
          complexState.currentIndexInDb++;
        }

        if (
          complexState.currentVariationIndex <
          complexState.currentVariations.length
        ) {
          const newName =
            complexState.currentVariations[complexState.currentVariationIndex];
          complexState.totalVariationsChecked++;
          const metrics = calculateMetricsForNameBasic(
            newName,
            userBirthdate,
            userGender,
          );

          if (metrics) {
            let match = true;

            // Check Hara filter
            if (targetHara !== "all") {
              const targetHaraNum = parseInt(targetHara);
              if (
                ![1, 2, 3, 4, 6].includes(targetHaraNum) ||
                metrics.hara !== targetHaraNum
              ) {
                match = false;
              }
            } else {
              if (![1, 2, 3, 4, 6].includes(metrics.hara)) {
                match = false;
              }
            }

            // Check Synchronize (locked at 100%)
            const syncNum = parseFloat(
              metrics.sync.toString().replace("%", ""),
            );
            if (syncNum < 100) match = false;

            // Check Coherence (convert percentage string to number)
            const targetCoherenceVal = parseFloat(targetCoherence);
            const coherenceNum = parseFloat(metrics.coherence.replace("%", ""));
            if (coherenceNum < targetCoherenceVal) match = false;

            // Check Momen Sukses (handle both percentage and decimal formats)
            const targetMomenSuksesVal = parseFloat(targetMomenSukses);
            let momenSuksesNum = 0;
            if (metrics.momenSukses === "1+") {
              momenSuksesNum = 100; // Treat "1+" as 100%
            } else {
              const momenSuksesFloat = parseFloat(metrics.momenSukses);
              // Convert decimal to percentage (multiply by 100)
              momenSuksesNum = momenSuksesFloat * 100;
            }
            if (momenSuksesNum < targetMomenSuksesVal) match = false;

            // Check Grafologi (locked at 100%)
            if (metrics.grafologiIndex !== "100%") match = false;

            // Check Target Deskripsi
            if (targetDeskripsi && metrics.saranAngka) {
              const targetAngkaSaran = parseInt(targetDeskripsi);
              if (!metrics.saranAngka.includes(targetAngkaSaran)) match = false;
            }

            if (match) {
              const newResult = {
                name: newName,
                hara: metrics.hara,
                sync: metrics.sync,
                coherence: metrics.coherence,
                synergize: metrics.synergize,
                productive: metrics.productive,
                momenSukses: metrics.momenSukses,
                grafologiIndex: metrics.grafologiIndex,
                saranAngka: metrics.saranAngka,
              };

              // Check if this result already exists to avoid duplicates
              const isDuplicate = advancedResults.some(
                (result) => result.name === newName,
              );
              if (!isDuplicate) {
                complexState.foundNamesThisOverallRun.push(newResult);
                newResultsFound++;
              }
            }
          }
          complexState.currentVariationIndex++;
        }
      }

      // Update results with all found names (previous + new)
      setAdvancedResults([...complexState.foundNamesThisOverallRun]);

      if (complexState.isFinishedCurrentSequence) {
        if (complexState.foundNamesThisOverallRun.length === 0) {
          setSearchProgress(
            `Pencarian selesai. Tidak ada nama yang cocok dari ${complexState.totalVariationsChecked} variasi.`,
          );
        } else {
          setSearchProgress(
            `Pencarian selesai. Total ditemukan ${complexState.foundNamesThisOverallRun.length} nama dari ${complexState.totalVariationsChecked} variasi.`,
          );
        }
        setIsAdvancedSearching(false);
      } else if (newResultsFound >= MAX_RESULTS_PER_CLICK) {
        setSearchProgress(
          `Menampilkan ${complexState.foundNamesThisOverallRun.length} hasil total. Klik lagi untuk hasil berikutnya.`,
        );
        setIsAdvancedSearching(false);
      } else {
        setSearchProgress(
          `Melanjutkan pencarian... Total ditemukan ${complexState.foundNamesThisOverallRun.length} dari ${complexState.totalVariationsChecked} variasi.`,
        );
        searchTimeoutRef.current = setTimeout(processBatch, 0);
      }
    };

    searchTimeoutRef.current = setTimeout(processBatch, 20);
  };

  const processCombiSearchBatch = () => {
    const BATCH_PROCESSING_LIMIT_MS = 150;
    const MAX_RESULTS_PER_CLICK = 10;
    const startTime = Date.now();

    // Calculate target results based on current results count
    const currentResultsCount = combiResults.length;
    const targetResultsCount = currentResultsCount + MAX_RESULTS_PER_CLICK;
    let newResultsFound = 0;

    const processBatch = () => {
      while (
        combiState.foundNamesThisOverallRun.length < targetResultsCount &&
        !combiState.isFinishedCurrentPairSequence
      ) {
        if (Date.now() - startTime > BATCH_PROCESSING_LIMIT_MS) {
          setCombiProgress(
            `Memproses... Total kombinasi dicek: ${combiState.totalCombinationsChecked}`,
          );
          combiTimeoutRef.current = setTimeout(processBatch, 0);
          return;
        }

        if (
          combiState.currentVariationIndex >=
          combiState.currentVariations.length
        ) {
          combiState.currentVariationIndex = 0;
          combiState.currentVariations = [];

          const currentDbPair =
            combiState.currentDatabasePairList[
              combiState.currentDbPairIndexInSequence
            ];
          if (!currentDbPair) {
            combiState.isFinishedCurrentPairSequence = true;
            break;
          }

          // Try all selected languages if multiple are selected
          let db1 = null;
          let db2 = null;

          if (selectedLanguages.length > 1) {
            // Try each selected language until we find databases
            for (const langId of selectedLanguages) {
              const langKey =
                langId === "id" ? "id" : langId === "en" ? "en" : "id";
              if (languageDatabases[langKey]) {
                const tempDb1 =
                  languageDatabases[langKey][currentDbPair.db1Key];
                const tempDb2 =
                  languageDatabases[langKey][currentDbPair.db2Key];
                if (tempDb1 && tempDb2) {
                  db1 = tempDb1;
                  db2 = tempDb2;
                  break;
                }
              }
            }
          } else {
            // Single language selection
            db1 =
              languageDatabases[combiState.language]?.[currentDbPair.db1Key];
            db2 =
              languageDatabases[combiState.language]?.[currentDbPair.db2Key];
          }

          // Apply starting letter filters if specified (for combi mode)
          if (firstWordFilter.trim()) {
            const filterLetter = firstWordFilter.trim().toUpperCase();
            if (db1) {
              db1 = db1.filter((word: string) =>
                word.toUpperCase().startsWith(filterLetter),
              );
            }
          }
          if (secondWordFilter.trim()) {
            const filterLetter = secondWordFilter.trim().toUpperCase();
            if (db2) {
              db2 = db2.filter((word: string) =>
                word.toUpperCase().startsWith(filterLetter),
              );
            }
          }

          while (
            !db1 ||
            !db2 ||
            db1.length === 0 ||
            db2.length === 0 ||
            combiState.currentWord1IndexInDb >= db1.length
          ) {
            if (
              !db1 ||
              db1.length === 0 ||
              combiState.currentWord1IndexInDb >= db1.length
            ) {
              combiState.currentWord1IndexInDb = 0;
              combiState.currentWord2IndexInDb = 0;
              combiState.currentDbPairIndexInSequence++;
              if (
                combiState.currentDbPairIndexInSequence >=
                combiState.currentDatabasePairList.length
              ) {
                combiState.isFinishedCurrentPairSequence = true;
                break;
              }
              const nextDbPair =
                combiState.currentDatabasePairList[
                  combiState.currentDbPairIndexInSequence
                ];
              if (!nextDbPair) {
                combiState.isFinishedCurrentPairSequence = true;
                break;
              }

              // Try all selected languages for the next database pair
              db1 = null;
              db2 = null;
              if (selectedLanguages.length > 1) {
                for (const langId of selectedLanguages) {
                  const langKey =
                    langId === "id" ? "id" : langId === "en" ? "en" : "id";
                  if (languageDatabases[langKey]) {
                    const tempDb1 =
                      languageDatabases[langKey][nextDbPair.db1Key];
                    const tempDb2 =
                      languageDatabases[langKey][nextDbPair.db2Key];
                    if (tempDb1 && tempDb2) {
                      db1 = tempDb1;
                      db2 = tempDb2;
                      break;
                    }
                  }
                }
              } else {
                db1 =
                  languageDatabases[combiState.language]?.[nextDbPair.db1Key];
                db2 =
                  languageDatabases[combiState.language]?.[nextDbPair.db2Key];
              }

              // Apply starting letter filter if specified
              if (startingLetter.trim()) {
                const filterLetter = startingLetter.trim().toUpperCase();
                if (db1) {
                  db1 = db1.filter((word: string) =>
                    word.toUpperCase().startsWith(filterLetter),
                  );
                }
                if (db2) {
                  db2 = db2.filter((word: string) =>
                    word.toUpperCase().startsWith(filterLetter),
                  );
                }
              }
            } else {
              combiState.currentWord2IndexInDb = 0;
              combiState.currentWord1IndexInDb++;
              if (combiState.currentWord1IndexInDb >= db1.length) {
                continue;
              }
            }
            if (combiState.isFinishedCurrentPairSequence) break;
          }
          if (combiState.isFinishedCurrentPairSequence) break;

          const word1 = db1[combiState.currentWord1IndexInDb];
          const word2 = db2[combiState.currentWord2IndexInDb];

          if (word1 && word2) {
            combiState.currentVariations = generateNameVariations(
              baseFirstName,
              [word1, word2],
            );
          }

          combiState.currentWord2IndexInDb++;
          if (combiState.currentWord2IndexInDb >= db2.length) {
            combiState.currentWord2IndexInDb = 0;
            combiState.currentWord1IndexInDb++;
          }
        }

        if (
          combiState.currentVariationIndex < combiState.currentVariations.length
        ) {
          const newName =
            combiState.currentVariations[combiState.currentVariationIndex];
          combiState.totalCombinationsChecked++;
          const metrics = calculateMetricsForNameBasic(
            newName,
            userBirthdate,
            userGender,
          );

          if (metrics) {
            let match = true;

            // Apply filters
            const validHaraValues =
              targetHara === "all" ? [1, 2, 3, 4, 6] : [parseInt(targetHara)];
            if (!validHaraValues.includes(metrics.hara)) match = false;

            // Check Synchronize (locked at 100%)
            const syncNum = parseFloat(
              metrics.sync.toString().replace("%", ""),
            );
            if (syncNum < 100) match = false;

            // Check Coherence (convert percentage string to number)
            const targetCoherenceVal = parseFloat(targetCoherence);
            const coherenceNum = parseFloat(metrics.coherence.replace("%", ""));
            if (coherenceNum < targetCoherenceVal) match = false;

            // Check Momen Sukses (handle both percentage and decimal formats)
            const targetMomenSuksesVal = parseFloat(targetMomenSukses);
            let momenSuksesNum = 0;
            if (metrics.momenSukses === "1+") {
              momenSuksesNum = 100; // Treat "1+" as 100%
            } else {
              const momenSuksesFloat = parseFloat(metrics.momenSukses);
              // Convert decimal to percentage (multiply by 100)
              momenSuksesNum = momenSuksesFloat * 100;
            }
            if (momenSuksesNum < targetMomenSuksesVal) match = false;

            // Check Grafologi (locked at 100%)
            if (metrics.grafologiIndex !== "100%") match = false;

            if (targetDeskripsi && metrics.saranAngka) {
              const targetAngkaSaran = parseInt(targetDeskripsi);
              if (!metrics.saranAngka.includes(targetAngkaSaran)) match = false;
            }

            if (match) {
              const isDuplicate = combiState.foundNamesThisOverallRun.some(
                (result) => result.name === newName,
              );
              if (!isDuplicate) {
                combiState.foundNamesThisOverallRun.push({
                  name: newName,
                  hara: metrics.hara,
                  sync: metrics.sync,
                  coherence: metrics.coherence,
                  synergize: metrics.synergize,
                  productive: metrics.productive,
                  momenSukses: metrics.momenSukses,
                  grafologiIndex: metrics.grafologiIndex,
                  saranAngka: metrics.saranAngka,
                });
              }
            }
          }
          combiState.currentVariationIndex++;
        }
      }

      // Update results with all found names (accumulate from state)
      setCombiResults([...combiState.foundNamesThisOverallRun]);

      if (combiState.isFinishedCurrentPairSequence) {
        if (combiState.foundNamesThisOverallRun.length === 0) {
          setCombiProgress(
            `Pencarian Combi selesai. Tidak ada nama yang cocok dari ${combiState.totalCombinationsChecked} kombinasi.`,
          );
        } else {
          setCombiProgress(
            `Pencarian Combi selesai. Total ditemukan ${combiState.foundNamesThisOverallRun.length} nama dari ${combiState.totalCombinationsChecked} kombinasi.`,
          );
        }
        setIsCombiSearching(false);
      } else if (
        combiState.foundNamesThisOverallRun.length >= targetResultsCount
      ) {
        setCombiProgress(
          `Menampilkan ${combiState.foundNamesThisOverallRun.length} hasil total. Klik lagi untuk hasil berikutnya.`,
        );
        setIsCombiSearching(false);
      } else {
        setCombiProgress(
          `Melanjutkan pencarian Combi... Total ditemukan ${combiState.foundNamesThisOverallRun.length} dari ${combiState.totalCombinationsChecked} kombinasi.`,
        );
        combiTimeoutRef.current = setTimeout(processBatch, 0);
      }
    };

    combiTimeoutRef.current = setTimeout(processBatch, 20);
  };

  const stopAdvancedSearch = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    if (combiTimeoutRef.current) {
      clearTimeout(combiTimeoutRef.current);
      combiTimeoutRef.current = null;
    }
    setIsAdvancedSearching(false);
    setIsCombiSearching(false);
    setSearchProgress("Pencarian dihentikan.");
    setCombiProgress("Pencarian Combi dihentikan.");
  };

  const clearAdvancedResults = () => {
    setAdvancedResults([]);
    resetComplexState();
    setSearchProgress("");
  };

  const clearCombiResults = () => {
    setCombiResults([]);
    resetCombiState();
    setCombiProgress("");
  };

  const handleNameClick = (name: string) => {
    if (!userBirthdate.trim()) {
      alert("Tanggal lahir diperlukan untuk analisis nama.");
      return;
    }

    try {
      const [day, month, year] = userBirthdate.split("/").map(Number);
      if (!day || !month || !year) {
        alert("Format tanggal lahir tidak valid. Gunakan DD/MM/YYYY");
        return;
      }

      const birthdateObj = new Date(year, month - 1, day);
      setSelectedNameForAnalysis(name);
      setSelectedNameBirthdate(birthdateObj);
      setSelectedNameGender(userGender);
    } catch (error) {
      alert("Terjadi kesalahan dalam memproses tanggal lahir.");
    }
  };

  const handleBackToResults = () => {
    setSelectedNameForAnalysis(null);
    setSelectedNameBirthdate(null);
  };

  const handleShowFullScreenResults = () => {
    setShowFullScreenResults(true);
  };

  const handleBackToModal = () => {
    setShowFullScreenResults(false);
  };

  const renderGenerationModeSelector = () => (
    <View className="mb-4">
      <Text className="text-gray-700 mb-1 font-medium">Generation Mode</Text>
      <View className="flex-row">
        <TouchableOpacity
          className={`flex-1 py-2 px-2 rounded-md items-center mr-1 ${generationMode === "advanced" ? "bg-purple-600" : "bg-gray-200"} ${!isPremium ? "opacity-50" : ""}`}
          onPress={() => isPremium && setGenerationMode("advanced")}
          disabled={!isPremium}
        >
          <Text
            className={
              generationMode === "advanced" ? "text-white" : "text-gray-700"
            }
            style={{ fontSize: 10, textAlign: "center" }}
          >
            Add One Word
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 px-2 rounded-md items-center ${generationMode === "combi" ? "bg-purple-600" : "bg-gray-200"} ${!isPremium ? "opacity-50" : ""}`}
          onPress={() => isPremium && setGenerationMode("combi")}
          disabled={!isPremium}
        >
          <Text
            className={
              generationMode === "combi" ? "text-white" : "text-gray-700"
            }
            style={{ fontSize: 10, textAlign: "center" }}
          >
            Add Some Word
          </Text>
        </TouchableOpacity>
      </View>
      {!isPremium && (
        <Text className="text-xs text-gray-500 mt-1">
          Upgrade to premium to access all generation modes
        </Text>
      )}
    </View>
  );

  const renderCombiModeInputs = () => {
    if (generationMode !== "combi" || !isPremium) return null;

    return (
      <View className="mb-4 p-3 bg-purple-50 rounded-lg">
        <Text className="text-purple-800 font-medium mb-2">
          Advanced Combination Generator (Combi)
        </Text>
        <Text className="text-gray-600 text-xs mb-2">
          Menambahkan DUA kata tambahan ke nama asli dengan penempatan dinamis.
          Database sumber kata (Exp) dipilih otomatis berdasarkan Life Path &
          Expression Anda.
        </Text>
        <Text className="text-red-600 text-xs font-bold mb-2">
          ⚠️ PERINGATAN: Proses ini SANGAT INTENSIF secara komputasi!
        </Text>
        <Text className="text-gray-600 text-xs">
          Klik tombol "Generate Names" untuk mencari kombinasi nama berikutnya.
          Sistem akan menganalisis berbagai posisi penempatan kata
          (bersebelahan, terpisah, dll.).
        </Text>
      </View>
    );
  };

  return (
    <ScrollView className="bg-white rounded-lg shadow-md">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
          {nameType === "personal"
            ? "Personal Name Optimizer"
            : "Baby Name Generator"}
        </Text>

        <View className="flex-row mb-4">
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-md items-center ${nameType === "personal" ? "bg-purple-600" : "bg-gray-200"}`}
            onPress={() => setNameType("personal")}
          >
            <Text
              className={
                nameType === "personal" ? "text-white" : "text-gray-700"
              }
            >
              Personal Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-md items-center ml-2 ${nameType === "baby" ? "bg-purple-600" : "bg-gray-200"}`}
            onPress={() => setNameType("baby")}
          >
            <Text
              className={nameType === "baby" ? "text-white" : "text-gray-700"}
            >
              Baby Name
            </Text>
          </TouchableOpacity>
        </View>

        {renderGenerationModeSelector()}

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">
            {nameType === "personal"
              ? "Your First Name"
              : "Family Name (Optional)"}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 bg-gray-50"
            placeholder={
              nameType === "personal"
                ? "Enter your first name"
                : "Enter family name (optional)"
            }
            value={baseFirstName}
            onChangeText={setBaseFirstName}
          />
        </View>

        {renderCombiModeInputs()}
        {renderAdvancedModeInputs()}

        <View className="mb-6">
          <Text className="text-gray-700 mb-1 font-medium">Name Origin</Text>
          <View className="flex-row flex-wrap justify-center">
            {LANGUAGE_OPTIONS.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                className={`m-2 w-12 h-12 rounded-full items-center justify-center ${selectedLanguages.includes(lang.id) ? "bg-purple-100 border-2 border-purple-600" : "bg-gray-100 border-2 border-gray-300"} ${!isPremium && lang.id !== "id" ? "opacity-50" : ""}`}
                onPress={() => toggleLanguage(lang.id)}
                disabled={!isPremium && lang.id !== "id"}
                style={{
                  elevation: selectedLanguages.includes(lang.id) ? 4 : 2,
                }}
              >
                <Text style={{ fontSize: 20 }}>{lang.flag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {!isPremium && (
            <Text className="text-xs text-gray-500 mt-1 text-center">
              Upgrade to premium to access more languages
            </Text>
          )}
        </View>

        {
          <TouchableOpacity
            className="bg-purple-600 py-3 px-4 rounded-md items-center mb-6"
            onPress={
              generationMode === "advanced" || generationMode === "combi"
                ? () => setShowAdvancedModal(true)
                : generateNames
            }
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-medium text-lg">
                {generationMode === "advanced" || generationMode === "combi"
                  ? generationMode === "combi"
                    ? "Jalankan/Lanjut Combi"
                    : "Advanced Search"
                  : "Generate Names"}
              </Text>
            )}
          </TouchableOpacity>
        }

        {/* Regular Generated Names for other modes */}
        {generatedNames.length > 0 && generationMode !== "advanced" && (
          <View>
            <Text className="text-xl font-semibold mb-2">Suggested Names</Text>
            <Text className="text-sm text-gray-600 mb-3">
              Generated from:{" "}
              {selectedLanguages
                .map(
                  (langId) =>
                    LANGUAGE_OPTIONS.find((opt) => opt.id === langId)?.name,
                )
                .filter(Boolean)
                .join(", ")}
            </Text>
            <FlatList
              data={generatedNames}
              keyExtractor={(item, index) => `name-${index}`}
              renderItem={({ item }) => (
                <View className="py-3 px-4 bg-purple-50 rounded-lg mb-2">
                  <Text className="text-lg text-purple-800 font-medium">
                    {item}
                  </Text>
                </View>
              )}
              ListEmptyComponent={
                <Text className="text-gray-500 text-center py-4">
                  No matching names found. Try different parameters.
                </Text>
              }
            />
          </View>
        )}

        {!isPremium && (
          <View className="bg-purple-100 p-4 rounded-lg mt-4">
            <Text className="text-lg font-semibold text-purple-800 mb-2">
              Premium Features
            </Text>
            <Text className="text-gray-700 mb-3">
              Unlock access to international name databases, advanced name
              optimization, and more.
            </Text>
            <TouchableOpacity className="bg-purple-600 py-2 px-4 rounded-md items-center">
              <Text className="text-white font-medium">Upgrade to Premium</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Advanced Search Modal */}
      <Modal
        visible={showAdvancedModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAdvancedModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-96 max-w-full max-h-[90%]">
            <ScrollView>
              <Text className="text-lg font-bold text-center mb-4 text-purple-800">
                {generationMode === "combi"
                  ? "Advanced Combination Generator (Combi)"
                  : "Advanced Name Search"}
              </Text>

              {generationMode === "combi" && (
                <View className="mb-4 p-3 bg-red-50 rounded-lg">
                  <Text className="text-red-800 font-bold text-sm mb-1">
                    ⚠️ PERINGATAN: Proses SANGAT INTENSIF!
                  </Text>
                  <Text className="text-red-700 text-xs">
                    Sistem akan menambahkan DUA kata dari database Exp yang
                    dipilih berdasarkan Life Path & Expression Anda, dengan
                    berbagai variasi posisi penempatan.
                  </Text>
                </View>
              )}

              <View className="mb-4">
                <Text className="text-gray-700 mb-1 font-medium">
                  Birth Date (DD/MM/YYYY)
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-3 bg-gray-50"
                  placeholder="15/03/1990"
                  value={userBirthdate}
                  onChangeText={setUserBirthdate}
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 mb-1 font-medium">Gender</Text>
                <View className="flex-row">
                  <TouchableOpacity
                    className={`flex-1 mr-2 p-3 rounded-md border ${
                      userGender === "Male"
                        ? "bg-purple-100 border-purple-500"
                        : "bg-gray-50 border-gray-300"
                    }`}
                    onPress={() => setUserGender("Male")}
                  >
                    <Text
                      className={`text-center font-medium ${
                        userGender === "Male"
                          ? "text-purple-700"
                          : "text-gray-700"
                      }`}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 ml-2 p-3 rounded-md border ${
                      userGender === "Female"
                        ? "bg-purple-100 border-purple-500"
                        : "bg-gray-50 border-gray-300"
                    }`}
                    onPress={() => setUserGender("Female")}
                  >
                    <Text
                      className={`text-center font-medium ${
                        userGender === "Female"
                          ? "text-purple-700"
                          : "text-gray-700"
                      }`}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 mb-1 font-medium">
                  Target Hara
                </Text>
                <View className="border border-gray-300 rounded-md bg-gray-50">
                  <Picker
                    selectedValue={targetHara}
                    onValueChange={setTargetHara}
                    style={{ height: 40 }}
                  >
                    <Picker.Item label="All Valid (1,2,3,4,6)" value="all" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="6" value="6" />
                  </Picker>
                </View>
              </View>

              <View className="mb-4 p-3 bg-blue-50 rounded-lg">
                <Text className="text-blue-800 font-medium mb-1">
                  Locked Targets:
                </Text>
                <Text className="text-blue-700 text-sm">
                  • Target Synchronize: 100% (Fixed)
                </Text>
                <Text className="text-blue-700 text-sm">
                  • Target Grafologi: 100% (Fixed)
                </Text>
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 mb-1 font-medium">
                  Target Coherence (Min %)
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-3 bg-gray-50"
                  placeholder="70"
                  value={targetCoherence}
                  onChangeText={setTargetCoherence}
                  keyboardType="numeric"
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 mb-1 font-medium">
                  Target Momen Sukses (Min %)
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-3 bg-gray-50"
                  placeholder="80"
                  value={targetMomenSukses}
                  onChangeText={setTargetMomenSukses}
                  keyboardType="numeric"
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 mb-1 font-medium">
                  Target Angka Saran Deskripsi (Optional)
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-3 bg-gray-50"
                  placeholder="Enter specific number"
                  value={targetDeskripsi}
                  onChangeText={setTargetDeskripsi}
                  keyboardType="numeric"
                />
              </View>

              {generationMode === "combi" ? (
                <View className="mb-4">
                  <Text className="text-gray-700 mb-2 font-medium">
                    Filter Awalan Huruf (Optional)
                  </Text>
                  <View className="flex-row space-x-2">
                    <View className="flex-1">
                      <Text className="text-gray-600 mb-1 text-sm">
                        Kata Pertama
                      </Text>
                      <TextInput
                        className="border border-gray-300 rounded-md p-3 bg-gray-50"
                        placeholder="A"
                        value={firstWordFilter}
                        onChangeText={setFirstWordFilter}
                        maxLength={1}
                        autoCapitalize="characters"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-600 mb-1 text-sm">
                        Kata Kedua
                      </Text>
                      <TextInput
                        className="border border-gray-300 rounded-md p-3 bg-gray-50"
                        placeholder="B"
                        value={secondWordFilter}
                        onChangeText={setSecondWordFilter}
                        maxLength={1}
                        autoCapitalize="characters"
                      />
                    </View>
                  </View>
                  <Text className="text-xs text-gray-500 mt-1">
                    Filter kata berdasarkan huruf awal untuk setiap posisi kata
                  </Text>
                </View>
              ) : (
                <View className="mb-4">
                  <Text className="text-gray-700 mb-1 font-medium">
                    Filter Awalan Huruf (Optional)
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-md p-3 bg-gray-50"
                    placeholder="Masukkan huruf awal kata (contoh: A)"
                    value={startingLetter}
                    onChangeText={setStartingLetter}
                    maxLength={1}
                    autoCapitalize="characters"
                  />
                  <Text className="text-xs text-gray-500 mt-1">
                    Hanya kata yang dimulai dengan huruf ini yang akan digunakan
                    dari database exp1-exp9
                  </Text>
                </View>
              )}

              {searchProgress || combiProgress ? (
                <View className="mb-4 p-3 bg-yellow-50 rounded-lg">
                  <Text className="text-yellow-800 text-sm">
                    {generationMode === "combi"
                      ? combiProgress
                      : searchProgress}
                  </Text>
                </View>
              ) : null}

              {(advancedResults.length > 0 || combiResults.length > 0) && (
                <View className="mb-4">
                  <View className="flex-row justify-between items-center mb-3">
                    <Text
                      className="text-xl font-bold flex-1 text-center"
                      style={{
                        fontFamily: "serif",
                        color: "#6B46C1",
                        textShadowColor: "rgba(0,0,0,0.1)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 2,
                      }}
                    >
                      {generationMode === "combi"
                        ? "✨ Hasil Pencarian Combi ✨"
                        : "🔍 Search Results 🔍"}
                    </Text>
                    <TouchableOpacity
                      className="bg-blue-100 px-3 py-1 rounded-md ml-2"
                      onPress={handleShowFullScreenResults}
                    >
                      <Text className="text-blue-700 text-xs font-medium">
                        Full Screen
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-red-100 px-3 py-1 rounded-md ml-2"
                      onPress={
                        generationMode === "combi"
                          ? clearCombiResults
                          : clearAdvancedResults
                      }
                    >
                      <Text className="text-red-700 text-xs font-medium">
                        Clear
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    style={{ maxHeight: 250 }}
                    className="bg-gradient-to-b from-purple-50 to-white rounded-lg p-2"
                  >
                    {(generationMode === "combi"
                      ? combiResults
                      : advancedResults
                    ).map((result, index) => (
                      <TouchableOpacity
                        key={index}
                        className="py-3 px-3 mb-2 bg-white rounded-lg shadow-sm border-l-4 border-purple-400"
                        style={{ elevation: 2 }}
                        onPress={() => handleNameClick(result.name)}
                      >
                        <View className="flex-row items-start mb-2">
                          <View className="w-8 h-8 bg-purple-600 rounded-full justify-center items-center mr-3">
                            <Text
                              className="text-sm font-bold text-white"
                              style={{ fontFamily: "monospace" }}
                            >
                              {index + 1}
                            </Text>
                          </View>
                          <Text
                            className="text-lg font-bold flex-1"
                            style={{
                              fontFamily: "serif",
                              color: "#4C1D95",
                              letterSpacing: 0.5,
                            }}
                          >
                            {result.name}
                          </Text>
                        </View>
                        <View className="flex-row justify-end items-center flex-wrap">
                          <View className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mr-1 mb-1 justify-center items-center shadow-md">
                            <Text
                              className="text-white text-center font-bold"
                              style={{
                                fontFamily: "monospace",
                                fontSize: 10,
                                lineHeight: 11,
                              }}
                            >
                              H{"\n"}
                              {result.hara}
                            </Text>
                          </View>
                          <View className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full mr-1 mb-1 justify-center items-center shadow-md">
                            <Text
                              className="text-white text-center font-bold"
                              style={{
                                fontFamily: "monospace",
                                fontSize: 10,
                                lineHeight: 11,
                              }}
                            >
                              S{"\n"}
                              {typeof result.sync === "string"
                                ? result.sync.replace("%", "") + "%"
                                : result.sync + "%"}
                            </Text>
                          </View>
                          <View className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-1 mb-1 justify-center items-center shadow-md">
                            <Text
                              className="text-white text-center font-bold"
                              style={{
                                fontFamily: "monospace",
                                fontSize: 10,
                                lineHeight: 11,
                              }}
                            >
                              C{"\n"}
                              {result.coherence.replace("%", "") + "%"}
                            </Text>
                          </View>
                          <View className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mr-1 mb-1 justify-center items-center shadow-md">
                            <Text
                              className="text-white text-center font-bold"
                              style={{
                                fontFamily: "monospace",
                                fontSize: 10,
                                lineHeight: 11,
                              }}
                            >
                              Y{"\n"}
                              {result.synergize.toString().replace("%", "") +
                                "%"}
                            </Text>
                          </View>
                          <View className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mr-1 mb-1 justify-center items-center shadow-md">
                            <Text
                              className="text-white text-center font-bold"
                              style={{
                                fontFamily: "monospace",
                                fontSize: 10,
                                lineHeight: 11,
                              }}
                            >
                              P{"\n"}
                              {result.productive.toString().replace("%", "") +
                                "%"}
                            </Text>
                          </View>
                          <View className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mb-1 justify-center items-center shadow-md">
                            <Text
                              className="text-white text-center font-bold"
                              style={{
                                fontFamily: "monospace",
                                fontSize: 10,
                                lineHeight: 11,
                              }}
                            >
                              M{"\n"}
                              {result.momenSukses === "1+"
                                ? "100%"
                                : Math.round(
                                    parseFloat(result.momenSukses) * 100,
                                  ) + "%"}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View className="flex-row justify-between">
                <TouchableOpacity
                  className="bg-gray-300 py-2 px-4 rounded-md flex-1 mr-2"
                  onPress={() => setShowAdvancedModal(false)}
                >
                  <Text className="text-gray-700 text-center font-medium">
                    Close
                  </Text>
                </TouchableOpacity>
                {isAdvancedSearching || isCombiSearching ? (
                  <TouchableOpacity
                    className="bg-red-600 py-2 px-4 rounded-md flex-1 ml-2"
                    onPress={stopAdvancedSearch}
                  >
                    <Text className="text-white text-center font-medium">
                      Stop
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="bg-purple-600 py-2 px-4 rounded-md flex-1 ml-2"
                    onPress={runAdvancedSearch}
                  >
                    <Text className="text-white text-center font-medium">
                      {generationMode === "combi"
                        ? "Jalankan/Lanjut Combi"
                        : "Search"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Full Screen Results Modal */}
      <Modal
        visible={showFullScreenResults}
        transparent={false}
        animationType="slide"
        onRequestClose={handleBackToModal}
      >
        <View className="flex-1 bg-white">
          {selectedNameForAnalysis ? (
            <View className="flex-1">
              <View className="flex-row items-center justify-between p-4 bg-purple-600">
                <TouchableOpacity
                  className="bg-white px-4 py-2 rounded-md"
                  onPress={handleBackToResults}
                >
                  <Text className="text-purple-600 font-medium">
                    ← Back to List
                  </Text>
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold flex-1 text-center">
                  Name Analysis
                </Text>
                <TouchableOpacity
                  className="bg-white px-4 py-2 rounded-md"
                  onPress={handleBackToModal}
                >
                  <Text className="text-purple-600 font-medium">Close</Text>
                </TouchableOpacity>
              </View>
              <NumerologyResults
                name={selectedNameForAnalysis}
                birthdate={selectedNameBirthdate || new Date()}
                gender={selectedNameGender}
                isPremium={isPremium}
              />
            </View>
          ) : (
            <View className="flex-1">
              <View className="flex-row items-center justify-between p-4 bg-purple-600">
                <TouchableOpacity
                  className="bg-white px-4 py-2 rounded-md"
                  onPress={handleBackToModal}
                >
                  <Text className="text-purple-600 font-medium">← Back</Text>
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold flex-1 text-center">
                  {generationMode === "combi"
                    ? "✨ Hasil Pencarian Combi ✨"
                    : "🔍 Search Results 🔍"}
                </Text>
                <TouchableOpacity
                  className="bg-red-500 px-4 py-2 rounded-md"
                  onPress={
                    generationMode === "combi"
                      ? clearCombiResults
                      : clearAdvancedResults
                  }
                >
                  <Text className="text-white font-medium">Clear All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView className="flex-1 p-4">
                <Text className="text-center text-gray-600 mb-4">
                  Tap any name to see detailed analysis
                </Text>
                {(generationMode === "combi"
                  ? combiResults
                  : advancedResults
                ).map((result, index) => (
                  <TouchableOpacity
                    key={index}
                    className="py-4 px-4 mb-3 bg-white rounded-lg shadow-md border-l-4 border-purple-400"
                    style={{ elevation: 3 }}
                    onPress={() => handleNameClick(result.name)}
                  >
                    <View className="flex-row items-start mb-3">
                      <View className="w-10 h-10 bg-purple-600 rounded-full justify-center items-center mr-4">
                        <Text
                          className="text-lg font-bold text-white"
                          style={{ fontFamily: "monospace" }}
                        >
                          {index + 1}
                        </Text>
                      </View>
                      <Text
                        className="text-xl font-bold flex-1"
                        style={{
                          fontFamily: "serif",
                          color: "#4C1D95",
                          letterSpacing: 0.5,
                        }}
                      >
                        {result.name}
                      </Text>
                    </View>
                    <View className="flex-row justify-center items-center flex-wrap">
                      <View className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mr-2 mb-2 justify-center items-center shadow-md">
                        <Text
                          className="text-white text-center font-bold"
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            lineHeight: 13,
                          }}
                        >
                          Hara{"\n"}
                          {result.hara}
                        </Text>
                      </View>
                      <View className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full mr-2 mb-2 justify-center items-center shadow-md">
                        <Text
                          className="text-white text-center font-bold"
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            lineHeight: 13,
                          }}
                        >
                          Sync{"\n"}
                          {typeof result.sync === "string"
                            ? result.sync.replace("%", "") + "%"
                            : result.sync + "%"}
                        </Text>
                      </View>
                      <View className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-2 mb-2 justify-center items-center shadow-md">
                        <Text
                          className="text-white text-center font-bold"
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            lineHeight: 13,
                          }}
                        >
                          Coher{"\n"}
                          {result.coherence.replace("%", "") + "%"}
                        </Text>
                      </View>
                      <View className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mr-2 mb-2 justify-center items-center shadow-md">
                        <Text
                          className="text-white text-center font-bold"
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            lineHeight: 13,
                          }}
                        >
                          Synrg{"\n"}
                          {result.synergize.toString().replace("%", "") + "%"}
                        </Text>
                      </View>
                      <View className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mr-2 mb-2 justify-center items-center shadow-md">
                        <Text
                          className="text-white text-center font-bold"
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            lineHeight: 13,
                          }}
                        >
                          Prod{"\n"}
                          {result.productive.toString().replace("%", "") + "%"}
                        </Text>
                      </View>
                      <View className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mb-2 justify-center items-center shadow-md">
                        <Text
                          className="text-white text-center font-bold"
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            lineHeight: 13,
                          }}
                        >
                          Momen{"\n"}
                          {result.momenSukses === "1+"
                            ? "100%"
                            : Math.round(parseFloat(result.momenSukses) * 100) +
                              "%"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );

  function renderAdvancedModeInputs() {
    if (generationMode !== "advanced" || !isPremium) return null;

    return (
      <View className="mb-4 p-3 bg-purple-50 rounded-lg">
        <Text className="text-purple-800 font-medium mb-2">
          Advanced Search Mode
        </Text>
        <Text className="text-gray-600 text-xs mb-2">
          Systematic search based on your numerological profile with advanced
          filtering
        </Text>
        <Text className="text-gray-600 text-xs">
          Click "Advanced Search" to configure filters and start the intensive
          search process.
        </Text>
      </View>
    );
  }
}
