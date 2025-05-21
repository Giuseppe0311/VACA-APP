import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ErrorModalProps {
  isDark: boolean;
  visible: boolean;
  errorMessage: string | null;
  errorStack?: string | null;
  onClose: () => void;
}

export function ErrorModal({ isDark, visible, errorMessage, errorStack, onClose }: ErrorModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className={`w-[90%] max-h-[80%] rounded-3xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} items-center`}>
          <View className={`w-20 h-20 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-100'} items-center justify-center mb-4`}>
            <Ionicons 
              name="warning-outline" 
              size={40} 
              color={isDark ? '#ffffff' : '#dc2626'} 
            />
          </View>
          <Text className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Error NFC
          </Text>
          <Text className={`text-center text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {errorMessage}
          </Text>
          
          {errorStack && (
            <View className={`w-full mb-4 rounded-xl p-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Text className={`text-sm font-bold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Detalles del error:
              </Text>
              <ScrollView 
                className={`max-h-[150px] rounded-lg p-2 ${isDark ? 'bg-gray-900' : 'bg-gray-200'}`}
                showsVerticalScrollIndicator={true}
              >
                <Text className={`font-mono text-xs ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  {errorStack}
                </Text>
              </ScrollView>
            </View>
          )}
          
          <TouchableOpacity
            onPress={onClose}
            className={`w-full px-6 py-3 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-100'}`}
          >
            <Text className={`text-center font-semibold ${isDark ? 'text-white' : 'text-blue-800'}`}>
              Entendido
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
} 