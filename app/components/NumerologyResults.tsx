import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft, Star, TrendingUp, Heart, Brain, Target } from "lucide-react-native";
import { 
  generateNumerologyPatterns, 
  calculateLifePathNumber,
  getNumerologyMeaning,
  hitungNilaiNama 
} from "../utils/numerologyUtils";

interface NumerologyResultsProps {
  name: string;
  birthdate: Date;
  gender: "Male" | "Female";
  onBack: () => void;
  isPremium?: boolean;
}

export default function NumerologyResults({
  name,
  birthdate,
  gender,
  onBack,
  isPremium = true,
}: NumerologyResultsProps) {
  const patterns = generateNumerologyPatterns(name, birthdate, gender);
  const lifePathNumber = calculateLifePathNumber(birthdate);
  const expressionNumber = hitungNilaiNama(name);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={onBack}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft size={24} color="#8b5cf6" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-purple-800">
            Numerology Analysis
          </Text>
        </View>

        {/* Personal Info */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-xl font-bold mb-2 text-gray-800">
            {patterns.namaNormal}
          </Text>
          <Text className="text-gray-600 mb-1">
            Born: {formatDate(birthdate)}
          </Text>
          <Text className="text-gray-600">Gender: {gender}</Text>
        </View>

        {/* Life Path Number */}
        <View className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <Star size={24} color="white" />
            <Text className="text-white text-lg font-bold ml-2">
              Life Path Number
            </Text>
          </View>
          <Text className="text-white text-3xl font-bold mb-2">
            {lifePathNumber}
          </Text>
          <Text className="text-white opacity-90">
            {getNumerologyMeaning(lifePathNumber)}
          </Text>
        </View>

        {/* Expression Number */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <TrendingUp size={20} color="#8b5cf6" />
            <Text className="text-gray-800 text-lg font-bold ml-2">
              Expression Number
            </Text>
          </View>
          <Text className="text-purple-600 text-2xl font-bold mb-2">
            {expressionNumber}
          </Text>
          <Text className="text-gray-700">
            {getNumerologyMeaning(expressionNumber)}
          </Text>
        </View>

        {/* Name Pattern */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Brain size={20} color="#8b5cf6" />
            <Text className="text-gray-800 text-lg font-bold ml-2">
              Name Pattern
            </Text>
          </View>
          <Text className="text-purple-600 text-2xl font-bold mb-2">
            {patterns.pola_nama}
          </Text>
          <Text className="text-gray-700">
            Your name carries the energy of {patterns.pola_nama.toLowerCase()}
          </Text>
        </View>

        {/* Birth Pattern */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Heart size={20} color="#8b5cf6" />
            <Text className="text-gray-800 text-lg font-bold ml-2">
              Birth Pattern
            </Text>
          </View>
          <Text className="text-purple-600 text-2xl font-bold mb-2">
            {patterns.pola_ultah}
          </Text>
          <Text className="text-gray-700">
            Your birth date resonates with {patterns.pola_ultah.toLowerCase()} energy
          </Text>
        </View>

        {/* Premium Features */}
        {isPremium && (
          <View className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
            <View className="flex-row items-center mb-3">
              <Target size={20} color="#059669" />
              <Text className="text-green-800 text-lg font-bold ml-2">
                Premium Insights
              </Text>
            </View>
            <Text className="text-green-700 mb-2">
              • Detailed yearly forecast available
            </Text>
            <Text className="text-green-700 mb-2">
              • Compatibility analysis unlocked
            </Text>
            <Text className="text-green-700">
              • Name optimization suggestions ready
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="space-y-3">
          <TouchableOpacity className="bg-purple-600 py-3 px-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Generate Life Report
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-pink-500 py-3 px-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Check Compatibility
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-blue-500 py-3 px-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Optimize Name
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}