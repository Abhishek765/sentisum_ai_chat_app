import type { Conversation } from "../types";

// To Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const saveConversation = async (
  conversation: Conversation
): Promise<void> => {
  try {
    await delay(1000);
    console.log("Conversation saved:", conversation);
  } catch (error) {
    console.error("Error saving conversation:", error);
    throw error;
  }
};

export const getSharedConversation = async (
  id: string
): Promise<Conversation | null> => {
  try {
    await delay(1000);
    // Get conversation from localStorage for demo purposes
    const state = localStorage.getItem("chatState");
    if (state) {
      const { conversations } = JSON.parse(state);
      return conversations.find((c: Conversation) => c.id === id) || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching shared conversation:", error);
    throw error;
  }
};
