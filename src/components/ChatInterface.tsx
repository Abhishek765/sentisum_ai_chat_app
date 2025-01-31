import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon, Share } from "@mui/icons-material";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Feedback, Message } from "../types";
import { addMessage, createConversation } from "../store/chatSlice";
import { getMockAiResponse } from "../services/mockAiService";
import { useEffect, useRef, useState } from "react";
import { saveConversation } from "../services/apiService";
import ConversationFeedback from "./ConversationFeedback";
import ConversationList from "./ConversationList";
import ShareDialog from "./ShareDialog";

const ChatInterface = () => {
  const dispatch = useDispatch();
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversationId = useSelector(
    (state: RootState) => state.chat.activeConversationId
  );
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showFeedback) {
      scrollToBottom();
    }
  }, [showFeedback]);

  const handleNewChat = () => {
    dispatch(createConversation());
  };

  const handleNewMessage = async (
    content: string,
    formatting: { bold: boolean; italic: boolean }
  ) => {
    if (!activeConversationId) {
      dispatch(createConversation());
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: "user",
      timestamp: Date.now(),
      formatting,
    };

    dispatch(
      addMessage({
        conversationId: activeConversationId!,
        message: userMessage,
      })
    );

    const aiResponse = await getMockAiResponse(content);
    dispatch(
      addMessage({
        conversationId: activeConversationId!,
        message: aiResponse,
      })
    );
  };

  const handleEndConversation = async () => {
    setShowFeedback(true);
    if (activeConversation) {
      try {
        await saveConversation(activeConversation);
      } catch (error) {
        console.error("Failed to save conversation:", error);
      }
    }
  };

  const getConversationFeedback = (feedback: Feedback[]) => {
    const conversationFeedback = feedback.find(
      (f) => f.messageId === "conversation"
    );
    if (!conversationFeedback) return null;
    return conversationFeedback;
  };

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
      <ConversationList />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>
        {activeConversation ? (
          <>
            <Box sx={{ flex: 1, overflow: "auto", mb: 2 }}>
              {activeConversation.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  conversationId={activeConversationId}
                  existingFeedback={activeConversation.feedback.find(
                    (f) => f.messageId === message.id
                  )}
                  showFeedback={!activeConversation.ended}
                />
              ))}

              {showFeedback && (
                <Box ref={messagesEndRef}>
                  <ConversationFeedback
                    conversationId={activeConversationId}
                    onComplete={() => setShowFeedback(false)}
                  />
                </Box>
              )}

              {activeConversation.ended && (
                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Conversation Feedback
                  </Typography>
                  {getConversationFeedback(activeConversation.feedback) ? (
                    <>
                      {getConversationFeedback(activeConversation.feedback)
                        ?.rating && (
                        <Typography variant="body1" gutterBottom>
                          Rating:{" "}
                          {
                            getConversationFeedback(activeConversation.feedback)
                              ?.rating
                          }{" "}
                          / 5
                        </Typography>
                      )}
                      {getConversationFeedback(activeConversation.feedback)
                        ?.comment && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          "
                          {
                            getConversationFeedback(activeConversation.feedback)
                              ?.comment
                          }
                          "
                        </Typography>
                      )}
                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setShowShareDialog(true)}
                          startIcon={<Share />}
                        >
                          Share Conversation
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <Typography color="text.secondary">
                      No feedback was provided for this conversation.
                    </Typography>
                  )}
                </Box>
              )}
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

            <ShareDialog
              open={showShareDialog}
              onClose={() => setShowShareDialog(false)}
              conversationId={activeConversationId}
            />
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
