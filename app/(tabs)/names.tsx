import { View } from "react-native";
import NameGenerator from "../components/NameGenerator";

export default function NamesTab() {
  return (
    <View className="flex-1 bg-white">
      <NameGenerator isPremium={true} />
    </View>
  );
}