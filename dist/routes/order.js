"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController = require("../controllers/order");
const router = express_1.Router();
router.get("/orders", OrderController.getOrders);
router.get("/order/:id", OrderController.getOrder);
router.get("/order/items/:id", OrderController.getOrderItems);
router.get("/orders/customer/:id", OrderController.getOrdersByCustomer);
router.get("/orders/item/:id", OrderController.getOrdersByItem);
router.post("/order", OrderController.addOrder);
router.put("/order/:id", OrderController.updateOrder);
router.delete("/order/:id", OrderController.deleteOrder);
exports.orderRouter = router;
//# sourceMappingURL=order.js.map