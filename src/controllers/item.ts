import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult, BaseEntity, getManager} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import {Item} from "../entity/Item";

interface Product {
    id: string;
    name: string;
  }

export async function getItems(req: Request, res: Response): Promise<void> {
    const items: Item[] = await getRepository(Item).find();
        res.json(items);
}

export async function getItem(req: Request, res: Response): Promise<void> {
     const item: Item = await getRepository(Item).findOne(req.params.id);
         res.json(item);
}

export async function getItemByProductId(req: Request, res: Response): Promise<void> {
    const item: Item = await getRepository(Item).findOne(req.params.productId);
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

export async function getProductName(req: Request, res: Response): Promise<void> {
    const entityManager = getManager();
    const products: Product[] = await entityManager.query("SELECT id, 'article' as name from crm_db.article union SELECT id, 'course' as name from crm_db.course union SELECT id, 'event' as name from crm_db.event union SELECT id, 'treatment' as name from crm_db.treatment;");
    const product: Product = products.find(p => p.id === req.params.id);
        res.json(product.name);
}

