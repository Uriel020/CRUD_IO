import { Request, Response } from "express";
import UserService from "../services/user.service";
import { LoginUser } from "../schemas/user.schema";

class AuthController {
  private readonly userService = new UserService();

  async handleLogin(req: Request, res: Response): Promise<any> {
    const body: LoginUser = req.body;
    try {
      return await this.userService.login(body);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }
  async handleCreateUser(req: Request, res: Response): Promise<any> {}
  async handleUpdateUser(req: Request, res: Response): Promise<any> {}
  async handleDeleteUser(req: Request, res: Response): Promise<any> {}
}

export default AuthController;
