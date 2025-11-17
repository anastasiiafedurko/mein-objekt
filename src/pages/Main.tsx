import { Box, Typography } from "@mui/material";
import MuseumAppBar from "../components/AppBar/MuseumAppBar";
import ObjectCard from "../components/Cards/ObjectCard";
import { Fab } from "@mui/material";
import QrIcon from "@mui/icons-material/QrCodeScanner";

interface ObjectType {
  id: string;
  title: string;
  imageUrl: string;
}

interface Props {
  museumName: string;
  logoUrl?: string;
  recentObjects: ObjectType[];
  onScanQr: () => void;
}

export default function Main({
  museumName,
  logoUrl,
  recentObjects,
  onScanQr,
}: Props) {
  return (
    <Box>
      <MuseumAppBar museumName={museumName} logoUrl={logoUrl} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        {recentObjects.length === 0 && (
          <Typography>No recently viewed objects</Typography>
        )}
        {recentObjects.map((obj) => (
          <ObjectCard key={obj.id} title={obj.title} imageUrl={obj.imageUrl} />
        ))}
      </Box>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={onScanQr}
      >
        <QrIcon />
      </Fab>
    </Box>
  );
}
