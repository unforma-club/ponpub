import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ErrorValidation from "responses/res.error.validation";
import UserModel from "models/model.user";

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
            role: isEmpty ? 5 : 0,
        });
        try {
            await buildUser.save();
        } catch (error) {
            throw new Error(error.message);
        }

        return res.status(201).json(buildUser);
    },
};

export default ControlUser;
