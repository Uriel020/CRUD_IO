import { z } from "zod";

const resourceSchema = z.object({
  id: z
    .string({ required_error: "Resource are required" })
    .uuid({ message: "Must be a valid UUID" }),
  title: z.string({ required_error: "" }),
  idEndpoint: z
    .string({ required_error: "Endpoints are required" })
    .uuid({ message: "Must be a valid UUID" })
    .trim(),
  idUser: z
    .string({
      required_error: "User is required",
    })
    .uuid({ message: "Must be a valid UUID" }),
});

const createResource = resourceSchema.omit({ id: true });
const updateResource = resourceSchema.partial().omit({ id: true });
const resourceParams = resourceSchema.pick({ id: true });

type CreateResourceDTO = z.infer<typeof createResource>;
type UpdateResourceDTO = z.infer<typeof updateResource>;
type ParamsResourceDTO = z.infer<typeof resourceParams>;

export {
  createResource,
  updateResource,
  resourceParams,
  UpdateResourceDTO,
  CreateResourceDTO,
  ParamsResourceDTO,
};

export default resourceSchema;
