import { Resource } from "../types/resource";
import {ErrorCode} from '../types/error-code';
import ResourceRepository from "../repositories/resource.repository";
import UserRepository from "../repositories/user.repository";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
} from "../schemas/resource.schema";
import HttpError from "../utils/HttpError";

class ResourceService {
  constructor(
    private readonly resourceRepo = new ResourceRepository(),
    private readonly userRepo = new UserRepository()
  ) {}

  async getResourcesOwnedByUser(idUser: string): Promise<Resource[]> {
    await this.validateUser(idUser);

    return this.resourceRepo.findAllByUser(idUser);
  }

  async createResourceForUser(body: CreateResourceDTO): Promise<Resource> {
    await this.validateUser(body.idUser);

    return this.resourceRepo.create(body);
  }

  async modifyResourceDetails(body: UpdateResourceDTO): Promise<Resource> {
    const { idResource } = body;
    await this.validateResource(idResource);
    return this.resourceRepo.update(body);
  }

  async softDeleteResource(idResource: string): Promise<Resource> {
    await this.validateResource(idResource);
    return this.resourceRepo.delete(idResource);
  }

  private async validateUser(idUser: string): Promise<void> {
    const isUser = await this.userRepo.findById(idUser);
    if (!isUser)
      throw new HttpError(ErrorCode.NotFound, "Invalid or missing user ID");
  }

  private async validateResource(idResource: string): Promise<void> {
    const resourceExists = await this.resourceRepo.findById(idResource);
    if (!resourceExists)
      throw new HttpError(ErrorCode.NotFound, "Resource doesn't exist");
  }
}

export default ResourceService;
