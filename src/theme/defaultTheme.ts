import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: { main: "#1E88E5" },
    secondary: { main: "#8E24AA" },
    background: { default: "#f5f5f5" },
  },
  typography: { fontFamily: "Roboto, Arial" },
});

export default defaultTheme;
