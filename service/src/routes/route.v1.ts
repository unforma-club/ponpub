import { Router } from "express";
import FieldValidation from "middlewares/mid.field";
import ControlUser from "controllers/control.user";

const RouterV1 = Router();

RouterV1.post("/user/register", FieldValidation.register, ControlUser.register);

export default RouterV1;
