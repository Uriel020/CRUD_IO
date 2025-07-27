import { Request, Response } from "express";
import UserService from "../services/user.service";
import { LoginUser } from "../schemas/user.schema";
import { handleHttpError } from "../utils/handleHttpError";

class AuthController {
  private readonly userService = new UserService();

  async handleLogin(req: Request, res: Response): Promise<any> {
    const body: LoginUser = req.body;
    try {
      return await this.userService.login(body);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }
  async handleRegisterUser(req: Request, res: Response): Promise<any> {}
  async handleUpdateUser(req: Request, res: Response): Promise<any> {}
  async handleSoftDeleteUser(req: Request, res: Response): Promise<any> {}
}

export default AuthController;
