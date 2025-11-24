import { Box, Typography, Button } from "@mui/material";
import CloudOffIcon from "@mui/icons-material/CloudOff";

export const OfflinePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={8}
      textAlign="center"
    >
      <CloudOffIcon sx={{ fontSize: 80, mb: 2, color: "text.secondary" }} />

      <Typography variant="h4" gutterBottom>
        You're Offline
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Internet connection is not available. You can browse objects that were
        viewed earlier.
      </Typography>

      <Button variant="contained" href="/">
        Back to Home
      </Button>
    </Box>
  );
};

export default OfflinePage;
