import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native';

interface FormData {
  modo: 'camada' | 'animal';
  idcamada: string;
  idanimal: string;
  nombre: string;
}

export default function RegistrarVacunaScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [formData, setFormData] = useState<FormData>({
    modo: 'camada',
    idcamada: '',
    idanimal: '',
    nombre: ''
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const opcionesCamada = [
    { label: 'Camada A', value: 'A' },
    { label: 'Camada B', value: 'B' },
    { label: 'Camada C', value: 'C' }
  ];

  const opcionesAnimales = [
    { label: 'Animal 001', value: '001' },
    { label: 'Animal 002', value: '002' },
    { label: 'Animal 003', value: '003' }
  ];

  const handleSubmit = () => {
    console.log('Datos de vacuna:', formData);
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-950' : 'bg-gray-100'}`}>
      <ScrollView className="flex-1 px-4 py-6">

        {/* Header */}
        <View className="bg-indigo-600 rounded-2xl p-4 mb-6 shadow-lg">
          <Text className="text-white text-center text-2xl font-bold tracking-wide">
            Registro de Vacuna
          </Text>
        </View>

        {/* Card */}
        <View className={`rounded-3xl p-6 shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{ elevation: 5 }}>

          {/* Selección de tipo */}
          <Text className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Registrar por:</Text>
          <View className={`rounded-xl mb-4 border ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
            <Picker
              selectedValue={formData.modo}
              onValueChange={(value) => handleChange('modo', value as 'camada' | 'animal')}
              dropdownIconColor={isDark ? 'white' : 'black'}
            >
              <Picker.Item label="Camada" value="camada" />
              <Picker.Item label="Animal individual" value="animal" />
            </Picker>
          </View>

          {/* Selector por camada o animal */}
          {formData.modo === 'camada' ? (
            <>
              <Text className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Camada</Text>
              <View className={`rounded-xl mb-4 border ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                <Picker
                  selectedValue={formData.idcamada}
                  onValueChange={(value) => handleChange('idcamada', value)}
                  dropdownIconColor={isDark ? 'white' : 'black'}
                >
                  <Picker.Item label="Seleccionar camada" value="" />
                  {opcionesCamada.map((op) => (
                    <Picker.Item key={op.value} label={op.label} value={op.value} />
                  ))}
                </Picker>
              </View>
            </>
          ) : (
            <>
              <Text className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Animal</Text>
              <View className={`rounded-xl mb-4 border ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                <Picker
                  selectedValue={formData.idanimal}
                  onValueChange={(value) => handleChange('idanimal', value)}
                  dropdownIconColor={isDark ? 'white' : 'black'}
                >
                  <Picker.Item label="Seleccionar animal" value="" />
                  {opcionesAnimales.map((op) => (
                    <Picker.Item key={op.value} label={op.label} value={op.value} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {/* Campo nombre vacuna */}
          <Text className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Nombre de la vacuna</Text>
          <TextInput
            className={`border rounded-xl px-4 py-3 mb-6 text-base ${isDark ? 'bg-gray-900 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'}`}
            placeholder="Ej: Ivermectina"
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            value={formData.nombre}
            onChangeText={(text) => handleChange('nombre', text)}
          />

          {/* Botón Guardar */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-green-600 rounded-xl py-4 shadow-md active:opacity-80"
          >
            <Text className="text-white text-lg font-bold text-center">Guardar Vacuna</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
