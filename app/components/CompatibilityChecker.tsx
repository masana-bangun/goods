import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  calculateCompatibility,
  formatTanggal,
  normalisasiNama,
} from "../utils/numerologyUtils";
import NumerologyForm from "./NumerologyForm";
import FixPersonModal from "./FixPersonModal";
import { Heart, Users, Zap, Target, Settings, RefreshCw, Wrench } from "lucide-react-native";
import { useTranslation } from "./TranslationProvider";

interface Person {
  name: string;
  birthdate: Date;
  gender: "Male" | "Female";
}

interface CompatibilityCheckerProps {
  isPremium?: boolean;
}

export default function CompatibilityChecker({ isPremium = true }: CompatibilityCheckerProps) {
  const { t } = useTranslation();
  const [person1, setPerson1] = useState<Person | null>(null);
  const [person2, setPerson2] = useState<Person | null>(null);
  const [compatibility, setCompatibility] = useState<any>(null);
  const [currentForm, setCurrentForm] = useState<"person1" | "person2" | null>("person1");
  const [showFixPersonModal, setShowFixPersonModal] = useState(false);

  // Date picker state for NumerologyForm
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDateChange = (day: number, month: number, year: number) => {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handlePersonSubmit = (name: string, birthdate: Date, gender: "Male" | "Female") => {
    const person = { name, birthdate, gender };
    
    if (currentForm === "person1") {
      setPerson1(person);
      setCurrentForm("person2");
    } else if (currentForm === "person2") {
      setPerson2(person);
      setCurrentForm(null);
    }
  };

  const calculateCompatibilityResult = () => {
    if (person1 && person2) {
      const result = calculateCompatibility(
        person1.name,
        person1.birthdate,
        person1.gender,
        person2.name,
        person2.birthdate,
        person2.gender
      );
      setCompatibility(result);
    }
  };

  const resetAnalysis = () => {
    setPerson1(null);
    setPerson2(null);
    setCompatibility(null);
    setCurrentForm("person1");
  };

  const handleNameFixed = (
    fixedName: string,
    personToFix: "person1" | "person2",
    harmonyValue: number
  ) => {
    if (personToFix === "person1" && person1) {
      const updatedPerson1 = { ...person1, name: fixedName };
      setPerson1(updatedPerson1);
    } else if (personToFix === "person2" && person2) {
      const updatedPerson2 = { ...person2, name: fixedName };
      setPerson2(updatedPerson2);
    }
    
    // Recalculate compatibility with the new name
    setTimeout(() => {
      calculateCompatibilityResult();
    }, 100);

    Alert.alert(
      "Name Fixed Successfully!",
      `${personToFix === "person1" ? "Person 1" : "Person 2"}'s name has been updated to "${fixedName}" with harmony value of ${harmonyValue}%.`,
      [{ text: "OK" }]
    );
  };

  const getCompatibilityLevel = (harmony: number) => {
    if (harmony >= 90) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100" };
    if (harmony >= 80) return { level: "Very Good", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (harmony >= 70) return { level: "Good", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    if (harmony >= 60) return { level: "Fair", color: "text-orange-600", bgColor: "bg-orange-100" };
    return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-100" };
  };

  // Show form if we need to collect person data
  if (currentForm) {
    return (
      <View className="flex-1 bg-gray-100 p-4">
        <View className="mb-4">
          <Text className="text-2xl font-bold text-center text-purple-800 mb-2">
            {t("compatibility_checker")}
          </Text>
          <Text className="text-center text-gray-600 mb-4">
            {currentForm === "person1" ? t("enter_person1_details") : t("enter_person2_details")}
          </Text>
          
          {/* Progress indicator */}
          <View className="flex-row justify-center mb-4">
            <View className={`w-4 h-4 rounded-full mx-1 ${currentForm === "person1" ? "bg-purple-600" : "bg-green-500"}`} />
            <View className={`w-4 h-4 rounded-full mx-1 ${currentForm === "person2" ? "bg-purple-600" : "bg-gray-300"}`} />
          </View>
        </View>

        <NumerologyForm 
          onSubmit={handlePersonSubmit}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          selectedDay={selectedDay}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onDateChange={handleDateChange}
        />

        {person1 && currentForm === "person2" && (
          <TouchableOpacity
            className="mt-4 bg-gray-500 py-2 px-4 rounded-lg"
            onPress={() => setCurrentForm("person1")}
          >
            <Text className="text-white text-center font-medium">
              {t("edit_person1")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Show compatibility results
  if (person1 && person2) {
    return (
      <ScrollView className="flex-1 bg-gray-100">
        <View className="p-4">
          <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
            {t("compatibility_results")}
          </Text>

          {/* Couple Info */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-center mb-4">
              <View className="flex-1 items-center">
                <Text className="text-lg font-semibold text-gray-800">{person1.name}</Text>
                <Text className="text-sm text-gray-600">{formatTanggal(person1.birthdate)}</Text>
                <Text className="text-sm text-gray-600">{person1.gender}</Text>
              </View>
              <Heart size={24} color="#e11d48" className="mx-4" />
              <View className="flex-1 items-center">
                <Text className="text-lg font-semibold text-gray-800">{person2.name}</Text>
                <Text className="text-sm text-gray-600">{formatTanggal(person2.birthdate)}</Text>
                <Text className="text-sm text-gray-600">{person2.gender}</Text>
              </View>
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            className="bg-purple-600 py-3 px-4 rounded-lg mb-4 flex-row items-center justify-center"
            onPress={calculateCompatibilityResult}
          >
            <RefreshCw size={20} color="white" />
            <Text className="text-white font-medium ml-2">{t("calculate")}</Text>
          </TouchableOpacity>

          {/* Compatibility Results */}
          {compatibility && (
            <View className="space-y-4">
              {/* Overall Harmony */}
              <View className={`rounded-lg p-4 ${getCompatibilityLevel(compatibility.harmony).bgColor}`}>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-lg font-bold text-gray-800">{t("overall_harmony")}</Text>
                  <Text className={`text-2xl font-bold ${getCompatibilityLevel(compatibility.harmony).color}`}>
                    {compatibility.harmony}%
                  </Text>
                </View>
                <Text className={`text-center font-medium ${getCompatibilityLevel(compatibility.harmony).color}`}>
                  {getCompatibilityLevel(compatibility.harmony).level}
                </Text>
              </View>

              {/* FixPerson Feature - Prominently displayed below harmony */}
              <View className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 shadow-lg">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      🔧 FixPerson Feature
                    </Text>
                    <Text className="text-white opacity-90 text-sm mb-2">
                      Optimize one person's name to improve harmony with their partner
                    </Text>
                    <Text className="text-white opacity-80 text-xs">
                      • Add 1 or 2 words to existing name
                    </Text>
                    <Text className="text-white opacity-80 text-xs">
                      • Filter by minimum harmony (70-95%)
                    </Text>
                    <Text className="text-white opacity-80 text-xs">
                      • Uses extended database (exp1-exp9)
                    </Text>
                  </View>
                  <View className="w-16 h-16 bg-white rounded-full items-center justify-center">
                    <Wrench size={32} color="#059669" />
                  </View>
                </View>
                
                <TouchableOpacity
                  className="bg-white py-3 px-4 rounded-lg flex-row items-center justify-center"
                  onPress={() => setShowFixPersonModal(true)}
                >
                  <Settings size={20} color="#059669" />
                  <Text className="text-green-600 font-bold ml-2">Open FixPerson Tool</Text>
                </TouchableOpacity>
              </View>

              {/* Detailed Metrics */}
              <View className="bg-white rounded-lg p-4 shadow-sm">
                <Text className="text-lg font-bold mb-4 text-gray-800">{t("detailed_analysis")}</Text>
                
                <View className="space-y-3">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Zap size={20} color="#8b5cf6" />
                      <Text className="ml-2 font-medium text-gray-700">{t("synchronize")}</Text>
                    </View>
                    <Text className="font-bold text-purple-600">{compatibility.synchronize}%</Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Users size={20} color="#8b5cf6" />
                      <Text className="ml-2 font-medium text-gray-700">{t("coherence")}</Text>
                    </View>
                    <Text className="font-bold text-purple-600">{compatibility.coherence}%</Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Target size={20} color="#8b5cf6" />
                      <Text className="ml-2 font-medium text-gray-700">{t("momentum")}</Text>
                    </View>
                    <Text className="font-bold text-purple-600">{compatibility.momentum}/10</Text>
                  </View>
                </View>
              </View>

              {/* Compatibility Description */}
              <View className="bg-white rounded-lg p-4 shadow-sm">
                <Text className="text-lg font-bold mb-3 text-gray-800">{t("relationship_insights")}</Text>
                <Text className="text-gray-700 leading-6">
                  {compatibility.description || t("compatibility_description_placeholder")}
                </Text>
              </View>

              {/* Recommendations for Low Harmony */}
              {compatibility.harmony < 70 && (
                <View className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <Text className="text-lg font-bold mb-3 text-yellow-800">💡 {t("recommendations")}</Text>
                  <Text className="text-yellow-700 mb-3">
                    Your compatibility score is below 70%. The FixPerson feature above can help optimize one of the names to achieve better harmony. This tool will:
                  </Text>
                  <View className="mb-3">
                    <Text className="text-yellow-700 text-sm">• Generate name variations with 1-2 additional words</Text>
                    <Text className="text-yellow-700 text-sm">• Filter results by your desired harmony threshold</Text>
                    <Text className="text-yellow-700 text-sm">• Show real-time compatibility with your partner</Text>
                    <Text className="text-yellow-700 text-sm">• Use extensive Indonesian name database</Text>
                  </View>
                  <TouchableOpacity
                    className="bg-yellow-600 py-2 px-4 rounded-lg"
                    onPress={() => setShowFixPersonModal(true)}
                  >
                    <Text className="text-white text-center font-medium">Try FixPerson Now</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* High Harmony Celebration */}
              {compatibility.harmony >= 80 && (
                <View className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <Text className="text-lg font-bold mb-3 text-green-800">🎉 Excellent Compatibility!</Text>
                  <Text className="text-green-700 mb-3">
                    Your harmony score of {compatibility.harmony}% indicates a very strong connection! You can still use the FixPerson feature to explore even higher compatibility levels.
                  </Text>
                  <TouchableOpacity
                    className="bg-green-600 py-2 px-4 rounded-lg"
                    onPress={() => setShowFixPersonModal(true)}
                  >
                    <Text className="text-white text-center font-medium">Explore Further Optimization</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {/* Reset Button */}
          <TouchableOpacity
            className="bg-gray-500 py-2 px-4 rounded-lg mt-6"
            onPress={resetAnalysis}
          >
            <Text className="text-white text-center font-medium">{t("start_new_analysis")}</Text>
          </TouchableOpacity>
        </View>

        {/* Fix Person Modal */}
        <FixPersonModal
          visible={showFixPersonModal}
          onClose={() => setShowFixPersonModal(false)}
          person1Name={person1.name}
          person1Birthdate={person1.birthdate}
          person1Gender={person1.gender}
          person2Name={person2.name}
          person2Birthdate={person2.birthdate}
          person2Gender={person2.gender}
          onNameFixed={handleNameFixed}
        />
      </ScrollView>
    );
  }

  return null;
}