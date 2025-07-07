import { z } from "zod";

const jsonSchema: z.ZodType<unknown> = z.lazy(() => {
  return z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonSchema),
    z.record(z.string(), jsonSchema),
  ]);
});

const formSchema = z.object({
  idUser: z
    .string({
      required_error: "User is required",
    })
    .uuid({ message: "Must be a valid UUID" }),
  title: z.string({
    required_error: "Title is required",
  }),
  endpoint: z.string({
    required_error: "Endpoint is required",
  }),
  inputs: z.array(jsonSchema, { required_error: "Inputs are required" }),
});

const updateFormDTO = formSchema.partial().extend({
  idForm: z
    .string({ required_error: "Form is required" })
    .uuid({ message: "Must be a valid UUID" }),
});

export type CreateUserDTO = z.infer<typeof formSchema>;
export type UpdateUserDTO = z.infer<typeof updateFormDTO>;

export default formSchema;
