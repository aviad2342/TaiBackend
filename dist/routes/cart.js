"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController = require("../controllers/cart");
const router = express_1.Router();
router.get("/cart/customer/:id", CartController.getCustomerCart);
router.get("/items/:id/:itemId", CartController.isItemInCart);
router.get("/cart/:id", CartController.getCart);
router.post("/cart", CartController.addCart);
router.post("/item", CartController.addCartItem);
router.put("/cart/:id", CartController.updateCart);
router.put("/item/:id", CartController.updateCartItem);
router.delete("/cart/:id", CartController.deleteCart);
router.delete("/item/:id", CartController.deleteCartItem);
exports.cartRouter = router;
//# sourceMappingURL=cart.js.map