import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
} from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  conversationId: string;
}

const ShareDialog = ({ open, onClose, conversationId }: ShareDialogProps) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const shareUrl = `${window.location.origin}/share/${conversationId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopiedMessage(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Share Conversation</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Share this link with others to let them view this conversation:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              value={shareUrl}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              variant="contained"
              startIcon={<CopyIcon />}
              onClick={handleCopy}
            >
              Copy
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Bottom Left Snack bar */}
      <Snackbar
        open={showCopiedMessage}
        autoHideDuration={3000}
        onClose={() => setShowCopiedMessage(false)}
        message="Link copied to clipboard"
      />
    </>
  );
};

export default ShareDialog;
