import { db } from "../db/prismaClient";
import { IUser } from "../interfaces/IUser";

class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return db.user.findUnique({ where: { email, active: true } });
  }
  async findById(idUser: string): Promise<IUser | null> {
    return db.user.findUnique({ where: { idUser, active: true } });
  }

  async create(): Promise<IUser> {
    return;
  }
  async update(): Promise<IUser> {
    return;
  }
  async delete(idUser: string): Promise<IUser> {
    return db.user.update({ data: { active: false }, where: { idUser } });
  }
}

export default UserRepository;
