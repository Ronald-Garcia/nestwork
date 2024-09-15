  export type UserType = {
    id: string;
    name: string;
    username: string;
    options: OnboardParam;
  };
  
  export type OnboardParam = {
    picture: string;
    department: string;
    email: string;
    hobbies: string;
  }

  export type MessageType = {
    content: string;
  }

  export type ChatMessageType = {
    name: string;
    email: string;
    department: string;
    interests: string;
    projects: string;
    hobbies: string;
    picture?: string;
  }

  export type ConversationType = {
    id: number;
    title: string;
  }