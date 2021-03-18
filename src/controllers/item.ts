import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult, BaseEntity} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import {Item} from "../entity/Item";


export async function getItems(req: Request, res: Response): Promise<void> {
    const items: Item[] = await getRepository(Item).find();
        res.json(items);
}

export async function getItem(req: Request, res: Response): Promise<void> {
     const item: Item = await getRepository(Item).findOne(req.params.id);
         res.json(item);
 }

 export async function addItem(req: Request, res: Response): Promise<any> {
     const item: any = getRepository(Item).create(req.body);
     const results: Item = await getRepository(Item).save(item).catch( error => {
        const imagePhat: string = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
     return res.json(results);
}

export async function updateItem(req: Request, res: Response): Promise<any> {
    const item: Item = await getRepository(Item).findOne(req.params.id);
    if(item.thumbnail !== req.body.thumbnail) {
        const imagePhat: string = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(Item).merge(item, req.body);
    const results: Item = await getRepository(Item).save(item);
    return res.json(results);
}

export async function deleteItem(req: Request, res: Response): Promise<any> {
    const item: Item = await getRepository(Item).findOne(req.params.id);
    const imagePhat: string = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
    const results: DeleteResult = await getRepository(Item).delete(req.params.id);
    return res.json(results);
}

export async function getProduct(req: Request, res: Response): Promise<void> {
    const product: BaseEntity = await getRepository(BaseEntity).findOne(req.params.id);
        res.json(product);
}

