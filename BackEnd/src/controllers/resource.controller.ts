import { Request, Response } from "express";
import ResourceService from "../services/resource.service";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
} from "../schemas/resource.schema";

class ResourceController {
  private readonly resourceService = new ResourceService();

  async handleGetResources(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(401).json({ error: "Invalid or missing user id" });
      }
      const resources = await this.resourceService.getResourcesOwnedByUser(id);
      return res.status(200).json(resources);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleCreateResource(req: Request, res: Response): Promise<any> {
    const body = req.body as CreateResourceDTO;
    try {
      const newResource = await this.resourceService.createResourceForUser(
        body
      );
      return res.status(201).json(newResource);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleUpdateResource(req: Request, res: Response): Promise<any> {
    const body = req.body as UpdateResourceDTO;
    try {
      const updatedResource = await this.resourceService.modifyResourceDetails(
        body
      );
      return res.status(200).json(updatedResource);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleDeleteResource(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      if (!id) {
        return res
          .status(401)
          .json({ error: "Invalid or missing resource id" });
      }
      const deletedResource = await this.resourceService.softDeleteResource(id);
      return res.status(200).json(deletedResource);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }
}

export default ResourceController;
