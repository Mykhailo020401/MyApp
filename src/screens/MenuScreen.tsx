import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import PrimaryButton from "../components/PrimaryButton";
import { colors, layout } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Menu">;

export default function MenuScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Демки</Text>
        <PrimaryButton title="✅ Список завдань" onPress={() => navigation.navigate("Todo")} />
        <PrimaryButton title="🧮 Калькулятор" onPress={() => navigation.navigate("Calc")} />
        <PrimaryButton title="⏱️ Секундомір" onPress={() => navigation.navigate("Stopwatch")} />
        <PrimaryButton title="🔢 Лічильник" onPress={() => navigation.navigate("Counter")} />
      </View>
      <Text style={styles.footer}>©All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.bg, alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: layout.screenPadding, paddingBottom: layout.footerBottom,
  },
  content: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "800", color: colors.primary, marginBottom: 12 },
  footer: { color: colors.subtext, fontSize: 13, textAlign: "center" },
});
