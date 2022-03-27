import ResError from "./res.error";

export default class ErrorForbidden extends ResError {
    statusCode: number = 403;
    success: boolean = false;
    message: string;
    field?: string;

    constructor(message?: string, field?: string) {
        super(message, field);
        this.message = message || "Forbidden";
        this.field = field;
        Object.setPrototypeOf(this, ErrorForbidden.prototype);
    }

    serializeErrors() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            data: [{ message: this.message, field: this.field }]
        };
    }
}
