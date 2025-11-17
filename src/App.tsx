import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import Welcome from "./pages/Welcome";
import { createTheme } from "./theme/museumTheme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { fetchPlatformConfig } from "./store/platform/platformConfigSlice";
import { Loading } from "./components/ui/Loading";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { config, loading } = useSelector(
    (state: RootState) => state.platformConfig
  );

  useEffect(() => {
    dispatch(fetchPlatformConfig("ludwig"));
  }, [dispatch]);

  if (loading || !config) return <Loading />;

  return (
    <ThemeProvider theme={createTheme(config)}>
      <Welcome
        museumName={config.name}
        logoUrl={config.logoUrl}
        onStart={() => alert("Start pressed")}
      />
    </ThemeProvider>
  );
}

export default App;
