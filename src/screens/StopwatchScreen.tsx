
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { colors, layout } from "../theme";

export default function StopwatchScreen() {
  const [ms, setMs] = useState(0);

  // ✅ універсально працює і в RN, і в web
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timer.current) return;
    timer.current = setInterval(() => setMs(v => v + 10), 10);
  };

  const stop = () => {
    if (!timer.current) return;
    clearInterval(timer.current);
    timer.current = null;
  };

  const reset = () => { stop(); setMs(0); };

  const s = (ms / 1000).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Секундомір</Text>
      <Text style={styles.time}>{s}s</Text>
      <PrimaryButton title="Старт" onPress={start} />
      <PrimaryButton title="Стоп" onPress={stop} />
      <PrimaryButton title="Скинути" onPress={reset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: layout.screenPadding, alignItems: "center", justifyContent: "center" },
  title: { color: colors.primary, fontSize: 22, fontWeight: "800", marginBottom: 12 },
  time: { color: "#fff", fontSize: 40, fontWeight: "700", marginBottom: 12 },
});
