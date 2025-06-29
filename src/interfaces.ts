export interface IMessage {
  role: "ai" | "user";
  content: string;
  audio?: string;
}

export type IChat = IMessage[];
