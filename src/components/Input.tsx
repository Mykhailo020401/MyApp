// src/components/Input.tsx
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../theme";

interface Props {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
}

export default function Input({
  value,
  placeholder,
  onChangeText,
  onSubmitEditing,
}: Props) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      keyboardType="default"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
});
