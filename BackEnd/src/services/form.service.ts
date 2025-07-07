import { IForm } from "../interfaces/IForm";
import FormRepository from "../repositories/FormRepository";

class FormService {
  private formRepo = new FormRepository();

  async getAllForms(idUser: string): Promise<IForm[]> {
    const forms = this.formRepo.findAllByUser(idUser);
    return forms;
  }

  async createForm(body: any): Promise<IForm> {
    const newForm = this.formRepo.create(body);
    return newForm;
  }

  async updateForm(body: any): Promise<IForm> {
    const updatedForm = this.formRepo.update(body);
    return updatedForm;
  }

  async deleteForm(idForm: string): Promise<IForm> {
    const deletedForm = this.formRepo.delete(idForm);
    return deletedForm;
  }
}

export default FormService;
