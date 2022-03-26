import { checkSchema, Schema } from "express-validator";

const nameSchema: Schema = {
    name: {
        notEmpty: {
            errorMessage: "Name required",
            bail: true,
        },
        isString: {
            errorMessage: "Must be type of string",
            bail: true,
        },
        isLength: {
            errorMessage: "Must be between 3 - 50 characters",
            options: { min: 3, max: 50 },
            bail: true,
        },
        custom: {
            options: (v: string) => {
                const words = v.split(" ");
                if (words.length <= 1)
                    return Promise.reject("Last name required");
                return Promise.resolve();
            },
            bail: true,
        },
    },
};
const userNameSchema: Schema = {
    userName: {
        notEmpty: {
            errorMessage: "Name required",
            bail: true,
        },
        isString: {
            errorMessage: "Must be type of string",
            bail: true,
        },
        isLength: {
            errorMessage: "Must be between 3 - 50 characters",
            options: { min: 3, max: 50 },
            bail: true,
        },
        // Must be check for unique symbols
        // custom: {
        //     options: (v: string) => {
        //         const words = v.split(" ");
        //         if (words.length <= 1)
        //             return Promise.reject("Username required");
        //         return Promise.resolve();
        //     },
        //     bail: true,
        // },
    },
};

const emailSchema: Schema = {
    email: {
        notEmpty: {
            errorMessage: "Email required",
            bail: true,
        },
    },
};

const passwordSchema: Schema = {
    password: {
        notEmpty: {
            errorMessage: "Password required",
            bail: true,
        },
        isLength: {
            errorMessage: "Must be between 6 - 20 characters",
            options: { min: 6, max: 20 },
            bail: true,
        },
    },
};

const FieldValidation = {
    login: checkSchema({ ...emailSchema, ...passwordSchema }),
    register: checkSchema({
        ...nameSchema,
        ...userNameSchema,
        ...emailSchema,
        ...passwordSchema,
    }),
};

export default FieldValidation;
