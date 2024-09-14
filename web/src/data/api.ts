import { API_URL } from "@/env";
import type { UserType } from "./types";


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
      throw new Error(`API request failed! with status: ${response.status}`);
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
      throw new Error(`API request failed! with status: ${response.status}`);
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
      throw new Error(`API request failed! with status: ${response.status}`);
    }
    return true;
  };