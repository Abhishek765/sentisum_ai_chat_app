import { Paper, IconButton } from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addFeedback } from "../store/chatSlice";
import { Message, Feedback } from "../types";
import styles from "../styles/ChatMessage.module.css";

type ChatMessageProps = {
  message: Message;
  conversationId: string;
  showFeedback?: boolean;
  existingFeedback?: Feedback;
};

const ChatMessage = ({
  message,
  conversationId,
  showFeedback = true,
  existingFeedback,
}: ChatMessageProps) => {
  const dispatch = useDispatch();

  const handleFeedback = (liked: boolean) => {
    dispatch(
      addFeedback({
        conversationId,
        feedback: {
          messageId: message.id,
          liked,
        },
      })
    );
  };

  const messageStyle = {
    fontWeight: message.formatting?.bold ? "bold" : "normal",
    fontStyle: message.formatting?.italic ? "italic" : "normal",
  };

  return (
    <div
      className={`${styles.messageContainer} ${
        message.sender === "user" ? styles.userMessage : styles.aiMessage
      }`}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          bgcolor:
            message.sender === "user" ? "primary.main" : "background.paper",
          color: message.sender === "user" ? "white" : "text.primary",
        }}
      >
        <div style={messageStyle}>{message.content}</div>
      </Paper>

      {message.sender === "ai" && showFeedback && (
        <div className={styles.feedbackButtons}>
          <IconButton
            size="small"
            onClick={() => handleFeedback(true)}
            color={existingFeedback?.liked === true ? "success" : "default"}
          >
            <ThumbUp fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleFeedback(false)}
            color={existingFeedback?.liked === false ? "error" : "default"}
          >
            <ThumbDown fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
