import { Html5QrcodeScanType } from "html5-qrcode/esm/core";
import { Html5QrcodeSupportedFormats } from "html5-qrcode";

export const SCANNER_CONFIG = {
  fps: 4,
  qrbox: { width: 300, height: 200 },
  formatsToSupport: [
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.QR_CODE,
  ],
  rememberLastUsedCamera: true,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
};

export const QRCODE_REGION = "ADVANCED_EXAMPLE_QRCODE_REGION";
