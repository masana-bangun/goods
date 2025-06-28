import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { normalisasiNama } from "../utils/numerologyUtils";
import { useTranslation } from "./MainApp";

interface NumerologyFormProps {
  onSubmit: (name: string, birthdate: Date, gender: "Male" | "Female") => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  onDateChange: (day: number, month: number, year: number) => void;
}

export default function NumerologyForm({
  onSubmit = () => {},
  showDatePicker,
  setShowDatePicker,
  selectedDay,
  selectedMonth,
  selectedYear,
  onDateChange,
}: NumerologyFormProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [normalizedName, setNormalizedName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [analysisType, setAnalysisType] = useState<"basic" | "advanced">(
    "advanced",
  );

  const handleNameChange = (text: string) => {
    setName(text);
    setNormalizedName(normalisasiNama(text));
  };

  const handleDateChange = (day: number, month: number, year: number) => {
    onDateChange(day, month, year);
    const newDate = new Date(year, month - 1, day);
    setBirthdate(newDate);
  };

  const handleSubmit = () => {
    if (name.trim() && birthdate) {
      onSubmit(name, birthdate, gender);
    }
  };

  return (
    <ScrollView className="bg-white rounded-lg shadow-md w-full max-w-md">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
          {t("numerology_analysis")}
        </Text>

        <View className="flex-row mb-4">
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-md items-center ${analysisType === "basic" ? "bg-purple-600" : "bg-gray-200"}`}
            onPress={() => setAnalysisType("basic")}
          >
            <Text
              className={
                analysisType === "basic" ? "text-white" : "text-gray-700"
              }
            >
              {t("basic_analysis")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-md items-center ml-2 ${analysisType === "advanced" ? "bg-purple-600" : "bg-gray-200"}`}
            onPress={() => setAnalysisType("advanced")}
          >
            <Text
              className={
                analysisType === "advanced" ? "text-white" : "text-gray-700"
              }
            >
              {t("advanced_analysis")}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">
            {t("full_name")}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 bg-gray-50"
            placeholder={t("enter_full_name")}
            value={name}
            onChangeText={handleNameChange}
          />
          {normalizedName ? (
            <Text className="text-xs text-gray-500 mt-1">
              {t("normalized")}: {normalizedName}
            </Text>
          ) : null}
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">{t("gender")}</Text>
          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 mr-2 p-3 rounded-md border ${
                gender === "Male"
                  ? "bg-purple-100 border-purple-500"
                  : "bg-gray-50 border-gray-300"
              }`}
              onPress={() => setGender("Male")}
            >
              <Text
                className={`text-center font-medium ${
                  gender === "Male" ? "text-purple-700" : "text-gray-700"
                }`}
              >
                {t("male")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 ml-2 p-3 rounded-md border ${
                gender === "Female"
                  ? "bg-purple-100 border-purple-500"
                  : "bg-gray-50 border-gray-300"
              }`}
              onPress={() => setGender("Female")}
            >
              <Text
                className={`text-center font-medium ${
                  gender === "Female" ? "text-purple-700" : "text-gray-700"
                }`}
              >
                {t("female")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-1 font-medium">
            {t("birth_date")}
          </Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-md p-3 bg-gray-50 flex-row justify-between items-center"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="text-gray-700">
              {selectedDay}/{selectedMonth}/{selectedYear}
            </Text>
            <Text className="text-gray-400">📅</Text>
          </TouchableOpacity>
        </View>

        {analysisType === "advanced" && (
          <View className="mb-4 p-3 bg-purple-50 rounded-lg">
            <Text className="text-purple-800 font-medium mb-2">
              {t("advanced_analysis_features")}
            </Text>
            <Text className="text-gray-700 mb-1">{t("life_path_number")}</Text>
            <Text className="text-gray-700 mb-1">
              {t("expression_number_feature")}
            </Text>
            <Text className="text-gray-700 mb-1">{t("soul_urge_number")}</Text>
            <Text className="text-gray-700 mb-1">
              {t("personality_number_feature")}
            </Text>
            <Text className="text-gray-700 mb-1">{t("maturity_number")}</Text>
            <Text className="text-gray-700">
              {t("personal_year_number_feature")}
            </Text>
          </View>
        )}

        <TouchableOpacity
          className="bg-purple-600 py-3 px-4 rounded-md items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-medium text-lg">{t("analyze")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}