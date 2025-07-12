import { IUser } from "../interfaces/IUser";
import UserRepository from "../repositories/user.repository";
import { CreateUserDTO } from "../schemas/user.schema";
import jwt from 'jsonwebtoken';

enum Condition {
  Hash = "hash",
  Verify = "verify",
}

class UserService {
  constructor(private readonly userRepo = new UserRepository()) {}

  async registerUser(body: CreateUserDTO): Promise<IUser> {
    const { password, ...data } = body;
    const hashPassword = (await this.handlePassword(
      password,
      Condition.Hash
    )) as string;
    const newUser = this.userRepo.create({ password: hashPassword, ...data });
    return newUser;
  }
  async login(body: Partial<IUser>): Promise<void> {

  }
  async logout(body: Partial<IUser>): Promise<void> {}
  async softDeleteUser(idUser: string): Promise<void> {}

  async validateExistUser(email: string): Promise<boolean> {
    const exist = await this.userRepo.findByEmail(email);
    return !!exist;
  }

  async handlePassword(
    receivedPassword: string,
    condition: Condition,
    userPassword?: string
  ): Promise<string | boolean> {
    if (condition !== Condition.Verify) {
      const hashedPassword = Bun.password.hashSync(receivedPassword);
      return hashedPassword;
    }

    if (!userPassword) {
      throw new Error("User password to compare is required");
    }

    const isUser = Bun.password.verifySync(receivedPassword, userPassword);
    return isUser;
  }
}

export default UserService;
