import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { useState } from 'react';

interface Vacuna {
  id: string;
  tipo: 'camada' | 'animal';
  referencia: string; // puede ser el nombre de la camada o el ID del animal
  nombre: string;     // nombre de la vacuna
}

export default function VisualizarVacunasScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [vacunas, setVacunas] = useState<Vacuna[]>([
    { id: '1', tipo: 'camada', referencia: 'Camada A', nombre: 'Ivermectina' },
    { id: '2', tipo: 'animal', referencia: 'Animal 001', nombre: 'Triple Bovina' },
  ]);

  const handleEditar = (id: string) => {
    console.log('Editar vacuna con ID:', id);
    // router.push(`/editar/vacuna/${id}`);
  };

  const handleEliminar = (id: string) => {
    Alert.alert(
      'Eliminar vacuna',
      '¿Estás seguro de eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setVacunas(prev => prev.filter(v => v.id !== id));
          }
        }
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-950' : 'bg-gray-100'}`}>
      <ScrollView className="flex-1 px-4 py-4">
        {/* Encabezado */}
        <View className="bg-indigo-600 rounded-2xl shadow-md mb-6 p-4 items-center" style={{ elevation: 4 }}>
          <Text className="text-lg text-white font-bold tracking-wide">REGISTROS DE VACUNAS</Text>
        </View>

        {/* Lista de vacunas */}
        {vacunas.map((vacuna) => (
          <View
            key={vacuna.id}
            className={`mb-4 p-5 rounded-2xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            style={{ elevation: 3 }}
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">{vacuna.nombre}</Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity onPress={() => handleEditar(vacuna.id)}>
                  <Ionicons name="create-outline" size={24} color={isDark ? 'white' : '#2563eb'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEliminar(vacuna.id)}>
                  <Ionicons name="trash-outline" size={24} color={isDark ? 'white' : '#dc2626'} />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-sm text-gray-500 dark:text-gray-300">
              Registrado por: {vacuna.tipo === 'camada' ? 'Camada' : 'Animal'}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-200">Referencia: {vacuna.referencia}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
