// src/screens/TodoScreen.styles.ts
import { StyleSheet } from "react-native";
import { colors, layout } from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: layout.screenPadding,
  },
  header: { marginBottom: 10 },
  title: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  selectionActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  list: { paddingBottom: 100 },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
  },

  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  todoTextBlock: { flexShrink: 1, flexGrow: 1 },
  todoText: { color: colors.text, fontSize: 18, fontWeight: "600" },
  todoTextSelected: { textDecorationLine: "line-through", opacity: 0.6 },
  todoDate: { color: colors.gray, fontSize: 14, marginTop: 2 },

  editBtn: { paddingVertical: 8, paddingHorizontal: 12 },
  editBtnText: { fontWeight: "800" },
});
