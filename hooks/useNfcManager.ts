import { useState } from 'react';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

interface CattleData {
  id: string;
  breed: string;
  birthDate: string;
  weight: string;
  lastVaccination: string;
}

interface UseNfcManagerReturn {
  isScanning: boolean;
  scanResult: string | null;
  showResult: boolean;
  errorMessage: string | null;
  errorStack: string | null;
  showError: boolean;
  readTag: () => Promise<void>;
  writeCattleData: (data: any) => Promise<void>;
  clearTagData: () => Promise<void>;
  setShowResult: (show: boolean) => void;
  setShowError: (show: boolean) => void;
  cancelScan: () => void;
}

// Inicializa NFC Manager al montar el componente
NfcManager.start();

// Función para obtener el stack trace completo de un error
function getFullErrorInfo(error: any): string {
  const errorInfo = [];
  
  // Capturar el mensaje de error
  errorInfo.push(`Error: ${error.message || 'Error desconocido'}`);
  
  // Capturar el nombre del error
  if (error.name) {
    errorInfo.push(`Tipo: ${error.name}`);
  }
  
  // Capturar el stack trace si existe
  if (error.stack) {
    errorInfo.push(`\nStack Trace:\n${error.stack}`);
  }
  
  // Capturar todas las propiedades adicionales del error
  const additionalProps = Object.entries(error)
    .filter(([key]) => !['message', 'name', 'stack'].includes(key))
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
  
  if (additionalProps.length > 0) {
    errorInfo.push(`\nPropiedades adicionales:\n${additionalProps.join('\n')}`);
  }
  
  return errorInfo.join('\n');
}

export function useNfcManager(): UseNfcManagerReturn {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorStack, setErrorStack] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const cancelScan = () => {
    NfcManager.cancelTechnologyRequest();
    setIsScanning(false);
  };

  const readTag = async (): Promise<void> => {
    setIsScanning(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      const records = tag?.ndefMessage ?? [];
      
      if (records.length === 0) {
        setScanResult('No se ha registrado información aún');
      } else {
        const payload = new Uint8Array(records[0].payload);
        const text = Ndef.text.decodePayload(payload);
        setScanResult(text || 'No se ha registrado información aún');
      }
      setShowResult(true);
    } catch (err: any) {
      console.warn('Error en readTag:', err);
      setScanResult('Error al leer la etiqueta');
      setShowResult(true);
      setErrorMessage(`Error al leer la etiqueta NFC: ${err.message || 'Error desconocido'}`);
      setErrorStack(getFullErrorInfo(err));
      setShowError(true);
      throw err; // Re-lanzamos el error para manejarlo en el componente
    } finally {
      NfcManager.cancelTechnologyRequest();
      setIsScanning(false);
    }
  };

  const writeCattleData = async (data: any): Promise<void> => {
    setIsScanning(true);
    try {
      // 1. Verificamos que NFC esté activo
      const isEnabled = await NfcManager.isEnabled();
      if (!isEnabled) {
        throw new Error('NFC no está habilitado');
      }
  
      // 2. Pedimos tecnología NDEF o, si no está formateado, NdefFormatable
      await NfcManager.requestTechnology([NfcTech.Ndef, NfcTech.NdefFormatable]);
  
      // 3. Preparamos el mensaje
      const dataStr = JSON.stringify(data);
      const recordBytes = Ndef.encodeMessage([ Ndef.textRecord(dataStr) ]);
      if (!recordBytes) {
        throw new Error('Fallo al codificar NDEF');
      }
  
      // 4. Leemos info del tag
      const tag = await NfcManager.getTag();
      const techList: string[] = tag?.techTypes || [];
  
      // 5. Si ya soporta NDEF, escribimos
      if (techList.includes('android.nfc.tech.Ndef')) {
        await NfcManager.ndefHandler.writeNdefMessage(recordBytes);
        console.log('✅ Escritura NDEF exitosa');
      }
      // 6. Si es formateable, lo formateamos con el mensaje
      else if (techList.includes('android.nfc.tech.NdefFormatable')) {
        await NfcManager.ndefFormatableHandlerAndroid.formatNdef(recordBytes);
        console.log('✅ Formateo + escritura exitosa');
      }
      else {
        throw new Error('Tag no soporta NDEF ni fosrmateo');
      }
  
      setScanResult('Información registrada correctamente');
      setShowResult(true);
    } catch (err: any) {
      console.error('Error en escritura NFC:', err);
      setScanResult(`Error al registrar: ${err.message}`);
      setErrorMessage(err.message);
      setErrorStack(getFullErrorInfo(err));
      setShowError(true);
      throw err;
    } finally {
      // 7. Siempre cancelamos la petición de tecnología
      await NfcManager.cancelTechnologyRequest();
      setIsScanning(false);
    }
  };

  const clearTagData = async (): Promise<void> => {
    setIsScanning(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      
      // Para borrar, escribimos un registro vacío
      const emptyBytes = Ndef.encodeMessage([
        Ndef.textRecord('')
      ]);
      
      // Escribimos un mensaje vacío para "limpiar" el tag
      await NfcManager.ndefHandler.writeNdefMessage(emptyBytes);
      console.log('Tag limpiado correctamente');
      
      setScanResult('Información eliminada correctamente');
      setShowResult(true);
    } catch (err: any) {
      console.warn('Error en clearTagData:', err);
      setScanResult('Error al eliminar la información');
      setShowResult(true);
      setErrorMessage(`Error al limpiar tag NFC: ${err.message || 'Error desconocido'}`);
      setErrorStack(getFullErrorInfo(err));
      setShowError(true);
      throw err; // Re-lanzamos el error para manejarlo en el componente
    } finally {
      NfcManager.cancelTechnologyRequest();
      setIsScanning(false);
    }
  };

  return {
    isScanning,
    scanResult,
    showResult,
    errorMessage,
    errorStack,
    showError,
    readTag,
    writeCattleData,
    clearTagData,
    setShowResult,
    setShowError,
    cancelScan
  };
}