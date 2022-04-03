import type { Request } from "express";
import type { BaseUser } from "types/user";
import { jwtSign } from "utils/util.jwt";

const ServiceSession = {
    issueSession: function (req: Request, user: BaseUser & { location?: any }) {
        req.session = {
            jwt: jwtSign(user)
        };
    }
};

export default ServiceSession;
