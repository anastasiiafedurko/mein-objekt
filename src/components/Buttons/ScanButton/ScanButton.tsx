import { Fab } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import type { ScanButtonProps } from "./ScanButton.types";

export const ScanButton: React.FC<ScanButtonProps> = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: 70,
        height: 70,
        zIndex: 1000,
        boxShadow: 3,
      }}
    >
      <QrCodeScannerIcon sx={{ fontSize: 36, color: "white" }} />
    </Fab>
  );
};

export default ScanButton;
