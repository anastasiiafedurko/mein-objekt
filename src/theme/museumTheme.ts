import { createTheme } from "@mui/material/styles";

export interface MuseumConfig {
  name: string;
  logoUrl: string;
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
  };
}

export function createMuseumTheme(config: MuseumConfig) {
  return createTheme({
    palette: {
      primary: { main: config.theme?.primary || "#1E88E5" },
      secondary: { main: config.theme?.secondary || "#8E24AA" },
      background: { default: config.theme?.background || "#f5f5f5" },
    },
    typography: { fontFamily: "Roboto, Arial" },
  });
}
