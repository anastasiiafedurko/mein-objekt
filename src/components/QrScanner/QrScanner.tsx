import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import type { QrScannerProps } from "./QrScanner.types";

const QR_SCANNER_ID = "qr-scanner-view";

const QrScanner: React.FC<QrScannerProps> = ({ open, onClose, onResult }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const handleCloseScannerSafely = async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING) {
          await scannerRef.current.stop();
        }
        await scannerRef.current.clear();
      } catch (err) {
        console.warn("Error stopping scanner:", err);
      }
    }
    onClose();
  };

  const handleCheckCameraSettings = () => {
    alert(
      "Please check your browser camera settings:\n\n" +
        "- Chrome/Edge: Settings → Privacy and security → Site settings → Camera\n" +
        "- Firefox: Settings → Privacy & Security → Permissions → Camera\n" +
        "- Safari (macOS/iOS): Preferences/Settings → Websites → Camera\n\n" +
        "Remove any previous blocks for this site and reload the page."
    );
  };

  useEffect(() => {
    if (!open) return;

    setError(null);

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(QR_SCANNER_ID);
    }

    const html5QrCode = scannerRef.current;

    const facingMode = isMobile
      ? { facingMode: { exact: "environment" } }
      : { facingMode: "user" };

    const startScanner = async () => {
      try {
        await html5QrCode.start(
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
            handleCloseScannerSafely();
          },
          (err) => {}
        );
      } catch (err: any) {
        console.error("QR Scanner start error", err);
        if (err.name === "NotAllowedError") {
          setError(
            "Camera access is blocked or denied. Please check your browser settings."
          );
        } else {
          setError("Unable to start camera. Please try again.");
        }
      }
    };

    startScanner();

    return () => {
      handleCloseScannerSafely();
    };
  }, [open, onClose, onResult, isMobile]);

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
        flexDirection: "column",
        color: "#fff",
        textAlign: "center",
        p: 3,
      }}
    >
      <IconButton
        onClick={handleCloseScannerSafely}
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

      {error ? (
        <Box>
          <Typography variant="h6" mb={2}>
            {error}
          </Typography>

          <Box mb={2} sx={{ textAlign: "left" }}>
            <Typography>Try the following:</Typography>
            <ul>
              <li>Allow camera access in your browser settings.</li>
              <li>
                On Safari, go to Settings → Safari → Camera and allow access.
              </li>
              <li>Reload the page and try again.</li>
              <li>Use the QR code manually if possible.</li>
            </ul>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleCheckCameraSettings}
            sx={{ mr: 2 }}
          >
            Check Camera Settings
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseScannerSafely}
          >
            Close
          </Button>
        </Box>
      ) : (
        <Box
          id={QR_SCANNER_ID}
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
      )}
    </Box>
  );
};

export default QrScanner;
