import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  normalisasiNama,
  formatTanggal,
  checkCompatibility,
} from "../utils/numerologyUtils";

interface CompatibilityCheckerProps {
  isPremium?: boolean;
}

export default function CompatibilityChecker({
  isPremium = true,
}: CompatibilityCheckerProps) {
  // Person 1 state
  const [name1, setName1] = useState("");
  const [birthdate1, setBirthdate1] = useState(new Date());
  const [showDatePicker1, setShowDatePicker1] = useState(false);

  // Person 2 state
  const [name2, setName2] = useState("");
  const [birthdate2, setBirthdate2] = useState(new Date());
  const [showDatePicker2, setShowDatePicker2] = useState(false);

  // Results state
  const [results, setResults] = useState<ReturnType<
    typeof checkCompatibility
  > | null>(null);

  const handleDateChange1 = (event: any, selectedDate?: Date) => {
    setShowDatePicker1(false);
    if (selectedDate) {
      setBirthdate1(selectedDate);
    }
  };

  const handleDateChange2 = (event: any, selectedDate?: Date) => {
    setShowDatePicker2(false);
    if (selectedDate) {
      setBirthdate2(selectedDate);
    }
  };

  const handleCheck = () => {
    if (name1.trim() && name2.trim()) {
      const compatibility = checkCompatibility(
        name1,
        birthdate1,
        name2,
        birthdate2,
      );
      setResults(compatibility);
    }
  };

  const renderCompatibilityMeter = (score: number) => {
    return (
      <View className="items-center my-4">
        <View className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <View
            className={`h-full ${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : score >= 40 ? "bg-orange-500" : "bg-red-500"}`}
            style={{ width: `${score}%` }}
          />
        </View>
        <Text className="text-3xl font-bold mt-2">{score}%</Text>
      </View>
    );
  };

  const renderAreaScore = (name: string, score: number) => {
    return (
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-700 capitalize">{name}</Text>
        <View className="flex-row items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <View
              key={i}
              className={`w-3 h-3 rounded-full mx-0.5 ${i <= score ? "bg-purple-600" : "bg-gray-200"}`}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="bg-white p-4 rounded-lg shadow-md">
      <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
        Compatibility Checker
      </Text>

      <View className="mb-6 p-4 bg-purple-50 rounded-lg">
        <Text className="text-lg font-semibold mb-2 text-purple-800">
          Person 1
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">Full Name</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 bg-white"
            placeholder="Enter full name"
            value={name1}
            onChangeText={setName1}
          />
        </View>

        <View className="mb-2">
          <Text className="text-gray-700 mb-1 font-medium">Birth Date</Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-md p-3 bg-white flex-row justify-between items-center"
            onPress={() => setShowDatePicker1(true)}
          >
            <Text>{formatTanggal(birthdate1)}</Text>
          </TouchableOpacity>

          {showDatePicker1 && (
            <DateTimePicker
              value={birthdate1}
              mode="date"
              display="default"
              onChange={handleDateChange1}
            />
          )}
        </View>
      </View>

      <View className="mb-6 p-4 bg-blue-50 rounded-lg">
        <Text className="text-lg font-semibold mb-2 text-blue-800">
          Person 2
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">Full Name</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 bg-white"
            placeholder="Enter full name"
            value={name2}
            onChangeText={setName2}
          />
        </View>

        <View className="mb-2">
          <Text className="text-gray-700 mb-1 font-medium">Birth Date</Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-md p-3 bg-white flex-row justify-between items-center"
            onPress={() => setShowDatePicker2(true)}
          >
            <Text>{formatTanggal(birthdate2)}</Text>
          </TouchableOpacity>

          {showDatePicker2 && (
            <DateTimePicker
              value={birthdate2}
              mode="date"
              display="default"
              onChange={handleDateChange2}
            />
          )}
        </View>
      </View>

      <TouchableOpacity
        className="bg-purple-600 py-3 px-4 rounded-md items-center mb-6"
        onPress={handleCheck}
      >
        <Text className="text-white font-medium text-lg">
          Check Compatibility
        </Text>
      </TouchableOpacity>

      {results && (
        <View className="p-4 bg-gray-50 rounded-lg">
          <Text className="text-xl font-bold text-center mb-2">
            Compatibility Results
          </Text>

          {renderCompatibilityMeter(results.compatibilityScore)}

          <Text className="text-lg text-center mb-4">
            {results.description}
          </Text>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">
              Compatibility Areas
            </Text>
            {Object.entries(results.compatibilityAreas).map(([area, score]) =>
              renderAreaScore(area, score),
            )}
          </View>

          <View className="bg-green-100 p-4 rounded-lg mt-4">
            <Text className="text-lg font-semibold text-green-800 mb-2">
              Detailed Analysis - Unlocked!
            </Text>
            <Text className="text-gray-700 mb-3">
              All premium features are now available for your compatibility
              analysis.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
