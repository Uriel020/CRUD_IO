import type { ResourceDTO } from "../DTOs/resource";
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
  async createResource(body: ResourceDTO): Promise<any> {
    const { status } = await axios.post("resource", { body });
  }
}

export { ResourceClient };
