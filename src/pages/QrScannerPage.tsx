import { useNavigate } from "react-router-dom";
import { QrScanner } from "../components/QrScanner/QrScanner";
import { allObjects } from "../dammyData/allObjects";
import { setSelectedObject } from "../store/selectedObject/selectedObjectSlice";
import { useDispatch } from "react-redux";

export const QrScannerPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseScanner = () => {
    navigate(-1);
  };

  const handleScanned = (text: string) => {
    const foundObject = allObjects.find((obj) => obj.id === text);
    if (foundObject) {
      dispatch(setSelectedObject(foundObject));
      navigate(`/objects/${foundObject.id}`);
    } else {
      console.warn("Object not found:", text);
    }
  };

  return <QrScanner onResult={handleScanned} onClose={handleCloseScanner} />;
};

export default QrScannerPage;
