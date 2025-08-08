import { Router } from "express";
import ResourceController from "../controllers/resource.controller";
import { validateSchema } from "../middlewares/zodValidator.middleware";
import {
  createResource,
  updateResource,
  resourceParams,
} from "../schemas/resource.schema";
import { SchemaType } from "../types/schemaType";
import { userParams } from "../schemas/user.schema";

const router: Router = Router();
const {
  handleCreateResource,
  handleSoftDeleteResource,
  handleGetResources,
  handleUpdateResource,
} = new ResourceController();

router.get(
  "/resources/:id",
  validateSchema(userParams, SchemaType.params),
  handleGetResources
);
router.post(
  "/resource",
  validateSchema(createResource, SchemaType.body),
  handleCreateResource
);
router.put(
  "/resource/:id",
  validateSchema(resourceParams, SchemaType.params),
  validateSchema(updateResource, SchemaType.body),
  handleUpdateResource
);
router.delete(
  "/resource/:id",
  validateSchema(resourceParams, SchemaType.params),
  handleSoftDeleteResource
);

export { router as resourceRouter };
