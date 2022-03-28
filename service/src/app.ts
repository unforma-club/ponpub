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
import MidSession from "middlewares/mid.session";
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

app.use("/static", express.static("public"));
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ extended: false }));
app.use(
    cookieSession({
        name: "ponpub_session",
        signed: false,
        secure: false,
        domain: isProduction ? "ponpub-test.unforma.club" : "",
        sameSite: isProduction ? "strict" : "none"
    })
);

app.use(xssClean());
app.use(mongoSanitize());
app.use(compression());

app.use(cors());
app.use(helmet({ referrerPolicy: { policy: ["origin"] } }));
app.use(morgan(isProduction ? "common" : "dev"));

app.use(MidSession.currentUser);
app.use("/api/v1", RouterV1);

// const csp = `default-src 'self'; script-src 'self' ${process.env.PONPUB_CONSOLE_URL}; form-action 'self' ${process.env.PONPUB_CONSOLE_URL};`;

app.route("/api/auth").get((req, res) => {
    const currentUser = req.currentUser;
    if (currentUser) {
        return res.redirect(307, `${process.env.PONPUB_CONSOLE_URL}/ponpub`);
    }

    const cbUrl = req.query.callback_url ?? `${process.env.PONPUB_CONSOLE_URL}/ponpub`;
    const authMessage = (req.query.message as string) ?? "Login";

    const newMessage = authMessage
        .trim()
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    return res.render("login", { message: newMessage, callback_url: cbUrl as string });
});

app.get("/api/login", async (req, res) => {
    const cbUrl = req.query.callback_url ?? `${process.env.PONPUB_CONSOLE_URL}/ponpub`;
    const { email, password } = req.query;
    const user = await UserModel.findOne({ email });
    // res.setHeader("Content-Security-Policy", csp);

    if (!user) {
        return res.redirect(307, `/api/auth?callback_url=${cbUrl}&message=user-not-found`);
    }

    const passwordMatch = await ServicePassword.comparePassword(user.password, password as string);
    if (!passwordMatch) {
        return res.redirect(307, `/api/auth?callback_url=${cbUrl}&message=wrong-password`);
    }

    ServiceSession.issueSession(req, {
        id: user.id,
        email: user.email,
        role: user.role,
        userName: user.userName
    });

    return res.redirect(307, cbUrl as string);
});

app.all("*", (_, res) => res.status(404).render("404"));
app.use(errorHandler);

export default app;
