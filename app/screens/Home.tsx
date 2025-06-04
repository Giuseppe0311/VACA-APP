import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import ConsultaScreen from './ConsultaScreen';
import RegistroScreen from './RegistroScreen';

export default function Home() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState('consulta'); // 'consulta' o 'registro'

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Contenido principal */}
      <View className="flex-1">
        {activeTab === 'consulta' ? <ConsultaScreen /> : <RegistroScreen />}
      </View>
      
      {/* Tabs de navegación */}
      <View className={`flex-row border-t ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <TouchableOpacity
          className={`flex-1 py-4 items-center ${activeTab === 'consulta' ? 'border-t-2 border-blue-500' : ''}`}
          onPress={() => setActiveTab('consulta')}
        >
          <Ionicons 
            name="search-outline" 
            size={24} 
            color={activeTab === 'consulta' ? (isDark ? '#3b82f6' : '#3b82f6') : (isDark ? '#6b7280' : '#9ca3af')} 
          />
          <Text 
            className={`mt-1 ${
              activeTab === 'consulta' 
                ? (isDark ? 'text-blue-400' : 'text-blue-500') 
                : (isDark ? 'text-gray-400' : 'text-gray-500')
            }`}
          >
            Consulta
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-1 py-4 items-center ${activeTab === 'registro' ? 'border-t-2 border-blue-500' : ''}`}
          onPress={() => setActiveTab('registro')}
        >
          <Ionicons 
            name="add-circle-outline" 
            size={24} 
            color={activeTab === 'registro' ? (isDark ? '#3b82f6' : '#3b82f6') : (isDark ? '#6b7280' : '#9ca3af')} 
          />
          <Text 
            className={`mt-1 ${
              activeTab === 'registro' 
                ? (isDark ? 'text-blue-400' : 'text-blue-500') 
                : (isDark ? 'text-gray-400' : 'text-gray-500')
            }`}
          >
            Registro
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 