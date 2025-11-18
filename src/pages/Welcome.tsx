import { Box, Typography } from "@mui/material";
import PrimaryButton from "../components/Buttons/PrimaryButton/PrimaryButton";
import MuseumAppBar from "../components/AppBar/MuseumAppBar";

interface Props {
  museumName: string;
  logoUrl?: string;
  onStart: () => void;
}

export default function Welcome({ museumName, logoUrl, onStart }: Props) {
  return (
    <Box>
      <MuseumAppBar museumName={museumName} logoUrl={logoUrl} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to {museumName}
        </Typography>
        <PrimaryButton onClick={onStart}>Start</PrimaryButton>
      </Box>
    </Box>
  );
}
