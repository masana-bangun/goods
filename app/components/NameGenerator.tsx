import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RefreshCw, Star, Heart, Zap } from "lucide-react-native";

interface NameGeneratorProps {
  isPremium?: boolean;
}

export default function NameGenerator({ isPremium = true }: NameGeneratorProps) {
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [nameStyle, setNameStyle] = useState<"Traditional" | "Modern" | "Unique">("Modern");
  const [generatedNames, setGeneratedNames] = useState<Array<{ name: string; meaning: string; score: number }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample name database
  const nameDatabase = {
    Male: {
      Traditional: [
        { name: "Ahmad Rizki", meaning: "Praised and blessed", score: 85 },
        { name: "Muhammad Fajar", meaning: "Praised dawn", score: 92 },
        { name: "Abdul Rahman", meaning: "Servant of the merciful", score: 88 },
        { name: "Hasan Wijaya", meaning: "Good and victorious", score: 90 },
        { name: "Ibrahim Hakim", meaning: "Father of nations, wise", score: 87 },
      ],
      Modern: [
        { name: "Arya Pratama", meaning: "Noble first", score: 94 },
        { name: "Dimas Aditya", meaning: "Strong sun", score: 89 },
        { name: "Kevin Mahendra", meaning: "Gentle great lord", score: 91 },
        { name: "Ryan Saputra", meaning: "Little king son", score: 86 },
        { name: "Alvin Pradana", meaning: "Noble friend first", score: 93 },
      ],
      Unique: [
        { name: "Zephyr Ananda", meaning: "West wind joy", score: 96 },
        { name: "Atlas Surya", meaning: "Bearer sun", score: 95 },
        { name: "Phoenix Bayu", meaning: "Rising wind", score: 97 },
        { name: "Orion Cahaya", meaning: "Hunter light", score: 94 },
        { name: "Sage Indra", meaning: "Wise king of gods", score: 92 },
      ],
    },
    Female: {
      Traditional: [
        { name: "Siti Nurhaliza", meaning: "Lady of light", score: 89 },
        { name: "Fatimah Zahra", meaning: "Captivating flower", score: 91 },
        { name: "Aisyah Putri", meaning: "Living princess", score: 88 },
        { name: "Khadijah Sari", meaning: "Premature essence", score: 90 },
        { name: "Maryam Indah", meaning: "Beloved beautiful", score: 87 },
      ],
      Modern: [
        { name: "Alicia Putri", meaning: "Noble princess", score: 93 },
        { name: "Cynthia Dewi", meaning: "Moon goddess", score: 91 },
        { name: "Jessica Sari", meaning: "Rich essence", score: 89 },
        { name: "Michelle Ayu", meaning: "Who is like God beautiful", score: 94 },
        { name: "Stephanie Lestari", meaning: "Crown eternal", score: 92 },
      ],
      Unique: [
        { name: "Luna Seraphina", meaning: "Moon burning one", score: 97 },
        { name: "Aurora Kirana", meaning: "Dawn ray of light", score: 96 },
        { name: "Celeste Amara", meaning: "Heavenly eternal", score: 95 },
        { name: "Iris Melati", meaning: "Rainbow jasmine", score: 94 },
        { name: "Nova Cahaya", meaning: "New light", score: 98 },
      ],
    },
  };

  const generateNames = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const names = nameDatabase[gender][nameStyle];
      const shuffled = [...names].sort(() => Math.random() - 0.5);
      setGeneratedNames(shuffled.slice(0, 5));
      setIsGenerating(false);
    }, 1000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 90) return "text-blue-600";
    if (score >= 85) return "text-yellow-600";
    return "text-gray-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 95) return "bg-green-100";
    if (score >= 90) return "bg-blue-100";
    if (score >= 85) return "bg-yellow-100";
    return "bg-gray-100";
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
          Name Generator
        </Text>

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

        {/* Name Style Selection */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Name Style</Text>
          <View className="border border-gray-300 rounded-lg bg-gray-50">
            <Picker
              selectedValue={nameStyle}
              onValueChange={(itemValue) => setNameStyle(itemValue)}
              style={{ height: 50 }}
            >
              <Picker.Item label="Traditional" value="Traditional" />
              <Picker.Item label="Modern" value="Modern" />
              <Picker.Item label="Unique" value="Unique" />
            </Picker>
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          className="bg-purple-600 py-3 px-4 rounded-lg mb-6 flex-row items-center justify-center"
          onPress={generateNames}
          disabled={isGenerating}
        >
          <RefreshCw size={20} color="white" />
          <Text className="text-white font-medium ml-2 text-lg">
            {isGenerating ? "Generating..." : "Generate Names"}
          </Text>
        </TouchableOpacity>

        {/* Generated Names */}
        {generatedNames.length > 0 && (
          <View>
            <Text className="text-lg font-bold mb-4 text-gray-800">
              Generated Names ({generatedNames.length})
            </Text>
            
            {generatedNames.map((nameData, index) => (
              <View
                key={index}
                className={`p-4 rounded-lg border mb-3 ${getScoreBgColor(nameData.score)} border-gray-200`}
              >
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-bold flex-1 text-gray-800">
                    {nameData.name}
                  </Text>
                  <View className="bg-white px-2 py-1 rounded flex-row items-center">
                    <Star size={14} color="#fbbf24" />
                    <Text className={`font-bold text-sm ml-1 ${getScoreColor(nameData.score)}`}>
                      {nameData.score}
                    </Text>
                  </View>
                </View>
                
                <Text className="text-gray-700 mb-3">
                  {nameData.meaning}
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
            ))}
          </View>
        )}

        {/* Premium Features */}
        {isPremium && (
          <View className="bg-green-50 rounded-lg p-4 mt-4 border border-green-200">
            <Text className="text-green-800 font-bold text-lg mb-2">
              🌟 Premium Features Active
            </Text>
            <Text className="text-green-700 mb-1">
              • Access to 1000+ premium names
            </Text>
            <Text className="text-green-700 mb-1">
              • Advanced numerology scoring
            </Text>
            <Text className="text-green-700 mb-1">
              • Cultural significance insights
            </Text>
            <Text className="text-green-700">
              • Personalized recommendations
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}