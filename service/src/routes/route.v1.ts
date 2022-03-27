import { Router } from "express";
import FieldValidation from "middlewares/mid.field";
import MidSession from "middlewares/mid.session";
import ControlUser from "controllers/control.user";
import ControlSession from "controllers/control.session";

const RouterV1 = Router();

RouterV1.get("/session/ping", MidSession.ping, ControlSession.me);

RouterV1.post("/user/login", ControlUser.login);
RouterV1.post("/user/logout", ControlUser.logout);
RouterV1.post("/user/register", FieldValidation.register, ControlUser.register);

export default RouterV1;
