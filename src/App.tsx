import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Welcome from "./pages/Welcome";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

import { Loading } from "./components/ui/Loading";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import Main from "./pages/Main";
import { getPlatform } from "./store/platform/selectors";
import { fetchPlatform } from "./store/platform/actions";
import ObjectDetailsPage from "./pages/ObjectDetailsPage";
import AppLayout from "./components/AppLayout.tsx/AppLayout";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { config, loading } = useSelector(getPlatform);
  const mode = useSelector((state: RootState) => state.uiTheme.mode);

  useEffect(() => {
    dispatch(fetchPlatform("ludwig"));
  }, [dispatch]);

  if (loading || !config) return <Loading />;

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: config.theme?.primary ?? "#1976d2" },
      secondary: { main: config.theme?.secondary ?? "#9c27b0" },
      background: {
        default:
          mode === "dark" ? "#121212" : (config.theme?.background ?? "#fafafa"),
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  const handleStart = () => {
    navigate("/main");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <Routes>
          <Route
            path="/welcome"
            element={
              <Welcome
                museumName={config.name}
                logoUrl={config.logoUrl}
                onStart={handleStart}
              />
            }
          />
          <Route path="/" element={<Main />} />
          <Route path="/objects/:objectId" element={<ObjectDetailsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
