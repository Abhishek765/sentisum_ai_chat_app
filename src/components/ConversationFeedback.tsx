import React, { useState } from "react";
import {
  Paper,
  Typography,
  Rating,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addFeedback, endConversation } from "../store/chatSlice";

type ConversationFeedbackProps = {
  conversationId: string;
  onComplete: () => void;
};

const ConversationFeedback = ({
  conversationId,
  onComplete,
}: ConversationFeedbackProps) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    if (rating) {
      dispatch(
        addFeedback({
          conversationId,
          feedback: {
            messageId: "conversation",
            rating,
            comment,
          },
        })
      );
      dispatch(endConversation(conversationId));
      onComplete();
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: "auto", my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Rate this conversation
      </Typography>

      <Box
        sx={{
          my: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Rating
          size="large"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts about this conversation..."
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        disabled={!rating}
      >
        Submit Feedback
      </Button>
    </Paper>
  );
};

export default ConversationFeedback;
