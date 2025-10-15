// src/components/Card.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function Card({
  children,
  selected,
}: {
  children: React.ReactNode;
  selected?: boolean;
}) {
  return <View style={[styles.card, selected && styles.selected]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
  },
  selected: { borderWidth: 2, borderColor: colors.primary },
});
