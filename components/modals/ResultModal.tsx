import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ResultModalProps {
  isDark: boolean;
  visible: boolean;
  scanResult: string | null;
  onClose: () => void;
}

export function ResultModal({ isDark, visible, scanResult, onClose }: ResultModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className={`w-[85%] rounded-3xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} items-center`}>
          <View className={`w-20 h-20 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-100'} items-center justify-center mb-4`}>
            <Ionicons 
              name={scanResult?.includes('Error') ? 'close-circle' : 'checkmark-circle'} 
              size={40} 
              color={isDark ? '#ffffff' : scanResult?.includes('Error') ? '#dc2626' : '#166534'} 
            />
          </View>
          <Text className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {scanResult?.includes('Error') ? 'Error' : '¡Éxito!'}
          </Text>
          <Text className={`text-center text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {scanResult}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className={`w-full px-6 py-3 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-100'}`}
          >
            <Text className={`text-center font-semibold ${isDark ? 'text-white' : 'text-blue-800'}`}>
              Aceptar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
} 