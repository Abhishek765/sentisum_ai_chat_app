import { Message } from "../types";

const MOCK_RESPONSES = [
  "I understand your question. Let me help you with that.",
  "That's an interesting perspective. Here's what I think...",
  "Based on the information provided, I would suggest...",
  "Let me break this down for you...",
  "Here's a detailed explanation of how this works...",
];

export const getMockAiResponse = async (
  userMessage: string
): Promise<Message> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: crypto.randomUUID(),
    content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
    sender: "ai",
    timestamp: Date.now(),
  };
};
