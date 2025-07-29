import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { SchemaType } from "../types/schemaType";

const validatorSchema =
  (schema: ZodSchema, type: SchemaType) =>
  (req:Request, res: Response, next: NextFunction) => {
    try {
      switch (type) {
        case SchemaType.body:
          schema.parse(req.body);
          break;
        case SchemaType.params:
          schema.parse(req.params);
          break;
      }
      next();
    } catch (error) {
      return res
        .status(400)
        .json(error instanceof Error ? error.message : "Unknown error");
    }
  };
export { validatorSchema };
