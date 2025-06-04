import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function ConsultaScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView 
      className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Ver Alimentación */}
      <TouchableOpacity 
        className={`flex-row items-center p-4 mb-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <View className="h-16 w-16 rounded-full bg-green-100 items-center justify-center mr-4">
          <Ionicons name="restaurant-outline" size={28} color="#10b981" />
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Ver Alimentación</Text>
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Historial de alimentación por cabeza</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
      </TouchableOpacity>

      {/* Ver Vacunas */}
      <TouchableOpacity 
        className={`flex-row items-center p-4 mb-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <View className="h-16 w-16 rounded-full bg-purple-100 items-center justify-center mr-4">
          <Ionicons name="medical-outline" size={28} color="#8b5cf6" />
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Ver Vacunas</Text>
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Registro de vacunación y próximas dosis</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
      </TouchableOpacity>

      {/* Ver Dueños */}
      <TouchableOpacity 
        className={`flex-row items-center p-4 mb-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <View className="h-16 w-16 rounded-full bg-blue-100 items-center justify-center mr-4">
          <Ionicons name="people-outline" size={28} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Ver Dueños</Text>
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Información de contacto y propiedades</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
      </TouchableOpacity>
    </ScrollView>
  );
} 