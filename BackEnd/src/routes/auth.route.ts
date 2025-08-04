import { Router } from "express";
import { validatorSchema } from "../middlewares/zodValidator.middleware";
import {
  createUser,
  loginUser,
  updateUser,
  usersParams,
} from "../schemas/user.schema";
import { SchemaType } from "../types/schemaType";
import AuthController from "../controllers/auth.controller";

const router: Router = Router();
const {
  handleLogin,
  handleRegisterUser,
  handleProfile,
  handleSoftDeleteUser,
  handleUpdateUser,
} = new AuthController();

router.post(
  "/register",
  validatorSchema(createUser, SchemaType.body),
  handleRegisterUser
);
router.post("/login", validatorSchema(loginUser, SchemaType.body), handleLogin);
router.get(
  "profile/:id",
  validatorSchema(usersParams, SchemaType.params),
  handleProfile
);
router.put(
  "user/:id",
  validatorSchema(usersParams, SchemaType.params),
  validatorSchema(updateUser, SchemaType.body),
  handleUpdateUser
);
router.delete(
  "user/:id",
  validatorSchema(usersParams, SchemaType.params),
  handleSoftDeleteUser
);
