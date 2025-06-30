import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft, Star, TrendingUp, Heart, Brain, Target } from "lucide-react-native";

interface NumerologyResultsProps {
  result: {
    name: string;
    birthdate: Date;
    gender: "Male" | "Female";
    lifePathNumber: number;
    expressionNumber: number;
    personalityNumber: number;
  };
  onBack: () => void;
  isPremium?: boolean;
}

export default function NumerologyResults({
  result,
  onBack,
  isPremium = true,
}: NumerologyResultsProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getNumberMeaning = (number: number) => {
    const meanings: Record<number, string> = {
      1: "Leadership, independence, and pioneering spirit",
      2: "Cooperation, diplomacy, and partnership",
      3: "Creativity, communication, and self-expression",
      4: "Stability, hard work, and practicality",
      5: "Freedom, adventure, and versatility",
      6: "Nurturing, responsibility, and healing",
      7: "Spirituality, introspection, and analysis",
      8: "Material success, ambition, and authority",
      9: "Humanitarianism, wisdom, and completion",
    };
    return meanings[number] || "Unique path of discovery";
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
            {result.name}
          </Text>
          <Text className="text-gray-600 mb-1">
            Born: {formatDate(result.birthdate)}
          </Text>
          <Text className="text-gray-600">Gender: {result.gender}</Text>
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
            {result.lifePathNumber}
          </Text>
          <Text className="text-white opacity-90">
            {getNumberMeaning(result.lifePathNumber)}
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
            {result.expressionNumber}
          </Text>
          <Text className="text-gray-700">
            {getNumberMeaning(result.expressionNumber)}
          </Text>
        </View>

        {/* Personality Number */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Brain size={20} color="#8b5cf6" />
            <Text className="text-gray-800 text-lg font-bold ml-2">
              Personality Number
            </Text>
          </View>
          <Text className="text-purple-600 text-2xl font-bold mb-2">
            {result.personalityNumber}
          </Text>
          <Text className="text-gray-700">
            {getNumberMeaning(result.personalityNumber)}
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
            <Text className="text-white text-center font-semibent">
              Optimize Name
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}