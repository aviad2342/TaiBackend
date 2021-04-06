import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Treatment } from "../entity/Treatment";
import { Item } from "../entity/Item";


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
    const result: Treatment = await getRepository(Treatment).save(treatment);

    const item: Item = await getRepository(Item).findOne({ where: { productId: result.id } });
    if(typeof item !== undefined) {
        if(item.name !== result.therapistName || item.description !== result.description || item.thumbnail !== result.thumbnail) {
            if(item.name !== result.therapistName) {
                item.name = result.therapistName;
            }
            if(item.description !== result.description ) {
                item.description = result.description ;
            }
            if(item.thumbnail !== result.thumbnail) {
                item.thumbnail = result.thumbnail;
            }
            await getRepository(Item).save(item);
        }
    }
    return res.json(result);
}


export async function deleteTreatment(req: Request, res: Response): Promise<any> {
    const treatment: Treatment = await getRepository(Treatment).findOne(req.params.id);
    const imagePhat: string = treatment.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const item: Item = await getRepository(Item).findOne({ where: { productId: treatment.id } });
    if(typeof item !== undefined) {
        await getRepository(Item).delete(item.id);
    }
    const results: DeleteResult = await getRepository(Treatment).delete(req.params.id);
    return res.json(results);
}


export async function getTreatmentsByTherapist(req: Request, res: Response): Promise<any> {
      const treatments: Treatment[] = await getRepository(Treatment).find({ where: { therapistId: req.params.therapistId } });
      return res.json(treatments);
}

