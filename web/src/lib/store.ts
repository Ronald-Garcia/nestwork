import { atom } from "nanostores";
import { persistentMap } from "@nanostores/persistent";
import { ConversationType, type ChatMessageType, type MessageType, type UserType } from "@/data/types";
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

export const $messages = atom<(MessageType | ChatMessageType[])[]>([]);

export function setMessages(messages: (MessageType | ChatMessageType[])[]) {
  $messages.set(messages);
}

export function  addMessage(message: MessageType | ChatMessageType[]) {
  $messages.set([...$messages.get(), message]);
}

export function addMessages(messages: (MessageType | ChatMessageType[])) {
  $messages.set([...$messages.get(), messages]);
}

export const $conversations = atom<ConversationType[]>([]);


export function addConvo(convo: ConversationType) {
  $conversations.set([...$conversations.get(), convo]);
}
export function setConvo(convos: ConversationType[]) {
  $conversations.set(convos);
}

export const $convoId = atom(0)

export function setConvoId(id: number) {
  $convoId.set(id);
}

DEBUG && logger({ $user, $messages });
