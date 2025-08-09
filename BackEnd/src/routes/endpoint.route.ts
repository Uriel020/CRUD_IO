import { Router } from "express";
import { validateSchema } from "../middlewares/zodValidator.middleware";
import {
  createEndpoint,
  endpointParams,
  updateEndpoint,
} from "../schemas/endpoint.schema";
import { SchemaType } from "../types/schemaType";
import EndpointController from "../controllers/endpoint.controller";

const router: Router = Router();

const {
  handleCreateEndpoint,
  handleDeleteEndpoint,
  handleGetEndpoint,
  handleUpdateEndpoint,
} = new EndpointController();

router.get(
  "/endpoint/:id",
  validateSchema(endpointParams, SchemaType.params),
  handleGetEndpoint
);
router.post(
  "/endpoint",
  validateSchema(createEndpoint, SchemaType.body),
  handleCreateEndpoint
);
router.put(
  "/endpoint/:id",
  validateSchema(endpointParams, SchemaType.params),
  validateSchema(updateEndpoint, SchemaType.body),
  handleUpdateEndpoint
);
router.delete(
  "/endpoint/:id",
  validateSchema(endpointParams, SchemaType.params),
  handleDeleteEndpoint
);
