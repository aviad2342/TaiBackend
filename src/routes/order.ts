import {Router} from "express";

import * as OrderController from "../controllers/order";


const router: Router = Router();

router.get("/orders", OrderController.getOrders);

router.get("/order/:id", OrderController.getOrder);

router.get("/order/items/:id", OrderController.getOrderItems);

router.get("/orders/customer/:id", OrderController.getOrdersByCustomer);

router.get("/orders/item/:id", OrderController.getOrdersByItem);

router.post("/order", OrderController.addOrder);

router.post("/payment", OrderController.commitPayment);

router.put("/order/:id", OrderController.updateOrder);

router.delete("/order/:id", OrderController.deleteOrder);


export const orderRouter: Router = router;