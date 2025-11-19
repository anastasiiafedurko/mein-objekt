import { Button } from "@mui/material";
import type { ChatButtonProps } from "./ChatButton.types";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "90%",
        transform: "translateX(-50%)",
        zIndex: 1100,
        borderRadius: "50%",
        width: 70,
        height: 70,
        minWidth: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 3,
      }}
    >
      <ChatBubbleIcon />
    </Button>
  );
};

export default ChatButton;
