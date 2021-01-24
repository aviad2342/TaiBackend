import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult, FindOptionsUtils} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Order } from "../entity/Order";


export async function getOrders(req: Request, res: Response): Promise<void> {
    const orders: Order[] = await getRepository(Order).find();
        res.json(orders);
}

export async function getOrder(req: Request, res: Response): Promise<void> {
     const order: Order = await getRepository(Order).findOne(req.params.id, { relations: ["customer", "address", "items"]});
         res.json(order);
 }

 export async function getOrderItems(req: Request, res: Response): Promise<void> {
    const order: Order = await getRepository(Order).findOne(req.params.id, { relations: ["items"]});
        res.json(order.items);
}

 export async function addOrder(req: Request, res: Response): Promise<any> {
     const order: any = getRepository(Order).create(req.body);
     const results: Order = await getRepository(Order).save(order);
     return res.json(results);
}

export async function updateOrder(req: Request, res: Response): Promise<any> {
    const order: Order = await getRepository(Order).findOne(req.params.id);
    getRepository(Order).merge(order, req.body);
    const results: Order = await getRepository(Order).save(order);
    return res.json(results);
}

export async function deleteOrder(req: Request, res: Response): Promise<any> {
    const results: DeleteResult = await getRepository(Order).delete(req.params.id);
    return res.json(results);
}

export async function getOrdersByItem(req: Request, res: Response): Promise<any> {
    const orders: Order[] = await getRepository(Order).find();
    return res.json(orders);
}

export async function getOrdersByCustomer(req: Request, res: Response): Promise<any> {
    const orders: Order[] = await getRepository(Order).find({ where: { customer: req.params.customer } });
    return res.json(orders);
}