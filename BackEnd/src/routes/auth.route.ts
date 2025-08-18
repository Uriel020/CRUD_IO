import { Router } from "express";
import { validateSchema } from "../middlewares/zodValidator.middleware";
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
  validateSchema(createUser, SchemaType.body),
  handleRegisterUser
);
router.post("/login", validateSchema(loginUser, SchemaType.body), handleLogin);
router.get(
  "/profile/:id",
  validateSchema(userParams, SchemaType.params),
  handleProfile
);
router.put(
  "/user/:id",
  validateSchema(userParams, SchemaType.params),
  validateSchema(updateUser, SchemaType.body),
  handleUpdateUser
);
router.delete(
  "/user/:id",
  validateSchema(userParams, SchemaType.params),
  handleSoftDeleteUser
);

export {router as authRouter}