import { Router } from "express";
import { validateSchema } from "../middlewares/zodValidator.middleware";
import { createEndpoint, endpointParams } from "../schemas/endpoint.schema";
import { SchemaType } from "../types/schemaType";

const router: Router = Router();

router.get(
  "/endpoint/:id",
  validateSchema(endpointParams, SchemaType.params)
);
router.post("/endpoint", validateSchema(createEndpoint, SchemaType.body));
router.put("/endpoint/:id", );
router.delete("/endpoint/:id");
