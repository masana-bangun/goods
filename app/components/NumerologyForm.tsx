import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
  const [normalizedName, setNormalizedName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [analysisType, setAnalysisType] = useState<"basic" | "advanced">(
    "advanced",
  );

  const handleNameChange = (text: string) => {
    setName(text);
    setNormalizedName(normalisasiNama(text));
  };

  const handleSubmit = () => {
    if (name.trim()) {
      const birthdate = new Date(selectedYear, selectedMonth - 1, selectedDay);
      onSubmit(name, birthdate, gender);
    }
  };

  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 100; year--) {
      years.push(year);
    }
    return years;
  };

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const generateCalendarGrid = () => {
    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const calendarGrid = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarGrid.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarGrid.push(day);
    }

    // Add empty cells to complete the grid
    while (calendarGrid.length < totalCells) {
      calendarGrid.push(null);
    }

    return calendarGrid;
  };

  const calendarGrid = generateCalendarGrid();

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

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-96 max-w-full max-h-[90%]">
            <Text className="text-lg font-bold text-center mb-4 text-purple-800">
              {t("select_birth_date")}
            </Text>

            {/* Year and Month Dropdowns */}
            <View className="flex-row justify-between mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-gray-700 mb-1 font-medium text-sm">
                  {t("year")}
                </Text>
                <View className="border border-gray-300 rounded-md bg-gray-50">
                  <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => {
                      onDateChange(selectedDay, selectedMonth, itemValue);
                    }}
                    style={{ height: 40 }}
                  >
                    {generateYears().map((year) => (
                      <Picker.Item
                        key={year}
                        label={year.toString()}
                        value={year}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View className="flex-1 ml-2">
                <Text className="text-gray-700 mb-1 font-medium text-sm">
                  {t("month")}
                </Text>
                <View className="border border-gray-300 rounded-md bg-gray-50">
                  <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => {
                      onDateChange(selectedDay, itemValue, selectedYear);
                    }}
                    style={{ height: 40 }}
                  >
                    {months.map((month) => (
                      <Picker.Item
                        key={month.value}
                        label={month.label}
                        value={month.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            {/* Calendar Grid */}
            <ScrollView className="mb-4" style={{ maxHeight: 300 }}>
              <Text className="text-center font-semibold mb-3 text-purple-700">
                {months.find((m) => m.value === selectedMonth)?.label}{" "}
                {selectedYear}
              </Text>

              {/* Days of Week Header */}
              <View className="flex-row mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <View key={day} className="flex-1 p-2 bg-purple-100">
                    <Text className="text-purple-800 text-center font-semibold text-xs">
                      {day}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Calendar Days Grid */}
              <View className="border border-gray-300">
                {Array.from(
                  { length: Math.ceil(calendarGrid.length / 7) },
                  (_, weekIndex) => (
                    <View key={weekIndex} className="flex-row">
                      {calendarGrid
                        .slice(weekIndex * 7, (weekIndex + 1) * 7)
                        .map((day, dayIndex) => (
                          <TouchableOpacity
                            key={`${weekIndex}-${dayIndex}`}
                            className={`flex-1 border border-gray-200 min-h-[40px] justify-center items-center ${
                              day ? "bg-white" : "bg-gray-50"
                            } ${
                              day === selectedDay
                                ? "bg-purple-700 shadow-lg border-purple-800"
                                : ""
                            }`}
                            disabled={!day}
                            onPress={() => {
                              if (day) {
                                onDateChange(day, selectedMonth, selectedYear);
                              }
                            }}
                          >
                            {day && (
                              <Text
                                className={`text-sm font-bold ${
                                  day === selectedDay
                                    ? "text-white shadow-sm"
                                    : "text-gray-800"
                                }`}
                              >
                                {day}
                              </Text>
                            )}
                          </TouchableOpacity>
                        ))}
                    </View>
                  ),
                )}
              </View>
            </ScrollView>

            {/* Selected Date Display */}
            <View className="mb-4 p-3 bg-purple-50 rounded-lg">
              <Text className="text-center text-purple-800 font-semibold">
                Selected Date: {selectedDay}/{selectedMonth}/{selectedYear}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-300 py-2 px-4 rounded-md flex-1 mr-2"
                onPress={() => setShowDatePicker(false)}
              >
                <Text className="text-gray-700 text-center font-medium">
                  {t("cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-purple-600 py-2 px-4 rounded-md flex-1 ml-2"
                onPress={() => setShowDatePicker(false)}
              >
                <Text className="text-white text-center font-medium">
                  {t("done")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}