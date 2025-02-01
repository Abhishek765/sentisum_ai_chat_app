import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Container,
} from "@mui/material";
import { getSharedConversation } from "../services/apiService";
import ChatMessage from "./ChatMessage";
import type { Conversation } from "../types";

const SharedConversation = () => {
  const { id } = useParams<{ id: string }>();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConversation = async () => {
      try {
        if (id) {
          const data = await getSharedConversation(id);
          setConversation(data);
        }
      } catch (err) {
        setError("Failed to load conversation");
      } finally {
        setLoading(false);
      }
    };

    loadConversation();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 64px)"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !conversation) {
    return (
      <Container maxWidth="sm">
        <Paper sx={{ p: 3, mt: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error || "Conversation not found"}
          </Typography>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
            Go to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Shared Conversation</Typography>
          <Button component={Link} to="/" variant="outlined">
            Start Your Own Chat
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          {conversation.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              conversationId={conversation.id}
              showFeedback={false}
              existingFeedback={conversation.feedback.find(
                (f) => f.messageId === message.id
              )}
            />
          ))}
        </Box>

        {conversation.feedback.some((f) => f.messageId === "conversation") && (
          <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="h6" gutterBottom>
              Conversation Feedback
            </Typography>
            {conversation.feedback
              .filter((f) => f.messageId === "conversation")
              .map((f, index) => (
                <Box key={index}>
                  {f.rating && (
                    <Typography variant="body1" gutterBottom>
                      Rating: {f.rating} / 5
                    </Typography>
                  )}
                  {f.comment && (
                    <Typography variant="body2" color="text.secondary">
                      "{f.comment}"
                    </Typography>
                  )}
                </Box>
              ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SharedConversation;
