// src/screens/MenuScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { styles } from './MenuScreen.styles';

export default function MenuScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Меню</Text>
      <PrimaryButton
        title="Мої завдання"
        onPress={() => navigation.navigate('Todo')}
      />
      <PrimaryButton
        title="Калькулятор"
        onPress={() => navigation.navigate('Calc')}
      />
      <PrimaryButton
        title="Секундомір"
        onPress={() => navigation.navigate('Stopwatch')}
      />
      <PrimaryButton
        title="Лічильник"
        onPress={() => navigation.navigate('Counter')}
      />
      <PrimaryButton title="Тест" onPress={() => navigation.navigate('Test')} />
      <PrimaryButton
        title="ТестКопия"
        onPress={() => navigation.navigate('TestCopy')}
      />
    </View>
  );
}
