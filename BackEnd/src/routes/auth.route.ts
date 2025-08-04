import { Router } from "express";
import { validatorSchema } from "../middlewares/zodValidator.middleware";
import {
  createUser,
  loginUser,
  updateUser,
  userParams,
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
  validatorSchema(userParams, SchemaType.params),
  handleProfile
);
router.put(
  "user/:id",
  validatorSchema(userParams, SchemaType.params),
  validatorSchema(updateUser, SchemaType.body),
  handleUpdateUser
);
router.delete(
  "user/:id",
  validatorSchema(userParams, SchemaType.params),
  handleSoftDeleteUser
);
