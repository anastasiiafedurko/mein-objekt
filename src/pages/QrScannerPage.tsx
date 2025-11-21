import { useNavigate } from "react-router-dom";
import { QrScanner } from "../components/QrScanner/QrScanner";

export const QrScannerPage = () => {
  const navigate = useNavigate();

  const handleCloseScanner = () => {
    navigate(-1);
  };

  return (
    <QrScanner
      onResult={() => {
        alert("SCANNED");
      }}
      onClose={handleCloseScanner}
    />
  );
};

export default QrScannerPage;
