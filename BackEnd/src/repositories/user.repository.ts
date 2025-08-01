import { db } from "../db/prismaClient";
import { User } from "../types/user";
import { CreateUserDTO, UpdateUserDTO } from "../schemas/user.schema";

class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({ where: { email, active: true } });
  }
  async findById(idUser: string): Promise<User | null> {
    return db.user.findUnique({ where: { idUser, active: true } });
  }
  async create(body: CreateUserDTO): Promise<User> {
    return db.user.create({ data: body });
  }
  async update(idUser: string, body: UpdateUserDTO): Promise<User> {
    return db.user.update({ where: { idUser }, data: { ...body } });
  }
  async softDelete(idUser: string): Promise<User> {
    return db.user.update({ data: { active: false }, where: { idUser } });
  }
}

export default UserRepository;
