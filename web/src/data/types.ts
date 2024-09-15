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