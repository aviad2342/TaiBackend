import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import { Cart } from "../entity/Cart";
import { CartItem } from "../entity/CartItem";


export async function getCart(req: Request, res: Response): Promise<void> {
    const cart: Cart = await getRepository(Cart).findOne(req.params.id, { relations: ["items"] });
         res.json(cart);
}

export async function getCustomerCart(req: Request, res: Response): Promise<void> {
     const cart: Cart = await getRepository(Cart).findOne({where: { customer: req.params.id }, relations: ["items"] });
         res.json(cart);
 }

 export async function isItemInCart(req: Request, res: Response): Promise<void> {
    const cart: Cart = await getRepository(Cart).findOne(req.params.id, { relations: ["items"] });
    let inCart: boolean = false;
    if(typeof cart.items !== 'undefined') {
        inCart = cart.items.map(i => i.itemId).includes(req.params.itemId);
    }
     res.json(inCart);
}

export async function addCart(req: Request, res: Response): Promise<any> {
     const cart: any = getRepository(Cart).create(req.body);
     const results: Cart = await getRepository(Cart).save(cart);
     return res.json(results);
}

export async function addCartItem(req: Request, res: Response): Promise<any> {
    const item: any = getRepository(CartItem).create(req.body);
    const results: CartItem = await getRepository(CartItem).save(item);
    return res.json(results);
}

export async function updateCart(req: Request, res: Response): Promise<any> {
    const cart: Cart = await getRepository(Cart).findOne(req.params.id);
    getRepository(Cart).merge(cart, req.body);
    const results: Cart = await getRepository(Cart).save(cart);
    return res.json(results);
}

export async function updateCartItem(req: Request, res: Response): Promise<any> {
    const item: CartItem = await getRepository(CartItem).findOne(req.params.id);
    getRepository(CartItem).merge(item, req.body);
    const results: CartItem = await getRepository(CartItem).save(item);
    return res.json(results);
}

export async function deleteCart(req: Request, res: Response): Promise<any> {
    const results: DeleteResult = await getRepository(Cart).delete(req.params.id);
    return res.json(results);
}

export async function deleteCartItem(req: Request, res: Response): Promise<any> {
    const results: DeleteResult = await getRepository(CartItem).delete(req.params.id);
    return res.json(results);
}

