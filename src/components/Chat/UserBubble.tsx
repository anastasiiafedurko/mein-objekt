import { Box } from "@mui/material";

export default function UserBubble({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: "#fff",
        borderRadius: "16px",
        p: 1.5,
        maxWidth: "70%",
        alignSelf: "flex-end",
        mb: 1,
      }}
    >
      {children}
    </Box>
  );
}
