import { Request, Response } from "express";
import FormService from "../services/form.service";
import { CreateFormDTO, UpdateFormDTO } from "../schemas/form.schema";

class FormController {
  private readonly formService = new FormService();

  async handleGetForms(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ error: "Invalid or missing user id" });
      }
      const forms = await this.formService.getFormsOwnedByUser(id);
      return res.status(200).json(forms);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleCreateForm(req: Request, res: Response) {
    const body = req.body as CreateFormDTO;
    try {
      const newForm = await this.formService.createFormForUser(body);
      return res.status(201).json(newForm);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleUpdateForm(req: Request, res: Response) {
    const body = req.body as UpdateFormDTO;
    try {
      const updatedForm = await this.formService.modifyFormDetails(body);
      return res.status(200).json(updatedForm);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleDeleteForm(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ error: "Invalid or missing form id" });
      }
      const deletedForm = await this.formService.softDeleteForm(id);
      return res.status(200).json(deletedForm);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }
}

export default FormController;
