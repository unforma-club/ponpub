import type { Request, Response } from "express";
import PostModel, { PostDocument } from "models/model.post";
import SuccessJson from "responses/res.success-json";

const ControlPost = {
    create: async function (req: Request, res: Response) {
        const { title, slug, type } = req.body;
        const buildPost = PostModel.build({ title, slug, type, author: req.currentUser.id });

        try {
            await buildPost.save();
        } catch (error) {
            throw new Error(error.message);
        }

        return new SuccessJson(res, buildPost);
    },
    getPosts: async function (req: Request, res: Response) {
        const postType = req.query.type as string;
        let posts: (PostDocument & {
            _id: any;
        })[] = [];

        switch (postType) {
            case "font":
                posts = await PostModel.find({ type: postType }).sort({ createdAt: "desc" }).exec();
                break;
            case "blog":
                posts = await PostModel.find({ type: postType }).sort({ createdAt: "desc" }).exec();
                break;
            default:
                posts = await PostModel.find().sort({ createdAt: "desc" });
                break;
        }

        return new SuccessJson(res, posts);
    },
    getPostBySlug: async function (req: Request, res: Response) {
        const slug = req.params.slug;
        try {
            const post = await PostModel.findOne({ slug });
            await post.populate("author");
            return new SuccessJson(res, post);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    patchPostBySlug: async function (req: Request, res: Response) {
        const slug = req.params.slug;
        const body = req.body;
        try {
            const updated = await PostModel.findOneAndUpdate(
                { slug },
                { ...body },
                { returnOriginal: false }
            ).exec();
            return new SuccessJson(res, updated);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deletePostBySlug: async function (req: Request, res: Response) {
        const slug = req.params.slug;
        const postType = req.query.type;

        try {
            await PostModel.deleteOne({ slug });
            const nextPost = await PostModel.findOne({ type: postType });
            return new SuccessJson(res, nextPost);
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default ControlPost;
