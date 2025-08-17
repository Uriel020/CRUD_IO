import type { LoginDTO } from "../DTOs/login";
import axios from "./axiosConfig";

class AuthClient {
  async login(body: LoginDTO): Promise<any> {
    try {
      const { data } = await axios.post("login", { body });
      localStorage.setItem("session", data);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown Error";
    }
  }

  static logout(): void {
    localStorage.removeItem("session");
  }
}

export { AuthClient };
