import { z } from "zod";

const resourceSchema = z.object({
  idResource: z
    .string({ required_error: "Resource are required" })
    .uuid({ message: "Must be a valid UUID" }),
  title: z.string({ required_error: "" }),
  idEndpoint: z
    .string({ required_error: "Endpoints are required" })
    .uuid({ message: "Must be a valid UUID" }),
  idUser: z
    .string({
      required_error: "User is required",
    })
    .uuid({ message: "Must be a valid UUID" }),
});

const createResource = resourceSchema.omit({ idResource: true });
const updateResource = resourceSchema.partial();
const resourceParams = resourceSchema.pick({ idResource: true });

type CreateResourceDTO = z.infer<typeof createResource>;
type UpdateResourceDTO = z.infer<typeof updateResource>;
type ParamsResourceDTO = z.infer<typeof resourceParams>;

export { UpdateResourceDTO, CreateResourceDTO, ParamsResourceDTO };

export default resourceSchema;
