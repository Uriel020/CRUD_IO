import type { EndpointDTO } from "../DTOs/endpoint";
import axios from "./axiosConfig";

class EndpointClient {
  async getEndpoints(idResource: string): Promise<any> {
    try {
      const { data } = await axios.get(`endpoints/${idResource}`);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
  async createEndpoint(body: EndpointDTO): Promise<any> {
    try {
      await axios.post("endpoint", { body });
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
  async updateEndpoint(id: string, body: EndpointDTO): Promise<any> {
    try {
      await axios.put(`endpoint/:${id}`, { body });
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
  async deleteEndpoint(id: string): Promise<any> {
    try {
      await axios.delete(`endpoint/:${id}`);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { EndpointClient };
