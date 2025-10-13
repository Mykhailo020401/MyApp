import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import PrimaryButton from "../components/PrimaryButton";
import { colors, layout } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Всім привіт👋</Text>
        <Text style={styles.subtitle}>
          Давайте покажу Вам що я навчився робити за цей тиждень!
        </Text>
        <PrimaryButton title="Старт" onPress={() => navigation.navigate("Menu")} />
      </View>
      <Text style={styles.footer}>2025 ©All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.bg, alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: layout.screenPadding, paddingBottom: layout.footerBottom,
  },
  content: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "800", color: colors.primary, textAlign: "center", marginBottom: 8 },
  subtitle: { marginTop: 10, fontSize: 16, color: colors.text, textAlign: "center", lineHeight: 22, maxWidth: 360 },
  footer: { color: colors.subtext, fontSize: 13, textAlign: "center" },
});
