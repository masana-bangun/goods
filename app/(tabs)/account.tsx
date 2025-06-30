import { View } from "react-native";
import AccountScreen from "../components/AccountScreen";

export default function AccountTab() {
  const handleNavigate = (screen: string) => {
    // Handle account-specific navigation
    console.log('Navigate to:', screen);
  };

  return (
    <View className="flex-1 bg-white">
      <AccountScreen
        userName="User"
        email="user@example.com"
        isPremium={true}
        onNavigate={handleNavigate}
      />
    </View>
  );
}