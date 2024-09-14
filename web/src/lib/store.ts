import { atom } from "nanostores";
import { persistentMap } from "@nanostores/persistent";
import type { UserType } from "@/data/types";
import { logger } from "@nanostores/logger";

const DEBUG = true;

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


DEBUG && logger({ $user });