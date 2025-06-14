import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { ArrowRight, Star, Gift, Share2, User } from "lucide-react-native";
import NameDictionary from "./NameDictionary";

interface HomeScreenProps {
  userName?: string;
  isPremium?: boolean;
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({
  userName = "User",
  isPremium = false,
  onNavigate = () => {},
}: HomeScreenProps) {
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [showNameDictionary, setShowNameDictionary] = useState(false);

  const successfulPeople = [
    {
      name: "Warren Buffett",
      synchronize: 8.9,
      coherence: 9.2,
      momentum: 8.7,
      icon: "💼",
    },
    {
      name: "Jeff Bezos",
      synchronize: 9.1,
      coherence: 8.8,
      momentum: 9.5,
      icon: "🚀",
    },
    {
      name: "Elon Musk",
      synchronize: 9.3,
      coherence: 8.5,
      momentum: 9.8,
      icon: "⚡",
    },
    {
      name: "Bill Gates",
      synchronize: 8.7,
      coherence: 9.4,
      momentum: 8.9,
      icon: "💻",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPersonIndex(
        (prevIndex) => (prevIndex + 1) % successfulPeople.length,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentPerson = successfulPeople[currentPersonIndex];

  return (
    <ScrollView className="bg-gray-100">
      {/* Header */}
      <View className="bg-purple-700 p-6 rounded-b-3xl">
        <Text className="text-white text-lg mb-1">Welcome back,</Text>
        <Text className="text-white text-2xl font-bold">{userName}</Text>

        {!isPremium && (
          <TouchableOpacity
            className="bg-yellow-400 mt-4 p-3 rounded-lg flex-row items-center justify-between"
            onPress={() => onNavigate("membership")}
          >
            <View className="flex-row items-center">
              <Star size={20} color="#7c3aed" />
              <Text className="text-purple-800 font-medium ml-2">
                Upgrade to Premium
              </Text>
            </View>
            <ArrowRight size={20} color="#7c3aed" />
          </TouchableOpacity>
        )}
      </View>

      {/* Quick Actions - Single Row Layout */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-3">Quick Actions</Text>
        <View className="flex-row justify-between items-center px-2">
          {/* Name Analysis */}
          <TouchableOpacity
            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl items-center justify-center shadow-lg"
            onPress={() => onNavigate("analyze")}
          >
            <View className="items-center">
              <Text className="text-xl mb-1">🔬</Text>
              <Text className="text-white text-xs font-bold text-center">Name Analysis</Text>
            </View>
          </TouchableOpacity>
          
          {/* Compatibility */}
          <TouchableOpacity
            className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl items-center justify-center shadow-lg"
            onPress={() => onNavigate("compatibility")}
          >
            <View className="items-center">
              <Text className="text-xl mb-1">💕</Text>
              <Text className="text-white text-xs font-bold text-center">Love Couple</Text>
            </View>
          </TouchableOpacity>

          {/* Name Dictionary */}
          <TouchableOpacity
            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl items-center justify-center shadow-xl"
            onPress={() => setShowNameDictionary(true)}
          >
            <View className="items-center">
              <Text className="text-lg mb-1">📚</Text>
              <Text className="text-white text-xs font-bold">DictioName</Text>
            </View>
          </TouchableOpacity>
            
          {/* Name Generator */}
          <TouchableOpacity
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-xl items-center justify-center shadow-lg"
            onPress={() => onNavigate("names")}
          >
            <View className="items-center">
              <Text className="text-xl mb-0">⭐⭐</Text>
              <Text className="text-white text-xs font-bold text-center">Generator Name Optimizer</Text>
            </View>
          </TouchableOpacity>
            
          {/* Life Report */}
          <TouchableOpacity
            className={`w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl items-center justify-center shadow-lg ${!isPremium ? "opacity-70" : ""}`}
            onPress={() => onNavigate("report")}
            disabled={!isPremium}
          >
            <View className="items-center">
              <Text className="text-xl mb-0">📈</Text>
              <Text className="text-white text-xs font-bold text-center">LifePlan Report</Text>
              {!isPremium && (
                <View className="absolute -top-1 -right-1 bg-yellow-300 rounded-full p-1">
                  <Star size={6} color="#7c3aed" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Successful People's Names Value */}
      <View className="p-4 mb-4">
        <View className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-white font-bold text-sm mb-1">
                Successful people's : {currentPerson.name}
              </Text>
              <Text className="text-white opacity-90 text-xs mb-2">
                Synchronize: {Math.round(currentPerson.synchronize * 10)}% | Coherence: {Math.round(currentPerson.coherence * 10)}% | Momentum: {currentPerson.momentum}/10
              </Text>
              <TouchableOpacity className="bg-white py-1.5 px-3 rounded-lg flex-row items-center self-start">
                <Text className="text-green-600 font-medium text-xs">
                  Discover the power of names through our comprehensive analysis tools. Want to have values like them? >> Learn More
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-12 h-12 bg-white rounded-full items-center justify-center">
              <Text className="text-2xl">{currentPerson.icon}</Text>
            </View>
          </View>
        </View>
      </View>



      {/* Earn Free Credits */}
      <View className="p-4 mb-4">
        <View className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-white font-bold text-lg mb-2">
                Earn Free Credits
              </Text>
              <Text className="text-white opacity-90 mb-3">
                Share with friends to unlock premium features
              </Text>
              <TouchableOpacity className="bg-white py-2 px-4 rounded-lg flex-row items-center self-start">
                <Share2 size={16} color="#8b5cf6" />
                <Text className="text-purple-600 font-medium ml-1">
                  Share Now
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-16 h-16 bg-white rounded-full items-center justify-center">
              <Gift size={32} color="#8b5cf6" />
            </View>
          </View>
        </View>
      </View>

      <NameDictionary
        visible={showNameDictionary}
        onClose={() => setShowNameDictionary(false)}
      />
    </ScrollView>
  );
}