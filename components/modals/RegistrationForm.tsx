import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface RegistrationFormProps {
  isDark: boolean;
  visible: boolean;
  formData: {
    nombre: string;
    edad: string;
    sexo: string;
  };
  onClose: () => void;
  onSubmit: () => void;
  onChangeText: (field: string, value: string) => void;
}

export function RegistrationForm({ 
  isDark, 
  visible, 
  formData, 
  onClose, 
  onSubmit,
  onChangeText 
}: RegistrationFormProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className={`w-[90%] rounded-3xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Registro de Ganado
          </Text>
          
          <View className="mb-4">
            <Text className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Nombre</Text>
            <TextInput
              className={`p-4 rounded-xl ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
              placeholder="Nombre del ganado"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              value={formData.nombre}
              onChangeText={(text) => onChangeText('nombre', text)}
            />
          </View>

          <View className="mb-4">
            <Text className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Edad</Text>
            <TextInput
              className={`p-4 rounded-xl ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
              placeholder="Edad en años"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              keyboardType="numeric"
              value={formData.edad}
              onChangeText={(text) => onChangeText('edad', text)}
            />
          </View>

          <View className="mb-6">
            <Text className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Sexo</Text>
            <TextInput
              className={`p-4 rounded-xl ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
              placeholder="Macho/Hembra"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              value={formData.sexo}
              onChangeText={(text) => onChangeText('sexo', text)}
            />
          </View>

          <View className="flex-row justify-end space-x-4">
            <TouchableOpacity
              onPress={onClose}
              className={`px-6 py-3 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-100'}`}
            >
              <Text className={`font-semibold ${isDark ? 'text-white' : 'text-red-800'}`}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              className={`px-6 py-3 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-100'}`}
            >
              <Text className={`font-semibold ${isDark ? 'text-white' : 'text-green-800'}`}>
                Registrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
} 