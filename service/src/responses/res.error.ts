export default abstract class ResError extends Error {
    abstract statusCode: number;
    abstract success: boolean;
    abstract message: string;
    abstract field?: string;

    constructor(message: string, field?: string) {
        super();
        Object.setPrototypeOf(this, ResError.prototype);
    }

    abstract serializeErrors(): {
        success: boolean;
        statusCode: number;
        data: { message: string; field?: string }[];
    };
}
