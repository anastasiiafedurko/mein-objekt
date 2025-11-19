import { Box, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import type { HeaderProps } from "./Header.types";
import { Link } from "react-router";

export const Header: React.FC<HeaderProps> = ({
  museumName,
  logoUrl,
  onOpenSettings,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backgroundColor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {logoUrl && (
          <Link to="/">
            <img
              src={logoUrl}
              alt={`${museumName} logo`}
              height={40}
              style={{ marginRight: 8 }}
            />
          </Link>
        )}
        <Typography variant="h6">{museumName}</Typography>
      </Box>

      <IconButton onClick={onOpenSettings}>
        <SettingsIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
