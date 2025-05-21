import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, useColorScheme, View } from 'react-native';
import { Header } from '../components/Header';
import { QuickActions } from '../components/QuickActions';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorModal } from '../components/modals/ErrorModal';
import { RegistrationForm } from '../components/modals/RegistrationForm';
import { ResultModal } from '../components/modals/ResultModal';
import { ScanningModal } from '../components/modals/ScanningModal';
import { useNfcManager } from '../hooks/useNfcManager';

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isWriting, setIsWriting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    sexo: ''
  });
  const [nfcError, setNfcError] = useState<string | null>(null);
  const [nfcErrorStack, setNfcErrorStack] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const { 
    isScanning, 
    scanResult, 
    showResult, 
    errorMessage,
    errorStack,
    showError: nfcShowError,
    readTag, 
    writeCattleData,
    clearTagData,
    setShowResult,
    setShowError: setNfcShowError,
    cancelScan
  } = useNfcManager();

  // Observador para el estado de error de NFC
  useEffect(() => {
    if (nfcShowError && errorMessage) {
      setNfcError(errorMessage);
      setNfcErrorStack(errorStack);
      setShowError(true);
      setNfcShowError(false); // Reset el estado en el hook
    }
  }, [nfcShowError, errorMessage, errorStack, setNfcShowError]);

  const handleWritePress = () => {
    setShowForm(true);
  };

  const handleReadPress = () => {
    setIsWriting(false);
    readTag().catch(error => {
      setNfcError(error.message || 'Error al leer la etiqueta NFC');
      setShowError(true);
    });
  };

  const handleDeletePress = () => {
    setIsWriting(false);
    clearTagData().catch(error => {
      setNfcError(error.message || 'Error al borrar la etiqueta NFC');
      setShowError(true);
    });
  };

  const handleSubmit = () => {
    setIsWriting(true);
    writeCattleData(formData).catch(error => {
      setNfcError(error.message || 'Error al escribir en la etiqueta NFC');
      setShowError(true);
    });
    setShowForm(false);
    setFormData({ nombre: '', edad: '', sexo: '' });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView 
        className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <View className="p-6">
          <Header isDark={isDark} />
          <QuickActions 
            isDark={isDark} 
            onReadPress={handleReadPress} 
            onWritePress={handleWritePress}
            onDeletePress={handleDeletePress}
          />
          <RecentActivity isDark={isDark} />
        </View>

        <RegistrationForm
          isDark={isDark}
          visible={showForm}
          formData={formData}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          onChangeText={handleFormChange}
        />

        <ScanningModal
          isDark={isDark}
          visible={isScanning}
          isWriting={isWriting}
          onCancel={cancelScan}
        />

        <ResultModal
          isDark={isDark}
          visible={showResult}
          scanResult={scanResult}
          onClose={() => setShowResult(false)}
        />

        <ErrorModal
          isDark={isDark}
          visible={showError}
          errorMessage={nfcError}
          errorStack={nfcErrorStack}
          onClose={() => setShowError(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
