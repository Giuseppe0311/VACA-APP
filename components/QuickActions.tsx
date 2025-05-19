import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface QuickActionsProps {
  isDark: boolean;
  onReadPress: () => void;
  onWritePress: () => void;
  onDeletePress: () => void;
}

export function QuickActions({ isDark, onReadPress, onWritePress, onDeletePress }: QuickActionsProps) {
  return (
    <View className="flex-row flex-wrap justify-between mb-8">
      <TouchableOpacity
        onPress={onReadPress}
        className={`w-[48%] rounded-2xl p-4 mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <View className="items-center">
          <View className={`w-12 h-12 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-100'} items-center justify-center mb-2`}>
            <Ionicons name="scan-outline" size={24} color={isDark ? '#ffffff' : '#1e40af'} />
          </View>
          <Text className={`text-center font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Escanear
          </Text>
          <Text className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Leer información
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onWritePress}
        className={`w-[48%] rounded-2xl p-4 mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <View className="items-center">
          <View className={`w-12 h-12 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-100'} items-center justify-center mb-2`}>
            <Ionicons name="add-circle-outline" size={24} color={isDark ? '#ffffff' : '#166534'} />
          </View>
          <Text className={`text-center font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Registrar
          </Text>
          <Text className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Nuevo registro
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDeletePress}
        className={`w-full rounded-2xl p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <View className="items-center">
          <View className={`w-12 h-12 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-100'} items-center justify-center mb-2`}>
            <Ionicons name="trash-outline" size={24} color={isDark ? '#ffffff' : '#dc2626'} />
          </View>
          <Text className={`text-center font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Eliminar
          </Text>
          <Text className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Borrar información
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
} 