import { db } from "../db/prismaClient";
import { IUser } from "../types/user";
import { CreateUserDTO, UpdateUserDTO } from "../schemas/user.schema";

class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return db.user.findUnique({ where: { email, active: true } });
  }
  async findById(idUser: string): Promise<IUser | null> {
    return db.user.findUnique({ where: { idUser, active: true } });
  }
  async create(body: CreateUserDTO): Promise<IUser> {
    return db.user.create({ data: body });
  }
  async update(body: UpdateUserDTO): Promise<IUser> {
    const { idUser, ...data } = body;
    return db.user.update({ where: { idUser }, data });
  }
  async delete(idUser: string): Promise<IUser> {
    return db.user.update({ data: { active: false }, where: { idUser } });
  }
}

export default UserRepository;
