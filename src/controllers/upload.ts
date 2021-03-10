import {Request, Response} from "express";
import * as fs from  "fs";

export async function uploadImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadUserImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/userImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadTherapistImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/therapistImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadTreatmentImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/treatmentImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadSpeakerImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/speakerImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadParticipantImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/participantImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadEventImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/eventImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadTestimonyImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/testimonyImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadEventPictures(req: Request, res: Response): Promise<any> {
    const files: any[] = Object.values(req.files);
    // const url: string = req.protocol + "://" + req.get("host") + "/eventImages/";
    const urls: string[] = [];
    files.forEach(file => {
        urls.push(file.originalname);
    });
    return res.json(urls);
}

export async function uploadArticleImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/articleImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadItemImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/itemImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadArticleBodyImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/articleImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function uploadCourseImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/courseImages/" + req.file.filename;
    return res.json({imageUrl: url});
}

export async function deleteEventImage(req: Request, res: Response): Promise<any> {
    if(fs.existsSync("./src/eventImages/" + req.params.name)) {
        fs.unlinkSync("./src/eventImages/" + req.params.name);
        return res.json({response: "התמונה הוסרה בהצלחה"});
    }
    return res.json({response: "הסרת התמונה נכשלה!"});
}

export async function deleteImage(req: Request, res: Response): Promise<any> {
    const imagePhat: string = req.query.image.toString().replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
        return res.json({response: "התמונה הוסרה בהצלחה"});
    }
    return res.json({response: "הסרת התמונה נכשלה!"});
}

export async function getImage(req: Request, res: Response): Promise<any> {
    const imagePhat: string = req.query.image.toString().replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        return res.send(fs.readFileSync(imagePhat));
    }
    return res.json({response: "הסרת התמונה נכשלה!"});
}
