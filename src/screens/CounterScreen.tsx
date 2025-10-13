import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { colors, layout } from "../theme";

export default function CounterScreen() {
  const [n, setN] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Лічильник</Text>
      <Text style={styles.value}>{n}</Text>
      <PrimaryButton title="+1" onPress={() => setN(n + 1)} />
      <PrimaryButton title="-1" onPress={() => setN(n - 1)} />
      <PrimaryButton title="Скинути" onPress={() => setN(0)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: layout.screenPadding, alignItems: "center", justifyContent: "center" },
  title: { color: colors.primary, fontSize: 22, fontWeight: "800", marginBottom: 12 },
  value: { color: colors.text, fontSize: 40, fontWeight: "700", marginBottom: 12 },
});
