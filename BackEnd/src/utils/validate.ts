import EndpointRepository from "../repositories/endpoint.repository";
import ResourceRepository from "../repositories/resource.repository";
import { FindType } from "../types/findType";
import { HttpCode } from "../types/httpCode";
import HttpError from "./HttpError";

const endpointRepo = new EndpointRepository();
const resourceRepo = new ResourceRepository();

async function validate(id: string, type: FindType): Promise<void> {
  let objectExists;
  switch (type) {
    case FindType.endpoint:
      objectExists = await endpointRepo.findById(id);
      if (!objectExists)
        throw new HttpError(
          HttpCode.NotFound,
          "Invalid or missing endpoint ID"
        );
      break;
    case FindType.resource:
      objectExists = await resourceRepo.findById(id);
      if (!objectExists)
        throw new HttpError(
          HttpCode.NotFound,
          "Invalid or missing resource ID"
        );
      break;
  }
}

export default { validate };
