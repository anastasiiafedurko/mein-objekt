import { useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Html5Qrcode } from "html5-qrcode";
import type { QrScannerProps } from "./QrScanner.types";

const QrScanner: React.FC<QrScannerProps> = ({ open, onClose, onResult }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!open) return;

    const scannerId = "qr-scanner-view";
    const html5QrCode = new Html5Qrcode(scannerId);
    scannerRef.current = html5QrCode;

    const facingMode = isMobile
      ? { facingMode: { exact: "environment" } }
      : { facingMode: "user" };

    html5QrCode
      .start(
        facingMode,
        {
          fps: 10,
          qrbox: (viewportWidth, viewportHeight) => {
            const minEdge = Math.min(viewportWidth, viewportHeight);
            const size = Math.floor(minEdge * 0.6);

            return { width: size, height: size };
          },
        },
        (decodedText) => {
          onResult(decodedText);
          onClose();

          html5QrCode.stop().then(() => {
            html5QrCode.clear();
          });
        },
        () => {}
      )
      .catch((err) => console.error("QR Scanner start error", err));

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current?.clear())
          .catch(() => {});
      }
    };
  }, [open, onClose, onResult]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        zIndex: 2000,
        overflow: "hidden",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "#fff",
          zIndex: 3000,
        }}
      >
        <CloseIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <Box
        id="qr-scanner-view"
        sx={{
          width: "100%",
          height: "100%",

          "& video": {
            objectFit: "cover",
            width: "100% !important",
            height: "100% !important",
          },
        }}
      />
    </Box>
  );
};

export default QrScanner;
