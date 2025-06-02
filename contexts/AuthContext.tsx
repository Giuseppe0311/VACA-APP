import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Definir el token key para AsyncStorage
const TOKEN_KEY = '@VacaApp:token';

// Definir la URL de la API exactamente como se proporcionó
const API_URL = 'http://blockchain.spring.informaticapp.com:2002/api/auth/login';

// Tipos para el contexto
interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

// Proveedor del contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar token al inicio
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  // Función para iniciar sesión
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      console.log(`Iniciando login con ${username}`);
      
      // Estructura correcta: usar "usuario" en lugar de "username"
      const requestBody = {
        usuario: username,
        password: password
      };
      
      console.log('Enviando datos:', JSON.stringify(requestBody));
      
      // Intentar directamente con la URL proporcionada por el usuario
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Response status:', response.status);
      
      // Obtener el texto de la respuesta
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let data;
      try {
        // Intentar parsear la respuesta como JSON
        data = JSON.parse(responseText);
        console.log('Datos parseados:', data);
      } catch (error) {
        console.error('Error al parsear la respuesta:', error);
        return { 
          success: false, 
          error: 'Formato de respuesta inválido' 
        };
      }
      
      // Verificar si hay un error en la respuesta (formato: {"error": "Credenciales incorrectas"})
      if (data && data.error) {
        console.log('Error recibido del servidor:', data.error);
        return {
          success: false,
          error: data.error  // Usar el mensaje de error exacto del backend
        };
      }
      
      // Verificar si hay un token en la respuesta (formato exitoso: {"token": "..."})
      if (data && typeof data.token === 'string') {
        if (data.token.trim() !== '') {
          // Si el token tiene valor, guardar y redirigir
          console.log('Token válido recibido');
          await AsyncStorage.setItem(TOKEN_KEY, data.token);
          setToken(data.token);
          
          // Redirigir al usuario a la página principal
          setTimeout(() => {
            router.replace('/');
          }, 500);
          
          return { success: true };
        } else {
          // Si el token está vacío, probablemente credenciales incorrectas
          console.log('Token vacío recibido - credenciales inválidas');
          return { 
            success: false, 
            error: 'Usuario o contraseña incorrectos' 
          };
        }
      } else {
        // Si no hay token ni error en la respuesta
        console.error('Formato de respuesta inesperado');
        return {
          success: false,
          error: 'Respuesta del servidor incorrecta'
        };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Verifica tu red e inténtalo de nuevo.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      setToken(null);
      router.replace('/login');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  // Configura un interceptor para manejar errores 401
  useEffect(() => {
    // Esta es una simulación de interceptor global
    const originalFetch = global.fetch;
    
    global.fetch = async (...args) => {
      const [resource, config] = args;
      
      try {
        const response = await originalFetch(resource, config);
        
        if (response.status === 401) {
          // Si obtenemos un 401, borramos el token y redirigimos al login
          console.log('Error 401 detectado - redirigiendo a login');
          await AsyncStorage.removeItem(TOKEN_KEY);
          setToken(null);
          router.replace('/login');
        }
        
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    // Limpiar interceptor
    return () => {
      global.fetch = originalFetch;
    };
  }, []);

  // Valor del contexto
  const value = {
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 