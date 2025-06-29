import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IAuthContext {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface IAuthProvider {
  children: ReactNode;
}
