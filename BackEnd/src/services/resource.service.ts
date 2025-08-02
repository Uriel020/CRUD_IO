import { Resource } from "../types/resource";
import { HttpCode } from "../types/httpCode";
import ResourceRepository from "../repositories/resource.repository";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
} from "../schemas/resource.schema";
import HttpError from "../utils/HttpError";
import { validateUser } from "../utils/validateUser";
import { FindType } from "../types/findType";

class ResourceService {
  constructor(private readonly resourceRepo = new ResourceRepository()) {}

  async getResourcesOwnedByUser(idUser: string): Promise<Resource[]> {
    await validateUser(idUser, FindType.id);
    return this.resourceRepo.findAllByUser(idUser);
  }

  async createResourceForUser(body: CreateResourceDTO): Promise<Resource> {
    await validateUser(body.idUser, FindType.id);
    return this.resourceRepo.create(body);
  }

  async modifyResourceDetails(
    idResource: string,
    body: UpdateResourceDTO
  ): Promise<Resource> {
    await this.validateResource(idResource);
    return this.resourceRepo.update(idResource, body);
  }

  async softDeleteResource(idResource: string): Promise<Resource> {
    await this.validateResource(idResource);
    return this.resourceRepo.softDelete(idResource);
  }

  async deleteResource(idResource: string): Promise<Resource> {
    await this.validateResource(idResource);
    return this.resourceRepo.delete(idResource);
  }

  private async validateResource(idResource: string): Promise<void> {
    const resourceExists = await this.resourceRepo.findById(idResource);
    if (!resourceExists)
      throw new HttpError(HttpCode.NotFound, "Invalid or missing resource ID");
  }
}

export default ResourceService;
