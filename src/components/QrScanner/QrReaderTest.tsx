import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const QrReaderTest = ({ onClose }: { onClose: () => void }) => {
  const [data, setData] = useState<string | null>(null);
  console.log("QR");

  return (
    <Box
      sx={{
        position: "relative",
        inset: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Кнопка закриття */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          zIndex: 10,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* QR сканер */}
      <div className="my-reader">
        <QrReader
          constraints={{ aspectRatio: 1, facingMode: { ideal: "environment" } }}
          containerStyle={{ width: "100%", height: "100%" }}
          videoStyle={{ width: "300px", height: "300px", objectFit: "cover" }}
          onResult={(result, error) => {
            console.log("my-reader", result, error);
            if (result) {
              alert("QR: " + result.getText());
              setData(result.getText());
              onClose();
            }
            if (error) console.info(error);
          }}
        />
      </div>

      {/* Overlay: затемнення */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {/* Темна область */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.6)",
          }}
        />

        {/* Прозоре скан-вікно */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "60vw",
            height: "60vw",
            maxWidth: "70vh",
            maxHeight: "70vh",
            transform: "translate(-50%, -50%)",
            border: "3px solid #ffffffff",
            borderRadius: 12,
          }}
        />
      </Box>

      {/* Результат */}
      {data && (
        <Typography
          sx={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            textAlign: "center",
            color: "white",
            fontSize: 18,
            zIndex: 10,
          }}
        >
          {data}
        </Typography>
      )}
    </Box>
  );
};
