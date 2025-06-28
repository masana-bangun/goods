import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { X, RefreshCw, Plus } from "lucide-react-native";
import {
  calculateCompatibility,
  generateNameSuggestions,
  normalisasiNama,
} from "../utils/numerologyUtils";

interface FixPersonModalProps {
  visible: boolean;
  onClose: () => void;
  person1Name: string;
  person1Birthdate: Date;
  person1Gender: "Male" | "Female";
  person2Name: string;
  person2Birthdate: Date;
  person2Gender: "Male" | "Female";
  onNameFixed: (
    fixedName: string,
    personToFix: "person1" | "person2",
    harmonyValue: number
  ) => void;
}

interface NameSuggestion {
  name: string;
  harmony: number;
  synchronize: number;
  coherence: number;
  momentum: number;
}

export default function FixPersonModal({
  visible,
  onClose,
  person1Name,
  person1Birthdate,
  person1Gender,
  person2Name,
  person2Birthdate,
  person2Gender,
  onNameFixed,
}: FixPersonModalProps) {
  const [personToFix, setPersonToFix] = useState<"person1" | "person2">("person1");
  const [addWordsCount, setAddWordsCount] = useState<1 | 2>(1);
  const [minHarmony, setMinHarmony] = useState(70);
  const [nameSuggestions, setNameSuggestions] = useState<NameSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customWord1, setCustomWord1] = useState("");
  const [customWord2, setCustomWord2] = useState("");

  // Generate name suggestions based on current settings
  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    try {
      const originalName = personToFix === "person1" ? person1Name : person2Name;
      const originalBirthdate = personToFix === "person1" ? person1Birthdate : person2Birthdate;
      const originalGender = personToFix === "person1" ? person1Gender : person2Gender;
      
      const partnerName = personToFix === "person1" ? person2Name : person1Name;
      const partnerBirthdate = personToFix === "person1" ? person2Birthdate : person1Birthdate;
      const partnerGender = personToFix === "person1" ? person2Gender : person1Gender;

      // Generate base suggestions using existing name generator
      const baseSuggestions = generateNameSuggestions(
        originalName,
        originalBirthdate,
        originalGender,
        addWordsCount === 1 ? "oneWord" : "twoWords"
      );

      // Add custom word suggestions if provided
      const customSuggestions: string[] = [];
      
      if (customWord1.trim()) {
        if (addWordsCount === 1) {
          customSuggestions.push(`${originalName} ${customWord1.trim()}`);
        } else if (addWordsCount === 2) {
          if (customWord2.trim()) {
            customSuggestions.push(`${originalName} ${customWord1.trim()} ${customWord2.trim()}`);
          }
        }
      }

      // Combine all suggestions
      const allSuggestions = [...baseSuggestions, ...customSuggestions];

      // Calculate compatibility for each suggestion with the partner
      const suggestionsWithHarmony: NameSuggestion[] = [];

      for (const suggestedName of allSuggestions) {
        const compatibility = calculateCompatibility(
          suggestedName,
          originalBirthdate,
          originalGender,
          partnerName,
          partnerBirthdate,
          partnerGender
        );

        if (compatibility.harmony >= minHarmony) {
          suggestionsWithHarmony.push({
            name: suggestedName,
            harmony: compatibility.harmony,
            synchronize: compatibility.synchronize,
            coherence: compatibility.coherence,
            momentum: compatibility.momentum,
          });
        }
      }

      // Sort by harmony value (highest first)
      suggestionsWithHarmony.sort((a, b) => b.harmony - a.harmony);

      // Limit to top 20 suggestions
      setNameSuggestions(suggestionsWithHarmony.slice(0, 20));
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate suggestions when modal opens or settings change
  useEffect(() => {
    if (visible) {
      generateSuggestions();
    }
  }, [visible, personToFix, addWordsCount, minHarmony]);

  const handleSelectSuggestion = (suggestion: NameSuggestion) => {
    onNameFixed(suggestion.name, personToFix, suggestion.harmony);
    onClose();
  };

  const getHarmonyColor = (harmony: number) => {
    if (harmony >= 90) return "text-green-600";
    if (harmony >= 80) return "text-blue-600";
    if (harmony >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getHarmonyBgColor = (harmony: number) => {
    if (harmony >= 90) return "bg-green-100";
    if (harmony >= 80) return "bg-blue-100";
    if (harmony >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <Text className="text-xl font-bold text-purple-800">Fix Person</Text>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full bg-gray-100"
          >
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Current Compatibility Info */}
          <View className="bg-gray-50 p-4 rounded-lg mb-4">
            <Text className="text-lg font-semibold mb-2">Current Couple</Text>
            <Text className="text-gray-700 mb-1">
              Person 1: {person1Name}
            </Text>
            <Text className="text-gray-700 mb-3">
              Person 2: {person2Name}
            </Text>
            <Text className="text-sm text-gray-600">
              Select which person's name to improve while keeping the partner's name unchanged.
            </Text>
          </View>

          {/* Person Selection */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">
              Select Person to Fix
            </Text>
            <View className="flex-row">
              <TouchableOpacity
                className={`flex-1 mr-2 p-3 rounded-lg border ${
                  personToFix === "person1"
                    ? "bg-purple-100 border-purple-500"
                    : "bg-gray-50 border-gray-300"
                }`}
                onPress={() => setPersonToFix("person1")}
              >
                <Text
                  className={`text-center font-medium ${
                    personToFix === "person1" ? "text-purple-700" : "text-gray-700"
                  }`}
                >
                  Person 1: {person1Name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 ml-2 p-3 rounded-lg border ${
                  personToFix === "person2"
                    ? "bg-purple-100 border-purple-500"
                    : "bg-gray-50 border-gray-300"
                }`}
                onPress={() => setPersonToFix("person2")}
              >
                <Text
                  className={`text-center font-medium ${
                    personToFix === "person2" ? "text-purple-700" : "text-gray-700"
                  }`}
                >
                  Person 2: {person2Name}
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
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50 border-gray-300"
                }`}
                onPress={() => setAddWordsCount(1)}
              >
                <Text
                  className={`text-center font-medium ${
                    addWordsCount === 1 ? "text-blue-700" : "text-gray-700"
                  }`}
                >
                  Add One Word
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 ml-2 p-3 rounded-lg border ${
                  addWordsCount === 2
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50 border-gray-300"
                }`}
                onPress={() => setAddWordsCount(2)}
              >
                <Text
                  className={`text-center font-medium ${
                    addWordsCount === 2 ? "text-blue-700" : "text-gray-700"
                  }`}
                >
                  Add Two Words
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Custom Words Input */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">
              Custom Words (Optional)
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-gray-50 mb-2"
              placeholder="Enter first word"
              value={customWord1}
              onChangeText={setCustomWord1}
            />
            {addWordsCount === 2 && (
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                placeholder="Enter second word"
                value={customWord2}
                onChangeText={setCustomWord2}
              />
            )}
          </View>

          {/* Minimum Harmony Filter */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">
              Minimum Harmony Value: {minHarmony}%
            </Text>
            <View className="border border-gray-300 rounded-lg bg-gray-50">
              <Picker
                selectedValue={minHarmony}
                onValueChange={(value) => setMinHarmony(value)}
                style={{ height: 50 }}
              >
                <Picker.Item label="70%" value={70} />
                <Picker.Item label="75%" value={75} />
                <Picker.Item label="80%" value={80} />
                <Picker.Item label="85%" value={85} />
                <Picker.Item label="90%" value={90} />
                <Picker.Item label="95%" value={95} />
              </Picker>
            </View>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            className="bg-purple-600 py-3 px-4 rounded-lg mb-4 flex-row items-center justify-center"
            onPress={generateSuggestions}
            disabled={isGenerating}
          >
            <RefreshCw size={20} color="white" />
            <Text className="text-white font-medium ml-2">
              {isGenerating ? "Generating..." : "Generate New Suggestions"}
            </Text>
          </TouchableOpacity>

          {/* Name Suggestions */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-3">
              Name Suggestions ({nameSuggestions.length} found)
            </Text>
            
            {nameSuggestions.length === 0 && !isGenerating && (
              <View className="bg-yellow-50 p-4 rounded-lg">
                <Text className="text-yellow-800 text-center">
                  No suggestions found with harmony ≥ {minHarmony}%. Try lowering the minimum harmony value.
                </Text>
              </View>
            )}

            {nameSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 rounded-lg border mb-3 ${getHarmonyBgColor(suggestion.harmony)} border-gray-200`}
                onPress={() => handleSelectSuggestion(suggestion)}
              >
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-semibold flex-1 text-gray-800">
                    {suggestion.name}
                  </Text>
                  <View className="bg-white px-2 py-1 rounded">
                    <Text className={`font-bold text-sm ${getHarmonyColor(suggestion.harmony)}`}>
                      {suggestion.harmony}%
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row justify-between">
                  <Text className="text-xs text-gray-600">
                    Sync: {suggestion.synchronize}%
                  </Text>
                  <Text className="text-xs text-gray-600">
                    Coherence: {suggestion.coherence}%
                  </Text>
                  <Text className="text-xs text-gray-600">
                    Momentum: {suggestion.momentum}/10
                  </Text>
                </View>
                
                <View className="mt-2 pt-2 border-t border-gray-200">
                  <Text className="text-xs text-gray-500">
                    Partner: {personToFix === "person1" ? person2Name : person1Name} (unchanged)
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}