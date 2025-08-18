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

  handleLogin = async (req: Request, res: Response): Promise<any> => {
    const body = req.body as LoginUser;

    try {
      const token: string = await this.userService.login(body);
      return res.status(HttpCode.Accepted).json(token);
    } catch (error) {
      return handleHttpError(res, error);
    }
  };

  handleProfile = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params as UserParamsDTO;
    try {
      const profile = await this.userService.getProfile(id);
      return res.status(HttpCode.Ok).json(profile);
    } catch (error) {
      return handleHttpError(res, error);
    }
  };

  handleRegisterUser = async (req: Request, res: Response): Promise<any> => {
    const body = req.body as CreateUserDTO;
    try {
      await this.userService.registerUser(body);
      return res.status(HttpCode.Created).json({ message: "User created" });
    } catch (error) {
      return handleHttpError(res, error);
    }
  };

  handleUpdateUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params as UserParamsDTO;
    const body = req.body as UpdateUserDTO;

    try {
      await this.userService.modifyUser(id, body);
      return res
        .status(HttpCode.Ok)
        .json({ message: `${body.username} is updated` });
    } catch (error) {
      return handleHttpError(res, error);
    }
  };

  handleSoftDeleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params as UserParamsDTO;
    try {
      await this.userService.softDeleteUser(id);
      return res.status(HttpCode.Ok).json({ message: "User deleted" });
    } catch (error) {
      return handleHttpError(res, error);
    }
  };
}

export default AuthController;
