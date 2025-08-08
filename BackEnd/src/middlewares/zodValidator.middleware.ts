import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";
import { SchemaType } from "../types/schemaType";

const validateSchema =
  (schema: ZodSchema, type: SchemaType) =>
  (req: Request, res: Response, next: NextFunction): any => {
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
        .json(
          error instanceof ZodError
            ? error.errors.map((e) => e.message)
            : ["Unknown error"]
        );
    }
  };
export { validateSchema };
