"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartItemController = require("../controllers/cartItem");
const router = express_1.Router();
router.get("/cartItems/cart/:id", CartItemController.getCartItems);
router.get("/cartItem/:id", CartItemController.getCartItem);
router.post("/cartItem", CartItemController.addCartItem);
router.put("/cartItem/:id", CartItemController.updateCartItem);
router.delete("/cartItem/:id", CartItemController.deleteCartItem);
exports.cartItemRouter = router;
//# sourceMappingURL=cartItem.js.map