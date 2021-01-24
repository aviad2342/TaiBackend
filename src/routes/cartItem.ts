import {Router} from "express";

import * as CartItemController from "../controllers/cartItem";


const router: Router = Router();

router.get("/cartItems/cart/:id", CartItemController.getCartItems);

router.get("/cartItem/:id", CartItemController.getCartItem);

router.post("/cartItem", CartItemController.addCartItem);

router.put("/cartItem/:id", CartItemController.updateCartItem);

router.delete("/cartItem/:id", CartItemController.deleteCartItem);


export const cartItemRouter: Router = router;