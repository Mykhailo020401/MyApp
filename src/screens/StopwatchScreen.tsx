// src/screens/StopwatchScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { styles } from './StopwatchScreen.styles';

export default function StopwatchScreen() {
  const [ms, setMs] = useState<number>(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timer.current) return;
    timer.current = setInterval(() => setMs(v => v + 10), 10);
  };

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const reset = () => {
    stop();
    setMs(0);
  };

  useEffect(() => () => stop(), []);

  const format = (totalMs: number) => {
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const cs = Math.floor((totalMs % 1000) / 10);
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    const cc = String(cs).padStart(2, '0');
    return `${mm}:${ss}.${cc}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Секундомір</Text>
      <Text style={styles.time}>{format(ms)}</Text>
      <PrimaryButton title="Старт" onPress={start} />
      <PrimaryButton title="Стоп" onPress={stop} />
      <PrimaryButton title="Скинути" onPress={reset} />
    </View>
  );
}
