export interface QrScannerProps {
  onResult: (code: string) => void;
  onClose: () => void;
}
