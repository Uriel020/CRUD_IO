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
import { ErrorCode } from "../types/error-code";
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

    const userFounded = await this.userRepo.findByEmail(email);
    if (!userFounded) {
      throw new HttpError(ErrorCode.NotFound, "User doesn't exists");
    }

    const isUser = await handlePassword(
      password,
      Condition.Verify,
      userFounded.password
    );

    if (!isUser) {
      throw new HttpError(ErrorCode.Unauthorized, "Invalid credentials");
    }

    const sessionToken = jwt.sign(
      { id: userFounded.idUser },
      JWT_KEY as string
    );

    return sessionToken;
  }

  async modifyUser(body: UpdateUserDTO): Promise<User> {
    return this.userRepo.update(body);
  }

  async softDeleteUser(idUser: string): Promise<User> {
    return this.userRepo.softDelete(idUser);
  }

  async userExists(email: string): Promise<boolean> {
    const exist = await this.userRepo.findByEmail(email);
    return !!exist;
  }
}

export default UserService;
