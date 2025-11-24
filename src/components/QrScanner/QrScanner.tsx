import React, { useEffect, useRef, useState } from "react";
import { useFetchCameras } from "../../hooks/useFetchCameras";
import { QRCODE_REGION, SCANNER_CONFIG } from "../../configs/scannerConfig";
import {
  HtmlQrcodeAdvancedPlugin,
  type IHtmlQrcodePluginForwardedRef,
} from "../../plugins/HtmlQrcodeAdvancedPlugin";
import { Alert, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { QrScannerProps } from "./QrScanner.types";
import { Loading } from "../ui/Loading";

export const QrScanner: React.FC<QrScannerProps> = ({ onResult, onClose }) => {
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
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      <IconButton
        onClick={onClose}
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
        onCodeScanned={(code) => onResult(code)}
        qrcodeRegionId={QRCODE_REGION}
        cameraId={selectedCameraId || cameraDevices[0].id}
        className="full-screen-video"
      />
      <style>
        {`
        // .full-screen-video {
        //   width: 100vw;
        //   height: 100vh;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   background: black;
        // }
        // .full-screen-video video {
        //   width: 100% !important;
        //   height: 100% !important;
        //   object-fit: cover !important;
        // }
        // .full-screen-video > div {
        //   width: 100% !important;
        //   height: 100% !important;
        // }
        `}
      </style>
    </Box>
  );
};
