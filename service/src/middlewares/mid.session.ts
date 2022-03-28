import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "utils/util.jwt";

const MidSession = {
    currentUser: function (req: Request, res: Response, next: NextFunction) {
        if (!req.session.jwt) return next();
        try {
            const session = jwtVerify(req.session.jwt);
            req.currentUser = session;
        } catch (error) {}
        return next();
    },
    ping: function (req: Request, res: Response, next: NextFunction) {
        if (!req.session.jwt) return res.status(200).json({ success: false, statusCode: 200 });
        const session = jwtVerify(req.session.jwt);
        req.currentUser = session;
        return next();
    }
};

export default MidSession;
