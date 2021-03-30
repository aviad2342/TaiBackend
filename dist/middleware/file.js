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
        cb(error, "src/images");
    },
    filename(req, file, cb) {
        const name = file.originalname.toLowerCase().split("@");
        const ext = MIME_TYPE_MAP[file.mimetype];
        const stemp = Date.now();
        cb(null, stemp + "@" + name[0] + "." + ext);
    }
});
exports.upload = multer({ storage }).single("image");
//# sourceMappingURL=file.js.map