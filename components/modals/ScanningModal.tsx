import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';

interface ScanningModalProps {
  isDark: boolean;
  visible: boolean;
  isWriting: boolean;
  onCancel: () => void;
}

export function ScanningModal({ isDark, visible, isWriting, onCancel }: ScanningModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className={`w-[80%] rounded-3xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} items-center`}>
          <View className={`w-20 h-20 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-100'} items-center justify-center mb-4`}>
            <ActivityIndicator size="large" color={isDark ? '#ffffff' : '#1e40af'} />
          </View>
          <Text className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {isWriting ? 'Registrando...' : 'Escaneando...'}
          </Text>
          <Text className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {isWriting 
              ? 'Acerca el dispositivo a la etiqueta del ganado para registrar la información'
              : 'Acerca el dispositivo a la etiqueta del ganado para leer su información'
            }
          </Text>
          <TouchableOpacity
            onPress={onCancel}
            className={`mt-6 px-6 py-3 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-100'}`}
          >
            <Text className={`font-semibold ${isDark ? 'text-white' : 'text-red-800'}`}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
} 