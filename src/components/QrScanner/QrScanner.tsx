import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

interface QrScannerProps {
  open: boolean;
  onClose: () => void;
}

const QR_SCANNER_ID = "qr-scanner-container";

const QrScanner: React.FC<QrScannerProps> = ({ open, onClose }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setError(null);

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(QR_SCANNER_ID);
    }

    const html5QrCode = scannerRef.current;

    // Робоча область (обов'язково!)
    const qrBox = (viewW: number, viewH: number) => {
      const minEdge = Math.min(viewW, viewH);
      const size = Math.floor(minEdge * 0.5); // 50% ширини — ідеально для телефону
      return { width: size, height: size };
    };

    const stopScanner = async () => {
      try {
        const state = html5QrCode.getState();
        if (state === Html5QrcodeScannerState.SCANNING) {
          await html5QrCode.stop();
        }
        await html5QrCode.clear();
      } catch {}
      onClose();
    };

    const onSuccess = (decodedText: string) => {
      alert("QR: " + decodedText);
      onClose();
      // setTimeout(() => alert("QR: " + decodedText), 100);
      stopScanner();
    };

    const onError = () => {};

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          {
            facingMode: "environment",
          },

          { fps: 5, qrbox: qrBox },

          onSuccess,
          onError
        );
      } catch (err) {
        console.warn("Back camera failed, switching to front...", err);

        try {
          await html5QrCode.start(
            { facingMode: "user" },
            { fps: 20, qrbox: qrBox },
            onSuccess,
            onError
          );
        } catch (err2) {
          console.error("Camera unable to start:", err2);
          setError("Unable to start camera. Check permissions.");
        }
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [open, onClose]);

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

      {error ? (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      ) : (
        <Box
          id={QR_SCANNER_ID}
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            "& video": {
              objectFit: "cover",
              width: "100% !important",
              height: "100% !important",
            },
            // ВІЗУАЛЬНА рамка того, що реально сканується
            "&::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50vw", // відповідає qrbox 50%
              height: "50vw",
              maxWidth: "50vh",
              maxHeight: "50vh",
              border: "4px solid rgba(255, 255, 255, 0.8)",
              borderRadius: "12px",
              pointerEvents: "none",
            },
          }}
        />
      )}
    </Box>
  );
};

export default QrScanner;
