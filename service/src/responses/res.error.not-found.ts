import ResError from "./res.error";

export default class ErrorNotFound extends ResError {
    statusCode: number = 404;
    success: boolean = false;
    message: string;
    field?: string;

    constructor(message?: string, field?: string) {
        super(message, field);
        this.message = message || "Not Found";
        this.field = field;
        Object.setPrototypeOf(this, ErrorNotFound.prototype);
    }

    serializeErrors() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            data: [{ message: this.message, field: this.field }],
        };
    }
}
