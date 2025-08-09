import { Request, Response } from "express";
import EndpointService from "../services/endpoint.service";
import { handleHttpError } from "../utils/handleHttpError";
import { EndpointParamsDTO } from "../schemas/endpoint.schema";
import { HttpCode } from "../types/httpCode";

class EndpointController {
  private readonly endpointService = new EndpointService();

  async handleGetEndpoint(req: Request, res: Response): Promise<any> {
    const { id } = req.params as EndpointParamsDTO;
    try {
      if (!id) {
        return handleHttpError(res, "Invalid or missing endpoint id");
      }
      const endpoint = await this.endpointService.getEndpoint(
        id
      );
      res.status(HttpCode.Accepted).json(endpoint);
    } catch (error) {
      handleHttpError(res, error);
    }
  }
  async handleCreateEndpoint (req: Request, res: Response):Promise<any>{
    
  }
}

export default EndpointController;
