import { Request, Response } from "express";
import EndpointService from "../services/endpoint.service";
import { handleHttpError } from "../utils/handleHttpError";
import {
  CreateEndpointDTO,
  EndpointParamsDTO,
  UpdateEndpointDTO,
} from "../schemas/endpoint.schema";
import { HttpCode } from "../types/httpCode";

class EndpointController {
  private readonly endpointService = new EndpointService();

  handleGetEndpoint = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params as EndpointParamsDTO;
    try {
      if (!id) {
        return handleHttpError(res, "Invalid or missing endpoint id");
      }
      const endpoint = await this.endpointService.getEndpoint(id);
      res.status(HttpCode.Accepted).json(endpoint);
    } catch (error) {
      handleHttpError(res, error);
    }
  };
  handleCreateEndpoint = async (req: Request, res: Response): Promise<any> => {
    const body = req.body as CreateEndpointDTO;

    try {
      await this.endpointService.createEndpoint(body);
      return res.status(HttpCode.Created);
    } catch (error) {
      handleHttpError(res, error);
    }
  };
  handleUpdateEndpoint = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params as EndpointParamsDTO;
    const body = req.body as UpdateEndpointDTO;
    try {
      await this.endpointService.modifyEndpoint(id, body);
      return res.status(HttpCode.Ok);
    } catch (error) {
      handleHttpError(res, error);
    }
  };
  handleDeleteEndpoint = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params as EndpointParamsDTO;
    try {
      await this.endpointService.deleteEndpoint(id);
      return res.status(HttpCode.Ok);
    } catch (error) {
      handleHttpError(res, error);
    }
  };
}

export default EndpointController;
