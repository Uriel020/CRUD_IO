import { createContext, useState } from "react";
import { AuthClient } from "../api/authClient";
import type { LoginDTO } from "../DTOs/login";
import type { RegisterDTO } from "../DTOs/register";

const { login, deleteUser, register, getProfile, updateUser, logout } =
  new AuthClient();

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);

  const loginUser = async (body: LoginDTO) => {
    try {
      await login(body);
      setIsAuthenticate(true);
    } catch (error) {}
  };
  const getProfile = async (id: string) => {
    try {
    } catch (error) {}
  };
  const registerUser = async (body: RegisterDTO) => {};
  const updateUser = async (id: string, body: Partial<RegisterDTO>) => {};
  const deleteUser = async (id: string) => {};
  const logoutUser = () => {
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        getProfile,
        registerUser,
        updateUser,
        deleteUser,
        logoutUser,
        isAuthenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
