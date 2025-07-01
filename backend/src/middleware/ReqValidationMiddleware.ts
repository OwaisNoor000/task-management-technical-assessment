import { z, ZodSchema } from "zod/v4";
import { Request, Response, NextFunction } from "express";



  export const validateSchema = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Validation failed",
      details: result.error.format(),
    });
    return;
  }

  req.body = result.data;
  next();
};