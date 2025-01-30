import type { Conversation } from "../types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const saveConversation = async (
  conversation: Conversation
): Promise<void> => {
  try {
    // Simulate API call
    await delay(1000);
    console.log("Conversation saved:", conversation);
  } catch (error) {
    console.error("Error saving conversation:", error);
    throw error;
  }
};
