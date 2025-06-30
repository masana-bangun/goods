import { View } from "react-native";
import CompatibilityChecker from "../components/CompatibilityChecker";

export default function CompatibilityTab() {
  return (
    <View className="flex-1 bg-white">
      <CompatibilityChecker isPremium={true} />
    </View>
  );
}