import { Request, Response } from "express";
import ResourceService from "../services/resource.service";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
} from "../schemas/resource.schema";
import { handleHttpError } from "../utils/handleHttpError";
import { ErrorCode } from "../types/error-code";

class ResourceController {
  private readonly resourceService = new ResourceService();

  async handleGetResources(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(ErrorCode.NotFound).json({ error: "Invalid or missing user id" });
      }
      const resources = await this.resourceService.getResourcesOwnedByUser(id);
      return res.status(ErrorCode.Ok).json(resources);
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async handleCreateResource(req: Request, res: Response): Promise<any> {
    const body = req.body as CreateResourceDTO;
    try {
      const newResource = await this.resourceService.createResourceForUser(
        body
      );
      return res.status(ErrorCode.Created).json(newResource);
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async handleUpdateResource(req: Request, res: Response): Promise<any> {
    const body = req.body as UpdateResourceDTO;
    try {
      const updatedResource = await this.resourceService.modifyResourceDetails(
        body
      );
      return res.status(ErrorCode.Ok).json(updatedResource);
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async handleDeleteResource(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      if (!id) {
        return res
          .status(ErrorCode.NotFound)
          .json({ error: "Invalid or missing resource id" });
      }
      const deletedResource = await this.resourceService.softDeleteResource(id);
      return res.status(ErrorCode.Ok).json(deletedResource);
    } catch (error) {
      handleHttpError(res, error);
    }
  }
}

export default ResourceController;
