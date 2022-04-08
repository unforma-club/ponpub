import { Document, Model, Schema, model } from "mongoose";

type SiteAttr = {
    title: string;
    description: string;
};

export interface SiteDocument extends SiteAttr, Document {
    createdAt: Date;
    updatedAt: Date;
}

type SiteModel = Model<SiteDocument> & {
    build(attrs: SiteAttr): SiteDocument;
};

const siteSchema = new Schema(
    {
        title: { type: String, default: "Ponpub" },
        description: { type: String, default: "Discover, Craft, and Deliver" },
        meta: {
            twitter: {
                title: { type: String, default: "Ponpub" },
                description: { type: String, default: "Ponpub" }
            },
            facebook: {
                title: { type: String, default: "Ponpub" },
                description: { type: String, default: "Ponpub" }
            }
        }
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

siteSchema.statics.build = (attrs: SiteAttr) => {
    return new SiteModel(attrs);
};

const SiteModel = model<SiteAttr, SiteModel>("Site", siteSchema);
export default SiteModel;
