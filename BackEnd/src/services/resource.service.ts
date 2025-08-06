import { Resource } from "../types/resource";
import ResourceRepository from "../repositories/resource.repository";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
} from "../schemas/resource.schema";
import { validateUser } from "../utils/validateUser";
import { validate } from "../utils/validate";
import { FindType } from "../types/findType";
import { FindUserType } from "../types/findUserType";

class ResourceService {
  constructor(private readonly resourceRepo = new ResourceRepository()) {}

  async getResourcesOwnedByUser(idUser: string): Promise<Resource[]> {
    await validateUser(idUser, FindUserType.id);
    return this.resourceRepo.findAllByUser(idUser);
  }

  async createResourceForUser(body: CreateResourceDTO): Promise<Resource> {
    await validateUser(body.idUser, FindUserType.id);
    return this.resourceRepo.create(body);
  }

  async modifyResourceDetails(
    idResource: string,
    body: UpdateResourceDTO
  ): Promise<Resource> {
    await validate(idResource, FindType.resource);
    return this.resourceRepo.update(idResource, body);
  }

  async softDeleteResource(idResource: string): Promise<Resource> {
    await validate(idResource, FindType.resource);
    return this.resourceRepo.softDelete(idResource);
  }

  async deleteResource(idResource: string): Promise<Resource> {
    await validate(idResource, FindType.resource);
    return this.resourceRepo.delete(idResource);
  }
}

export default ResourceService;
