import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        minWidth: 0,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "#fff",
        backdropFilter: "blur(4px)",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.6)",
        },
      }}
    >
      <ArrowBackIosNewIcon fontSize="small" />
    </Button>
  );
};
