import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult, FindOptionsUtils} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Order } from "../entity/Order";
import { v4 as uuidv4 } from "uuid";


export async function getOrders(req: Request, res: Response): Promise<void> {
    const orders: Order[] = await getRepository(Order).find();
        res.json(orders);
}

export async function getOrder(req: Request, res: Response): Promise<void> {
     const order: Order = await getRepository(Order).findOne(req.params.id, { relations: ["user", "address", "items"]});
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
    const order: Order = await getRepository(Order).findOne(req.params.id, { relations: ["user", "address", "items"]});
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
    const orders: Order[] = await getRepository(Order).find({ where: { user: req.params.user } });
    return res.json(orders);
}

export async function commitPayment(req: Request, res: Response): Promise<any> {
    const confirmPaymentNumber: string = uuidv4();
    return res.json(confirmPaymentNumber);
}