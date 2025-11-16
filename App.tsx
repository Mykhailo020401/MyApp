import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import TodoScreen from './src/screens/TodoScreen';
import CalcScreen from './src/screens/CalcScreen';
import StopwatchScreen from './src/screens/StopwatchScreen';
import CounterScreen from './src/screens/CounterScreen';
import { RootStackParamList } from './src/types/navigation';
import { colors } from './src/theme';
import Test from './src/screens/test';
import TestCopy from './src/screens/testCopy';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.bg },
            headerTintColor: '#fff',
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
          <Stack.Screen name="Calc" component={CalcScreen} />
          <Stack.Screen name="Stopwatch" component={StopwatchScreen} />
          <Stack.Screen name="Counter" component={CounterScreen} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="TestCopy" component={TestCopy} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
