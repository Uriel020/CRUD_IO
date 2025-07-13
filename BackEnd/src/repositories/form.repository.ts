import { db } from "../db/prismaClient";
import { IForm } from "../interfaces/IForm";
import { CreateFormDTO, UpdateFormDTO } from "../schemas/form.schema";
import { Prisma } from "@prisma/client";

class FormRepository {
  async findAllByUser(idUser: string): Promise<IForm[]> {
    return db.form.findMany({ where: { idUser, active: true } });
  }
  async findById(idForm: string): Promise<IForm | null> {
    return db.form.findUnique({ where: { idForm } });
  }
  async create(body: CreateFormDTO): Promise<IForm> {
    return db.form.create({
      data: {
        ...body,
        inputs: body.inputs as Prisma.InputJsonValue,
      },
    });
  }
  async update(body: UpdateFormDTO): Promise<IForm> {
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
