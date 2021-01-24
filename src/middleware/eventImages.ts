import * as multer from "multer";

const MIME_TYPE_MAP: Object = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req: any, file: any, cb: any): any {
        const isValid: boolean = MIME_TYPE_MAP[file.mimetype];
        let error: Error = new Error("Invalid mime type");
        if (isValid) {
              error = null;
        }
        cb(error, "src/eventImages");
    },
    filename: function (req: any, file: any, cb: any): any {
        const name: any = file.originalname.toLowerCase();
        const ext: any = MIME_TYPE_MAP[file.mimetype];
        const stemp: any = Date.now();
        cb(null, stemp + "@" + name + "." + ext);
    }
});

export const uploadEventeImage: any = multer({storage: storage}).single("image");