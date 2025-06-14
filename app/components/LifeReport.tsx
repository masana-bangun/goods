import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getPola,
  reduksiAngka,
  pythagoreanValues,
  generateLifeReport,
} from "../utils/numerologyUtils";

interface LifeReportProps {
  name: string;
  birthdate: Date;
  gender: "Male" | "Female";
  isPremium?: boolean;
}

export default function LifeReport({
  name = "",
  birthdate = new Date(),
  gender = "Male",
  isPremium = false,
}: LifeReportProps) {
  // Always show premium features
  const isPremiumEnabled = true;

  // State for modals and selections
  const [showLifeReport, setShowLifeReport] = useState(false);
  const [showDailyAdvice, setShowDailyAdvice] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMonthlyAdvice, setShowMonthlyAdvice] = useState(false);

  // Use the generateLifeReport utility function to get all the data
  const {
    report: lifeReportData,
    patterns,
    lifePath,
    nameWords,
  } = generateLifeReport(name, birthdate, gender);

  // Generate year options (from birth year to 100 years in the future)
  const birthYear = birthdate.getFullYear();
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = birthYear; i <= currentYear + 100; i++) {
    yearOptions.push(i);
  }

  // Month options
  const monthOptions = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  const renderTableHeader = () => {
    return (
      <View className="flex-row bg-purple-100 border-b border-gray-300">
        <Text className="w-16 p-2 font-bold text-xs text-center border-r border-gray-300">
          Year
        </Text>
        <Text className="w-12 p-2 font-bold text-xs text-center border-r border-gray-300">
          Age
        </Text>
        <Text className="w-16 p-2 font-bold text-xs text-center border-r border-gray-300">
          Challenge
        </Text>
        <Text className="w-12 p-2 font-bold text-xs text-center border-r border-gray-300">
          Cycle
        </Text>
        <Text className="w-16 p-2 font-bold text-xs text-center border-r border-gray-300">
          Pinnacle
        </Text>
        <Text className="w-16 p-2 font-bold text-xs text-center border-r border-gray-300">
          Cal Year
        </Text>
        <Text className="w-16 p-2 font-bold text-xs text-center border-r border-gray-300">
          Person Year
        </Text>
        <Text className="w-16 p-2 font-bold text-xs text-center border-r border-gray-300">
          Essence
        </Text>
        <Text className="w-16 p-2 font-bold text-xs text-center border-r border-gray-300">
          Double Ess
        </Text>
        {nameWords.map((word, index) => (
          <Text
            key={index}
            className="w-16 p-2 font-bold text-xs text-center border-r border-gray-300"
          >
            Phrase {index + 1}
          </Text>
        ))}
      </View>
    );
  };

  const renderTableRow = (data: any, index: number) => {
    return (
      <View key={index} className="flex-row border-b border-gray-200">
        <Text className="w-16 p-2 text-xs text-center border-r border-gray-200">
          {data.year}
        </Text>
        <Text className="w-12 p-2 text-xs text-center border-r border-gray-200">
          {data.age}
        </Text>
        <Text className="w-16 p-2 text-xs text-center border-r border-gray-200">
          {data.challenge}
        </Text>
        <View
          className={`w-12 p-2 border-r border-gray-200 ${data.cycleCalYearDiff3 ? "bg-orange-200" : ""}`}
        >
          <Text className="text-xs text-center">{data.cycle}</Text>
        </View>
        <Text className="w-16 p-2 text-xs text-center border-r border-gray-200">
          {data.pinnacle}
        </Text>
        <View
          className={`w-16 p-2 border-r border-gray-200 ${data.cycleCalYearDiff3 ? "bg-orange-200" : ""}`}
        >
          <Text className="text-xs text-center">{data.calYear}</Text>
        </View>
        <View
          className={`w-16 p-2 border-r border-gray-200 ${data.personalEssenceDiff3 ? "bg-red-200" : data.personalEssenceDiff0 ? "bg-yellow-200" : ""}`}
        >
          <Text className="text-xs text-center">{data.personalYear}</Text>
        </View>
        <View
          className={`w-16 p-2 border-r border-gray-200 ${data.personalEssenceDiff3 ? "bg-red-200" : data.personalEssenceDiff0 ? "bg-yellow-200" : ""}`}
        >
          <Text className="text-xs text-center">{data.essence}</Text>
        </View>
        <Text className="w-16 p-2 text-xs text-center border-r border-gray-200">
          {data.doubleEss}
        </Text>
        {data.wordLetters &&
          data.wordLetters.map((letter: string, wordIndex: number) => (
            <Text
              key={wordIndex}
              className="w-16 p-2 text-xs text-center border-r border-gray-200"
            >
              {letter}
            </Text>
          ))}
      </View>
    );
  };

  // Calculate personal day number
  const calculatePersonalDay = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const personalYear = reduksiAngka(
      patterns.angka_ultah + patterns.angka_bulan + reduksiAngka(year),
    );
    const personalMonth = reduksiAngka(personalYear + month);
    const personalDay = reduksiAngka(personalMonth + day);

    return { personalDay, personalMonth, personalYear };
  };

  // Get daily advice based on personal day number
  const getDailyAdvice = (personalDay: number) => {
    const adviceMap: Record<number, string> = {
      1: "Today is perfect for new beginnings and taking initiative. Start that project you've been thinking about. Your leadership qualities shine today.",
      2: "Focus on cooperation and partnerships today. Be patient and diplomatic in your interactions. This is a day for teamwork and harmony.",
      3: "Express your creativity and communicate openly today. Social activities and artistic pursuits are favored. Share your ideas with others.",
      4: "Focus on practical matters and building solid foundations. Hard work and attention to detail will pay off. Organize and plan for the future.",
      5: "Embrace change and seek new experiences today. Travel, adventure, and freedom are highlighted. Be flexible and adaptable.",
      6: "Focus on family, home, and relationships today. Nurturing and caring for others brings fulfillment. Take responsibility for those you love.",
      7: "Take time for reflection and spiritual growth today. Meditation, study, and introspection are favored. Trust your inner wisdom.",
      8: "Focus on material success and achievement today. Business matters and financial decisions are highlighted. Use your organizational skills.",
      9: "Complete projects and let go of what no longer serves you. This is a day for endings and humanitarian efforts. Be generous and compassionate.",
      11: "Trust your intuition and spiritual insights today. This is a master day for inspiration and enlightenment. Share your vision with others.",
      22: "Focus on building something significant and lasting today. Your practical idealism can manifest great achievements. Think big but stay grounded.",
    };

    return (
      adviceMap[personalDay] ||
      "Focus on balance and harmony in all aspects of your life today."
    );
  };

  // Get monthly advice based on personal month number
  const getMonthlyAdvice = (personalMonth: number) => {
    const monthlyAdviceMap: Record<number, string> = {
      1: "This month is about new beginnings and fresh starts. Take initiative in your personal and professional life. Leadership opportunities may arise. Focus on independence and self-reliance.",
      2: "A month for cooperation and building relationships. Patience and diplomacy will serve you well. Focus on partnerships, teamwork, and emotional connections. Avoid rushing decisions.",
      3: "Express your creativity and communicate your ideas this month. Social activities and artistic pursuits are highly favored. Share your talents and connect with others through creative expression.",
      4: "Focus on building solid foundations and practical matters. Hard work, organization, and attention to detail will pay off. This is a month for planning and establishing security.",
      5: "Embrace change and seek new experiences this month. Travel, adventure, and freedom are highlighted. Be flexible and open to unexpected opportunities that come your way.",
      6: "A month focused on family, home, and nurturing relationships. Take responsibility for those you care about. Domestic matters and community involvement are emphasized.",
      7: "Take time for reflection, study, and spiritual growth this month. Meditation and introspection will bring valuable insights. Trust your inner wisdom and intuition.",
      8: "Focus on material success and business achievements this month. Financial matters and career advancement are highlighted. Use your organizational and leadership skills effectively.",
      9: "A month for completion and letting go of what no longer serves you. Humanitarian efforts and helping others will bring fulfillment. Focus on generosity and compassion.",
      11: "Trust your intuition and spiritual insights this month. This is a master month for inspiration and enlightenment. Share your vision and help others see new possibilities.",
      22: "Focus on building something significant and lasting this month. Your practical idealism can manifest great achievements. Think big but stay grounded in reality.",
    };

    return (
      monthlyAdviceMap[personalMonth] ||
      "Focus on balance and harmony in all aspects of your life this month."
    );
  };

  // Generate calendar days for selected month and year
  const generateCalendarDays = () => {
    const days = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const { personalDay } = calculatePersonalDay(date);

      days.push({
        date,
        dateString: `${monthNames[selectedMonth]} ${day}, ${selectedYear}`,
        personalDay,
        advice: getDailyAdvice(personalDay),
        dayOfWeek: date.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get days of week for calendar header
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get first day of month to calculate calendar grid
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  // Create calendar grid
  const createCalendarGrid = () => {
    const grid = [];
    const totalCells =
      Math.ceil((firstDayOfMonth + calendarDays.length) / 7) * 7;

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      grid.push(null);
    }

    // Add days of the month
    calendarDays.forEach((day) => {
      grid.push(day);
    });

    // Add empty cells to complete the grid
    while (grid.length < totalCells) {
      grid.push(null);
    }

    return grid;
  };

  const calendarGrid = createCalendarGrid();

  return (
    <ScrollView className="bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
          Life Report
        </Text>

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">
            {patterns.namaNormal}
          </Text>
          <Text className="text-gray-600">{patterns.tglLahirFormat}</Text>
          <Text className="text-gray-600">Life Path: {lifePath}</Text>
        </View>

        {/* Action Buttons */}
        <View className="mb-6">
          <TouchableOpacity
            className="bg-purple-600 py-3 px-6 rounded-lg mb-3"
            onPress={() => setShowLifeReport(true)}
          >
            <Text className="text-white text-center font-semibold text-lg">
              100 Year Life Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-600 py-3 px-6 rounded-lg"
            onPress={() => setShowDailyAdvice(true)}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Daily Advice
            </Text>
          </TouchableOpacity>
        </View>

        {/* 100 Year Life Report Modal */}
        <Modal
          visible={showLifeReport}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View className="flex-1 bg-white">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-purple-800">
                100-Year Life Report
              </Text>
              <TouchableOpacity
                onPress={() => setShowLifeReport(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                <Text className="font-semibold">Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
              <View className="p-4">
                <View className="mb-4">
                  <Text className="text-lg font-semibold mb-2">
                    {patterns.namaNormal}
                  </Text>
                  <Text className="text-gray-600">
                    {patterns.tglLahirFormat}
                  </Text>
                  <Text className="text-gray-600">Life Path: {lifePath}</Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  className="border border-gray-300"
                >
                  <View>
                    {renderTableHeader()}
                    {lifeReportData.map((data, index) =>
                      renderTableRow(data, index),
                    )}
                  </View>
                </ScrollView>

                <View className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <Text className="text-sm font-semibold mb-2">Legend:</Text>
                  <View className="flex-row items-center mb-1">
                    <View className="w-4 h-4 bg-orange-200 mr-2"></View>
                    <Text className="text-xs">
                      Orange: Cycle & Cal Year difference = 3
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-1">
                    <View className="w-4 h-4 bg-red-200 mr-2"></View>
                    <Text className="text-xs">
                      Red: Personal Year & Essence difference = 3
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-4 h-4 bg-yellow-200 mr-2"></View>
                    <Text className="text-xs">
                      Yellow: Personal Year & Essence difference = 0
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* Daily Advice Modal */}
        <Modal
          visible={showDailyAdvice}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View className="flex-1 bg-white">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-blue-800">
                Daily Advice Calendar
              </Text>
              <TouchableOpacity
                onPress={() => setShowDailyAdvice(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                <Text className="font-semibold">Close</Text>
              </TouchableOpacity>
            </View>

            {/* Date Selector */}
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold mb-4 text-center">
                Select Date
              </Text>

              {/* Year and Month Dropdowns */}
              <View className="flex-row justify-between mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-xs font-medium mb-1">Year:</Text>
                  <View className="border border-gray-300 rounded-lg">
                    <Picker
                      selectedValue={selectedYear}
                      onValueChange={(itemValue) => setSelectedYear(itemValue)}
                      style={{ height: 35 }}
                    >
                      {yearOptions.map((year) => (
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
                  <Text className="text-xs font-medium mb-1">Month:</Text>
                  <View className="border border-gray-300 rounded-lg">
                    <Picker
                      selectedValue={selectedMonth}
                      onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                      style={{ height: 35 }}
                    >
                      {monthOptions.map((month) => (
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

              {/* Monthly Advice Button */}
              <TouchableOpacity
                className="bg-blue-100 p-2 rounded-lg mb-4 self-center"
                style={{ width: "50%" }}
                onPress={() => setShowMonthlyAdvice(!showMonthlyAdvice)}
              >
                <Text className="text-center text-sm font-semibold text-blue-800">
                  Monthly Advice Calendar
                </Text>
              </TouchableOpacity>

              {/* Monthly Advice Calendar Display */}
              {showMonthlyAdvice && (
                <View className="bg-blue-50 p-4 rounded-lg mb-4">
                  <Text className="text-lg font-semibold mb-4 text-center text-blue-800">
                    Monthly Advice Calendar
                  </Text>

                  {/* Year and Month Dropdowns for Monthly Advice */}
                  <View className="flex-row justify-between mb-4">
                    <View className="flex-1 mr-2">
                      <Text className="text-xs font-medium mb-1">Year:</Text>
                      <View className="border border-gray-300 rounded-lg">
                        <Picker
                          selectedValue={selectedYear}
                          onValueChange={(itemValue) =>
                            setSelectedYear(itemValue)
                          }
                          style={{ height: 35 }}
                        >
                          {yearOptions.map((year) => (
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
                      <Text className="text-xs font-medium mb-1">Month:</Text>
                      <View className="border border-gray-300 rounded-lg">
                        <Picker
                          selectedValue={selectedMonth}
                          onValueChange={(itemValue) =>
                            setSelectedMonth(itemValue)
                          }
                          style={{ height: 35 }}
                        >
                          {monthOptions.map((month) => (
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

                  {/* Monthly Advice Content */}
                  <View className="bg-white p-4 rounded-lg">
                    <View className="flex-row justify-between items-center mb-3">
                      <Text className="text-lg font-semibold text-blue-800">
                        {monthOptions[selectedMonth].label} {selectedYear}
                      </Text>
                      <View className="bg-blue-600 px-3 py-1 rounded-full">
                        <Text className="text-white font-bold text-sm">
                          Personal Month:{" "}
                          {(() => {
                            const testDate = new Date(
                              selectedYear,
                              selectedMonth,
                              15,
                            );
                            const { personalMonth } =
                              calculatePersonalDay(testDate);
                            return personalMonth;
                          })()}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-gray-700 leading-5">
                      {(() => {
                        const testDate = new Date(
                          selectedYear,
                          selectedMonth,
                          15,
                        );
                        const { personalMonth } =
                          calculatePersonalDay(testDate);
                        return getMonthlyAdvice(personalMonth);
                      })()}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Personal Day Advice Section */}
            {selectedDate && (
              <View className="p-4 bg-blue-50 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-lg font-semibold text-blue-800">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <View className="bg-blue-600 px-3 py-1 rounded-full">
                    <Text className="text-white font-bold">
                      Personal Day:{" "}
                      {calculatePersonalDay(selectedDate).personalDay}
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-700 leading-5">
                  {getDailyAdvice(
                    calculatePersonalDay(selectedDate).personalDay,
                  )}
                </Text>
              </View>
            )}

            {/* Calendar Grid */}
            <ScrollView className="flex-1 p-4">
              <Text className="text-lg font-semibold mb-4 text-center">
                Daily Advice Calendar - {monthOptions[selectedMonth].label}{" "}
                {selectedYear}
              </Text>

              {/* Calendar Header */}
              <View className="flex-row mb-2">
                {daysOfWeek.map((day) => (
                  <View key={day} className="flex-1 p-2 bg-blue-600">
                    <Text className="text-white text-center font-semibold text-xs">
                      {day}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Calendar Grid */}
              <View className="border border-gray-300">
                {Array.from(
                  { length: Math.ceil(calendarGrid.length / 7) },
                  (_, weekIndex) => (
                    <View key={weekIndex} className="flex-row">
                      {calendarGrid
                        .slice(weekIndex * 7, (weekIndex + 1) * 7)
                        .map((dayData, dayIndex) => (
                          <TouchableOpacity
                            key={`${weekIndex}-${dayIndex}`}
                            className={`flex-1 border border-gray-200 min-h-[80px] p-1 ${
                              dayData ? "bg-white" : "bg-gray-50"
                            }`}
                            disabled={!dayData}
                            onPress={() => {
                              if (dayData) {
                                setSelectedDate(dayData.date);
                              }
                            }}
                          >
                            {dayData && (
                              <View className="flex-1">
                                <View className="flex-row justify-between items-start mb-1">
                                  <Text className="text-sm font-semibold">
                                    {dayData.date.getDate()}
                                  </Text>
                                  <View className="bg-blue-500 px-1 py-0.5 rounded">
                                    <Text className="text-white text-xs font-bold">
                                      {dayData.personalDay}
                                    </Text>
                                  </View>
                                </View>
                                <Text
                                  className="text-xs text-gray-600 leading-3"
                                  numberOfLines={3}
                                >
                                  {dayData.advice.substring(0, 50)}...
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        ))}
                    </View>
                  ),
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
