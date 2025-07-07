import { db } from "../db/prismaClient";
import { IForm } from "../interfaces/IForm";

class FormRepository {
  async findAllByUser(id: string): Promise<Partial<IForm[]> | []> {
    return db.form.findMany({ where: { idUser: id, active: true } });
  }

  async create(body: any): Promise<IForm> {
    return db.form.create({ data: body });
  }

  async update(body: any): Promise<IForm> {
    return db.form.update({ where: { idForm: body.idForm }, data: body });
  }

  async delete(id: string): Promise<Partial<IForm>> {
    return db.form.update({ data: { active: false }, where: { idForm: id } });
  }
}

export default FormRepository;
