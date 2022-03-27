import type { Request, Response } from "express";
import express, { json, urlencoded } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import errorHandler from "middlewares/mid.error";
import RouterV1 from "routes/route.v1";
import UserModel from "models/model.user";
import ServicePassword from "services/service.password";
import ServiceSession from "services/service.session";

const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.set("name", "Ponpub Service");
app.set("trust-proxy", true);
app.set("x-powered-by", false);

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");

app.use(express.static("public/static"));
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ extended: false }));
app.use(cookieSession({ name: "ponpub_session", signed: false, secure: false }));

app.use(xssClean());
app.use(mongoSanitize());
app.use(compression());

app.use(cors());
app.use(helmet({ referrerPolicy: { policy: ["origin"] } }));
app.use(morgan(isProduction ? "common" : "dev"));

app.use("/v1", RouterV1);

const csp = `default-src 'self'; script-src 'self'; form-action 'self' ${process.env.PONPUB_CONSOLE_URL};`;
app.get("/auth", (req, res) => {
    const cbUrl = req.query.callback_url;
    res.setHeader("Content-Security-Policy", csp);
    return res.render("login", { message: "Login", callback_url: cbUrl as string });
});
app.post("/auth", async (req: Request, res: Response) => {
    const cbUrl = req.query.callback_url;
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    res.setHeader("Content-Security-Policy", csp);

    if (!user)
        return res
            .status(404)
            .render("login", { message: "User Not Found", callback_url: cbUrl as string });

    const passwordMatch = await ServicePassword.comparePassword(user.password, password);
    if (!passwordMatch)
        return res
            .status(400)
            .render("login", { message: "Wrong Password", callback_url: cbUrl as string });

    ServiceSession.issueSession(req, {
        id: user.id,
        email: user.email,
        role: user.role,
        userName: user.userName
    });

    return res.redirect(cbUrl as string, 307);
});

app.all("*", (_, res) => res.status(404).render("404"));
app.use(errorHandler);

export default app;
