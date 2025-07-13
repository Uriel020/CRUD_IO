import { z } from "zod";

const userSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(12, { message: "Password must be have 12 characters" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Insert a valid email" }),
});

const updateUserDTO = userSchema.partial().extend({
  idUser: z
    .string({ required_error: "User is required" })
    .uuid({ message: "Must be a valid UUID" }),
});

const loginUser = userSchema.omit({ username: true });

type CreateUserDTO = z.infer<typeof userSchema>;
type UpdateUserDTO = z.infer<typeof updateUserDTO>;
type LoginUser = z.infer<typeof loginUser>;

export { CreateUserDTO, UpdateUserDTO, LoginUser };

export default userSchema;
