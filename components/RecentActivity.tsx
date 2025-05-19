import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface RecentActivityProps {
  isDark: boolean;
}

export function RecentActivity({ isDark }: RecentActivityProps) {
  return (
    <View className={`rounded-2xl p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Actividad Reciente
      </Text>
      <View className="space-y-4">
        <View className="flex-row items-center">
          <View className={`w-10 h-10 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-100'} items-center justify-center mr-3`}>
            <Ionicons name="scan-outline" size={20} color={isDark ? '#ffffff' : '#1e40af'} />
          </View>
          <View>
            <Text className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Escaneo de ganado
            </Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              ID: 12345 - Hace 5 minutos
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
} 