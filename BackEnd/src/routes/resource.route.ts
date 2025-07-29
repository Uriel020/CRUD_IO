import { Router } from "express";
import ResourceController from "../controllers/resource.controller";
import { validatorSchema } from "../middlewares/zodValidator.middleware";
import {
  createResource,
  updateResource,
  resourceParams,
} from "../schemas/resource.schema";
import { SchemaType } from "../types/schemaType";
import { usersParams } from "../schemas/user.schema";

const router: Router = Router();
const {
  handleCreateResource,
  handleSoftDeleteResource,
  handleGetResources,
  handleUpdateResource,
} = new ResourceController();

router.get(
  "/resource/:idUser",
  validatorSchema(usersParams, SchemaType.params),
  handleGetResources
);
router.post(
  "/resource",
  validatorSchema(createResource, SchemaType.body),
  handleCreateResource
);
router.put(
  "/resource/:idResource",
  validatorSchema(resourceParams, SchemaType.params),
  validatorSchema(updateResource, SchemaType.body),
  handleUpdateResource
);
router.delete(
  "/resource/:idResource",
  validatorSchema(resourceParams, SchemaType.params),
  handleSoftDeleteResource
);

export { router as resourceRouter };
