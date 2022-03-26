import { BaseUser } from "./user";

declare global {
    namespace Express {
        interface Request {
            currentUser: BaseUser | null;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "production" | "development" | "test";
            PORT: string;
            MONGO_URI: string;
            JWT_KEY: string;
        }
    }
}
