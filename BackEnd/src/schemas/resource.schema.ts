import { z } from "zod";

const resourceSchema = z.object({
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

const updateResource = resourceSchema.partial().extend({
  idResource: z
    .string({ required_error: "Resource are required" })
    .uuid({ message: "Must be a valid UUID" }),
}); 

export type CreateResourceDTO = z.infer<typeof resourceSchema>;
export type UpdateResourceDTO = z.infer<typeof updateResource>;

export default resourceSchema;
