import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from './components/TranslationProvider';

export default function DatePickerModal() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  
  const selectedDay = parseInt(params.day as string) || 1;
  const selectedMonth = parseInt(params.month as string) || 1;
  const selectedYear = parseInt(params.year as string) || new Date().getFullYear();

  const handleDateChange = (day: number, month: number, year: number) => {
    router.setParams({
      day: day.toString(),
      month: month.toString(),
      year: year.toString(),
    });
  };

  const handleDone = () => {
    router.back();
  };

  const handleCancel = () => {
    router.back();
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
              {t("month")}
            </Text>
            <View className="border border-gray-300 rounded-md bg-gray-50">
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => {
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
                            handleDateChange(day, selectedMonth, selectedYear);
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
            onPress={handleCancel}
          >
            <Text className="text-gray-700 text-center font-medium">
              {t("cancel")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-purple-600 py-2 px-4 rounded-md flex-1 ml-2"
            onPress={handleDone}
          >
            <Text className="text-white text-center font-medium">
              {t("done")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}