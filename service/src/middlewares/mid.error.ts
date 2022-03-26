import { Request, Response, NextFunction } from "express";
import ResError from "responses/res.error";

export default function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof ResError) {
        return res.status(err.statusCode).send(err.serializeErrors());
    }
    return res.status(400).send({
        success: false,
        statusCode: res.statusCode,
        data: [{ message: err.message }],
    });
}
