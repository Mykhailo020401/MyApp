// src/screens/WelcomeScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { styles } from "./WelcomeScreen.styles";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Всім привіт👋</Text>
      <Text style={styles.subtitle}>Натисніть перейти в меню щоб переглянути тестові застосунки які я створив!</Text>
      <PrimaryButton title="Перейти в меню" onPress={() => navigation.navigate("Menu")} />
    </View>
  );
}
