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
    try {
      const { status } = await axios.post("resource", { body });
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
  async updateResource(id: string, body: ResourceDTO): Promise<any> {
    try {
      const { status } = await axios.put(`resource/:${id}`, { body });
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
  async deleteResource(id: string): Promise<any> {
    try {
      const { status } = await axios.delete(`resource/:${id}`);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { ResourceClient };
