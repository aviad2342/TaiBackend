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
        const name: any = file.originalname;
        const url: string = req.protocol + "://" + req.get("host") + "/eventImages/";
        const stemp: any = Date.now();
        cb(null, stemp + "@" + name);
         file.originalname = url +  stemp + "@" + name;
    }
});

export const uploadEventePictures: any = multer({storage: storage}).array("images");