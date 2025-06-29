import { createContext } from "react";
import { IAuthContext } from "../meta/types";

export const AuthContext = createContext<IAuthContext>({
  setUserData: () => {},
  userData: {
    email: "",
    id: "",
    name: "",
  },
});
