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
import ErrorNotFound from "responses/res.error.not-found";

const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.set("name", "Ponpub Service");
app.set("trust-proxy", true);
app.set("x-powered-by", false);

app.use(json({ limit: "100mb" }));
app.use(urlencoded({ extended: true }));
app.use(
    cookieSession({ name: "ponpub_session", signed: false, secure: false })
);
app.use(xssClean());
app.use(mongoSanitize());
app.use(compression());

app.use(cors());
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: ["origin"] }));
app.use(morgan(isProduction ? "common" : "dev"));

app.use("/v1", RouterV1);
app.all("*", () => {
    throw new ErrorNotFound();
});
app.use(errorHandler);

export default app;
