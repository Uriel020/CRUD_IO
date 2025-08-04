import { db } from "../db/prismaClient";
import {
  CreateEndpointDTO,
  UpdateEndpointDTO,
} from "../schemas/enpoint.schema";
import { Endpoint } from "../types/enpoint";

class EndpointRepository {
  async findById(idEndpoint: string): Promise<Endpoint | null> {
    return db.endpoint.findUnique({ where: { idEndpoint } });
  }
  async create(body: CreateEndpointDTO): Promise<Endpoint> {
    return db.endpoint.create({ data: body });
  }

  async update(idEndpoint: string, body: UpdateEndpointDTO) {
    return db.endpoint.update({ where: { idEndpoint }, data: body });
  }

  async delete(idEndpoint: string): Promise<Endpoint> {
    return db.endpoint.delete({ where: { idEndpoint } });
  }
}

export default EndpointRepository;
