import EndpointRepository from "../repositories/endpoint.repository";
import { Endpoint } from "../types/endpoint";
import { FindType } from "../types/findType";
import { validate } from "../utils/validate";

class EndpointService {
  constructor(private readonly endpointRepo = new EndpointRepository()) {}

  async getEndpointOwnedByResource(
    idResource: string
  ): Promise<Endpoint | null> {
    await validate(idResource, FindType.endpoint);
    return this.endpointRepo.findById(idResource);
  }
}

export default EndpointService;
