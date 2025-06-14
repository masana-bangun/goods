import React, { useState } from "react";
import { View, SafeAreaView, Platform, StatusBar } from "react-native";
import TabBar from "./TabBar";
import HomeScreen from "./HomeScreen";
import NumerologyForm from "./NumerologyForm";
import NumerologyResults from "./NumerologyResults";
import NameGenerator from "./NameGenerator";
import CompatibilityChecker from "./CompatibilityChecker";
import MembershipPlans from "./MembershipPlans";
import AccountScreen from "./AccountScreen";
import LifeReport from "./LifeReport";

export default function MainApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [userName, setUserName] = useState("Guest");
  const [isPremium, setIsPremium] = useState(true);

  // Analysis state
  const [analysisName, setAnalysisName] = useState("");
  const [analysisBirthdate, setAnalysisBirthdate] = useState<Date | null>(null);
  const [analysisGender, setAnalysisGender] = useState<"Male" | "Female">(
    "Male",
  );
  const [showResults, setShowResults] = useState(false);
  const [showLifeReport, setShowLifeReport] = useState(false);

  const handleAnalysisSubmit = (
    name: string,
    birthdate: Date,
    gender: "Male" | "Female",
  ) => {
    setAnalysisName(name);
    setAnalysisBirthdate(birthdate);
    setAnalysisGender(gender);
    setShowResults(true);
  };

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case "analyze":
        setActiveTab("analyze");
        setShowResults(false);
        setShowLifeReport(false);
        break;
      case "report":
        setActiveTab("analyze");
        setShowLifeReport(true);
        setShowResults(false);
        break;
      case "names":
        setActiveTab("names");
        break;
      case "compatibility":
        setActiveTab("compatibility");
        break;
      case "membership":
        setActiveTab("account");
        // Additional logic to show membership plans
        break;
      case "account":
        setActiveTab("account");
        break;
      default:
        setActiveTab(screen);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            userName={userName}
            isPremium={isPremium}
            onNavigate={handleNavigate}
          />
        );
      case "analyze":
        if (showLifeReport && analysisName && analysisBirthdate) {
          return (
            <LifeReport
              name={analysisName}
              birthdate={analysisBirthdate}
              gender={analysisGender}
              isPremium={isPremium}
            />
          );
        }
        return showResults && analysisName && analysisBirthdate ? (
          <NumerologyResults
            name={analysisName}
            birthdate={analysisBirthdate}
            gender={analysisGender}
            isPremium={isPremium}
          />
        ) : (
          <NumerologyForm onSubmit={handleAnalysisSubmit} />
        );
      case "names":
        return (
          <NameGenerator
            isPremium={isPremium}
            analysisName={analysisName}
            analysisBirthdate={analysisBirthdate}
            analysisGender={analysisGender}
          />
        );
      case "compatibility":
        return <CompatibilityChecker isPremium={isPremium} />;
      case "account":
        return (
          <AccountScreen
            userName={userName}
            isPremium={isPremium}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomeScreen
            userName={userName}
            isPremium={isPremium}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="flex-1"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        {renderContent()}
      </View>
      <TabBar activeTab={activeTab} onChangeTab={setActiveTab} />
    </SafeAreaView>
  );
}
