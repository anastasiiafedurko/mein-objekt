import { Box } from "@mui/material";

export const BotBubble = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        borderRadius: "16px",
        p: 1.5,
        maxWidth: "70%",
        alignSelf: "flex-start",
        mb: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default BotBubble;
