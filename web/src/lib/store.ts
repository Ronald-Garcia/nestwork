import { atom } from "nanostores";
import { persistentMap } from "@nanostores/persistent";
import type { MessageType, UserType } from "@/data/types";
import { logger } from "@nanostores/logger";

const DEBUG = true;

export const $isChat = atom(false);

export const switchChat = () => {
  $isChat.set(!$isChat.get());
}

const defaultUser: UserType = {
  id: "",
  name: "",
  username: "",
};
export const $user = persistentMap<UserType>("user:", defaultUser);

export function setUser(user: UserType) {
  $user.set(user);
}

export function clearUser() {
  $user.set(defaultUser);
}

export const $avatarUrl = atom<string>("");

export function setAvatarUrl(url: string) {
    $avatarUrl.set(url);
}

export const $messages = atom<MessageType[]>([]);

export function setMessages(messages: MessageType[]) {
  $messages.set(messages);
}

export function addMessage(message: MessageType) {
  $messages.set([...$messages.get(), message]);
}

export function addMessages(messages: MessageType[]) {
  $messages.set([...$messages.get(), ...messages]);
}

DEBUG && logger({ $user, $messages });