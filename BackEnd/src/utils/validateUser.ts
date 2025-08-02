import UserRepository from "../repositories/user.repository";
import { FindType } from "../types/findType";
import { User } from "../types/user";
import { HttpCode } from "../types/httpCode";
import HttpError from "./HttpError";

const userRepo = new UserRepository();

async function validateUser(data: string, type: FindType): Promise<User> {
  let userFounded;
  switch (type) {
    case FindType.id:
      userFounded = await userRepo.findById(data);
      break;
    case FindType.email:
      userFounded = await userRepo.findByEmail(data);
      break;
  }
  if (userFounded) return userFounded;

  throw new HttpError(HttpCode.NotFound, "Invalid or missing user ID");
}

export { validateUser };
