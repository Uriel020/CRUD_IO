import UserRepository from "../repositories/user.repository";
import { FindUserType } from "../types/findUserType";
import { User } from "../types/user";
import { HttpCode } from "../types/httpCode";
import HttpError from "./HttpError";

const userRepo = new UserRepository();

async function validateUser(data: string, type: FindUserType): Promise<User> {
  let userFounded;
  switch (type) {
    case FindUserType.id:
      userFounded = await userRepo.findById(data);
      break;
    case FindUserType.email:
      userFounded = await userRepo.findByEmail(data);
      break;
  }
  if (userFounded) return userFounded;

  throw new HttpError(HttpCode.NotFound, "Invalid or missing user ID");
}

export { validateUser };
