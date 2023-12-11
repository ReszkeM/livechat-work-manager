import { createContext } from "react";

import { Authorization } from "./types";

export const AuthorizationContext = createContext<Authorization>(
  {} as Authorization
);
