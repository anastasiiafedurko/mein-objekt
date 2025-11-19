import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import type { RootState } from "../../../store";
import { setTheme } from "../../../store/uiTheme/uiThemeSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const ThemeToggleButtonGroup = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.uiTheme.mode);

  return (
    <>
      <ButtonGroup
        variant="outlined"
        aria-label="Theme selector"
        sx={{ width: "100%", justifyContent: "center" }}
      >
        <Button
          variant={mode === "light" ? "contained" : "outlined"}
          onClick={() => dispatch(setTheme("light"))}
          sx={{ py: 2 }}
          startIcon={<LightModeIcon />}
        >
          Light
        </Button>
        <Button
          variant={mode === "dark" ? "contained" : "outlined"}
          onClick={() => dispatch(setTheme("dark"))}
          sx={{ py: 2 }}
          startIcon={<DarkModeIcon />}
        >
          Dark
        </Button>
      </ButtonGroup>
    </>
  );
};
