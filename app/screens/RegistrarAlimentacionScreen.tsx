import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Alert, Image } from 'react-native';


// Definir tipado para los datos del formulario
interface FormData {
  idCamada: string;
  nombre: string;
}

export default function RegistrarAnimalScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isScanning, setIsScanning] = useState(false);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    idCamada:'',
    nombre: ''
  });

  // Actualizar campos del formulario
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

    const opcionesCamada = [
      { label: 'Camada A', value: 'A' },
      { label: 'Camada B', value: 'B' },
      { label: 'Camada C', value: 'C' }
    ];

  const handleSubmit = () => {
    console.log('Datos de la camada a registrar:', formData);
    // Aquí iría la lógica para guardar los datos
  };

  const handleVolver = () => {
    router.back();
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ScrollView className="flex-1 px-2 py-4">
        {/* Sección escanear NFC */}
        <View className={`bg-blue-400 rounded-2xl shadow-md mb-6 p-3 items-center`}
          style={{ elevation: 4 }}
        >
          <Text className={`text-lg text-white font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>REGISTRAR ALIMENTACIÓN</Text>
         </View>

        {/* Formulario */}
        <View className={`rounded-2xl shadow-md p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{ elevation: 4 }}>
          {/* Campos del formulario */}
          {[
            { label: 'Camada', key: 'idCamada', placeholder: 'Seleccionar camada' },
            { label: 'Alimentación', key: 'nombre', placeholder: 'Ej: Pasto' }
          ].map((item, idx) => (
            <View key={item.key} className={idx !== 0 ? 'mt-4' : ''}>
                <View className="flex-row items-center mb-1">
                  <Text className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</Text>
                  <Text className="text-red-500 ml-1">*</Text>
                  <Text className="text-xs text-gray-500 ml-1">(requerido)</Text>
                </View>
                {item.key === 'idCamada' ? (
                    <View
                      className={`border rounded-xl ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}
                      style={{ paddingHorizontal: 10 }}
                    >
                      <Picker
                        selectedValue={formData.idCamada}
                        onValueChange={(value) => handleChange('idCamada', value)}
                        dropdownIconColor={isDark ? 'white' : 'black'}
                      >
                        <Picker.Item label="Seleccionar camada" value="" />
                        {opcionesCamada.map((op) => (
                          <Picker.Item key={op.value} label={op.label} value={op.value} />
                        ))}
                      </Picker>
                    </View>
                  ):(
                  <TextInput
                    className={`border p-4 rounded-xl text-base ${isDark
                      ? 'bg-gray-900 text-white border-gray-700'
                      : 'bg-gray-50 text-gray-800 border-gray-300'}`}
                    placeholder={item.placeholder}
                    placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
                    value={formData[item.key as keyof FormData]}
                    onChangeText={(text) => handleChange(item.key as keyof FormData, text)}
                  />)}
              </View>

            ))}

          {/* Botón Guardar */}
          <TouchableOpacity
            className="bg-green-500 py-4 px-6 rounded-xl mt-8 shadow-md"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-center text-lg tracking-wide">
              Guardar Alimentación
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}