import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useState } from 'react';

// Tipado de camada
interface Camada {
  id: string;
  nombre: string;
  fechaRegistro: string;
  descripcion: string;
}

export default function VisualizarCamadasScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [camadas, setCamadas] = useState<Camada[]>([
    {
      id: '1',
      nombre: 'Camada 1',
      fechaRegistro: '2024-05-12',
      descripcion: 'Camada inicial registrada en mayo',
    },
    {
      id: '2',
      nombre: 'Camada 2',
      fechaRegistro: '2024-06-01',
      descripcion: 'Segunda camada con crías fuertes',
    },
  ]);

  const handleEditar = (id: string) => {
    // Lógica para ir a pantalla de edición
    console.log('Editar camada con ID:', id);
    // router.push(`/editar/camada/${id}`); // ejemplo si usas rutas dinámicas
  };

  const handleEliminar = (id: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro que deseas eliminar esta camada?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setCamadas(prev => prev.filter(c => c.id !== id));
          }
        }
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ScrollView className="flex-1 px-4 py-4">
        {/* Título */}
        <View className="bg-yellow-400 rounded-2xl shadow-md mb-6 p-4 items-center" style={{ elevation: 4 }}>
          <Text className="text-lg text-white font-bold tracking-wide">CAMADAS REGISTRADAS</Text>
        </View>

        {/* Lista de camadas */}
        {camadas.map((camada) => (
          <View
            key={camada.id}
            className={`mb-4 p-5 rounded-2xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            style={{ elevation: 3 }}
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">{camada.nombre}</Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity onPress={() => handleEditar(camada.id)}>
                  <Ionicons name="create-outline" size={24} color={isDark ? 'white' : '#2563eb'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEliminar(camada.id)}>
                  <Ionicons name="trash-outline" size={24} color={isDark ? 'white' : '#dc2626'} />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-sm text-gray-500 dark:text-gray-300">Fecha de Registro: {camada.fechaRegistro}</Text>
            <Text className="text-sm mt-2 text-gray-600 dark:text-gray-200">{camada.descripcion}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
