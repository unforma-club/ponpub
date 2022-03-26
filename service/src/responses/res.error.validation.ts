import { ValidationError } from "express-validator";
import ResError from "./res.error";

export default class ErrorValidation extends ResError {
    statusCode: number = 400;
    success: boolean = false;
    message: string = "Invalid Request";
    field?: string;

    constructor(public errors: Array<ValidationError>) {
        super("Invalid Request");
        Object.setPrototypeOf(this, ErrorValidation.prototype);
    }

    serializeErrors(): {
        success: boolean;
        statusCode: number;
        data: { message: string; field?: string }[];
    } {
        return {
            success: this.success,
            statusCode: this.statusCode,
            data: this.errors.map((error) => ({
                message: error.msg,
                field: error.param,
            })),
        };
    }
}
