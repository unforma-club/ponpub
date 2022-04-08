import type { Request, Response } from "express";
import multer, { diskStorage } from "multer";
import SuccessJson from "responses/res.success-json";
import { existsSync, mkdirSync } from "fs";

// function createDirectory(req: Request) {
//     const url = req.url;
//     return url.substring(1);
// }

function checkDirectory(storagePath: string) {
    return !existsSync(storagePath) && mkdirSync(storagePath, { recursive: true });
}

const uploadLogoMulter = multer({
    storage: diskStorage({
        destination: (req, _file, cb) => {
            const path = "public/images/logo";
            checkDirectory(path);
            cb(null, path);
        },
        filename: (_req, file, cb) => {
            cb(null, "site_logo.png");
        }
    })
});

const ControlAsset = {
    uploadLogo: async function (req: Request, res: Response) {
        return new SuccessJson(res, req.file);
    },
    storageLogo: uploadLogoMulter.single("site_logo")
};

export default ControlAsset;
