"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UpdateController = require("../controllers/update");
const router = express_1.Router();
router.get("/updates", UpdateController.getUpdates);
router.get("/update/:id", UpdateController.getUpdate);
router.post("/update", UpdateController.addUpdate);
router.put("/update/:id", UpdateController.updateUpdate);
router.delete("/update/:id", UpdateController.deleteUpdate);
exports.updateRouter = router;
//# sourceMappingURL=update.js.map