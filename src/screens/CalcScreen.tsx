// src/screens/CalcScreen.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import { styles } from './CalcScreen.styles';

type Op = '+' | '-' | '*' | '/' | null;

export default function CalcScreen() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [op, setOp] = useState<Op>(null);
  const [result, setResult] = useState<string>('');

  const compute = () => {
    const x = Number(a.replace(',', '.'));
    const y = Number(b.replace(',', '.'));
    if (!isFinite(x) || !isFinite(y) || !op) {
      setResult('—');
      return;
    }
    let r: number;
    switch (op) {
      case '+':
        r = x + y;
        break;
      case '-':
        r = x - y;
        break;
      case '*':
        r = x * y;
        break;
      case '/':
        r = y === 0 ? NaN : x / y;
        break;
      default:
        r = NaN;
    }
    setResult(isFinite(r) ? String(r) : '—');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Число A</Text>
        <Input value={a} onChangeText={setA} placeholder="0" />
      </View>

      <View>
        <Text style={styles.label}>Число B</Text>
        <Input value={b} onChangeText={setB} placeholder="0" />
      </View>

      <View style={styles.opRow}>
        <PrimaryButton title="+" onPress={() => setOp('+')} />
        <PrimaryButton title="−" onPress={() => setOp('-')} />
        <PrimaryButton title="×" onPress={() => setOp('*')} />
        <PrimaryButton title="÷" onPress={() => setOp('/')} />
      </View>

      <PrimaryButton title="Обчислити" onPress={compute} />

      <Text style={styles.label}>Результат</Text>
      <Text style={styles.value}>{result || '—'}</Text>
    </View>
  );
}
