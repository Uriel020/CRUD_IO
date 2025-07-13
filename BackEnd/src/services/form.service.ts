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
    await this.validateUser(idUser);

    return this.formRepo.findAllByUser(idUser);
  }

  async createFormForUser(body: CreateFormDTO): Promise<IForm> {
    await this.validateUser(body.idUser);

    return this.formRepo.create(body);
  }

  async modifyFormDetails(body: UpdateFormDTO): Promise<IForm> {
    const { idForm } = body;
    await this.validateForm(idForm);
    return this.formRepo.update(body);
  }

  async softDeleteForm(idForm: string): Promise<IForm> {
    await this.validateForm(idForm);
    return this.formRepo.delete(idForm);
  }

  private async validateUser(idUser: string): Promise<void> {
    const isUser = await this.userRepo.findById(idUser);
    if (!isUser) throw new Error("Invalid or missing user ID");
  }

  private async validateForm(idForm: string): Promise<void> {
    const formExists = await this.formRepo.findById(idForm);
    if (!formExists) throw new Error("Form doesn't exists");
  }
}

export default FormService;
