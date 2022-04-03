import { Router } from "express";
import FieldValidation from "middlewares/mid.field";
import MidSession from "middlewares/mid.session";
import ControlUser from "controllers/control.user";
import ControlSession from "controllers/control.session";
import ControlPost from "controllers/control.post";

const RouterV1 = Router();

RouterV1.get("/session/ping", MidSession.ping, ControlSession.me);

RouterV1.post("/user/login", ControlUser.login);
RouterV1.post("/user/logout", ControlUser.logout);
RouterV1.post("/user/register", FieldValidation.register, ControlUser.register);

RouterV1.route("/post").post(ControlPost.create).get(ControlPost.getPosts);
RouterV1.route("/post/:slug").get(ControlPost.getPostBySlug);

export default RouterV1;
