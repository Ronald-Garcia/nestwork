import { BASE_URL } from "@/env";
import { logger } from "@nanostores/logger";
import { createRouter } from "@nanostores/router";

export const $router = createRouter({
  home: `${BASE_URL}`, 
  login: `${BASE_URL}login`, // login page
  register: `${BASE_URL}register`, // register page
  onboard: `${BASE_URL}setup`, // register page
});

logger({ $router });