import { Request, Response } from "express";
import FormService from "../services/resource.service";
import { CreateResourceDTO, UpdateResourceDTO } from "../schemas/resource.schema";

class FormController {
  private readonly formService = new FormService();

  async handleGetForms(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ error: "Invalid or missing user id" });
      }
      const forms = await this.formService.getResourcesOwnedByUser(id);
      return res.status(200).json(forms);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleCreateForm(req: Request, res: Response): Promise<any> {
    const body = req.body as CreateResourceDTO;
    try {
      const newForm = await this.formService.createResourceForUser(body);
      return res.status(201).json(newForm);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleUpdateForm(req: Request, res: Response): Promise<any> {
    const body = req.body as UpdateResourceDTO;
    try {
      const updatedForm = await this.formService.modifyResourceDetails(body);
      return res.status(200).json(updatedForm);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async handleDeleteForm(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ error: "Invalid or missing form id" });
      }
      const deletedForm = await this.formService.softDeleteResource(id);
      return res.status(200).json(deletedForm);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }
}

export default FormController;
