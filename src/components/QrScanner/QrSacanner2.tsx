import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  Html5QrcodeSupportedFormats,
  type CameraDevice,
} from "html5-qrcode";
import { Html5QrcodeScanType } from "html5-qrcode/esm/core";
import type { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFetchCameras } from "../../hooks/useFetchCameras";
import { QRCODE_REGION, SCANNER_CONFIG } from "../../configs/scannerConfig";
import {
  HtmlQrcodeAdvancedPlugin,
  type IHtmlQrcodePluginForwardedRef,
} from "./plugins/HtmlQrcodeAdvancedPlugin";
import { Alert, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IAdvancedExampleProps {
  onCodeScanned: (code: string) => void;
}

export const AdvancedExample: React.FC<IAdvancedExampleProps> = ({
  onCodeScanned,
}: IAdvancedExampleProps) => {
  const {
    fetchCameras,
    state: { loading, error, cameraDevices },
  } = useFetchCameras();
  console.log("cameraDevices ", cameraDevices);

  useEffect(() => {
    fetchCameras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = useRef<IHtmlQrcodePluginForwardedRef>(null);
  const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(
    undefined
  );
  if (loading) {
    return (
      <Alert variant="filled" severity="info">
        Detecting available cameras.
      </Alert>
    );
  }
  if (error) {
    return (
      <Alert variant="filled" severity="error">
        Failed to detect cameras.
      </Alert>
    );
  }
  if (cameraDevices.length === 0) {
    return (
      <Alert variant="filled" severity="error">
        No available cameras.
      </Alert>
    );
  }
  return (
    <>
      <IconButton
        // onClick={onClose}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          color: "#fff",
          zIndex: 3000,
        }}
      >
        <CloseIcon sx={{ fontSize: 32 }} />
      </IconButton>
      <HtmlQrcodeAdvancedPlugin
        ref={ref}
        config={SCANNER_CONFIG}
        onCodeScanned={onCodeScanned}
        qrcodeRegionId={QRCODE_REGION}
        cameraId={selectedCameraId || cameraDevices[0].id}
        className="qr-scanner"
      />
    </>
  );
};
