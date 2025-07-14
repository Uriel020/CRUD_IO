import { Request, Response } from "express";
import UserService from "../services/user.service";

class AuthController {
  private readonly userService = new UserService();

  async handleLogin(req: Request, res: Response): Promise<any> {}
  async handleCreateUser(req: Request, res: Response): Promise<any> {}
  async handleUpdateUser(req: Request, res: Response): Promise<any> {}
  async handleDeleteUser(req: Request, res: Response): Promise<any> {}
}

export default AuthController;
