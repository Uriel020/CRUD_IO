import { User } from "../types/user";
import UserRepository from "../repositories/user.repository";
import {
  CreateUserDTO,
  LoginUser,
  UpdateUserDTO,
} from "../schemas/user.schema";
import jwt from "jsonwebtoken";
import { Condition, handlePassword } from "../utils/handlePassword";
import HttpError from "../utils/HttpError";
import { HttpCode } from "../types/httpCode";
import { FindType } from "../types/findType";
import { validateUser } from "../utils/validateUser";
const { JWT_KEY } = process.env;

if (!JWT_KEY) {
  throw new Error("JWT_KEY is not defined in environment variables");
}

class UserService {
  constructor(private readonly userRepo = new UserRepository()) {}

  async registerUser(body: CreateUserDTO): Promise<User> {
    const { password, ...data } = body;
    const hashPassword = (await handlePassword(
      password,
      Condition.Hash
    )) as string;
    return this.userRepo.create({ password: hashPassword, ...data });
  }
  async login(body: LoginUser): Promise<string> {
    const { password, email } = body;

    const userFounded = await validateUser(email, FindType.email);
    if (!userFounded) {
      throw new HttpError(HttpCode.NotFound, "User doesn't exists");
    }

    const isUser = await handlePassword(
      password,
      Condition.Verify,
      userFounded.password
    );

    if (!isUser) {
      throw new HttpError(HttpCode.Unauthorized, "Invalid credentials");
    }

    const sessionToken = jwt.sign(
      { id: userFounded.idUser },
      JWT_KEY as string
    );

    return sessionToken;
  }

  //Still analyzing
  async getProfile(idUser: string): Promise<Partial<User>> {
    const user = await validateUser(idUser, FindType.id);
    const { active, password, ...data } = user;
    return data;
  }

  async modifyUser(idUser: string, body: UpdateUserDTO): Promise<User> {
    await validateUser(idUser, FindType.id);
    return this.userRepo.update(idUser, body);
  }

  async softDeleteUser(idUser: string): Promise<User> {
    await validateUser(idUser, FindType.id);
    return this.userRepo.softDelete(idUser);
  }
}
export default UserService;
