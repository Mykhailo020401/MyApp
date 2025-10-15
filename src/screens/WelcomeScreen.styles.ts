// src/screens/WelcomeScreen.styles.ts
import { StyleSheet } from "react-native";
import { colors, layout } from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: layout.screenPadding,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: { color: colors.primary, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.subtext, fontSize: 16, textAlign: "center" },
});
