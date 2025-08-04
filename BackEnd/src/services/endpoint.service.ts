import EndpointRepository from "../repositories/endpoint.repository";
import { Endpoint } from "../types/endpoint";

class EndpointService {
  constructor(private readonly endpointRepo = new EndpointRepository()) {}

  async getEndpointOwnedByResource(idResource: string): Promise<Endpoint | null> {
    return this.endpointRepo.findById(idResource);
  }

  private async validateEndpoint (){
    
  }
}
