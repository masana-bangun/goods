import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { normalisasiNama, formatTanggal } from "../utils/numerologyUtils";

interface NumerologyFormProps {
  onSubmit: (name: string, birthdate: Date, gender: "Male" | "Female") => void;
}

export default function NumerologyForm({
  onSubmit = () => {},
}: NumerologyFormProps) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [normalizedName, setNormalizedName] = useState("");
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [analysisType, setAnalysisType] = useState<"basic" | "advanced">(
    "basic",
  );

  const handleNameChange = (text: string) => {
    setName(text);
    setNormalizedName(normalisasiNama(text));
  };

  const handleDateChange = (day: number, month: number, year: number) => {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
    const newDate = new Date(year, month - 1, day);
    setBirthdate(newDate);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 100; year--) {
      years.push(year);
    }
    return years;
  };

  const generateDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
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

  const handleSubmit = () => {
    if (name.trim() && birthdate) {
      onSubmit(name, birthdate, gender);
    }
  };

  return (
    <ScrollView className="bg-white rounded-lg shadow-md w-full max-w-md">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
          Numerology Analysis
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
              Basic Analysis
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
              Advanced Analysis
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">Full Name</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 bg-gray-50"
            placeholder="Enter your full name"
            value={name}
            onChangeText={handleNameChange}
          />
          {normalizedName ? (
            <Text className="text-xs text-gray-500 mt-1">
              Normalized: {normalizedName}
            </Text>
          ) : null}
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">Gender</Text>
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
                Male
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
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-1 font-medium">Birth Date</Text>
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

        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white rounded-lg p-6 w-96 max-w-full max-h-[90%]">
              <Text className="text-lg font-bold text-center mb-4 text-purple-800">
                Select Birth Date
              </Text>

              {/* Year and Month Dropdowns */}
              <View className="flex-row justify-between mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-700 mb-1 font-medium text-sm">
                    Year
                  </Text>
                  <View className="border border-gray-300 rounded-md bg-gray-50">
                    <Picker
                      selectedValue={selectedYear}
                      onValueChange={(itemValue) => {
                        setSelectedYear(itemValue);
                        handleDateChange(selectedDay, selectedMonth, itemValue);
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
                    Month
                  </Text>
                  <View className="border border-gray-300 rounded-md bg-gray-50">
                    <Picker
                      selectedValue={selectedMonth}
                      onValueChange={(itemValue) => {
                        setSelectedMonth(itemValue);
                        handleDateChange(selectedDay, itemValue, selectedYear);
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
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <View key={day} className="flex-1 p-2 bg-purple-100">
                        <Text className="text-purple-800 text-center font-semibold text-xs">
                          {day}
                        </Text>
                      </View>
                    ),
                  )}
                </View>

                {/* Calendar Days Grid */}
                <View className="border border-gray-300">
                  {(() => {
                    const firstDayOfMonth = new Date(
                      selectedYear,
                      selectedMonth - 1,
                      1,
                    ).getDay();
                    const daysInMonth = new Date(
                      selectedYear,
                      selectedMonth,
                      0,
                    ).getDate();
                    const totalCells =
                      Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
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

                    return Array.from(
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
                                  day === selectedDay ? "bg-purple-600" : ""
                                }`}
                                disabled={!day}
                                onPress={() => {
                                  if (day) {
                                    setSelectedDay(day);
                                    handleDateChange(
                                      day,
                                      selectedMonth,
                                      selectedYear,
                                    );
                                  }
                                }}
                              >
                                {day && (
                                  <Text
                                    className={`text-sm font-medium ${
                                      day === selectedDay
                                        ? "text-white"
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
                    );
                  })()}
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
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-purple-600 py-2 px-4 rounded-md flex-1 ml-2"
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text className="text-white text-center font-medium">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {analysisType === "advanced" && (
          <View className="mb-4 p-3 bg-purple-50 rounded-lg">
            <Text className="text-purple-800 font-medium mb-2">
              Advanced Analysis Features:
            </Text>
            <Text className="text-gray-700 mb-1">
              • Life Path Number (Hara)
            </Text>
            <Text className="text-gray-700 mb-1">• Expression Number</Text>
            <Text className="text-gray-700 mb-1">• Soul Urge Number</Text>
            <Text className="text-gray-700 mb-1">• Personality Number</Text>
            <Text className="text-gray-700 mb-1">• Maturity Number</Text>
            <Text className="text-gray-700">• Personal Year Number</Text>
          </View>
        )}

        <TouchableOpacity
          className="bg-purple-600 py-3 px-4 rounded-md items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-medium text-lg">Analyze</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
