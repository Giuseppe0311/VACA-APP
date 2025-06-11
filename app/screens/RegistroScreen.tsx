import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function RegistroScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const navigateToRegisterAnimal = () => {
    router.push('/screens/RegistrarAnimalScreen');
  };
  const navigateToRegisterCamada = () => {
      router.push('/screens/RegistrarCamadaScreen');
  };

  const navigateToRegisterAlimentacion = () => {
        router.push('/screens/RegistrarAlimentacionScreen');
  };

  const navigateToRegisterVacuna = () => {
          router.push('/screens/RegistrarVacunaScreen');
  };

  return (
    <ScrollView 
      className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Registrar Cabeza */}
      <TouchableOpacity 
        className={`flex-row items-center p-4 mb-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        onPress={navigateToRegisterCamada}
      >
        <View className="h-16 w-16 rounded-full bg-yellow-100 items-center justify-center mr-4">
          <Ionicons name="add-circle-outline" size={28} color="#f59e0b" />
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Registrar Camada</Text>
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Crear nuevo grupo de animales</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
      </TouchableOpacity>

      {/* Registrar Animal */}
      <TouchableOpacity 
        className={`flex-row items-center p-4 mb-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        onPress={navigateToRegisterAnimal}
      >
        <View className="h-16 w-16 rounded-full bg-green-100 items-center justify-center mr-4">
          <Ionicons name="paw-outline" size={28} color="#10b981" />
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Registrar Animal</Text>
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Escanear RFID y añadir datos</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
      </TouchableOpacity>

      {/* Registrar Alimentación */}
      <TouchableOpacity 
        className={`flex-row items-center p-4 mb-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        onPress={navigateToRegisterAlimentacion}
      >
        <View className="h-16 w-16 rounded-full bg-blue-100 items-center justify-center mr-4">
          <Ionicons name="restaurant-outline" size={28} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Registrar Alimentación</Text>
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Control de alimentación por cabeza</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
      </TouchableOpacity>

      {/* Registrar Vacunas */}
      <TouchableOpacity 
        className={`flex-row items-center p-4 mb-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        onPress={navigateToRegisterVacuna}
      >
        <View className="h-16 w-16 rounded-full bg-purple-100 items-center justify-center mr-4">
          <Ionicons name="medical-outline" size={28} color="#8b5cf6" />
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Registrar Vacunas</Text>
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Control de vacunación por camada </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
      </TouchableOpacity>

      {/* Registrar Dueños */}
      <TouchableOpacity
        className={`flex-row items-center p-4 mb-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
          <View className="h-16 w-16 rounded-full bg-red-100 items-center justify-center mr-4">
            <Ionicons name="people-outline" size={28} color="#f6443b" />
          </View>
          <View className="flex-1">
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Registrar Nuevo Dueño</Text>
            <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Registros de dueños</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
      </TouchableOpacity>
    </ScrollView>
  );
} 