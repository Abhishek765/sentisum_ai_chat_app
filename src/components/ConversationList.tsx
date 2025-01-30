import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { Chat as ChatIcon, Add as AddIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setActiveConversation, createConversation } from "../store/chatSlice";

const ConversationList = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const activeConversationId = useSelector(
    (state: RootState) => state.chat.activeConversationId
  );

  const handleNewChat = () => {
    dispatch(createConversation());
  };

  return (
    <Paper
      sx={{
        width: 280,
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Conversations</Typography>
        <Tooltip title="New Chat">
          <IconButton onClick={handleNewChat} size="small">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <List sx={{ flex: 1, overflow: "auto" }}>
        {conversations.map((conversation) => (
          <ListItem key={conversation.id} disablePadding>
            <ListItemButton
              selected={activeConversationId === conversation.id}
              onClick={() => dispatch(setActiveConversation(conversation.id))}
            >
              <ListItemIcon>
                <ChatIcon color={conversation.ended ? "disabled" : "inherit"} />
              </ListItemIcon>
              <ListItemText
                primary={
                  conversation.messages[0]?.content.substring(0, 20) ||
                  "New Conversation"
                }
                secondary={conversation.ended ? "Ended" : "Active"}
                primaryTypographyProps={{
                  noWrap: true,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ConversationList;
