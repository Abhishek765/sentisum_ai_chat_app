import { useState, KeyboardEvent } from "react";
import { Paper, TextField, IconButton, Box } from "@mui/material";
import { Send, FormatBold, FormatItalic } from "@mui/icons-material";

type ChatInputProps = {
  onSend: (
    message: string,
    formatting: { bold: boolean; italic: boolean }
  ) => void;
};

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState<string>("");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    //  Bold text handling
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      setIsBold((prev) => !prev);
    }
    // Italic text handling
    if ((e.ctrlKey || e.metaKey) && e.key === "i") {
      e.preventDefault();
      setIsItalic((prev) => !prev);
    }
    // Send message handling
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message, { bold: isBold, italic: isItalic });
      setMessage("");
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <IconButton
            size="small"
            onClick={() => setIsBold(!isBold)}
            color={isBold ? "primary" : "default"}
          >
            <FormatBold />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setIsItalic(!isItalic)}
            color={isItalic ? "primary" : "default"}
          >
            <FormatItalic />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Ctrl+B for bold, Ctrl+I for italic)"
          InputProps={{
            sx: {
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
            },
          }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatInput;
