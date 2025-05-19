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
  readTag: () => Promise<void>;
  writeCattleData: (data: any) => Promise<void>;
  clearTagData: () => Promise<void>;
  setShowResult: (show: boolean) => void;
  cancelScan: () => void;
}

export function useNfcManager(): UseNfcManagerReturn {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const cancelScan = () => {
    NfcManager.cancelTechnologyRequest();
    setIsScanning(false);
  };

  const readTag = async () => {
    setIsScanning(true);
    try {
      await NfcManager.requestTechnology([NfcTech.Ndef, NfcTech.NdefFormatable]);
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
    } catch (err) {
      console.warn(err);
      setScanResult('Error al leer la etiqueta');
      setShowResult(true);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setIsScanning(false);
    }
  };

  const writeCattleData = async (data: any) => {
    setIsScanning(true);
    try {
      await NfcManager.requestTechnology([NfcTech.Ndef, NfcTech.NdefFormatable], {
        alertMessage: 'Acerca la etiqueta para registrar la información del ganado...',
      });

      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(JSON.stringify(data)),
      ]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        setScanResult('Información del ganado registrada');
        setTimeout(() => {
          setShowResult(true);
        }, 100);
      }
    } catch (err) {
      console.warn(err);
      setScanResult('Error al registrar la información');
      setTimeout(() => {
        setShowResult(true);
      }, 100);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setIsScanning(false);
    }
  };

  const clearTagData = async () => {
    setIsScanning(true);
  try {
    await NfcManager.requestTechnology(
      [NfcTech.Ndef, NfcTech.NdefFormatable],
      { alertMessage: 'Acerca la etiqueta para borrar la información…' },
    );

    const emptyBytes = Ndef.encodeMessage([
      Ndef.record(Ndef.TNF_EMPTY, '', '', []),
    ]);

    const { techTypes } = (await NfcManager.getTag()) ?? { techTypes: [] as string[] };

    if (techTypes?.includes('android.nfc.tech.NdefFormatable')) {
      await (NfcManager.ndefHandler as any).formatNdefMessage(emptyBytes);
    } else {
      await (NfcManager.ndefHandler as any).writeNdefMessage(emptyBytes);
    }

    setScanResult('Información eliminada correctamente');
    setShowResult(true);
  } catch (err) {
    console.warn(err);
    setScanResult('Error al eliminar la información');
    setShowResult(true);
  } finally {
    NfcManager.cancelTechnologyRequest();
    setIsScanning(false);
  }
  };

  return {
    isScanning,
    scanResult,
    showResult,
    readTag,
    writeCattleData,
    clearTagData,
    setShowResult,
    cancelScan
  };
} 