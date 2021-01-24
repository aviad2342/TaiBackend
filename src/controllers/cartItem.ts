import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { CartItem } from "../entity/CartItem";


export async function getCartItems(req: Request, res: Response): Promise<void> {
    const items: CartItem[] = await getRepository(CartItem).find();
        res.json(items);
}

export async function getCartItem(req: Request, res: Response): Promise<void> {
     const item: CartItem = await getRepository(CartItem).findOne(req.params.id);
         res.json(item);
 }

 export async function addCartItem(req: Request, res: Response): Promise<any> {
     const item: any = getRepository(CartItem).create(req.body);
     const results: CartItem = await getRepository(CartItem).save(item).catch( error => {
        const imagePhat: string = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
     return res.json(results);
}

export async function updateCartItem(req: Request, res: Response): Promise<any> {
    const item: CartItem = await getRepository(CartItem).findOne(req.params.id);
    if(item.thumbnail !== req.body.thumbnail) {
        const imagePhat: string = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(CartItem).merge(item, req.body);
    const results: CartItem = await getRepository(CartItem).save(item);
    return res.json(results);
}

export async function deleteCartItem(req: Request, res: Response): Promise<any> {
    const results: DeleteResult = await getRepository(CartItem).delete(req.params.id);
    return res.json(results);
}

