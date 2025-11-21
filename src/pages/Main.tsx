import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlatform } from "../store/platform/selectors";
import { getRecentObjects } from "../store/recentObjects/selectors";
import type { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { addRecentObject } from "../store/recentObjects/recentObjectsSlice";
import type { ObjectItem } from "../types/ObjectItem";
import ScanButton from "../components/Buttons/ScanButton/ScanButton";
import { mockRecentObjects } from "../dammyData/recentObjects";
import RecentObjectsList from "../components/Objects/RecentObject/RecentObjectsList";
import QrScanner from "../components/QrScanner/QrScanner";
import { Loading } from "../components/ui/Loading";
import { QrReaderTest } from "../components/QrScanner/QrReaderTest";
import { QrReader } from "react-qr-reader";
import { AdvancedExample } from "../components/QrScanner/QrSacanner2";

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { config, loading } = useSelector(getPlatform);
  const recentObjects = useSelector(getRecentObjects);

  const [scannerOpen, setScannerOpen] = useState(false);

  useEffect(() => {
    // dispatch(loadRecentObjects());
    mockRecentObjects.forEach((obj) => dispatch(addRecentObject(obj)));
  }, [dispatch]);

  const handleRecentObject = (obj: ObjectItem) => {
    navigate(`/object/${obj.id}`);
  };

  const handleOpenScanner = () => {
    setScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setScannerOpen(false);
    // navigate(`/objects/4`);
  };

  const handleResultScanner = (text: string) => {
    console.log("QR:", text);

    navigate(`/objects/4`);

    // const obj = recentObjects.find((o) => o.id === text);

    // if (obj) navigate(`/object/${obj.id}`);

    setScannerOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        p={3}
        sx={{
          // minHeight: "100vh",
          pb: "120px",
        }}
      >
        <RecentObjectsList
          objects={recentObjects}
          onClick={(obj) => handleRecentObject(obj)}
        />
      </Box>
      <ScanButton onClick={handleOpenScanner} />
      {/* <QrScanner
        open={scannerOpen}
        onClose={handleCloseScanner}
        // onResult={handleResultScanner}
      /> */}

      {scannerOpen && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100vh",
          }}
        >
          <AdvancedExample
            onCodeScanned={() => {
              alert("SCANNED");
            }}
          />
        </div>
      )}

      {/* {scannerOpen && <QrReaderTest onClose={handleCloseScanner} />} */}
    </>
  );
};

export default Main;
