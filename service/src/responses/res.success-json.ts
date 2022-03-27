import { Response } from "express";

export default class SuccessJson {
    res: Response;
    data: any;
    statusCode: number;

    constructor(res: Response, data: any, statusCode?: number) {
        this.res = res;
        this.data = data;
        this.statusCode = statusCode || 200;

        this.serializeResponse();
    }

    serializeResponse() {
        return this.res.status(this.statusCode).json({
            success: true,
            statusCode: this.res.statusCode,
            data: this.data
        });
    }
}
