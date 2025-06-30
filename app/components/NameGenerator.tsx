import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RefreshCw, Star, Heart, Zap } from "lucide-react-native";
import { generateNameSuggestions, hitungNilaiNama } from "../utils/numerologyUtils";

interface NameGeneratorProps {
  isPremium?: boolean;
}

export default function NameGenerator({ isPremium = true }: NameGeneratorProps) {
  const [originalName, setOriginalName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [addWordsCount, setAddWordsCount] = useState<1 | 2>(1);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNames = () => {
    if (!originalName.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const suggestions = generateNameSuggestions(
        originalName,
        birthdate,
        gender,
        addWordsCount === 1 ? "oneWord" : "twoWords"
      );
      setGeneratedNames(suggestions.slice(0, 10));
      setIsGenerating(false);
    }, 1000);
  };

  const getNameScore = (name: string) => {
    const score = hitungNilaiNama(name);
    return Math.min(100, score * 10 + Math.floor(Math.random() * 20));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-gray-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-blue-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-gray-100";
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
          Name Generator & Optimizer
        </Text>

        {/* Original Name Input */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Original Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 bg-white"
            placeholder="Enter your current name"
            value={originalName}
            onChangeText={setOriginalName}
          />
        </View>

        {/* Gender Selection */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Gender</Text>
          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 mr-2 p-3 rounded-lg border ${
                gender === "Male"
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-50 border-gray-300"
              }`}
              onPress={() => setGender("Male")}
            >
              <Text
                className={`text-center font-medium ${
                  gender === "Male" ? "text-blue-700" : "text-gray-700"
                }`}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 ml-2 p-3 rounded-lg border ${
                gender === "Female"
                  ? "bg-pink-100 border-pink-500"
                  : "bg-gray-50 border-gray-300"
              }`}
              onPress={() => setGender("Female")}
            >
              <Text
                className={`text-center font-medium ${
                  gender === "Female" ? "text-pink-700" : "text-gray-700"
                }`}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Words Count */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">
            Number of Words to Add
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 mr-2 p-3 rounded-lg border ${
                addWordsCount === 1
                  ? "bg-purple-100 border-purple-500"
                  : "bg-gray-50 border-gray-300"
              }`}
              onPress={() => setAddWordsCount(1)}
            >
              <Text
                className={`text-center font-medium ${
                  addWordsCount === 1 ? "text-purple-700" : "text-gray-700"
                }`}
              >
                Add One Word
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 ml-2 p-3 rounded-lg border ${
                addWordsCount === 2
                  ? "bg-purple-100 border-purple-500"
                  : "bg-gray-50 border-gray-300"
              }`}
              onPress={() => setAddWordsCount(2)}
            >
              <Text
                className={`text-center font-medium ${
                  addWordsCount === 2 ? "text-purple-700" : "text-gray-700"
                }`}
              >
                Add Two Words
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          className="bg-purple-600 py-3 px-4 rounded-lg mb-6 flex-row items-center justify-center"
          onPress={generateNames}
          disabled={isGenerating || !originalName.trim()}
        >
          <RefreshCw size={20} color="white" />
          <Text className="text-white font-medium ml-2 text-lg">
            {isGenerating ? "Generating..." : "Generate Optimized Names"}
          </Text>
        </TouchableOpacity>

        {/* Generated Names */}
        {generatedNames.length > 0 && (
          <View>
            <Text className="text-lg font-bold mb-4 text-gray-800">
              Optimized Names ({generatedNames.length})
            </Text>
            
            {generatedNames.map((name, index) => {
              const score = getNameScore(name);
              return (
                <View
                  key={index}
                  className={`p-4 rounded-lg border mb-3 ${getScoreBgColor(score)} border-gray-200`}
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-lg font-bold flex-1 text-gray-800">
                      {name}
                    </Text>
                    <View className="bg-white px-2 py-1 rounded flex-row items-center">
                      <Star size={14} color="#fbbf24" />
                      <Text className={`font-bold text-sm ml-1 ${getScoreColor(score)}`}>
                        {score}
                      </Text>
                    </View>
                  </View>
                  
                  <Text className="text-gray-700 mb-3 text-sm">
                    Numerology Value: {hitungNilaiNama(name)} | Harmony Score: {score}%
                  </Text>
                  
                  <View className="flex-row justify-between">
                    <TouchableOpacity className="bg-purple-500 px-3 py-1 rounded flex-row items-center">
                      <Heart size={14} color="white" />
                      <Text className="text-white text-xs ml-1">Save</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="bg-blue-500 px-3 py-1 rounded flex-row items-center">
                      <Zap size={14} color="white" />
                      <Text className="text-white text-xs ml-1">Analyze</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Premium Features */}
        {isPremium && (
          <View className="bg-green-50 rounded-lg p-4 mt-4 border border-green-200">
            <Text className="text-green-800 font-bold text-lg mb-2">
              🌟 Premium Features Active
            </Text>
            <Text className="text-green-700 mb-1">
              • Access to extended name database (exp1-exp9)
            </Text>
            <Text className="text-green-700 mb-1">
              • Advanced harmony calculations
            </Text>
            <Text className="text-green-700 mb-1">
              • Unlimited name generations
            </Text>
            <Text className="text-green-700">
              • Personalized optimization suggestions
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}