import { db } from "../db/prismaClient";
import { IResource } from "../interfaces/IResource";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
} from "../schemas/resource.schema";

class ResourceRepository {
  async findAllByUser(idUser: string): Promise<IResource[]> {
    return db.resource.findMany({ where: { idUser, active: true } });
  }
  async findById(idResource: string): Promise<IResource | null> {
    return db.resource.findUnique({ where: { idResource } });
  }
  async create(body: CreateResourceDTO): Promise<IResource> {
    return db.resource.create({
      data: {
        ...body,
      },
    });
  }
  async update(body: UpdateResourceDTO): Promise<IResource> {
    const { idResource, ...data } = body;
    return db.resource.update({
      where: { idResource },
      data: {
        ...data,
      },
    });
  }
  async delete(idResource: string): Promise<IResource> {
    return db.resource.update({
      data: { active: false },
      where: { idResource },
    });
  }
}

export default ResourceRepository;
