import { z } from "zod";

const userSchema = z.object({
  idUser: z
    .string({ required_error: "User is required" })
    .uuid({ message: "Must be a valid UUID" }),
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

const createUser = userSchema.omit({ idUser: true });
const updateUser = userSchema.partial();
const loginUser = userSchema.omit({ username: true });
const usersParams = userSchema.pick({ idUser: true });

type CreateUserDTO = z.infer<typeof createUser>;
type UpdateUserDTO = z.infer<typeof updateUser>;
type UserParamsDTO = z.infer<typeof usersParams>;
type LoginUser = z.infer<typeof loginUser>;

export { CreateUserDTO, UpdateUserDTO, LoginUser, UserParamsDTO };

export default userSchema;
