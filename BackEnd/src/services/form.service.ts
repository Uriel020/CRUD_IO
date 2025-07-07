import { IForm } from "../interfaces/IForm";
import FormRepository from "../repositories/FormRepository";
import { CreateUserDTO, UpdateUserDTO } from "../schemas/form.schema";

class FormService {
  constructor(private formRepo = new FormRepository()) {}

  async getAllForms(idUser: string): Promise<IForm[]> {
    const forms = await this.formRepo.findAllByUser(idUser);
    return forms;
  }

  async createForm(body: CreateUserDTO): Promise<IForm> {
    const newForm = await this.formRepo.create(body);
    return newForm;
  }

  async updateForm(body: UpdateUserDTO): Promise<IForm> {
    const updatedForm = await this.formRepo.update(body);
    return updatedForm;
  }

  async deleteForm(idForm: string): Promise<IForm> {
    const deletedForm = await this.formRepo.delete(idForm);
    return deletedForm;
  }
}

export default FormService;
