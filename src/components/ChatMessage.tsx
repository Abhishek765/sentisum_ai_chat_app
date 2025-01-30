import React from "react";
import { Paper } from "@mui/material";
import { Message } from "../types";
import styles from "../styles/ChatMessage.module.css";

type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const handleFeedback = (liked: boolean) => {
    // TODO:  add feedback to store
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
    </div>
  );
};

export default ChatMessage;
