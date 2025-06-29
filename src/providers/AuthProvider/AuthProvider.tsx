"use client";

import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { IAuthProvider, UserData } from "./meta/types";

const AuthProvider = ({ children }: IAuthProvider) => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    id: "",
    name: "",
  });
  return (
    <AuthContext.Provider value={{ setUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthProvider;
