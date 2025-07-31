import { Request, Response } from "express";
import UserService from "../services/user.service";
import { CreateUserDTO, LoginUser } from "../schemas/user.schema";
import { handleHttpError } from "../utils/handleHttpError";
import { HttpCode } from "../types/httpCode";

class AuthController {
  private readonly userService = new UserService();

  async handleLogin(req: Request, res: Response): Promise<any> {
    const body: LoginUser = req.body;

    try {
       
      const token: string = await this.userService.login(body);

      return res.status(HttpCode.Accepted).json(token);

    } catch (error) {
      return handleHttpError(res, error);
    }
  }
  async handleRegisterUser(req: Request, res: Response): Promise<any> {
    const body: CreateUserDTO = req.body;
    try {
      
    } catch (error) {
      
    }
  }
  async handleUpdateUser(req: Request, res: Response): Promise<any> {}
  async handleSoftDeleteUser(req: Request, res: Response): Promise<any> {}
}

export default AuthController;
