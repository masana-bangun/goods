import React, { useState, createContext, useContext } from "react";

// Translation context
interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useTranslation = () => useContext(TranslationContext);

// Simple translations
const translations: Record<string, Record<string, string>> = {
  en: {
    welcome_back: "Welcome back",
    home: "Home",
    analyze: "Analyze",
    names: "Names",
    match: "Match",
    account: "Account",
    language: "Language",
    numerology_analysis: "Numerology Analysis",
    basic_analysis: "Basic",
    advanced_analysis: "Advanced",
    full_name: "Full Name",
    enter_full_name: "Enter your full name",
    normalized: "Normalized",
    gender: "Gender",
    male: "Male",
    female: "Female",
    birth_date: "Birth Date",
    select_birth_date: "Select Birth Date",
    year: "Year",
    month: "Month",
    cancel: "Cancel",
    done: "Done",
    analyze: "Analyze",
    quick_actions: "Quick Actions",
    name_analysis: "Analysis",
    love_couple: "Love",
    dictio_name: "Dictionary",
    generator_name_optimizer: "Generator",
    lifeplan_report: "Report",
    all_premium_features_unlocked: "Premium Active",
    successful_people: "Success Names",
    synchronize: "Sync",
    coherence: "Coherence",
    momentum: "Momentum",
    discover_power_names: "Discover More",
    earn_free_credits: "Earn Credits",
    share_with_friends: "Share with friends to earn free credits",
    share_now: "Share Now",
    compatibility_checker: "Compatibility Checker",
    enter_person1_details: "Enter Person 1 Details",
    enter_person2_details: "Enter Person 2 Details",
    edit_person1: "Edit Person 1",
    compatibility_results: "Compatibility Results",
    calculate: "Calculate",
    overall_harmony: "Overall Harmony",
    detailed_analysis: "Detailed Analysis",
    relationship_insights: "Relationship Insights",
    recommendations: "Recommendations",
    start_new_analysis: "Start New Analysis",
    compatibility_description_placeholder: "Based on your numerological compatibility, this relationship shows potential for growth and understanding.",
    advanced_analysis_features: "Advanced Analysis Features:",
    life_path_number: "• Life Path Number",
    expression_number_feature: "• Expression Number",
    soul_urge_number: "• Soul Urge Number",
    personality_number_feature: "• Personality Number",
    maturity_number: "• Maturity Number",
    personal_year_number_feature: "• Personal Year Number",
  },
  id: {
    welcome_back: "Selamat datang kembali",
    home: "Beranda",
    analyze: "Analisis",
    names: "Nama",
    match: "Pasangan",
    account: "Akun",
    language: "Bahasa",
    numerology_analysis: "Analisis Numerologi",
    basic_analysis: "Dasar",
    advanced_analysis: "Lanjutan",
    full_name: "Nama Lengkap",
    enter_full_name: "Masukkan nama lengkap",
    normalized: "Dinormalisasi",
    gender: "Jenis Kelamin",
    male: "Pria",
    female: "Wanita",
    birth_date: "Tanggal Lahir",
    select_birth_date: "Pilih Tanggal Lahir",
    year: "Tahun",
    month: "Bulan",
    cancel: "Batal",
    done: "Selesai",
    analyze: "Analisis",
    quick_actions: "Aksi Cepat",
    name_analysis: "Analisis",
    love_couple: "Cinta",
    dictio_name: "Kamus",
    generator_name_optimizer: "Generator",
    lifeplan_report: "Laporan",
    all_premium_features_unlocked: "Premium Aktif",
    successful_people: "Nama Sukses",
    synchronize: "Sinkron",
    coherence: "Koherensi",
    momentum: "Momentum",
    discover_power_names: "Temukan Lebih",
    earn_free_credits: "Dapatkan Kredit",
    share_with_friends: "Bagikan dengan teman untuk kredit gratis",
    share_now: "Bagikan Sekarang",
    compatibility_checker: "Pemeriksa Kompatibilitas",
    enter_person1_details: "Masukkan Detail Orang 1",
    enter_person2_details: "Masukkan Detail Orang 2",
    edit_person1: "Edit Orang 1",
    compatibility_results: "Hasil Kompatibilitas",
    calculate: "Hitung",
    overall_harmony: "Harmoni Keseluruhan",
    detailed_analysis: "Analisis Detail",
    relationship_insights: "Wawasan Hubungan",
    recommendations: "Rekomendasi",
    start_new_analysis: "Mulai Analisis Baru",
    compatibility_description_placeholder: "Berdasarkan kompatibilitas numerologi Anda, hubungan ini menunjukkan potensi untuk pertumbuhan dan pemahaman.",
    advanced_analysis_features: "Fitur Analisis Lanjutan:",
    life_path_number: "• Nomor Jalan Hidup",
    expression_number_feature: "• Nomor Ekspresi",
    soul_urge_number: "• Nomor Dorongan Jiwa",
    personality_number_feature: "• Nomor Kepribadian",
    maturity_number: "• Nomor Kedewasaan",
    personal_year_number_feature: "• Nomor Tahun Pribadi",
  },
};

interface TranslationProviderProps {
  children: React.ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState("en");

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}