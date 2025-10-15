// src/components/IconButton.tsx
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface Props {
  icon: string;
  color: string;
  onPress: () => void;
}

export default function IconButton({ icon, color, onPress }: Props) {
  return (
    <Pressable style={[styles.btn, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 18 },
});
