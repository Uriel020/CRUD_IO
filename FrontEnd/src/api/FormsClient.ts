import axios from "./axiosConfig";

class FormClient {
  static async getForms(): Promise<any> {
    try {
      const { data, status } = await axios.get("/forms");
      if (status !== 200) {
        throw new Error("Bad Request");
      }
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }
  static async createForm(
    title: string,
    description: string,
    inputs: JSON
  ): Promise<any> {
    try {
      const { status } = await axios.post("/form", {
        title,
        description,
        inputs,
      });
      if (status !== 201) {
        throw new Error("Bad Request");
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  static async updateForm(
    id: string,
    title: string,
    description: string,
    inputs: JSON
  ): Promise<any> {
    try {
      const { status } = await axios.put(`/form:${id}`, {
        title,
        description,
        inputs,
      });
      if (status !== 200) {
        throw new Error("Bad Request");
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  static async deleteForm(id: string): Promise<any> {
    try {
      const { status } = await axios.delete(`/form:${id}`);
      if (status !== 200) {
        throw new Error("Bad Request");
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }
}

export default FormClient;
