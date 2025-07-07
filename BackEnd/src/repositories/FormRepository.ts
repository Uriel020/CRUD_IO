import { db } from "../db/prismaClient";
import { IForm } from "../interfaces/IForm";
import { CreateUserDTO, UpdateUserDTO } from "../schemas/form.schema";
import { Prisma } from "@prisma/client";

class FormRepository {
  async findAllByUser(id: string): Promise<IForm[]> {
    return db.form.findMany({ where: { idUser: id, active: true } });
  }

  async create(body: CreateUserDTO): Promise<IForm> {
    return db.form.create({
      data: {
        ...body,
        inputs: body.inputs as Prisma.InputJsonValue,
      },
    });
  }

  async update(body: UpdateUserDTO): Promise<IForm> {
    const { idForm, ...data } = body;
    return db.form.update({
      where: { idForm },
      data: {
        ...data,
        inputs: data.inputs as Prisma.InputJsonValue,
      },
    });
  }

  async delete(id: string): Promise<IForm> {
    return db.form.update({ data: { active: false }, where: { idForm: id } });
  }
}

export default FormRepository;
