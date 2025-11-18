import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import Welcome from "./pages/Welcome";
import { createTheme } from "./theme/museumTheme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

import { Loading } from "./components/ui/Loading";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import Main from "./pages/Main";
import { getPlatform } from "./store/platform/selectors";
import { fetchPlatform } from "./store/platform/actions";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { config, loading } = useSelector(getPlatform);

  useEffect(() => {
    
    dispatch(fetchPlatform("ludwig"));
  }, [dispatch]);

  if (loading || !config) return <Loading />;

  const handleStart = () => {
    navigate("/main");
  };

  return (
    <ThemeProvider theme={createTheme(config)}>
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              museumName={config.name}
              logoUrl={config.logoUrl}
              onStart={handleStart}
            />
          }
        />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
