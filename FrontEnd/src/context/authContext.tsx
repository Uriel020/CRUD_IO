import { createContext } from "react";
import { AuthClient } from "../api/authClient";
import type { LoginDTO } from "../DTOs/login";

const { login, deleteUser, register, getProfile, updateUser, logout } =
  new AuthClient();

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const loginUser = async (body: LoginDTO) => {
    await login(body);
  };
  const logoutUser = () => {
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
