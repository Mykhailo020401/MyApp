// src/screens/CalcScreen.styles.ts
import { StyleSheet } from "react-native";
import { colors, layout } from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: layout.screenPadding,
    gap: 10,
  },
  row: { flexDirection: "row", gap: 10 },
  label: { color: colors.subtext, fontSize: 14, marginBottom: 4 },
  value: { color: colors.text, fontSize: 20, fontWeight: "700" },
  opRow: { flexDirection: "row", gap: 10, marginTop: 6 },
});
