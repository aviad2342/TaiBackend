import * as multer from "multer";

const MIME_TYPE_MAP: any = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage: multer.StorageEngine = multer.diskStorage({
    destination (req: any, file: any, cb: any): any {
        const isValid: boolean = MIME_TYPE_MAP[file.mimetype];
        let error: Error = new Error("Invalid mime type");
        if (isValid) {
              error = null;
        }
        cb(error, "src/userImages");
    },
    filename (req: any, file: any, cb: any): any {
        const name: any = file.originalname.toLowerCase().split("@");
        const ext: any = MIME_TYPE_MAP[file.mimetype];
        cb(null, name[0] + "@" + name[1] + "." + ext);
    }
});

export const uploadUserImage: any = multer({storage}).single("image");