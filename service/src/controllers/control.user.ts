import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import ErrorValidation from "responses/res.error.validation";
import ErrorNotFound from "responses/res.error.not-found";
import SuccessJson from "responses/res.success-json";
import UserModel from "models/model.user";
import ServiceSession from "services/service.session";
import ServicePassword from "services/service.password";

const ControlUser = {
    register: async function (req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new ErrorValidation(errors.array());

        const { email, password, name, userName } = req.body;
        const isEmpty = (await UserModel.find()).length === 0;
        const buildUser = UserModel.build({
            email,
            password,
            name,
            userName,
            role: isEmpty ? 5 : 0
        });

        try {
            await buildUser.save();
        } catch (error) {
            throw new Error(error.message);
        }

        ServiceSession.issueSession(req, {
            id: buildUser.id,
            email: buildUser.email,
            role: buildUser.role,
            userName: buildUser.userName
        });

        return new SuccessJson(res, buildUser, 201);
    },
    login: async function (req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new ErrorValidation(errors.array());
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) throw new ErrorNotFound(`User "${email}" doesn't exist yet.`);
        const passwordMatch = await ServicePassword.comparePassword(user.password, password);
        if (!passwordMatch) throw new ErrorNotFound("Wrong Password", "password");
        ServiceSession.issueSession(req, {
            id: user.id,
            email: user.email,
            role: user.role,
            userName: user.userName
        });

        return new SuccessJson(res, user, 202);
    },
    logout: function (req: Request, res: Response) {
        req.session = null;
        return new SuccessJson(res, null);
    }
};

export default ControlUser;
