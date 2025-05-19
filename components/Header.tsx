import { Text, View } from 'react-native';

interface HeaderProps {
  isDark: boolean;
}

export function Header({ isDark }: HeaderProps) {
  return (
    <View className="mb-8">
      <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Gestión de Ganado
      </Text>
      <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Escanea y registra información de tu ganado de manera eficiente
      </Text>
    </View>
  );
} 