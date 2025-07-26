import { IResource } from "../interfaces/IResource";
import ResourceRepository from "../repositories/resource.repository";
import UserRepository from "../repositories/user.repository";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
} from "../schemas/resource.schema";
import HttpError, { ErrorCode } from "../utils/HttpError";

class ResourceService {
  constructor(
    private readonly resourceRepo = new ResourceRepository(),
    private readonly userRepo = new UserRepository()
  ) {}

  async getResourcesOwnedByUser(idUser: string): Promise<IResource[]> {
    await this.validateUser(idUser);

    return this.resourceRepo.findAllByUser(idUser);
  }

  async createResourceForUser(body: CreateResourceDTO): Promise<IResource> {
    await this.validateUser(body.idUser);

    return this.resourceRepo.create(body);
  }

  async modifyResourceDetails(body: UpdateResourceDTO): Promise<IResource> {
    const { idResource } = body;
    await this.validateResource(idResource);
    return this.resourceRepo.update(body);
  }

  async softDeleteResource(idResource: string): Promise<IResource> {
    await this.validateResource(idResource);
    return this.resourceRepo.delete(idResource);
  }

  private async validateUser(idUser: string): Promise<void> {
    const isUser = await this.userRepo.findById(idUser);
    if (!isUser)
      throw new HttpError(ErrorCode.Unauthorized, "Invalid or missing user ID");
  }

  private async validateResource(idResource: string): Promise<void> {
    const resourceExists = await this.resourceRepo.findById(idResource);
    if (!resourceExists)
      throw new HttpError(ErrorCode.NotFound, "Resource doesn't exists");
  }
}

export default ResourceService;
