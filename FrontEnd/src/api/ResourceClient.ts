import type { Resource } from "../types/resource";
import axios from "./axiosConfig";

class ResourceClient {
  async getResources(idUser: string): Promise<any> {
    try {
      const { data, status } = await axios.get(`resources/${idUser}`);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { ResourceClient };
