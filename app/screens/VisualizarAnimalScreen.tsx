import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View, Image, Alert, Modal } from 'react-native';
import { useColorScheme } from 'react-native';
import { useState, useCallback } from 'react';
import { useNfcManager } from '../../hooks/useNfcManager';

interface Animal {
  tag: string;
  nombre: string;
  sexo: string;
  raza: string;
  fechaNacimiento: string;
  estado: string;
  fotoIpfsHash: string;
  idCamada: string;
  dueno: string;
}

interface RegistroAlimentacion {
  tag: string;
  alimento: string;
  fecha: string;
}

interface RegistroVacuna {
  tag: string;
  vacuna: string;
  fecha: string;
}

export default function VisualizarAnimalConModalScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [isScanning, setIsScanning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scanTag, setScanTag] = useState<string | null>(null);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [ultimaAlimentacion, setUltimaAlimentacion] = useState<RegistroAlimentacion | null>(null);
  const [ultimaVacuna, setUltimaVacuna] = useState<RegistroVacuna | null>(null);

  const { readTagID, scanResult } = useNfcManager();

  const handleScanTag = useCallback(async () => {
    setIsScanning(true);
    try {
      await readTagID();
      if (scanResult) {
        const foundAnimal = buscarAnimalPorTag(scanResult);
        if (foundAnimal) {
          const alimentacion = buscarUltimaAlimentacion(scanResult);
          const vacuna = buscarUltimaVacuna(scanResult);

          setAnimal(foundAnimal);
          setUltimaAlimentacion(alimentacion);
          setUltimaVacuna(vacuna);
          setScanTag(scanResult);
          setModalVisible(true);
        } else {
          Alert.alert('No encontrado', `No se encontró animal con tag: ${scanResult}`);
          setModalVisible(false);
        }
      }
    } catch (error) {
      console.error('Error escaneando tag:', error);
    } finally {
      setIsScanning(false);
    }
  }, [readTagID, scanResult]);

  // Simulaciones
  const buscarAnimalPorTag = (tag: string): Animal | null => {
    const fakeDB: Animal[] = [
      {
        tag: '772A8DA1',
        nombre: 'Bella',
        sexo: 'Hembra',
        raza: 'Brangus',
        fechaNacimiento: '2023-02-10',
        estado: 'Sano',
        fotoIpfsHash: '',
        idCamada: 'Camada A',
        dueno: 'Juan Ruiz'
      }
    ];
    return fakeDB.find(a => a.tag === tag) || null;
  };

  const buscarUltimaAlimentacion = (tag: string): RegistroAlimentacion | null => {
    const data: RegistroAlimentacion[] = [
      { tag: 'ABC123', alimento: 'Pasto fresco', fecha: '2024-06-10' }
    ];
    return data.find(r => r.tag === tag) || null;
  };

  const buscarUltimaVacuna = (tag: string): RegistroVacuna | null => {
    const data: RegistroVacuna[] = [
      { tag: 'ABC123', vacuna: 'Ivermectina', fecha: '2024-06-05' }
    ];
    return data.find(r => r.tag === tag) || null;
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="bg-green-600 rounded-2xl shadow-md mb-6 p-4 items-center">
          <Text className="text-white text-xl font-bold">Escanear Tag de Animal</Text>
        </View>

        {/* Escanear */}
        <View className={`rounded-2xl shadow-md p-6 items-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <TouchableOpacity
            className="bg-green-500 py-3 px-8 rounded-xl shadow-md"
            onPress={handleScanTag}
            disabled={isScanning}
            style={{ opacity: isScanning ? 0.7 : 1 }}
          >
            <Text className="text-white font-bold text-lg">{isScanning ? "Escaneando..." : "Escanear Tag"}</Text>
          </TouchableOpacity>
          {scanTag && <Text className="mt-4 text-green-600 font-semibold">Tag: {scanTag}</Text>}
        </View>
      </ScrollView>

      {/* Modal con datos */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className={`w-11/12 max-h-[85%] rounded-2xl p-5 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <ScrollView>
              <Text className="text-xl font-bold text-center mb-4 text-green-600">Datos del Animal</Text>

              {animal && (
                <>
                  <Image source={{ uri: animal.fotoIpfsHash }} style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 12 }} />
                  <Text className="text-sm text-gray-400">Nombre</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white">{animal.nombre}</Text>
                  <Text className="text-sm text-gray-400 mt-2">Sexo</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white">{animal.sexo}</Text>
                  <Text className="text-sm text-gray-400 mt-2">Raza</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white">{animal.raza}</Text>
                  <Text className="text-sm text-gray-400 mt-2">Fecha Nac.</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white">{animal.fechaNacimiento}</Text>
                  <Text className="text-sm text-gray-400 mt-2">Camada</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white">{animal.idCamada}</Text>
                  <Text className="text-sm text-gray-400 mt-2">Dueño</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white">{animal.dueno}</Text>
                  <Text className="text-sm text-gray-400 mt-2">Estado</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white mb-4">{animal.estado}</Text>
                </>
              )}

              {/* Últimos registros */}
              {ultimaAlimentacion && (
                <>
                  <Text className="text-sm text-gray-400">Última Alimentación</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white">
                    {ultimaAlimentacion.alimento} - {ultimaAlimentacion.fecha}
                  </Text>
                </>
              )}

              {ultimaVacuna && (
                <>
                  <Text className="text-sm text-gray-400 mt-2">Última Vacuna</Text>
                  <Text className="text-base font-semibold text-gray-800 dark:text-white">
                    {ultimaVacuna.vacuna} - {ultimaVacuna.fecha}
                  </Text>
                </>
              )}
            </ScrollView>

            {/* Botón cerrar */}
            <TouchableOpacity
              className="bg-red-500 py-3 px-6 rounded-xl mt-6 shadow-md"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-bold text-center text-lg">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
