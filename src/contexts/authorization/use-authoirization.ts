import { useContext } from "react";

import { AuthorizationContext } from "./context";
import { Authorization } from "./types";

export const useAuthorization = (): Authorization => {
  const context = useContext(AuthorizationContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};
