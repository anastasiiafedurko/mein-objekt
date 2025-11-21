import { useNavigate } from "react-router-dom";
import { QrScanner } from "../components/QrScanner/QrScanner";

export const QrScannerPage = () => {
  const navigate = useNavigate();

  const handleCloseScanner = () => {
    navigate(-1);
  };

  const handleScanned = (text: string) => {
    navigate(`/objects/${text}`);
  };

  return <QrScanner onResult={handleScanned} onClose={handleCloseScanner} />;
};

export default QrScannerPage;
