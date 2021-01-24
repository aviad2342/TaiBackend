"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "src/eventImages");
    },
    filename(req, file, cb) {
        const name = file.originalname;
        const url = req.protocol + "://" + req.get("host") + "/eventImages/";
        const stemp = Date.now();
        cb(null, stemp + "@" + name);
        file.originalname = url + stemp + "@" + name;
    }
});
exports.uploadEventePictures = multer({ storage }).array("images");
//# sourceMappingURL=eventPictures.js.map