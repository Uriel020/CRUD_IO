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

  async handleGetResources(req: Request, res: Response): Promise<any> {
    const { idUser } = req.params as UserParamsDTO;
    try {
      if (!idUser) {
        return handleHttpError(res, "Invalid or missing resource id");
      }
      const resources = await this.resourceService.getResourcesOwnedByUser(idUser);
      return res.status(HttpCode.Ok).json(resources);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }

  async handleCreateResource(req: Request, res: Response): Promise<any> {
    const body = req.body as CreateResourceDTO;
    try {
      const newResource = await this.resourceService.createResourceForUser(
        body
      );
      return res.status(HttpCode.Created).json(newResource);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }

  async handleUpdateResource(req: Request, res: Response): Promise<any> {
    const body = req.body as UpdateResourceDTO;
    const { idResource } = req.params as ParamsResourceDTO;
    try {
      if (!idResource) {
        return handleHttpError(res, "Invalid or missing resource id");
      }
      const updatedResource = await this.resourceService.modifyResourceDetails(
        idResource,
        body
      );
      return res.status(HttpCode.Ok).json(updatedResource);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }

  async handleSoftDeleteResource(req: Request, res: Response): Promise<any> {
    const { idResource } = req.params as ParamsResourceDTO;
    try {
      if (!idResource) {
        return handleHttpError(res, "Invalid or missing resource id");
      }
      const deletedResource = await this.resourceService.softDeleteResource(idResource);
      return res.status(HttpCode.Ok).json(deletedResource);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }
}

export default ResourceController;
