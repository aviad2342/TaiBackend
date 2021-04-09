"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ItemController = require("../controllers/item");
const router = express_1.Router();
router.get("/items", ItemController.getItems);
router.get("/item/:id", ItemController.getItem);
router.get("/product/:productId", ItemController.getItemByProductId);
router.get("/product/name/:id", ItemController.getProductName);
router.post("/item", ItemController.addItem);
router.put("/item/:id", ItemController.updateItem);
router.delete("/item/:id", ItemController.deleteItem);
exports.itemRouter = router;
//# sourceMappingURL=item.js.map