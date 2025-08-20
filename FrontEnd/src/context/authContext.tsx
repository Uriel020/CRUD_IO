import { createContext } from "react";
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
  const loginUser = async (body: LoginDTO) => {};
  const getProfile = async (id: string) => {};
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
