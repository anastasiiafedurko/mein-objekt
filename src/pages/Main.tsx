import { Box, Button, Drawer, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlatform } from "../store/platform/selectors";
import { getRecentObjects } from "../store/recentObjects/selectors";
import type { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { addRecentObject } from "../store/recentObjects/recentObjectsSlice";
import ScanButton from "../components/Buttons/ScanButton/ScanButton";
import { mockRecentObjects } from "../dammyData/recentObjects";
import RecentObjectsList from "../components/Objects/RecentObject/RecentObjectsList";
import { Loading } from "../components/ui/Loading";
import CloseIcon from "@mui/icons-material/Close";
import { QrScanner } from "../components/QrScanner/QrScanner";

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector(getPlatform);
  const recentObjects = useSelector(getRecentObjects);
  const [scanerOpen, setScanerOpen] = useState(false);

  useEffect(() => {
    // dispatch(loadRecentObjects());
    mockRecentObjects.forEach((obj) => dispatch(addRecentObject(obj)));
  }, [dispatch]);

  const handleOpenScanner = () => {
    setScanerOpen(true);
  };

  const handleCloseScanner = () => {
    setScanerOpen(false);
  };

  const handleScanned = (text: string) => {
    navigate(`/objects/${text}`);
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
        <RecentObjectsList objects={recentObjects} />
      </Box>
      <ScanButton onClick={handleOpenScanner} />

      <Drawer
        anchor="bottom"
        open={scanerOpen}
        onClose={handleCloseScanner}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "background.paper",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              ml: 2,
              mr: 2,
              display: "flex",
              flexDirection: "column",
              maxHeight: 600,
              minHeight: 500,
            },
          },
        }}
      >
        <IconButton
          onClick={handleCloseScanner}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "text.primary",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            flex: 1,
            mt: 5,
            overflow: "auto",
          }}
        >
          {scanerOpen && <QrScanner onResult={handleScanned} />}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCloseScanner}
          sx={{
            mt: 2,
            mb: "env(safe-area-inset-bottom)",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
      </Drawer>
    </>
  );
};

export default Main;
