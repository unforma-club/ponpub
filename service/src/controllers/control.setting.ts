import type { Request, Response, NextFunction } from "express";
import SiteModel from "models/model.site";
import ErrorNotFound from "responses/res.error.not-found";
import SuccessJson from "responses/res.success-json";

const ControlSetting = {
    getSiteData: async function (req: Request, res: Response, next: NextFunction) {
        try {
            const siteData = await SiteModel.findOne();
            return new SuccessJson(res, siteData);
        } catch (error) {
            throw new ErrorNotFound(error.message);
        }
    },
    postSiteDate: async function (req: Request, res: Response, next: NextFunction) {
        const buildSiteData = SiteModel.build({
            title: req.body.title,
            description: req.body.description
        });

        try {
            await buildSiteData.save();
            return new SuccessJson(res, buildSiteData);
        } catch (error) {
            throw new ErrorNotFound(error.message);
        }
    },
    patchSiteData: async function (req: Request, res: Response, next: NextFunction) {
        try {
            const updated = await SiteModel.findOneAndUpdate(
                {},
                { ...req.body },
                { returnOriginal: false }
            );
            return new SuccessJson(res, updated);
        } catch (error) {
            throw new ErrorNotFound(error.message);
        }
    }
};

export default ControlSetting;
