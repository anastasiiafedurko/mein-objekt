export interface QrScannerProps {
  open: boolean;
  onResult: (text: string) => void;
  onClose: () => void;
}
