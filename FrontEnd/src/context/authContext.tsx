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
      const isUser = await login(body);

      if (isUser) return setIsAuthenticate(true);

      return setIsAuthenticate(false);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  };
  const findProfile = async (id: string) => {
    try {
      const data = await getProfile(id);
      if (data) return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
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
        findProfile,
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
