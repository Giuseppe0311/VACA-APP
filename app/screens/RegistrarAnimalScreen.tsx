import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNfcManager } from '../../hooks/useNfcManager';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image } from 'react-native';


// Definir tipado para los datos del formulario
interface FormData {
  rfidTag: string;
  nombre: string;
  sexo: string;
  raza: string;
  fechaNacimiento: string;
  estado: string;
  fotoIpfsHash: string;
  idcamada: string;
}

export default function RegistrarAnimalScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isScanning, setIsScanning] = useState(false);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    rfidTag: '',
    nombre: '',
    sexo: '',
    raza: '',
    fechaNacimiento: '',
    estado: '',
    fotoIpfsHash: '',
    idcamada: ''
  });

  // Manejo del escaneo NFC
  const { readTagID, scanResult} = useNfcManager();

  const handleScanTag = useCallback(async () => {
    console.log('Escaneando tag NFC...');
    setIsScanning(true);
    try {
      await readTagID();
      // Si tenemos un resultado del escaneo, actualizamos el rfidTag
      if (scanResult) {
        setFormData(prev => ({
          ...prev,
          rfidTag: scanResult
        }));
      }
    } catch (error) {
      console.error('Error al escanear tag NFC:', error);
    } finally {
      setIsScanning(false);
    }
  }, [readTagID, scanResult]);

  // Actualizar campos del formulario
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Datos del animal a registrar:', formData);
    // Aquí iría la lógica para guardar los datos
  };

  const handleVolver = () => {
    router.back();
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara para tomar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true, // opcional si luego subirás a IPFS
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const photoUri = result.assets[0].uri;

      // Guarda el URI en el campo fotoIpfsHash temporalmente (aquí puedes subir a IPFS si lo deseas)
      setFormData(prev => ({
        ...prev,
        fotoIpfsHash: photoUri
      }));
    }
  };

  const opcionesCamada = [
    { label: 'Camada A', value: 'A' },
    { label: 'Camada B', value: 'B' },
    { label: 'Camada C', value: 'C' }
  ];



  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Header */}
      <View className="bg-green-600 px-4 py-5 flex-row items-center">
        <TouchableOpacity onPress={handleVolver} className="mr-2">
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Registrar Animal</Text>
      </View>

      <ScrollView className="flex-1 px-2 py-4">
        {/* Sección escanear NFC */}
        <View className={`rounded-2xl shadow-md mb-6 p-6 items-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          style={{ elevation: 4 }}
        >
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Escanear Tag NFC</Text>
          <View className="h-24 w-24 rounded-full border-4 border-green-400 items-center justify-center mb-4 bg-green-50">
            <Ionicons 
              name={isScanning ? "scan" : "scan-outline"} 
              size={48} 
              color={isScanning ? '#22c55e' : (isDark ? '#9ca3af' : '#6b7280')} 
            />
          </View>
          <TouchableOpacity
            className="bg-green-500 py-3 px-8 rounded-xl shadow-md"
            onPress={handleScanTag}
            disabled={isScanning}
            style={{ opacity: isScanning ? 0.7 : 1 }}
          >
            <Text className="text-white font-bold text-lg">
              {isScanning ? "Escaneando..." : "Escanear Tag"}
            </Text>
          </TouchableOpacity>
          {formData.rfidTag ? (
            <Text className="mt-4 text-green-600 font-semibold">Tag: {formData.rfidTag}</Text>
          ) : null}
        </View>

        {/* Formulario */}
        <View className={`rounded-2xl shadow-md p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{ elevation: 4 }}>
          {/* Campos del formulario */}
          {[
            { label: 'RFID Tag', key: 'rfidTag', placeholder: 'rfidTag' },
            { label: 'Nombre', key: 'nombre', placeholder: 'Ej: Bella' },
            { label: 'Sexo', key: 'sexo', placeholder: 'Ej: Hembra' },
            { label: 'Raza', key: 'raza', placeholder: 'Seleccionar raza' },
            { label: 'Fecha de Nacimiento', key: 'fechaNacimiento', placeholder: 'YYYY-MM-DD' },
            { label: 'Estado', key: 'estado', placeholder: 'Ej: Activo' },
            { label: 'Foto del Animal', key: 'fotoIpfsHash', placeholder: '' },
            { label: 'Camada', key: 'idcamada', placeholder: 'Seleccionar camada' },
          ].map((item, idx) => (
            <View key={item.key} className={idx !== 0 ? 'mt-4' : ''}>
                <View className="flex-row items-center mb-1">
                  <Text className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</Text>
                  <Text className="text-red-500 ml-1">*</Text>
                  <Text className="text-xs text-gray-500 ml-1">(requerido)</Text>
                </View>

                {item.key === 'fotoIpfsHash' ? (
                  <TouchableOpacity onPress={handleTakePhoto}>
                    <View className="border p-4 rounded-xl bg-green-100 border-green-400">
                      <Text className="text-gray-700">
                        {formData.fotoIpfsHash ? 'Foto tomada. Tocar para volver a tomar.' : 'Tocar para tomar foto'}
                      </Text>
                    </View>

                    {formData.fotoIpfsHash ? (
                      <Image
                        source={{ uri: formData.fotoIpfsHash }}
                        style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 10 }}
                      />
                    ) : null}
                  </TouchableOpacity>
                ) : item.key === 'idcamada' ? (
                    <View
                      className={`border rounded-xl ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}
                      style={{ paddingHorizontal: 10 }}
                    >
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
                  ): (
                  <TextInput
                    className={`border p-4 rounded-xl text-base ${isDark
                      ? 'bg-gray-900 text-white border-gray-700'
                      : 'bg-gray-50 text-gray-800 border-gray-300'}`}
                    placeholder={item.placeholder}
                    placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
                    value={formData[item.key as keyof FormData]}
                    onChangeText={(text) => handleChange(item.key as keyof FormData, text)}
                  />
                )}
              </View>
            ))}

          {/* Botón Guardar */}
          <TouchableOpacity
            className="bg-green-500 py-4 px-6 rounded-xl mt-8 shadow-md"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-center text-lg tracking-wide">
              Guardar Animal
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
} 