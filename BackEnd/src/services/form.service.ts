import { IForm } from "../interfaces/IForm";
import FormRepository from "../repositories/form.repository";
import UserRepository from "../repositories/user.repository";
import { CreateFormDTO, UpdateFormDTO } from "../schemas/form.schema";

class FormService {
  constructor(
    private readonly formRepo = new FormRepository(),
    private readonly userRepo = new UserRepository()
  ) {}

  async getFormsOwnedByUser(idUser: string): Promise<IForm[]> {
    const validatedUser = await this.validateUser(idUser);

    if (!validatedUser) throw new Error("Invalid or missing id user");

    const forms = await this.formRepo.findAllByUser(idUser);
    return forms;
  }

  async createFormForUser(body: CreateFormDTO): Promise<IForm> {
    const validatedUser = await this.validateUser(body.idUser);

    if (!validatedUser) throw new Error("Invalid or missing id user");

    const newForm = await this.formRepo.create(body);
    return newForm;
  }

  async updateFormDetails(body: UpdateFormDTO): Promise<IForm> {
    const updatedForm = await this.formRepo.update(body);
    return updatedForm;
  }

  async softDeleteForm(idForm: string): Promise<IForm> {
    const deletedForm = await this.formRepo.delete(idForm);
    return deletedForm;
  }

  private async validateUser(idUser: string): Promise<boolean> {
    const isUser = await this.userRepo.findById(idUser);
    return !!isUser;
  }
}

export default FormService;
