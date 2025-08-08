import { z } from "zod";

const endpointSchema = z.object({
  id: z
    .string({ required_error: "Endpoint is required" })
    .uuid({ message: "Must be a valid UUID" }),
  create: z.string({ required_error: "Create method is required" }),
  update: z.string({ required_error: "Update method is required" }),
  find: z.string({ required_error: "Find method is required" }),
  softDelete: z.string({ required_error: "SoftDelete method is required" }),
  delete: z.string({ required_error: "Delete method is required" }),
});

const createEndpoint = endpointSchema.omit({ id: true });
const updateEndpoint = endpointSchema.partial().omit({ id: true });
const endpointParams = endpointSchema.pick({ id: true });

type CreateEndpointDTO = z.infer<typeof createEndpoint>;
type UpdateEndpointDTO = z.infer<typeof updateEndpoint>;
type EndpointParamsDTO = z.infer<typeof endpointParams>;

export {
  createEndpoint,
  updateEndpoint,
  endpointParams,
  CreateEndpointDTO,
  UpdateEndpointDTO,
  EndpointParamsDTO,
};

export default endpointSchema;
