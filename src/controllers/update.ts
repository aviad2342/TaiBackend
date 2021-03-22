import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import { Update } from "../entity/Update";


export async function getUpdates(req: Request, res: Response): Promise<void> {
    const updates: Update[] = await getRepository(Update).find();
        res.json(updates);
}

export async function getUpdate(req: Request, res: Response): Promise<void> {
     const update: Update = await getRepository(Update).findOne(req.params.id);
         res.json(update);
 }

 export async function addUpdate(req: Request, res: Response): Promise<any> {
     const update: any = getRepository(Update).create(req.body);
     const result: Update = await getRepository(Update).save(update);
     return res.json(result);
}

export async function updateUpdate(req: Request, res: Response): Promise<any> {
    const update: Update = await getRepository(Update).findOne(req.params.id);
    getRepository(Update).merge(update, req.body);
    const result: Update = await getRepository(Update).save(update);
    return res.json(result);
}

export async function deleteUpdate(req: Request, res: Response): Promise<any> {
    const result: DeleteResult = await getRepository(Update).delete(req.params.id);
    return res.json(result);
}
