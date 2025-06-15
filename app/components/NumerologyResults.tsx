import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { getPola, calculateGrafologiIndex } from "../utils/numerologyUtils";
import { useTranslation } from "./MainApp";

interface NumerologyResultsProps {
  name: string;
  birthdate: Date;
  gender: "Male" | "Female";
  isPremium?: boolean;
}

export default function NumerologyResults({
  name = "",
  birthdate = new Date(),
  gender = "Male",
  isPremium = true,
}: NumerologyResultsProps) {
  const { t } = useTranslation();
  const patterns = getPola(name, birthdate, gender);
  const grafologiResult = calculateGrafologiIndex(name);
  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const getHaraDescription = (hara: number) => {
    const key = `hara_${hara}_desc`;
    return t(key) || "Description not available";
  };

  const getExpressionDescription = (expression: number) => {
    const key = `expression_${expression}_desc`;
    return t(key) || "Description not available";
  };

  const getTimeDescription = (time: number) => {
    const key = `time_${time}_desc`;
    return t(key) || "Description not available";
  };

  const showParameterDescription = (
    parameterType: string,
    value: number | string,
  ) => {
    let description = "";
    let title = "";

    switch (parameterType) {
      case "hara":
        title = `${t("hara")} ${value}`;
        description = getHaraDescription(Number(value));
        break;
      case "expression":
        title = `${t("expression")} ${value}`;
        description = getExpressionDescription(Number(value));
        break;
      case "time":
        title = `${t("time")} ${value}`;
        description = getTimeDescription(Number(value));
        break;
      case "dimensional":
        title = t("dimensional_analysis");
        description = `${t("physical")}: ${patterns.physical}\n${t("mental")}: ${patterns.mental}\n${t("emotion")}: ${patterns.emotion}\n${t("intuition")}: ${patterns.intuition}\n\n${t("dimensional_analysis_desc")}`;
        break;
      case "synchronize":
        title = t("synchronize_score");
        description = `${t("synchronize_value")}: ${patterns.synchronize}\n\n${t("synchronize_desc")}`;
        break;
      case "coherence":
        title = t("coherence_value");
        description = `${t("coherence_value")}: ${patterns.coherence}\n\n${t("coherence_desc")}`;
        break;
      case "synergize":
        title = t("synergize_value");
        description = `${t("synergize_value")}: ${patterns.synergize}\n\n${t("synergize_desc")}`;
        break;
      case "productive":
        title = t("productive_value");
        description = `${t("productive_value")}: ${patterns.productive}\n\n${t("productive_desc")}`;
        break;
      case "momentum":
        title = t("momen_sukses_value");
        description = `${t("momen_sukses_value")}: ${patterns.momenSukses}\n\n${t("momentum_desc")}`;
        break;
    }

    setSelectedParameter(`${title}\n\n${description}`);
    setModalVisible(true);
  };

  const renderIntensityChart = () => {
    return (
      <View className="flex-row justify-between mt-4 mb-2">
        {Object.entries(patterns.angka_intensitas).map(([number, count]) => (
          <View key={number} className="items-center">
            <Text className="text-lg font-bold">{number}</Text>
            <View
              className="bg-purple-500 w-6 rounded-t-md"
              style={{ height: Math.max(count * 10, 5) }}
            />
            <Text className="text-xs">{count}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView className="bg-white p-4 rounded-lg">
      <View className="border-b border-gray-200 pb-4 mb-4">
        <Text className="text-2xl font-bold text-purple-800">
          {patterns.namaNormal}
        </Text>
        <Text className="text-gray-600">{patterns.tglLahirFormat}</Text>
        <Text className="text-gray-600">
          {t("gender")}: {gender === "Male" ? t("male") : t("female")}
        </Text>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-orange-50 p-3 rounded-lg"
          onPress={() => showParameterDescription("hara", patterns.hara)}
        >
          <View className="bg-orange-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-orange-800 text-center">
              {t("hara")}
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              [1, 2, 3, 4, 6].includes(patterns.hara)
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {patterns.hara}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-indigo-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("expression", patterns.destiny)
          }
        >
          <View className="bg-indigo-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-indigo-800 text-center">
              {t("expression")}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-indigo-800 text-center">
            {patterns.destiny}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-blue-50 p-3 rounded-lg"
          onPress={() => showParameterDescription("time", patterns.time)}
        >
          <View className="bg-blue-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-blue-800 text-center">
              {t("time")}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-blue-800 text-center">
            {patterns.time}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-blue-50 p-3 rounded-lg"
          onPress={() => showParameterDescription("dimensional", "")}
        >
          <View className="bg-blue-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-blue-800 text-center">
              {t("dimensional_analysis")}
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600 text-sm">
              {t("physical")}:{" "}
              <Text
                className={`font-bold ${patterns.physical < 60 ? "text-red-600" : "text-gray-800"}`}
              >
                {patterns.physical}
              </Text>
            </Text>
            <Text className="text-gray-600 text-sm">
              {t("mental")}:{" "}
              <Text
                className={`font-bold ${patterns.mental < 60 ? "text-red-600" : "text-gray-800"}`}
              >
                {patterns.mental}
              </Text>
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600 text-sm">
              {t("emotion")}:{" "}
              <Text
                className={`font-bold ${patterns.emotion < 60 ? "text-red-600" : "text-gray-800"}`}
              >
                {patterns.emotion}
              </Text>
            </Text>
            <Text className="text-gray-600 text-sm">
              {t("intuition")}:{" "}
              <Text
                className={`font-bold ${patterns.intuition < 60 ? "text-red-600" : "text-gray-800"}`}
              >
                {patterns.intuition}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-purple-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("synchronize", patterns.synchronize)
          }
        >
          <View className="bg-purple-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-purple-800 text-center">
              {t("synchronize_score")}
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              patterns.synchronize < 0.6 ? "text-red-600" : "text-purple-800"
            }`}
          >
            {patterns.synchronize}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-green-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("coherence", patterns.coherence)
          }
        >
          <View className="bg-green-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-green-800 text-center">
              {t("coherence_value")}
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              patterns.coherence < 0.6 ? "text-red-600" : "text-green-800"
            }`}
          >
            {patterns.coherence}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-teal-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("synergize", patterns.synergize)
          }
        >
          <View className="bg-teal-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-teal-800 text-center">
              {t("synergize_value")}
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              parseFloat(patterns.synergize.replace("%", "")) < 60
                ? "text-red-600"
                : "text-teal-800"
            }`}
          >
            {patterns.synergize}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-cyan-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("productive", patterns.productive)
          }
        >
          <View className="bg-cyan-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-cyan-800 text-center">
              {t("productive_value")}
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              parseFloat(patterns.productive.replace("%", "")) < 60
                ? "text-red-600"
                : "text-cyan-800"
            }`}
          >
            {patterns.productive}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-emerald-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("momentum", patterns.momenSukses)
          }
        >
          <View className="bg-emerald-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-emerald-800 text-center">
              {t("momen_sukses_value")}
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              parseFloat(patterns.momenSukses) < 0.6
                ? "text-red-600"
                : "text-emerald-800"
            }`}
          >
            {patterns.momenSukses}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <View className="bg-purple-50 p-3 rounded-lg">
          <View className="bg-purple-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-purple-800 text-center">
              {t("grafologi_index")}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-center text-purple-800">
            {grafologiResult.persValue}
          </Text>
          <Text className="text-gray-600 text-center mt-1 text-sm">
            {t("value")}: {grafologiResult.indexValue}
          </Text>

          <View className="mt-4">
            <Text className="text-lg font-semibold mb-2">
              {t("potential_suggestions")}
            </Text>
            <View className="flex-row flex-wrap">
              {grafologiResult.suggestions.map((suggestion, index) => (
                <View
                  key={index}
                  className="mr-2 mb-2 px-3 py-1 rounded-md"
                  style={{
                    backgroundColor: suggestion.isPositive
                      ? "#d1fae5"
                      : "#fee2e2",
                  }}
                >
                  <Text
                    style={{
                      color: suggestion.isPositive ? "#047857" : "#b91c1c",
                    }}
                  >
                    G{index + 1}: {suggestion.value}
                  </Text>
                </View>
              ))}
            </View>
            <View className="mt-2">
              {grafologiResult.suggestions.map((suggestion, index) => (
                <View
                  key={index}
                  className="mb-3 p-3 rounded-md"
                  style={{
                    backgroundColor: suggestion.isPositive
                      ? "#d1fae5"
                      : "#fee2e2",
                  }}
                >
                  <Text
                    style={{
                      color: suggestion.isPositive ? "#047857" : "#b91c1c",
                    }}
                  >
                    G{index + 1}: {t(`g${index + 1}_desc`)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            className="mt-4 p-3 rounded-md"
            style={{
              backgroundColor: grafologiResult.deskIsPositive
                ? "#d1fae5"
                : "#fee2e2",
            }}
          >
            <Text
              style={{
                color: grafologiResult.deskIsPositive ? "#047857" : "#b91c1c",
              }}
            >
              {grafologiResult.desk}
            </Text>
          </View>
        </View>
      </View>

      {true ? (
        <>
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-2">
              {t("advanced_analysis")}
            </Text>

            <View className="mb-4">
              <Text className="text-lg font-semibold mb-2">
                {t("core_numbers")}
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("character_number")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_karakter}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">
                    {t("expression_number")}
                  </Text>
                  <Text className="text-2xl font-bold">{patterns.destiny}</Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("soul_number")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_vokal}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">
                    {t("personality_number")}
                  </Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_konsonan}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold mb-2">
                {t("number_intensity")}
              </Text>
              {renderIntensityChart()}
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold mb-2">
                {t("personal_development")}
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("self_potential")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_potensi_diri}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("attitude_number")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_sikap}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("growth_number")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_pertumbuhan}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-semibold mb-2">
                {t("birth_date_analysis")}
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/3 mb-3">
                  <Text className="text-gray-600">{t("day")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_ultah}
                  </Text>
                </View>
                <View className="w-1/3 mb-3">
                  <Text className="text-gray-600">{t("month")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_bulan}
                  </Text>
                </View>
                <View className="w-1/3 mb-3">
                  <Text className="text-gray-600">{t("year")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_tahun_lahir}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-semibold mb-2">
                {t("pythagorean_analysis")}
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("expression")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.expression}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("soul_urge")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.soulUrge}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("personality")}</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.personality}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-semibold mb-2">
                {t("challenge_numbers")}
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("challenge")} 1</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.challenge1}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("challenge")} 2</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.challenge2}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("challenge")} 3</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.challenge3}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">{t("challenge")} 4</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.challenge4}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-semibold mb-2">
                {t("current_year_analysis")}
              </Text>
              <View className="bg-purple-50 p-4 rounded-lg">
                <Text className="text-gray-600">
                  {t("personal_year_number")}
                </Text>
                <Text className="text-3xl font-bold text-purple-800">
                  {patterns.personalYear}
                </Text>
                <Text className="text-gray-600 mt-2">
                  {t(`personal_year_${patterns.personalYear}_desc`)}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View className="bg-purple-100 p-4 rounded-lg mb-6">
          <Text className="text-lg font-semibold text-purple-800 mb-2">
            {t("premium_analysis")}
          </Text>
          <Text className="text-gray-700 mb-3">
            {t("premium_analysis_desc")}
          </Text>
          <TouchableOpacity className="bg-purple-600 py-2 px-4 rounded-md items-center">
            <Text className="text-white font-medium">
              {t("upgrade_to_premium")}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-white p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-purple-800">
              {t("parameter_detail")}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-purple-600 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-medium">{t("close")}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView className="flex-1">
            <Text className="text-base leading-6 text-gray-800">
              {selectedParameter}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}
