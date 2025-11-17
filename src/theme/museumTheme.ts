import { createTheme as createMUITheme } from "@mui/material/styles";
import type { PlatformConfig } from "../types/PlatformConfig";

export function createTheme(config: PlatformConfig) {
  return createMUITheme({
    palette: {
      primary: { main: config.theme?.primary || "#1E88E5" },
      secondary: { main: config.theme?.secondary || "#8E24AA" },
      background: { default: config.theme?.background || "#f5f5f5" },
    },
    typography: { fontFamily: "Roboto, Arial" },
  });
}
