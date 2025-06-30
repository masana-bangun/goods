import React, { useState, createContext, useContext } from "react";
import { View, SafeAreaView, Platform } from "react-native";
import TabBar from "./TabBar";
import HomeScreen from "./HomeScreen";
import NumerologyForm from "./NumerologyForm";
import NameGenerator from "./NameGenerator";
import CompatibilityChecker from "./CompatibilityChecker";
import AccountScreen from "./AccountScreen";
import LifeReport from "./LifeReport";

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

interface Person {
  name: string;
  birthdate: Date;
  gender: "Male" | "Female";
}

export default function MainApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [language, setLanguage] = useState("en");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const handleDateChange = (day: number, month: number, year: number) => {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleAnalysisSubmit = (name: string, birthdate: Date, gender: "Male" | "Female") => {
    const person = { name, birthdate, gender };
    setCurrentPerson(person);
    setActiveTab("report");
  };

  const handleNavigate = (screen: string) => {
    if (screen === "editProfile" || screen === "membership" || screen === "privacy" || screen === "help" || screen === "logout") {
      // Handle account navigation
      return;
    }
    setActiveTab(screen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            userName="User"
            isPremium={true}
            onNavigate={handleNavigate}
          />
        );
      case "analyze":
        return (
          <View className="flex-1 justify-center items-center p-4">
            <NumerologyForm
              onSubmit={handleAnalysisSubmit}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              selectedDay={selectedDay}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onDateChange={handleDateChange}
            />
          </View>
        );
      case "names":
        return <NameGenerator isPremium={true} />;
      case "compatibility":
        return <CompatibilityChecker isPremium={true} />;
      case "report":
        if (currentPerson) {
          return (
            <LifeReport
              name={currentPerson.name}
              birthdate={currentPerson.birthdate}
              gender={currentPerson.gender}
              isPremium={true}
            />
          );
        }
        return (
          <View className="flex-1 justify-center items-center p-4">
            <NumerologyForm
              onSubmit={(name, birthdate, gender) => {
                setCurrentPerson({ name, birthdate, gender });
              }}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              selectedDay={selectedDay}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onDateChange={handleDateChange}
            />
          </View>
        );
      case "account":
        return (
          <AccountScreen
            userName="User"
            email="user@example.com"
            isPremium={true}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomeScreen
            userName="User"
            isPremium={true}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1">
          {renderContent()}
        </View>
        <TabBar activeTab={activeTab} onChangeTab={setActiveTab} />
      </SafeAreaView>
    </TranslationContext.Provider>
  );
}