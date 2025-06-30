import { View } from "react-native";
import HomeScreen from "../components/HomeScreen";
import { router } from "expo-router";

export default function HomeTab() {
  const handleNavigate = (screen: string) => {
    if (screen === "editProfile" || screen === "membership" || screen === "privacy" || screen === "help" || screen === "logout") {
      // Handle account navigation - could navigate to specific account screens
      router.push('/account');
      return;
    }
    
    // Navigate to other tabs
    switch (screen) {
      case 'analyze':
        router.push('/analyze');
        break;
      case 'names':
        router.push('/names');
        break;
      case 'compatibility':
        router.push('/compatibility');
        break;
      case 'account':
        router.push('/account');
        break;
      case 'report':
        router.push('/analyze'); // Navigate to analyze tab for report generation
        break;
      default:
        break;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <HomeScreen
        userName="User"
        isPremium={true}
        onNavigate={handleNavigate}
      />
    </View>
  );
}