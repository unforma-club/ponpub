import type { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({ points: 10, duration: 1, keyPrefix: "middleware" });

const MidLimiter = {
    memory: (req: Request, res: Response, next: NextFunction) => {
        const ipAddress = req.headers["x-forwarded-for"] as string;
        limiter
            .consume(ipAddress)
            .then(() => next())
            .catch(() => res.status(429).render("429", { ip: ipAddress }));
    }
};

export default MidLimiter;
