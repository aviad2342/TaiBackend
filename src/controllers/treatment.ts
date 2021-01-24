import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Treatment } from "../entity/Treatment";


export async function getTreatments(req: Request, res: Response): Promise<void> {
    const treatments: Treatment[] = await getRepository(Treatment).find();
        res.json(treatments);
}

export async function getTreatmentsByType(req: Request, res: Response): Promise<void> {
    const treatments: Treatment[] = await getRepository(Treatment).find({ where: { treatmentType: req.params.treatmentType } });
        res.json(treatments);
}

export async function getTreatment(req: Request, res: Response): Promise<void> {
     const treatment: Treatment = await getRepository(Treatment).findOne(req.params.id);
         res.json(treatment);
 }

 export async function addTreatment(req: Request, res: Response): Promise<any> {
     const treatment: any = getRepository(Treatment).create(req.body);
     const results: Treatment = await getRepository(Treatment).save(treatment).catch( error => {
        const imagePhat: string = treatment.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
     return res.json(results);
}

export async function updateTreatment(req: Request, res: Response): Promise<any> {
    const treatment: Treatment = await getRepository(Treatment).findOne(req.params.id);
    if(treatment.thumbnail !== req.body.thumbnail) {
        const imagePhat: string = treatment.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(Treatment).merge(treatment, req.body);
    const results: Treatment = await getRepository(Treatment).save(treatment);
    return res.json(results);
}


export async function deleteTreatment(req: Request, res: Response): Promise<any> {
    const treatment: Treatment = await getRepository(Treatment).findOne(req.params.id);
    const imagePhat: string = treatment.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const results: DeleteResult = await getRepository(Treatment).delete(req.params.id);
    return res.json(results);
}


export async function getTreatmentsByTherapist(req: Request, res: Response): Promise<any> {
      const treatments: Treatment[] = await getRepository(Treatment).find({ where: { therapistId: req.params.therapistId } });
      return res.json(treatments);
}

