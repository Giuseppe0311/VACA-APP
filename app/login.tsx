import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { login, isLoading } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña');
      return;
    }
    
    setError(null);
    console.log('Intentando iniciar sesión con:', { username, password: '***' });
    
    // Llamar a la API de login
    const result = await login(username, password);
    
    console.log('Resultado del login:', result);
    
    if (!result.success) {
      // Mostrar el mensaje de error exacto del backend
      setError(result.error || 'Error al iniciar sesión');
      
      // También mostrar un Alert para mayor visibilidad
      Alert.alert(
        'Error de inicio de sesión',
        result.error || 'Error al iniciar sesión. Por favor verifica tus credenciales.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center p-8">
          {/* Logo */}
          <View className="w-24 h-24 bg-blue-500 rounded-full justify-center items-center mb-8">
            <Text className="text-white text-4xl font-bold">VA</Text>
          </View>
          
          {/* Título */}
          <Text className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Vaca App
          </Text>
          
          {/* Formulario */}
          <View className="w-full space-y-4">
            <View>
              <Text className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Usuario
              </Text>
              <TextInput
                className={`w-full p-4 rounded-xl ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'} border`}
                placeholder="Ingresa tu usuario"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>
            
            <View>
              <Text className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Contraseña
              </Text>
              <TextInput
                className={`w-full p-4 rounded-xl ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'} border`}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>
            
            {/* Mensaje de error */}
            {error && (
              <View className="bg-red-100 border border-red-400 rounded-md p-3">
                <Text className="text-red-600 text-center">
                  {error}
                </Text>
              </View>
            )}
            
            {/* Botón de login */}
            <TouchableOpacity
              className={`w-full py-4 rounded-xl ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} mt-4`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  Iniciar sesión
                </Text>
              )}
            </TouchableOpacity>
            
            {/* Información de API */}
            <Text className={`text-center mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              API: blockchain.spring.informaticapp.com:2002
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 