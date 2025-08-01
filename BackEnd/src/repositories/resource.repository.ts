import { db } from "../db/prismaClient";
import { Resource } from "../types/resource";
import {
  CreateResourceDTO,
  UpdateResourceDTO,
} from "../schemas/resource.schema";

class ResourceRepository {
  async findAllByUser(idUser: string): Promise<Resource[]> {
    return db.resource.findMany({ where: { idUser, active: true } });
  }
  async findById(idResource: string): Promise<Resource | null> {
    return db.resource.findUnique({ where: { idResource } });
  }
  async create(body: CreateResourceDTO): Promise<Resource> {
    return db.resource.create({
      data: {
        ...body,
      },
    });
  }
  async update(idResource: string, body: UpdateResourceDTO): Promise<Resource> {
    return db.resource.update({
      where: {idResource },
      data: {
        ...body,
      },
    });
  }
  async softDelete(idResource: string): Promise<Resource> {
    return db.resource.update({
      data: { active: false },
      where: { idResource },
    });
  }
  async delete(idResource: string): Promise<Resource> {
    return db.resource.delete({ where: { idResource } });
  }
}

export default ResourceRepository;
