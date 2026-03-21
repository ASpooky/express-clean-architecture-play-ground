import type { Request, Response, NextFunction } from "express";
import { ValidationError, BusinessRuleViolationError } from "../../domain/entities/errors/index.js";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    if (err instanceof ValidationError) {
        res.status(400).json({ error: err.message });
        return;
    }
    if (err instanceof BusinessRuleViolationError) {
        res.status(422).json({ error: err.message });
        return;
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
};
