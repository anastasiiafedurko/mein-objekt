import { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  MenuList,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchObjectQuestions } from "../../store/chat/actions";
import type { ChatItem } from "../../types/ChatItem";
import { selectQuestion } from "../../store/chat/objectChatSlice";
import UserBubble from "./components/UserBubble";
import BotBubble from "./components/BotBubble";
import CloseIcon from "@mui/icons-material/Close";
import type { ChatProps } from "./Chat.types";

const Chat: React.FC<ChatProps> = ({ objectId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const objectChat = useSelector(
    (state: RootState) => state.objectChat[objectId]
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (objectId && !objectChat) {
      dispatch(fetchObjectQuestions(objectId));
    }
  }, [dispatch, objectId, objectChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [objectChat?.chatHistory.length]);

  if (!objectChat) return <Typography>Loading chat...</Typography>;

  const { availableQuestions, chatHistory } = objectChat;

  const handleSelectQuestion = (item: ChatItem) => {
    dispatch(selectQuestion({ objectId, item }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      sx={{
        p: 2,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 10,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        ref={scrollRef}
        sx={{
          py: 5,
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Box display="flex" justifyContent="flex-start">
          <BotBubble>
            Hi! I can answer your questions if you want to learn more about this
            object.
          </BotBubble>
        </Box>
        {chatHistory.map((item) => (
          <Box key={item.id}>
            <Box display="flex" justifyContent="flex-end">
              <UserBubble>{item.question}</UserBubble>
            </Box>

            <Box display="flex" justifyContent="flex-start">
              <BotBubble>{item.answer}</BotBubble>
            </Box>
          </Box>
        ))}
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 1,
          borderRadius: 2,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          position: "sticky",
          bottom: 0,
        }}
      >
        <Typography variant="subtitle2" mb={1} color="text.secondary">
          Ask a question
        </Typography>

        <MenuList disablePadding>
          {availableQuestions.length === 0 && (
            <Typography color="text.secondary" p={1}>
              No more questions
            </Typography>
          )}

          {availableQuestions.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => handleSelectQuestion(item)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
              }}
            >
              {item.question}
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Box>
  );
};

export default Chat;
