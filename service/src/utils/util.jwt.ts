import type { BaseUser } from "types/user";
import { sign, verify, SignOptions } from "jsonwebtoken";

const privateKey = process.env.JWT_KEY;

export function jwtSign(object: Object, options?: SignOptions) {
    return sign(object, privateKey, {
        ...(options && options),
        expiresIn: options ? options.expiresIn : "30m"
    });
}

export function jwtVerify(token: string) {
    return verify(token, privateKey) as BaseUser;
}
