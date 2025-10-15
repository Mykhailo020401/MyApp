// src/screens/MenuScreen.styles.ts
import { StyleSheet } from "react-native";
import { colors, layout } from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: layout.screenPadding,
    gap: 12,
    justifyContent: "center",
  },
  title: { color: colors.primary, fontSize: 24, fontWeight: "800", marginBottom: 8 },
});
