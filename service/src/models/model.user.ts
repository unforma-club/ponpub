import { Document, Model, Schema, model } from "mongoose";
import ServicePassword from "services/service.password";

type UserAttr = {
    email: string;
    password: string;
    name: string;
    userName: string;
    role: number;
};

interface UserDocument extends UserAttr, Document {
    createdAt: Date;
    updatedAt: Date;
}

type UserModel = Model<UserDocument> & {
    build(attrs: UserAttr): UserDocument;
};

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, indexes: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        userName: { type: String, required: true, unique: true, indexes: true },
        role: { type: String, required: true, default: 0, indexes: true },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await ServicePassword.hashPassword(this.get("password"));
        this.set("password", hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttr) => {
    return new UserModel(attrs);
};

const UserModel = model<UserAttr, UserModel>("User", userSchema);
export default UserModel;
