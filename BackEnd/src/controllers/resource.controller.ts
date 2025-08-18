import { Request, Response } from "express";
import ResourceService from "../services/resource.service";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
  ParamsResourceDTO,
} from "../schemas/resource.schema";
import { handleHttpError } from "../utils/handleHttpError";
import { HttpCode } from "../types/httpCode";
import { UserParamsDTO } from "../schemas/user.schema";

class ResourceController {
  private readonly resourceService = new ResourceService();

  handleGetResources = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params as UserParamsDTO;
    try {
      if (!id) {
        return handleHttpError(res, "Invalid or missing resource id");
      }
      const resources = await this.resourceService.getResourcesOwnedByUser(id);
      return res.status(HttpCode.Ok).json(resources);
    } catch (error) {
      return handleHttpError(res, error);
    }
  };

  handleCreateResource = async (req: Request, res: Response): Promise<any> => {
    const body = req.body as CreateResourceDTO;
    try {
      const newResource = await this.resourceService.createResourceForUser(
        body
      );
      return res.status(HttpCode.Created).json(newResource.title);
    } catch (error) {
      return handleHttpError(res, error);
    }
  };

  handleUpdateResource = async (req: Request, res: Response): Promise<any> => {
    const body = req.body as UpdateResourceDTO;
    const { id } = req.params as ParamsResourceDTO;
    try {
      if (!id) {
        return handleHttpError(res, "Invalid or missing resource id");
      }
      await this.resourceService.modifyResourceDetails(id, body);
      return res.status(HttpCode.Ok).json(`${body.title} is updated`);
    } catch (error) {
      return handleHttpError(res, error);
    }
  };

  handleSoftDeleteResource = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { id } = req.params as ParamsResourceDTO;
    try {
      if (!id) {
        return handleHttpError(res, "Invalid or missing resource id");
      }
      await this.resourceService.softDeleteResource(id);
      return res.status(HttpCode.Ok);
    } catch (error) {
      return handleHttpError(res, error);
    }
  };
}

export default ResourceController;
