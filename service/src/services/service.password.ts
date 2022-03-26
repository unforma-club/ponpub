import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

const ServicePassword = {
    hashPassword: async function (password: string): Promise<string> {
        const salt = randomBytes(10).toString("hex");
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buf.toString("hex")}.${salt}`;
    },
    comparePassword: async function (
        storedPassword: string,
        suppliedPassword: string
    ): Promise<boolean> {
        const [hashedPassword, salt] = storedPassword.split(".");
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        return buf.toString("hex") === hashedPassword;
    },
};

export default ServicePassword;
