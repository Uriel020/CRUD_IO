import { Request, Response } from "express";
import FormService from "../services/form.service";
import { CreateFormDTO, UpdateFormDTO } from "../schemas/form.schema";

class FormController {
  private readonly formService = new FormService();

  async getForms(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id)
        return res.json(400).json({ error: "Invalid or missing user id" });
      const forms = await this.formService.getFormsOwnedByUser(id);
      return res.status(200).json(forms);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async createForm(req: Request, res: Response) {
    const body = req.body as CreateFormDTO;
    try {
      const newForm = await this.formService.createFormForUser(body);
      return newForm;
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async updateForm(req: Request, res: Response) {
    const body = req.body as UpdateFormDTO;
    try {
      const newForm = await this.formService.updateFormDetails(body);
      return newForm;
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async deleteForms(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id)
        return res.json(400).json({ error: "Invalid or missing form id" });
      const forms = await this.formService.softDeleteForm(id);
      return res.status(200).json(forms);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }
}

export default FormController;
