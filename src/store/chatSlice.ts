import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Conversation, Feedback, Message } from "../types";

type ChatState = {
  conversations: Conversation[];
  activeConversationId: string | null;
};

// Load state from localStorage if available
const loadState = (): ChatState => {
  try {
    const serializedState = localStorage.getItem("chatState");
    if (serializedState === null) {
      return {
        conversations: [],
        activeConversationId: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      conversations: [],
      activeConversationId: null,
    };
  }
};

const initialState: ChatState = loadState();

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createConversation: (state) => {
      const newConversation: Conversation = {
        id: uuidv4(),
        messages: [],
        feedback: [],
        showConversationFeedbackForm: false,
        ended: false,
      };
      state.conversations.push(newConversation);
      state.activeConversationId = newConversation.id;
      localStorage.setItem("chatState", JSON.stringify(state));
    },
    addMessage: (
      state,
      action: PayloadAction<{ conversationId: string; message: Message }>
    ) => {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (conversation) {
        conversation.messages.push(action.payload.message);
        localStorage.setItem("chatState", JSON.stringify(state));
      }
    },
    showConversationFeedbackForm: (
      state,
      action: PayloadAction<{
        activeConversationId: string | null;
        shouldShowConversationFeedbackForm?: boolean;
      }>
    ) => {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload.activeConversationId
      );
      if (conversation) {
        conversation.showConversationFeedbackForm =
          action.payload.shouldShowConversationFeedbackForm ?? false;
        localStorage.setItem("chatState", JSON.stringify(state));
      }
    },
    endConversation: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload
      );
      if (conversation) {
        conversation.showConversationFeedbackForm = true;
        conversation.ended = true;
        localStorage.setItem("chatState", JSON.stringify(state));
      }
    },
    addFeedback: (
      state,
      action: PayloadAction<{ conversationId: string; feedback: Feedback }>
    ) => {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (conversation) {
        // Remove existing feedback for the same message if it exists
        conversation.feedback = conversation.feedback.filter(
          (f) => f.messageId !== action.payload.feedback.messageId
        );
        conversation.feedback.push(action.payload.feedback);
        localStorage.setItem("chatState", JSON.stringify(state));
      }
    },
    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.activeConversationId = action.payload;
      localStorage.setItem("chatState", JSON.stringify(state));
    },
  },
});

export const {
  createConversation,
  addMessage,
  showConversationFeedbackForm,
  endConversation,
  addFeedback,
  setActiveConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
