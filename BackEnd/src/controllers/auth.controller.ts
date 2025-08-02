import { Request, Response } from "express";
import UserService from "../services/user.service";
import {
  CreateUserDTO,
  LoginUser,
  UpdateUserDTO,
  UserParamsDTO,
} from "../schemas/user.schema";
import { handleHttpError } from "../utils/handleHttpError";
import { HttpCode } from "../types/httpCode";

class AuthController {
  private readonly userService = new UserService();

  async handleLogin(req: Request, res: Response): Promise<any> {
    const body = req.body as LoginUser;

    try {
      const token: string = await this.userService.login(body);

      return res.status(HttpCode.Accepted).json(token);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }
  // async handleProfile(req: Request, res: Response): Promise<any> {
    
  // }
  async handleRegisterUser(req: Request, res: Response): Promise<any> {
    const body = req.body as CreateUserDTO;
    try {
      await this.userService.registerUser(body);
      return res.status(HttpCode.Created);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }
  async handleUpdateUser(req: Request, res: Response): Promise<any> {
    const { idUser } = req.params as UserParamsDTO;
    const body = req.body as UpdateUserDTO;

    try {
      await this.userService.modifyUser(idUser, body);
      return res.status(HttpCode.Ok).json(`${body.username} is updated`);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }
  async handleSoftDeleteUser(req: Request, res: Response): Promise<any> {
    const { idUser } = req.params as UserParamsDTO;
    try {
      await this.userService.softDeleteUser(idUser);
      return res.status(HttpCode.Ok);
    } catch (error) {
      return handleHttpError(res, error);
    }
  }
}

export default AuthController;
