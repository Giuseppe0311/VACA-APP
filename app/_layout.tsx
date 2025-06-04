import "../global.css";

import { Stack } from 'expo-router';
import { StatusBar, useColorScheme, View } from 'react-native';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <AuthProvider>
      <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <Stack  
          screenOptions={{
            headerStyle: {
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
            },
            headerTintColor: isDark ? '#ffffff' : '#1f2937',
            headerTitle: 'VACA APP',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: isDark ? '#111827' : '#f9fafb',
            },
          }}
        >
          <Stack.Screen
            name="screens/Login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="screens/Home"
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="screens/RegistrarAnimalScreen"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </AuthProvider>
  );
}
