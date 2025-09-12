import type { LoginDTO } from "../DTOs/login";
import type { ProfileDTO } from "../DTOs/profile";
import type { RegisterDTO } from "../DTOs/register";
import axios from "./axiosConfig";

class AuthClient {
  async login(body: LoginDTO): Promise<boolean | string> {
    try {
      const { data } = await axios.post("login", body);
      localStorage.setItem("session", JSON.stringify(data));
      return data!!;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async register(body: RegisterDTO): Promise<void | string> {
    try {
      await axios.post("register", body);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getProfile(id: string): Promise<ProfileDTO | String> {
    try {
      const { data } = await axios.get(`profile/${id}`);
      return data as ProfileDTO;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async updateUser(
    id: string,
    body: Partial<RegisterDTO>
  ): Promise<void | string> {
    try {
      await axios.put(`user/${id}`, body);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteUser(id: string): Promise<void | string> {
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
