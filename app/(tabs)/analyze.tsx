import { View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import NumerologyForm from "../components/NumerologyForm";
import LifeReport from "../components/LifeReport";

interface Person {
  name: string;
  birthdate: Date;
  gender: "Male" | "Female";
}

export default function AnalyzeTab() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);

  const handleDateChange = (day: number, month: number, year: number) => {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleAnalysisSubmit = (name: string, birthdate: Date, gender: "Male" | "Female") => {
    const person = { name, birthdate, gender };
    setCurrentPerson(person);
  };

  if (currentPerson) {
    return (
      <LifeReport
        name={currentPerson.name}
        birthdate={currentPerson.birthdate}
        gender={currentPerson.gender}
        isPremium={true}
      />
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <NumerologyForm
        onSubmit={handleAnalysisSubmit}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onDateChange={handleDateChange}
      />
    </View>
  );
}