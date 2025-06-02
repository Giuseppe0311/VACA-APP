import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  isDark: boolean;
}

export function Header({ isDark }: HeaderProps) {
  const { logout } = useAuth();

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mb-2">
        <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Gestión de Ganado
        </Text>
        <TouchableOpacity
          onPress={logout}
          className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
        >
          <Ionicons 
            name="log-out-outline" 
            size={24} 
            color={isDark ? '#ffffff' : '#1f2937'} 
          />
        </TouchableOpacity>
      </View>
      <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Escanea y registra información de tu ganado de manera eficiente
      </Text>
    </View>
  );
} 