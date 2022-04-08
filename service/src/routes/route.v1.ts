import { Router } from "express";
import FieldValidation from "middlewares/mid.field";
import MidSession from "middlewares/mid.session";
import ControlUser from "controllers/control.user";
import ControlSession from "controllers/control.session";
import ControlPost from "controllers/control.post";
import ControlSetting from "controllers/control.setting";
import ControlAsset from "controllers/control.asset";

const RouterV1 = Router();

RouterV1.get("/session/ping", MidSession.ping, ControlSession.me);

RouterV1.post("/user/login", ControlUser.login);
RouterV1.post("/user/logout", ControlUser.logout);
RouterV1.post("/user/register", FieldValidation.register, ControlUser.register);

RouterV1.route("/post").post(ControlPost.create).get(ControlPost.getPosts);
RouterV1.route("/post/:slug")
    .get(ControlPost.getPostBySlug)
    .patch(ControlPost.patchPostBySlug)
    .delete(ControlPost.deletePostBySlug);

RouterV1.route("/admin/user").get(ControlUser.getUser);
RouterV1.route("/admin/setting/site")
    .get(ControlSetting.getSiteData)
    .post(ControlSetting.postSiteDate)
    .patch(ControlSetting.patchSiteData);

RouterV1.route("/content/images/logo").post(ControlAsset.storageLogo, ControlAsset.uploadLogo);

export default RouterV1;
