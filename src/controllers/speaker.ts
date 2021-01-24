import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Speaker } from "../entity/Speaker";


export async function getSpeakers(req: Request, res: Response): Promise<void> {
    const speakers: Speaker[] = await getRepository(Speaker).find();
        res.json(speakers);
}

export async function getSpeaker(req: Request, res: Response): Promise<void> {
     const speaker: Speaker = await getRepository(Speaker).findOne(req.params.id);
         res.json(speaker);
 }

 export async function addSpeaker(req: Request, res: Response): Promise<any> {
     const speaker: any = getRepository(Speaker).create(req.body);
     const results: Speaker = await getRepository(Speaker).save(speaker).catch( error => {
        const imagePhat: string = speaker.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
     return res.json(results);
}

export async function updateSpeaker(req: Request, res: Response): Promise<any> {
    const speaker: Speaker = await getRepository(Speaker).findOne(req.params.id);
    if(speaker.picture !== req.body.thumbnail) {
        const imagePhat: string = speaker.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(Speaker).merge(speaker, req.body);
    const results: Speaker = await getRepository(Speaker).save(speaker);
    return res.json(results);
}

export async function updateSpeakerAndImage(req: Request, res: Response): Promise<any> {
    const speaker: Speaker = await getRepository(Speaker).findOne(req.params.id);
    const imagePhat: string = speaker.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    getRepository(Speaker).merge(speaker, req.body);
    const results: Speaker = await getRepository(Speaker).save(speaker);
    return res.json(results);
}

export async function deleteSpeaker(req: Request, res: Response): Promise<any> {
    const speaker: Speaker = await getRepository(Speaker).findOne(req.params.id);
    const imagePhat: string = speaker.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const results: DeleteResult = await getRepository(Speaker).delete(req.params.id);
    return res.json(results);
}

export async function getSpeakereByEvent(req: Request, res: Response): Promise<any> {
      const speakers: Speaker[] = await getRepository(Speaker).find({ where: { eventId: req.params.eventId } });
      return res.json(speakers);
}
