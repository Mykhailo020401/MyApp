// src/screens/CounterScreen.styles.ts
import { StyleSheet } from "react-native";
import { colors, layout } from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: layout.screenPadding,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: { color: colors.primary, fontSize: 22, fontWeight: "800", marginBottom: 8 },
  value: { color: colors.text, fontSize: 40, fontWeight: "700", marginBottom: 8 },
});
