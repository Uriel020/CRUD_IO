import type { LoginDTO } from "../DTOs/login";
import type { RegisterDTO } from "../DTOs/register";
import axios from "./axiosConfig";

class AuthClient {
  async login(body: LoginDTO): Promise<any> {
    try {
      const { data } = await axios.post("login", { body });
      localStorage.setItem("session", data);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async register(body: RegisterDTO): Promise<any> {
    try {
      await axios.post("register", { body });
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getProfile(id: string) {
    try {
      await axios.get(`profile/:${id}`);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async updateUser(id: string, body: Partial<RegisterDTO>) {
    try {
      await axios.put(`user/:${id}`, { body });
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteUser(id: string) {
    try {
      await axios.delete(`user/:${id}`);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  logout(): void {
    localStorage.removeItem("session");
  }
}

export { AuthClient };
