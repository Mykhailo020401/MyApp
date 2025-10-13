

import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { colors, layout } from "../theme";

export default function CalcScreen() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");
  const [res, setRes] = useState<string>("");

  const compute = () => {
    const x = parseFloat(a); const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return setRes("Введи числа");
    let r = 0;
    switch (op) { case "+": r = x + y; break; case "-": r = x - y; break; case "*": r = x * y; break; case "/": r = y === 0 ? NaN : x / y; }
    setRes(isNaN(r) ? "Ділення на 0" : r.toString());
  };

  const OpBtn = ({ v }: { v: typeof op }) => (
    <TouchableOpacity style={[styles.op, op === v && styles.opActive]} onPress={() => setOp(v)}>
      <Text style={styles.opText}>{v}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Калькулятор</Text>
      <View style={styles.row}>
        <TextInput keyboardType="numeric" value={a} onChangeText={setA} style={styles.input} placeholder="A" placeholderTextColor="#9aa0a6" />
        <TextInput keyboardType="numeric" value={b} onChangeText={setB} style={styles.input} placeholder="B" placeholderTextColor="#9aa0a6" />
      </View>
      <View style={styles.row}>
        <OpBtn v="+" /><OpBtn v="-" /><OpBtn v="*" /><OpBtn v="/" />
      </View>
      <TouchableOpacity style={styles.calc} onPress={compute}><Text style={styles.calcText}>Обчислити</Text></TouchableOpacity>
      <Text style={styles.result}>Результат: {res}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: layout.screenPadding },
  title: { color: colors.primary, fontSize: 22, fontWeight: "800", textAlign: "center", marginBottom: 12 },
  row: { flexDirection: "row", gap: 8, marginBottom: 8 },
  input: { flex: 1, backgroundColor: "#1e1f22", color: colors.text, borderRadius: 10, paddingHorizontal: 12, height: 44 },
  op: { backgroundColor: "#1e1f22", paddingHorizontal: 16, height: 44, borderRadius: 10, justifyContent: "center" },
  opActive: { backgroundColor: colors.card },
  opText: { color: colors.text, fontWeight: "700" },
  calc: { backgroundColor: colors.card, borderRadius: 10, paddingVertical: 12, alignItems: "center", marginTop: 8 },
  calcText: { color: "#fff", fontWeight: "700" },
  result: { color: colors.text, marginTop: 12, textAlign: "center", fontSize: 16 },
});