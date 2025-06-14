import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Home, Search, BarChart2, Users, User } from "lucide-react-native";

interface TabBarProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function TabBar({
  activeTab = "home",
  onChangeTab = () => {},
}: TabBarProps) {
  const tabs: TabItem[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <Home size={24} color={activeTab === "home" ? "#8b5cf6" : "#6b7280"} />
      ),
    },
    {
      id: "analyze",
      label: "Analyze",
      icon: (
        <Search
          size={24}
          color={activeTab === "analyze" ? "#8b5cf6" : "#6b7280"}
        />
      ),
    },
    {
      id: "names",
      label: "Names",
      icon: (
        <BarChart2
          size={24}
          color={activeTab === "names" ? "#8b5cf6" : "#6b7280"}
        />
      ),
    },
    {
      id: "compatibility",
      label: "Match",
      icon: (
        <Users
          size={24}
          color={activeTab === "compatibility" ? "#8b5cf6" : "#6b7280"}
        />
      ),
    },
    {
      id: "account",
      label: "Account",
      icon: (
        <User
          size={24}
          color={activeTab === "account" ? "#8b5cf6" : "#6b7280"}
        />
      ),
    },
  ];

  return (
    <View className="flex-row justify-around items-center bg-white border-t border-gray-200 pt-2 pb-4">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          className="items-center"
          onPress={() => onChangeTab(tab.id)}
        >
          {tab.icon}
          <Text
            className={`text-xs mt-1 ${activeTab === tab.id ? "text-purple-600 font-medium" : "text-gray-500"}`}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
