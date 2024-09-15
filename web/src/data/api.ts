import { API_URL } from "@/env";
import type { MessageType, OnboardParam, UserType } from "./types";


// Sign up a user
export const signUp = async (
    name: string,
    username: string,
    password: string,
  ): Promise<UserType> => {
    const response = await fetch(`${API_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        password,
      }),
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response);
      const thing = await response.json();
      console.log(thing);
      throw new Error(`API request failed! with message: ${thing}`);
    }
    const { user }: { user: UserType } = await response.json();
    return user;
  };
  
  // Sign in a user
  export const signIn = async (
    username: string,
    password: string,
  ): Promise<UserType> => {
    const response = await fetch(`${API_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });
    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message);
    }
    const { user }: { user: UserType } = await response.json();
    return user;
  };
  
  // Sign out a user
  export const signOut = async (): Promise<boolean> => {
    const response = await fetch(`${API_URL}/sign-out`, {
      method: "POST",
      credentials: "include", // allow send and receive cookies
    });
    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message);
    }
    return true;
  };


  export const onboardUser = async (options: OnboardParam): Promise<boolean> => {
    console.log(JSON.stringify(options));
    const response = await fetch(`${API_URL}/onboard`,{
      method: "POST",
      credentials: "include",
      body: JSON.stringify(options)
    });
    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message);
    }
    return true;
  }
  
  export const validateSession = async () => {
    const response = await fetch(`${API_URL}/validate-session`, {
      method: "POST",
      credentials: "include",
    });
  
    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message);
    }
  
    return true;
  }

  export const sendMessage = async (chat: string): Promise<MessageType> => {

    console.log(JSON.stringify({ chat }))
    const response = await fetch(`${API_URL}/chat`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ chat }) 
      }
    )

    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message);
    }
  

    const message: MessageType = await response.json();
    return message;

  }