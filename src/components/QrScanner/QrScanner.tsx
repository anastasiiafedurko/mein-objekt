import React, { useEffect, useRef, useState } from "react";
import { useFetchCameras } from "../../hooks/useFetchCameras";
import { QRCODE_REGION, SCANNER_CONFIG } from "../../configs/scannerConfig";
import {
  HtmlQrcodeAdvancedPlugin,
  type IHtmlQrcodePluginForwardedRef,
} from "../../plugins/HtmlQrcodeAdvancedPlugin";
import { Alert, Box } from "@mui/material";
import type { QrScannerProps } from "./QrScanner.types";
import { Loading } from "../ui/Loading";

export const QrScanner: React.FC<QrScannerProps> = ({ onResult }) => {
  const {
    fetchCameras,
    state: { loading, error, cameraDevices },
  } = useFetchCameras();
  // console.log("cameraDevices ", cameraDevices);

  useEffect(() => {
    fetchCameras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = useRef<IHtmlQrcodePluginForwardedRef>(null);
  const [selectedCameraId] = useState<string | undefined>(undefined);

  if (loading) {
    return <Loading />;
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
    <Box>
      <HtmlQrcodeAdvancedPlugin
        ref={ref}
        config={SCANNER_CONFIG}
        onCodeScanned={(code) => onResult(code)}
        qrcodeRegionId={QRCODE_REGION}
        cameraId={selectedCameraId || cameraDevices[0].id}
        className="qr-code-scanner"
      />
      <style>
        {`
        .qr-code-scanner {
          border-radius: 8px;
          overflow: hidden;
        }
        `}
      </style>
    </Box>
  );
};
