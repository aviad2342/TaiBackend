import {Router} from "express";

import * as ItemController from "../controllers/item";

import * as extractFile from "../middleware/file";


const router: Router = Router();

router.get("/items", ItemController.getItems);

router.get("/item/:id", ItemController.getItem);

router.post("/item", ItemController.addItem);

router.put("/item/:id", ItemController.updateItem);

router.delete("/item/:id", ItemController.deleteItem);


export const itemRouter: Router = router;