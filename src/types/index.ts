export type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: number;
  formatting?: {
    bold?: boolean;
    italic?: boolean;
  };
};

export type Feedback = {
  messageId: string;
  liked?: boolean;
  rating?: number;
  comment?: string;
};

export type Conversation = {
  id: string;
  messages: Message[];
  feedback: Feedback[];
  ended: boolean;
};
