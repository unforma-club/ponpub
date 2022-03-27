import type { Request, Response } from "express";
// import ErrorNotFound from "responses/res.error.not-found";
import SuccessJson from "responses/res.success-json";
// import { verify } from "jsonwebtoken";

const ControlSession = {
    me: function (req: Request, res: Response) {
        // const q = req.query;

        // if (!q.apiKey) throw new ErrorNotFound();
        // const apiKey = q.apiKey as string;
        // const token = verify(apiKey, process.env.JWT_KEY);

        return new SuccessJson(res, { user: req.currentUser });
    }
};

export default ControlSession;
