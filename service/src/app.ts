import type { Request, Response, NextFunction } from "express";
import express, { json, urlencoded } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import favicon from "serve-favicon";
import geoip from "geoip-lite";

import errorHandler from "middlewares/mid.error";
import MidSession from "middlewares/mid.session";
import MidLimiter from "middlewares/mid.limiter";
import ErrorNotFound from "responses/res.error.not-found";
import RouterV1 from "routes/route.v1";

const isProduction = process.env.NODE_ENV === "production";
function ipLookup(req: Request, _res: Response, next: NextFunction) {
    let ip: string = "207.97.227.239";
    if (isProduction) {
        ip = req.headers["x-forwarded-for"] as string;
    }

    const geo = geoip.lookup(ip);
    req.location = geo;
    next();
}

const app = express();

app.set("name", "Ponpub Service");
app.set("trust proxy", true);
app.set("x-powered-by", false);

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");

app.use(favicon(process.cwd() + "/public/images/icons/favicon.ico"));
app.use("/static", express.static("public"));
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ extended: false }));
app.use(
    cookieSession({
        name: "pp_session",
        secret: process.env.JWT_KEY,
        sameSite: true,
        secure: true
    })
);

app.use(xssClean());
app.use(mongoSanitize());
app.use(compression());

app.use(cors());
app.use(helmet());
app.use(
    morgan(
        isProduction
            ? `:req[x-forwarded-for] - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`
            : ":req[x-forwarded-for] - :method :url :status :response-time ms - :res[content-length]"
    )
);

app.use(ipLookup);
app.use(MidLimiter.memory);
app.use(MidSession.currentUser);
app.use("/api/v1", RouterV1);

app.route("/api/auth").get(async (req, res) => {
    const currentUser = req.currentUser;
    if (currentUser) return res.redirect(307, `${req.query.callback_url}`);

    const authMessage = (req.query.message as string) ?? "Login";
    const newMessage = authMessage
        .trim()
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    return res.render("login", { message: newMessage });
});

app.all("*", (req) => {
    throw new ErrorNotFound(req.location);
});
app.use(errorHandler);

export default app;
