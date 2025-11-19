import {
  Box,
  CssBaseline,
  Typography,
  SwipeableDrawer,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import type { AppLayoutProps } from "./AppLayout.types";
import { ThemeToggleButtonGroup } from "../Buttons/ThemeToggleButton/ThemeToggleButtonGroup";

import ScanButton from "../Buttons/ScanButton/ScanButton";
import { useNavigate } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Header from "../Header/Header";

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpenSettings(value);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", pt: "64px" }}>
      {children}

      <Header
        museumName="Louvre Museum"
        logoUrl="/images/museum-logo.png"
        onOpenSettings={toggleDrawer(true)}
      />

      <SwipeableDrawer
        anchor="right"
        open={openSettings}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            width: 250,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Settings</Typography>
          <Divider />
          <Typography variant="subtitle1">Mode</Typography>
          <CssBaseline />
          <ThemeToggleButtonGroup />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default AppLayout;
