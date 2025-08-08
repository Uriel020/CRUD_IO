import { z } from "zod";

const userSchema = z.object({
  id: z
    .string({ required_error: "User is required" })
    .uuid({ message: "Must be a valid UUID" }),
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(12, { message: "Password must have at least 12 characters" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email({ message: "Insert a valid email" }),
});

const createUser = userSchema.omit({ id: true });
const updateUser = userSchema.partial().omit({ id: true });
const loginUser = userSchema.omit({ username: true, id: true });
const userParams = userSchema.pick({ id: true });

type CreateUserDTO = z.infer<typeof createUser>;
type UpdateUserDTO = z.infer<typeof updateUser>;
type UserParamsDTO = z.infer<typeof userParams>;
type LoginUser = z.infer<typeof loginUser>;

export {
  createUser,
  updateUser,
  loginUser,
  userParams,
  CreateUserDTO,
  UpdateUserDTO,
  LoginUser,
  UserParamsDTO,
};

export default userSchema;
