// src/components/PrimaryButton.tsx
import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../theme";

type Variant = "primary" | "warning" | "danger" | "ghost";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  style,
  textStyle,
}: Props) {
  const { bg, txt } = getPalette(variant, disabled);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, opacity: disabled ? 0.6 : pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <Text style={[styles.text, { color: txt }, textStyle]}>{title}</Text>
    </Pressable>
  );
}

function getPalette(variant: Variant, disabled: boolean) {
  if (variant === "ghost") {
    return { bg: "transparent", txt: disabled ? colors.subtext : colors.primary };
  }
  if (variant === "warning") {
    return { bg: colors.yellow, txt: "#121212" };
  }
  if (variant === "danger") {
    return { bg: colors.red, txt: "#ffffff" };
  }
  return { bg: colors.primary, txt: "#121212" };
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
