import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Testimony } from "../entity/Testimony";


export async function getTestimonies(req: Request, res: Response): Promise<void> {
    const testimonies: Testimony[] = await getRepository(Testimony).find();
        res.json(testimonies);
}

export async function getTestimony(req: Request, res: Response): Promise<void> {
     const testimony: Testimony = await getRepository(Testimony).findOne(req.params.id);
         res.json(testimony);
 }

 export async function addTestimony(req: Request, res: Response): Promise<any> {
     const testimony: any = getRepository(Testimony).create(req.body);
     const results: Testimony = await getRepository(Testimony).save(testimony).catch( error => {
        const imagePhat: string = testimony.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat) && !imagePhat.includes('/images/')) {
            fs.unlinkSync(imagePhat);
        }
     });
     return res.json(results);
}

export async function updateTestimony(req: Request, res: Response): Promise<any> {
    const testimony: Testimony = await getRepository(Testimony).findOne(req.params.id);
    if(testimony.picture !== req.body.picture) {
        const imagePhat: string = testimony.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)  && !imagePhat.includes('/images/')) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(Testimony).merge(testimony, req.body);
    const results: Testimony = await getRepository(Testimony).save(testimony);
    return res.json(results);
}

export async function deleteTestimony(req: Request, res: Response): Promise<any> {
    const testimony: Testimony = await getRepository(Testimony).findOne(req.params.id);
    const imagePhat: string = testimony.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)  && !imagePhat.includes('/images/')) {
            fs.unlinkSync(imagePhat);
        }
    const results: DeleteResult = await getRepository(Testimony).delete(req.params.id);
    return res.json(results);
}