import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { useState } from 'react';

// Tipado del registro de alimentación
interface Alimentacion {
  id: string;
  idCamada: string;
  nombre: string; // tipo de alimento
}

export default function VisualizarAlimentacionScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [alimentaciones, setAlimentaciones] = useState<Alimentacion[]>([
    { id: '1', idCamada: 'Camada A', nombre: 'Pasto fresco' },
    { id: '2', idCamada: 'Camada B', nombre: 'Concentrado' },
  ]);

  const handleEditar = (id: string) => {
    console.log('Editar alimentación ID:', id);
    // router.push(`/editar/alimentacion/${id}`);
  };

  const handleEliminar = (id: string) => {
    Alert.alert(
      'Eliminar registro',
      '¿Estás seguro de eliminar este registro de alimentación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setAlimentaciones(prev => prev.filter(a => a.id !== id));
          }
        }
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ScrollView className="flex-1 px-4 py-4">

        {/* Encabezado */}
        <View className="bg-blue-400 rounded-2xl shadow-md mb-6 p-4 items-center" style={{ elevation: 4 }}>
          <Text className="text-lg text-white font-bold tracking-wide">REGISTROS DE ALIMENTACIÓN</Text>
        </View>

        {/* Tarjetas de alimentación */}
        {alimentaciones.map((item) => (
          <View
            key={item.id}
            className={`mb-4 p-5 rounded-2xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            style={{ elevation: 3 }}
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.nombre}</Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity onPress={() => handleEditar(item.id)}>
                  <Ionicons name="create-outline" size={24} color={isDark ? 'white' : '#2563eb'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEliminar(item.id)}>
                  <Ionicons name="trash-outline" size={24} color={isDark ? 'white' : '#dc2626'} />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-sm text-gray-500 dark:text-gray-300">Camada: {item.idCamada}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
