import { Document, Model, Schema, model } from "mongoose";

type PostAttr = {
    title: string;
    slug: string;
    type: string;
    author: string;
};

export interface PostDocument extends PostAttr, Document {
    createdAt: Date;
    updatedAt: Date;
}

type PostModel = Model<PostDocument> & {
    build(attrs: PostAttr): PostDocument;
};

const postSchema = new Schema(
    {
        title: { type: String, required: true, indexes: true },
        slug: { type: String, required: true, indexes: true },
        type: { type: String, required: true, default: "blog" },
        author: { type: Schema.Types.ObjectId, ref: "User" },
        publish: { type: Boolean, default: false },
        visibility: { type: Number, default: 2 }
    },
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        },
        timestamps: true
    }
);

postSchema.statics.build = (attrs: PostAttr) => {
    return new PostModel(attrs);
};

const PostModel = model<PostAttr, PostModel>("Post", postSchema);
export default PostModel;
