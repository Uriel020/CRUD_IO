import EndpointRepository from "../repositories/endpoint.repository";
import {
  CreateEndpointDTO,
  UpdateEndpointDTO,
} from "../schemas/endpoint.schema";
import { Endpoint } from "../types/endpoint";
import { FindType } from "../types/findType";
import { validate } from "../utils/validate";

class EndpointService {
  constructor(private readonly endpointRepo = new EndpointRepository()) {}

  async getEndpoint(idEndpoint: string): Promise<Endpoint | null> {
    await validate(idEndpoint, FindType.endpoint);
    return this.endpointRepo.findById(idEndpoint);
  }
  async createEndpoint(body: CreateEndpointDTO): Promise<Endpoint> {
    return this.endpointRepo.create(body);
  }
  async modifyEndpoint(
    idEndpoint: string,
    body: UpdateEndpointDTO
  ): Promise<Endpoint> {
    await validate(idEndpoint, FindType.endpoint);
    return this.endpointRepo.update(idEndpoint, body);
  }
  async deleteEndpoint(idEndpoint: string): Promise<Endpoint> {
    await validate(idEndpoint, FindType.endpoint);
    return this.endpointRepo.delete(idEndpoint);
  }
}

export default EndpointService;
