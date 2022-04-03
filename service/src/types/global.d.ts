import { BaseUser } from "./user";

declare global {
    namespace Express {
        interface Request {
            currentUser: BaseUser | null;
            location: any | null;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "production" | "development" | "test";
            PORT: string;
            MONGO_URI: string;
            JWT_KEY: string;
            PONPUB_CONSOLE_URL: string;
        }
    }
}
