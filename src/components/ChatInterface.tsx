import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ConversationList from "./ConversationList";
import ChatInput from "./ChatInput";
import { Message } from "../types";

const ChatInterface = () => {
  const activeConversationId = useSelector(
    (state: RootState) => state.chat.activeConversationId
  );
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const handleNewChat = () => {
    // TODO:  dispatcher to create conversation
  };

  const handleNewMessage = async (
    content: string,
    formatting: { bold: boolean; italic: boolean }
  ) => {
    if (!activeConversationId) {
      // TODO:  dispatcher to create conversation
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: "user",
      timestamp: Date.now(),
      formatting,
    };
  };

  const handleEndConversation = () => {
    // TODO: show feedback and save conversation
    console.log("end conversation");
  };

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
      <ConversationList />
      {/*  */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>
        {activeConversation ? (
          <>
            <Box sx={{ flex: 1, overflow: "auto", mb: 2 }}>
              {activeConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </Box>

            {!activeConversation.ended && (
              <Box>
                <ChatInput onSend={handleNewMessage} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 1,
                    gap: 1,
                  }}
                >
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleEndConversation}
                  >
                    End & Rate Conversation
                  </Button>
                </Box>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleNewChat}
              sx={{ mb: 2 }}
            >
              Start New Chat
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatInterface;
