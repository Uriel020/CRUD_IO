import { Request, Response } from "express";
import EndpointService from "../services/endpoint.service";
import { handleHttpError } from "../utils/handleHttpError";
import { EndpointParamsDTO } from "../schemas/endpoint.schema";

class EndpointController {
  private readonly endpointService = new EndpointService();

  async handleGetEndpoint(req: Request, res: Response): Promise<any> {
    const {id} = req.params as EndpointParamsDTO;
    try {
      if(!id){
        return handleHttpError(res, "Invalid or missing endpoint id")
      }
      const endpoint = await this.endpointService.getEndpointOwnedByResource()
    } catch (error) {
      handleHttpError(res, error);
    }
  }
}

export default EndpointController;
