// src/screens/CounterScreen.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { styles } from './CounterScreen.styles';

export default function CounterScreen() {
  const [n, setN] = useState<number>(0);
  const plus = () => {
    setN(n => n + 1);
    console.log('ПЛЮС!');
  };
  const minus = () => {
    setN(n => n - 1);
    console.log('МІНУС!!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Лічильник</Text>
      <Text style={styles.value}>{n}</Text>
      <PrimaryButton title="+1" onPress={plus} />
      <PrimaryButton title="-1" onPress={minus} />
      <PrimaryButton title="Скинути" onPress={() => setN(0)} />
    </View>
  );
}
