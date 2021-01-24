import {Router} from "express";

import * as CartController from "../controllers/cart";


const router: Router = Router();

router.get("/cart/customer/:id", CartController.getCustomerCart);

router.get("/items/:customerId/:itemId", CartController.isItemInCart);

router.get("/cart/:id", CartController.getCart);

router.post("/cart", CartController.addCart);

router.post("/item", CartController.addCartItem);

router.put("/cart/:id", CartController.updateCart);

router.put("/item/:id", CartController.updateCartItem);

router.delete("/cart/:id", CartController.deleteCart);

router.delete("/item/:id", CartController.deleteCartItem);


export const cartRouter: Router = router;